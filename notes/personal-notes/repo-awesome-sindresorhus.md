---
layout: personal-note
title: "Repo notes: sindresorhus/awesome"
subtitle: The meta-list that standardized “awesome” on GitHub
permalink: /notes/personal-notes/repo-awesome-sindresorhus/
mathjax: false
---

<p class="mb-4"><a href="{{ '/notes/personal-notes/' | relative_url }}">← Personal notes</a></p>

<p class="text-muted small"><strong>Disclaimer:</strong> Unofficial summary. The canonical repo is <a href="https://github.com/sindresorhus/awesome">sindresorhus/awesome</a> (CC0-1.0 for that repo’s contribution; check files for details).</p>

**Repository:** [https://github.com/sindresorhus/awesome](https://github.com/sindresorhus/awesome)

---

### What it is (and is not)

**This repo is almost entirely curation, not application code.** The main artifact is **`readme.md`**: a huge, categorized **index of links** to other “awesome” lists (platforms, languages, front-end, security, databases, etc.). Sister files like **`awesome.md`**, **`contributing.md`**, **`create-list.md`**, and **`code-of-conduct.md`** define **community norms** for the wider awesome-list ecosystem.

So the “codebase” is really **markdown + GitHub Actions workflows** (under `.github/workflows/`) that enforce list quality—linting awesome lists against shared rules—plus **`media/`** for branding assets.

---

### Key upstream snippets

**1. PR workflow — lint only when the index changes**  
[sindresorhus/awesome `.github/workflows/main.yml`](https://github.com/sindresorhus/awesome/blob/main/.github/workflows/main.yml)

```yaml
on:
  pull_request:
    branches: [main]
    paths:
      - 'readme.md'
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 0
      - name: awesome-lint
        run: ./.github/workflows/repo_linter.sh
```

**What this achieves:** CI runs **only on PRs that touch `readme.md`**, with **full history** (`fetch-depth: 0`) so the linter script can diff against `origin/main`. That keeps maintenance cheap while still guarding the main artifact.

**2. `repo_linter.sh` — diff-driven clone + `awesome-lint`**  
[sindresorhus/awesome `.github/workflows/repo_linter.sh`](https://github.com/sindresorhus/awesome/blob/main/.github/workflows/repo_linter.sh)

```bash
REPO_TO_LINT=$(
	git diff origin/main -- readme.md |
	grep ^+ |
	grep -Eo 'https.*#readme' |
	sed 's/#readme//')
…
if [ -z "$REPO_TO_LINT" ]; then
	echo "No new link found in the format:  https://....#readme"
else
	echo "Cloning $REPO_TO_LINT"
	mkdir cloned
	cd cloned
	git clone "$REPO_TO_LINT" .
	npx awesome-lint
fi
```

**What this achieves:** New list links must use the **`#readme` URL convention**; the script **extracts added URLs**, **clones the target repo**, and runs **`npx awesome-lint`** on it. So “awesome” is not only style in prose—**incoming lists are machine-checked** against shared rules.

---

### What they achieved

- **De facto standard:** The word **“awesome”** on GitHub strongly connotes “curated topic list following Sindre’s layout and quality bar.”
- **Scale as proof of utility:** Hundreds of thousands of stars reflect **discovery friction** on GitHub: people want **human-filtered** maps of repos and resources.
- **Process as product:** Strict **contribution guidelines** and automated checks turned a meme-y name into something **maintainable** at scale.

---

### How to read this repository usefully

1. Open **`readme.md`** and jump to a **topic** you care about (e.g. Machine Learning, Python, Economics-adjacent tooling if linked indirectly).
2. Read **`contributing.md`** if you want to **add** a list—PRs are cheap intellectually but the maintainers care about **format and substance**.
3. Peek **`.github/workflows/`** if you maintain your own list and want to **copy the lint pattern** (awesome-lint ecosystem).

---

### Lesson for your own work

If you are building **public notes** or **resource pages**, this repo is a case study in: **narrow scope per list**, **consistent headings**, **automated hygiene**, and **letting the network fork** into topic-specific lists instead of one infinite document.

---

### Limitations

- **Link rot:** Any mega-list ages; dead links are a maintenance tax.
- **Not evaluative depth:** “Awesome” means **signal + breadth**, not peer review of each entry.
