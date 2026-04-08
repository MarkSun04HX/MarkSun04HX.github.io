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

Define a loss $\mathcal{L}$ (“how wrong are we?”) on outputs vs. targets. **Gradient descent** (or Adam, etc.) nudges every weight a little bit in the direction that **reduces** $\mathcal{L}$—slopes $\partial \mathcal{L}/\partial W$, $\partial \mathcal{L}/\partial b$ as in the [primer]({{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}). **Backpropagation** is an **efficient recipe** (chain rule from calculus) to compute those slopes through many layers; you use software, not pen and paper.

### Activations

Historically **sigmoid/tanh**; now **ReLU** family $\max(0,z)$ is common (faster optimization, sparser gradients, mitigates vanishing gradient somewhat). **Vanishing/exploding** gradients in deep nets motivate **initialization**, **normalization** (batch/layer norm), and **residual** connections (see CNN note for conv + residual flavor).

### Regularization

**Weight decay** ($L_2$), **dropout**, **early stopping**, **data augmentation** (domain-specific), and **larger data** control overfitting. Depth and width are **capacity** knobs.

### Tabular vs. deep learning

For **structured/tabular** data, **gradient-boosted trees** often remain very strong baselines; NNs dominate **vision, speech, language** where **representation learning** from raw inputs pays off. The line blurs with large pretrained models and better architectures for tabular data.

<p class="text-muted small">Goodfellow, Bengio & Courville, <em>Deep Learning</em>; ESL neural-net sections.</p>
