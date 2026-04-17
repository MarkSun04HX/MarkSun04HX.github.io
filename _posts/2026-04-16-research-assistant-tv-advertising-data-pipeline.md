---
layout: post
title: "Research assistant — TV advertising data pipeline"
subtitle: "Large-scale panels, Python jobs, and content-facing analysis at Wake Forest Economics"
tags: [research]
share-description: "Notes on my RA work with Professor Koleman Strumpf — TV advertising data pipelines, Python, and exploratory outputs — with a link to my overview PDF."
---

From **September 2025** through **May 2026** I work as a **research assistant** in the **Wake Forest Department of Economics**, supporting empirical projects with **Professor Koleman Strumpf**. The research uses **large-scale TV advertising and programming data**: national panels that are **multi-terabyte** in raw form, with strict needs around **extraction, filtering, and reproducibility** before anything reaches estimation code.

## What the job actually is

Day to day, the work sits between **engineering** and **econometrics**:

- **Python** pipelines to ingest, clean, and subset broadcast and cable advertising records at a scale where naive scripts fail (memory, I/O, and bookkeeping).
- **Jupyter** and **Google Colab** for interactive exploration, validation against codebooks, and hand-off of analysis-ready tables to the research team.
- Close coordination with the **substantive questions** of the paper—making sure aggregates and cuts (time, geography, outlet, content categories) match what the econometric design requires, not just what is easy to export.

The goal is not “pretty charts for their own sake”; it is **reliable measurement** of **who advertises when and where**, and how that lines up with other market and policy variables in the project.

## Overview deck (PDF)

I put together a one-page **Canva** overview titled [**Data Pipeline for Large-Scale TV Advertising and Content Analysis**]({{ '/assets/files/ra/data-pipeline-tv-advertising-content-analysis.pdf' | relative_url }}){:target="_blank" rel="noopener noreferrer"} — a concise visual summary of how the pipeline is organized and how it connects to **content-oriented** analysis. It is meant for recruiters and collaborators who want the **shape of the system** before diving into code or figures.

**Direct link:** [PDF — Data pipeline for large-scale TV advertising and content analysis]({{ '/assets/files/ra/data-pipeline-tv-advertising-content-analysis.pdf' | relative_url }}){:target="_blank" rel="noopener noreferrer"}

## Figures on this site

The **[Research visuals](/#ra-visuals)** section on my **home page** shows **exploratory plots** derived from the same broad panel work—**hour/weekday** concentration, **U.S. state** patterns, and **network-level** intensity over sample windows. Each figure links to a **vector PDF** for print or slides.

If you are interested in similar **RA or data-engineering** work in **media or IO**, feel free to reach out via **[Contact](/contact/)** or the email in the footer.
