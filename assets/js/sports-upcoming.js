/**
 * Sports blog: next Arsenal (EPL), next UFC card, next F1 GP.
 * Client-side fetches (TheSportsDB + Jolpica F1). Refreshes on an interval.
 */
(function () {
  "use strict";

  var TSDB = "https://www.thesportsdb.com/api/v1/json/3";
  var EPL_ID = "4328";
  var UFC_LEAGUE_ID = "4443";
  var F1_NEXT = "https://api.jolpi.ca/ergast/f1/current/next.json";
  var REFRESH_MS = 5 * 60 * 1000;

  function $(id) {
    return document.getElementById(id);
  }

  function parseTsdbInstant(ev) {
    if (ev.strTimestamp) {
      var d = new Date(ev.strTimestamp);
      if (!isNaN(d.getTime())) return d;
    }
    var date = ev.dateEvent || ev.dateEventLocal;
    var time = (ev.strTime || "12:00:00").replace(/\+\d{2}:\d{2}$/, "");
    if (!date) return null;
    var iso = date + "T" + time.trim();
    var d2 = new Date(iso.indexOf("Z") === -1 && iso.indexOf("+") === -1 ? iso + "Z" : iso);
    return isNaN(d2.getTime()) ? null : d2;
  }

  function isFinishedFootball(ev) {
    if (ev.strStatus === "Match Finished") return true;
    if (ev.strStatus === "Postponed" || ev.strPostponed === "yes") return false;
    if (ev.intHomeScore != null && ev.intAwayScore != null && ev.strStatus !== "Not Started")
      return true;
    return false;
  }

  function isArsenalMenEpl(ev) {
    if (!ev || ev.strLeague !== "English Premier League") return false;
    if (ev.strHomeTeam === "Arsenal" || ev.strAwayTeam === "Arsenal") return true;
    return false;
  }

  function isUfcEvent(ev) {
    return ev && ev.strLeague === "UFC" && ev.strSport === "Fighting";
  }

  function isLikelyPastUfc(ev) {
    if (ev.strResult && String(ev.strResult).length > 80) return true;
    return false;
  }

  function formatLocal(d) {
    if (!d) return "—";
    return d.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  }

  function setCard(prefix, title, sub, when, detail, err) {
    var elTitle = $(prefix + "-title");
    var elWhen = $(prefix + "-when");
    var elDetail = $(prefix + "-detail");
    var elErr = $(prefix + "-err");
    if (!elTitle) return;
    elTitle.textContent = title || "—";
    if (elWhen) elWhen.textContent = when ? formatLocal(when) : "—";
    if (elDetail) elDetail.textContent = sub || detail || "";
    if (elErr) {
      elErr.textContent = err || "";
      elErr.hidden = !err;
    }
  }

  function fetchJson(url) {
    return fetch(url, { credentials: "omit" }).then(function (r) {
      if (!r.ok) throw new Error(r.status + " " + r.statusText);
      return r.json();
    });
  }

  function nextArsenal() {
    var seasons = ["2025-2026", "2026-2027"];
    return Promise.all(
      seasons.map(function (s) {
        return fetchJson(TSDB + "/eventsseason.php?id=" + EPL_ID + "&s=" + s).catch(function () {
          return { events: [] };
        });
      })
    ).then(function (results) {
      var events = [];
      results.forEach(function (r) {
        if (r.events) events = events.concat(r.events);
      });
      var now = Date.now();
      var candidates = events.filter(isArsenalMenEpl).filter(function (ev) {
        if (isFinishedFootball(ev)) return false;
        var t = parseTsdbInstant(ev);
        return t && t.getTime() > now - 60 * 60 * 1000;
      });
      candidates.sort(function (a, b) {
        return parseTsdbInstant(a) - parseTsdbInstant(b);
      });
      var ev = candidates[0];
      if (!ev) {
        setCard("su-arsenal", "No upcoming match found", "", null, "", "Schedule may be incomplete in the public feed.");
        return;
      }
      var t = parseTsdbInstant(ev);
      var title = ev.strEvent || (ev.strHomeTeam + " vs " + ev.strAwayTeam);
      var detail =
        [ev.strVenue, ev.strCity, ev.strCountry].filter(Boolean).join(" · ") ||
        ev.strLeague ||
        "";
      setCard("su-arsenal", title, "", t, detail, "");
    });
  }

  function nextUfc() {
    var seasons = ["2026", "2027"];
    return Promise.all(
      seasons.map(function (s) {
        return fetchJson(TSDB + "/eventsseason.php?id=" + UFC_LEAGUE_ID + "&s=" + s).catch(function () {
          return { events: [] };
        });
      })
    ).then(function (results) {
      var events = [];
      results.forEach(function (r) {
        if (r.events) events = events.concat(r.events);
      });
      var now = Date.now();
      var candidates = events.filter(isUfcEvent).filter(function (ev) {
        if (isLikelyPastUfc(ev)) return false;
        var t = parseTsdbInstant(ev);
        return t && t.getTime() > now - 30 * 60 * 1000;
      });
      candidates.sort(function (a, b) {
        return parseTsdbInstant(a) - parseTsdbInstant(b);
      });
      var ev = candidates[0];
      if (!ev) {
        setCard("su-ufc", "No upcoming event found", "", null, "", "UFC calendar in the public API can lag.");
        return;
      }
      var t = parseTsdbInstant(ev);
      var detail =
        [ev.strVenue, ev.strCity, ev.strCountry].filter(Boolean).join(" · ") || "";
      setCard("su-ufc", ev.strEvent || "UFC", "", t, detail, "");
    });
  }

  function nextF1() {
    return fetchJson(F1_NEXT).then(function (data) {
      var races = (((data.MRData || {}).RaceTable || {}).Races) || [];
      var race = races[0];
      if (!race) {
        setCard("su-f1", "No next race in feed", "", null, "", "");
        return;
      }
      var date = race.date;
      var time = race.time || "12:00:00Z";
      var iso = date + "T" + time;
      var d = new Date(iso);
      if (isNaN(d.getTime())) d = null;
      var title = race.raceName || "Grand Prix";
      var c = race.Circuit || {};
      var loc = c.Location || {};
      var detail =
        [c.circuitName, loc.locality, loc.country].filter(Boolean).join(" · ") || "";
      setCard("su-f1", title, "", d, detail, "");
    });
  }

  function setUpdated() {
    var el = $("su-updated");
    if (el) {
      el.textContent = "Updated " + new Date().toLocaleTimeString(undefined, { timeStyle: "short" });
    }
  }

  function setLoading(loading) {
    var root = $("sports-upcoming");
    if (root) root.classList.toggle("sports-upcoming--loading", !!loading);
  }

  function run() {
    setLoading(true);
    Promise.all([
      nextArsenal().catch(function (e) {
        console.warn("sports-upcoming: Arsenal", e);
        wireError("su-arsenal", "Could not load Premier League data.");
      }),
      nextUfc().catch(function (e) {
        console.warn("sports-upcoming: UFC", e);
        wireError("su-ufc", "Could not load UFC data.");
      }),
      nextF1().catch(function (e) {
        console.warn("sports-upcoming: F1", e);
        wireError("su-f1", "Could not load F1 data.");
      }),
    ]).finally(function () {
      setLoading(false);
      setUpdated();
    });
  }

  function wireError(prefix, message) {
    setCard(prefix, "Could not load", "", null, "", message || "Network or API error.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    if (!$("sports-upcoming")) return;
    run();
    setInterval(run, REFRESH_MS);
  }
})();
