---
layout: page
title: "Random Forest"
subtitle: Bagging plus random feature subsets at each split
permalink: /notes/personal-notes/random-forest/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

**Random Forest (RF)** is an **ensemble** of many **deep decision trees**, each trained on a **bootstrap sample** of the data (**bagging** = bootstrap aggregating). The final prediction is the **average** of tree predictions (regression) or a **vote** (classification).

### Key extra idea beyond bagging

At each split, consider only a **random subset** of features (e.g. $\sqrt{p}$ features for classification, $p/3$ for regression in common defaults). This **decorrelates** trees: if one strong feature dominates, bagging alone still produces correlated trees; **random subspace** at splits forces other variables to contribute, **reducing variance** of the average.

### Intuition

- Single deep tree: low bias, high variance.
- Average of many **i.i.d.-ish** low-bias models: variance shrinks roughly as $1/B$ for $B$ trees (correlation between trees weakens the gain but RF still helps strongly).

### Out-of-bag (OOB) error

Each tree is trained on ~63% of points (bootstrap). The remaining **OOB** points are a natural validation set for that tree; aggregating OOB predictions estimates **generalization error** without a separate holdout.

### Compared to boosting

RF trees are often **deep** and **parallel**; **boosting** grows trees **sequentially** to correct residuals and often uses **shallower** trees. RF is harder to overfit by “adding too many trees” (more trees usually stabilize); boosting can overfit if iteration count is unchecked.

### Practical notes

- Less sensitive to hyperparameters than boosting, but tune **number of trees**, **mtry** (feature subset size), and **min node size** / depth.
- **Variable importance**: mean decrease in impurity or **permutation importance** (shuffle feature, measure drop in OOB or CV performance)—interpret with care (correlation, bias toward high-cardinality features).

<p class="text-muted small">Breiman (2001), “Random Forests”; ESL, Ch. 15.</p>
