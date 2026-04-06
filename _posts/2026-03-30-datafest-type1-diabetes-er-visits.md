---
layout: post
title: "DataFest — patient journeys and ER visits (Type 1 diabetes)"
subtitle: "Team Bit Dance · March 2026 — we didn’t place, but here’s what we found"
tags: [research]
---

Over the **last weekend of March 2026**, I competed in **DataFest** on a team called **Bit Dance** with **Tommy Shen** and **Jack Zhong**. We did not take home a prize, but the weekend was a good sprint from messy encounter-level data to a clear story and a defensible model.

## Question

We studied **patient-level drivers of emergency room (ER) use** for people with **Type 1 diabetes**, treating ER visits as an observable signal of how people move through the health system. Data included encounter records (`encounter_type1_diabetes.csv`) and **census** context (`census_data.csv`).

## Main idea: care fragmentation

We built a **fragmentation score** for each patient:

**Fragmentation** = (number of **distinct visit types**) ÷ (**total visit count**), scaled to fall in **(0, 1]**.

Intuitively, it measures how **spread out** someone’s care is across different kinds of visits rather than repeating the same pattern. **Higher fragmentation was associated with more ER use** in the aggregate—a relationship that held across patients in our exploratory work.

We were careful about limitations: fragmentation captures **diversity** of visit types, not raw intensity, and patients who only repeat ER visits can look “low fragmentation” but still be high risk.

## Modeling

ER visit counts called for a **quasi-Poisson** specification (variance ≈ 5.55 vs. mean ≈ 0.748). We used **log(total visits) as an offset** so comparisons adjusted for overall utilization. Key predictors included **fragmentation score**, **visit type**, **marital status**, and **settlement / urban–rural type**.

Directionally, the model echoed the descriptive story: **higher fragmentation** lined up with **more ER visits**; **single** marital status groups showed **higher** ER counts; **rural** areas showed **lower** ER rates than urban-core types in this specification; one **lab** visit-type contrast moved in the negative direction relative to the reference. (Exact magnitudes belong in a methods appendix—we treated the weekend as hypothesis generation, not a final causal claim.)

## What we’d tell a health system

Slides suggested **targeting outreach** toward patients who are **single** and have **high fragmentation**, and pairing that with operational ideas: a **dedicated care advisor**, **routine check-in calls**, and **group education or support** to reduce disjoint care and surprise ER use.

---

I’m not posting our competition deck on this site. If you’re a recruiter or collaborator and want the slide pack, **email me** and I can share it directly.

*Team: Bit Dance · tag: research*
