---
layout: page
title: "Hierarchical clustering"
subtitle: Agglomerative trees of merges or divisive splits
permalink: /notes/personal-notes/hierarchical-clustering/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Compare to <a href="{{ '/notes/personal-notes/k-means/' | relative_url }}">k-means</a> (fix $K$ first). Little linear algebra—mostly **distance** between groups.</p>

**Hierarchical clustering** builds a **tree** (dendrogram) of nested clusters—**no need to choose $K$ upfront** (you **cut** the tree at a height to get $K$ groups when you are ready).

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

### References and attribution

- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer, Ch. 14. [Link](https://hastie.su.domains/ElemStatLearn/)
- Müllner, D. (2011). Modern hierarchical, agglomerative clustering algorithms. *arXiv:1109.2378*.

**Copyright / use:** Explanatory summary only.

### Sample code (minimal)

**Python** — `pip install scikit-learn`

```python
from sklearn.datasets import load_iris
from sklearn.cluster import AgglomerativeClustering

X, _ = load_iris(return_X_y=True)
hc = AgglomerativeClustering(n_clusters=3, linkage="ward").fit(X)
print("labels (first 10):", hc.labels_[:10].tolist())
```

**R** — base `stats`

```r
d <- dist(scale(iris[, 1:4]), method = "euclidean")
hc <- hclust(d, method = "ward.D2")
ct <- cutree(hc, k = 3)
table(ct, iris$Species)
```
