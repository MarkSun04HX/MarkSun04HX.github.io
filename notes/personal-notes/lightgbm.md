---
layout: page
title: "LightGBM"
subtitle: Histogram-based gradient boosting with leaf-wise growth
permalink: /notes/personal-notes/lightgbm/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Continues <a href="{{ '/notes/personal-notes/xgboost/' | relative_url }}">XGBoost / boosting</a>. Here $n$ = number of **rows** (examples), $p$ = number of **features** (columns).</p>

**LightGBM** (Ke et al., Microsoft) is **gradient boosting** with trees, like **XGBoost**, but with implementation choices that favor **speed** and **memory efficiency** on **large** datasets—especially when $n$ (sample size) or $p$ (feature count) is big.

### Histogram-based splits

Continuous features are **binned** into discrete buckets (like a **histogram**). Splits are chosen by **aggregating gradients** (see [boosting note]({{ '/notes/personal-notes/xgboost/' | relative_url }}): slopes of the loss) into bins rather than sorting every feature at every node—**much faster** and lower memory than exact pre-sorted algorithms on massive data.

### Leaf-wise (best-first) growth

Classic boosting often grows trees **level-wise** (all leaves at current depth before going deeper). LightGBM often grows **leaf-wise**: split the leaf that yields the **largest loss reduction**. This can produce **deeper, asymmetrical** trees with **lower training loss** for the same number of leaves—but **higher overfitting risk** if unchecked. Mitigate with **max depth**, **min data in leaf**, **num leaves**, and **regularization** parameters.

### GOSS and EFB (optional intuition)

**Gradient-based One-Side Sampling (GOSS):** keep instances with **large gradients** (underfit examples matter more) and **randomly sample** from small-gradient instances—focuses computation where the model still errs.

**Exclusive Feature Bundling (EFB):** bundle **mutually exclusive** sparse features to reduce effective dimensionality.

### When to consider LightGBM

Strong default for **tabular** competitions and production when data is **large** and you want **fast** iteration. Compare **validation** performance against **XGBoost** and **CatBoost**; winners are problem-dependent.

<p class="text-muted small">Ke et al., “LightGBM: A Highly Efficient Gradient Boosting Decision Tree”; pair with the [XGBoost note]({{ '/notes/personal-notes/xgboost/' | relative_url }}).</p>
