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

### Key upstream snippets

Upstream default branch is **`master`** for [nvbn/thefuck](https://github.com/nvbn/thefuck).

**1. `thefuck/types.py` — dynamic rules and corrections**  
[thefuck `thefuck/types.py` (L134–L198)](https://github.com/nvbn/thefuck/blob/master/thefuck/types.py#L134-L198)

```python
    @classmethod
    def from_path(cls, path):
        # …resolve name, skip excluded rules…
        with logs.debug_time(u'Importing rule: {};'.format(name)):
            try:
                rule_module = load_source(name, str(path))
            except Exception:
                logs.exception(u"Rule {} failed to load".format(name), sys.exc_info())
                return
        priority = getattr(rule_module, 'priority', DEFAULT_PRIORITY)
        return cls(name, rule_module.match,
                   rule_module.get_new_command,
                   getattr(rule_module, 'enabled_by_default', True),
                   getattr(rule_module, 'side_effect', None),
                   settings.priority.get(name, priority),
                   getattr(rule_module, 'requires_output', True))

    def get_corrected_commands(self, command):
        """Returns generator with corrected commands."""
        new_commands = self.get_new_command(command)
        if not isinstance(new_commands, list):
            new_commands = (new_commands,)
        for n, new_command in enumerate(new_commands):
            yield CorrectedCommand(script=new_command,
                                   side_effect=self.side_effect,
                                   priority=(n + 1) * self.priority)
```

**What this achieves:** Rules are **plain Python modules** on disk: `from_path` loads `match` / `get_new_command` by convention, applies **priority** and **enable/disable** from settings, and `get_corrected_commands` normalizes single vs. multiple suggestions into **`CorrectedCommand`** objects. The core stays small; **coverage grows by adding files**.

**2. `thefuck/rules/git_push.py` — one concrete fix**  
[thefuck `thefuck/rules/git_push.py`](https://github.com/nvbn/thefuck/blob/master/thefuck/rules/git_push.py)

```python
@git_support
def match(command):
    return ('push' in command.script_parts
            and 'git push --set-upstream' in command.output)


# …helpers trim duplicate -u / refspec…


@git_support
def get_new_command(command):
    # …normalize command_parts…
    arguments = re.findall(r'git push (.*)', command.output)[-1].replace("'", r"\'").strip()
    return replace_argument(" ".join(command_parts), 'push',
                            'push {}'.format(arguments))
```

**What this achieves:** When `git push` fails and stderr contains Git’s **`--set-upstream` hint**, the rule **parses Git’s own suggested refspec** and rewrites the user’s `push`—the kind of **deterministic, offline** fix that scales in a rule library without an LLM.

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
