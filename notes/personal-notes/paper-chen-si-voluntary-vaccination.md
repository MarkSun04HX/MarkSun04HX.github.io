---
layout: page
title: "Paper notes: SI epidemic with voluntary vaccination (Chen 2006)"
subtitle: Rational choice, multiple equilibria, and when vaccines can raise prevalence
permalink: /notes/personal-notes/paper-chen-si-voluntary-vaccination/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="text-muted small"><strong>Use &amp; copyright:</strong> This page is my <strong>own detailed summary</strong> of a published journal article. It is <strong>not</strong> copied prose from the paper, <strong>not</strong> the author’s endorsement, and <strong>not</strong> a substitute for the PDF. For quotations, theorems, or coursework, cite the original. The author was at <strong>Wake Forest University</strong> (Department of Economics) when the paper was published.</p>

<p class="text-muted small"><strong>Citation (APA):</strong> Chen, F. H. (2006). A susceptible-infected epidemic model with voluntary vaccinations. <em>Journal of Mathematical Biology</em>, <em>53</em>(2), 253–272. https://doi.org/10.1007/s00285-006-0006-1</p>

---

### 1. What problem this paper addresses

**Public health context (2006):** HIV/AIDS; no sterilizing vaccine; hope for a **partial** (imperfect) preventive vaccine. Earlier **mathematical** work showed that if people **increase risky behavior** when a vaccine exists (“behavioral disinhibition”), prevalence can **rise** even when the vaccine offers some protection—but in those models **risk behavior** and **coverage** were often **fixed** or **assumed**, not derived from **individual decisions**.

**Chen’s move:** Build a **susceptible–infected (SI)** model (once infected, you stay infected; no recovery compartment) on a **continuum of agents** who **choose** (i) whether to use a **costly but perfectly effective** self-protection (e.g. condoms) and (ii) whether to pay for **voluntary vaccination** that **lowers** but need not eliminate infection risk per contact. Choices solve a **dynamic program** (value functions) taking **endemic prevalence** as given in equilibrium. Then ask:

- When does an **endemic** steady state exist?
- Can there be **several** endemic outcomes (different $P$ and vaccine use)?
- Can introducing a vaccine **increase** equilibrium prevalence relative to **no vaccine**?
- What do **subsidies**, **safer-behavior campaigns**, and **mandatory** vaccination do?

---

### 2. Economic vs epidemiological ingredients (plain language)

| Piece | Meaning in the paper |
|--------|----------------------|
| **SI structure** | Only **susceptible** and **infected**; no SIR recovery. Matches chronic infection stories (HIV) more than flu. |
| **Utility** | Healthy susceptible utility $u_h$; infected utility $u_i$; $u_h > u_i \geq 0$; death utility $0$. |
| **Self-protection** | If you pay cost $c_s > 0$, you are **perfectly safe** that period (no transmission). Net flow utility that period: $u_h - c_s$. |
| **Vaccination** | Costs $c_v > 0$, chosen **before** self-protection that period. Reduces per-contact infection prob from $\beta$ to $\beta_v$ with $0 \leq \beta_v < \beta$. **Efficacy** can be read as $(\beta - \beta_v)/\beta$. **Lifelong** vaccine: at most one shot. |
| **Mixing** | **Proportional:** one partner per period; chance partner is infected = **aggregate prevalence** $P_t$. |
| **Mortality / turnover** | Each period, die with prob $\delta \in (0,1)$; replaced by a **new susceptible** of the **same type** $(c_v, c_s)$—population constant; type distribution $F(c_v,c_s)$ fixed. |
| **Heterogeneity** | Types differ in **costs** $(c_v, c_s)$; joint CDF $F$, density $f$. |

So the model is **micro-founded**: behavior is not a free parameter—it comes from **comparing costs and expected lifetime utility** under beliefs about $P$.

---

### 3. Timing of decisions (one period)

For a **susceptible** who has **not** yet been vaccinated this lifetime:

1. **Vaccinate or not** (pay $c_v$ or not).
2. Then **self-protect or not** (pay $c_s$ or face risk).

**Vaccinated** susceptibles: only **self-protect vs risky** remains; the paper shows in steady state **no one self-protects after vaccinating** (vaccination + protection is dominated in their argument—intuition: if you still paid $c_s$, you could have saved money by just protecting without vaccinating, etc.; the algebra pins this down).

---

### 4. Bellman equations (intuition, not full proof)

Let $U_v(P_t)$ = value of a **vaccinated** susceptible when prevalence is $P_t$, and $U_n(P_t)$ = value of an **unvaccinated** susceptible.

**Vaccinated agent** each period chooses:

- **Protect:** get $u_h - c_s$ today + discounted continuation if alive.
- **Risky:** get $u_h$ today; with probability $\beta_v P_t$ become infected (then lifetime infected utility stream $u_i/\delta$ in expectation structure); else continue susceptible.

That yields **Eq. (1)** in the paper (dynamic programming).

**Unvaccinated agent** chooses among:

- **Vaccinate now** (pay $c_v$, enter vaccinated value $U_v$),
- **Protect without vaccinating**,
- **Neither** (risky with transmission prob $\beta P_t$).

That yields **Eq. (2)**.

The paper **recenters** values by subtracting the infected outside option, defining $W_v = U_v - u_i/\delta$, $W_n = U_n - u_i/\delta$, and $w \equiv u_h - u_i$. That makes **tradeoffs** easier to read: everything is in “**gain from staying healthy**” units.

**Steady-state** versions **(3)–(4)** collapse to **closed-form max** expressions **(13)–(15)** because the infinite-horizon structure makes continuation values proportional to a **per-period comparison** (standard DP trick with geometric survival).

---

### 5. Who does what? Thresholds in $(c_v, c_s)$ space

Given steady prevalence $P$, define **cutoffs** $\gamma_n(P)$ and $\gamma_v(P)$ from **indifference** between protecting vs risky (unvaccinated vs vaccinated branches). The **benefit of vaccinating** (without protecting) vs staying unvaccinated and risky is denoted $B(P)$; it depends on $P$ because the value of avoiding infection changes with how common infection is.

**Figure 1 (conceptually):** Partition types $(c_v, c_s)$ into regions:

- Some types **always protect** (low $c_s$).
- Some **never vaccinate, go risky** (high $c_s$, vaccination too costly relative to benefit).
- Some **vaccinate but do not protect** (intermediate region—vaccine “enough” relative to $c_v$, protection not worth it).
- **Indifference** ties broken toward **lower infection risk**.

The paper proves **$\sigma_v = 0$** in steady state: **no one** both vaccinates and self-protects—so the only vaccinated behavior is **risky** (with lower $\beta_v$).

---

### 6. Steady states and disease dynamics

For each type, stocks **$S, I, V$** (susceptible unvaccinated, infected, vaccinated susceptible) evolve with **new infections** from contacts and **deaths/replacements**. Aggregating gives **aggregate prevalence** $P = \iint I(c_v,c_s) f\, dc_s\, dc_v$.

A **steady-state equilibrium** ties together: **optimal policies** $(\sigma_n,\rho_v,\rho_n,r)$, **type stocks**, and **$P$** consistent with **(9)–(12)** and **(16)–(19)**.

**Remark:** A **disease-free** steady state with $P=0$ **always** exists (no one meets infection).

---

### 7. Main existence result: basic reproduction number **ignores** vaccine efficacy

**Proposition 3.** An **endemic** equilibrium ($P>0$) exists **if and only if**

$$
\frac{(1-\delta)\beta}{\delta} > 1.
$$

This quantity is the paper’s **basic reproduction number** $R_0$: expected **secondary infections** from one infected **lifetime**, **if everyone unvaccinated went risky** and **no vaccine** affected biology.

**Shocking point (for voluntary vaccination):** Whether endemicity **exists** does **not** depend on $\beta_v$ or on the **distribution** $F$ of costs. So **“can the disease persist at all in the worst-case behavior?”** is pinned by **biology + turnover** $(\beta,\delta)$ only—not by how good the vaccine is.

**Why?** With voluntary take-up, if $R_0 \leq 1$, the **no-disease** corner is self-enforcing; if $R_0 > 1$, there is **some** endemic solution to the fixed-point equation in $P$—even though **who** vaccinates and **how much** protection happens still matters for **which** $P$ and **how many** equilibria.

*(Contrast: models with **exogenous** coverage often tie eradication conditions to efficacy times coverage; here **choices** adjust.)*

---

### 8. Uniqueness without a vaccine; **multiple** equilibria with a vaccine

**Without a vaccine:** The fixed-point equation for $P$ reduces to a form where the RHS is **strictly decreasing** in $P$ → **at most one** positive endemic $P$.

**With voluntary vaccination:** The function $g(P)$ (RHS of **(22)**) need **not** be monotone in $P$ because **the pool of risky unvaccinated vs vaccinated** shifts with $P$ in a **nonlinear** way.

**Example 4** (uniform types on a rectangle of $(c_v,c_s)$, specific $w,\delta,\beta,\beta_v$): $R_0 = 6$. There are **three** endemic equilibria:

| Equilibrium | Story (roughly) | Prevalence $P$ |
|-------------|-----------------|----------------|
| **Low vaccine use** | Nobody protects or vaccinates; “worst” behavior | **0.833** (same as unique equilibrium **without** vaccine in that example) |
| **Medium vaccine use** | ~**42.3%** of unvaccinated susceptibles vaccinate each period; still no protection | **0.769** |
| **High vaccine use** | All unvaccinated susceptibles vaccinate; still risky post-vaccine | **0.667** |

So **the same** biology can support **very different** social outcomes depending on **beliefs / coordination** on which equilibrium.

**Mechanism:** Benefit of vaccination $B(P)$ can be **non-monotone** in $P$ when the vaccine is **imperfect** and a condition like $\delta^2 < (1-\delta)^2 \beta \beta_v$ holds: $B(P)$ rises then falls. At **high** $P$, vaccination may look **not worth it** (everyone expects disaster); high risky behavior sustains high $P$. At **lower** $P$, vaccination is attractive and sustains lower $P$. **Self-fulfilling expectations.**

**Proposition 6:** If efficacy is **high enough** that $(1-\delta)^2 \beta \beta_v / \delta^2 \leq 1$, then $B(P)$ is **strictly increasing** in $P$ on $[0,1)$, and the **endemic equilibrium is unique**—multiplicity requires **sufficiently leaky** vaccines (in a precise sense).

---

### 9. When can introducing a vaccine **raise** prevalence?

**Example 7:** Parameters such that **without** vaccine, unique endemic $P_n \approx 0.167$ and **two-thirds** of susceptibles **self-protect**. **With** voluntary vaccine, unique endemic $P \approx 0.175 > P_n$.

**Figure 2 logic:** Compare who is risky **with vs without** vaccine at the **old** prevalence $P_n$. **Region I:** risky either way. **Region II:** risky without vaccine; **with** vaccine they **vaccinate** and stay risky (lower $\beta_v$ but not zero). **Region III:** would **protect** without vaccine; with vaccine some **switch** to **vaccinate + risky**. If **enough mass** moves from **full protection** to **partial protection via imperfect vaccine**, **aggregate** infections can rise.

**Condition (27)** in the paper formalizes when $g(P_n) > 1$ so a **higher** equilibrium $P_v > P_n$ exists—i.e. vaccine introduction can push the system to a **worse** endemic point.

**Policy reading:** The risky subgroup that **matters** is roughly those with **moderate self-protection cost** (willing to change behavior when vaccine appears) and **not-too-high** vaccination cost—**targeted prevention** alongside rollout.

---

### 10. Policy sections (Section 4)

#### 10.1 Cheaper safe behavior (shift $F$)

If programs **lower $c_s$** in a **first-order stochastic dominance** sense (more mass at low $c_s$ for each $c_v$), then **when the endemic equilibrium is unique**, equilibrium prevalence **cannot rise** (**Proposition 8**).

**Caveat:** If **multiple** equilibria exist both before and after, **which** equilibrium is selected can flip; **Figure 3** illustrates that **improving** the cost distribution can **increase** $P$ if the economy jumps to a **worse** equilibrium. So **coordination / expectations** matter under multiplicity.

#### 10.2 Subsidizing vaccination (lower $c_v$)

Analogous shift: more mass at **low** $c_v$. **Example 9:** prevalence can rise from **0.169** to **0.175** when moving from $f_1$ to $f_3$—subsidy-like change **hurts** in that calibration.

**Intuition:** Subsidies pull in people who might have **self-protected**; they substitute toward **vaccine + risk** instead of **condoms** (here, perfect protection). If the vaccine is **imperfect**, net infections can rise.

#### 10.3 Mandatory vaccination (coverage $\mu$)

Fraction $\mu$ of **new** susceptibles are **forced** vaccinated each period; unvaccinated solve a **simpler** Bellman (no $c_v$ choice).

**Proposition 11:** Unique endemic exists iff

$$
\frac{(1-\delta)\bigl(\mu \beta_v + (1-\mu)\beta\bigr)}{\delta} > 1.
$$

Here **efficacy and coverage enter $R_0$**—unlike the **pure voluntary** case. **High enough** $\mu$ and **good enough** $\beta_v$ can push $R_0 \leq 1$ and **eliminate** endemic equilibria. **Preferences over risk** do not enter this eradication condition—policy **forces** the biological upper bound down.

**Contrast Proposition 3:** Voluntary case: **existence** of endemicity independent of $\beta_v$; mandatory case: **eradication** hinges on **weighted** effective transmission.

---

### 11. How this connects to coursework (micro / ODE models)

- **Micro:** Utility maximization, **option value**, **dynamic programming**, comparative statics in **parameters** $(c_v,c_s,\beta)$ and **equilibrium objects** $P$.
- **Epidemiology:** SI dynamics, **$R_0$**, endemic steady states—but **behavior** is **endogenous**.
- **Nonlinear dynamics / bifurcations flavor:** **Multiple steady states** without exotic physics—just **fixed points** of a **non-monotone** map $g(P)$.

If you have seen **SIR** ODE models in a math-bio class, think of this as replacing **constant** contact rates with **chosen** protection and vaccine take-up that **feed back** into **force of infection**.

---

### 12. Limitations (author’s and obvious extensions)

- **One partner per period**, **proportional mixing**—no explicit network structure.
- **Self-protection is all-or-nothing perfect**—no partial condom effectiveness.
- **SI** only—no treated infection, no recovery.
- **Stationarity** of $F$ via stylized replacement.

The **conclusion** flags richer **partner choice** and **multiple prevention margins** as future work.

---

### 13. Section map (where to read in the PDF)

| Sec. | Content |
|------|---------|
| **1** | HIV / imperfect vaccine / limits of exogenous-behavior models |
| **2** | Primitives, Bellman, steady-state definitions, notation $\sigma,\rho,r,S,I,V$ |
| **3.1** | **Proposition 3**, $R_0 = (1-\delta)\beta/\delta$ |
| **3.2** | Multiplicity, **Example 4**, **Proposition 6**, Lemma 5 |
| **3.3** | **Example 7**, Fig. 2, condition (27) |
| **4** | **Proposition 8**, subsidies **Example 9**, **mandatory** model, **Proposition 11** |
| **5** | Summary |
| **Appendix** | Algebra for examples |

---

### 14. References and copyright

- Chen, F. H. (2006). A susceptible-infected epidemic model with voluntary vaccinations. *Journal of Mathematical Biology*, *53*(2), 253–272. https://doi.org/10.1007/s00285-006-0006-1

**Copyright:** The journal article is © Springer-Verlag 2006. This HTML page is **original commentary**; it does not reproduce the paper’s text, proofs, or figures.

**Open access note:** Check your library or [SpringerLink](https://link.springer.com/article/10.1007/s00285-006-0006-1) for authorized PDF access; rights vary by institution.

---

<p class="text-muted small">Related on this site: <a href="{{ '/notes/personal-notes/machine-learning-concepts/' | relative_url }}">Machine learning concepts</a> (different toolkit—here the math is DP + equilibrium); <a href="{{ '/notes/personal-notes/paper-ai-aggregation-knowledge/' | relative_url }}">AI aggregation paper notes</a> (information / beliefs on networks).</p>
