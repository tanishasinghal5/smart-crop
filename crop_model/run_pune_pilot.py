import csv

from .config import DATA_DIR
from .earth_engine.feature_builder import get_environment_features


def main():
    features = get_environment_features("Maharashtra", "Pune", 2010, "Kharif")
    output = DATA_DIR / "pune_2010_kharif_test.csv"
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with output.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(features))
        writer.writeheader()
        writer.writerow(features)
    print(features)
    print(f"wrote={output}")


if __name__ == "__main__":
    main()