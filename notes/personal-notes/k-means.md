---
layout: personal-note
title: "K-means clustering"
subtitle: Partition points into K Voronoi cells by least squares
permalink: /notes/personal-notes/k-means/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> $\|x_i - \mu_k\|^2$ is **squared Euclidean distance** from point $x_i$ to center $\mu_k$ (Pythagoras in many dimensions). See <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">norms in the primer</a>.</p>

**K-means** partitions $n$ points into **$K$ clusters** by minimizing **within-cluster sum of squares**:

$$
\min_{C,\,\mu} \sum_{k=1}^K \sum_{i \in C_k} \|x_i - \mu_k\|^2
$$

where $\mu_k$ is the **mean** (average) of all points currently assigned to cluster $k$—the **centroid** of that group.

### Lloyd’s algorithm (iterative)

1. **Initialize** $K$ centroids (random points, k-means++, etc.).
2. **Assign** each $x_i$ to the **nearest** centroid (Euclidean distance).
3. **Update** each centroid as the **mean** of its assigned points.
4. Repeat until assignments stabilize.

Each step **lowers** the objective (monotone); convergence is to a **local** minimum—not global. **Run multiple restarts** or use **k-means++** initialization to reduce bad local minima.

### Choosing $K$

No universally correct $K$—use **domain knowledge**, **elbow** heuristic on within-cluster SS, **silhouette**, **gap statistic**, or **cross-validation** if you have a downstream supervised task.

### Assumptions and limits

- **Spherical** clusters of similar size work best; **elongated** or **nested** clusters are a poor fit.
- **Scale** features consistently.
- Complexity is roughly $O(n \cdot K \cdot p \cdot \text{iterations})$—cheap for moderate data.

### References and attribution

- MacQueen, J. (1967). Some methods for classification and analysis of multivariate observations. In *Proceedings of the Fifth Berkeley Symposium on Mathematical Statistics and Probability*.
- Arthur, D., & Vassilvitskii, S. (2007). k-means++: The advantages of careful seeding. In *SODA*.
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer, Ch. 14. [Link](https://hastie.su.domains/ElemStatLearn/)

**Copyright / use:** Explanatory summary only.

### Sample code (minimal)

**Python** — `pip install scikit-learn`

```python
import numpy as np
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

X, _ = load_iris(return_X_y=True)
km = KMeans(n_clusters=3, n_init="auto", random_state=0).fit(X)  # n_init=10 if sklearn < 1.4
print("inertia (within-cluster SS):", round(km.inertia_, 2))
print("cluster sizes:", np.bincount(km.labels_))
print("silhouette [-1,1], higher tighter clusters:", round(silhouette_score(X, km.labels_), 3))
print("first 12 labels:", km.labels_[:12].tolist())
```

**R** — base `stats`

```r
km <- kmeans(scale(iris[, 1:4]), centers = 3, nstart = 25)
km$tot.withinss   # total within-cluster sum of squares
table(km$cluster, iris$Species)
```

### Example output (illustrative)

**Python** (iris **raw** features; `random_state=0`; versions may differ slightly):

```text
inertia (within-cluster SS): 78.85
cluster sizes: [50 47 53]
silhouette [-1,1], higher tighter clusters: 0.553
first 12 labels: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
```

**R** (`table` compares clusters to **true species**—k-means never sees species; this is only **post-hoc** on iris). Row labels are arbitrary; **your** counts may permute rows but often look **like** this:

```text
       setosa versicolor virginica
  1      0         2        36
  2      0        48        14
  3     50         0         0
```

### How to interpret these outputs

- **Inertia / `tot.withinss`:** total squared distance from points to their cluster center—**lower** is tighter fit **for fixed $K$**. **Cannot** compare fairly across different $K$ without caution (more clusters usually shrink inertia). Use the **elbow** or **silhouette** to choose $K$.
- **Silhouette (sklearn):** for each point, compares **cohesion** (distance to own cluster) vs **separation** (distance to nearest other cluster). Averages to roughly **$-1$ to $1$**; **higher** suggests clearer separation. **Negative** values often mean points may sit in the wrong cluster.
- **Cluster sizes:** huge imbalance can mean **wrong $K$** or **non-spherical** groups (k-means assumes roughly **round** blobs of similar size).
- **Cross-tab with `iris$Species`:** only possible here because iris **has** labels. In real clustering you **do not** have this—you would instead use **domain** labels later, **stability** under resampling, or **silhouette / gap** heuristics.

More on metrics in [machine learning concepts]({{ '/notes/personal-notes/machine-learning-concepts/' | relative_url }}).
