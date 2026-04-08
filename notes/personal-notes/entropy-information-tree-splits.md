---
layout: page
title: "Entropy, information & tree impurity"
subtitle: Why Gini and cross-entropy measure “mixedness” at a node
permalink: /notes/personal-notes/entropy-information-tree-splits/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Uses **logs** and **probabilities**. Helpful **before** [tree models (CART)]({{ '/notes/personal-notes/tree-models/' | relative_url }}). For **log loss** as a metric, see [Machine learning concepts]({{ '/notes/personal-notes/machine-learning-concepts/' | relative_url }}).</p>

Decision trees split data to make **leaves pure** (one class, or tight $y$ in regression). **Classification** splits often score candidate rules by how much they **reduce impurity**. Two standard impurity functions are **Gini index** and **cross-entropy** (deviance). Both are high when the node is **mixed** and low when one class dominates.

---

### Entropy (Shannon)

For a discrete distribution with class probabilities $p_k$ (non-negative, sum to 1),

$$
H(p) = -\sum_k p_k \log p_k
$$

(with the convention $0 \log 0 = 0$). **Interpretation:** **average information** (surprise) if you draw a class label from $p$. **Maximum** when all classes are equally likely (most “mixed”); **minimum** (zero) when one $p_k=1$.

**Base of log:** software may use natural log or $\log_2$; only **constants** change—**which split is best** is usually unchanged.

---

### Cross-entropy and node impurity

At a node, use **empirical** proportions $\hat{p}_k = n_k / n$ (counts of class $k$). **Entropy impurity** = $H(\hat{p})$.

**Cross-entropy** between “true label distribution” (one-hot at a point) and predicted probabilities appears as **log loss** in metrics; at a **node**, using $H(\hat{p})$ is the same **family** of idea: **uncertainty** in the label if you draw uniformly from the node.

**Information gain** for a split: parent impurity minus a **weighted average** of child impurities (weights ∝ sample counts in children). Trees **maximize** gain (or equivalently **minimize** weighted child impurity).

---

### Gini index

$$
G(\hat{p}) = \sum_k \hat{p}_k (1 - \hat{p}_k) = 1 - \sum_k \hat{p}_k^2.
$$

**Interpretation:** probability two **random** picks from the node (with replacement) have **different** classes—another “mixedness” score. Ranges in $[0,1]$ for binary; behaves similarly to entropy for split ranking (often **very similar** splits chosen).

**Why both exist:** historical and computational (Gini skips logs); **sklearn** exposes both via `criterion`.

---

### Regression trees (brief)

Regression trees typically minimize **within-node variance** (sum of squared deviations from the mean) rather than entropy/Gini. Same **greedy** story: pick splits that **shrink** error in children the most.

---

### Connection to boosting and forests

- **[Random Forest]({{ '/notes/personal-notes/random-forest/' | relative_url }})** and **[boosting]({{ '/notes/personal-notes/xgboost/' | relative_url }})** still use **trees** as building blocks; impurity or related losses appear inside each split search.
- **Gradient boosting** for classification often uses **log-loss** at the **model** level; individual trees may still be fit with **MSE** on pseudo-residuals—see the [XGBoost note]({{ '/notes/personal-notes/xgboost/' | relative_url }}).

---

### References and attribution

- Breiman, L., Friedman, J., Olshen, R., & Stone, C. (1984). *Classification and Regression Trees*. Wadsworth.
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer, Ch. 9. [Link](https://hastie.su.domains/ElemStatLearn/)
- Cover, T. M., & Thomas, J. A. (2006). *Elements of Information Theory* (2nd ed.). Wiley — rigorous treatment of entropy.

**Copyright / use:** Explanatory summary only; no reproduced text from copyrighted sources.

### Sample code (impurity in sklearn)

**Python** — criterion choice on a toy problem:

```python
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
for crit in ("gini", "entropy"):
    clf = DecisionTreeClassifier(criterion=crit, max_depth=3, random_state=0)
    clf.fit(X_tr, y_tr)
    print(crit, "accuracy:", round(clf.score(X_te, y_te), 3))
```

Often **near-identical** accuracy; splits can differ slightly.
