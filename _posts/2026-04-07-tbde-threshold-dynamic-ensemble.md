---
layout: post
title: "Threshold-Based Dynamic Ensemble (TBDE)"
subtitle: "Inner CV, coalition selection, and ensemble prediction — work in progress"
tags: [research]
---

This note accompanies my open-source **[Threshold-Based Dynamic Ensemble (TBDE)](https://github.com/MarkSun04HX/Threshold-Based-Dynamic-Ensemble-Model)** implementation (Python primary, R port). The project is **still in progress**: the repository currently wires up the full **cross-validation → coalition → predict** loop with **stub** estimators so the architecture is easy to test and extend before swapping in heavier ML backends.

## Pipeline at a glance

![TBDE pipeline: training data, inner CV and RMSE, top_k or threshold coalition selection, then unweighted mean of coalition predictions]({{ '/assets/images/tbde-logic.png' | relative_url }})

*Figure: how TBDE auditions models, selects a coalition, and averages their predictions.*

**Inner cross-validation** scores each candidate model with **CV RMSE**. **Coalition selection** follows one of two modes: **`top_k`** (take the *K* best models) or **`threshold`** (keep models with CV RMSE below a cutoff τ). If **no** model passes the threshold, the implementation **falls back to the top three** so there is always a usable coalition. On **new data**, each member of the coalition predicts; the ensemble output is typically an **unweighted mean** (weights are optional in the API).

## Code and status

- **Repository:** [github.com/MarkSun04HX/Threshold-Based-Dynamic-Ensemble-Model](https://github.com/MarkSun04HX/Threshold-Based-Dynamic-Ensemble-Model) (MIT).
- **Regenerate the figure:** `python scripts/render_tbde_diagram.py` (requires [matplotlib](https://matplotlib.org/); see `scripts/render_tbde_diagram.py` in this site repo for the diagram source).

I will update the post or add follow-ups as the implementation and benchmarks mature.
