/**
 * Highlights "today" on the calendar using the visitor's local date.
 * Re-runs every minute so the highlight updates if the tab stays open past midnight.
 */
(function () {
  function ymd(d) {
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  }

  function markToday() {
    document.querySelectorAll(".cal-cell--today").forEach(function (el) {
      el.classList.remove("cal-cell--today");
    });
    document.querySelectorAll(".cal-list-item--today").forEach(function (el) {
      el.classList.remove("cal-list-item--today");
    });

    var key = ymd(new Date());
    document.querySelectorAll('.cal-cell[data-cal="' + key + '"]').forEach(function (el) {
      el.classList.add("cal-cell--today");
    });

    document.querySelectorAll('.cal-events-list time[datetime="' + key + '"]').forEach(function (t) {
      var li = t.closest("li");
      if (li) li.classList.add("cal-list-item--today");
    });

    var msg = document.getElementById("cal-today-msg");
    if (!msg) return;

    var now = new Date();
    var formatted = now.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    var tz = "";
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch (e) {}

    var onGrid = document.querySelector('.cal-cell[data-cal="' + key + '"]');
    msg.textContent =
      "Today — " +
      formatted +
      (tz ? " (" + tz + ")" : "") +
      ": " +
      (onGrid
        ? "dark outline on the calendar matches this date."
        : "this date is outside April–May 2026 on this page, so no day cell is highlighted.");

    msg.hidden = false;
  }

  markToday();
  setInterval(markToday, 60 * 1000);
})();
