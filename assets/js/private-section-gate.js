(function () {
  'use strict';

  function normalize(s) {
    return (s || '')
      .toLowerCase()
      .replace(/[.'’`]/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function isArsenal(raw) {
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
    return compact === 'arsenalfc' || compact === 'arsenalafc';
  }

  function isEvans(raw) {
    var n = normalize(raw);
    if (!n) return false;
    var phrases = [
      'evans',
      'dr evans',
      'professor evans',
      'prof evans',
      'last name evans'
    ];
    return phrases.indexOf(n) >= 0;
  }

  function isPolo(raw) {
    var n = normalize(raw);
    if (!n) return false;
    var phrases = [
      'polo',
      'polo hall',
      'polo dorm',
      'polo dormitory',
      'polo residence',
      'polo residence hall',
      'the polo residence hall',
      'polo res',
      'polo res hall',
      'wake forest polo',
      'wf polo',
      'the polo',
      'residence hall polo',
      'polo building'
    ];
    return phrases.indexOf(n) >= 0;
  }

  function isXiamen(raw) {
    var n = normalize(raw);
    if (!n) return false;
    var phrases = [
      'xiamen',
      'xia men',
      'xiamen china',
      'xiamen city',
      'city of xiamen',
      'born in xiamen',
      'xia men city'
    ];
    if (phrases.indexOf(n) >= 0) return true;
    var compact = n.replace(/\s/g, '');
    return compact === 'xiamen' || compact === 'xiamenchina';
  }

  var QUESTIONS = [
    {
      id: 'arsenal',
      prompt: 'What is my favorite soccer team?',
      validate: isArsenal,
      placeholder: 'e.g. team name'
    },
    {
      id: 'sta279',
      prompt:
        'What is the last name of the professor who taught me STA 279: Statistical Computing?',
      validate: isEvans,
      placeholder: 'Last name'
    },
    {
      id: 'polo',
      prompt: 'Which residence hall do I live in?',
      validate: isPolo,
      placeholder: 'e.g. hall name'
    },
    {
      id: 'xiamen',
      prompt: 'Where was I born?',
      validate: isXiamen,
      placeholder: 'City / place'
    }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('private-section-gate');
    if (!root) return;

    var STORAGE_KEY = root.getAttribute('data-storage-key');
    var contentUrl = root.getAttribute('data-content-url');
    if (!STORAGE_KEY || !contentUrl) return;

    var form = root.querySelector('#private-gate-form');
    var input = root.querySelector('#private-gate-answer');
    var wrong = document.getElementById('private-gate-wrong');
    var select = document.getElementById('private-gate-q-select');
    var promptEl = document.getElementById('private-gate-question');

    if (!form || !input || !select || !promptEl) return;

    function applyQuestion(index) {
      var q = QUESTIONS[index];
      if (!q) return;
      promptEl.textContent = q.prompt;
      input.placeholder = q.placeholder || 'Your answer';
      input.value = '';
      if (wrong) wrong.classList.add('d-none');
    }

    function currentIndex() {
      var i = parseInt(select.value, 10);
      return isNaN(i) ? 0 : i;
    }

    select.addEventListener('change', function () {
      applyQuestion(currentIndex());
      input.focus();
    });

    applyQuestion(currentIndex());

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (wrong) wrong.classList.add('d-none');

      var q = QUESTIONS[currentIndex()];
      if (!q || !q.validate(input.value)) {
        if (wrong) wrong.classList.remove('d-none');
        input.focus();
        input.select();
        return;
      }

      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch (err) {}
      window.location.href = contentUrl;
    });
  });
})();
