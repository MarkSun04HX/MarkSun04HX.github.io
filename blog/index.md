---
layout: page
title: Blog
subtitle: Research, sports, and a casual journal
permalink: /blog/
---

Use **`research`** for econometrics, RA work, and papers. Use **`sports`** for match previews and sports takes — list them under [Sports]({{ '/blog/sports/' | relative_url }}); they are **not** duplicated in the [home page]({{ '/' | relative_url }}) feed (research + journal there). Use **`journal`** for casual or diary-style notes (they appear in the main feed unless you also tag **`sports`**). You can use **`tags: [sports, journal]`** if a piece should appear under both [Sports]({{ '/blog/sports/' | relative_url }}) and [Journal]({{ '/blog/journal/' | relative_url }}).

**How to add a post:** create `YYYY-MM-DD-short-title.md` in `_posts/`:

```yaml
---
layout: post
title: Your title
subtitle: Optional
tags: [research]   # or [sports] or [journal]
---
```

To keep a **template** off the home **post feed**, add `hide_from_home: true`. Posts tagged **`sports`** only are excluded from that feed by default (use [Sports]({{ '/blog/sports/' | relative_url }}) to list them).

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

<p class="text-muted small mt-2">Recent <code>sports</code> posts: <a href="{{ '/blog/sports/' | relative_url }}">Sports</a>. The <a href="{{ '/' | relative_url }}">home page</a> feed lists research and journal entries (not <code>sports</code>-only duplicates). All tags: <a href="{{ '/tags' | relative_url }}">tag index</a>.</p>
