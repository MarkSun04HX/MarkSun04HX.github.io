---
layout: post
title: "Dell GPP internship — ML for order ESD simulation"
subtitle: "Global Production Planning, Xiamen · July–August 2025"
tags: [research]
---

This post summarizes my **end-of-internship presentation** for **Dell Technologies Global Production Planning (GPP)** in **Xiamen** (manager: **Helen Gong**), July–August 2025. It reflects how I interpreted the work for a business audience; the **PowerPoint deck is not hosted** on this site.

## Problem

**Estimated ship date (ESD)** simulation supports the factory **weekly ship plan**, **IDC/EOQ** outlook, and **backlog** management. In **FY25**, **APJ** average ship “attention” (actual vs. simulated) sat around **109%**, with only **14 of 52 weeks** inside the **98–105%** target band. The ask was to **improve planning accuracy** and move toward **stable, repeatable** simulation—ultimately targeting the target range on a high share of weeks (e.g. **~70%** of weeks in a year, per program framing).

## What we did

**Data & framing (FY26 Q1 and related runs)**  
We worked from recent **order-entry** history, separating **shippable** vs. **non-shippable** flows and drilling into **friction** orders (e.g. direct build, second touch, supply- vs. customer-related issues). Training used rolling **last-six-weeks** style windows where appropriate for the prototype.

**Two business-driven grouping solutions**

1. **Shippable orders:** run separate simulations for **CFS** vs. **non-CFS** buckets—reflecting different **production lead-time** behavior at the **CFS level** (the deck highlights materially different BL-level attention across CFS tiers).
2. **Friction orders:** group by **order status / reason**—**customer-related**, **supply-related**, and **other**—because lead-time distributions differ sharply by friction type.

**Modeling**  
We compared several learners (**Random Forest**, **KNN**, **XGBoost**, **CatBoost**, **linear / ridge / logistic**, **LightGBM**, **GBM**). **XGBoost** was central to the **production** path the team operationalized. A test run on **Q1-style** data was reported around **96.87%** attention in one milestone (before/after tuning and business rules evolved).

**Reported impact (presentation metrics)**  
From a **business + model** lens, the deck cites:

- **Average weekly accuracy** improving from about **109.44%** to **~101.61%**.
- **Weeks hitting the 98–105% target** moving from **7/13** to **9/13** in the compared window.
- **Tighter extremes:** “greatest weekly variance” **126.92% → 108.49%**; “least weekly variance” **101.68% → 100.29%** (illustrating less wild swing week to week).
- **~83%** improvement in **time efficiency** of running simulation once the ML-based pipeline and standardized logic were in place (internal efficiency metric from the deck).

Exact definitions follow Dell’s internal simulation conventions; the point is **directional**: **group structure + ML** beat **one-size-fits-all** distribution-based simulation for APJ-style planning.

## Roadmap we outlined

- **More specialized models** per segment.  
- **Visualization** of predictions for stakeholders.  
- **Near–real-time** or scheduled data feeds and **automated retraining** (time- or performance-triggered), with monitoring of **feature drift**.

## What I took away

**Professional:** a clearer picture of **Dell’s supply chain**, **GPP’s** role, and how **backlog** and **ship outlook** connect to factory execution. **Technical:** end-to-end **data prep**, **label encoding**, **model train/validate**, and delivering outputs in a **corporate** cadence. **Personal:** stronger **documentation**, **presentation**, and **cross-team** communication in a large org.

---

*Team context on the deck: intern pod with colleagues **Yi He**, **David Lin**, and **Weiqing Zhong**; multiple GPP stakeholders contributed interviews and business training.*
