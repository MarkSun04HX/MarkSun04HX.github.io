---
layout: page
title: "Neural networks (feedforward)"
subtitle: Composed nonlinear layers and backpropagation
permalink: /notes/personal-notes/neural-networks/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

A **feedforward neural network** stacks **layers** of **affine maps** plus **elementwise nonlinearities** (“activations”). Layer $l$:

$$
a^{(l)} = \sigma\bigl( W^{(l)} a^{(l-1)} + b^{(l)} \bigr),
$$

with input $a^{(0)} = x$ and final layer producing predictions (e.g. linear head for regression, softmax for classification).

### Universal approximation

Even **one wide hidden layer** can approximate many continuous functions on compact domains (under mild conditions)—**theory** says capacity exists; **optimization** and **generalization** are the hard parts in practice.

### Training: loss and backprop

Define a loss $\mathcal{L}$ on outputs vs. targets. **Gradient descent** (or Adam, etc.) updates weights using $\partial \mathcal{L}/\partial W$, $\partial \mathcal{L}/\partial b$. **Backpropagation** is **reverse-mode automatic differentiation** through the computation graph—efficient application of the chain rule.

### Activations

Historically **sigmoid/tanh**; now **ReLU** family $\max(0,z)$ is common (faster optimization, sparser gradients, mitigates vanishing gradient somewhat). **Vanishing/exploding** gradients in deep nets motivate **initialization**, **normalization** (batch/layer norm), and **residual** connections (see CNN note for conv + residual flavor).

### Regularization

**Weight decay** ($L_2$), **dropout**, **early stopping**, **data augmentation** (domain-specific), and **larger data** control overfitting. Depth and width are **capacity** knobs.

### Tabular vs. deep learning

For **structured/tabular** data, **gradient-boosted trees** often remain very strong baselines; NNs dominate **vision, speech, language** where **representation learning** from raw inputs pays off. The line blurs with large pretrained models and better architectures for tabular data.

<p class="text-muted small">Goodfellow, Bengio & Courville, <em>Deep Learning</em>; ESL neural-net sections.</p>
