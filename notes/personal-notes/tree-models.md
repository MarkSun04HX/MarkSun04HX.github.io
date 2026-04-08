---
layout: page
title: "Tree models (CART)"
subtitle: Recursive partitioning for regression and classification
permalink: /notes/personal-notes/tree-models/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Almost no linear algebra—just $x_j$ for “feature $j$.” For feature rows vs. columns, see <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">Math intuition for ML notes</a>.</p>

A **decision tree** is a **flowchart of yes/no rules** on your inputs. **Axis-aligned** means each question is about **one** feature at a time: “if $x_j \le t$ go left, else right,” where $x_j$ is the value of **feature $j$** (e.g. age) and $t$ is a **threshold** the algorithm learns. Repeat until you stop at a **leaf**: mean $y$ in that leaf (regression) or majority class / class proportions (classification).

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
