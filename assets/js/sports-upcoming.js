/**
 * Sports blog: next Arsenal (EPL), next UFC card, next F1 GP.
 * Client-side fetches (TheSportsDB + Jolpica F1). Refreshes on an interval.
 */
(function () {
  "use strict";

  var TSDB = "https://www.thesportsdb.com/api/v1/json/3";
  var UFC_LEAGUE_ID = "4443";
  /** ESPN site API — full schedule + scoreboard range (CORS open). TheSportsDB EPL season feed is incomplete on the free tier. */
  var ARSENAL_ESPN_TEAM_ID = "359";
  var ARSENAL_TSDB_TEAM_ID = "133604";
  /** EPL off-season gaps can exceed three weeks; scoreboard window covers pre-season through early fixtures. */
  var ARSENAL_SCOREBOARD_DAYS = 120;
  var ESPN_ARSENAL_SCHEDULE =
    "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/teams/" + ARSENAL_ESPN_TEAM_ID + "/schedule";
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

  function isUfcEvent(ev) {
    return ev && ev.strLeague === "UFC" && ev.strSport === "Fighting";
  }

  function isLikelyPastUfc(ev) {
    var status = String(ev.strStatus || "").toLowerCase();
    if (/^(ft|aot|finished|complete|cancelled)/.test(status)) return true;
    var t = parseTsdbInstant(ev);
    return !!(t && t.getTime() < Date.now() - 24 * 60 * 60 * 1000);
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

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function yyyymmddUtc(ms) {
    var d = new Date(ms);
    return d.getUTCFullYear() + pad2(d.getUTCMonth() + 1) + pad2(d.getUTCDate());
  }

  function parseEspnEventInstant(ev) {
    if (!ev || !ev.date) return null;
    var dt = new Date(ev.date);
    return isNaN(dt.getTime()) ? null : dt;
  }

  function espnEventInvolvesArsenal(ev) {
    var c = (ev.competitions || [])[0];
    if (!c) return false;
    return (c.competitors || []).some(function (x) {
      return x.team && String(x.team.id) === ARSENAL_ESPN_TEAM_ID;
    });
  }

  function espnEventTitle(ev) {
    if (ev.name) return ev.name;
    var c = (ev.competitions || [])[0];
    if (!c) return "Arsenal match";
    var comps = c.competitors || [];
    var home;
    var away;
    for (var i = 0; i < comps.length; i++) {
      if (comps[i].homeAway === "home") home = comps[i].team;
      if (comps[i].homeAway === "away") away = comps[i].team;
    }
    var hn = home && home.displayName ? home.displayName : "?";
    var an = away && away.displayName ? away.displayName : "?";
    return hn + " vs " + an;
  }

  function espnEventVenue(ev) {
    var c = (ev.competitions || [])[0];
    if (!c || !c.venue) return "";
    var v = c.venue;
    var addr = v.address || {};
    return [v.fullName, addr.city, addr.country].filter(Boolean).join(" · ");
  }

  function pickNextArsenalFromEspnEvents(events, nowMs) {
    var bufferMs = 95 * 60 * 1000;
    var wrapped = (events || [])
      .map(function (ev) {
        return { ev: ev, t: parseEspnEventInstant(ev) };
      })
      .filter(function (o) {
        return o.t && o.t.getTime() > nowMs - bufferMs;
      });
    wrapped.sort(function (a, b) {
      return a.t.getTime() - b.t.getTime();
    });
    return wrapped[0] || null;
  }

  function tsdbEventTitle(ev) {
    if (ev.strHomeTeam && ev.strAwayTeam) return ev.strHomeTeam + " vs " + ev.strAwayTeam;
    return ev.strEvent || "Arsenal match";
  }

  function tsdbEventDetail(ev) {
    return [ev.strLeague, ev.strVenue, ev.strCity, ev.strCountry].filter(Boolean).join(" · ");
  }

  function fetchArsenalScoreboardWindow(nowMs) {
    var start = nowMs;
    var end = nowMs + ARSENAL_SCOREBOARD_DAYS * 24 * 60 * 60 * 1000;
    var url =
      "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard?dates=" +
      yyyymmddUtc(start) +
      "-" +
      yyyymmddUtc(end);
    return fetchJson(url).then(function (data) {
      var events = (data.events || []).filter(espnEventInvolvesArsenal);
      return pickNextArsenalFromEspnEvents(events, nowMs);
    });
  }

  function setArsenalCardFromEspn(pick) {
    setCard("su-arsenal", espnEventTitle(pick.ev), "", pick.t, espnEventVenue(pick.ev), "");
  }

  function setArsenalCardFromTsdb(pick) {
    setCard("su-arsenal", tsdbEventTitle(pick.ev), "", pick.t, tsdbEventDetail(pick.ev), "");
  }

  function fetchArsenalFromTsdb(nowMs) {
    return fetchJson(TSDB + "/eventsnext.php?id=" + ARSENAL_TSDB_TEAM_ID).then(function (data) {
      var events = data.events || [];
      var wrapped = events
        .map(function (ev) {
          return { ev: ev, t: parseTsdbInstant(ev) };
        })
        .filter(function (o) {
          return o.t && o.t.getTime() > nowMs - 95 * 60 * 1000;
        });
      wrapped.sort(function (a, b) {
        return a.t.getTime() - b.t.getTime();
      });
      return wrapped[0] || null;
    });
  }

  function nextArsenal() {
    var nowMs = Date.now();
    return fetchJson(ESPN_ARSENAL_SCHEDULE)
      .then(function (data) {
        var pick = pickNextArsenalFromEspnEvents(data.events || [], nowMs);
        if (pick) {
          setArsenalCardFromEspn(pick);
          return true;
        }
        return fetchArsenalScoreboardWindow(nowMs);
      })
      .then(function (result) {
        if (result === true) return;
        if (result) {
          setArsenalCardFromEspn(result);
          return;
        }
        return fetchArsenalFromTsdb(nowMs);
      })
      .then(function (pick) {
        if (pick === true || pick === undefined) return;
        if (pick) {
          setArsenalCardFromTsdb(pick);
          return;
        }
        setCard(
          "su-arsenal",
          "No upcoming match found",
          "",
          null,
          "",
          "No Arsenal fixture in the feeds right now.",
        );
      });
  }

  function setUfcCard(ev) {
    var t = parseTsdbInstant(ev);
    var detail = [ev.strVenue, ev.strCity, ev.strCountry].filter(Boolean).join(" · ") || "";
    setCard("su-ufc", ev.strEvent || "UFC", "", t, detail, "");
  }

  function pickNextUfcFromEvents(events) {
    var now = Date.now();
    var candidates = events.filter(isUfcEvent).filter(function (ev) {
      if (isLikelyPastUfc(ev)) return false;
      var t = parseTsdbInstant(ev);
      return t && t.getTime() > now - 30 * 60 * 1000;
    });
    candidates.sort(function (a, b) {
      return parseTsdbInstant(a) - parseTsdbInstant(b);
    });
    return candidates[0] || null;
  }

  function nextUfcFromSeason() {
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
      return pickNextUfcFromEvents(events);
    });
  }

  function nextUfc() {
    return fetchJson(TSDB + "/eventsnextleague.php?id=" + UFC_LEAGUE_ID)
      .then(function (data) {
        var ev = pickNextUfcFromEvents(data.events || []);
        if (ev) return ev;
        return nextUfcFromSeason();
      })
      .then(function (ev) {
        if (!ev) {
          setCard("su-ufc", "No upcoming event found", "", null, "", "UFC calendar in the public API can lag.");
          return;
        }
        setUfcCard(ev);
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
        wireError("su-arsenal", "Could not load fixture data (ESPN / TheSportsDB).");
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
