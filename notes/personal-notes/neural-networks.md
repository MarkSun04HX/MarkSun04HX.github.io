---
layout: page
title: "Neural networks (feedforward)"
subtitle: Composed nonlinear layers and backpropagation
permalink: /notes/personal-notes/neural-networks/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Uses **matrices** $W$ as “big tables of weights.” Start with <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">Math intuition for ML notes</a> (vectors, dot products) if needed.</p>

A **feedforward neural network** stacks **layers**. Each layer: take the previous layer’s numbers, form **many different weighted sums** (that is what multiplying by a **weight matrix** $W^{(l)}$ does), **add biases** $b^{(l)}$, then apply a **nonlinearity** $\sigma$ **to each number separately** (e.g. squash negative values to zero). **Affine** = linear combo + shift.

$$
a^{(l)} = \sigma\bigl( W^{(l)} a^{(l-1)} + b^{(l)} \bigr),
$$

**Plain read:** $a^{(l-1)}$ is the **vector of activations** from the previous layer; $a^{(l)}$ is the new vector after this layer. Input $a^{(0)} = x$. The **final** layer may skip $\sigma$ or use **softmax** for probabilities (multi-class).

### Universal approximation

Even **one wide hidden layer** can approximate many continuous functions on compact domains (under mild conditions)—**theory** says capacity exists; **optimization** and **generalization** are the hard parts in practice.

### Training: loss and backprop

Define a loss $\mathcal{L}$ (“how wrong are we?”) on outputs vs. targets. **Gradient descent** (or Adam, etc.) nudges every weight a little bit in the direction that **reduces** $\mathcal{L}$—slopes $\partial \mathcal{L}/\partial W$, $\partial \mathcal{L}/\partial b$ as in the [primer]({{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}). For a longer **optimization** read, see [Gradients & optimization for ML]({{ '/notes/personal-notes/gradients-optimization-for-ml/' | relative_url }}). **Backpropagation** is an **efficient recipe** (chain rule from calculus) to compute those slopes through many layers; you use software, not pen and paper.

### Activations

Historically **sigmoid/tanh**; now **ReLU** family $\max(0,z)$ is common (faster optimization, sparser gradients, mitigates vanishing gradient somewhat). **Vanishing/exploding** gradients in deep nets motivate **initialization**, **normalization** (batch/layer norm), and **residual** connections (see CNN note for conv + residual flavor).

### Regularization

**Weight decay** ($L_2$), **dropout**, **early stopping**, **data augmentation** (domain-specific), and **larger data** control overfitting. Depth and width are **capacity** knobs.

### Tabular vs. deep learning

For **structured/tabular** data, **gradient-boosted trees** often remain very strong baselines; NNs dominate **vision, speech, language** where **representation learning** from raw inputs pays off. The line blurs with large pretrained models and better architectures for tabular data.

### References and attribution

- Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press. [deeplearningbook.org](https://www.deeplearningbook.org/)
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer (neural network sections).

**Copyright / use:** Explanatory summary; no reproduced text from *Deep Learning* or other sources.

### Sample code (minimal)

**Python** — `pip install scikit-learn` (MLP) *or* `pip install torch` for deeper nets

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
mlp = MLPClassifier(hidden_layer_sizes=(32, 16), max_iter=500, random_state=0).fit(X_tr, y_tr)
print("accuracy:", round(mlp.score(X_te, y_te), 3))
```

**R** — `install.packages("nnet")`

```r
library(nnet)
idx <- sample(seq_len(nrow(iris)), size = 0.75 * nrow(iris))
tr <- iris[idx, ]
te <- iris[-idx, ]
fit <- nnet(Species ~ ., data = tr, size = 8, decay = 0.01, maxit = 200, trace = FALSE)
pred <- predict(fit, newdata = te, type = "class")
mean(pred == te$Species)
```
