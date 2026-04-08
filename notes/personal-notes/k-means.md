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
\min_{\text{assignments } C,\; \text{centroids } \mu} \sum_{k=1}^K \sum_{i \in C_k} \|x_i - \mu_k\|^2,
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

<p class="text-muted small">ESL, Ch. 14; MacQueen (1967); Arthur & Vassilvitskii, k-means++.</p>
