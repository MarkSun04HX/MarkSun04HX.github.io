---
layout: personal-note
title: "Repo notes: The Fuck (nvbn/thefuck)"
subtitle: Rule engine that fixes your last shell command
permalink: /notes/personal-notes/repo-thefuck/
mathjax: false
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="text-muted small"><strong>Disclaimer:</strong> Informal notes. Upstream: <a href="https://github.com/nvbn/thefuck">nvbn/thefuck</a> (MIT). The tool runs corrected commands in your shell—understand what it proposes before accepting.</p>

**Repository:** [https://github.com/nvbn/thefuck](https://github.com/nvbn/thefuck)

---

### What it does

**The Fuck** watches your **previous terminal command** (and its stderr/stdout context), **matches** it against a library of **rules**, and suggests (or runs) a **corrected command**. Examples from the README: prepend `sudo` when `apt-get` complains about permissions, fix `git push` when upstream is missing, typo-correct `puthon` → `python`, map `git brnch` → `git branch`, etc.

User experience: install Python package, add **`eval $(thefuck --alias)`** (or similar) to shell rc, then type the alias (often `fuck`) after a failed command.

---

### How the code is structured

Classic **Python package** layout:

| Piece | Role |
|-------|------|
| `thefuck/` | Core package: rule matching, command rewriting, shell integration |
| `tests/` | Pytest coverage for rules and edge cases |
| `setup.py` / `setup.cfg` | Packaging and metadata |
| `scripts/` | Maintenance or release helpers |
| `.github/` | CI workflows |

**Conceptual model:** each **rule** is a small plugin: given the failed command and environment, return **whether it applies** and **what to run instead**. The README lists **dozens** of built-in rules (`cd_correction`, `git_push`, `sudo`, …). That pattern is **scalable** because contributors add **isolated** rules without rewriting the core loop.

---

### What they achieved

- **Huge adoption** for a developer QoL tool—proof that **composable rules + shell alias** beats a monolithic “smart shell.”
- **Educational value:** reading rules is a compact course in **what usually goes wrong** in CLI workflows across OSes and package managers.
- **Safety valve:** optional confirmation before running fixes; “instant mode” trades safety for speed.

---

### How I would read the source

1. Find the **main entry** that loads rules and iterates (often a `main` or `get_corrected_command` style API).
2. Read **one simple rule** file end-to-end, then a **harder** one (git, docker).
3. Skim **tests** beside rules—they document expected stderr patterns.

---

### Caveats

- **Shell-specific behavior:** Bash/Zsh/Fish/Powershell paths differ; always check your shell’s integration section in README.
- **Blind automation risk:** Disabling confirmation is convenient but dangerous with destructive commands.

<p class="text-muted small">Contrast with LLM-based “fix my command” tools: The Fuck is <strong>deterministic rules</strong>—fast, offline, and auditable, but narrower coverage.</p>
