---
layout: page
title: "Convolutional Neural Networks (CNNs)"
subtitle: Local filters, hierarchy, and translation structure
permalink: /notes/personal-notes/cnns/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

**CNNs** build **spatial** structure into the network: instead of full connectivity from every input pixel to every hidden unit, use **local receptive fields** and **shared weights** (**convolution**).

### Convolution layer (discrete intuition)

For a 2D input (image channels stacked), a **filter** (kernel) slides over spatial positions and computes a **dot product** with the local patch plus bias, then applies a nonlinearity. **Multiple filters** produce **multiple feature maps**. **Parameter sharing** means the same filter detects the same pattern everywhere—natural for **translation-equivariant** features (edges, textures).

### Pooling

**Max or average pooling** downsamples spatial resolution, adds **local translation tolerance**, and widens effective receptive fields in deeper layers.

### Hierarchy

Early layers: edges and simple textures. Deeper layers: parts and object-level cues (in supervised training on large data). **Depth**, **skip connections** (**ResNet**: residual blocks $a + F(a)$ ease optimization), and **normalization** enable very deep nets.

### Beyond images

**1D convolutions** for sequences (text, time series); **3D** for video or volumetric data. **Vision transformers** replace conv stacks with attention in many SOTA systems, but CNNs remain the standard teaching path and still widely deployed.

### Data and compute

CNNs typically need **large labeled** datasets (or **pretraining** + fine-tuning) and benefit from **GPUs**. **Data augmentation** (flips, crops, color jitter) is a key regularizer.

<p class="text-muted small">LeCun et al.; Krizhevsky et al. (AlexNet); He et al. (ResNet); Goodfellow et al., <em>Deep Learning</em>.</p>
