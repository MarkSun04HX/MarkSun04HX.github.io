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

### NBA player salary prediction

**Statistics learning · R · Feb 2026 – present**

Predictive model for 2022–2023 NBA player salaries from on-court performance metrics (~12% error). Exploratory analysis, log transforms for variance, **k-fold cross-validation** with **KNN**; extending the pipeline with penalized regression.

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
