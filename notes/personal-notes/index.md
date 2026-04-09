---
layout: personal-note
title: Personal notes
subtitle: Intuition-first methods, and careful paper walk-throughs
permalink: /notes/personal-notes/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/' | relative_url }}">← Back to Notes</a></p>

These pages are informal write-ups for my own understanding. They are **not** peer-reviewed or guaranteed error-free. If something is unclear or you spot a mistake, I am happy to hear from you via the footer links.

At the **bottom** of each topic page (not this index), there is an **optional pop quiz**—a few multiple-choice checks with instant feedback; answers are not saved.

**New to the notation?** The supervised ML pages use short formulas (weighted sums, sums of squares). If you have **not** taken linear algebra, start with **[Math intuition for ML notes]({{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }})**—it explains vectors, dot products, $\sum$, and symbols like $x^\top \beta$ in plain language, then come back here.

### Orientation (read first)

- **[Machine learning concepts]({{ '/notes/personal-notes/machine-learning-concepts/' | relative_url }})** — supervised vs unsupervised, empirical vs population risk, prediction vs association, RMSE / accuracy / $F_1$ / G-mean, and how to choose metrics.
- **[Math intuition for ML notes]({{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }})** — what $x^\top\beta$, vectors, and $\sum$ mean without a linear algebra course.

### Foundations (before or alongside the algorithm notes)
{: #foundations}

Short pages on ideas that **many models share**—skim what you need, then jump into the method you care about.

- **[Gradients & optimization for ML]({{ '/notes/personal-notes/gradients-optimization-for-ml/' | relative_url }})** — slopes, gradient descent, convex vs non-convex, link to log-likelihood loss; supports [logistic / linear]({{ '/notes/personal-notes/linear-logistic-regression/' | relative_url }}), [elastic net]({{ '/notes/personal-notes/elastic-net/' | relative_url }}), [neural nets]({{ '/notes/personal-notes/neural-networks/' | relative_url }}), [boosting]({{ '/notes/personal-notes/xgboost/' | relative_url }}).
- **[Bias–variance tradeoff]({{ '/notes/personal-notes/bias-variance-tradeoff/' | relative_url }})** — irreducible error, bias vs variance, how $K$ in [KNN]({{ '/notes/personal-notes/knn/' | relative_url }}), tree depth, [forests]({{ '/notes/personal-notes/random-forest/' | relative_url }}), and [boosting]({{ '/notes/personal-notes/xgboost/' | relative_url }}) fit the picture.
- **[Entropy, information & tree impurity]({{ '/notes/personal-notes/entropy-information-tree-splits/' | relative_url }})** — entropy, cross-entropy / deviance, Gini, information gain; read before [tree models]({{ '/notes/personal-notes/tree-models/' | relative_url }}) if impurity is new.
- **[Ensembles: bagging vs boosting]({{ '/notes/personal-notes/ensembles-bagging-boosting/' | relative_url }})** — bootstrap aggregation vs sequential correction, OOB intuition, map to [Random Forest]({{ '/notes/personal-notes/random-forest/' | relative_url }}) and [XGBoost / LightGBM / CatBoost]({{ '/notes/personal-notes/xgboost/' | relative_url }}).
- **[Kernels, distances & feature maps]({{ '/notes/personal-notes/kernels-distances-feature-maps/' | relative_url }})** — Euclidean vs $L_1$, scaling, RBF / polynomial kernels, “implicit” feature space; pairs with [KNN]({{ '/notes/personal-notes/knn/' | relative_url }}) and [SVM]({{ '/notes/personal-notes/svm/' | relative_url }}).

Topics below are ordered by **rough conceptual complexity**—from classical linear models and local methods, through trees and ensembles, margins and kernels, neural nets, then gradient-boosting variants. **Unsupervised** methods are grouped at the end (dimension reduction, then partitioning, then hierarchical structure).

### Supervised learning

**Optional warm-up:** [Math intuition for ML notes]({{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}) (notation) and the **[Foundations](#foundations)** section above (gradients, bias–variance, entropy, ensembles, kernels).

1. **[Linear & logistic regression]({{ '/notes/personal-notes/linear-logistic-regression/' | relative_url }})** — OLS, logits, maximum likelihood.
2. **[K-nearest neighbors (KNN)]({{ '/notes/personal-notes/knn/' | relative_url }})** — local averaging / voting, bias–variance with $K$.
3. **[Elastic net, ridge & lasso]({{ '/notes/personal-notes/elastic-net/' | relative_url }})** — $L_1$, $L_2$, and combined penalties on linear models.
4. **[Tree models (CART)]({{ '/notes/personal-notes/tree-models/' | relative_url }})** — splits, impurity, regression vs. classification trees.
5. **[Random Forest]({{ '/notes/personal-notes/random-forest/' | relative_url }})** — bagging, random feature subsets, OOB error.
6. **[Support Vector Machines (SVM)]({{ '/notes/personal-notes/svm/' | relative_url }})** — margins, hinge loss, kernels.
7. **[Neural networks (feedforward)]({{ '/notes/personal-notes/neural-networks/' | relative_url }})** — layers, activations, backpropagation.
8. **[Convolutional Neural Networks (CNNs)]({{ '/notes/personal-notes/cnns/' | relative_url }})** — convolutions, pooling, hierarchical features.
9. **[From boosting to XGBoost]({{ '/notes/personal-notes/xgboost/' | relative_url }})** — boosting, gradient boosting, XGBoost objective and splits.
10. **[LightGBM]({{ '/notes/personal-notes/lightgbm/' | relative_url }})** — histogram splits, leaf-wise growth, large-scale tabular boosting.
11. **[CatBoost]({{ '/notes/personal-notes/catboost/' | relative_url }})** — ordered boosting, categorical features, symmetric trees.

### Unsupervised learning

12. **[Principal Component Analysis (PCA)]({{ '/notes/personal-notes/pca/' | relative_url }})** — variance directions, SVD, low-rank approximation.
13. **[K-means clustering]({{ '/notes/personal-notes/k-means/' | relative_url }})** — Lloyd’s algorithm, choosing $K$, geometry assumptions.
14. **[Hierarchical clustering]({{ '/notes/personal-notes/hierarchical-clustering/' | relative_url }})** — linkages, dendrograms, agglomerative vs. divisive.

### Paper walk-throughs (economics)

Longer narrative summaries of individual papers—geared toward **intro-level micro/macro** and readers **new to research**, with section-by-section maps and plain-language intuition.

- **[How AI aggregation affects knowledge]({{ '/notes/personal-notes/paper-ai-aggregation-knowledge/' | relative_url }})** — Acemoglu, Lin, Ozdaglar & Siderius (2026, working paper): social learning on networks (DeGroot), a global AI that trains on people’s beliefs and feeds answers back, **learning gaps**, when **fast updating** destroys **robust** improvements, majority vs. minority training weights, and **local vs. global** aggregators over multiple topics.
- **[SI epidemic with voluntary vaccination (Chen 2006)]({{ '/notes/personal-notes/paper-chen-si-voluntary-vaccination/' | relative_url }})** — *Journal of Mathematical Biology*: rational-choice SI model, dynamic programming, **$R_0$** with voluntary vaccines, **multiple endemic equilibria**, when vaccines or **subsidies** can **raise** prevalence, vs **mandatory** coverage and eradication (Wake Forest author).
