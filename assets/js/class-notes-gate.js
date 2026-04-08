(function () {
  'use strict';

  var STORAGE_KEY = 'sunWfuClassNotesV1';

  function normalize(s) {
    return (s || '')
      .toLowerCase()
      .replace(/[.'’`]/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /** Accept many ways someone might type Arsenal (case, punctuation, nicknames). */
  function isAllowedAnswer(raw) {
    var n = normalize(raw);
    if (!n) return false;

    var phrases = [
      'arsenal',
      'the arsenal',
      'arsenal fc',
      'arsenal f c',
      'arsenal football club',
      'gunners',
      'the gunners',
      'gooners',
      'the gooners',
      'afc arsenal',
      'arsenal afc',
      'arsenal london',
      'north london reds'
    ];
    if (phrases.indexOf(n) >= 0) return true;

    var compact = n.replace(/\s/g, '');
    if (compact === 'arsenalfc' || compact === 'arsenalafc') return true;

    return false;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('class-notes-gate');
    if (!root) return;

    var contentUrl = root.getAttribute('data-content-url');
    var form = root.querySelector('#class-notes-gate-form');
    var input = root.querySelector('#class-notes-gate-answer');
    var wrong = document.getElementById('class-notes-gate-wrong');

    if (!form || !input || !contentUrl) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (wrong) wrong.classList.add('d-none');

      if (isAllowedAnswer(input.value)) {
        try {
          sessionStorage.setItem(STORAGE_KEY, '1');
        } catch (err) {}
        window.location.href = contentUrl;
      } else {
        if (wrong) wrong.classList.remove('d-none');
        input.focus();
        input.select();
      }
    });
  });
})();
