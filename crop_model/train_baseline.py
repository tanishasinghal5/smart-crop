import argparse

import joblib
import pandas as pd
from sklearn.base import clone
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, f1_score, top_k_accuracy_score
from sklearn.model_selection import train_test_split

from .config import AGRONOMIC_FEATURES, MODEL_PATH, REPORT_DIR


def evaluate(model_path=MODEL_PATH, dataset_path=None):
    if dataset_path is None:
        raise FileNotFoundError("The original agronomic training CSV is not in this repository; pass --dataset.")
    data = pd.read_csv(dataset_path)
    target = "label" if "label" in data else "crop"
    missing = [column for column in AGRONOMIC_FEATURES + [target] if column not in data]
    if missing:
        raise ValueError(f"Baseline dataset is missing columns: {missing}")
    data = data.dropna(subset=AGRONOMIC_FEATURES + [target])
    train, test = train_test_split(data, test_size=0.2, random_state=42, stratify=data[target])
    bundle = joblib.load(model_path)
    model = bundle["model"] if isinstance(bundle, dict) and "model" in bundle else bundle
    # Evaluate a clone so the serialized production bundle is never mutated.
    estimator = clone(model)
    estimator.fit(train[AGRONOMIC_FEATURES], train[target])
    predictions = estimator.predict(test[AGRONOMIC_FEATURES])
    probabilities = estimator.predict_proba(test[AGRONOMIC_FEATURES])
    labels = getattr(estimator, "classes_", sorted(data[target].unique()))
    return {
        "accuracy": accuracy_score(test[target], predictions),
        "macro_f1": f1_score(test[target], predictions, average="macro"),
        "weighted_f1": f1_score(test[target], predictions, average="weighted"),
        "top_3_accuracy": top_k_accuracy_score(test[target], probabilities, k=3, labels=labels),
        "classification_report": classification_report(test[target], predictions, output_dict=True, zero_division=0),
        "confusion_matrix": confusion_matrix(test[target], predictions, labels=labels),
        "labels": list(labels),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dataset")
    parser.add_argument("--model", default=str(MODEL_PATH))
    args = parser.parse_args()
    result = evaluate(args.model, args.dataset)
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    report = "# Baseline Model Evaluation\n\n"
    report += "\n".join(f"- {key}: {value}" for key, value in result.items() if key not in {"classification_report", "confusion_matrix", "labels"})
    report += "\n\nThe split is stratified and the serialized model is fitted only on the training partition.\n"
    (REPORT_DIR / "baseline_model_evaluation.md").write_text(report, encoding="utf-8")
    print(report)


if __name__ == "__main__":
    main()
