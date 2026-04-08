---
layout: personal-note
title: "Gradients & optimization for ML"
subtitle: Slopes, descent, and why so many models are “minimize a loss”
permalink: /notes/personal-notes/gradients-optimization-for-ml/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Light calculus ideas in words. Pair with <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">Math intuition for ML</a> ($\sum$, norms). This page expands the short “derivatives and gradients” paragraph there.</p>

Most supervised algorithms you will use are, at bottom: **pick parameters** so a **loss** (prediction error plus maybe penalties) is **small**. When there is no tidy closed form like OLS, we **iterate**: measure how sensitive the loss is to each parameter, then nudge parameters in a helpful direction. That sensitivity is the **gradient**.

---

### Derivative = slope of a curve

For one variable $\theta$, the **derivative** $\frac{d L}{d\theta}$ answers: “if I increase $\theta$ a **tiny** bit, does $L$ go **up** or **down**, and how fast?” **Positive** derivative → $L$ rises as $\theta$ increases; **negative** → $L$ falls.

**Gradient descent (one dimension):** update $\theta \leftarrow \theta - \eta \,\frac{dL}{d\theta}$. **$\eta$** = **learning rate** (step size). Step **opposite** the derivative to **decrease** $L$ (when $\frac{dL}{d\theta}>0$, subtract something positive from $\theta$).

---

### Partial derivatives and the gradient (many parameters)

With **many** weights—logistic $\beta$, neural net $W$ entries, boosting’s leaf values—you get one slope **per parameter**, holding others fixed: **partial** derivatives $\partial L / \partial \beta_j$, etc. Stack them into a **vector** $\nabla L$; that is the **gradient**. **Steepest ascent** direction in a smooth landscape is $\nabla L$; **gradient descent** uses $-\nabla L$.

**Plain read:** each coordinate of $\nabla L$ says “nudge this weight up a hair → loss goes up/down at this rate.” Software computes $\nabla L$ with **automatic differentiation**; **backpropagation** in neural nets is the **chain rule** from calculus, organized efficiently.

---

### Convex vs non-convex

- **Convex** loss + convex constraints: a single **bowl**—gradient descent (with care on step size) finds the **global** minimum. Examples: **ridge / lasso** objectives (in $\beta$), **logistic** log-loss (in $\beta$) are convex in the usual formulations.
- **Non-convex:** many **valleys** (neural nets, some tree ensembles with discrete splits). You still use gradients where the loss is smooth, but you may land in a **local** minimum; **initialization**, **learning rate schedules**, and **architecture** matter.

---

### Beyond vanilla gradient descent

**Stochastic gradient descent (SGD):** estimate $\nabla L$ using **one** or a **mini-batch** of examples—noisy but cheap per step; underpins large-scale linear models, deep learning, and some boosting implementations’ inner loops.

**Momentum, Adam, etc.:** adapt step sizes using **past** gradients so training is less sensitive to ill-conditioning and noise. **Second-order** methods (approximate curvature) exist but are heavier; first-order + good tuning dominates tabular and deep learning practice.

---

### Negative log-likelihood = loss

**Maximum likelihood:** choose parameters that make the observed data **most probable**. For many models that is **equivalent** to **minimizing** $-\log(\text{likelihood})$—a **loss** shaped like **cross-entropy** for classification. So **logistic regression** “MLE” and “minimize log-loss” are the same story; **gradient-based** optimizers apply directly.

---

### Where this shows up on this site

| Idea | Used in |
|------|--------|
| Gradients of loss w.r.t. predictions | [Gradient boosting / XGBoost]({{ '/notes/personal-notes/xgboost/' | relative_url }}) (“pseudo-residuals”) |
| Gradient descent on weights | [Neural networks]({{ '/notes/personal-notes/neural-networks/' | relative_url }}), [logistic regression]({{ '/notes/personal-notes/linear-logistic-regression/' | relative_url }}) at scale |
| Penalized loss minimization | [Elastic net / ridge / lasso]({{ '/notes/personal-notes/elastic-net/' | relative_url }}) |
| Smooth convex optimization | Logistic and linear models with penalties |

---

### References and attribution

- Boyd, S., & Vandenberghe, L. (2004). *Convex Optimization*. Cambridge University Press. (Free PDF on Boyd’s site.)
- Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press — optimization chapters.
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer. [Link](https://hastie.su.domains/ElemStatLearn/)

**Copyright / use:** Original explanatory summary; no reproduced text from sources.

*(No sample code—this page is conceptual; implementation lives in method-specific notes.)*
