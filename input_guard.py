"""
================================================================================
 INPUT GUARD  —  stop the model answering questions it has no business answering
================================================================================

 THE PROBLEM

 A softmax always sums to 1. A tree ensemble always lands in some leaf. Neither
 has a "none of the above" class, so N=0, P=0, K=0, pH=4 returns "rice, 91%"
 with total confidence — even though no rice in the training set has N below
 62, P below 35, K below 35, or pH below 5.2.

 The model is not broken. It was never asked whether the question made sense.
 This module asks.

 FIVE LAYERS, cheapest first, each catching what the previous one misses:

   0  PHYSICAL     pH 15, negative rainfall, humidity 300%
   1  DOMAIN       physically possible but not real soil (all nutrients zero)
   2  UNIVARIATE   one feature far outside anything in training
   3  MULTIVARIATE Mahalanobis — each value plausible, the COMBINATION is not
   4  PER-CROP     input outside the predicted crop's own training range

 Layer 3 is the one that matters. On the failing case above, N/P/K score only
 z = -1.2 to -1.8 individually, which no per-feature check would flag. The
 combination sits at the 99.99th percentile of training distance.

 USE

     from input_guard import InputGuard
     guard = InputGuard.fit_from_csv("balanced_crop_recommendation_18000.csv")
     guard.save("guard.pkl")            # ship next to your model

     verdict = guard.check(sample)
     if verdict.status == "reject":
         return {"error": verdict.headline, "reasons": verdict.reasons}

 Or wrap the whole prediction in one call:

     result = guard.safe_predict(model, sample, classes)
================================================================================
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field, asdict
from typing import Any, Dict, List, Optional, Sequence

import numpy as np

FEATURES = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]

UNITS = {
    "N": "kg/ha", "P": "kg/ha", "K": "kg/ha",
    "temperature": "°C", "humidity": "%", "ph": "", "rainfall": "mm",
}

PRETTY = {
    "N": "Nitrogen", "P": "Phosphorus", "K": "Potassium",
    "temperature": "Temperature", "humidity": "Humidity",
    "ph": "Soil pH", "rainfall": "Rainfall",
}


# ==============================================================================
# LAYER 0 — physical limits. Nothing outside these exists anywhere on Earth.
# ==============================================================================
PHYSICAL_BOUNDS: Dict[str, tuple] = {
    "N":           (0, 1000),
    "P":           (0, 1000),
    "K":           (0, 1000),
    "temperature": (-30, 60),
    "humidity":    (0, 100),
    "ph":          (0, 14),
    "rainfall":    (0, 5000),
}

# ==============================================================================
# LAYER 1 — agricultural reality. Possible in principle, not a farm field.
# ==============================================================================
AGRONOMIC_BOUNDS: Dict[str, tuple] = {
    # Below 3.5 is acid-sulphate / mine drainage; above 10 is extreme sodic.
    # Nothing is cultivated at either end without reclamation first.
    "ph":          (3.5, 10.0),
    "temperature": (0, 50),
    "rainfall":    (0, 4000),
}


@dataclass
class Verdict:
    status: str                      # "ok" | "caution" | "reject"
    headline: str
    reasons: List[str] = field(default_factory=list)
    details: Dict[str, Any] = field(default_factory=dict)
    layer: Optional[str] = None      # which layer fired first

    @property
    def ok(self) -> bool:
        return self.status == "ok"

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


class InputGuard:
    """Learns what 'normal' looks like from the training data, then refuses
    inputs that fall outside it."""

    def __init__(self, stats: Dict[str, Any]):
        self.stats = stats
        self.features: List[str] = stats["features"]
        self._mu = np.asarray(stats["mean"], dtype=float)
        self._sd = np.asarray(stats["std"], dtype=float)
        self._cov_inv = np.asarray(stats["cov_inv"], dtype=float)
        self._md_thresholds = stats["mahalanobis"]
        self._global = stats["global_range"]
        self._per_crop = stats["per_crop"]

    # -------------------------------------------------------------------------
    # FITTING
    # -------------------------------------------------------------------------
    @classmethod
    def fit(cls, X, y, features: Sequence[str] = FEATURES) -> "InputGuard":
        """X: DataFrame or 2-D array in `features` order. y: labels."""
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

        # Global plausible range, padded 15% beyond observed, because the
        # training set is a sample and real fields sit slightly outside it.
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
                f: {
                    "min": float(g[f].min()), "max": float(g[f].max()),
                    "q25": float(g[f].quantile(0.25)),
                    "q75": float(g[f].quantile(0.75)),
                    "mean": float(g[f].mean()),
                }
                for f in features
            }

        stats = {
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
        }
        return cls(stats)

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
        """For the frontend — lets the UI warn before a request is even sent."""
        slim = {
            "features": self.features,
            "n_train": self.stats["n_train"],
            "global_range": self._global,
            "physical_bounds": PHYSICAL_BOUNDS,
            "agronomic_bounds": AGRONOMIC_BOUNDS,
            "per_crop": self._per_crop,
        }
        with open(path, "w") as f:
            json.dump(slim, f, indent=2)
        return path

    # -------------------------------------------------------------------------
    # CHECKING
    # -------------------------------------------------------------------------
    def _vec(self, sample: Dict[str, float]) -> np.ndarray:
        missing = [f for f in self.features if f not in sample]
        if missing:
            raise KeyError(f"missing features: {missing}")
        return np.array([float(sample[f]) for f in self.features])

    def mahalanobis(self, sample: Dict[str, float]) -> float:
        d = self._vec(sample) - self._mu
        return float(np.sqrt(d @ self._cov_inv @ d))

    def check(self, sample: Dict[str, float]) -> Verdict:
        x = self._vec(sample)
        det: Dict[str, Any] = {}

        # ---- LAYER 0 : physical impossibility --------------------------------
        hard = []
        for f, v in zip(self.features, x):
            lo, hi = PHYSICAL_BOUNDS[f]
            if not (lo <= v <= hi):
                hard.append(
                    f"{PRETTY[f]} of {v:g}{UNITS[f]} is not possible "
                    f"(valid range {lo}–{hi}{UNITS[f]})."
                )
        if hard:
            return Verdict("reject", "These readings can't be right.",
                           hard, det, layer="physical")

        # ---- LAYER 1 : domain rules ------------------------------------------
        rules = []

        npk = [sample.get("N", 0), sample.get("P", 0), sample.get("K", 0)]
        if all(v <= 0.5 for v in npk):
            rules.append(
                "Nitrogen, phosphorus and potassium are all zero. No real soil "
                "has none of all three — even bare sand tests above zero. "
                "Check whether the reading was entered."
            )
        elif sum(v <= 0.5 for v in npk) >= 2:
            zeros = [PRETTY[f] for f, v in zip(["N", "P", "K"], npk) if v <= 0.5]
            rules.append(
                f"{' and '.join(zeros)} are both zero, which is very unusual "
                f"in a tested field. Please re-check those values."
            )

        for f, (lo, hi) in AGRONOMIC_BOUNDS.items():
            v = float(sample[f])
            if v < lo:
                rules.append(
                    f"{PRETTY[f]} of {v:g}{UNITS[f]} is below what any crop "
                    f"tolerates. Soil this acidic needs liming before anything "
                    f"can be recommended."
                    if f == "ph" else
                    f"{PRETTY[f]} of {v:g}{UNITS[f]} is outside the growing range."
                )
            elif v > hi:
                rules.append(
                    f"{PRETTY[f]} of {v:g}{UNITS[f]} is above what any crop "
                    f"tolerates. Sodic soil needs gypsum treatment first."
                    if f == "ph" else
                    f"{PRETTY[f]} of {v:g}{UNITS[f]} is outside the growing range."
                )

        if rules:
            return Verdict("reject", "These readings don't describe a real field.",
                           rules, det, layer="domain")

        # ---- LAYER 2 : univariate range --------------------------------------
        far, mild = [], []
        for f, v in zip(self.features, x):
            g = self._global[f]
            if v < g["soft_min"] or v > g["soft_max"]:
                far.append(
                    f"{PRETTY[f]} of {v:g}{UNITS[f]} is well outside anything "
                    f"in our data ({g['min']:g}–{g['max']:g}{UNITS[f]})."
                )
            elif v < g["min"] or v > g["max"]:
                mild.append(
                    f"{PRETTY[f]} of {v:g}{UNITS[f]} is just outside our data "
                    f"({g['min']:g}–{g['max']:g}{UNITS[f]})."
                )
        det["univariate_far"] = far
        det["univariate_mild"] = mild

        if far:
            return Verdict("reject", "Some readings are outside what we can advise on.",
                           far, det, layer="univariate")

        # ---- LAYER 3 : multivariate ------------------------------------------
        md = self.mahalanobis(sample)
        det["mahalanobis"] = round(md, 2)
        det["mahalanobis_p99"] = round(self._md_thresholds["p99"], 2)

        if md > self._md_thresholds["p999"]:
            return Verdict(
                "reject",
                "This combination of readings doesn't match any field we know.",
                ["Each value is plausible on its own, but together they don't "
                 "resemble any soil in our data. Please re-check the entries."]
                + mild,
                det, layer="multivariate")

        if md > self._md_thresholds["p99"]:
            return Verdict(
                "caution",
                "This is an unusual combination of readings.",
                ["Your soil is unlike most in our data, so treat the suggestions "
                 "as indicative and confirm with your local Krishi Vigyan Kendra."]
                + mild,
                det, layer="multivariate")

        if mild:
            return Verdict("caution", "Some readings are near the edge of our data.",
                           mild, det, layer="univariate")

        return Verdict("ok", "Readings look normal.", [], det)

    # -------------------------------------------------------------------------
    # LAYER 4 — after prediction: does the input fit the crop that was chosen?
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
                    "feature": f,
                    "value": v,
                    "crop_min": round(lo, 1),
                    "crop_max": round(hi, 1),
                    "message": (f"{PRETTY[f]} {v:g}{UNITS[f]} is outside the "
                                f"{round(lo,1)}–{round(hi,1)}{UNITS[f]} range "
                                f"seen for {crop}."),
                })

        fit = "good" if not violations else ("poor" if len(violations) >= 3 else "partial")
        return {"fit": fit, "violations": violations}

    # -------------------------------------------------------------------------
    # ONE-CALL WRAPPER
    # -------------------------------------------------------------------------
    def safe_predict(self, model, sample: Dict[str, float],
                     classes: Optional[Sequence[str]] = None,
                     top_n: int = 3,
                     min_confidence: float = 0.10) -> Dict[str, Any]:
        """Validate, predict, then validate the prediction. Returns a dict ready
        to serialise as an API response."""
        verdict = self.check(sample)

        if verdict.status == "reject":
            return {
                "status": "rejected",
                "headline": verdict.headline,
                "reasons": verdict.reasons,
                "layer": verdict.layer,
                "recommendations": [],
                "diagnostics": verdict.details,
            }

        x = self._vec(sample).reshape(1, -1)
        proba = np.asarray(model.predict_proba(x))[0]
        labels = list(classes) if classes is not None else list(model.classes_)
        order = np.argsort(proba)[::-1][:top_n]

        recs = []
        for i in order:
            crop = str(labels[i])
            conf = float(proba[i])
            fit = self.check_crop_fit(crop, sample)
            # A crop the input doesn't fit gets its confidence damped, so the
            # UI can't display 91% for something agronomically impossible.
            damp = {"good": 1.0, "partial": 0.6, "poor": 0.25, "unknown": 1.0}[fit["fit"]]
            recs.append({
                "crop": crop,
                "confidence": conf,
                "adjusted_confidence": round(conf * damp, 4),
                "fit": fit["fit"],
                "fit_violations": fit["violations"],
            })

        recs.sort(key=lambda r: -r["adjusted_confidence"])
        best = recs[0] if recs else None

        # Everything the model offered is a bad fit -> say so instead of ranking rubbish
        if best and (best["fit"] == "poor" or best["adjusted_confidence"] < min_confidence):
            return {
                "status": "no_confident_match",
                "headline": "No crop is a good match for these readings.",
                "reasons": ([v["message"] for v in best["fit_violations"][:3]] or
                            ["The model's best option still doesn't fit this soil."]),
                "layer": "crop_fit",
                "recommendations": recs,
                "diagnostics": verdict.details,
            }

        return {
            "status": verdict.status,          # "ok" or "caution"
            "headline": verdict.headline,
            "reasons": verdict.reasons,
            "layer": verdict.layer,
            "recommendations": recs,
            "diagnostics": verdict.details,
        }


# ==============================================================================
# CLI:  python input_guard.py <training.csv>
# ==============================================================================
if __name__ == "__main__":
    import sys

    csv = sys.argv[1] if len(sys.argv) > 1 else "balanced_crop_recommendation_18000.csv"
    guard = InputGuard.fit_from_csv(csv)
    guard.save("guard.pkl")
    guard.save_json("guard_stats.json")
    print(f"Fitted on {guard.stats['n_train']} rows -> guard.pkl, guard_stats.json\n")

    cases = [
        ("the reported bug",  dict(N=0, P=0, K=0, temperature=25, humidity=70, ph=4.0, rainfall=100)),
        ("empty form",        dict(N=0, P=0, K=0, temperature=0, humidity=0, ph=0, rainfall=0)),
        ("pH typo (64)",      dict(N=90, P=42, K=43, temperature=26, humidity=80, ph=64, rainfall=200)),
        ("seasonal rainfall", dict(N=90, P=42, K=43, temperature=26, humidity=80, ph=6.5, rainfall=850)),
        ("odd combination",   dict(N=140, P=10, K=200, temperature=9, humidity=95, ph=8.4, rainfall=25)),
        ("normal rice field", dict(N=105, P=52, K=55, temperature=27, humidity=83, ph=6.2, rainfall=220)),
    ]
    for name, s in cases:
        v = guard.check(s)
        print(f"{name:<20} {v.status.upper():<8} {v.headline}")
        for r in v.reasons[:1]:
            print(f"{'':<20} - {r}")
