---
layout: page
title: Résumé / CV
subtitle: Quick check
permalink: /resume/
---

<script src="{{ '/assets/js/private-section-gate.js' | relative_url }}" defer></script>

<p class="mb-3 text-muted small">The downloadable PDF is behind a short check so casual visitors are nudged to <strong>request it from me directly</strong>. If you know me, use one of the questions below.</p>

<div
  id="private-section-gate"
  class="border rounded p-3 p-md-4 mb-4"
  style="border-color:#dde4ec;background:#f8fafc;max-width:32rem;"
  data-content-url="{{ '/resume/content/' | relative_url }}"
  data-storage-key="sunResumeAccessV1"
>
  <p class="mb-2">Answer <strong>one</strong> of the questions to open the résumé page.</p>

  <label class="small font-weight-bold text-muted d-block mb-1" for="private-gate-q-select">Question</label>
  <select id="private-gate-q-select" class="form-control form-control-sm mb-2" aria-describedby="private-gate-q-hint">
    <option value="0">Favorite soccer team</option>
    <option value="1">STA 279: Statistical Computing — professor’s last name</option>
    <option value="2">Residence hall</option>
    <option value="3">Where I was born</option>
  </select>
  <p id="private-gate-q-hint" class="small text-muted mb-3 mb-md-4">Stuck on one? Switch the question anytime.</p>

  <p id="private-gate-question" class="font-weight-medium mb-3" aria-live="polite"></p>

  <form id="private-gate-form" action="#" method="get" autocomplete="off">
    <label class="sr-only" for="private-gate-answer">Your answer</label>
    <input
      type="text"
      id="private-gate-answer"
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

  <p id="private-gate-wrong" class="small text-danger mt-2 mb-0 d-none" role="alert">That does not match—try again or pick another question.</p>

  <p class="small text-muted mt-3 mb-0">Not sure? Email or message me for the résumé. Access here is remembered in this browser until you use “Lock résumé” on the PDF page. This gate is not encryption.</p>
</div>

<p class="text-muted small">For narrative context and project links without the PDF, see <a href="{{ '/aboutme' | relative_url }}">About me</a> and <a href="{{ '/projects' | relative_url }}">Projects</a>.</p>
