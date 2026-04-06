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

### Production lead-time simulation (internship)

**Dell Technologies · Global Production Planning · Summer 2025**

End-to-end **order-to-delivery** lead-time simulation using **XGBoost** to forecast customer order timelines. Improved simulation accuracy from **109%** (manual / distribution-based) to **104%** by separating supplier- vs. customer-driven factors and grouping products by **CFS** levels.

---

### TV advertising data pipelines (research)

**Wake Forest Economics · RA for Professor Koleman Strumpf · 2025–2026**

Automated **Python** pipelines to process and filter **multi-terabyte** TV advertising datasets; extraction and consolidation in **Jupyter/Colab** for analysis of advertising markets.

**Figures:** sample plots (heatmaps, choropleth, stacked areas) are on the [home page]({{ '/' | relative_url }}#ra-visuals) with PDF downloads.

---

### More

Long-form background and CV-style detail are on **[About me]({{ '/aboutme' | relative_url }})**. New write-ups will appear on the **[home page]({{ '/' | relative_url }})** as posts.
