(function () {
  'use strict';

  function escapeHtml(s) {
    if (!s) return '';
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function typeset(nodes) {
    if (!nodes || !nodes.length) return Promise.resolve();
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      var list = Array.isArray(nodes) ? nodes : [nodes];
      return window.MathJax.typesetPromise(list).catch(function () {});
    }
    return Promise.resolve();
  }

  function init(root) {
    root.addEventListener('click', function (e) {
      var btn = e.target.closest('.pn-quiz__choice');
      if (!btn || !root.contains(btn)) return;
      var item = btn.closest('[data-pn-quiz-item]');
      if (!item || item.getAttribute('data-answered') === '1') return;

      var correct = parseInt(item.getAttribute('data-correct'), 10);
      var chosen = parseInt(btn.getAttribute('data-index'), 10);
      var feedback = item.querySelector('.pn-quiz__feedback');
      var explainEl = item.querySelector('.pn-quiz__explanation-source');
      var explanation = explainEl ? explainEl.textContent.trim() : '';

      item.setAttribute('data-answered', '1');
      item.querySelectorAll('.pn-quiz__choice').forEach(function (b) {
        b.disabled = true;
        b.classList.remove('is-correct', 'is-wrong');
        var idx = parseInt(b.getAttribute('data-index'), 10);
        if (idx === correct) b.classList.add('is-correct');
        else if (idx === chosen && chosen !== correct) b.classList.add('is-wrong');
      });

      if (feedback) {
        feedback.classList.remove('d-none');
        var ok = chosen === correct;
        feedback.classList.toggle('text-success', ok);
        feedback.classList.toggle('text-danger', !ok);
        var prefix = ok ? 'Correct. ' : 'Not quite. ';
        feedback.innerHTML =
          '<span class="pn-quiz__fb-body">' + escapeHtml(prefix + explanation) + '</span>';
        typeset([feedback]);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.pn-quiz').forEach(init);
  });
})();
