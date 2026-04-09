---
layout: personal-note
title: "Elastic net, ridge & lasso"
subtitle: Penalized linear models for stability and selection
permalink: /notes/personal-notes/elastic-net/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Builds on <a href="{{ '/notes/personal-notes/linear-logistic-regression/' | relative_url }}">linear regression</a>. For $\sum$, norms $\|\cdot\|$, see <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">Math intuition for ML notes</a>. For **why we minimize penalized loss** (gradients, convexity), see <a href="{{ '/notes/personal-notes/gradients-optimization-for-ml/' | relative_url }}">Gradients & optimization</a>.</p>

**Big picture:** You still predict with a **weighted sum of features** (linear model), but you **penalize** large weights so the model is **simpler** and **less jumpy** on new data—especially when you have **many** features or **correlated** predictors.

Start from linear regression with **penalties** on $\beta$ (often excluding intercept from penalty). Training criterion:

$$
\min_\beta \;\sum_i (y_i - x_i^\top \beta)^2 + \lambda \,\Omega(\beta).
$$



{::nomarkdown}
<div class="pn-viz">
<div class="mermaid">
flowchart TB
  OLS[Least squares fit] --> PEN[Plus L1 and L2 penalties]
  PEN --> SHR[Shrinks coefficients]
  SHR --> SEL[Some coefficients to zero]
</div>
</div>
{:/}
<p class="pn-viz-caption">Elastic net blends ridge (L2) stability and lasso (L1) sparsity.</p>

### Ridge ($L_2$)

$$
\Omega(\beta) = \|\beta\|_2^2 = \sum_j \beta_j^2.
$$

**Plain read:** $\sum_j \beta_j^2$ = **sum of squares** of every weight—big weights are taxed. **Shrinks** coefficients toward zero; with correlated predictors, it **spreads** weight among them. Stabilizes $(X^\top X)$ when it is ill-conditioned. **Does not** zero out coefficients—no automatic variable selection.

### Lasso ($L_1$)

$$
\Omega(\beta) = \|\beta\|_1 = \sum_j |\beta_j|.
$$

**Plain read:** $\sum_j |\beta_j|$ = add **absolute values** of weights—some can be pushed **exactly to zero**—**sparse** models, interpretable when sparsity matches truth. Geometry: diamond constraint touches axes at corners.

### Elastic net

**Blend** of $L_1$ and $L_2$:

$$
\Omega(\beta) = \alpha \|\beta\|_1 + \frac{1-\alpha}{2}\|\beta\|_2^2
$$

(or equivalent parameterizations with two tuning knobs $\lambda$ and $\alpha$). Motivation: with **highly correlated** groups of variables, lasso may pick one arbitrarily; elastic net **groups** correlated predictors more like ridge while keeping some lasso sparsity.

### Logistic (and GLM) extensions

The same penalties attach to the **negative log-likelihood** instead of squared error (that is the logistic / classification analog of squared error). **Convex** here means “one bowl-shaped objective”—good for optimization in software; you do not need the algorithm names to use `glmnet`-style tools.

### Tuning

Use **cross-validation** on a grid of $\lambda$ (and $\alpha$ for elastic net). **Standardize** predictors before penalizing so scale does not arbitrary drive penalties.

### References and attribution

- Zou, H., & Hastie, T. (2005). Regularization and variable selection via the elastic net. *Journal of the Royal Statistical Society: Series B*, 67(2), 301–320.
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer, Ch. 3–4. [Link](https://hastie.su.domains/ElemStatLearn/).
- Friedman, J., Hastie, T., & Tibshirani, R. (2010). Regularization paths for generalized linear models via coordinate descent. *Journal of Statistical Software*, 33(1), 1–22. (`glmnet`)

**Copyright / use:** Explanatory summary; no reproduced copyrighted prose.

### Sample code (minimal)

**Python** — `pip install scikit-learn` (includes `ElasticNet`, `LogisticRegression` with `penalty="elasticnet"` + `solver="saga"`)

```python
from sklearn.datasets import make_regression
from sklearn.linear_model import ElasticNet

X, y = make_regression(n_samples=200, n_features=20, noise=5, random_state=0)
m = ElasticNet(alpha=0.1, l1_ratio=0.5, random_state=0).fit(X, y)
print("nonzero coef count:", (m.coef_ != 0).sum())
```

**R** — `install.packages("glmnet")`

```r
library(glmnet)
X <- matrix(rnorm(200 * 20), 200, 20)
y <- X %*% rnorm(20) + rnorm(200)
fit <- cv.glmnet(X, y, alpha = 0.5)
coef(fit, s = "lambda.min")
```
