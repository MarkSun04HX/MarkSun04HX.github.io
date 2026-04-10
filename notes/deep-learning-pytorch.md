---
layout: page
title: Deep learning with PyTorch — study companion
subtitle: Chapter notes, exercises, and answers (original material aligned with Stevens, Antiga & Viehmann)
permalink: /notes/deep-learning-pytorch/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/' | relative_url }}">← Notes</a> · <a href="{{ '/notes/personal-notes/' | relative_url }}">Personal notes (ML methods)</a></p>

<p class="text-muted small"><strong>What this is:</strong> An <strong>original</strong> online study companion—explanations, practice questions, and <strong>solutions hidden behind “Show answer”</strong>—structured to match <cite>Deep Learning with PyTorch</cite> (Manning, ©2020). It is <strong>not</strong> a copy of the publisher’s text, figures, code listings, or official exercise wording. Keep the book open while you read; use its chapter exercises and projects as the primary hands-on track.</p>

<p class="text-muted small"><strong>How to study:</strong> Read the book chapter → skim the notes here → try exercises <em>before</em> opening answers → run code in your own notebook or the book’s repo.</p>

---

### Chapter quick links

<div class="dl-chapter-nav" markdown="0">
<p><strong>Part 1</strong><br>
<a href="#ch1">1</a> · <a href="#ch2">2</a> · <a href="#ch3">3</a> · <a href="#ch4">4</a> · <a href="#ch5">5</a> · <a href="#ch6">6</a> · <a href="#ch7">7</a> · <a href="#ch8">8</a><br>
<strong>Part 2</strong><br>
<a href="#ch9">9</a> · <a href="#ch10">10</a> · <a href="#ch11">11</a> · <a href="#ch12">12</a> · <a href="#ch13">13</a> · <a href="#ch14">14</a><br>
<strong>Part 3</strong><br>
<a href="#ch15">15</a> · <a href="#pacing">Pacing</a> · <a href="#ref">Reference</a></p>
</div>

---

## Part 1 — Core PyTorch

### Chapter 1 — Introducing deep learning and PyTorch {#ch1}

**Read in the book:** Motivation, PyTorch in the workflow, hardware/software, notebooks.

**Study notes.** Classical ML often uses **fixed features** and smaller models; deep learning **learns hierarchical features** from raw inputs (pixels, voxels, tokens) when data and compute allow. PyTorch is **eager**: tensors carry values immediately, which makes debugging and research loops faster than static-graph-only styles. A typical project still looks like **data → model (parameters) → forward pass → loss → backward → optimizer step → validate → repeat**, then **export** for inference. The GPU speeds up large tensor math; the CPU is fine for tiny experiments.

**Key terms.** *Supervised learning* (inputs paired with targets), *parameters* (learned numbers), *loss* (how wrong you are), *optimizer* (update rule), *deployment* (serving predictions outside the training script).

**Quick check.** Why is “train on the test set” a mistake?

<details class="dl-answer"><summary>Show answer</summary>
<p>The test set is supposed to estimate <strong>future</strong> performance. Tuning on it leaks information and gives an optimistically biased score—you no longer measure generalization honestly.</p>
</details>

**Exercises**

1. In three sentences, explain **inference** vs **training** for the same neural network file.
2. List four stages of a minimal ML project from raw files to a saved model checkpoint.
3. Name one task where a **small classical model** might still beat a huge deep net.

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> Training adjusts parameters using labeled data and gradients. Inference fixes parameters and only runs forward passes to produce outputs for new inputs—no loss or optimizer step.</p>
<p><strong>2.</strong> Example: (a) ingest/clean data, (b) define model + loss + optimizer, (c) train with train/val split, (d) save <code>state_dict</code> or exported graph.</p>
<p><strong>3.</strong> Example: tiny tabular dataset with strong linear signal and little data—logistic regression or a shallow tree can generalize better with less overfitting risk.</p>
</details>

---

### Chapter 2 — Pretrained networks {#ch2}

**Read in the book:** ImageNet classifiers, GAN / CycleGAN, captioning, Torch Hub.

**Study notes.** **Pretrained** weights encode features learned on a large source task (often ImageNet). For a new task you can **fine-tune** (small LR) or use as a **fixed feature extractor**. **GANs** pit a generator against a discriminator; **CycleGAN** adds cycle consistency so unpaired domains can map to each other. Captioning chains vision features to language decoders. **Torch Hub** standardizes downloading model builders by name—check input size and normalization expected by each architecture.

**Key terms.** *Transfer learning*, *fine-tuning*, *ImageNet normalization*, *generator / discriminator*, *hubconf*.

**Quick check.** You have 500 labeled medical images. Would you train ResNet-50 from random init or start pretrained?

<details class="dl-answer"><summary>Show answer</summary>
<p>Usually <strong>start pretrained</strong> (then fine-tune head and optionally lower layers with a small learning rate). Random init on 500 images often overfits or underfits unless the model is tiny and heavily regularized.</p>
</details>

**Exercises**

1. Why do pretrained vision models expect a specific **input spatial size** and **normalization**?
2. In one sentence, what does the **discriminator** optimize in a GAN?
3. What is one risk of using a captioning model pretrained on web photos in a **safety-critical** dashboard without review?

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> Weights were trained with that resolution and pixel scale; changing mean/std or size shifts the input distribution away from what the early layers expect.</p>
<p><strong>2.</strong> It learns to classify <strong>real vs fake</strong> (or score realism) for samples from the data vs the generator.</p>
<p><strong>3.</strong> Example risks: <strong>hallucinated</strong> captions, biased or offensive language, or failure on out-of-domain images—needs human oversight and evaluation.</p>
</details>

---

### Chapter 3 — It starts with a tensor {#ch3}

**Read in the book:** Tensor basics, storage/stride/views, GPU, NumPy, serialization.

**Study notes.** A **tensor** is a multidimensional array of one **dtype** (often <code>float32</code>). **Views** share underlying **storage** with different shape/stride; some ops require **contiguous** memory. **Transposes** can be views; assigning through a view can surprise you if you expected a copy. <code>.to(device)</code> moves data to GPU; watch **synchronization** cost when bouncing CPU↔GPU. Saving with <code>torch.save</code> stores objects; for interchange prefer clear formats (or later ONNX in Part 3).

**Key terms.** *Shape*, *stride*, *offset*, *view vs copy*, *dtype*, *device*, *named tensor* (optional clarity for dims).

**Quick check.** After <code>x = torch.arange(6).reshape(2,3)</code>, does <code>x.t()</code> always allocate new storage?

<details class="dl-answer"><summary>Show answer</summary>
<p>Not necessarily—it may be a <strong>view</strong> with permuted strides. Call <code>x.t().contiguous()</code> when an op requires contiguous layout.</p>
</details>

**Exercises**

1. Predict <code>x.stride()</code> after <code>x = torch.randn(4, 5)</code> on CPU (row-major default).
2. When is <code>x.numpy()</code> unsafe without <code>.detach()</code>?
3. Write the shape of a batch of 16 RGB images stored as **NCHW** with height 32 and width 32.

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> Typically <code>(5, 1)</code> for contiguous float tensor: stride along last dim is 1, along first is 5.</p>
<p><strong>2.</strong> When <code>x</code> requires grad—NumPy shares memory; mutating breaks autograd. Use <code>x.detach().cpu().numpy()</code> for a snapshot.</p>
<p><strong>3.</strong> <code>(16, 3, 32, 32)</code>.</p>
</details>

---

### Chapter 4 — Real-world data representation {#ch4}

**Read in the book:** Images, volumes, tables, time series, text embeddings.

**Study notes.** **Images:** often <code>C×H×W</code> after <code>ToTensor</code>; normalize per channel. **Volumes:** add a depth dimension; spacing matters medically. **Tables:** numeric columns as floats; categoricals as **indices + Embedding** or one-hot (sparse, high dim). **Time series:** fix a window length and stack windows along batch; watch **leakage** if you normalize using future data. **Text:** maps tokens→indices; **embeddings** learn dense vectors vs huge one-hot rows.

**Key terms.** *Channel order*, *Hounsfield units* (CT), *one-hot*, *embedding table*, *windowing*.

**Quick check.** You one-hot 10,000 words for a classifier. What downside vs embeddings?

<details class="dl-answer"><summary>Show answer</summary>
<p>Huge weight matrices, sparse inputs, no sharing of strength across related words, and poor generalization to rare words. Embeddings compress and learn similarity structure.</p>
</details>

**Exercises**

1. Why subtract mean and divide by std per channel on natural images before feeding a pretrained net?
2. Give one reason **word-level** tokenization can fail for rare words.
3. A time series tensor has shape <code>(B, T, F)</code>. What do <code>B</code>, <code>T</code>, <code>F</code> mean?

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> Matches the scale the network was trained on and keeps activations in a stable range—faster convergence and correct use of pretrained layers.</p>
<p><strong>2.</strong> Example: rare words get an UNK bucket or huge vocabulary; morphology and OOV handling suffer.</p>
<p><strong>3.</strong> <code>B</code> batch size, <code>T</code> timesteps per sequence, <code>F</code> features per time step.</p>
</details>

---

### Chapter 5 — The mechanics of learning {#ch5}

**Read in the book:** Linear fit, loss, gradient descent, autograd, optimizers, train/val.

**Study notes.** Fit parameters $w$ by minimizing a **loss** $L(w)$ on training data. **Gradient** $\nabla L$ points uphill; **gradient descent** steps opposite: $w \leftarrow w - \eta \nabla L$. **Autograd** builds a graph of ops and applies the chain rule in <code>backward()</code>. **Optimizers** (SGD, Adam, …) wrap momentum, adaptive rates, and weight decay. **Validation** tracks generalization; a growing gap (train ↓, val flat/up) suggests **overfitting**. Use <code>torch.no_grad()</code> on validation to save memory.

**Key terms.** *Learning rate* $\eta$, *batch*, *epoch*, *overfitting*, *requires_grad*.

**Quick check.** For scalar $L(w)=(y-wx)^2$, what is $\mathrm{d}L/\mathrm{d}w$?

<details class="dl-answer"><summary>Show answer</summary>
<p>$\mathrm{d}L/\mathrm{d}w = -2x(y - wx)$ (derivative of squared error with respect to $w$).</p>
</details>

**Exercises**

1. Order these: <code>optimizer.zero_grad()</code>, <code>loss.backward()</code>, <code>optimizer.step()</code>—why that order?
2. Why normalize input features before gradient descent on a linear model?
3. What does <code>model.eval()</code> change compared to <code>model.train()</code> for a net with <code>BatchNorm</code> and <code>Dropout</code>?

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> <code>zero_grad</code> (clear old grads) → forward + loss → <code>backward</code> (accumulate grads) → <code>step</code> (update weights). Skipping zero_grad stacks grads across iterations.</p>
<p><strong>2.</strong> Features on different scales give ill-conditioned optimization (zig-zagging); scaling makes $\eta$ meaningful across dimensions.</p>
<p><strong>3.</strong> <code>eval</code> freezes BN running stats usage mode and <strong>disables dropout</strong>; <code>train</code> does the opposite for stochastic regularization layers.</p>
</details>

---

### Chapter 6 — Using a neural network to fit the data {#ch6}

**Read in the book:** Neurons, activations, <code>nn.Module</code>, first MLP.

**Study notes.** Without a **nonlinearity**, stacking affine maps collapses to one affine map. **ReLU** zeros negatives; **sigmoid/tanh** saturate (small gradients). **Modules** encapsulate parameters; calling <code>model(x)</code> runs <code>forward</code>. Compare **parameter count** and **training curves** vs a linear baseline on the same split.

**Key terms.** *Hidden layer*, *activation*, *state_dict*, *Sequential*.

**Quick check.** Two linear layers without activation: effective rank of the map?

<details class="dl-answer"><summary>Show answer</summary>
<p>Still a single <strong>linear</strong> map (composition of affines is affine). You need a nonlinearity between them for extra expressivity.</p>
</details>

**Exercises**

1. MLP: input dim 20, hidden 50, hidden 50, output 3—all linear+ReLU except last linear only. How many scalar parameters (ignore biases briefly, then include biases)?
2. Why is **MSE** natural for regression and **cross-entropy** for classification?
3. What does <code>named_parameters()</code> help you inspect?

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> Weights: $20\times50 + 50\times50 + 50\times3 = 1000+2500+150=3650$. Biases: $50+50+3=103$. Total $3753$.</p>
<p><strong>2.</strong> MSE penalizes squared distance to real-valued targets. Cross-entropy matches probabilistic classification (maximum likelihood for softmax outputs).</p>
<p><strong>3.</strong> Human-readable names tied to submodules for debugging, freezing, or different LRs per layer.</p>
</details>

---

### Chapter 7 — Birds vs airplanes (CIFAR-style classification) {#ch7}

**Read in the book:** <code>Dataset</code>, <code>DataLoader</code>, softmax, cross-entropy, dense classifier limits.

**Study notes.** <code>DataLoader</code> batches samples and can shuffle, use workers, and **pin_memory** for faster GPU transfer. Model outputs **logits**; **softmax** converts to probabilities; **NLLLoss + LogSoftmax** or <code>CrossEntropyLoss</code> on logits bundles numerically stable log-prob training. Flattening $32\times32\times3$ throws away **spatial structure**—huge parameter count and weak inductive bias vs convs.

**Key terms.** *Logits*, *softmax*, *cross-entropy*, *batch dimension*, *transform*.

**Quick check.** If batch size is 64 and flattened image dim is 3072, what is matrix shape for first linear if output dim is 100?

<details class="dl-answer"><summary>Show answer</summary>
<p>Weight matrix <code>(100, 3072)</code> when using <code>nn.Linear(3072, 100)</code> in PyTorch (out_features × in_features internally transposed in the math).</p>
</details>

**Exercises**

1. Should you apply <code>Softmax</code> in the model when using <code>CrossEntropyLoss</code> on logits? Explain.
2. What does <code>shuffle=True</code> on the training loader achieve?
3. Give one reason a **fully connected** CIFAR model underperforms a small CNN at similar parameter budgets.

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> You usually should <strong>not</strong>—<code>CrossEntropyLoss</code> expects raw logits; double softmax/log is wrong.</p>
<p><strong>2.</strong> Reduces correlation between consecutive batches, improving SGD noise and convergence.</p>
<p><strong>3.</strong> FC ignores translation structure; convs share weights across space and build hierarchical local features.</p>
</details>

---

### Chapter 8 — Convolutions to generalize {#ch8}

**Read in the book:** Conv2d, padding, pooling, <code>nn.Module</code> subclassing, regularization, saving.

**Study notes.** Convolution applies **local filters** across the input; **padding** preserves size; **stride** downsamples. **Pooling** adds translation tolerance (less used now; stride in conv common). **Width** adds filters per layer; **depth** stacks more layers; **weight decay** and **dropout** curb overfitting. Save <code>state_dict</code> plus architecture code (or full pickle if you accept coupling).

**Key terms.** *Kernel*, *channel*, *feature map*, *receptive field*, *regularization*.

**Quick check.** Kernel $3\times3$, padding 1, stride 1—output spatial size vs input $H\times W$?

<details class="dl-answer"><summary>Show answer</summary>
<p>Same <code>H×W</code> for standard “same” padding conv when dilation=1 and input is large enough (standard formula gives $H$ out equals $H$).</p>
</details>

**Exercises**

1. Compare **parameter count** of one $5\times5$ conv on $C$ channels vs five $3\times3$ convs in depth (qualitative argument).
2. Why put <code>BatchNorm</code> after linear/conv and before activation in many modern blocks?
3. What must you save besides weights to reconstruct a model in a new script?

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> Two $3\times3$ stacks can capture similar spatial extent with <strong>fewer parameters</strong> and more nonlinearity between them vs one $5\times5$ (classic VGG-style argument).</p>
<p><strong>2.</strong> Stabilizes activations’ scale and often allows higher learning rates; interacts with training mode for running stats.</p>
<p><strong>3.</strong> The <strong>architecture definition</strong> (class or <code>Sequential</code> blueprint), hyperparameters, preprocessing, and class label mapping—not only tensors.</p>
</details>

---

## Part 2 — CT nodule project (LUNA)

### Chapter 9 — Framing the medical imaging problem {#ch9}

**Read in the book:** CT basics, LUNA, why naive end-to-end fails.

**Study notes.** **CT** stores X-ray attenuation per voxel; **Hounsfield units** align intensities across scanners with windowing for viewing. **Class imbalance** and **tiny positives** (nodules) make accuracy misleading. Clinical deployment needs **calibration**, **human oversight**, and careful **validation splits** (patients, not random voxels).

**Quick check.** Why is “99% accuracy” weak evidence here?

<details class="dl-answer"><summary>Show answer</summary>
<p>If positives are rare, predicting “always negative” can yield high accuracy while missing every tumor—need precision/recall/F1 or ROC/PR.</p>
</details>

**Exercises**

1. Name two differences between **natural RGB images** and **CT volumes** as ML inputs.
2. Define **voxel** in one sentence.
3. Why split by **patient** rather than by random crops?

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> Example: 3D structure + anisotropic spacing vs 2D RGB; HU scale vs sRGB; acquisition artifacts differ.</p>
<p><strong>2.</strong> A voxel is a 3D pixel—a small volume element with an intensity value in the grid.</p>
<p><strong>3.</strong> Crops from the same patient are correlated; random splits leak future information and inflate metrics.</p>
</details>

---

### Chapter 10 — Unified dataset from raw CT {#ch10}

**Read in the book:** Parsing annotations, coordinates, <code>Dataset</code>, caching.

**Study notes.** Convert **world/mm coordinates** to **voxel indices** using origin, spacing, and direction. **Cache** expensive disk reads but watch **staleness**. Visualize patches—bad geometry shows up immediately.

**Exercises**

1. Why does ignoring **anisotropic spacing** distort nodule size?
2. What should <code>__getitem__</code> return for a classification patch dataset (types/shapes)?
3. One sentence: why validate coordinate transforms on a known landmark?

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> Voxels are not cubes; a fixed window in indices does not match a fixed physical diameter.</p>
<p><strong>2.</strong> Example: a float tensor patch <code>(1, D, H, W)</code> or <code>(C, D, H, W)</code> plus an integer label tensor/scalar.</p>
<p><strong>3.</strong> Bugs in orientation/spacing silently misalign labels—landmarks catch systematic offsets.</p>
</details>

---

### Chapter 11 — First classifier & TensorBoard {#ch11}

**Read in the book:** Training loop, metrics logging, class imbalance reality.

**Study notes.** Factor **loss computation** into a function used by train and val to avoid drift. Log **learning rate**, **loss**, and **class-balanced** metrics. High accuracy can hide **zero recall** on positives.

**Exercises**

1. Write pseudo-code for one training epoch (loop level only).
2. Why run <code>model.eval()</code> during validation?
3. What is a **scalar summary** you would log to TensorBoard every step vs every epoch?

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> For each batch: zero_grad → forward → loss → backward → step; optionally aggregate loss; after epoch run validation loop without grad.</p>
<p><strong>2.</strong> Disable dropout and use BN eval behavior; avoid training-time randomness contaminating metrics.</p>
<p><strong>3.</strong> Example: log batch loss each step (noisy), log validation F1 each epoch (stable).</p>
</details>

---

### Chapter 12 — Precision, recall, F1, augmentation {#ch12}

**Read in the book:** Confusion matrix thinking, balanced sampling, augmentations.

**Study notes.** **Precision** = trusted positives; **recall** = caught positives; **F1** balances both. **Augment** only with **physically plausible** CT transforms; junk augmentations teach wrong invariances.

**Exercises**

1. If positives are 1% prevalence and the model always predicts negative, what are precision and recall for the positive class?
2. Name one **bad** augmentation for lung CT and one **reasonable** one.
3. Why might **oversampling positives** in training help SGD?

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> Recall = 0 (no positive predictions). Precision undefined or 0 depending on convention; practically you failed to find positives.</p>
<p><strong>2.</strong> Bad: extreme intensity inversion that breaks HU semantics. Reasonable: small isotropic scaling within clinical tolerance or subtle noise (if validated).</p>
<p><strong>3.</strong> More positive examples per batch → gradients reflect rare class more often.</p>
</details>

---

### Chapter 13 — Segmentation & U-Net {#ch13}

**Read in the book:** U-Net, Dice loss, 2D vs 3D, TensorBoard images.

**Study notes.** **Semantic segmentation** labels every pixel/voxel. **U-Net** combines an encoder path with skip connections to recover spatial detail. **Dice loss** focuses overlap for sparse masks; often paired with cross-entropy. **3D U-Net** is memory-heavy—patch sizes trade context vs GPU RAM.

**Exercises**

1. Why are **skip connections** useful in U-Net?
2. Intuition: when is Dice preferred to pixel-wise CE alone for tiny lesions?
3. What does logging **overlay images** to TensorBoard catch early?

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> They pass high-resolution features to the decoder so boundaries are sharp after downsampling bottlenecks.</p>
<p><strong>2.</strong> With huge background, CE can be minimized by predicting all background; Dice directly rewards overlap with the rare foreground.</p>
<p><strong>3.</strong> Misaligned masks, collapsed predictions, or mode collapse—qualitative sanity beyond a single scalar loss.</p>
</details>

---

### Chapter 14 — End-to-end pipeline & malignancy {#ch14}

**Read in the book:** Chaining models, leakage, AUC, fine-tuning.

**Study notes.** **Segmentation → candidate generation → classifier** must keep validation **patient-disjoint**. **Fine-tuning** reuses lower-level features; needs smaller LR on early layers. Report **test** metrics only once after locking choices.

**Exercises**

1. Give one way **leakage** sneaks in when tuning thresholds on the validation set.
2. What does **AUC** summarize that accuracy does not?
3. Fine-tuning vs from scratch in one line each.

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> Repeatedly adjusting threshold to maximize val F1 “uses up” the validation set—optimistic bias; hold out a clean test or use nested CV.</p>
<p><strong>2.</strong> Performance across **all classification thresholds** (ranking quality), useful for imbalanced problems.</p>
<p><strong>3.</strong> Fine-tune: start from pretrained weights and adapt. Scratch: initialize randomly and train fully—needs more data/compute.</p>
</details>

---

## Part 3 — Deployment

### Chapter 15 — Production & export {#ch15}

**Read in the book:** Serving, ONNX, trace vs script, LibTorch, mobile/quantization.

**Study notes.** **Latency** (one request) vs **throughput** (many). **Batching** amortizes overhead. **ONNX** trades PyTorch for cross-runtime graphs. **Tracing** records ops seen on an example input—fails on Python control flow that depends on data. **Scripting** (<code>torch.jit.script</code>) can capture some control flow at compile time. **Quantization** reduces precision for speed/size at some accuracy cost.

**Exercises**

1. Why is a **representative example tensor** important for <code>torch.jit.trace</code>?
2. Name one downside of a **Flask thread-per-request** model under heavy load.
3. When might you still prefer **LibTorch C++** over a Python server?

<details class="dl-answer"><summary>Answers (ex. 1–3)</summary>
<p><strong>1.</strong> Trace captures only paths executed—wrong shapes or branches skipped in the example won’t appear in the graph.</p>
<p><strong>2.</strong> Thread/process overhead and GIL contention; hard to saturate GPU; need async/workers or dedicated serving stacks.</p>
<p><strong>3.</strong> Tight latency, embedded deployment, or environments where Python runtime is undesirable—integrate into existing C++ services.</p>
</details>

---

### Suggested course pacing (self-study) {#pacing}

| Week block | Chapters | Focus |
|------------|----------|--------|
| 1 | 1–3 | Environment, pretrained play, tensors |
| 2 | 4–5 | Data as tensors, autograd and training loop |
| 3 | 6–7 | MLP, CIFAR dense classifier |
| 4 | 8 | ConvNets, saving models |
| 5–8 | 9–14 | CT project (skim if skipping medical data) |
| 9 | 15 | Export and deployment |

---

### Reference {#ref}

Stevens, E., Antiga, L., & Viehmann, T. (2020). *Deep Learning with PyTorch*. Manning Publications. ISBN 978-1617295263.

Related on this site: [Neural networks]({{ '/notes/personal-notes/neural-networks/' | relative_url }}), [CNNs]({{ '/notes/personal-notes/cnns/' | relative_url }}), [Gradients & optimization]({{ '/notes/personal-notes/gradients-optimization-for-ml/' | relative_url }}), [ML concepts / metrics]({{ '/notes/personal-notes/machine-learning-concepts/' | relative_url }}).
