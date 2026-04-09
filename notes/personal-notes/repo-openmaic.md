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

### Key upstream snippets

Anchors point at the default branch (`main`) as of this note; line numbers can drift—follow the file path if a link lands wrong.

**1. `package.json` — scripts and dependency footprint**  
[OpenMAIC `package.json` (L9–L45)](https://github.com/THU-MAIC/OpenMAIC/blob/main/package.json#L9-L45)

```json
{
  "scripts": {
    "postinstall": "cd packages/mathml2omml && npm run build && cd ../pptxgenjs && npm run build",
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "check": "prettier . --check",
    "format": "prettier . --write",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  },
  "dependencies": {
    "@ai-sdk/anthropic": "^3.0.23",
    "@ai-sdk/google": "^3.0.13",
    "@ai-sdk/openai": "^3.0.13",
    "@ai-sdk/react": "^3.0.44",
    "@copilotkit/backend": "^0.37.0",
    "@copilotkit/runtime": "^1.51.2",
    "@langchain/core": "^1.1.16",
    "@langchain/langgraph": "^1.1.1",
    "@modelcontextprotocol/sdk": "^1.27.1",
    "ai": "^6.0.42",
    "copilotkit": "^0.0.58",
    "mathml2omml": "workspace:*",
    "next": "16.1.2",
    "pptxgenjs": "workspace:*",
    "pptxtojson": "^1.11.0"
  }
}
```

**What this achieves:** In one place you see the **product stack**: Next.js for the app, **Vercel AI SDK** (`ai`, `@ai-sdk/*`) for provider-facing calls, **LangGraph** for orchestration, **CopilotKit** for agent/chat UX, **MCP** for tool protocol, and **workspace packages** for slide/MathML pipelines (`pptxgenjs`, `mathml2omml`)—i.e. not “a demo UI” but a **lesson factory** with export and test hooks (`vitest`, Playwright).

**2. `docker-compose.yml` — runnable service contract**  
[OpenMAIC `docker-compose.yml` (full file)](https://github.com/THU-MAIC/OpenMAIC/blob/main/docker-compose.yml)

```yaml
services:
  openmaic:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.local
    volumes:
      # Optional: mount server-providers.yml for provider config
      # - ./server-providers.yml:/app/server-providers.yml:ro
      - openmaic-data:/app/data
    restart: unless-stopped

volumes:
  openmaic-data:
```

**What this achieves:** A **repeatable deploy story**: build from the repo Dockerfile, wire secrets via `.env.local`, persist app data in a named volume, optional read-only provider config—so “run it like software,” not only `pnpm dev`.

**3. `skills/openmaic/SKILL.md` — OpenClaw-facing SOP**  
[OpenMAIC `skills/openmaic/SKILL.md` (L1–L18)](https://github.com/THU-MAIC/OpenMAIC/blob/main/skills/openmaic/SKILL.md#L1-L18)

```markdown
---
name: openmaic
description: Guided SOP for setting up and using OpenMAIC from OpenClaw. …
user-invocable: true
metadata: { "openclaw": { "emoji": "🏫" } }
---

# OpenMAIC Skill

Use this as a guided, confirmation-heavy SOP. …

## Core Rules

- Move one phase at a time.
- Before any state-changing action, ask for confirmation.
…
```

**What this achieves:** The integration is **explicitly procedural** (phased setup, confirmations, config in files—not ad-hoc “paste keys in chat”). That is how the project turns a web app into something **addressable from chat agents** without losing safety and reproducibility.

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
