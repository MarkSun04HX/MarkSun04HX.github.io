---
layout: page
title: Class notes
subtitle: Quick check
permalink: /notes/class-notes/
---

<script src="{{ '/assets/js/class-notes-gate.js' | relative_url }}" defer></script>

<p class="mb-4"><a href="{{ '/notes/' | relative_url }}">← Back to Notes</a></p>

<div
  id="class-notes-gate"
  class="border rounded p-3 p-md-4 mb-4"
  style="border-color:#dde4ec;background:#f8fafc;max-width:32rem;"
  data-content-url="{{ '/notes/class-notes/content/' | relative_url }}"
>
  <p class="mb-2">This section includes <strong>private coursework details</strong>. To continue:</p>
  <p class="font-weight-medium mb-3">What is my favorite soccer team?</p>

  <form id="class-notes-gate-form" action="#" method="get" autocomplete="off">
    <label class="sr-only" for="class-notes-gate-answer">Answer</label>
    <input
      type="text"
      id="class-notes-gate-answer"
      name="answer"
      class="form-control mb-2"
      placeholder="Your answer"
      required
      autocapitalize="off"
      autocorrect="off"
      spellcheck="false"
    />
    <button type="submit" class="btn btn-primary">Continue</button>
  </form>

  <p id="class-notes-gate-wrong" class="small text-danger mt-2 mb-0 d-none" role="alert">That does not match—try again.</p>

  <p class="small text-muted mt-3 mb-0">Access is remembered in this browser until you close the session or use “Lock class notes” on the notes page. This is a simple gate, not encryption; do not rely on it for highly sensitive data.</p>
</div>
