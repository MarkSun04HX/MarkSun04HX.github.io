---
layout: personal-note
title: "Repo notes: OpenMAIC (THU-MAIC)"
subtitle: Multi-agent interactive classroom — what the codebase is doing
permalink: /notes/personal-notes/repo-openmaic/
mathjax: false
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="text-muted small"><strong>Disclaimer:</strong> This page is my <strong>own reading</strong> of a public repository, not an official description from Tsinghua / the maintainers. The project evolves; always read the <a href="https://github.com/THU-MAIC/OpenMAIC">upstream README</a> and license (AGPL-3.0) before reusing code.</p>

**Repository:** [https://github.com/THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC)

---

### What problem it tries to solve

**OpenMAIC** (“Open Multi-Agent Interactive Classroom”) turns a **topic or uploaded material** into an **interactive lesson**: not just static text, but slides, quizzes, simple HTML simulations, and project-style activities, with **multiple LLM-backed agents** playing roles like teacher and classmates. The selling point in their README is **one-click / low-friction setup** (pnpm, `.env`, Vercel) and an **immersive** feel (whiteboard, TTS, discussion).

---

### What they built (product shape)

From the documented layout and README:

- **Web app** centered on **Next.js** + **React** + **TypeScript**, with **Tailwind**-style UI (they badge LangGraph for orchestration).
- **Monorepo hints:** `packages/`, `pnpm-workspace.yaml`, shared `lib/`, UI `components/`, top-level `app/` (App Router style).
- **Ops:** `Dockerfile`, `docker-compose.yml`, `vercel.json`, Playwright (`e2e/`), Vitest for tests.
- **“Skills” path:** `skills/openmaic` and README copy about **OpenClaw** — install a skill and trigger lesson generation from **chat apps** (Feishu, Slack, Telegram, etc.) in hosted or self-hosted mode.

So the **achievement** is both: (1) a **self-contained classroom product**, and (2) **distribution** through a popular assistant ecosystem (OpenClaw) so users do not have to start from a blank repo.

---

### How the code is likely organized (high level)

Without line-by-line audit, a reasonable mental model:

| Area | Role |
|------|------|
| `app/` | Routes, server/client boundaries, lesson UI flows |
| `components/` | Reusable UI (slides viewer, chat, whiteboard surfaces, etc.) |
| `lib/` | Core logic: calls to providers, orchestration glue, utilities |
| `packages/` | Split internal libraries (shared types, agents, exporters) |
| `configs/` | YAML/JSON for models, providers, feature flags |
| `public/` / `assets/` | Static media |
| `tests/` + `e2e/` | Unit/integration and browser tests |

**Configuration story:** `.env.example` + optional `server-providers.yml` for **many LLM vendors** (OpenAI, Anthropic, Google, DeepSeek, MiniMax, Grok, OpenAI-compatible endpoints). That matches a **bring-your-own-key** product: the heavy lifting is orchestration and UX, not training models.

---

### What they “achieved” in practice (as an open project)

- **Democratized a niche:** research-y “multi-agent classroom” packaged as **installable software** with a public demo and deploy button.
- **Clear integration point:** OpenClaw skill + `clawhub install` path lowers the **activation energy** for non-developers who already live in chat tools.
- **Engineering hygiene signals:** AGPL-3.0, CONTRIBUTING, SECURITY, changelog, i18n README — oriented toward **real adoption** and community, not a one-off demo.

---

### How I would read the code if I were learning from it

1. **Start at `README.md` quick start** — reproduce `pnpm dev` locally with one provider key.
2. **Trace one user journey** — e.g. “create lesson from PDF” — from a button in `app/` into `lib/` and any **LangGraph** or agent graph definitions.
3. **Find provider abstraction** — how they normalize **chat completions**, **TTS**, and **image/video** calls (MiniMax blocks in README suggest multi-modal hooks).
4. **Skim `packages/` boundaries** — see what is intentionally isolated for reuse vs. what is UI-only.

---

### Limitations (honest)

- **Cost & compliance:** Multi-agent + TTS + tools can burn tokens; AGPL affects **how** you can ship derivatives.
- **Moving target:** Stars and features in README (e.g. model names) will **date quickly**; this note does not track every release.

<p class="text-muted small">Related: <a href="{{ '/notes/personal-notes/paper-ai-aggregation-knowledge/' | relative_url }}">AI aggregation paper notes</a> (theory of beliefs and tools — different layer than this product).</p>
