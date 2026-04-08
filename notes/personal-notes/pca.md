---
layout: page
title: "Principal Component Analysis (PCA)"
subtitle: Directions of maximum variance and low-rank approximation
permalink: /notes/personal-notes/pca/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

**PCA** finds **orthogonal directions** in feature space along which the data vary the **most** (after centering). It is **unsupervised**: no labels—only the **covariance structure** of $X$.

### Population view

For random $X \in \mathbb{R}^p$ with mean zero, the **first principal direction** $v_1$ maximizes $\mathrm{Var}(v_1^\top X)$ subject to $\|v_1\|=1$. Successive components $v_2, v_3, \ldots$ are **orthogonal** and capture **remaining** variance in order. These are **eigenvectors** of the covariance matrix $\Sigma = \mathbb{E}[XX^\top]$; eigenvalues are the **variances** along each component.

### Sample PCA

With data matrix $X$ (rows = observations, columns centered), PCA = **SVD** of $X$ or eigendecomposition of $X^\top X$ (up to scaling). **Scores** $X V_k$ project data onto the top $k$ eigenvectors—**dimension reduction** from $p$ to $k \ll p$.

### Best low-rank approximation

PCA gives the **best rank-$k$ linear approximation** of centered $X$ in **Frobenius norm** (Eckart–Young). Useful for **denoising**, **compression**, and **visualization** (PC1 vs PC2 plots).

### Caveats

- **Scale-sensitive:** standardize variables if units differ.
- **Linear:** only **linear** manifolds; nonlinear structure needs **kernel PCA**, autoencoders, etc.
- **Interpretation:** PCs are **mixtures** of original features—harder to explain than original variables unless loadings are sparse (sparse PCA methods exist).

<p class="text-muted small">ESL, Ch. 14; Jolliffe, <em>Principal Component Analysis</em>.</p>
