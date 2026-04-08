---
layout: page
title: "CatBoost"
subtitle: Gradient boosting with ordered targets and categorical handling
permalink: /notes/personal-notes/catboost/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

**CatBoost** (Prokhorenkova et al., Yandex) is another high-performance **gradient boosting** library. Two themes stand out: **reducing prediction shift** from target leakage in categorical encoding / boosting, and **strong defaults** for **high-cardinality categoricals**.

### Prediction shift and ordered boosting

In standard boosting, the model at step $t$ is fit using targets and predictions that **depend on the same data** you are fitting on—subtle **target leakage** through the residual structure can **bias** predictions. **Ordered boosting** uses a **random permutation** of training rows and builds residuals using only **prior** observations in that order when computing statistics for splits—closer to a **temporal** honesty and often **better generalization** with less tuning.

### Categorical features

Instead of manual one-hot with huge dimension, CatBoost uses **ordered target statistics** (smoothed encodings based on past labels within categories) integrated into the tree procedure—handles **many levels** with less hand engineering than naive approaches.

### Symmetric trees (oblivious)

CatBoost can use **symmetric** (oblivious) trees: same split structure across all branches at a depth—**faster prediction** and regularization flavor, sometimes slightly different bias–variance than fully flexible trees.

### Practical takeaway

For **heavy categorical** tabular data, CatBoost is often a **top baseline** next to LightGBM and XGBoost. As always: **cross-validate**, compare on a **holdout**, and watch **training time** vs. accuracy.

<p class="text-muted small">Prokhorenkova et al., “CatBoost: unbiased boosting with categorical features”; [XGBoost note]({{ '/notes/personal-notes/xgboost/' | relative_url }}).</p>
