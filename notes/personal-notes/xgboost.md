---
layout: page
title: "From boosting to XGBoost"
subtitle: Intuition, gradient boosting, and what XGBoost adds
permalink: /notes/personal-notes/xgboost/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a> · <a href="{{ '/notes/' | relative_url }}">Notes home</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> This page has more formulas than the others. For **sums**, **derivatives as slopes**, and **vectors**, read <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">Math intuition for ML notes</a> and <a href="{{ '/notes/personal-notes/gradients-optimization-for-ml/' | relative_url }}">Gradients & optimization</a>; for **bagging vs boosting**, <a href="{{ '/notes/personal-notes/ensembles-bagging-boosting/' | relative_url }}">Ensembles</a>. You should know <a href="{{ '/notes/personal-notes/tree-models/' | relative_url }}">tree models</a> first.</p>

This note builds **boosting** from a simple idea, then **gradient boosting**, then **XGBoost** (eXtreme Gradient Boosting). The goal is intuition first; notation shows up when it shortens the story.

**Inline formulas** use dollar delimiters; **display** formulas are on their own lines between `$$` pairs so they scale and wrap more reliably in the browser.

---

### 1. The core idea of boosting

Imagine a **weak learner**: a model that is only slightly better than random guessing (formally, accuracy a bit above chance on classification, or correlation with the target on regression). **Boosting** combines many weak learners into one **strong** predictor by **sequential correction**.

- Round 1: fit a simple model. It makes mistakes.
- Round 2: fit another simple model that pays **extra attention** to those mistakes (or to their residuals).
- Repeat. The final prediction is an **additive combination** of all the small models.

So boosting is an **ensemble** method, but unlike **bagging** (parallel bootstrap models like random forests), boosting is **sequential** and **adaptive**. Each new piece is trained to fix what the sum of previous pieces still gets wrong.

---

### 2. AdaBoost as a warm-up (classification)

**AdaBoost** (Adaptive Boosting) is a classic example. You have labels $y_i \in \{-1,+1\}$ and weighted data points. After each weak learner $h_t(x)$, you **increase weights** on misclassified examples so the next learner focuses on them. The combined classifier is a **weighted vote**:

$$
F_T(x) = \sum_{t=1}^{T} \alpha_t \, h_t(x).
$$

The coefficients $\alpha_t$ come from how well round $t$ performed on the **current** weights. Intuition: **hard examples get louder** until the ensemble finally fits them.

AdaBoost has a beautiful theory for exponential loss, but for **general losses** and **smooth optimization**, **gradient boosting** is the more flexible workhorse.

---

### 3. Additive models

Boosting almost always builds an **additive model**:

$$
F(x) = \sum_{t=1}^{T} f_t(x),
$$

where each $f_t$ is small (often a **shallow regression tree**, sometimes called a “tree stump” if depth 1). You do **not** refit all $f_t$ at once; you add **one new** $f_t$ at a time (**forward stagewise** fitting).

---

### 4. Gradient boosting: follow the negative gradient

**Vocabulary:** $(x_i, y_i)$ = features and **true outcome** for row $i$. $\ell(y_i, \hat{y})$ = **loss** = penalty when prediction is $\hat{y}$ but truth is $y_i$ (e.g. squared error for regression). $F(x_i)$ = model’s **current** prediction for that row.

Suppose you have training data $(x_i, y_i)$, a differentiable loss $\ell(y_i, \hat{y})$ for a single prediction $\hat{y}$, and you want to learn $F$ that maps $x_i$ to predictions $F(x_i)$.

At stage $t-1$ you already have $F_{t-1}$. You want to add $f_t$ so that

$$
F_t(x) = F_{t-1}(x) + f_t(x)
$$

reduces the **empirical risk**

$$
\mathcal{L}(F) = \sum_{i=1}^{n} \ell\bigl(y_i, F(x_i)\bigr).
$$

**Key trick (plain words):** list the model’s **current prediction for every training row**—that is $n$ numbers. Imagine **wiggling** prediction $i$ a tiny bit: how much does total loss change? That sensitivity is a **partial derivative**. Stack those $n$ sensitivities: you get a **direction** in $n$-dimensional space ($\mathbb{R}^n$ means “$n$ numbers”). **Steepest descent** = step in the direction that **reduces** total loss fastest. The **pseudo-residuals** (negative gradients) for observation $i$ are

$$
r_{it} = -\left.\frac{\partial \, \ell(y_i, \hat{y})}{\partial \hat{y}}\right|_{\hat{y} = F_{t-1}(x_i)}.
$$

Then **fit a regression tree** $f_t$ to predict $r_{it}$ from $x_i$ (possibly on a subsample of data or features). After fitting the **shape** of the tree, you may **scale** its leaves with a **step size** $\eta_t$ (line search or fixed **learning rate** $\eta$):

$$
F_t(x) = F_{t-1}(x) + \eta \, f_t(x).
$$

**Squared error loss** $\ell(y,\hat{y}) = \frac{1}{2}(y-\hat{y})^2$ gives $r_{it} = y_i - F_{t-1}(x_i)$: ordinary **residuals**. That is why gradient boosting on squared error **looks** like “fit the mistakes,” but the same recipe works for **logistic / log-loss**, **Huber**, etc., by plugging in the right derivative.

**Shrinkage:** using $\eta < 1$ (for example $0.01$ to $0.3$) **slows** learning so each tree does a small correction; often you use **more trees** and get better generalization—similar in spirit to small steps in gradient descent.

---

### 5. Trees as the weak learners

Each $f_t$ is usually a **CART-style regression tree**: it partitions the input space with axis-aligned splits and predicts a **constant value in each leaf**. The tree is fit by minimizing squared error to the pseudo-residuals (or a related criterion in software-specific variants).

**Why trees?** They handle nonlinearity, interactions, and mixed feature types, and they play nicely with **subsample** of rows (**stochastic** gradient boosting) and **subsample** of columns, which reduces correlation between trees and fights overfitting.

---

### 6. What XGBoost adds (the “extreme” part)

**XGBoost** (Chen & Guestrin) implements gradient boosting with a design tuned for **speed, scalability, and regularization**. Conceptually it is still: **additive trees**, **stagewise** fitting, **gradient-based** targets. The distinctive pieces are:

#### 6.1 Explicit regularized objective (per tree)

Instead of only thinking “minimize training loss,” XGBoost adds **penalties on tree complexity**. Schematically, at each boost round the objective looks like

$$
\mathcal{L}^{(t)} \approx \sum_{i=1}^{n} \ell\bigl(y_i, \hat{y}_i^{(t-1)} + f_t(x_i)\bigr) + \Omega(f_t),
$$

where $\Omega$ penalizes **number of leaves** $T$ and **leaf weights** $w = (w_1,\ldots,w_T)$ (how large the prediction is in each region). A common form is

$$
\Omega(f) = \gamma T + \frac{\lambda}{2}\sum_{j=1}^{T} w_j^2.
$$

- $\gamma$: pay a price for **each new leaf** → prefers **shallower** trees unless the gain is worth it.
- $\lambda$: **L2 shrinkage** on leaf values → smoother predictions inside the tree.

#### 6.2 Second-order (Newton) approximation

**Plain words:** besides **slope** (first derivative), use **curvature** (second derivative) of the loss at the current prediction—like approximating a hill with a **parabola** instead of a **line** so steps are better sized.

For many losses, XGBoost expands $\ell$ to **second order** in the small update $f_t(x_i)$:

$$
\ell\bigl(y_i, \hat{y}^{(t-1)}_i + f_t(x_i)\bigr) \approx \ell\bigl(y_i, \hat{y}^{(t-1)}_i\bigr) + g_i\, f_t(x_i) + \frac{1}{2} h_i\, f_t(x_i)^2,
$$

where

$$
\begin{aligned}
g_i &= \left.\frac{\partial \, \ell(y_i, \hat{y})}{\partial \hat{y}}\right|_{\hat{y}^{(t-1)}_i}, \\
h_i &= \left.\frac{\partial^2 \, \ell(y_i, \hat{y})}{\partial \hat{y}^2}\right|_{\hat{y}^{(t-1)}_i}.
\end{aligned}
$$

Here $g_i$ = **first** derivative (slope) of loss w.r.t. prediction for row $i$; $h_i$ = **second** derivative (curvature). Using **both** is a **Newton-style** step: more accurate local model than slope-only (**gradient**) steps—helpful when the loss is **not** simple quadratic.

If leaf $j$ contains index set $I_j$ and predicts constant $w_j$, the **optimal leaf weight** (for the approximated objective with L2 on leaves) has a closed form in terms of $\sum_{i\in I_j} g_i$ and $\sum_{i\in I_j} h_i$, and the **gain** from a candidate split compares **left/right** sums of $g$ and $h$ against the $\gamma$ penalty. That is how XGBoost scores splits **very fast** during tree growth.

#### 6.3 Computational systems tricks (why it feels “extreme”)

- **Approximate split finding** using **quantile sketches** on feature histograms (especially for large $n$).
- **Sparsity-aware** splits: a default direction for **missing** values learned from data.
- **Parallel** construction of statistics across features (within a single level of the tree).
- **Column / row subsampling** (like random forests) integrated into the boosting loop.

These are engineering and algorithm choices on top of the same **gradient boosting** skeleton.

---

### 7. One-line summary

Avoiding a Markdown table here so math symbols and pipes do not fight the table parser.

- **Boosting** — Sequentially add weak models that fix remaining errors.
- **Gradient boosting** — Each new model fits the **negative gradient** (pseudo-residuals) of the loss with respect to current predictions; this works for **general** losses, not only squared error.
- **XGBoost** — Gradient boosting plus a **regularized** tree objective (penalties $\gamma$ and $\lambda$), a **second-order** local model using $(g_i, h_i)$, and **fast approximate** split search at scale.

---

### 8. Practical reminders (not specific to any one API)

- **Learning rate** $\eta$ and **number of trees** interact: smaller $\eta$ often needs **more** trees.
- **Max depth** and **min child weight** (or minimum loss reduction) control how **wiggly** each tree can get.
- **Subsample** and **column sample** reduce overfitting when signals are noisy.
- **Early stopping** on a validation set is standard: stop adding trees when out-of-sample loss quits improving.

---

### References and attribution

- Friedman, J. H. (2001). Greedy function approximation: a gradient boosting machine. *Annals of Statistics*, 29(5), 1189–1232.
- Chen, T., & Guestrin, C. (2016). XGBoost: A scalable tree boosting system. In *KDD* ’16. [arXiv:1603.02754](https://arxiv.org/abs/1603.02754)
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer (boosting chapters). [Link](https://hastie.su.domains/ElemStatLearn/)

**Copyright / use:** Original explanatory text; formulas are standard mathematics. Not a substitute for the papers above.

### Sample code (minimal)

**Python** — `pip install xgboost scikit-learn`

```python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
import xgboost as xgb

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
clf = xgb.XGBClassifier(n_estimators=80, max_depth=4, random_state=0, n_jobs=-1)
clf.fit(X_tr, y_tr)
print("accuracy:", round(clf.score(X_te, y_te), 3))
```

**R** — `install.packages("xgboost")`

```r
library(xgboost)
data(iris)
y <- as.integer(iris$Species) - 1L
X <- as.matrix(iris[, 1:4])
dtrain <- xgb.DMatrix(data = X, label = y)
params <- list(objective = "multi:softmax", num_class = 3, max_depth = 4)
bst <- xgb.train(params, dtrain, nrounds = 50, verbose = 0)
pred <- predict(bst, newdata = dtrain)
mean(pred == y)
```
