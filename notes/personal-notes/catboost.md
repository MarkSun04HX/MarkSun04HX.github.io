---
layout: page
title: "CatBoost"
subtitle: Gradient boosting with ordered targets and categorical handling
permalink: /notes/personal-notes/catboost/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Mostly words; read <a href="{{ '/notes/personal-notes/xgboost/' | relative_url }}">boosting → XGBoost</a> first for “gradients” and sequential trees.</p>

**CatBoost** (Prokhorenkova et al., Yandex) is another high-performance **gradient boosting** library. Two themes stand out: **reducing prediction shift** from target leakage in categorical encoding / boosting, and **strong defaults** for **high-cardinality categoricals**.

### Prediction shift and ordered boosting

In standard boosting, the model at step $t$ is fit using targets and predictions that **depend on the same data** you are fitting on—subtle **target leakage** through the residual structure can **bias** predictions. **Ordered boosting** uses a **random permutation** of training rows and builds residuals using only **prior** observations in that order when computing statistics for splits—closer to a **temporal** honesty and often **better generalization** with less tuning.

### Categorical features

Instead of manual one-hot with huge dimension, CatBoost uses **ordered target statistics** (smoothed encodings based on past labels within categories) integrated into the tree procedure—handles **many levels** with less hand engineering than naive approaches.

### Symmetric trees (oblivious)

CatBoost can use **symmetric** (oblivious) trees: same split structure across all branches at a depth—**faster prediction** and regularization flavor, sometimes slightly different bias–variance than fully flexible trees.

### Practical takeaway

For **heavy categorical** tabular data, CatBoost is often a **top baseline** next to LightGBM and XGBoost. As always: **cross-validate**, compare on a **holdout**, and watch **training time** vs. accuracy.

### References and attribution

- Prokhorenkova, L., et al. (2018). CatBoost: unbiased boosting with categorical features. *NeurIPS*. [arXiv:1706.09516](https://arxiv.org/abs/1706.09516)
- Companion: [XGBoost note]({{ '/notes/personal-notes/xgboost/' | relative_url }}) on this site.

**Copyright / use:** Explanatory summary only.

### Sample code (minimal)

**Python** — `pip install catboost scikit-learn`

```python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from catboost import CatBoostClassifier

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
clf = CatBoostClassifier(iterations=80, depth=4, verbose=False, random_state=0)
clf.fit(X_tr, y_tr)
print("accuracy:", round(clf.score(X_te, y_te), 3))
```

**R** — `install.packages("catboost")` (see [CatBoost R docs](https://catboost.ai/en/docs/concepts/r-reference))

```r
library(catboost)
data(iris)
y <- as.integer(iris$Species) - 1L
pool <- catboost.load_pool(data = iris[, 1:4], label = y)
fit <- catboost.train(pool, params = list(loss_function = "MultiClass", depth = 4, iterations = 80))
pred <- catboost.predict(fit, pool, prediction_type = "Class")
mean(as.integer(pred) - 1L == y)
```
