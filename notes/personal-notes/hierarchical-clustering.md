---
layout: page
title: "Hierarchical clustering"
subtitle: Agglomerative trees of merges or divisive splits
permalink: /notes/personal-notes/hierarchical-clustering/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

**Hierarchical clustering** builds a **tree** (dendrogram) of nested clusters—**no need to choose $K$ upfront** (you cut the tree at a height to get $K$ groups).

### Agglomerative (bottom-up)

Start with **each point** as its own cluster. Repeatedly **merge** the two clusters that are **closest** under a **linkage** rule until one cluster remains.

**Linkage** defines distance between clusters $A$ and $B$:

- **Single:** $d(A,B) = \min_{a\in A,\, b\in B} d(a,b)$ — can create **chaining** (elongated clusters).
- **Complete:** $\max$ pairwise distance — **compact** clusters.
- **Average:** mean pairwise distance between points in $A$ and $B$.
- **Ward:** merge pairs that **minimize increase** in total within-cluster variance (often behaves like **centroid** merging with variance objective)—popular for **Euclidean** data.

### Divisive (top-down)

Start with one cluster and **split** recursively (less common; can be costly).

### Dendrogram interpretation

**Height** at which branches merge reflects **dissimilarity** of merged groups. **Cut** horizontally to obtain a partition; different cuts give different **$K$**.

### Compared to K-means

- **Strength:** any **distance** (not only Euclidean); **nested** structure for exploration.
- **Cost:** agglomerative naive implementations are **$O(n^3)$** or $O(n^2 \log n)$; expensive for huge $n$ (approximate methods exist).

<p class="text-muted small">ESL, Ch. 14; Müllner (2011) on linkage and implementation notes.</p>
