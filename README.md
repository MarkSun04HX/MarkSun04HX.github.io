# marksun04hx.github.io

Personal website for **Haoxuan (Mark) Sun** — economics, statistics, and data science.  
**Live site:** [https://marksun04hx.github.io](https://marksun04hx.github.io)

Built with [Beautiful Jekyll](https://beautifuljekyll.com/) and hosted on [GitHub Pages](https://pages.github.com/).

## What’s in this repo

| Path | Purpose |
|------|---------|
| `_config.yml` | Site title, author, nav links, colors, social links, SEO keywords |
| `index.html` | Home page (intro + blog feed) |
| `aboutme.md` | Bio, education, experience, contact |
| `projects.md` | Project highlights |
| `_posts/` | Blog posts — use `tags: [research]` or `tags: [sports]` (see **Blog** in the nav) |
| `blog/` | Blog hub and category listing pages (`/blog/`, `/blog/research/`, `/blog/sports/`) |
| `assets/css/sunhaoxuan.css` | Custom layout and accent styles |
| `assets/img/favicon.svg` | Site icon |
| `assets/img/ra/*.png` | RA research figures (exported from PDF for the web) |
| `assets/files/ra/*.pdf` | Original figure PDFs (linked from captions) |
| `.github/workflows/` | CI build check + optional Pages deploy workflow |

The default branch **`master`** is what GitHub Pages builds from (unless you switch the source in repo settings).

## Edit the site

1. Change copy in **`aboutme.md`**, **`projects.md`**, or **`index.html`**.
2. Add a post under **`_posts/`** using the name pattern `YYYY-MM-DD-title.md` and YAML front matter (see existing post).
3. Adjust **navigation** or **footer social links** in **`_config.yml`** (`navbar-links`, `social-network-links`).
4. Tweak **colors** in **`_config.yml`** or **`assets/css/sunhaoxuan.css`**.

After you push to GitHub, the site rebuilds in about one to two minutes.

## Local preview (optional)

Requires Ruby and Bundler:

```bash
bundle install
bundle exec appraisal install
bundle exec appraisal jekyll serve
```

Then open `http://localhost:4000`. On Apple Silicon or older Ruby versions, use a recent Ruby (e.g. 3.2+) via `rbenv` or `mise` if `bundle install` fails.

## GitHub Pages settings

- **Settings → Pages:** publishing source should match how you deploy (e.g. **Deploy from branch** → `master`, `/ (root)`).
- **Custom domain:** only add a domain you control (e.g. after DNS is set). Do **not** enter `*.github.io` in the custom domain field.
- If pushes that change **`.github/workflows/`** are rejected, your Personal Access Token needs the **`workflow`** scope, or use **SSH** remotes.

## License / theme

Site content © Haoxuan (Mark) Sun. The **Beautiful Jekyll** theme remains subject to [its own license](https://github.com/daattali/beautiful-jekyll/blob/master/LICENSE); this repository started from that template.
