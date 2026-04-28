---
layout: post
title: "Predicting NBA Salaries from Performance Stats (STA 363)"
subtitle: "KNN, penalized regression, trees, and forests on 2022-23 player data"
tags: [research]
---

This note summarizes our STA 363 final project on predicting **NBA player salaries** from **2022-23** performance data.

We used a dataset of **467 players** and compared several model families under a consistent RMSE-based evaluation workflow. The goal was twofold: (1) make the best possible salary predictions from measurable on-court features, and (2) understand which features consistently matter across methods.

## Data and setup

- **Response:** annual salary (USD), with some models fit on transformed/scaled targets.
- **Core predictors:** quantitative box-score and advanced metrics (e.g., `MP`, `PTS`, `AST`, `TRB`, `BPM`, `TOV`, shooting/usage features).
- **Preprocessing idea:** inspect multicollinearity first, then compare both hand-curated and full-feature modeling strategies.
- **Evaluation metric:** RMSE (reported in millions of USD where applicable).

## What we tested

1. **KNN** with LOOCV tuning over `K = 2..50`.
2. **Linear models**:
   - OLS baseline
   - Ridge (lambda tuned by validation RMSE)
   - Lasso (lambda tuned by validation RMSE; with feature selection)
3. **Tree-based models**:
   - Single regression tree
   - Bagged forest (500 trees)
   - Random forest (500 trees)

## Main results

- **KNN (K = 11):** moderate performance; tended to underpredict some high-salary players.
- **Ridge:** best lambda `3.59`, validation RMSE `6.9707`.
- **Lasso:** best lambda `0.49`, validation RMSE `6.6072`, with a sparse retained feature set.
- **Regression tree:** cross-validated RMSE `6.72`.
- **Bagged forest:** out-of-bag RMSE `5.81` (**best overall**).
- **Random forest:** out-of-bag RMSE `6.71`.

## Interpretation

A consistent pattern across EDA, trees, and forests: **minutes played (`MP`)** is a dominant predictor. Variables tied to offensive role and production (e.g., points, usage, shot volume, impact metrics) also repeatedly ranked highly.

This does not mean salary is purely “box score driven.” Contract timing, cap context, injuries, market demand, and negotiation dynamics are not fully encoded in this dataset. But performance metrics still carry substantial predictive signal.

## Takeaway

For this project, **bagged forests** delivered the strongest predictive accuracy, while **single trees** and **lasso** provided clearer interpretability. A practical workflow is to combine both views: use a high-performing ensemble for prediction and a sparse/transparent model family for explanation.

If you are interested in the complete final class report, feel free to [contact me]({{ '/contact/' | relative_url }}).
