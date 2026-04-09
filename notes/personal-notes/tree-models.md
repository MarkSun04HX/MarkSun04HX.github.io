---
layout: personal-note
title: "Tree models (CART)"
subtitle: Recursive partitioning for regression and classification
permalink: /notes/personal-notes/tree-models/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Almost no linear algebra—just $x_j$ for “feature $j$.” For feature rows vs. columns, see <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">Math intuition for ML notes</a>.</p>

A **decision tree** is a **flowchart of yes/no rules** on your inputs. **Axis-aligned** means each question is about **one** feature at a time: “if $x_j \le t$ go left, else right,” where $x_j$ is the value of **feature $j$** (e.g. age) and $t$ is a **threshold** the algorithm learns. Repeat until you stop at a **leaf**: mean $y$ in that leaf (regression) or majority class / class proportions (classification).



{::nomarkdown}
<div class="pn-viz">
<div class="mermaid">
flowchart TB
  R[Root: all rows] --> S1[Split on feature j threshold]
  S1 --> L[Left child subset]
  S1 --> RT[Right child subset]
  L --> S2[Split again]
  RT --> S3[Split again]
</div>
</div>
{:/}
<p class="pn-viz-caption">Recursive axis-aligned partitions; leaves predict a constant or majority class.</p>

### Impurity and split search

**Regression:** common loss is **squared error** within leaves; each split minimizes **sum of squared deviations** from leaf means (equivalently, maximize **variance reduction**).

**Classification:** split using **Gini index** or **cross-entropy** (deviance)—measures how “mixed” classes are in each child node. For **entropy, Gini, and information gain** in plain language, see **[Entropy, information & tree impurity]({{ '/notes/personal-notes/entropy-information-tree-splits/' | relative_url }})**. Greedy algorithms try candidate features and thresholds and pick the best **local** improvement.

### Why trees are attractive

- Capture **nonlinear** effects and **interactions** automatically.
- Minimal preprocessing (no need for linearity); handles mixed types with encoding.
- **Interpretable** if shallow (path from root to leaf = rule).

### Weaknesses

- **High variance:** small data changes can change splits a lot.
- **Staircase** decision boundaries (axis-aligned).
- Deep trees **overfit**; shallow trees **underfit**.

**Pruning**, **minimum leaf size**, **maximum depth**, and **cost-complexity** pruning control complexity. Trees are the **building block** of random forests and boosting.

### References and attribution

- Breiman, L., Friedman, J., Olshen, R., & Stone, C. (1984). *Classification and Regression Trees*. Wadsworth.
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer, Ch. 9. [Link](https://hastie.su.domains/ElemStatLearn/).

**Copyright / use:** Explanatory summary of standard methods; no reproduced text from CART/ESL.

### Sample code (minimal)

**Python** — `pip install scikit-learn`

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
clf = DecisionTreeClassifier(max_depth=3, random_state=0).fit(X_tr, y_tr)
print("accuracy:", round(clf.score(X_te, y_te), 3))
```

**R** — `install.packages("rpart")`

```r
library(rpart)
idx <- sample(seq_len(nrow(iris)), size = 0.75 * nrow(iris))
tr <- iris[idx, ]
te <- iris[-idx, ]
fit <- rpart(Species ~ ., data = tr, method = "class", control = rpart.control(maxdepth = 3))
mean(predict(fit, te, type = "class") == te$Species)
```
