---
layout: page
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
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans

X, _ = load_iris(return_X_y=True)
km = KMeans(n_clusters=3, n_init="auto", random_state=0).fit(X)
print("within-cluster SS (inertia):", round(km.inertia_, 2))
print("first labels:", km.labels_[:12].tolist())
```

**R** — base `stats`

```r
km <- kmeans(scale(iris[, 1:4]), centers = 3, nstart = 25)
table(km$cluster, iris$Species)
```
