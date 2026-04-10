---
layout: page
title: Deep learning with PyTorch — study map
subtitle: Modules, concepts, and exercise prompts aligned with Stevens, Antiga & Viehmann (Manning, 2020)
permalink: /notes/deep-learning-pytorch/
mathjax: false
---

<p class="mb-4"><a href="{{ '/notes/' | relative_url }}">← Notes</a> · <a href="{{ '/notes/personal-notes/' | relative_url }}">Personal notes (ML methods)</a></p>

<p class="text-muted small"><strong>Disclaimer:</strong> This page is my own <strong>study outline</strong>. It follows the <em>structure</em> of Eli Stevens, Luca Antiga, and Thomas Viehmann, <cite>Deep Learning with PyTorch</cite> (Manning Publications, ©2020). It is <strong>not</strong> a replacement for the book, and it does not reproduce figures, code listings, or exercise wording from the publisher. For the exact exercises and solutions, use your copy of the book.</p>

---

### How to use this map

| Column | Meaning |
|--------|---------|
| **Concepts** | What to be able to explain (in your own words). |
| **Book thread** | Main hands-on thread in that chapter (follow along in the PDF). |
| **Companion exercises** | Extra drills + reminder to complete the book’s end-of-chapter exercises. |

**Parts in the book:** **Part 1** — core PyTorch and vision basics (chs. 1–8). **Part 2** — lung nodule detection with CT (chs. 9–14). **Part 3** — deployment (ch. 15).

---

## Part 1 — Core PyTorch

### Chapter 1 — Introducing deep learning and the PyTorch library

**Concepts:** What changed with deep learning vs classical ML; PyTorch’s role in research and production; rough project lifecycle (data → model → train → deploy); environment (Python, GPU optional, notebooks).

**Book thread:** Motivation and landscape; how PyTorch fits a typical workflow.

**Companion exercises**

1. In one paragraph, contrast **prediction rules you hand-code** vs **rules learned from data**.
2. Sketch your own diagram: **data → model → loss → optimizer** and label tensors flowing through.
3. Complete **ch. 1 exercises** in the book; add a bullet list of three things you still find fuzzy.

---

### Chapter 2 — Pretrained networks

**Concepts:** Inference vs training; loading pretrained weights; **AlexNet** / **ResNet** as image-classification backbones; **GAN** idea (generator vs discriminator) and **CycleGAN** style transfer; image captioning stack (**NeuralTalk2**-style); **Torch Hub** for pulling models.

**Book thread:** Run pretrained classifiers; horse↔zebra demo; scene description; Torch Hub.

**Companion exercises**

1. Run a pretrained classifier on **three** of your own images; record top-5 labels and whether failures make sense.
2. Explain when **pretrained features** help even if your target labels differ from ImageNet.
3. Complete **ch. 2 exercises**; try loading a second model from Torch Hub and compare output shapes.

---

### Chapter 3 — It starts with a tensor

**Concepts:** Tensors as multidimensional arrays; **indexing**; **named tensors**; **dtype**; tensor **API**; **storage**, **views**, **stride**, **offset**; **transpose** without copy; **contiguous** memory; **GPU** `device`; **NumPy** interop; **serialization** (and HDF5 via h5py).

**Book thread:** Build intuition from lists → tensors → views and GPU moves.

**Companion exercises**

1. Create tensors with `torch` and verify **`.shape`**, **`.dtype`**, **`.device`** after `.to("cuda")` or CPU.
2. Given a 2D tensor, predict the result of **`.t()`** and **`transpose`** on strides; check with `.stride()`.
3. Complete **ch. 3 exercises**; break one deliberate **view vs copy** bug and fix it.

---

### Chapter 4 — Real-world data representation using tensors

**Concepts:** Images as **CHW** tensors; loading and **normalizing**; **volumetric** (3D) medical-style grids; **tabular** data (wine example), **one-hot** encoding, when to bin/threshold; **time series** reshaping; **text** as indices, character/word one-hot, **embeddings** as dense representations.

**Book thread:** Same modalities end-to-end into tensor form.

**Companion exercises**

1. Load one image file into a tensor and print **shape before/after** channel reordering.
2. Encode a tiny categorical column (≤5 categories) with **one-hot** and with an **Embedding** of dim 4; compare parameter count.
3. Complete **ch. 4 exercises**; sketch a batch shape for your own tabular or text toy example.

---

### Chapter 5 — The mechanics of learning

**Concepts:** Fitting parameters to data; linear model as first try; **loss**; **gradient descent** (intuition and 1D analytics); **normalizing inputs**; **autograd**; **optimizers**; **train/validation** split and **overfitting**; when to disable gradients.

**Book thread:** From a simple regression-like setup through PyTorch autograd and a training loop.

**Companion exercises**

1. Implement **one step** of gradient descent by hand for a scalar linear model, then match `autograd`.
2. Plot **training vs validation loss** for a model that overfits on purpose (tiny dataset).
3. Complete **ch. 5 exercise(s)** in the book; explain **`loss.backward()`** and **`optimizer.step()`** in two sentences each.

---

### Chapter 6 — Using a neural network to fit the data

**Concepts:** **Neurons**, layers, composition; **activation** nonlinearity; common activations and when **ReLU** is default; **loss** for regression vs classification; **`nn.Module`**, **`forward`**, **`__call__`**; comparing linear vs MLP on the same data.

**Book thread:** Replace linear model with a small network; inspect `state_dict`.

**Companion exercises**

1. Count **parameters** in a two-hidden-layer MLP for given widths.
2. Swap **activation** (e.g. ReLU → Tanh) and note training stability.
3. Complete **ch. 6 exercises**; align this chapter with my [neural networks (feedforward)]({{ '/notes/personal-notes/neural-networks/' | relative_url }}) note.

---

### Chapter 7 — Telling birds from airplanes (CIFAR-10)

**Concepts:** **`Dataset`** / **`DataLoader`**; **transforms**; **normalization**; fully connected classifier on images; **logits → softmax → probabilities**; **cross-entropy**; training loop; limits of **flattened** RGB inputs.

**Book thread:** CIFAR-10 binary task; train a dense classifier.

**Companion exercises**

1. Write the shape of **one batch** after flatten vs after keeping spatial dims.
2. Explain **why cross-entropy** pairs with softmax outputs.
3. Complete **ch. 7 exercises**; cross-read [CNNs]({{ '/notes/personal-notes/cnns/' | relative_url }}) for why convs help.

---

### Chapter 8 — Using convolutions to generalize

**Concepts:** Local connectivity and weight sharing; **conv2d**, **padding**, **stride**; feature maps; **pooling**; stacking conv blocks; subclassing **`nn.Module`** vs **functional** `F.conv2d`; **accuracy**; **save/load** `state_dict`; **GPU** training; design levers (**width**, **depth**, **regularization**); notion of architectures moving fast (ResNet-era context).

**Book thread:** ConvNet on CIFAR; compare designs and regularization.

**Companion exercises**

1. Compute **receptive field** roughly for a small stack (paper or code).
2. Add **dropout** or **weight decay** and compare validation accuracy curves.
3. Complete **ch. 8 exercises**; save best checkpoint and reload it in a fresh script.

---

## Part 2 — Learning from images in the real world (lung CT / LUNA)

### Chapter 9 — Using PyTorch to fight cancer (introduction)

**Concepts:** Why **end-to-end** naïve learning fails on medical imaging; **CT** basics; **voxels**, **Hounsfield** scale; **LUNA** challenge; project scope (candidate detection path).

**Book thread:** Problem framing and dataset orientation.

**Companion exercises**

1. List **three** reasons medical imaging is harder than CIFAR-style classification.
2. Explain **HU** in one sentence and why clipping/windowing matters.
3. Write a short **risk note**: what “99% accuracy” might miss in screening (tie forward to ch. 11–12).

---

### Chapter 10 — Combining data sources into a unified dataset

**Concepts:** Parsing **annotations**; train/val splits; loading **CT volumes**; patient **coordinate** systems; **mm ↔ voxel** indexing; extracting **3D patches**; **`Dataset`** implementation; caching candidates; visual sanity checks.

**Book thread:** Build `LunaDataset`-style pipeline from raw files.

**Companion exercises**

1. Draw the **pipeline** from DICOM/raw file → tensor patch.
2. Implement a **minimal** `Dataset` that returns synthetic 3D patches (no patient data needed).
3. Complete **ch. 10 exercises**; document one failure mode (e.g. wrong spacing assumption).

---

### Chapter 11 — Training a classification model to detect suspected tumors

**Concepts:** Training **script structure**; **DataLoader** details; conv classifier for 3D or 2D patches; **batch loss**; validation loop; **metrics logging**; **TensorBoard**; why high **accuracy** can mislead on **imbalanced** detection.

**Book thread:** First training run and TensorBoard hooks.

**Companion exercises**

1. Implement **`computeBatchLoss`**-style separation for train vs val without copy-paste bugs.
2. Log **loss + accuracy** to TensorBoard for a toy run.
3. Complete **ch. 11 exercises**; compute **class balance** in your batch sampler.

---

### Chapter 12 — Improving training with metrics and augmentation

**Concepts:** **False positives / false negatives**; **precision**, **recall**, **F1**; **balanced** sampling; **overfitting** symptoms; **data augmentation** for CT (intuition: plausible transforms); comparing runs.

**Book thread:** Replace naive accuracy with detection-appropriate metrics; augment.

**Companion exercises**

1. For a skewed problem (e.g. 1% positive), show **accuracy** vs **F1** under two threshold choices.
2. List **three** augmentations that are **safe** vs **unsafe** for CT nodule patches.
3. Complete **ch. 12 exercises**; relate to [ML concepts / metrics]({{ '/notes/personal-notes/machine-learning-concepts/' | relative_url }}).

---

### Chapter 13 — Using segmentation to find suspected nodules

**Concepts:** **Semantic segmentation** vs detection; **U-Net** (encoder–decoder, skip connections); adapting input sizes; **2D vs 3D** tradeoffs; building **pixel/voxel masks**; **Dice** loss; **Adam**; logging images in TensorBoard; **GPU-side** augmentation.

**Book thread:** Second model in project; train segmentation with Dice.

**Companion exercises**

1. Explain **why Dice** suits sparse positive pixels better than plain cross-entropy alone (intuition).
2. Sketch **U-Net**: encoder depth, bottleneck, skip concatenations.
3. Complete **ch. 13 exercises**; visualize one prediction overlay (synthetic data OK).

---

### Chapter 14 — End-to-end nodule analysis, and where to go next

**Concepts:** **Validation independence**; chaining **segmentation → candidates → classifier**; grouping voxels; reducing false positives; **quantitative validation**; **malignancy** modeling; **AUC**; **fine-tuning**; train/val/**test** discipline; next steps (literature, competitions).

**Book thread:** Assemble pipeline; discuss diagnosis and future work.

**Companion exercises**

1. Write a **checklist** for data leakage across segmentation and classification stages.
2. Explain **fine-tuning** vs training from scratch on 5 lines.
3. Complete **ch. 14 exercises**; pick one **paper** from the book’s pointers and summarize method + dataset in half a page.

---

## Part 3 — Deployment

### Chapter 15 — Deploying to production

**Concepts:** **Serving** models (e.g. Flask); latency vs throughput; **batching** requests; **ONNX** export; **tracing** (`torch.jit.trace`); **TorchScript** / **script** vs trace; **LibTorch** C++ inference; **mobile** and **quantization** (overview); enterprise serving trends (high level).

**Book thread:** Small server → traced model → JIT concepts → C++/mobile outlook.

**Companion exercises**

1. Export a **tiny** model to ONNX and verify another runtime can load it (or document the blocker).
2. List **three** reasons **tracing** can fail and **scripting** is needed.
3. Complete **ch. 15 exercises**; draw a **deployment diagram** for your own hypothetical app.

---

### Suggested course pacing (self-study)

| Week block | Chapters | Focus |
|------------|----------|--------|
| 1 | 1–3 | Environment, pretrained play, tensors |
| 2 | 4–5 | Data as tensors, autograd and training loop |
| 3 | 6–7 | MLP, CIFAR dense classifier |
| 4 | 8 | ConvNets, saving models |
| 5–8 | 9–14 | CT project (lighter skim if you skip medical data) |
| 9 | 15 | Export and deployment |

---

### Reference

Stevens, E., Antiga, L., & Viehmann, T. (2020). *Deep Learning with PyTorch*. Manning Publications. ISBN 978-1617295263.
