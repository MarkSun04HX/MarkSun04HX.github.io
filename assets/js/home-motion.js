/**
 * Home page motion — subtle fade / lift (Apple-style easing), scroll reveals.
 * Respects prefers-reduced-motion. Only runs when the minimal home hero is present.
 */
(function () {
  function qsa(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  function boot() {
    if (!document.querySelector(".home-intro.home-intro--minimal")) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var heading = document.querySelector(".intro-header:not(.big-img) .page-heading");
    if (heading) {
      var h1 = heading.querySelector("h1");
      if (h1) {
        h1.classList.add("motion-fade-up");
        h1.style.setProperty("--motion-delay", "0ms");
      }
      var hr = heading.querySelector("hr.small");
      if (hr) {
        hr.classList.add("motion-fade-up");
        hr.style.setProperty("--motion-delay", "70ms");
      }
      var sub = heading.querySelector(".page-subheading");
      if (sub) {
        sub.classList.add("motion-fade-up");
        sub.style.setProperty("--motion-delay", "130ms");
      }
    }

    qsa(".posts-list .post-preview").forEach(function (li, i) {
      li.classList.add("motion-fade-up-scroll");
      li.style.setProperty("--motion-delay", Math.min(i, 12) * 42 + "ms");
    });

    var pager = document.querySelector(".main-pager.pagination");
    if (pager) {
      pager.classList.add("motion-fade-up-scroll");
      pager.style.setProperty("--motion-delay", "80ms");
    }

    function revealAllMotion() {
      qsa(".motion-fade-up").forEach(function (el) {
        el.classList.add("is-visible");
      });
      qsa(".motion-fade-up-scroll").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }

    if (reduced) {
      revealAllMotion();
      return;
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        qsa(".motion-fade-up").forEach(function (el) {
          el.classList.add("is-visible");
        });
      });
    });

    var scrollEls = qsa(".motion-fade-up-scroll");
    if (!scrollEls.length) return;

    if (!("IntersectionObserver" in window)) {
      scrollEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
    );

    scrollEls.forEach(function (el) {
      io.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
