---
layout: personal-note
title: "Kernels, distances & feature maps"
subtitle: When “closeness” and “alignment” replace explicit new columns
permalink: /notes/personal-notes/kernels-distances-feature-maps/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Uses <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">dot products</a> and **distance**. Helpful **before** [SVM]({{ '/notes/personal-notes/svm/' | relative_url }}) and alongside [KNN]({{ '/notes/personal-notes/knn/' | relative_url }}).</p>

Many algorithms only need **pairwise** comparisons between examples: **how far apart** are $x_i$ and $x_j$, or **how aligned** are they (dot product). That is enough to **implicitly** work in a **richer** feature space without building huge columns by hand.

---

### Distances for KNN and neighbors-based thinking

**Euclidean:** $\|x_i - x_j\|_2 = \sqrt{\sum_d (x_{id} - x_{jd})^2}$ — default **“straight line”** in feature space after scaling.

**Manhattan ($L_1$):** $\sum_d |x_{id} - x_{jd}|$ — **axis-aligned** distance; sometimes more robust when dimensions are noisy.

**Mahalanobis** (optional): rescales by **covariance**—accounts for **correlated** features and different **scales**; same Euclidean if features are **whitened**.

**Key practice issue:** distances are **dominated** by large-scale features unless you **standardize** or otherwise **weight** dimensions—see [KNN]({{ '/notes/personal-notes/knn/' | relative_url }}).

---

### Feature maps: $\phi(x)$

**Idea:** original $x$ may be **not linearly separable**. Build **new** features $\phi(x)$—polynomials, interactions, etc.—so a **linear** rule in $\phi$-space is a **nonlinear** boundary in $x$-space.

**Problem:** $\phi(x)$ can be **huge** or infinite-dimensional (e.g. all polynomial degrees).

---

### Kernel trick (SVM view)

A **kernel** $K(x_i, x_j)$ returns a number that **acts like** an inner product $\phi(x_i)^\top \phi(x_j)$ for **some** $\phi$, without computing $\phi$ explicitly.

**Examples:**

- **Linear:** $K(x_i, x_j) = x_i^\top x_j$.
- **Polynomial:** $(x_i^\top x_j + c)^d$ — interactions up to degree $d$.
- **RBF / Gaussian:** $\exp(-\gamma \|x_i - x_j\|^2)$ — **large** when points are **close**, **small** when **far**; very flexible, needs **$\gamma$** and **regularization** tuning.

**Mercer / PSD** condition: ensures the kernel corresponds to a **valid** inner-product space; first pass: use **standard kernels** in software.

**Read in context:** [Support Vector Machines]({{ '/notes/personal-notes/svm/' | relative_url }}) use kernels for **max-margin** classifiers in implicit feature space.

---

### Kernel ridge / Gaussian processes (pointer)

Same **kernel matrix** idea appears in **kernel ridge regression**, **Gaussian process** regression, and some **deep** theory links (e.g. infinite-width NNs and kernels). This site’s supervised track stops at SVM for classical kernels; treat the above as **orientation** if you meet those methods later.

---

### References and attribution

- Schölkopf, B., & Smola, A. J. (2002). *Learning with Kernels*. MIT Press.
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer, Ch. 12. [Link](https://hastie.su.domains/ElemStatLearn/)
- James, G., et al. (2021). *An Introduction to Statistical Learning* (2nd ed.). [statlearning.com](https://www.statlearning.com/)

**Copyright / use:** Explanatory summary only; no reproduced text from sources.

### Sample code (RBF SVM + scaled KNN)

**Python** — scale features first:

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
sc = StandardScaler().fit(X_tr)
X_tr_s, X_te_s = sc.transform(X_tr), sc.transform(X_te)

svm = SVC(kernel="rbf", gamma="scale").fit(X_tr_s, y_tr)
knn = KNeighborsClassifier(n_neighbors=7).fit(X_tr_s, y_tr)
print("SVM:", round(svm.score(X_te_s, y_te), 3), " KNN:", round(knn.score(X_te_s, y_te), 3))
```
