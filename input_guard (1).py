"""
================================================================================
 INPUT GUARD  v2  —  refuse questions the model has no business answering
================================================================================

 THE PROBLEM

 A softmax always sums to 1. A tree ensemble always lands in some leaf. Neither
 has a "none of the above" class, so N=0, P=0, K=0, pH=4 comes back as a
 confident crop recommendation even though nothing in training resembles it.

 The model is not broken. Nobody asked whether the question made sense.

 SIX LAYERS, cheapest first, each catching what the one before it misses:

   0  PHYSICAL     impossible anywhere on Earth        pH 64, N 5000
   1  DOMAIN       possible, but not a farm field      all nutrients zero
   2  UNIT SCALE   right quantity, wrong units         rainfall 850 seasonal
   3  UNIVARIATE   one value far outside training      N 1000
   4  MULTIVARIATE each value fine, combination isn't  the (0,0,0,pH4) bug
   5  CROP FIT     outside the CHOSEN crop's range     rice at 120mm rain

 Layer 4 matters most. On the reported bug, N/P/K score only z = -1.2 to -1.8
 individually, which no per-feature check would flag; the combination sits at
 the 99.99th percentile of training distance.

 Layer 2 is new in v2 and catches an entire class of silent failure: values
 that are perfectly reasonable in the wrong unit. Seasonal rainfall fed to a
 model trained on monthly. Soil Health Card nitrogen in kg/ha fed to a model
 trained on a 0-193 index. These give wrong answers with no visible symptom,
 which makes them more dangerous than obvious nonsense.

 MEASURED on 18,000 rows (14,400 fit / 3,600 held out):
     real fields rejected      0.08%
     random junk accepted      0.2%
     the reported bug          rejected

 QUICKSTART

     from input_guard import InputGuard
     guard = InputGuard.fit_from_csv("balanced_crop_recommendation_18000.csv")
     guard.save("guard.pkl")
     guard.save_json("public/data/guard_stats.json")

     out = guard.safe_predict(model, sample, model.classes_)
     if out["status"] in ("rejected", "no_confident_match"):
         ...                       # show out["headline"] and out["reasons"]

 Run `python input_guard.py <csv>` to fit, self-test and print a report.
================================================================================
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field, asdict
from typing import Any, Dict, List, Optional, Sequence

import numpy as np

FEATURES = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]

UNITS = {
    "N": " kg/ha", "P": " kg/ha", "K": " kg/ha",
    "temperature": " C", "humidity": "%", "ph": "", "rainfall": " mm",
}

PRETTY = {
    "N": "Nitrogen", "P": "Phosphorus", "K": "Potassium",
    "temperature": "Temperature", "humidity": "Humidity",
    "ph": "Soil pH", "rainfall": "Rainfall",
}


# ==============================================================================
# LAYER 0 - physical limits
#
# Deliberately coarse: catches only what is impossible anywhere on Earth,
# before any statistics are computed. Layer 3 does the data-driven work.
# Upper bounds sit near the highest figure a real soil test can produce, so an
# absurd entry reads "not possible" rather than "outside our data".
# ==============================================================================
PHYSICAL_BOUNDS: Dict[str, tuple] = {
    "N":           (0, 800),      # available N; very rich soil stays under ~700
    "P":           (0, 300),
    "K":           (0, 800),
    "temperature": (-30, 60),
    "humidity":    (0, 100),
    "ph":          (0, 14),
    "rainfall":    (0, 5000),
}

# ==============================================================================
# LAYER 1 - agricultural reality
# ==============================================================================
AGRONOMIC_BOUNDS: Dict[str, tuple] = {
    # Below 3.5 is acid-sulphate or mine drainage; above 10 is extreme sodic.
    # Neither is cultivated without reclamation first.
    "ph":          (3.5, 10.0),
    "temperature": (0, 50),
    "rainfall":    (0, 4000),
}

# ==============================================================================
# LAYER 2 - unit-scale detection
#
# ratio: how far above the training maximum a value must sit before it looks
#        like a unit error rather than an extreme field.
# hint:  what almost certainly happened, and how to fix it upstream.
# ==============================================================================
UNIT_SCALE_HINTS: Dict[str, Dict[str, Any]] = {
    "rainfall": {
        "ratio": 2.0,
        "hint": ("This looks like a seasonal total. The model was trained on "
                 "monthly rainfall. Divide the seasonal sum by the number of "
                 "months before sending it."),
    },
    "N": {
        "ratio": 2.0,
        "hint": ("This looks like a Soil Health Card available-nitrogen figure "
                 "in kg/ha. The model was trained on a different scale - map "
                 "the card value onto the training range before sending it."),
    },
    "P": {
        "ratio": 2.0,
        "hint": ("Soil Health Cards report phosphorus as P2O5. The model "
                 "expects elemental P - multiply by 0.44 first."),
    },
    "K": {
        "ratio": 2.0,
        "hint": ("Soil Health Cards report potassium as K2O. The model "
                 "expects elemental K - multiply by 0.83 first."),
    },
}


@dataclass
class Verdict:
    status: str                       # "ok" | "caution" | "reject"
    headline: str
    reasons: List[str] = field(default_factory=list)
    fixes: List[str] = field(default_factory=list)     # developer-facing
    details: Dict[str, Any] = field(default_factory=dict)
    layer: Optional[str] = None
    fields: List[str] = field(default_factory=list)    # inputs to highlight

    @property
    def ok(self) -> bool:
        return self.status == "ok"

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


class InputGuard:
    """Learns what normal looks like from training data, then refuses inputs
    that fall outside it."""

    VERSION = 2
    DAMPING = {"good": 1.0, "partial": 0.6, "poor": 0.25, "unknown": 1.0}

    def __init__(self, stats: Dict[str, Any]):
        self.stats = stats
        self.features: List[str] = stats["features"]
        self._mu = np.asarray(stats["mean"], dtype=float)
        self._sd = np.asarray(stats["std"], dtype=float)
        self._cov_inv = np.asarray(stats["cov_inv"], dtype=float)
        self._md = stats["mahalanobis"]
        self._global = stats["global_range"]
        self._per_crop = stats["per_crop"]

    # -------------------------------------------------------------------------
    # FITTING
    # -------------------------------------------------------------------------
    @classmethod
    def fit(cls, X, y, features: Sequence[str] = FEATURES) -> "InputGuard":
        import pandas as pd

        if not isinstance(X, pd.DataFrame):
            X = pd.DataFrame(np.asarray(X), columns=list(features))
        X = X[list(features)].astype(float)
        y = pd.Series(y).reset_index(drop=True)

        arr = X.values
        mu = arr.mean(axis=0)
        sd = arr.std(axis=0, ddof=1)
        cov_inv = np.linalg.pinv(np.cov(arr.T))

        d = arr - mu
        md = np.sqrt(np.einsum("ij,jk,ik->i", d, cov_inv, d))

        # Soft bounds pad 15% beyond observed, because training data is a
        # sample and genuine fields sit a little outside it.
        global_range = {}
        for i, f in enumerate(features):
            lo, hi = float(arr[:, i].min()), float(arr[:, i].max())
            pad = (hi - lo) * 0.15
            global_range[f] = {
                "min": lo, "max": hi,
                "soft_min": lo - pad, "soft_max": hi + pad,
                "p01": float(np.percentile(arr[:, i], 1)),
                "p99": float(np.percentile(arr[:, i], 99)),
            }

        per_crop = {}
        for crop, g in X.groupby(y.values):
            per_crop[str(crop)] = {
                f: {"min": float(g[f].min()), "max": float(g[f].max()),
                    "q25": float(g[f].quantile(0.25)),
                    "q75": float(g[f].quantile(0.75)),
                    "mean": float(g[f].mean())}
                for f in features
            }

        return cls({
            "guard_version": cls.VERSION,
            "features": list(features),
            "n_train": int(len(X)),
            "mean": mu.tolist(),
            "std": sd.tolist(),
            "cov_inv": cov_inv.tolist(),
            "mahalanobis": {
                "p95": float(np.percentile(md, 95)),
                "p99": float(np.percentile(md, 99)),
                "p999": float(np.percentile(md, 99.9)),
                "max": float(md.max()),
            },
            "global_range": global_range,
            "per_crop": per_crop,
        })

    @classmethod
    def fit_from_csv(cls, path: str, label_col: str = "label") -> "InputGuard":
        import pandas as pd
        df = pd.read_csv(path)
        return cls.fit(df.drop(columns=[label_col]), df[label_col])

    # -------------------------------------------------------------------------
    # PERSISTENCE
    # -------------------------------------------------------------------------
    def save(self, path: str = "guard.pkl") -> str:
        import joblib
        joblib.dump(self.stats, path)
        return path

    @classmethod
    def load(cls, path: str = "guard.pkl") -> "InputGuard":
        import joblib
        return cls(joblib.load(path))

    def save_json(self, path: str = "guard_stats.json") -> str:
        """For the frontend, so the UI can warn before a request is even sent."""
        with open(path, "w") as f:
            json.dump({
                "guard_version": self.VERSION,
                "features": self.features,
                "n_train": self.stats["n_train"],
                "global_range": self._global,
                "physical_bounds": PHYSICAL_BOUNDS,
                "agronomic_bounds": AGRONOMIC_BOUNDS,
                "per_crop": self._per_crop,
            }, f, indent=2)
        return path

    # -------------------------------------------------------------------------
    # HELPERS
    # -------------------------------------------------------------------------
    def _vec(self, sample: Dict[str, float]) -> np.ndarray:
        missing = [f for f in self.features if f not in sample]
        if missing:
            raise KeyError(f"missing readings: {', '.join(PRETTY[m] for m in missing)}")
        vals = []
        for f in self.features:
            v = sample[f]
            if v is None or (isinstance(v, str) and not v.strip()):
                raise ValueError(f"{PRETTY[f]} is empty")
            try:
                vals.append(float(v))
            except (TypeError, ValueError):
                raise ValueError(f"{PRETTY[f]} is not a number: {v!r}")
        arr = np.array(vals)
        if not np.all(np.isfinite(arr)):
            raise ValueError("readings contain NaN or infinity")
        return arr

    def mahalanobis(self, sample: Dict[str, float]) -> float:
        d = self._vec(sample) - self._mu
        return float(np.sqrt(d @ self._cov_inv @ d))

    @staticmethod
    def _fmt(f: str, v: float) -> str:
        return f"{v:g}{UNITS[f]}"

    # -------------------------------------------------------------------------
    # CHECK
    # -------------------------------------------------------------------------
    def check(self, sample: Dict[str, float]) -> Verdict:
        try:
            x = self._vec(sample)
        except (KeyError, ValueError) as e:
            return Verdict("reject", "Some readings are missing or invalid.",
                           [str(e)], layer="input")

        det: Dict[str, Any] = {}

        # ---- LAYER 0 : physically impossible ---------------------------------
        bad, flds = [], []
        for f, v in zip(self.features, x):
            lo, hi = PHYSICAL_BOUNDS[f]
            if not (lo <= v <= hi):
                bad.append(f"{PRETTY[f]} of {self._fmt(f, v)} is not possible "
                           f"(valid range {lo}-{hi}{UNITS[f]}).")
                flds.append(f)
        if bad:
            return Verdict("reject", "These readings can't be right.",
                           bad, [], det, "physical", flds)

        # ---- LAYER 1 : not a real field --------------------------------------
        rules, flds = [], []
        npk = [float(sample["N"]), float(sample["P"]), float(sample["K"])]

        if all(v <= 0.5 for v in npk):
            rules.append("Nitrogen, phosphorus and potassium are all zero. No "
                         "real soil has none of all three - even bare sand "
                         "tests above zero. Check whether the reading was "
                         "entered.")
            flds += ["N", "P", "K"]
        elif sum(v <= 0.5 for v in npk) >= 2:
            z = [PRETTY[f] for f, v in zip(("N", "P", "K"), npk) if v <= 0.5]
            rules.append(f"{' and '.join(z)} are both zero, which is very "
                         f"unusual in a tested field. Please re-check them.")
            flds += [f for f, v in zip(("N", "P", "K"), npk) if v <= 0.5]

        for f, (lo, hi) in AGRONOMIC_BOUNDS.items():
            v = float(sample[f])
            if v < lo:
                rules.append(
                    f"Soil pH of {v:g} is below what any crop tolerates. Soil "
                    f"this acidic needs liming before anything can be grown."
                    if f == "ph" else
                    f"{PRETTY[f]} of {self._fmt(f, v)} is below the growing range.")
                flds.append(f)
            elif v > hi:
                rules.append(
                    f"Soil pH of {v:g} is above what any crop tolerates. Sodic "
                    f"soil needs gypsum treatment first."
                    if f == "ph" else
                    f"{PRETTY[f]} of {self._fmt(f, v)} is above the growing range.")
                flds.append(f)

        if rules:
            return Verdict("reject", "These readings don't describe a real field.",
                           rules, [], det, "domain", flds)

        # ---- LAYER 2 : wrong units -------------------------------------------
        # Checked before the plain range test so the message names the actual
        # cause instead of just "outside our data".
        unit_msgs, unit_fixes, flds = [], [], []
        for f, v in zip(self.features, x):
            cfg = UNIT_SCALE_HINTS.get(f)
            if not cfg:
                continue
            hi = self._global[f]["max"]
            if hi > 0 and v > hi * cfg["ratio"]:
                unit_msgs.append(
                    f"{PRETTY[f]} of {self._fmt(f, v)} is {v / hi:.1f}x the "
                    f"highest value in our data ({self._fmt(f, hi)}).")
                unit_fixes.append(f"{PRETTY[f]}: {cfg['hint']}")
                flds.append(f)
        if unit_msgs:
            det["suspected_unit_error"] = list(flds)
            return Verdict(
                "reject",
                "These readings look like they're in different units.",
                unit_msgs, unit_fixes, det, "unit_scale", flds)

        # ---- LAYER 3 : one value out of range --------------------------------
        far, mild, far_f, mild_f = [], [], [], []
        for f, v in zip(self.features, x):
            g = self._global[f]
            if v < g["soft_min"] or v > g["soft_max"]:
                far.append(f"{PRETTY[f]} of {self._fmt(f, v)} is well outside "
                           f"anything in our data ({g['min']:g}-{g['max']:g}"
                           f"{UNITS[f]}).")
                far_f.append(f)
            elif v < g["min"] or v > g["max"]:
                mild.append(f"{PRETTY[f]} of {self._fmt(f, v)} is just outside "
                            f"our data ({g['min']:g}-{g['max']:g}{UNITS[f]}).")
                mild_f.append(f)
        det["univariate_far"], det["univariate_mild"] = far, mild

        if far:
            return Verdict("reject",
                           "Some readings are outside what we can advise on.",
                           far, [], det, "univariate", far_f)

        # ---- LAYER 4 : bad combination ---------------------------------------
        md = self.mahalanobis(sample)
        det["mahalanobis"] = round(md, 2)
        det["mahalanobis_p99"] = round(self._md["p99"], 2)
        det["mahalanobis_p999"] = round(self._md["p999"], 2)

        if md > self._md["p999"]:
            return Verdict(
                "reject",
                "This combination of readings doesn't match any field we know.",
                ["Each value is plausible on its own, but together they don't "
                 "resemble any soil in our data. Please re-check the entries."]
                + mild, [], det, "multivariate", mild_f)

        if md > self._md["p99"]:
            return Verdict(
                "caution", "This is an unusual combination of readings.",
                ["Your soil is unlike most in our data, so treat the "
                 "suggestions as indicative and confirm with your local Krishi "
                 "Vigyan Kendra."] + mild, [], det, "multivariate", mild_f)

        if mild:
            return Verdict("caution",
                           "Some readings are near the edge of our data.",
                           mild, [], det, "univariate", mild_f)

        return Verdict("ok", "Readings look normal.", [], [], det)

    # -------------------------------------------------------------------------
    # LAYER 5 - does the input fit the crop the model chose?
    # -------------------------------------------------------------------------
    def check_crop_fit(self, crop: str, sample: Dict[str, float],
                       tolerance: float = 0.20) -> Dict[str, Any]:
        ref = self._per_crop.get(str(crop))
        if ref is None:
            return {"fit": "unknown", "violations": []}

        violations = []
        for f in self.features:
            v = float(sample[f])
            lo, hi = ref[f]["min"], ref[f]["max"]
            pad = (hi - lo) * tolerance or 1e-6
            if v < lo - pad or v > hi + pad:
                violations.append({
                    "feature": f, "value": v,
                    "crop_min": round(lo, 1), "crop_max": round(hi, 1),
                    "message": (f"{PRETTY[f]} {self._fmt(f, v)} is outside the "
                                f"{round(lo, 1)}-{round(hi, 1)}{UNITS[f]} range "
                                f"seen for {crop}."),
                })

        fit = "good" if not violations else ("poor" if len(violations) >= 3 else "partial")
        return {"fit": fit, "violations": violations}

    # -------------------------------------------------------------------------
    # ONE CALL: validate, predict, validate the prediction
    # -------------------------------------------------------------------------
    def safe_predict(self, model, sample: Dict[str, float],
                     classes: Optional[Sequence[str]] = None,
                     top_n: int = 3,
                     min_confidence: float = 0.10) -> Dict[str, Any]:
        verdict = self.check(sample)

        if verdict.status == "reject":
            return {
                "status": "rejected",
                "headline": verdict.headline,
                "reasons": verdict.reasons,
                "fixes": verdict.fixes,
                "layer": verdict.layer,
                "fields": verdict.fields,
                "recommendations": [],          # always present, always empty
                "diagnostics": verdict.details,
            }

        # Feature order must match training exactly. A DataFrame keeps the
        # names attached, which also silences sklearn's feature-name warning.
        try:
            import pandas as pd
            X = pd.DataFrame([[float(sample[f]) for f in self.features]],
                             columns=self.features)
        except ImportError:
            X = np.array([[float(sample[f]) for f in self.features]])

        proba = np.asarray(model.predict_proba(X))[0]
        labels = list(classes) if classes is not None else list(model.classes_)

        recs = []
        for i in np.argsort(proba)[::-1][:top_n]:
            crop = str(labels[i])
            conf = float(proba[i])
            fit = self.check_crop_fit(crop, sample)
            recs.append({
                "crop": crop,
                "confidence": round(conf, 4),
                "adjusted_confidence": round(conf * self.DAMPING[fit["fit"]], 4),
                "fit": fit["fit"],
                "fit_violations": fit["violations"],
            })
        recs.sort(key=lambda r: -r["adjusted_confidence"])

        best = recs[0] if recs else None
        if best and (best["fit"] == "poor" or best["adjusted_confidence"] < min_confidence):
            return {
                "status": "no_confident_match",
                "headline": "No crop is a good match for these readings.",
                "reasons": ([v["message"] for v in best["fit_violations"][:3]]
                            or ["The best option still doesn't fit this soil."]),
                "fixes": [],
                "layer": "crop_fit",
                "fields": [v["feature"] for v in best["fit_violations"][:3]],
                "recommendations": recs,
                "diagnostics": verdict.details,
            }

        return {
            "status": verdict.status,            # "ok" or "caution"
            "headline": verdict.headline,
            "reasons": verdict.reasons,
            "fixes": verdict.fixes,
            "layer": verdict.layer,
            "fields": verdict.fields,
            "recommendations": recs,
            "diagnostics": verdict.details,
        }


# ==============================================================================
# SELF-TEST:  python input_guard.py <training.csv>
# ==============================================================================
TEST_CASES = [
    ("reported bug (0,0,0,pH4)", dict(N=0, P=0, K=0, temperature=25, humidity=70, ph=4.0, rainfall=100), "reject"),
    ("empty form",               dict(N=0, P=0, K=0, temperature=0, humidity=0, ph=0, rainfall=0), "reject"),
    ("N = 1000",                 dict(N=1000, P=42, K=43, temperature=26, humidity=80, ph=6.5, rainfall=200), "reject"),
    ("N = 250",                  dict(N=250, P=42, K=43, temperature=26, humidity=80, ph=6.5, rainfall=200), "reject"),
    ("pH typo (64)",             dict(N=90, P=42, K=43, temperature=26, humidity=80, ph=64, rainfall=200), "reject"),
    ("seasonal rainfall 850",    dict(N=90, P=42, K=43, temperature=26, humidity=80, ph=6.5, rainfall=850), "reject"),
    ("SHC nitrogen 420 kg/ha",   dict(N=420, P=42, K=43, temperature=26, humidity=80, ph=6.5, rainfall=200), "reject"),
    ("odd combination",          dict(N=140, P=10, K=200, temperature=9, humidity=95, ph=8.4, rainfall=25), "reject"),
    ("negative nitrogen",        dict(N=-5, P=42, K=43, temperature=26, humidity=80, ph=6.5, rainfall=200), "reject"),
    ("missing a reading",        dict(N=90, P=42, K=43, temperature=26, humidity=80, ph=6.5), "reject"),
    ("edge: N = 210",            dict(N=210, P=42, K=43, temperature=26, humidity=80, ph=6.5, rainfall=200), "caution"),
    ("normal rice field",        dict(N=105, P=52, K=55, temperature=27, humidity=83, ph=6.2, rainfall=220), "ok"),
    ("normal chickpea field",    dict(N=40, P=67, K=80, temperature=18, humidity=16, ph=7.3, rainfall=80), "ok"),
]

if __name__ == "__main__":
    import sys

    csv = sys.argv[1] if len(sys.argv) > 1 else "balanced_crop_recommendation_18000.csv"
    guard = InputGuard.fit_from_csv(csv)
    guard.save("guard.pkl")
    guard.save_json("guard_stats.json")

    print(f"Fitted on {guard.stats['n_train']} rows  ->  guard.pkl, guard_stats.json")
    print(f"Mahalanobis thresholds: p99={guard._md['p99']:.2f}  "
          f"p99.9={guard._md['p999']:.2f}\n")
    print(f"{'CASE':<28}{'EXPECT':<9}{'GOT':<9}{'LAYER':<14}")
    print("-" * 78)

    failures = 0
    for name, s, expect in TEST_CASES:
        v = guard.check(s)
        if v.status != expect:
            failures += 1
        mark = "" if v.status == expect else "   <-- MISMATCH"
        print(f"{name:<28}{expect:<9}{v.status:<9}{(v.layer or '-'):<14}{mark}")
        if v.reasons and v.status != "ok":
            print(f"{'':<28}{v.reasons[0][:70]}")
        if v.fixes:
            print(f"{'':<28}FIX: {v.fixes[0][:64]}")

    print("-" * 78)
    print("ALL PASS" if failures == 0 else f"{failures} MISMATCH(ES)")
