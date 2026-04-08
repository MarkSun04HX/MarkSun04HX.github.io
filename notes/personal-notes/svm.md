---
layout: personal-note
title: "Support Vector Machines (SVM)"
subtitle: Max-margin separation and kernels
permalink: /notes/personal-notes/svm/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Uses <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">dot products</a> and <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">norms</a>. For **feature maps, RBF kernels, and distance intuition**, read <a href="{{ '/notes/personal-notes/kernels-distances-feature-maps/' | relative_url }}">Kernels, distances & feature maps</a> alongside this page.</p>

### Linear separable case (hard margin)

For binary labels $y_i \in \{-1,+1\}$ (two classes coded as $+1$ and $-1$), a **linear SVM** draws a **flat boundary** between classes. In 2D it is a **line**; in 3D a **plane**; in higher dimensions people say **hyperplane**—same idea. The equation $w^\top x + b = 0$ is just “**weighted sum of features** plus a shift $b$ equals zero” on the boundary (same $w^\top x$ pattern as [linear regression]({{ '/notes/personal-notes/linear-logistic-regression/' | relative_url }}), but used for **geometry** here). The SVM picks the boundary with the **widest empty corridor** (**margin**) to the nearest points (**support vectors**). Maximize margin $\Leftrightarrow$ minimize $\|w\|^2$ subject to $y_i(w^\top x_i + b) \ge 1$.

### Soft margin

Allow **slack** $\xi_i$ for overlap or noise:

$$
\min_{w,b,\xi} \frac{1}{2}\|w\|^2 + C \sum_i \xi_i \quad \text{s.t.} \quad y_i(w^\top x_i + b) \ge 1 - \xi_i,\;\; \xi_i \ge 0.
$$

**$C$** trades margin width vs. violations—large $C$ pushes toward hard margin.

### Hinge loss view

Equivalent (up to scaling) to minimizing

$$
\sum_i \max\bigl(0, 1 - y_i(w^\top x_i + b)\bigr) + \lambda \|w\|^2,
$$

a **hinge loss** plus $L_2$ penalty—convex but non-smooth at kinks; solved via quadratic programming or SMO-style algorithms.

### Kernels

**Kernel trick:** replace inner products $x_i^\top x_j$ (a single number measuring **alignment** between two rows) with $K(x_i, x_j)$ where $K$ is a **kernel** (e.g. **RBF / Gaussian** $e^{-\gamma \|x_i-x_j\|^2}$, large when points are **close**, small when **far**). **Story:** you act as if you mapped data into a **huge** feature space where a **linear** boundary works, without ever writing that huge map down—only $K$ is needed. **Positive semi-definite** is a technical condition so the math is well-behaved; first pass: trust common kernels in software.

### SVM for regression (SVR)

**$\epsilon$-insensitive** tube: errors inside the tube cost zero; outside, linear or quadratic penalty—same margin philosophy in function space.

### Compared to trees and NNs

SVMs shine in **medium** $n$, **carefully tuned** kernels; training can be $O(n^2)$–$O(n^3)$ for exact solvers. **Less** common as default in huge sparse tabular data than **gradient boosting**, but still standard for **text** (linear SVM on high-dim sparse features) and some bio applications.

### References and attribution

- Cortes, C., & Vapnik, V. (1995). Support-vector networks. *Machine Learning*, 20(3), 273–297. [DOI 10.1007/BF00994018](https://doi.org/10.1007/BF00994018)
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer, Ch. 12. [Link](https://hastie.su.domains/ElemStatLearn/).
- Schölkopf, B., & Smola, A. J. (2002). *Learning with Kernels*. MIT Press.

**Copyright / use:** Explanatory summary only; no reproduced copyrighted prose.

### Sample code (minimal)

**Python** — `pip install scikit-learn`

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
clf = SVC(kernel="rbf", C=1.0, gamma="scale").fit(X_tr, y_tr)
print("accuracy:", round(clf.score(X_te, y_te), 3))
```

**R** — `install.packages("e1071")`

```r
library(e1071)
idx <- sample(seq_len(nrow(iris)), size = 0.75 * nrow(iris))
tr <- iris[idx, ]
te <- iris[-idx, ]
fit <- svm(Species ~ ., data = tr, kernel = "radial", cost = 1)
mean(predict(fit, te) == te$Species)
```
