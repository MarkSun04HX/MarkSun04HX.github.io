---
layout: personal-note
title: "Bias–variance tradeoff"
subtitle: Simple models vs flexible models—and what “averaging” fixes
permalink: /notes/personal-notes/bias-variance-tradeoff/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Complements [Machine learning concepts]({{ '/notes/personal-notes/machine-learning-concepts/' | relative_url }}) (empirical risk, metrics). No heavy algebra—just **variance** as “how much the fitted model would move if we re-sampled training data.”</p>

When you fit a model $\hat{f}$ from **one** training set and score it on **new** data, error comes from three intuitive pieces:

1. **Irreducible error** — noise in $y$ that no $x$ can explain.
2. **Bias** — **systematic** gap because your model class cannot represent the truth (e.g. fitting a line when the world is highly curved).
3. **Variance** — **sensitivity** of $\hat{f}$ to which training points you saw; flexible models **fit the training idiosyncrasies** and **swing** more when data changes.

**Bias–variance tradeoff (classical story):** more **flexibility** often lowers bias but raises variance; **simpler** models do the opposite. **Sweet spot** depends on **sample size**, **noise**, and **truth**.

---

### Squared-error regression (decomposition sketch)

For squared error at a fixed $x$, under the usual textbook assumptions,

$$
\mathbb{E}\bigl[(Y - \hat{f}(x))^2\bigr] = \text{noise} + \text{bias}^2(x) + \text{variance of }\hat{f}(x).
$$

You do **not** need the formula on first read—only the **picture**: total error = **unavoidable** + **wrong shape** + **wiggly fitting**.

---

### Where you see it on this site

| Setting | Typical pattern |
|--------|------------------|
| [KNN]({{ '/notes/personal-notes/knn/' | relative_url }}) | Small $K$ → low bias, high variance; large $K$ → smoother, more bias, less variance |
| [Linear regression]({{ '/notes/personal-notes/linear-logistic-regression/' | relative_url }}) | Low variance, can be **biased** if true relationship is nonlinear |
| [Decision trees]({{ '/notes/personal-notes/tree-models/' | relative_url }}) | Deep tree: low bias, **high variance** |
| [Random Forest]({{ '/notes/personal-notes/random-forest/' | relative_url }}) | Keeps **low-bias** trees but **averages** to cut **variance** |
| [Boosting]({{ '/notes/personal-notes/xgboost/' | relative_url }}) | Sequentially reduces **bias** of an additive model; can **overfit** if too many rounds (variance / generalization issue) |
| [Ridge / lasso]({{ '/notes/personal-notes/elastic-net/' | relative_url }}) | **Shrink** coefficients → **less variance**, **more bias** |

---

### Modern caveat

For **very flexible** models (deep nets, large ensembles), the clean **U-shaped** “bias + variance vs complexity” picture is still **pedagogically** useful, but **double descent** and **interpolation** regimes show richer behavior. For **practice**, still: **validate** on held-out data, use **regularization**, and **match model capacity** to data and noise.

---

### References and attribution

- Geman, S., Bienenstock, E., & Doursat, R. (1992). Neural networks and the bias/variance dilemma. *Neural Computation*, 4(1), 1–58.
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer, Ch. 7. [Link](https://hastie.su.domains/ElemStatLearn/)
- James, G., et al. (2021). *An Introduction to Statistical Learning* (2nd ed.). [statlearning.com](https://www.statlearning.com/)

**Copyright / use:** Original explanatory summary; no reproduced text from sources.

*(No sample code—see method pages for tuning $K$, depth, $\lambda$, etc.)*
