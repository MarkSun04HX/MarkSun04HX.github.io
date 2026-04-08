---
layout: page
title: "K-nearest neighbors (KNN)"
subtitle: Instance-based prediction by local voting or averaging
permalink: /notes/personal-notes/knn/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Light math below. For <em>vectors</em> and <em>distance</em> as length, see <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">Math intuition for ML notes</a>.</p>

**KNN** stores the training set and predicts by looking at the **$K$ closest** training points to a new input $x$. Here $x$ is just the **feature list for the new case** (same columns as training). **Closest** usually means **Euclidean distance** in feature space: treat features as coordinates and measure straight-line distance—like distance on a map, but with more than two axes. Software can **scale** features first so one giant unit (e.g. income in dollars) does not drown out a small unit (e.g. years).

- **Regression:** average the responses of the $K$ neighbors.
- **Classification:** **majority vote** (or weighted vote by inverse distance).

No explicit training phase beyond storing data—**lazy learning**. The model is the whole dataset plus $K$ and the metric.

### Distance and scaling

Features with large numeric range dominate distance unless you **standardize** or use feature weights. **Categorical** features need encoding (one-hot, etc.) and an appropriate combined distance.

### Bias–variance trade-off with $K$

- **Small $K$:** low bias, high variance (jagged, sensitive to noise).
- **Large $K$:** smoother decision boundary / predictions, more bias, less variance.

Choose $K$ by **cross-validation**. **Curse of dimensionality (intuition):** in many dimensions, “far” and “close” points can all sit at **similar** distances from you, so “nearest” becomes noisy unless you have **huge** data. Then KNN may need **fewer features** (e.g. [PCA]({{ '/notes/personal-notes/pca/' | relative_url }})) or more observations.

### Compared to linear models

KNN is **nonparametric**: it does **not** boil down to one short equation like a **weighted sum of features** ($x^\top\beta$ in [linear regression]({{ '/notes/personal-notes/linear-logistic-regression/' | relative_url }})); the “model” is literally the **stored training set**. Prediction can be **slow** when $n$ is huge (engineers use k-d trees or approximate nearest neighbors).

<p class="text-muted small">ESL, Ch. 13; James et al., <em>Introduction to Statistical Learning</em>.</p>
