---
layout: page
title: "Math intuition for ML notes"
subtitle: Vectors, sums, and symbols—without a linear algebra course
permalink: /notes/personal-notes/math-intuition-for-ml/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

The **machine learning** pages on this site use a small amount of **algebra** and **Greek letters**. You do **not** need a full linear-algebra or proofs class to follow the *ideas*—but you may want a **phrase book** for the notation. This page is that phrase book.

---

### What is a “model” here?

A **model** is a **rule**: it takes **inputs** you can measure (age, income, pixels, words turned into numbers, …) and outputs a **prediction** (a number, a probability, a class). **Training** means adjusting the rule so past examples are fit well, without memorizing noise.

---

### Features, vectors, and rows of a spreadsheet

Each observation is often written as $x$. If you have $p$ numeric inputs (features), you can think of $x$ as a **list of $p$ numbers** in a fixed order—for example `(income, age, years_education)`.

Mathematicians call that list a **vector**. In a spreadsheet, one **row** is one person (or one image, one day of sales), and each **column** is one feature.

**$x_j$** means “feature number $j$” for that row—like one cell in the row.

---

### The “dot product” and $x^\top \beta$ (weighted sums)

You will see **$x^\top \beta$** a lot. Read it as:

> Multiply each feature by a **weight** (coefficient), then **add** everything up.

If features are $x_1, x_2, \ldots, x_p$ and weights are $\beta_1, \ldots, \beta_p$,

$$
x^\top \beta = x_1\beta_1 + x_2\beta_2 + \cdots + x_p\beta_p.
$$

The **$^\top$** (transpose) is bookkeeping: it just means “treat $x$ as a row and $\beta$ as a column so the multiplication rule gives the sum above.” You can **ignore the symbol** and think **weighted sum**.

Often there is an **intercept**: a constant “1” is added as a fake feature so the model can shift predictions up or down without changing how it weights real inputs.

---

### $\sum$ (sigma) = “add these up”

$\sum_{i=1}^n z_i$ means $z_1 + z_2 + \cdots + z_n$. For example **mean squared error** is “for each training example, square the mistake, then add all those squares.”

---

### $\min$ and “arg min”

**$\min_\beta (\text{something})$** means: “among all possible choices of $\beta$, choose the one that makes *(something)* **as small as possible**.”

That is exactly what **least squares** does: pick weights that minimize total squared prediction error.

---

### Norms: $\|v\|$, $\|w\|^2$

**$\|v\|$** is the **length** of a vector in ordinary Euclidean space (like distance from the origin to a point). In 2D, if $v = (3,4)$, then $\|v\| = \sqrt{3^2+4^2} = 5$.

**$\|w\|^2$** is that length **squared**—same as the sum of squares of the coordinates: $w_1^2 + \cdots + w_p^2$. Ridge regression penalizes **large** weights by adding a multiple of **$\|\beta\|_2^2$** (sum of squares of coefficients).

**$\|\beta\|_1$** means $|\beta_1| + |\beta_2| + \cdots$—sum of **absolute values** (lasso uses this).

---

### Matrices: $X$, $T$, $W$ (big tables)

A **matrix** is a **rectangle of numbers**—like a whole spreadsheet tab.

- Rows often index **people / time / examples**; columns index **features** or **other people** (in networks).
- **$X^\top X$** shows up in linear regression formulas: you can picture it as “cross-tabulate features with themselves” to see how they co-move; the inverse $(X^\top X)^{-1}$ is the part that solves for best coefficients (only when the problem is well-behaved).

You do **not** need to compute these by hand; the point is to recognize **pattern**: linear models combine features; matrices **organize** many rows at once.

---

### $\mathbb{R}^p$ and “in $n$ dimensions”

**$\mathbb{R}^p$** means “all lists of $p$ real numbers”—the natural space where one data point with $p$ features lives. Saying a vector lives in **$\mathbb{R}^n$** in other notes might mean “we have $n$ numbers tracking one thing per person” (context matters: sometimes $n$ is sample size, sometimes dimension).

---

### Derivatives and gradients (one sentence each)

- **$\partial \ell / \partial \hat{y}$** = “how fast the loss $\ell$ changes if you nudge the prediction $\hat{y}$ a tiny bit.” That is the **slope** of the error curve at a point.
- **Gradient** (for many variables) = list of those slopes—points in the direction of **steepest increase** of the function. **Gradient descent** steps **opposite** that direction to **reduce** error.

In boosting notes, **pseudo-residuals** are built from these slopes: “which direction should we nudge predictions to reduce loss?”

---

### Probability shorthand

**$\Pr(y=1 \mid x)$** reads: “probability that $y$ is 1 **given** you observed features $x$.” **Logistic regression** forces this probability to stay between 0 and 1 using a **sigmoid** curve.

---

### Big-O like $O(n^2)$ (optional)

Means “work grows **roughly like** $n^2$ when $n$ gets large”—a **scalability** shorthand, not an exact recipe.

---

### Where to go next

Open the [personal notes index]({{ '/notes/personal-notes/' | relative_url }}) and pick a topic. The **supervised** list starts with [linear & logistic regression]({{ '/notes/personal-notes/linear-logistic-regression/' | relative_url }})—it is the natural first page if you want to see $x^\top \beta$ in context.

**Free outside resources (not mine):** 3Blue1Brown’s “Essence of linear algebra” series (YouTube) builds excellent pictures for vectors and matrices; Khan Academy has short modules on dot products and matrix multiplication if you want practice.

### References and attribution

- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning* (2nd ed.). Springer. [Author page](https://hastie.su.domains/ElemStatLearn/).
- James, G., et al. (2021). *An Introduction to Statistical Learning* (2nd ed.). [statlearning.com](https://www.statlearning.com/).
- Grant Sanderson (3Blue1Brown). *Essence of linear algebra* (YouTube series)—independent educational videos, not affiliated with this site.
- Khan Academy. Linear algebra modules (free online)—third-party resource.

**Copyright / use:** This primer is **original explanatory text** by the site author. It does not reproduce prose or diagrams from textbooks or videos. Notation conventions follow common statistics / ML literature (as in ESL/ISL). For rigorous treatment, see ESL/ISL or a dedicated linear algebra text.

*(No sample code on this page—it is notation-only.)*
