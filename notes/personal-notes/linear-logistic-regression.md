---
layout: page
title: "Linear & logistic regression"
subtitle: From least squares to odds and the logit
permalink: /notes/personal-notes/linear-logistic-regression/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

### Linear regression

You model a numeric response as a **linear function** of features (plus noise). With predictors $x \in \mathbb{R}^p$ and coefficients $\beta$ (and intercept often absorbed into $x$ with a constant 1),

$$
y \approx x^\top \beta.
$$

**Ordinary least squares (OLS)** picks $\beta$ by minimizing squared error on training data $(x_i, y_i)$:

$$
\min_\beta \sum_i (y_i - x_i^\top \beta)^2.
$$

When $X$ has full column rank, the closed form is $\hat{\beta} = (X^\top X)^{-1} X^\top y$. Intuition: **project** $y$ onto the column space of the design matrix—best linear approximation in the $L_2$ sense.

Assumptions for nice inference (not always needed for prediction): linearity, independent errors with mean zero, homoskedasticity, and often Gaussian errors for exact $t$-tests.

### Logistic regression

For **binary** $y \in \{0,1\}$, linear regression is a poor model for $\Pr(y=1 \mid x)$ because predictions can leave $[0,1]$. **Logistic regression** uses the **logistic (sigmoid)** link:

$$
\Pr(y=1 \mid x) = \sigma(x^\top \beta) = \frac{1}{1 + e^{-x^\top \beta}}.
$$

Equivalently, the **log-odds** (logit) is linear:

$$
\log \frac{\Pr(y=1 \mid x)}{1 - \Pr(y=1 \mid x)} = x^\top \beta.
$$

You fit $\beta$ by **maximum likelihood** under Bernoulli likelihood (convex in $\beta$ for canonical link; optimize with IRLS / Newton or gradient methods). **Softmax** generalizes this to multi-class.

### Why this sits first

Everything else on this list is either **nonlinear**, **nonparametric**, **regularized** in a richer way, or **combinatorial** (trees, ensembles). Linear and logistic models are the **baseline**: interpretable coefficients, fast, and the starting point for **regularized** variants (ridge, lasso, elastic net on the next pages).

<p class="text-muted small">Study companions: any applied regression text; Hastie, Tibshirani & Friedman, <em>Elements of Statistical Learning</em> (ESL).</p>
