---
layout: page
title: "Convolutional Neural Networks (CNNs)"
subtitle: Local filters, hierarchy, and translation structure
permalink: /notes/personal-notes/cnns/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Easiest after <a href="{{ '/notes/personal-notes/neural-networks/' | relative_url }}">feedforward nets</a> and <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">dot products</a>.</p>

**CNNs** build **spatial** structure into the network: instead of full connectivity from every input pixel to every hidden unit, use **local receptive fields** and **shared weights** (**convolution**).

### Convolution layer (discrete intuition)

For a 2D input (image channels stacked), a **filter** (kernel) is a small grid of weights that **slides** across the image. At each stop, it multiplies matching pixels and **adds** (a **dot product** on that patch) + **bias**, then a nonlinearity—same pattern as [weighted sums]({{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}), but **local** and **reused** everywhere. **Multiple filters** produce **multiple feature maps** (different detectors). **Parameter sharing** = the **same** small filter is used at every location—so an edge detector learned in one corner works everywhere (**translation** structure).

### Pooling

**Max or average pooling** downsamples spatial resolution, adds **local translation tolerance**, and widens effective receptive fields in deeper layers.

### Hierarchy

Early layers: edges and simple textures. Deeper layers: parts and object-level cues (in supervised training on large data). **ResNet skip connection** $a + F(a)$ in words: take the layer input $a$, add whatever the block computes $F(a)$, and pass **that** forward—helps very deep nets train (“shortcut” around the block).

### Beyond images

**1D convolutions** for sequences (text, time series); **3D** for video or volumetric data. **Vision transformers** replace conv stacks with attention in many SOTA systems, but CNNs remain the standard teaching path and still widely deployed.

### Data and compute

CNNs typically need **large labeled** datasets (or **pretraining** + fine-tuning) and benefit from **GPUs**. **Data augmentation** (flips, crops, color jitter) is a key regularizer.

<p class="text-muted small">LeCun et al.; Krizhevsky et al. (AlexNet); He et al. (ResNet); Goodfellow et al., <em>Deep Learning</em>.</p>
