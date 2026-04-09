---
layout: personal-note
title: "K-nearest neighbors (KNN)"
subtitle: Instance-based prediction by local voting or averaging
permalink: /notes/personal-notes/knn/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Light math below. For <em>vectors</em> and <em>distance</em> as length, see <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">Math intuition for ML notes</a>. For **metrics beyond Euclidean**, scaling, and **kernels** (comparison with SVM geometry), see <a href="{{ '/notes/personal-notes/kernels-distances-feature-maps/' | relative_url }}">Kernels, distances & feature maps</a>. For **bias–variance** with $K$, <a href="{{ '/notes/personal-notes/bias-variance-tradeoff/' | relative_url }}">Bias–variance tradeoff</a>.</p>

**KNN** stores the training set and predicts by looking at the **$K$ closest** training points to a new input $x$. Here $x$ is just the **feature list for the new case** (same columns as training). **Closest** usually means **Euclidean distance** in feature space: treat features as coordinates and measure straight-line distance—like distance on a map, but with more than two axes. Software can **scale** features first so one giant unit (e.g. income in dollars) does not drown out a small unit (e.g. years).

- **Regression:** average the responses of the $K$ neighbors.
- **Classification:** **majority vote** (or weighted vote by inverse distance).

No explicit training phase beyond storing data—**lazy learning**. The model is the whole dataset plus $K$ and the metric.



{::nomarkdown}
<div class="pn-viz">
<div class="mermaid">
flowchart LR
  Q[New point x] --> K[Find K nearest train points]
  K --> R{Task}
  R -->|regression| A[Average neighbor y]
  R -->|classification| V[Majority vote]
</div>
</div>
{:/}
<p class="pn-viz-caption">Instance-based: no training phase beyond storing data and choosing K.</p>

### Distance and scaling

Features with large numeric range dominate distance unless you **standardize** or use feature weights. **Categorical** features need encoding (one-hot, etc.) and an appropriate combined distance.

{::nomarkdown}
<div class="pn-viz">
<div class="mermaid">
flowchart LR
  RAW[Raw feature scales] --> STD[Standardize or weight]
  STD --> D[Euclidean or chosen metric]
  D --> NEI[Comparable neighbor distances]
</div>
</div>
{:/}
<p class="pn-viz-caption">Scaling aligns units so one feature does not dominate distance.</p>

### Bias–variance trade-off with $K$

- **Small $K$:** low bias, high variance (jagged, sensitive to noise).
- **Large $K$:** smoother decision boundary / predictions, more bias, less variance.

Choose $K$ by **cross-validation**. **Curse of dimensionality (intuition):** in many dimensions, “far” and “close” points can all sit at **similar** distances from you, so “nearest” becomes noisy unless you have **huge** data. Then KNN may need **fewer features** (e.g. [PCA]({{ '/notes/personal-notes/pca/' | relative_url }})) or more observations.

{::nomarkdown}
<div class="pn-viz">
<div class="mermaid">
flowchart LR
  SK[Small K] --> LB[Lower bias]
  SK --> HV[Higher variance]
  LK[Large K] --> HB[Higher bias]
  LK --> LV[Lower variance]
</div>
</div>
{:/}
<p class="pn-viz-caption">The usual bias–variance trade-off as neighborhood size changes.</p>

### Compared to linear models

KNN is **nonparametric**: it does **not** boil down to one short equation like a **weighted sum of features** ($x^\top\beta$ in [linear regression]({{ '/notes/personal-notes/linear-logistic-regression/' | relative_url }})); the “model” is literally the **stored training set**. Prediction can be **slow** when $n$ is huge (engineers use k-d trees or approximate nearest neighbors).

### References and attribution

- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer, Ch. 13. [Link](https://hastie.su.domains/ElemStatLearn/).
- James, G., et al. (2021). *An Introduction to Statistical Learning* (2nd ed.). [statlearning.com](https://www.statlearning.com/).

**Copyright / use:** Explanatory notes only; no reproduced copyrighted text.

### Sample code (minimal)

**Python** — `pip install scikit-learn`

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
clf = KNeighborsClassifier(n_neighbors=5).fit(X_tr, y_tr)
print("accuracy:", round(clf.score(X_te, y_te), 3))
```

**R** — `install.packages("class")`

```r
library(class)
idx <- sample(seq_len(nrow(iris)), size = 0.75 * nrow(iris))
train <- iris[idx, 1:4]
test <- iris[-idx, 1:4]
true <- iris$Species[-idx]
pred <- knn(train = train, test = test, cl = iris$Species[idx], k = 5)
mean(pred == true)
```
