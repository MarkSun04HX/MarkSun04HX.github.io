---
layout: page
title: "Machine learning concepts"
subtitle: Supervision, risk, metrics, and what we are actually measuring
permalink: /notes/personal-notes/machine-learning-concepts/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;">Read this page **before** diving into individual algorithms if terms like **supervised**, **RMSE**, or **F1** are new. Pair with <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">Math intuition for ML notes</a> for notation.</p>

---

### Supervised vs unsupervised learning

| | **Supervised** | **Unsupervised** |
|---|----------------|------------------|
| **You have labels?** | Yes: each training example includes an **outcome** $y$ (class, count, score, …) or a **target** to predict. | No (or not for training): you only have features $x$ (or you ignore labels on purpose). |
| **Goal** | Learn a map $x \mapsto y$ (or distribution of $y \mid x$) that **generalizes** to new $x$. | Find **structure**: low-dimensional summaries (PCA), groups (clustering), anomalies, etc. |
| **Examples** | Spam vs not spam; house price from attributes; diagnosis from vitals. | Customer segments; gene modules; compressing many survey items into a few components. |

**Semi-supervised** (in between): lots of unlabeled $x$, a little labeled $(x,y)$—common when labeling is expensive.

On this site, **supervised** method notes start with [linear & logistic regression]({{ '/notes/personal-notes/linear-logistic-regression/' | relative_url }}); **unsupervised** notes end with [PCA]({{ '/notes/personal-notes/pca/' | relative_url }}), [k-means]({{ '/notes/personal-notes/k-means/' | relative_url }}), [hierarchical clustering]({{ '/notes/personal-notes/hierarchical-clustering/' | relative_url }}).

---

### Prediction / classification vs association

- **Prediction (supervised):** you care about **forecasts on new data**—e.g. “given this loan application, will they default?” Quality is measured by **out-of-sample** error (holdout, cross-validation), not by how big a regression coefficient looks.
- **Association / description:** you care about **relationships in the data at hand**—e.g. “is higher education correlated with income in this survey?” That is closer to **statistics / econometrics** (estimates, confidence intervals, causality arguments). The same fitted model can support **both** stories, but the **question** differs: *score new rows* vs *quantify and interpret relationships*.

**Important:** a **high** in-sample $R^2$ does **not** prove the model predicts well tomorrow; it can mean **overfitting**.

---

### Empirical risk vs population risk

- **Loss function** $\ell(y, \hat{y})$ scores one prediction $\hat{y}$ against truth $y$ (e.g. squared error $(y-\hat{y})^2$, or 0–1 wrong-class loss).
- **Population risk** (theoretical): $R(f) = \mathbb{E}[\ell(Y, f(X))]$ if $(X,Y)$ come from the **real-world process** you care about. You **never** observe this exactly.
- **Empirical risk** (what you compute): average loss on a **finite sample**—e.g. **training error** $\frac{1}{n}\sum_i \ell(y_i, f(x_i))$, or **validation / test** error on a held-out set.

**Intuition:** empirical risk is a **noisy estimate** of population risk. **Regularization**, **more data**, and **honest validation** are how we push empirical risk on a holdout set closer to what we would see in production.

---

### Regression metrics (numeric $y$)

Let $y_i$ be actual values and $\hat{y}_i$ predictions on a set of $n$ points.

- **MAE (mean absolute error):** average of absolute errors, $\frac{1}{n}\sum_i \lvert y_i - \hat{y}_i\rvert$. Same units as $y$; **robust** to a few huge errors.
- **MSE (mean squared error):** average squared error, $\frac{1}{n}\sum_i (y_i - \hat{y}_i)^2$. Punishes **large** mistakes more.
- **RMSE:** square root of MSE—back in $y$’s units; very common for reporting.
- **$R^2$:** one minus (model sum of squared errors) / (total variance of $y$ around its mean). “Share of variance explained” **on that dataset**; can be **negative** on a test set if the model loses to predicting $\bar{y}$.

**Reporting:** RMSE/MAE describe **typical error size**; $R^2$ is **relative** fit—use cautiously on test data.

---

### Classification metrics (categorical $y$)

Focus on **binary** first (positive / negative class); multiclass extends via **one-vs-rest** or **macro / micro** averages.

- **Accuracy:** fraction correct—simple but **misleading under class imbalance** (predicting the majority class always can look “accurate”).
- **Confusion matrix:** TP, TN, FP, FN (or $K \times K$ for many classes)—always useful for **reading** other metrics.
- **Precision (for class +):** among predicted positives, fraction truly positive—$\mathrm{TP}/(\mathrm{TP}+\mathrm{FP})$.
- **Recall / sensitivity:** among true positives, fraction found—$\mathrm{TP}/(\mathrm{TP}+\mathrm{FN})$.
- **$F_1$:** harmonic mean of precision and recall; **macro** $F_1$ averages across classes equally; **weighted** $F_1$ weights by class frequency.
- **Balanced accuracy:** average of per-class recall (binary: sensitivity and specificity averaged).
- **G-mean (binary):** geometric mean of TPR and TNR, $\sqrt{\mathrm{TPR} \times \mathrm{TNR}}$—penalizes ignoring **either** class in imbalance.

**Probabilistic** classifiers: **log loss** (cross-entropy) penalizes **confident wrong** probabilities; **Brier score** measures mean squared error of predicted probabilities. **ROC–AUC** summarizes tradeoff of TPR vs FPR across thresholds (ranking quality), not one fixed threshold.

---

### Which metric should I report?

- **Regression:** RMSE or MAE for **scale**; $R^2$ as optional context.
- **Balanced classes, symmetric errors:** accuracy can be fine.
- **Imbalanced classes or unequal mistake costs:** report **precision/recall** or **$F_1$**, **balanced accuracy**, or **G-mean**, plus the **confusion matrix**.
- **Probabilities matter** (calibration, ranking): log loss, Brier, ROC–AUC.

---

### References and attribution

- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer. [Author page](https://hastie.su.domains/ElemStatLearn/) — evaluation, loss functions, model assessment.
- James, G., et al. (2021). *An Introduction to Statistical Learning* (2nd ed.). [statlearning.com](https://www.statlearning.com/) — accessible parallel treatment.

**Copyright / use:** Original explanatory summary; no reproduced text from sources.

**Sample code:** See supervised method pages (e.g. [logistic regression]({{ '/notes/personal-notes/linear-logistic-regression/' | relative_url }})) for sklearn/R examples; metrics are usually `sklearn.metrics` or `yardstick` / `caret` in R.
