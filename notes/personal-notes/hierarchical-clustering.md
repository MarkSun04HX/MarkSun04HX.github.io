---
layout: personal-note
title: "Hierarchical clustering"
subtitle: Agglomerative trees of merges or divisive splits
permalink: /notes/personal-notes/hierarchical-clustering/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Compare to <a href="{{ '/notes/personal-notes/k-means/' | relative_url }}">k-means</a> (fix $K$ first). Little linear algebra—mostly **distance** between groups.</p>

**Hierarchical clustering** builds a **tree** (dendrogram) of nested clusters—**no need to choose $K$ upfront** (you **cut** the tree at a height to get $K$ groups when you are ready).



{::nomarkdown}
<div class="pn-viz">
<div class="mermaid">
flowchart TB
  P[Each point is cluster] --> M[Merge closest pair]
  M --> R[Update distances linkage]
  R --> Q{One cluster left?}
  Q -->|no| M
  Q -->|yes| D[Dendrogram]
</div>
</div>
{:/}
<p class="pn-viz-caption">Agglomerative: greedy merges according to single/complete/average/Ward linkage.</p>

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
from sklearn.metrics import silhouette_score

X, _ = load_iris(return_X_y=True)
hc = AgglomerativeClustering(n_clusters=3, linkage="ward").fit(X)
print("labels (first 10):", hc.labels_[:10].tolist())
print("silhouette:", round(silhouette_score(X, hc.labels_), 3))
```

**R** — base `stats`

```r
d <- dist(scale(iris[, 1:4]), method = "euclidean")
hc <- hclust(d, method = "ward.D2")
ct <- cutree(hc, k = 3)
tail(hc$height, 5)  # heights of last merges (larger = more dissimilar groups joined)
table(ct, iris$Species)
```

### Example output (illustrative)

**Python** (iris raw, Ward linkage, $K=3$):

```text
labels (first 10): [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
silhouette: 0.554
```

**R** (`table` again uses **true species** only to show alignment on iris):

```text
       setosa versicolor virginica
  1      0         2        36
  2      0        48        14
  3     50         0         0
```

(`hc$height` values depend on the `dist` scale; use them to see **how far apart** merged clusters were—larger jumps suggest a **natural** cut.)

### How to interpret these outputs

- **Labels:** arbitrary **IDs** (1,2,3, …)—permutation of cluster names does **not** change the partition. Compare runs by **matching** clusters (e.g. Hungarian algorithm) if needed, not by label integers.
- **Silhouette:** same idea as in [k-means]({{ '/notes/personal-notes/k-means/' | relative_url }})—higher usually means **clearer** separation at the chosen $K$.
- **`hc$height` (merge heights):** in agglomerative clustering, **small** heights = very similar groups merged early; a **big jump** in height when moving from $K{+}1$ to $K$ clusters suggests a **stable** choice of $K$ (elbow on the **dendrogram**).
- **`cutree(hc, k = 3)`:** you chose $K$ **after** building the full tree—unlike k-means alone, you can **inspect** many $K$ from one `hclust` object.
- **Linkage choice** changes results: **single** linkage can **chain**; **Ward** often favors **compact**, equal-variance-ish blobs—similar spirit to k-means.

For **supervised** metrics (accuracy, $F_1$, …), see [machine learning concepts]({{ '/notes/personal-notes/machine-learning-concepts/' | relative_url }}); unsupervised outputs rarely reduce to a single “accuracy” without external labels.
