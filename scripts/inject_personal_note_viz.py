#!/usr/bin/env python3
"""Insert {::nomarkdown} mermaid blocks before the first ### in each personal-note algorithm page."""
from __future__ import annotations

import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
PN = ROOT / "notes" / "personal-notes"

SKIP = {
    "index.md",
    "econometrics-concepts.md",
    "machine-learning-concepts.md",
    "paper-ai-aggregation-knowledge.md",
    "paper-chen-si-voluntary-vaccination.md",
}

# (filename, first_section_heading without ###) -> (mermaid_body, caption)
SPECS: dict[str, tuple[str, str]] = {
    "gradients-optimization-for-ml.md": (
        """flowchart LR
  L[Loss on data] --> G[Gradient = slope of L]
  G --> U[Update parameters]
  U --> L""",
        "Iterative optimization: move parameters opposite the gradient to reduce loss.",
    ),
    "bias-variance-tradeoff.md": (
        """flowchart TB
  E[Total error] --> B[Bias squared]
  E --> V[Variance]
  E --> N[Noise irreducible]
  S[More flexible model] -.->|often| B2[Lower bias]
  S -.->|often| V2[Higher variance]""",
        "Flexibility shifts the bias–variance split; noise stays.",
    ),
    "entropy-information-tree-splits.md": (
        """flowchart TB
  P[Parent node impurity] --> Q{Try splits}
  Q --> C[Child impurity left / right]
  C --> IG[Information gain or Gini drop]
  IG --> W[Pick best split]""",
        "Trees greedily reduce impurity (entropy / Gini / deviance) at each split.",
    ),
    "ensembles-bagging-boosting.md": (
        """flowchart LR
  subgraph bag[Bagging]
    B1[Bootstrap samples] --> B2[Fit many trees]
    B2 --> B3[Average or vote]
  end
  subgraph boo[Boosting]
    F1[Fit weak learner] --> F2[Upweight mistakes]
    F2 --> F3[Add next learner]
  end""",
        "Bagging averages noisy models; boosting sequences corrections on residuals.",
    ),
    "kernels-distances-feature-maps.md": (
        """flowchart LR
  X[Raw features] --> D[Distance or kernel K x x prime]
  D --> M[Implicit high dim space]
  M --> P[Prediction]""",
        "Kernels compare points via inner products without building huge feature lists explicitly.",
    ),
    "linear-logistic-regression.md": (
        """flowchart TB
  subgraph ols[Linear regression]
    A1[x] --> B1[Linear score xT beta]
    B1 --> Y1[y continuous]
  end
  subgraph log[Logistic regression]
    A2[x] --> B2[Linear score]
    B2 --> S[sigmoid]
    S --> P[Probability of class 1]
  end""",
        "Same linear score; logistic adds a link for binary probabilities.",
    ),
    "elastic-net.md": (
        """flowchart TB
  OLS[Least squares fit] --> PEN[Plus L1 and L2 penalties]
  PEN --> SHR[Shrinks coefficients]
  SHR --> SEL[Some coefficients to zero]""",
        "Elastic net blends ridge (L2) stability and lasso (L1) sparsity.",
    ),
    "knn.md": (
        """flowchart LR
  Q[New point x] --> K[Find K nearest train points]
  K --> R{Task}
  R -->|regression| A[Average neighbor y]
  R -->|classification| V[Majority vote]""",
        "Instance-based: no training phase beyond storing data and choosing K.",
    ),
    "tree-models.md": (
        """flowchart TB
  R[Root: all rows] --> S1[Split on feature j threshold]
  S1 --> L[Left child subset]
  S1 --> RT[Right child subset]
  L --> S2[Split again]
  RT --> S3[Split again]""",
        "Recursive axis-aligned partitions; leaves predict a constant or majority class.",
    ),
    "random-forest.md": (
        """flowchart TB
  D[Training data] --> B[Bootstrap bags]
  B --> T[Tree on random feature subset each split]
  T --> E[Many trees]
  E --> V[Vote or average]""",
        "Bagging + random feature subsampling decorrelates trees.",
    ),
    "svm.md": (
        """flowchart LR
  M[Maximize margin] --> H[Hyperplane wTx + b]
  H --> SV[Support vectors on edge]
  K[Kernel trick] --> H""",
        "Large-margin separator; kernels allow curved boundaries in original space.",
    ),
    "neural-networks.md": (
        """flowchart LR
  IN[Input layer] --> H1[Hidden layers + activations]
  H1 --> H2[...]
  H2 --> OUT[Output layer]
  OUT --> L[Loss backprop updates weights]""",
        "Composed linear maps and nonlinearities; trained by gradient-based optimization.",
    ),
    "cnns.md": (
        """flowchart LR
  IMG[Image grid] --> C[Conv filters local]
  C --> P[Pooling]
  P --> ST[Stack deeper]
  ST --> FC[Dense head]
  FC --> Y[Labels or scores]""",
        "Translation-tolerant local features built from convolutions and pooling.",
    ),
    "xgboost.md": (
        """flowchart TB
  F0[Start with constant prediction] --> M1[Fit tree to negative gradient]
  M1 --> ADD[Add scaled tree]
  ADD --> M2[Repeat]
  M2 --> REG[Shrinkage + depth limit + subsampling]""",
        "Gradient boosting: each tree nudges predictions toward lower loss.",
    ),
    "lightgbm.md": (
        """flowchart TB
  H[Histogram bin features] --> G[Gradient-based splits]
  G --> LW[Leaf-wise growth best delta loss]
  LW --> GOSS[Optional gradient subsampling]""",
        "Fast histogram splits and aggressive leaf-wise expansion for large tabular data.",
    ),
    "catboost.md": (
        """flowchart LR
  CAT[Ordered stats for categories] --> OB[Ordered boosting reduces bias]
  OB --> SYM[Symmetric trees optional]
  SYM --> PRED[Prediction]""",
        "Ordered target statistics and boosting reduce categorical leakage and overfitting.",
    ),
    "pca.md": (
        """flowchart LR
  X[Matrix of features] --> S[SVD or eigen decomposition]
  S --> PC[Principal directions]
  PC --> Z[Project to k dimensions]""",
        "Find orthogonal directions of maximal variance; project data for compression or viz.",
    ),
    "k-means.md": (
        """flowchart TB
  I[Init K centers] --> A[Assign points to nearest center]
  A --> U[Recompute centers as means]
  U --> C{Changed?}
  C -->|yes| A
  C -->|no| DONE[Clusters]""",
        "Alternate assignment and centroid updates until stable.",
    ),
    "hierarchical-clustering.md": (
        """flowchart TB
  P[Each point is cluster] --> M[Merge closest pair]
  M --> R[Update distances linkage]
  R --> Q{One cluster left?}
  Q -->|no| M
  Q -->|yes| D[Dendrogram]""",
        "Agglomerative: greedy merges according to single/complete/average/Ward linkage.",
    ),
    "math-intuition-for-ml.md": (
        """flowchart LR
  V[Vector x] --> D[Dot with beta]
  D --> S[Sum of weighted features]
  S --> Y[Scalar prediction y hat]""",
        "Linear models combine features with weights; length and angle geometry guide intuition.",
    ),
}


def block(mer: str, cap: str) -> str:
    return (
        "\n\n{::nomarkdown}\n"
        '<div class="pn-viz">\n'
        '<div class="mermaid">\n'
        f"{mer}\n"
        "</div>\n"
        "</div>\n"
        "{:/}\n"
        f'<p class="pn-viz-caption">{cap}</p>\n'
    )


def main() -> None:
    for name, (mer, cap) in SPECS.items():
        path = PN / name
        if not path.exists():
            print("missing", path)
            continue
        text = path.read_text(encoding="utf-8")
        if "class=\"mermaid\"" in text or "class='mermaid'" in text:
            print("skip existing", name)
            continue
        lines = text.splitlines(keepends=True)
        insert_at = None
        for i, line in enumerate(lines):
            if line.startswith("### ") and insert_at is None:
                insert_at = i
                break
        if insert_at is None:
            print("no ###", name)
            continue
        new_lines = lines[:insert_at] + [block(mer, cap)] + lines[insert_at:]
        path.write_text("".join(new_lines), encoding="utf-8")
        print("updated", name)


if __name__ == "__main__":
    main()
