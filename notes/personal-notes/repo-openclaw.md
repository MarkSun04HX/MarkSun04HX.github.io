---
layout: personal-note
title: "Repo notes: OpenClaw"
subtitle: Personal AI assistant gateway — architecture in plain language
permalink: /notes/personal-notes/repo-openclaw/
mathjax: false
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="text-muted small"><strong>Disclaimer:</strong> Informal notes from reading public docs and tree layout, not affiliated with the OpenClaw project. Check <a href="https://github.com/openclaw/openclaw">the official repo</a>, SECURITY.md, and license (MIT) before running anything that touches your messages or devices.</p>

**Repository:** [https://github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)

---

### What it is

**OpenClaw** is a **self-hosted personal AI assistant** “gateway”: you run it on **your** machine (or infra you control), connect **messaging channels** you already use (long list in README: WhatsApp, Telegram, Slack, Discord, Signal, Teams, Matrix, Feishu, etc.), and route inbound/outbound traffic to **agents** with tools. Positioning: **local-first**, **single-user** assistant—not a hosted SaaS replacement for Slack bots in the enterprise sense, though it can be powerful.

The README emphasizes **`openclaw onboard`** as the guided path: gateway, workspace, channels, skills—**Node 22.16+ / Node 24** runtime, global npm install, optional **daemon** via `launchd`/`systemd`.

---

### What the repository contains (scale + shape)

This is a **very large** monorepo (tens of thousands of commits, many top-level packages). Useful buckets:

| Path / artifact | Likely role |
|-----------------|-------------|
| `src/` | Core gateway / CLI implementation |
| `apps/` | Deployable app surfaces (control UI, companion pieces) |
| `packages/` | Shared libraries, protocol clients, internal SDKs |
| `extensions/` | Channel or capability plugins |
| `skills/` | Bundled or example **skills** (composable behaviors) |
| `docs/` | Deep documentation beyond README |
| `ui/` | Frontend bundle for interfaces |
| `test/`, many `vitest.*.config.ts` | Heavy automated testing split by domain |
| `Dockerfile*`, `docker-compose.yml` | Containerized runs and sandboxes |
| `openclaw.mjs`, `Makefile` | CLI entry and developer ergonomics |

So the **achievement** is not a single script—it is a **platform**: multi-channel ingestion, pairing/security defaults, model routing, optional voice and “Canvas,” and a **skill** ecosystem (including integrations like OpenMAIC).

---

### Security idea worth remembering

They explicitly treat **inbound DMs as untrusted input**: default **pairing** flows for many channels, allowlists, `openclaw doctor` to flag risky DM policies. That is the right mindset whenever a bot can **execute tools** or read **local workspace** files.

---

### How I would study the codebase

1. Read **README → Getting started → Security** in order.
2. Find the **gateway** process entry (CLI `gateway` command) and trace how a **message** becomes an **agent turn**.
3. Map **one channel** end-to-end (e.g. Telegram) in `extensions/` or equivalent.
4. Skim **`packages/`** for boundaries: what is “core protocol” vs. “channel adapter” vs. “tool runtime.”

---

### Caveats

- **Operational complexity:** Many channels × many hosts × OAuth/API keys = real **failure surface**; read their upgrade and doctor docs when updating.
- **This note is static:** Feature list and CLI flags will drift; trust upstream first.

<p class="text-muted small">Pairs conceptually with <a href="{{ '/notes/personal-notes/repo-openmaic/' | relative_url }}">OpenMAIC repo notes</a> (downstream “skill” consumer in their README).</p>
