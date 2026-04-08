---
layout: page
title: "Linear & logistic regression"
subtitle: From least squares to odds and the logit
permalink: /notes/personal-notes/linear-logistic-regression/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Light math below. If <em>vectors</em> or $x^\top \beta$ are unfamiliar, skim <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">Math intuition for ML notes</a> first.</p>

### Linear regression

You model a numeric response as a **linear function** of features (plus noise). In words: each feature gets a **weight**; the prediction is **add up (weight × feature)** (plus often a constant). With $p$ features, $x \in \mathbb{R}^p$ just means “a list of $p$ numbers for this row,” and $\beta$ is the list of weights. The intercept is often hidden by adding a fake feature that is always 1.

$$
y \approx x^\top \beta.
$$

**Plain read:** $x^\top \beta$ is only shorthand for that weighted sum—see the [primer]({{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}).

**Ordinary least squares (OLS)** picks $\beta$ by minimizing squared error on training data $(x_i, y_i)$:

$$
\min_\beta \sum_i (y_i - x_i^\top \beta)^2.
$$

When $X$ has full column rank, the closed form is $\hat{\beta} = (X^\top X)^{-1} X^\top y$. **Without matrix courses:** you can skip memorizing this—software solves it. Intuition: find the **one** set of weights that makes the model’s predictions **as close as possible** to real $y$ in **sum of squared errors**. Geometrically: **project** $y$ onto the “linear combinations of columns of $X$”—the closest point in that flat subspace.

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

You fit $\beta$ by **maximum likelihood**: choose weights that make the observed 0/1 outcomes **most plausible** under the model (software uses IRLS / Newton / gradient methods). **Softmax** is the multi-class cousin (“pick among several categories” instead of binary).

**Modeling vs. causation:** These equations describe **association** between $x$ and $y$ for prediction; they do **not** by themselves prove $x$ *causes* $y$.

### Why this sits first

Everything else on this list is either **nonlinear**, **nonparametric**, **regularized** in a richer way, or **combinatorial** (trees, ensembles). Linear and logistic models are the **baseline**: interpretable coefficients, fast, and the starting point for **regularized** variants (ridge, lasso, elastic net on the next pages).

<p class="text-muted small">Study companions: any applied regression text; Hastie, Tibshirani & Friedman, <em>Elements of Statistical Learning</em> (ESL).</p>
