---
layout: page
title: "Ensembles: bagging vs boosting"
subtitle: Parallel averaging vs sequential correction—and what forests and boosters do
permalink: /notes/personal-notes/ensembles-bagging-boosting/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Assumes you know what a [decision tree]({{ '/notes/personal-notes/tree-models/' | relative_url }}) is. For **bias vs variance**, read [Bias–variance tradeoff]({{ '/notes/personal-notes/bias-variance-tradeoff/' | relative_url }}) first or in parallel.</p>

An **ensemble** combines **many** models into one prediction—**vote** or **average**. Two dominant strategies:

---

### Bagging (bootstrap aggregating)

1. Draw **$B$** **bootstrap** samples (sample $n$ rows **with replacement** from training data).
2. Fit a **full** (often deep) model on each sample—typically a **tree**.
3. **Average** predictions (regression) or **majority vote** (classification).

**Why it helps:** if each base model has **low bias** but **high variance**, **averaging** **reduces variance** (errors cancel when models’ mistakes are **uncorrelated**). **Random Forest** adds **random feature subsets at each split** to **decorrelate** trees so averaging works better.

**Out-of-bag (OOB):** each bootstrap sample misses ~37% of rows; those rows act as a **free** validation set per tree—see [Random Forest]({{ '/notes/personal-notes/random-forest/' | relative_url }}).

---

### Boosting

1. Fit a **weak** learner (often a **shallow** tree).
2. Compute **residuals** or **pseudo-residuals** (from the loss’s **gradient**—see [Gradients & optimization]({{ '/notes/personal-notes/gradients-optimization-for-ml/' | relative_url }})).
3. Fit the next learner to **correct** what the **sum so far** still gets wrong.
4. **Add** the new learner (with a **learning rate** / step size). Repeat.

**Why it helps:** **sequentially** reduces **bias** of an **additive** model; very strong on **tabular** data. **[XGBoost]({{ '/notes/personal-notes/xgboost/' | relative_url }})**, **[LightGBM]({{ '/notes/personal-notes/lightgbm/' | relative_url }})**, **[CatBoost]({{ '/notes/personal-notes/catboost/' | relative_url }})** are industrial **gradient boosting** implementations.

**Contrast with bagging:** boosting is **adaptive** and **sequential**; too many rounds can **overfit** (watch validation loss). Bagging / RF often **stabilize** as you add more trees.

---

### Stacking (one-line picture)

Train **multiple** diverse models, then train a **second-level** model whose inputs are the **first-level predictions**—**learns** how to combine them. More flexible than a fixed vote; needs **care** (cross-fitting) to avoid **leakage**.

---

### Quick map to this site’s notes

| Method | Ensemble type |
|--------|----------------|
| [Random Forest]({{ '/notes/personal-notes/random-forest/' | relative_url }}) | Bagging + random splits |
| [XGBoost]({{ '/notes/personal-notes/xgboost/' | relative_url }}) | Gradient boosting |
| [LightGBM]({{ '/notes/personal-notes/lightgbm/' | relative_url }}) | Gradient boosting (histogram / leaf-wise) |
| [CatBoost]({{ '/notes/personal-notes/catboost/' | relative_url }}) | Gradient boosting (ordered / categorical handling) |

---

### References and attribution

- Breiman, L. (1996). Bagging predictors. *Machine Learning*, 24(2), 123–140.
- Breiman, L. (2001). Random forests. *Machine Learning*, 45(1), 5–32.
- Friedman, J. H. (2001). Greedy function approximation: a gradient boosting machine. *Annals of Statistics*, 29(5), 1189–1232.
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer, Ch. 8, 10, 15. [Link](https://hastie.su.domains/ElemStatLearn/)

**Copyright / use:** Explanatory summary only; no reproduced copyrighted text.

### Sample code (same data: RF vs boosting)

**Python** — `scikit-learn`:

```python
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor

X, y = load_diabetes(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)

rf = RandomForestRegressor(n_estimators=200, random_state=0).fit(X_tr, y_tr)
gb = GradientBoostingRegressor(n_estimators=200, learning_rate=0.05, max_depth=3, random_state=0).fit(X_tr, y_tr)

print("RF R2:", round(rf.score(X_te, y_te), 3))
print("GB R2:", round(gb.score(X_te, y_te), 3))
```

*(Tuning changes winners—illustration only.)*
