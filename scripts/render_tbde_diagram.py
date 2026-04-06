#!/usr/bin/env python3
"""Render TBDE (Threshold-Based Dynamic Ensemble) logic as PNG/JPEG. Requires matplotlib."""

from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

# Output next to site assets
ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "images"
OUT_PNG = OUT_DIR / "tbde-logic.png"
OUT_JPG = OUT_DIR / "tbde-logic.jpg"


def box(ax, xy, w, h, text, fontsize=10, face="#f0f4f8", edge="#2c5282"):
    x, y = xy
    p = FancyBboxPatch(
        (x, y),
        w,
        h,
        boxstyle="round,pad=0.02,rounding_size=0.08",
        facecolor=face,
        edgecolor=edge,
        linewidth=1.6,
    )
    ax.add_patch(p)
    ax.text(
        x + w / 2,
        y + h / 2,
        text,
        ha="center",
        va="center",
        fontsize=fontsize,
        wrap=True,
        color="#1a202c",
    )


def arrow(ax, start, end, color="#4a5568"):
    a = FancyArrowPatch(
        start,
        end,
        arrowstyle="-|>",
        mutation_scale=14,
        linewidth=1.4,
        color=color,
        zorder=2,
    )
    ax.add_patch(a)


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    fig, ax = plt.subplots(figsize=(11, 13), dpi=160)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 14)
    ax.axis("off")
    fig.patch.set_facecolor("white")
    ax.set_facecolor("white")

    ax.text(
        5,
        13.35,
        "Threshold-Based Dynamic Ensemble (TBDE)",
        ha="center",
        va="center",
        fontsize=16,
        fontweight="600",
        color="#1a365d",
    )
    ax.text(
        5,
        12.85,
        "Inner CV → coalition selection → ensemble prediction",
        ha="center",
        va="center",
        fontsize=11,
        color="#4a5568",
    )

    # Row 1: training
    box(ax, (2.2, 11.35), 5.6, 0.85, "Training data")
    arrow(ax, (5, 11.35), (5, 10.95))

    # Row 2: inner CV
    box(
        ax,
        (1.4, 9.55),
        7.2,
        1.35,
        "Inner cross-validation\nEach candidate model scored → CV RMSE",
        fontsize=10,
        face="#e6fffa",
        edge="#0d9488",
    )
    arrow(ax, (5, 9.55), (5, 9.15))

    # Diamond-ish: selection modes (two boxes side by side)
    ax.text(5, 8.85, "Coalition selection", ha="center", fontsize=10, fontweight="600", color="#2d3748")
    box(ax, (0.55, 7.35), 3.9, 1.25, 'Mode: top_k\nTake K models with\nlowest CV RMSE', 9)
    box(ax, (5.55, 7.35), 3.9, 1.25, 'Mode: threshold\nKeep models with\nCV RMSE < τ', 9)
    ax.text(
        5.0,
        7.05,
        "If none pass threshold → fall back to top 3",
        ha="center",
        fontsize=8.5,
        style="italic",
        color="#718096",
    )

    # Arrows from CV to both modes
    arrow(ax, (3.2, 9.55), (2.5, 8.6))
    arrow(ax, (6.8, 9.55), (7.5, 8.6))

    # Merge to coalition
    arrow(ax, (2.5, 7.35), (4.2, 6.45))
    arrow(ax, (7.5, 7.35), (5.8, 6.45))

    box(ax, (2.8, 5.55), 4.4, 0.95, "Coalition\n(list of models)", fontsize=10, face="#fef3c7", edge="#d97706")
    arrow(ax, (5, 5.55), (5, 5.15))

    # Prediction path
    box(
        ax,
        (1.2, 3.55),
        7.6,
        1.45,
        "New rows (same features): each coalition member predicts\n→ unweighted mean of predictions (weights optional)",
        fontsize=9.5,
        face="#ede9fe",
        edge="#6d28d9",
    )
    arrow(ax, (5, 3.55), (5, 3.15))

    box(ax, (2.8, 2.15), 4.4, 0.85, "Ensemble output  ŷ", fontsize=11, face="#dcfce7", edge="#15803d")

    # Legend footnote
    ax.text(
        5,
        0.55,
        "TBDE = audition many models via CV, form a voting coalition, then average their predictions.",
        ha="center",
        fontsize=8.5,
        color="#718096",
    )

    plt.tight_layout()
    fig.savefig(OUT_PNG, bbox_inches="tight", facecolor="white", edgecolor="none")
    fig.savefig(OUT_JPG, bbox_inches="tight", facecolor="white", edgecolor="none", dpi=160)
    plt.close()
    print(f"Wrote {OUT_PNG}")
    print(f"Wrote {OUT_JPG}")


if __name__ == "__main__":
    main()
