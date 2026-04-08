---
layout: page
title: "Random Forest"
subtitle: Bagging plus random feature subsets at each split
permalink: /notes/personal-notes/random-forest/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Assumes you know what a <a href="{{ '/notes/personal-notes/tree-models/' | relative_url }}">decision tree</a> is. For **bagging vs boosting** and **why averaging trees cuts variance**, see <a href="{{ '/notes/personal-notes/ensembles-bagging-boosting/' | relative_url }}">Ensembles: bagging vs boosting</a> and <a href="{{ '/notes/personal-notes/bias-variance-tradeoff/' | relative_url }}">Bias–variance tradeoff</a>. $\sqrt{p}$ means “square root of the number of features”—a common default for how many features to try per split.</p>

**Random Forest (RF)** is an **ensemble** of many **deep decision trees**, each trained on a **bootstrap sample** of the data (**bagging** = bootstrap aggregating). The final prediction is the **average** of tree predictions (regression) or a **vote** (classification).

### Key extra idea beyond bagging

At each split, consider only a **random subset** of features (e.g. about $\sqrt{p}$ out of $p$ features for classification, about $p/3$ for regression in common defaults—$p$ = **how many columns** you could split on). This **decorrelates** trees: if one strong feature dominates, bagging alone still produces correlated trees; **random subspace** at splits forces other variables to contribute, **reducing variance** of the average.

### Intuition

- Single deep tree: low bias, high variance.
- Average of many **roughly independent** low-bias models: if they were perfectly independent, averaging would cut **variance** about like $1/B$ for $B$ trees; in practice trees are **correlated**, so the gain is smaller—but still often large. **i.i.d.** = independent and identically distributed (idealized coin-flip intuition).

### Out-of-bag (OOB) error

Each tree is trained on ~63% of points (bootstrap). The remaining **OOB** points are a natural validation set for that tree; aggregating OOB predictions estimates **generalization error** without a separate holdout.

### Compared to boosting

RF trees are often **deep** and **parallel**; **boosting** grows trees **sequentially** to correct residuals and often uses **shallower** trees. RF is harder to overfit by “adding too many trees” (more trees usually stabilize); boosting can overfit if iteration count is unchecked.

### Practical notes

- Less sensitive to hyperparameters than boosting, but tune **number of trees**, **mtry** (feature subset size), and **min node size** / depth.
- **Variable importance**: mean decrease in impurity or **permutation importance** (shuffle feature, measure drop in OOB or CV performance)—interpret with care (correlation, bias toward high-cardinality features).

### References and attribution

- Breiman, L. (2001). Random forests. *Machine Learning*, 45(1), 5–32. [DOI 10.1023/A:1010933404324](https://doi.org/10.1023/A:1010933404324)
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer, Ch. 15. [Link](https://hastie.su.domains/ElemStatLearn/).

**Copyright / use:** Explanatory summary; no reproduced copyrighted material.

### Sample code (minimal)

**Python** — `pip install scikit-learn`

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
clf = RandomForestClassifier(n_estimators=100, max_features="sqrt", random_state=0).fit(X_tr, y_tr)
print("accuracy:", round(clf.score(X_te, y_te), 3))
```

**R** — `install.packages("randomForest")`

```r
library(randomForest)
idx <- sample(seq_len(nrow(iris)), size = 0.75 * nrow(iris))
tr <- iris[idx, ]
te <- iris[-idx, ]
fit <- randomForest(Species ~ ., data = tr, ntree = 100, mtry = 2)
mean(predict(fit, te) == te$Species)
```
