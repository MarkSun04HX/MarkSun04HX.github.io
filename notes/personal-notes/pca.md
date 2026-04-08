---
layout: page
title: "Principal Component Analysis (PCA)"
subtitle: Directions of maximum variance and low-rank approximation
permalink: /notes/personal-notes/pca/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Uses **variance**, **orthogonal** (at right angles), and **eigen**-words. For vectors and matrices as spreadsheets, see <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">Math intuition for ML notes</a>.</p>

**PCA** (principal component analysis) finds a **new set of axes** for your data. **First axis** = direction along which the cloud of points **spreads out the most** (largest variance). **Second axis** = next direction, **perpendicular** to the first, with the **next** most spread—and so on. **No labels** (**unsupervised**): you only use the **numeric columns** $X$.

### Population view

For random $X \in \mathbb{R}^p$ with mean zero, the **first principal direction** $v_1$ maximizes $\mathrm{Var}(v_1^\top X)$ subject to $\|v_1\|=1$. **Translation:** pick a **direction** in feature space (unit length); project every data point onto that line; measure how **spread out** those projections are; PCA picks the direction with **maximum** spread. Successive components $v_2, v_3, \ldots$ are **orthogonal** (90°) and capture **remaining** variance in order. **Eigenvector / eigenvalue** (advanced label): those directions solve a standard matrix equation for the **covariance** of features; **eigenvalue** = variance along that component. First pass: **PC1** = “main axis of the cloud,” **PC2** = perpendicular “secondary axis.”

### Sample PCA

With data matrix $X$ (rows = people/examples, columns = features, **subtract column means** first), software computes PCA via **SVD** or **eigendecomposition**—you do **not** need to implement this. **Scores** $X V_k$ = **coordinates** of each row on the first $k$ new axes—**dimension reduction** from $p$ features to $k \ll p$ numbers per row (compression / visualization).

### Best low-rank approximation

PCA gives the **best** (in a precise least-squares sense) **linear** $k$-dimensional summary of centered $X$—**Eckart–Young** theorem. **Frobenius norm** ≈ “root sum of squares of all matrix entries” as a measure of error. Useful for **denoising**, **compression**, and **2D plots** (PC1 vs PC2).

### Caveats

- **Scale-sensitive:** standardize variables if units differ.
- **Linear:** only **linear** manifolds; nonlinear structure needs **kernel PCA**, autoencoders, etc.
- **Interpretation:** PCs are **mixtures** of original features—harder to explain than original variables unless loadings are sparse (sparse PCA methods exist).

### References and attribution

- Jolliffe, I. T., & Cadima, J. (2016). Principal component analysis: a review and recent developments. *Philosophical Transactions of the Royal Society A*, 374(2065), 20150202.
- Jolliffe, I. T. (2002). *Principal Component Analysis* (2nd ed.). Springer.
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer, Ch. 14. [Link](https://hastie.su.domains/ElemStatLearn/)

**Copyright / use:** Explanatory summary; no reproduced material from texts.

### Sample code (minimal)

**Python** — `pip install scikit-learn`

```python
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

X, _ = load_iris(return_X_y=True)
X = StandardScaler().fit_transform(X)
Z = PCA(n_components=2).fit_transform(X)
print("shape after PCA:", Z.shape)
```

**R** — base `stats`

```r
X <- scale(iris[, 1:4])
pc <- prcomp(X, center = FALSE, scale. = FALSE)  # already scaled
head(pc$x[, 1:2])
summary(pc)$importance[, 1:3]
```
