---
layout: page
title: Blog
subtitle: Research, sports, and a casual journal
permalink: /blog/
---

Use **`research`** for econometrics, RA work, and papers. Use **`sports`** for game takes. Use **`journal`** for daily or casual notes — those show in the **Journal** block on the [home page]({{ '/' | relative_url }}#journal) and **not** in the main “Blog & writing” list.

**How to add a post:** create `YYYY-MM-DD-short-title.md` in `_posts/`:

```yaml
---
layout: post
title: Your title
subtitle: Optional
tags: [research]   # or [sports] or [journal]
---
```

To keep a **template** off the home **research feed** only, add `hide_from_home: true` (journal posts are already excluded from that list when tagged `journal`).

<div class="row mt-4">
  <div class="col-md-4 mb-4">
    <div class="project-card">
      <h2 class="h4 mt-0"><a href="{{ '/blog/research/' | relative_url }}">Research</a></h2>
      <p class="mb-3 small">Econometrics, RA notes, coursework.</p>
      <a class="btn btn-outline-primary btn-sm" href="{{ '/blog/research/' | relative_url }}">View posts</a>
    </div>
  </div>
  <div class="col-md-4 mb-4">
    <div class="project-card">
      <h2 class="h4 mt-0"><a href="{{ '/blog/sports/' | relative_url }}">Sports</a></h2>
      <p class="mb-3 small">Soccer, F1, basketball, etc.</p>
      <a class="btn btn-outline-primary btn-sm" href="{{ '/blog/sports/' | relative_url }}">View posts</a>
    </div>
  </div>
  <div class="col-md-4 mb-4">
    <div class="project-card">
      <h2 class="h4 mt-0"><a href="{{ '/blog/journal/' | relative_url }}">Journal</a></h2>
      <p class="mb-3 small">Casual / diary-style notes.</p>
      <a class="btn btn-outline-primary btn-sm" href="{{ '/blog/journal/' | relative_url }}">View posts</a>
    </div>
  </div>
</div>

<p class="text-muted small mt-2">Research and sports posts appear in the <a href="{{ '/' | relative_url }}#posts">Blog &amp; writing</a> feed on the home page; journal posts appear under <a href="{{ '/' | relative_url }}#journal">Journal</a>. All tags are on the <a href="{{ '/tags' | relative_url }}">tag index</a>.</p>
