---
layout: personal-note
title: "LightGBM"
subtitle: Histogram-based gradient boosting with leaf-wise growth
permalink: /notes/personal-notes/lightgbm/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Continues <a href="{{ '/notes/personal-notes/xgboost/' | relative_url }}">XGBoost / boosting</a> and <a href="{{ '/notes/personal-notes/ensembles-bagging-boosting/' | relative_url }}">Ensembles: bagging vs boosting</a>. For **gradients** in the loss, <a href="{{ '/notes/personal-notes/gradients-optimization-for-ml/' | relative_url }}">Gradients & optimization</a>. Here $n$ = number of **rows** (examples), $p$ = number of **features** (columns).</p>

**LightGBM** (Ke et al., Microsoft) is **gradient boosting** with trees, like **XGBoost**, but with implementation choices that favor **speed** and **memory efficiency** on **large** datasets—especially when $n$ (sample size) or $p$ (feature count) is big.

### Histogram-based splits

Continuous features are **binned** into discrete buckets (like a **histogram**). Splits are chosen by **aggregating gradients** (see [boosting note]({{ '/notes/personal-notes/xgboost/' | relative_url }}): slopes of the loss) into bins rather than sorting every feature at every node—**much faster** and lower memory than exact pre-sorted algorithms on massive data.

### Leaf-wise (best-first) growth

Classic boosting often grows trees **level-wise** (all leaves at current depth before going deeper). LightGBM often grows **leaf-wise**: split the leaf that yields the **largest loss reduction**. This can produce **deeper, asymmetrical** trees with **lower training loss** for the same number of leaves—but **higher overfitting risk** if unchecked. Mitigate with **max depth**, **min data in leaf**, **num leaves**, and **regularization** parameters.

### GOSS and EFB (optional intuition)

**Gradient-based One-Side Sampling (GOSS):** keep instances with **large gradients** (underfit examples matter more) and **randomly sample** from small-gradient instances—focuses computation where the model still errs.

**Exclusive Feature Bundling (EFB):** bundle **mutually exclusive** sparse features to reduce effective dimensionality.

### When to consider LightGBM

Strong default for **tabular** competitions and production when data is **large** and you want **fast** iteration. Compare **validation** performance against **XGBoost** and **CatBoost**; winners are problem-dependent.

### References and attribution

- Ke, G., et al. (2017). LightGBM: A highly efficient gradient boosting decision tree. *NeurIPS*. [PDF via NeurIPS proceedings](https://papers.nips.cc/paper/6907-lightgbm-a-highly-efficient-gradient-boosting-decision-tree)
- Chen, T., & Guestrin, C. (2016). XGBoost (related family). See also the [XGBoost note]({{ '/notes/personal-notes/xgboost/' | relative_url }}) on this site.

**Copyright / use:** Explanatory summary only.

### Sample code (minimal)

**Python** — `pip install lightgbm scikit-learn`

```python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
import lightgbm as lgb

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
clf = lgb.LGBMClassifier(n_estimators=80, max_depth=-1, num_leaves=31, random_state=0)
clf.fit(X_tr, y_tr)
print("accuracy:", round(clf.score(X_te, y_te), 3))
```

**R** — `install.packages("lightgbm")`

```r
library(lightgbm)
data(iris)
y <- as.integer(iris$Species) - 1L
X <- as.matrix(iris[, 1:4])
dtrain <- lgb.Dataset(data = X, label = y)
params <- list(objective = "multiclass", num_class = 3, max_depth = 4)
bst <- lgb.train(params, dtrain, nrounds = 50, verbose = -1)
pred <- predict(bst, X, reshape = TRUE)
mean(max.col(pred) - 1L == y)
```
