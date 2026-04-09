---
layout: personal-note
title: "Paper notes: How AI aggregation affects knowledge"
subtitle: Acemoglu, Lin, Ozdaglar & Siderius (2026) — detailed walk-through
permalink: /notes/personal-notes/paper-ai-aggregation-knowledge/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="pn-viz-note">Working papers may not have stable public figure hosting; this page uses <strong>Mermaid</strong> diagrams for the main mechanisms. Consult the authors’ PDF for any official figures.</p>

<p class="text-muted small"><strong>Use &amp; copyright:</strong> The bullet below is the <strong>canonical citation</strong> for the underlying work. Everything else on this page is my <strong>own summary and paraphrase</strong> for study—it is <strong>not</strong> copied text from the paper, <strong>not</strong> the authors’ endorsement, and <strong>not</strong> a substitute for reading their PDF. Obtain the official manuscript from the authors or their institutions.</p>

<p class="text-muted small"><strong>Full citation (APA-style):</strong> Acemoglu, D., Lin, T., Ozdaglar, A., &amp; Siderius, J. (2026). <em>How AI aggregation affects knowledge</em> (Working paper, 25 March 2026 version). <em>Cite the venue / series when formally published if applicable.</em></p>

---

### Who this summary is for

This write-up assumes you have **introductory micro and macro** (supply and demand, equilibrium, maybe externalities) but **no research training**. I use plain language first, then slowly introduce the paper’s notation. If a paragraph feels dense, skip to the **&ldquo;In one sentence&rdquo;** bullets.

---

### 1. The real-world worry (before any math)

**Generative AI** (ChatGPT-style tools) is becoming a main way people **look up and summarize** information. Two features matter for this paper:

1. **Training data come from people** — web text, posts, answers, etc.
2. **AI outputs feed back into what people write** — and some of that may end up in **future training**.

So the system can enter a **loop**: the model influences beliefs → those beliefs appear in new content → the model trains on that content again. Informally, people call related concerns **model collapse** or **feedback loops**: the training set may contain less **independent** information over time and more **synthetic** or **already-AI-shaped** material.

The paper asks a **theoretical** question: if you model society as a **network of people updating beliefs** and add an **AI that aggregates everyone’s beliefs and feeds an answer back**, when does that **help** collective learning, and when does it **hurt** it—especially when the network is **segregated** (people mostly talk to similar others)?

---

### 2. The economic question in one paragraph

Imagine society wants to learn some **unknown truth** (for example, the effectiveness of a policy, or a factual parameter). Each person gets a **noisy private clue**. If we could **pool** all clues perfectly, we would get a good estimate.

**Without AI**, people only talk to neighbors in a **social network** (friends, colleagues, online bubbles). Beliefs slowly adjust. Under standard conditions, everyone’s belief **converges to the same long-run value** (called **consensus** in the paper)—but that value may **not** equal the ideal pooled-information benchmark because the network distorts who influences whom.

**With AI**, a central tool computes a **weighted average** of people’s current beliefs and many people **also listen to that output**. The weights are like **who counts in the training data**. The AI’s output tomorrow depends on **today’s beliefs**, which already reflected **yesterday’s AI**. That is the **feedback**.

The paper compares long-run consensus **with** and **without** this AI layer, relative to the **efficient benchmark** (perfect pooling of private signals). The gap is called the **learning gap**.

---

### 3. Building block: the DeGroot model of social learning

**DeGroot (1974)** is a classic **workhorse model** in economics for **naïve** or **mechanical** belief updating:

- There are $n$ people.
- Time is $t = 0, 1, 2, \ldots$
- Each person $i$ starts from some initial belief $p_i(0)$ (in the paper, tied to a **private signal** about an unknown state $\theta$).

Each period, each person updates to a **weighted average** of what they heard from others **last period**:

$$
p(t+1) = T\, p(t).
$$

Here $T$ is an $n \times n$ matrix. Entry $T_{ij}$ = how much person $i$ trusts person $j$’s **current** belief. Rows sum to 1 (weights are probabilities / shares of attention).

**Intuition:** This is **not** full Bayesian rationality with infinite memory; it is a **simple, tractable** rule that captures **social influence** and **echo chambers** in a transparent way.

If the network is **well-behaved** (strongly connected and aperiodic—roughly, influence can spread everywhere and the process doesn’t get stuck in a periodic cycle), beliefs **converge to a single consensus** $p^\star$ for everyone.

**In one sentence:** *DeGroot = “each period, average your friends’ last beliefs with fixed trust weights.”*

{::nomarkdown}
<div class="pn-viz">
<div class="mermaid">
flowchart LR
  P0[Beliefs p t] --> T[Trust matrix T]
  T --> P1[New beliefs p t+1]
  P1 --> P0
</div>
</div>
{:/}
<p class="pn-viz-caption">DeGroot updating as repeated multiplication by fixed influence weights (network geometry in T).</p>

---

### 4. What the paper adds: a global AI aggregator

The unknown **state** $\theta$ is a **scalar** (one number to learn). At time 0, person $i$ sees a private signal $s_i = \theta + \text{noise}$.

**Efficient benchmark** (frictionless information pooling):

$$
\hat{\theta} = \frac{1}{n}\sum_{i=1}^n s_i.
$$

Because signals are unbiased and symmetric, the **simple average** is the right reference point—think of it as “what a benevolent social planner would believe if all private information were combined honestly.”

#### 4.1 The AI’s output

The AI forms a **weighted average of current population beliefs**:

$$
m(t) = \sum_{i=1}^n \alpha_i\, p_i(t), \qquad \alpha_i \ge 0,\ \sum_i \alpha_i = 1.
$$

The vector $\alpha$ is **training weight** or **representation**: some groups may have larger $\alpha_i$ because they post more, are scraped more, or are **deliberately up-weighted** for fairness experiments.

The AI’s published answer $a(t)$ **does not jump instantly** to $m(t)$. It **smooths** over time:

$$
a(t+1) = \rho\, a(t) + (1-\rho)\, m(t), \quad \rho \in (0,1).
$$

**Important sign interpretation (easy to flip):**

- **Smaller $\rho$** → the AI puts **more weight on the fresh mixture of current beliefs** $m(t)$ each step → the AI **tracks society faster**.
- **Larger $\rho$** → the AI **remembers its past output** longer → **slower** adjustment to whatever people believe right now.

So when the abstract says updating is **“too quick,”** it corresponds to **small $\rho$** (strong, tight feedback with **current** distorted beliefs).

#### 4.2 How people use the AI

Once the AI exists, each person blends **ordinary social learning** with **the AI signal**:

$$
p_i(t+1) = (1-\beta_i)\sum_j T_{ij}\, p_j(t) + \beta_i\, a(t).
$$

Here $\beta_i \in (0,1)$ is **AI reliance** (how much person $i$ listens to the AI versus neighbors).

Under technical conditions, there is again a **unique consensus** $p^{\star\star}$ that everyone (and the AI state) approaches.

**In one sentence:** *The AI is an extra “voice” in the network whose script is literally built from **everyone’s beliefs**, including beliefs already shaped by **last round’s AI**.*

{::nomarkdown}
<div class="pn-viz">
<div class="mermaid">
flowchart TB
  PPL[People beliefs p_i] --> MIX[Weighted mix m t]
  MIX --> AI[Smoothed output a t]
  AI --> PPL
  PPL --> NET[Neighbor averaging T]
  NET --> PPL
</div>
</div>
{:/}
<p class="pn-viz-caption">Feedback loop: AI reads beliefs, people update using neighbors and AI, next AI input already reflects past AI.</p>

---

### 5. The learning gap (success measure)

Let $p^\star$ be consensus **without** AI, and $p^{\star\star}$ **with** AI.

**Learning gaps:**

$$
\Delta_0 = |p^\star - \hat{\theta}|, \qquad \Delta_1 = |p^{\star\star} - \hat{\theta}|.
$$

- If $\Delta_1 < \Delta_0$, AI **improved** learning (closer to the ideal average of signals).
- If $\Delta_1 > \Delta_0$, AI **worsened** it.

The paper’s deeper results often study **how much** the AI shifts the gap relative to baseline, e.g. $\Delta^\star = \Delta_1 - \Delta_0$ (so negative means improvement in their definition in Section 4).

**In one sentence:** *Did adding the AI move society **closer** to the truth you would get from pooling all private clues, or **farther**?*

{::nomarkdown}
<div class="pn-viz">
<div class="mermaid">
flowchart LR
  TH[True theta] --> BMK[Benchmark average of signals]
  PSTAR[Consensus no AI] --> G0[Gap Delta0]
  BMK --> G0
  PSTAR2[Consensus with AI] --> G1[Gap Delta1]
  BMK --> G1
</div>
</div>
{:/}
<p class="pn-viz-caption">Learning gaps measure distance from efficient pooling with and without the AI layer.</p>

---

### 6. General networks: why closed form matters (Section 3)

For arbitrary networks, the paper **proves convergence** under mild conditions (Proposition 1): the AI must stay **connected** to society (not a dead end), everyone must still put some weight on neighbors, and **someone** must use the AI.

**Theorem 1** gives a **closed-form** expression for $p^{\star\star}$ as a **weighted average of initial beliefs**, where the weights mix:

- the **original network** $T$, and  
- a **low-rank correction** from the AI feedback (training weights $\alpha$, adoption $\beta$, persistence $\rho$).

**Why you should care (no proof):** It makes the **influence** of each person’s initial information on the long-run outcome **explicit**. The AI does not just “add information”; it **reshuffles epistemic power**—whose first impressions matter most in the limit.

**In one sentence:** *They solve the long-run outcome in a form that shows **exactly** how AI training weights rewire effective influence.*

---

### 7. Two “islands”: majority, minority, and homophily (Section 4)

To get **sharp** results, the paper simplifies the network to **two groups**:

- **Island 1** — “majority,” $n_1$ people.  
- **Island 2** — “minority,” $n_2$ people.

**Homophily** $h > 1$: ties within a group are **more likely** than ties across groups (like real **echo chambers**, alumni networks, geography).

A single number $\alpha \in [0,1]$ is the **share of training weight on the majority island**; $1-\alpha$ on the minority.

**Adoption** can differ: $\beta_1$ and $\beta_2$ (how much each island trusts the AI).

This stripped-down picture still has:

- **representation** ($\alpha$),  
- **segregation** ($h$),  
- **who trusts the AI** ($\beta$),  
- **feedback speed** ($\rho$).

{::nomarkdown}
<div class="pn-viz">
<div class="mermaid">
flowchart TB
  I1[Island 1 majority] --> HPH[Homophily h]
  I2[Island 2 minority] --> HPH
  HPH --> AIW[Training weight alpha]
  AIW --> FB[AI feedback to both islands]
</div>
</div>
{:/}
<p class="pn-viz-caption">Two-island sketch: segregation and representation shape what the global model hears.</p>

---

### 8. Main “speed vs robustness” result (Theorem 2) — explained slowly

**Robust improvement** is **not** “works in one simulated world.” It means: is there a **set** of training weights $\alpha$ (with positive size / “positive measure”) such that **for every** homophily level $h$ in some plausible range **and** **for every** adoption pattern $(\beta_1,\beta_2)$, the AI **improves** learning relative to no AI?

That is a **tough** standard—mimicking a designer who **does not perfectly know** society’s segregation or usage patterns.

**Theorem 2 (interpretation):** Under stated conditions on the island model, there is a cutoff $\rho^\star$ such that:

1. If **$\rho < \rho^\star$** (AI **tracks current society too tightly** / **fast updating** in their sense) → the set of $\alpha$ that robustly improve learning has **zero measure** — **no** nice, fat interval of training designs works **uniformly**.
2. If **$\rho > \rho^\star$** (**slower** tracking of current beliefs, more inertia in $a(t)$) → there **is** a **positive-measure** set of training weights that robustly help.

**Intuition for a beginner:**

- When the AI **reacts too quickly** to **today’s** beliefs, today’s beliefs already **embed** segregation and past AI. The training data are **endogenous**—the AI is partly listening to **itself through people**.
- That **shrinks effective diversity** of independent information, similar in spirit to **model collapse** stories (even if data are **abundant**).
- When the AI **updates more slowly**, it averages over a **smoother history**, so one-shot distortions do not get **recursively amplified** as harshly, and some training weights can **robustly** help across environments.

**In one sentence:** *If the global model retrains too tightly on **what people believe right now**, and those beliefs were already bent by **the same kind of model**, you may be unable to pick training weights that **always** help across realistic unknowns.*

{::nomarkdown}
<div class="pn-viz">
<div class="mermaid">
flowchart LR
  subgraph fast[Small rho fast tracking]
    F1[Tight coupling to current beliefs] --> F2[Fragile robust improvement set]
  end
  subgraph slow[Large rho slower AI state]
    S1[Smoother history] --> S2[Positive measure robust alpha]
  end
</div>
</div>
{:/}
<p class="pn-viz-caption">Theorem 2 contrast: very responsive AI (small rho) vs more inertial AI (large rho) and robust training-weight designs.</p>

---

### 9. Majority-weighted training + segregation (Proposition 2)

Suppose the AI’s training **overweights the majority** (formally $\alpha > \frac{\pi^2}{\pi^2 + 1}$ in their parameterization, where $\pi$ relates group sizes).

**Result:** Adding the AI **hurts** relative to baseline ($\Delta^\star > 0$ in their notation), and the learning gap **gets worse as homophily $h$ rises**—monotone, no silver lining.

**Story:** Majority opinions are already **amplified inside the majority island**. A majority-tilted AI **re-ingests** that tilt and **feeds it back**, so **segregation** and **data imbalance** **reinforce** each other.

**Policy flavor:** *Fixing representation is not only “fairness optics”—it can be necessary for **aggregate accuracy** when a global aggregator closes the loop.*

---

### 10. Minority-weighted training — why it is not a simple fix (Proposition 3)

Now **tilt training toward the minority** (e.g. $\alpha < \tfrac{1}{2}$ with low enough symmetric reliance $\beta$).

**Result:** The effect on the learning gap is **non-monotone** in segregation $h$:

- **Low** segregation: minority overweighting can **over-correct** — push consensus **past** the efficient benchmark.
- **Intermediate** segregation: minority weighting can **offset** majority dominance and **improve** learning.
- **High** segregation: cross-group contact is too weak; minority-weighted feedback can **backfire** again.

**In one sentence:** *“Reweight toward the minority” is not a dial you can set without knowing **how separated** groups are; the same intervention can help, hurt a little, or hurt a lot.*

---

### 11. Local vs global AI (Sections 6 — multi-topic extension)

The paper extends to **two topics** $\theta_1$ and $\theta_2$:

- Island 1 has **direct private signals** about topic 1 only.  
- Island 2 has **direct private signals** about topic 2 only.

Think **local expertise**: health conditions in one region vs. labor market conditions in another—each community has **first-hand** information about **its** topic.

#### 11.1 Local aggregators

- **Two AIs**, each trained only on beliefs about **its** topic from the relevant population.
- Each AI is trusted **more** by the island that actually has signals on that topic (**own-island bias** in $\beta$).

**Proposition 4:** Under local aggregators, learning is **better on every topic** than with **no** aggregators at all.

**Intuition:** Training data stay **anchored** to people who actually have **relevant** clues. Feedback is **compartmentalized**—mistakes in topic 1’s loop do not automatically poison topic 2’s training mixture the way a single global soup does.

#### 11.2 Replacing locals with one global design (Theorem 3)

**Theorem 3:** If you **replace** the local specialists with **one global architecture** that uses the **same training/adoption design across topics**, then for **at least one topic** $k^\star$, learning is **worse** than under local aggregators.

**Intuition:** Doing **well on topic 1** wants weight on island 1; doing **well on topic 2** wants weight on island 2. A **single shared** global training recipe **cannot** be optimal for **both** dimensions at once. Specialization has a real value; **centralization** couples feedback across topics.

**In one sentence:** *One giant model that pools everything is not just a scaling choice—it can **systematically** underperform a **modular** system when information is **local** and topics differ.*

---

### 12. How this connects to ideas you may know from class

| Idea from class | Echo in the paper |
|-----------------|-------------------|
| **Externalities** | My belief affects your training data; your AI answer affects my belief—**feedback**. |
| **Public good / information** | Efficient benchmark = everyone’s signals pooled; networks + AI break that ideal. |
| **Market power / concentration** | “Global aggregator” ≈ **centralized** information institution with outsized reach. |
| **Inequality** | Not just income—**who influences the long-run belief** (“epistemic influence”). |

---

### 13. What the paper does **not** claim

- It is **not** an empirical measurement of ChatGPT’s factual error rate.  
- It does **not** use real scrape data; it is a **theoretical** DeGroot + AI extension.  
- It does **not** mean “all AI is bad”—it characterizes **when centralized, fast-feedback aggregation** is **fragile** and when **localized** designs are **more robust**.

---

### 14. If you read the actual paper, follow this map

{::nomarkdown}
<table class="table table-bordered table-sm" style="max-width: 44rem;">
<thead><tr><th>Section</th><th>What to look for</th></tr></thead>
<tbody>
<tr><td><strong>1</strong></td><td>Motivation, feedback loop, contribution in words.</td></tr>
<tr><td><strong>2</strong></td><td>Formal DeGroot + AI equations ($T$, $\alpha$, $\rho$, $\beta$).</td></tr>
<tr><td><strong>3</strong></td><td>Convergence + Theorem 1 (closed form).</td></tr>
<tr><td><strong>4</strong></td><td>Two-island figure + Theorem 2 (robustness vs $\rho$).</td></tr>
<tr><td><strong>5</strong></td><td>Majority vs minority training (Propositions 2–3).</td></tr>
<tr><td><strong>6</strong></td><td>Local aggregators figure + Proposition 4 + Theorem 3.</td></tr>
<tr><td><strong>7</strong></td><td>Short recap + future research.</td></tr>
<tr><td><strong>Appendix</strong></td><td>Proofs (heavy math).</td></tr>
</tbody>
</table>
{:/nomarkdown}

---

### 15. Glossary

- **Consensus** — long-run belief everyone agrees on in the model.  
- **Homophily** — tendency to link to similar others; **higher** $h$ ⇒ more segregated communication.  
- **DeGroot updating** — linear weighted averaging of neighbors’ beliefs each period.  
- **Training weights $\alpha$** — who enters the AI’s aggregate $m(t)$.  
- **Persistence $\rho$** — memory of past AI output; **small $\rho$** ⇒ faster tracking of current society.  
- **Robust improvement** — better than no-AI for **all** environments in a chosen family (homophily range + adoption patterns).  
- **Model collapse (informal)** — quality drops when models train too much on **model-shaped** data.

---

### References, citation, and copyright

**Primary source (read this, not only my notes):**

- Acemoglu, D., Lin, T., Ozdaglar, A., & Siderius, J. (2026). *How AI aggregation affects knowledge* (working paper, dated 25 March 2026 on the copy summarized here).

**Background models cited inside their paper (examples—consult the paper’s reference list for full bibliography):**

- DeGroot, M. H. (1974). Reaching a consensus. *Journal of the American Statistical Association*, 69(345), 118–121.
- Golub, B., & Jackson, M. O. (2010). Naïve learning in social networks and the wisdom of crowds. *American Economic Journal: Microeconomics*, 2(1), 112–149.

**Copyright / plagiarism:** This web page is an **original student-style digest**: ideas are **attributed** to Acemoglu et al., but **sentences are mine**. I do **not** paste extended quotations or reproduce figures from their PDF. If you reuse **their** theorems or wording in coursework, cite **their** paper directly. If you cite **my** summary, you can link this page and still credit the original authors for the underlying research.

**No code:** The paper is theoretical; there is no standard “sample implementation” section here.

---

<p class="text-muted small">If I revisit this paper after class or research training, I may tighten notation or add links to related posts (e.g. <a href="{{ '/notes/personal-notes/xgboost/' | relative_url }}">boosting</a> is unrelated technically but part of the same “when does aggregation help?” instinct).</p>
