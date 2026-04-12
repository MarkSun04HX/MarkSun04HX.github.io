---
layout: page
title: Projects
subtitle: Research, coursework, and applied data science
---

### DataFest — ER visits & Type 1 diabetes (team Bit Dance)

**Wake Forest DataFest · March 2026 · Tommy Shen, Haoxuan (Mark) Sun, Jack Zhong**

Weekend competition project on **patient-level drivers of emergency room use** among Type 1 diabetes patients. We defined a **care fragmentation** score (distinct visit types over total visits), showed it lines up with **higher ER utilization**, and estimated a **quasi-Poisson** count model with a **log(total visits) offset** and controls for visit type, marital status, and urban/rural settlement. We did not place in the judging, but the analysis suggested targeting **single patients with high fragmentation** for care coordination (advisors, check-ins, group support).

**Write-up:** [blog post]({% post_url 2026-03-30-datafest-type1-diabetes-er-visits %}) · *Deck available on request (not hosted here).*

---

### ECN 372 — MEPS healthcare expenditure prediction competition

**Wake Forest · ECN372-B: Prediction and Machine Learning in Econometrics · Spring 2026 · group work**

Course **prediction competition** on **MEPS** household consolidated data (**2019–2023**): build models for **individual annual total healthcare expenditures** while obeying strict **variable exclusions** (utilization, charges, expenditure blocks, survey weights). Official scoring is **RMSLE** on a **log-type** scale with **non-negative** predictions. The repo documents an **R** pipeline—Stata PUFs → yearly Parquets → pooled harmonized table → exploratory **PCA** on a subsample, plus scripts for **ridge baselines**, **elastic net / tree / RF / XGBoost** selection runs and a governed **`CV_RMSE_RESULTS.md`**—with competition exclusion logic centralized in **`R/meps_competition_exclusions.R`**.

**Repository:** [MarkSun04HX/372-prediction-competition](https://github.com/MarkSun04HX/372-prediction-competition) · **Data:** [MEPS download files](https://meps.ahrq.gov/mepsweb/data_stats/download_data_files.jsp).

---

### NBA player salary prediction

**Statistics learning · R · Feb 2026 – present**

Predictive model for 2022–2023 NBA player salaries from on-court performance metrics (~12% error). Exploratory analysis, log transforms for variance, **k-fold cross-validation** with **KNN**; extending the pipeline with penalized regression.

---

### Threshold-Based Dynamic Ensemble (TBDE)

**Personal software · Python & R · 2026 — work in progress**

An **AutoML-style ensemble** pipeline that scores multiple named models with **inner cross-validation**, then builds a **coalition** either from the **top performers** or from models that beat an **RMSE threshold**; predictions are an **unweighted mean** (or weighted when specified). I am actively developing this—stub estimators ship today so the full CV → selection → predict loop is testable without heavy ML dependencies; real model backends and documentation will evolve in the repo.

![TBDE pipeline: inner CV, coalition selection, ensemble prediction]({{ '/assets/images/tbde-logic.png' | relative_url }})

**Write-up:** [research blog post]({% post_url 2026-04-05-tbde-threshold-dynamic-ensemble %}) · **Repository:** [MarkSun04HX/Threshold-Based-Dynamic-Ensemble-Model](https://github.com/MarkSun04HX/Threshold-Based-Dynamic-Ensemble-Model) (MIT).

---

### Dell GPP — order ESD simulation & ML (internship)

**Dell Technologies · Global Production Planning · Xiamen · July–August 2025**

Undergraduate intern project on **estimated ship date (ESD)** simulation for **APJ** factory planning. Built a **machine-learning** path (centered on **XGBoost**) on top of **standardized, governed** training data: **CFS vs. non-CFS** splits for **shippable** orders, and **customer- / supply- / other-friction** splits for problem orders—mirroring different **production lead-time** distributions.

End-of-summer deck metrics (internal targets **98–105%** “attention”): **~109.44% → ~101.61%** average weekly accuracy, **7/13 → 9/13** weeks in band, less extreme week-to-week variance, and **~83%** faster simulation runtime vs. prior manual logic. Compared many algorithms (RF, KNN, CatBoost, GBMs, linear models) before converging on the production-style **XGBoost** workflow.

**Write-up:** [internship reflection post]({% post_url 2025-08-20-dell-gpp-esd-simulation-internship %}) · *Original PowerPoint not published here.*

---

### TV advertising data pipelines (research)

**Wake Forest Economics · RA for Professor Koleman Strumpf · 2025–2026**

Automated **Python** pipelines to process and filter **multi-terabyte** TV advertising datasets; extraction and consolidation in **Jupyter/Colab** for analysis of advertising markets.

**Figures:** sample plots (heatmaps, choropleth, stacked areas) are on the [home page]({{ '/' | relative_url }}#ra-visuals) with PDF downloads.

---

### More

Long-form background and CV-style detail are on **[About me]({{ '/aboutme' | relative_url }})**. New write-ups will appear on the **[home page]({{ '/' | relative_url }})** as posts.
