---
layout: page
title: "K-nearest neighbors (KNN)"
subtitle: Instance-based prediction by local voting or averaging
permalink: /notes/personal-notes/knn/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

**KNN** stores the training set and predicts by looking at the **$K$ closest** training points to a new input $x$ (under a distance on feature space, often Euclidean after scaling).

- **Regression:** average the responses of the $K$ neighbors.
- **Classification:** **majority vote** (or weighted vote by inverse distance).

No explicit training phase beyond storing data—**lazy learning**. The model is the whole dataset plus $K$ and the metric.

### Distance and scaling

Features with large numeric range dominate distance unless you **standardize** or use feature weights. **Categorical** features need encoding (one-hot, etc.) and an appropriate combined distance.

### Bias–variance trade-off with $K$

- **Small $K$:** low bias, high variance (jagged, sensitive to noise).
- **Large $K$:** smoother decision boundary / predictions, more bias, less variance.

Choose $K$ by **cross-validation**. In high dimensions, distances concentrate—“**curse of dimensionality**”—and KNN often needs many points or **dimension reduction** (e.g. PCA) to work well.

### Compared to linear models

KNN is **nonparametric** and can capture arbitrary local structure, but it does not give a compact formula like $x^\top\beta$ and can be slow at prediction time when $n$ is huge (index structures like k-d trees or approximate NN help).

<p class="text-muted small">ESL, Ch. 13; James et al., <em>Introduction to Statistical Learning</em>.</p>
