import argparse
from pathlib import Path

import pandas as pd

from .config import DATA_DIR, PRODUCTION_CANDIDATES, REPORT_DIR
from .preprocessing import clean_dataset


def _source_path(value):
    if value:
        return Path(value)
    for candidate in PRODUCTION_CANDIDATES:
        if candidate.exists():
            return candidate
    raise FileNotFoundError(
        "Crop production CSV was not found. Pass --source /path/to/crop_production.csv. "
        f"Checked: {', '.join(str(path) for path in PRODUCTION_CANDIDATES)}"
    )


def build_report(original, clean, training, keys, source):
    missing = original.isna().sum()
    season_counts = clean["Season"].value_counts(dropna=False).to_dict()
    crop_counts = clean["Crop"].value_counts().to_dict()
    state_counts = clean["State_Name"].value_counts().to_dict()
    flagged = training.loc[training["Yield_Outlier"]].groupby("Crop").size().to_dict()
    lines = [
        "# Crop Production Data Quality Report",
        "",
        f"Source: `{source}`",
        "",
        "## Row and domain summary",
        f"- Original rows: {len(original):,}",
        f"- Cleaned rows: {len(clean):,}",
        f"- Training rows: {len(training):,}",
        f"- Exact duplicates removed: {len(original) - len(clean):,}",
        f"- States: {clean['State_Name'].nunique(dropna=True):,}",
        f"- Districts: {clean['District_Name'].nunique(dropna=True):,}",
        f"- Crops: {clean['Crop'].nunique(dropna=True):,}",
        f"- Year range: {clean['Crop_Year'].min()} to {clean['Crop_Year'].max()}",
        f"- Unique environmental keys: {len(keys):,}",
        "",
        "## Missing values in original input",
    ]
    lines.extend(f"- `{column}`: {int(value):,}" for column, value in missing.items())
    area = pd.to_numeric(original.get("Area", pd.Series(dtype=float)), errors="coerce")
    production = pd.to_numeric(original.get("Production", pd.Series(dtype=float)), errors="coerce")
    lines += [
        "",
        "## Validation counts",
        f"- Area <= 0: {int((area <= 0).sum())}",
        f"- Production < 0: {int((production < 0).sum())}",
        f"- Missing Production: {int(production.isna().sum())}",
        "",
        "## Season values",
    ]
    lines.extend(f"- `{key}`: {value:,}" for key, value in season_counts.items())
    lines += ["", "## Crop frequency (cleaned rows)"]
    lines.extend(f"- `{key}`: {value:,}" for key, value in crop_counts.items())
    lines += ["", "## State frequency (cleaned rows)"]
    lines.extend(f"- `{key}`: {value:,}" for key, value in state_counts.items())
    lines += [
        "",
        "## Yield flags",
        "Yield is `Production / Area`. `Yield_Percentile` is calculated within crop. "
        "`Yield_Outlier` flags values below the crop-wise 1st percentile or above its 99th percentile; "
        "flagged rows are retained.",
    ]
    lines.extend(f"- `{key}`: {value:,} flagged" for key, value in flagged.items())
    lines += [
        "",
        "## Suspicious or sparse categories",
        "Categories with fewer than 10 cleaned rows are listed below for review; no explanation is inferred.",
    ]
    sparse = clean["Crop"].value_counts()
    lines.extend(f"- `{key}`: {value:,} rows" for key, value in sparse[sparse < 10].items())
    lines += [
        "",
        "## Limitations",
        "- Production units are not inferred or converted; unit consistency requires source documentation.",
        "- Raw yield is not used as a cross-crop comparison; percentiles are crop-wise only.",
        "- Class imbalance is represented by the crop frequency table and must be considered in model evaluation.",
    ]
    return "\n".join(lines) + "\n"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source")
    args = parser.parse_args()
    source = _source_path(args.source)
    original, clean, training, keys = clean_dataset(source, DATA_DIR)
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    (REPORT_DIR / "data_quality_report.md").write_text(
        build_report(original, clean, training, keys, source), encoding="utf-8"
    )
    print(f"original_rows={len(original)} clean_rows={len(clean)} training_rows={len(training)}")
    print(f"unique_environment_keys={len(keys)}")


if __name__ == "__main__":
    main()