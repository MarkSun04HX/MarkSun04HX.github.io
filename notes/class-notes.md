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
  <p class="mb-2">This section includes <strong>private coursework details</strong>. Answer one of the questions below to continue.</p>

  <label class="small font-weight-bold text-muted d-block mb-1" for="class-notes-q-select">Question</label>
  <select id="class-notes-q-select" class="form-control form-control-sm mb-2" aria-describedby="class-notes-q-hint">
    <option value="0">Favorite soccer team</option>
    <option value="1">STA 279: Statistical Computing — professor’s last name</option>
    <option value="2">Residence hall</option>
    <option value="3">Where I was born</option>
  </select>
  <p id="class-notes-q-hint" class="small text-muted mb-3 mb-md-4">Stuck on one? Switch the question anytime—only one correct answer is required.</p>

  <p id="class-notes-gate-question" class="font-weight-medium mb-3" aria-live="polite"></p>

  <form id="class-notes-gate-form" action="#" method="get" autocomplete="off">
    <label class="sr-only" for="class-notes-gate-answer">Your answer</label>
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

  <p id="class-notes-gate-wrong" class="small text-danger mt-2 mb-0 d-none" role="alert">That does not match—try again or pick another question.</p>

  <p class="small text-muted mt-3 mb-0">Access is remembered in this browser until you close the session or use “Lock class notes” on the notes page. This is a simple gate, not encryption; do not rely on it for highly sensitive data.</p>
</div>
