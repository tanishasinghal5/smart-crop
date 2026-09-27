# Baseline Model Evaluation

## Status

The existing `bundle.pkl` loads and produces probability-backed predictions. A reproducible accuracy, macro F1, weighted F1, top-3 accuracy, and confusion matrix could not be calculated on Day 1 because the original seven-feature training/evaluation CSV is not present in the repository, git history, or the broader hackathon directory searched.

The evaluation command is ready:

```bash
python -m crop_model.train_baseline --dataset /path/to/original_agronomic_dataset.csv
```

No metrics are inferred from the serialized model and no replacement dataset is used.