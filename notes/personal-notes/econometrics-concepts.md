---
layout: personal-note
title: "Econometrics concepts (primer)"
subtitle: Common vocabulary for causal and statistical work—with concrete examples
permalink: /notes/personal-notes/econometrics-concepts/
mathjax: true
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="mb-4 p-3 border rounded" style="border-color:#dde4ec;background:#f8fafc;font-size:0.95rem;">This is a **compact map** of ideas that show up repeatedly in applied econometrics and policy evaluation—not a substitute for a textbook or course. Examples are **illustrative**; real studies need design- and field-specific detail. Read this **before** the <a href="{{ '/notes/personal-notes/#paper-walk-throughs-economics' | relative_url }}">paper walk-throughs</a> if the vocabulary is new.</p>

---

### What “econometrics” is doing here

- **Estimation:** pick a rule (an **estimator**) that turns data into numbers—e.g. a slope $\hat{\beta}$, a difference of means, a predicted probability.
- **Inference:** quantify **uncertainty** (standard errors, confidence intervals, tests)—because another sample would have given slightly different answers.
- **Interpretation:** say what a number **means** for behavior or policy. That often requires extra **causal** arguments, not just a fitted line.

**Example:** regressing district test scores on per-pupil spending estimates an **association**. Claiming “money causes scores to rise” needs a story about **what varies** spending and what else moves with it.

---

### Population, sample, and the role of randomness

- **Population / data-generating process (DGP):** the world mechanism you wish you fully knew (often you only specify part of it).
- **Sample:** the rows you actually observe; **sampling variance** means estimates **wiggle** if you redraw the sample.
- **Identifying assumption:** what you need to believe so that a statistical object (e.g. a regression coefficient) equals a **causal** object (e.g. the effect of changing a policy).

**Example:** a **census** of firms in one year removes sampling uncertainty about *that year*, but **selection** into which firms exist and **confounding** can still bias causal claims.

---

### Linear regression as a workhorse

- **Ordinary least squares (OLS):** chooses coefficients to minimize the sum of squared residuals in a linear model $y = X\beta + u$.
- **Conditional expectation interpretation:** under ideal conditions, coefficients describe how \(y\) changes on average when one regressor moves, **holding others fixed**—but “holding fixed” is only as good as the **controls** you have and the **functional form** you use.

**Example:** wage on years of schooling plus parental education—the schooling coefficient is a “partial” association **after** controlling for parents; it is **not** automatically the causal return to an extra year unless assumptions hold.

---

### Omitted variable bias (OVB)

If a determinant of $y$ is **correlated** with an included regressor **and** affects $y$, leaving it out generally **biases** the coefficient on the included regressor.

**Example:** estimating health on insurance without health **risk**—sicker people may buy more insurance, so the insurance coefficient mixes **treatment** and **selection**.

---

### Endogeneity (big umbrella)

**Endogenous** variable: its variation is tied to **unobserved** shocks or choices in a way that breaks the “exogenous variation” story. Common sources:

- **Omitted confounders** (above).
- **Reverse causality** ($y$ causes $x$ as well as $x$ causing $y$).
- **Measurement error** in $x$ (often **attenuates** coefficients toward zero).
- **Simultaneity** (supply and demand jointly determine price and quantity).

**Example:** price and quantity in a market—OLS of quantity on price confounds **demand** and **supply** shifts; need **instruments**, **experiments**, or **structural** restrictions.

---

### Confounding vs selection

- **Confounding:** a third variable drives **both** treatment and outcome (classic “common cause”).
- **Selection into treatment:** treated units **differ** on observables or unobservables; **selection on observables** vs **unobservables** is a standard divide.

**Example:** job-training participants may be **more motivated**; motivation confounds simple before–after or treated–control comparisons.

---

### Potential outcomes & treatment effects

- **Potential outcomes** $Y(1), Y(0)$: what **your** outcome would be under treatment vs control (Rubin causal model). Only one is observed.
- **Individual treatment effect:** $Y(1)-Y(0)$ (not observable).
- **Average treatment effect (ATE):** $\mathbb{E}[Y(1)-Y(0)]$ over a population.
- **Average treatment effect on the treated (ATT):** among those who **actually** take treatment.

**Example:** a drug’s **ATE** across everyone can differ from the **ATT** among patients who chose it—**compliance** and **external validity** matter.

---

### Randomized controlled trial (RCT)

Gold standard when feasible: **random assignment** breaks the link between treatment and **pre-treatment** confounders (in expectation), so simple contrasts identify causal effects **under successful randomization and compliance**.

**Example:** randomly offer vouchers for tutoring; compare winners vs losers—still watch **attrition**, **spillovers**, and **Hawthorne** effects.

---

### Difference-in-differences (DID)

Compares **changes over time** between a **treated** group and a **control** group: roughly, the **double difference** of group means (displayed below so subscripts parse reliably):

$$
(\bar{y}_{\text{treat,after}} - \bar{y}_{\text{treat,before}}) - (\bar{y}_{\text{control,after}} - \bar{y}_{\text{control,before}})
$$

- **Parallel trends:** absent treatment, treated and control would have evolved **similarly**—this is **untestable** for the post period; people use **pre-trend** plots and **placebos** as checks, not proofs.

**Example:** a state raises minimum wage in 2015; neighboring states do not—DID uses pre-2015 trends to argue the **incremental** 2015+ gap is policy-driven.

---

### Event study / dynamic DID

Interacting treatment with **time indicators** (leads and lags) shows **dynamic** effects and is used to assess **pre-trends** (coefficients before policy should be near zero if parallel trends hold in that specification).

**Example:** safety regulation phased in—event study shows whether outcomes **already** diverged before the rule (bad sign for DID).

---

### Triple difference (DDD)

Adds a **second comparison dimension** (e.g. another untreated industry in the treated state) to relax DID when a single “control group” might still be affected.

**Example:** state tax change hits one industry more than another—compare **within-state** industry gaps **before vs after**, relative to **another state’s** same industry gap.

---

### Regression discontinuity (RD)

There is a **cutoff** $c$ in a **running variable** $Z$ (e.g. test score) that sharply changes probability or level of treatment. Compare units **just above** vs **just below** $c$.

- **Sharp RD:** treatment is deterministic from the rule ($Z \geq c$).
- **Fuzzy RD:** probability jumps at $c$ but not to 0/1—identifies a **local** effect for **compliers** at the margin.

**Example:** scholarship for scores $\geq 90$—compare students at 89 vs 90; **McCrary test** checks for **bunching** (manipulation of $Z$).

---

### Instrumental variables (IV) & two-stage least squares (2SLS)

An **instrument** $Z$ must (i) **relevance:** correlated with endogenous $x$; (ii) **exclusion:** affects $y$ **only** through $x$ (conditional on controls).

**2SLS intuition:** first regress $x$ on $Z$ (and controls) to get $\hat{x}$; then regress $y$ on $\hat{x}$—uses only the part of $x$ **moved by** $Z$.

**Example:** distance to college as instrument for schooling (Card-style designs)—debate centers on whether distance satisfies **exclusion** everywhere.

---

### Weak instruments

If $Z$ barely moves $x$, IV estimates blow up in variance and can be **severely biased** toward OLS even in large samples. Report **first-stage** $F$-statistics (rules of thumb exist; modern practice favors **weak-IV robust** inference).

**Example:** a weak political instrument for growth—t ratios look exciting but the **first stage** is noise.

---

### Local average treatment effect (LATE)

With a **binary** instrument, IV identifies the effect for **compliers**—units whose treatment status **follows** the instrument—not for the whole population (**defiers** assumed absent in the usual setup).

**Example:** randomized **offer** of a job program (not everyone enrolls)—IV effect is for those **induced** by the offer.

---

### Matching & propensity scores

**Matching:** pair treated units to **similar** controls on observables $X$.

**Propensity score:** estimated probability of treatment $P(D=1\mid X)$; sometimes match or **weight** on it. Relies on **unconfoundedness** / **selection on observables**: conditional on $X$, treatment is **as if random**.

**Example:** compare smokers and non-smokers with **same** age, income, and exercise—still wrong if **unobserved** health drives both smoking and outcomes.

---

### Fixed effects (FE) in panel data

**Entity FE:** each unit has its own intercept—uses **within-unit** variation over time (wipes out **time-invariant** unobserved heterogeneity **for that unit**).

**Two-way FE (TWFE):** entity **and** time effects—common workhorse for panel policy evaluation.

**Example:** firm-year profits on CEO gender with **firm FE**—only uses years where the firm **changes** CEO (rare), so power and interpretation need care.

---

### Random effects (RE) vs FE

**RE** treats unobserved heterogeneity as **uncorrelated** with regressors (strong). **FE** allows arbitrary correlation (weaker, uses within variation). **Hausman-type** tests compare FE vs RE when both are estimable under RE assumptions.

---

### Dynamic panels & Nickell bias

Including a **lagged dependent variable** with **short** $T$ and **FE** creates bias (Nickell). **GMM** approaches (e.g. Arellano–Bond) use **lagged levels/differences** as instruments for differenced equations—assumptions and instrument proliferation matter.

**Example:** $y_{it} = \rho y_{i,t-1} + \beta x_{it} + \alpha_i + u_{it}$—naive FE with small $T$ mis-estimates $\rho$.

---

### Clustered standard errors

When errors are **correlated within groups** (states, firms, classrooms), default i.i.d. SEs are **too small**. **Cluster-robust** SEs allow arbitrary correlation **within** cluster.

**Example:** 50 states, 1000 counties—clustering at **state** if shocks are state-wide; finer clustering if justified.

---

### Heteroskedasticity-robust SEs (Eicker–Huber–White)

OLS can stay **unbiased** with non-constant variance, but default SEs can be wrong. **Robust** SEs fix many **heteroskedasticity** problems (not **clustering** unless specified as such).

**Example:** income regression—variance of spending likely rises with income; robust SEs are standard reporting.

---

### HAC (Newey–West) standard errors

For **time series** with **autocorrelation** and/or heteroskedasticity, **HAC** SEs adjust for **serial dependence** in residuals (bandwidth choice matters).

**Example:** monthly macro regression—residuals often **persist**; Newey–West is common.

---

### Quantile regression

Models **conditional quantiles** of $y$ (e.g. median, 90th percentile) rather than the **mean**. Captures **heterogeneous** effects across the outcome distribution.

**Example:** a training program might help **low-wage** workers more than high-wage—mean shift misses that.

---

### Limited dependent variables

- **Logit / probit:** binary $y$; coefficients are in **latent index** units—report **marginal effects** (at means or average marginal effects) for intuition.
- **Tobit:** **censoring** (e.g. zero hours observed for anyone below a threshold of “not working” in some setups).
- **Poisson / negative binomial:** **count** outcomes (trips, patents); overdispersion pushes toward **negative binomial** or robust SEs.

**Example:** number of doctor visits—Poisson with **exposure** offset if observation windows differ.

---

### Sample selection & Heckman

**Selection model:** you observe $y$ only for a **selected** subsample (e.g. wages for **employed**). A **selection equation** (probit for employment) and **outcome equation** are **jointly** estimated; relies on **exclusion restrictions** (variables that affect selection but not **directly** wages).

**Example:** estimating returns to education on **working** men—omit unemployed whose wage offers are low.

---

### Duration / survival analysis

**Hazard models** (Cox, parametric survival) study **time until an event** (job finding, firm death) with **censoring**.

**Example:** unemployment spell length—right-censored if still unemployed when data end.

---

### Simultaneous equations & structural form

**Reduced form:** regress outcomes on **exogenous** shifters (effects of instruments on outcomes directly).

**Structural form:** separate **behavioral** equations (supply, demand) with **cross-equation** restrictions—needed for **counterfactuals** (“what if tax changes?”) beyond local IV LATE.

**Example:** simultaneous supply and demand—price is **endogenous** in a single equation for quantity.

---

### GMM & overidentification

**GMM** generalizes method-of-moments with **many** moment conditions (e.g. multiple instruments). The **Hansen \(J\)** test checks **overidentifying** restrictions—failure suggests **invalid** instruments or misspecification (power caveats apply).

---

### Functional form, logs, and interactions

- **Logs:** $\log y$ on $\log x$ gives **elasticities**; $\log y$ on $x$ gives **semi-elasticity**.
- **Interactions:** $x_1 \times x_2$ — effect of $x_1$ **depends on** $x_2$ (**moderation**); centering variables can ease interpretation.
- **Polynomials / splines:** flexibly model **curvature**; risk **overfitting** without discipline.

**Example:** wage on education and **female** dummy with an **interaction**—returns to schooling **differ** by gender if interaction is nonzero.

---

### Moderation vs mediation

- **Moderation:** a variable **changes the effect** of $x$ on $y$ (interaction).
- **Mediation:** $x$ affects **mediator** $m$, which affects $y$—decomposing **direct** vs **indirect** paths needs **strong** assumptions (often sequential ignorability).

**Example:** education raises **network quality**, which raises wages—**mediation**; education’s effect **larger in cities**—**moderation**.

---

### Specification tests (a few classics)

- **Ramsey RESET:** are there **neglected nonlinearities**? (Not a substitute for theory.)
- **Breusch–Pagan / White:** heteroskedasticity **diagnostics** (often you just use **robust** SEs).
- **Durbin–Watson / BG test:** **serial correlation** in time series residuals.

**Example:** linear trend in logs looks fine, but RESET flags **quadratic** terms—decide with theory and out-of-sample sense.

---

### Robustness checks (what readers expect)

**Robustness** means: **reasonable** alternative choices give **similar** conclusions—not fishing until one spec “works.”

Typical bundles:

- Alternate **samples** (drop outliers, different windows).
- Alternate **controls** and **functional forms**.
- Alternate **standard error** clustering levels.
- **Placebo** outcomes or **fake** treatment dates (should be null).
- **Subsplits** (pre vs post crisis, urban vs rural).

**Example:** minimum wage employment—show results with **state-specific** trends, alternate **control states**, and **different** age groups as falsification.

---

### Placebo tests & falsification

- **Placebo outcome:** an outcome **should not** move if the mechanism is specific (e.g. teen employment for minimum wage, not adult employment).
- **Placebo timing:** pretend treatment happened **earlier**—effects should not predate policy.
- **Randomization inference:** assign **fake** treatment labels many times to build a null distribution (common in small-$n$ designs).

---

### Multiple testing and p-hacking risk

Many **hypotheses** inflate the chance of a “significant” fluke. **Bonferroni**, **FDR** control, **pre-analysis plans**, and **fewer** primary outcomes help. **Publication bias** means published $p$-values skew low.

**Example:** testing 20 subgroups—expect **one** false positive at 5% if nulls are true everywhere.

---

### External validity & transportability

Results from **one** population, time, or scale may not **transfer**. **Structural** or **heterogeneity** analysis can clarify **where** effects replicate.

**Example:** RCT in one city—scalability depends on **market thickness**, norms, and general equilibrium.

---

### Intent-to-treat (ITT) vs treatment-on-the-treated (TOT)

- **ITT:** effect of **assignment** (handles **noncompliance**, policy-relevant for “offer the program”).
- **TOT / compiler effects:** scale ITT by **first stage** or use IV—**local** not always **global**.

---

### Standardization & units

Report **meaningful units** (dollars, years, SDs). **Standardized coefficients** compare **relative** importance **only** when scaling is comparable—**not** a substitute for causal interpretation.

---

### Quick “method picker” (heuristic only)

| You mainly have… | Often consider… |
|------------------|-----------------|
| Clean randomization | Simple differences, ITT; IV if compliance issues |
| Policy at a cutoff | RD |
| Policy staggered across units / time | DID, event study, recent TWFE literature on **negative weights** |
| A shifter unrelated to confounders | IV / 2SLS |
| Rich covariates, no clear experiment | Matching / IPW / doubly robust (still need **selection on observables**) |
| Panel with stable unobservables | FE / TWFE |
| Outcome is binary / count / censored | Logit–probit / Poisson–Tobit / selection models |

Modern **staggered DID** and **heterogeneous treatment effects** are active research areas—default TWFE packages can misbehave; check current best practices for your setting.

---

### Where to go next

- Textbooks such as **Wooldridge**, **Angrist & Pischke**, or **Hansen** (graduate) formalize assumptions and estimators.
- On this site, the **[paper walk-throughs]({{ '/notes/personal-notes/#paper-walk-throughs-economics' | relative_url }})** apply narrative reasoning to specific articles.

If you want a **deeper** standalone note on one tool (e.g. staggered DID or RD bandwidth), say which and it can be split out later.

