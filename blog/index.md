---
layout: page
title: Blog
subtitle: Research notes and sports opinions — two separate streams
permalink: /blog/
---

Use the **`research`** tag for econometrics, RA work, papers, and methods. Use **`sports`** for opinions on soccer, F1, basketball, and other sports.

**How to add a post:** create a new file in `_posts/` named `YYYY-MM-DD-short-title.md` with this front matter:

```yaml
---
layout: post
title: Your title
subtitle: Optional line under the title
tags: [research]   # or [sports]
---
```

Then write the body in Markdown below the second `---`.

<div class="row mt-4">
  <div class="col-md-6 mb-4">
    <div class="project-card">
      <h2 class="h4 mt-0"><a href="{{ '/blog/research/' | relative_url }}">Research</a></h2>
      <p class="mb-3">Econometrics, TV advertising / RA notes, coursework, and anything academic.</p>
      <a class="btn btn-outline-primary btn-sm" href="{{ '/blog/research/' | relative_url }}">View research posts</a>
    </div>
  </div>
  <div class="col-md-6 mb-4">
    <div class="project-card">
      <h2 class="h4 mt-0"><a href="{{ '/blog/sports/' | relative_url }}">Sports opinions</a></h2>
      <p class="mb-3">Short posts and longer takes — not formal research.</p>
      <a class="btn btn-outline-primary btn-sm" href="{{ '/blog/sports/' | relative_url }}">View sports posts</a>
    </div>
  </div>
</div>

<p class="text-muted small mt-3">Everything dated also appears on the <a href="{{ '/' | relative_url }}">home page</a> feed. All tags are listed on the <a href="{{ '/tags' | relative_url }}">tag index</a>.</p>
