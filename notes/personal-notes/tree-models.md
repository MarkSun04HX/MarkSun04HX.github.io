---
layout: page
title: "Tree models (CART)"
subtitle: Recursive partitioning for regression and classification
permalink: /notes/personal-notes/tree-models/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

A **decision tree** partitions the input space with **axis-aligned splits** (“if $x_j \le t$ go left, else right”) until each region (leaf) gets a **constant prediction**: mean $y$ in that leaf (regression) or majority class / class proportions (classification).

### Impurity and split search

**Regression:** common loss is **squared error** within leaves; each split minimizes **sum of squared deviations** from leaf means (equivalently, maximize **variance reduction**).

**Classification:** split using **Gini index** or **cross-entropy** (deviance)—measures how “mixed” classes are in each child node. Greedy algorithms try candidate features and thresholds and pick the best **local** improvement.

### Why trees are attractive

- Capture **nonlinear** effects and **interactions** automatically.
- Minimal preprocessing (no need for linearity); handles mixed types with encoding.
- **Interpretable** if shallow (path from root to leaf = rule).

### Weaknesses

- **High variance:** small data changes can change splits a lot.
- **Staircase** decision boundaries (axis-aligned).
- Deep trees **overfit**; shallow trees **underfit**.

**Pruning**, **minimum leaf size**, **maximum depth**, and **cost-complexity** pruning control complexity. Trees are the **building block** of random forests and boosting.

<p class="text-muted small">ESL, Ch. 9; Breiman et al., <em>Classification and Regression Trees</em>.</p>
