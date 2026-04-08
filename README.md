# marksun04hx.github.io

Personal website for **Haoxuan (Mark) Sun** — economics, statistics, and data science.  
**Live site:** [https://marksun04hx.github.io](https://marksun04hx.github.io)

Built with [Beautiful Jekyll](https://beautifuljekyll.com/) and hosted on [GitHub Pages](https://pages.github.com/).

## What’s in this repo

| Path | Purpose |
|------|---------|
| `_config.yml` | Site title, author, nav (`navbar-links`), footer social links, colors, SEO |
| `index.html` | Home page (intro + blog feed) |
| `aboutme.md` | Bio, education, experience, contact |
| `resume.md` | Résumé gate at `/resume/` (same private questions as class notes); PDF on `resume-content.md` → `/resume/content/` |
| `projects.md` | Project highlights |
| `notes/` | **Notes** section: [`notes/index.md`](notes/index.md) hub, [`notes/class-notes.md`](notes/class-notes.md) (gate → [`class-notes-content.md`](notes/class-notes-content.md) for PDFs + coursework), [`notes/personal-notes/`](notes/personal-notes/) (ML / stats write-ups) |
| `calendar.html` | Calendar page linked from the nav |
| `tags.html` | Tag index for posts |
| `blog/` | Blog hub and category pages (`/blog/`, `/blog/research/`, `/blog/sports/`, `/blog/journal/`) |
| `_posts/` | Blog posts — use `tags: [research]`, `[sports]`, or `[journal]` (journal = casual; see **Blog** in the nav) |
| `assets/css/sunhaoxuan.css` | Custom layout and accent styles |
| `assets/img/favicon.svg` | Site icon |
| `assets/img/ra/*.png` | RA research figures (web); paired PDFs in `assets/files/ra/` |
| `assets/files/haoxuan-sun-resume.pdf` | Résumé PDF (linked from gated `/resume/content/`; file URL is still public if guessed) |
| `assets/files/notes/*.pdf` | Course note PDFs linked from class notes |
| `assets/images/` | Images for posts or diagrams (e.g. TBDE figures) |
| `scripts/` | Optional utilities (e.g. diagram generation) |
| `.github/workflows/ci.yml` | Verifies Jekyll builds on every push and PR |
| `.github/workflows/pages.yml` | Builds and deploys the site when **Pages → Source** is **GitHub Actions** |

Navigation matches `_config.yml` (`About Me`, `Résumé`, `Projects`, `Notes`, `Calendar`, `Blog`, `Resources`).

The default branch **`master`** is what GitHub Pages uses (either as the published branch or as the branch that triggers the Actions deploy workflow, depending on your Pages source setting).

## Edit the site

1. Change copy in **`aboutme.md`**, **`projects.md`**, **`index.html`**, or under **`notes/`**.
2. Add a post under **`_posts/`** using the name pattern `YYYY-MM-DD-title.md` and YAML front matter (see an existing post).
3. Adjust **navigation** or **footer social links** in **`_config.yml`** (`navbar-links`, `social-network-links`).
4. Tweak **colors** in **`_config.yml`** or **`assets/css/sunhaoxuan.css`**.

After you push to GitHub, the site updates within about one to two minutes (Actions deploy) or after the next Pages build (branch publishing).

## Local preview (optional)

Requires Ruby **3.2+** (3.3 matches CI) and Bundler:

```bash
bundle install
bundle exec appraisal install
bundle exec appraisal jekyll-4 jekyll serve --future --config _config_ci.yml,_config.yml
```

If `_config_ci.yml` is missing locally, create it so the user site serves at the repo root (same as CI):

```bash
printf '%s\n' '---' 'baseurl: ""' > _config_ci.yml
```

Then open `http://localhost:4000`. On Apple Silicon or older system Rubies, use a recent Ruby via `rbenv` or `mise` if `bundle install` fails.

## GitHub Pages settings

- **Deploy with Actions:** **Settings → Pages → Build and deployment → Source:** **GitHub Actions** (uses `.github/workflows/pages.yml` on pushes to `master`).
- **Deploy from a branch:** alternatively **Source** → branch **`master`**, folder **`/ (root)`** — then the `pages.yml` workflow is optional; you can disable it to avoid duplicate deploys.
- **Custom domain:** only add a domain you control (after DNS). Do **not** put `*.github.io` in the custom domain field.
- If pushes that change **`.github/workflows/`** are rejected, your token needs the **`workflow`** scope, or use **SSH** remotes.

## License / theme

Site content © Haoxuan (Mark) Sun. The **Beautiful Jekyll** theme remains subject to [its own license](https://github.com/daattali/beautiful-jekyll/blob/master/LICENSE); this repository started from that template.
