---
layout: personal-note
title: "Convolutional Neural Networks (CNNs)"
subtitle: Local filters, hierarchy, and translation structure
permalink: /notes/personal-notes/cnns/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;"><strong>Reading note:</strong> Easiest after <a href="{{ '/notes/personal-notes/neural-networks/' | relative_url }}">feedforward nets</a> and <a href="{{ '/notes/personal-notes/math-intuition-for-ml/' | relative_url }}">dot products</a>.</p>

**CNNs** build **spatial** structure into the network: instead of full connectivity from every input pixel to every hidden unit, use **local receptive fields** and **shared weights** (**convolution**).



{::nomarkdown}
<div class="pn-viz">
<div class="mermaid">
flowchart LR
  IMG[Image grid] --> C[Conv filters local]
  C --> P[Pooling]
  P --> ST[Stack deeper]
  ST --> FC[Dense head]
  FC --> Y[Labels or scores]
</div>
</div>
{:/}
<p class="pn-viz-caption">Translation-tolerant local features built from convolutions and pooling.</p>

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

### References and attribution

- LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. *Nature*, 521(7553), 436–444.
- Krizhevsky, A., Sutskever, I., & Hinton, G. E. (2012). ImageNet classification with deep convolutional neural networks. *NeurIPS*.
- He, K., Zhang, X., Ren, S., & Sun, J. (2016). Deep residual learning for image recognition. *CVPR*.
- Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press. [deeplearningbook.org](https://www.deeplearningbook.org/)

**Copyright / use:** Explanatory summary; no reproduced figures or extended excerpts from papers or books.

### Sample code (minimal)

**Python** — `pip install tensorflow` (includes Keras)

```python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()
x_train = (x_train[:4000, :, :, None] / 255.0).astype("float32")
y_train = y_train[:4000]

model = keras.Sequential([
    layers.Conv2D(16, 3, activation="relu", input_shape=(28, 28, 1)),
    layers.MaxPooling2D(2),
    layers.Flatten(),
    layers.Dense(10, activation="softmax"),
])
model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
model.fit(x_train, y_train, epochs=1, batch_size=64, verbose=1)
```

**R** — `install.packages("keras")` then once: `keras::install_keras()` (installs TensorFlow backend). See [keras.rstudio.com](https://keras.rstudio.com/).

```r
library(keras)
mn <- dataset_mnist()
x <- array_reshape(mn$train$x[1:4000,,] / 255, c(4000, 28, 28, 1))
y <- mn$train$y[1:4000]
m <- keras_model_sequential(list(
  layer_conv_2d(filters = 16, kernel_size = 3, activation = "relu", input_shape = c(28, 28, 1)),
  layer_max_pooling_2d(pool_size = 2),
  layer_flatten(),
  layer_dense(units = 10, activation = "softmax")
))
compile(m, optimizer = "adam", loss = "sparse_categorical_crossentropy", metrics = "accuracy")
fit(m, x, y, epochs = 1, batch_size = 64, verbose = 2)
```
