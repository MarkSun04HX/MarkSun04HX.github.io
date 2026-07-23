/**
 * Ask Mark — sitewide bio chatbot (Puter.js LLM + local grounded fallback).
 */
(function () {
  "use strict";

  var KB_URL = "/assets/data/about-chat-kb.json";
  var PUTER_SRC = "https://js.puter.com/v2/";
  var MODEL = "gpt-5.4-nano";
  var MAX_HISTORY = 12;

  var kb = null;
  var conversation = null;
  var busy = false;
  var puterReady = null;

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function loadJson(url) {
    return fetch(url, { credentials: "omit" }).then(function (r) {
      if (!r.ok) throw new Error(r.status + " " + r.statusText);
      return r.json();
    });
  }

  function ensurePuter() {
    if (puterReady) return puterReady;
    puterReady = new Promise(function (resolve, reject) {
      if (window.puter && window.puter.ai) {
        resolve(window.puter);
        return;
      }
      var s = document.createElement("script");
      s.src = PUTER_SRC;
      s.async = true;
      s.onload = function () {
        if (window.puter && window.puter.ai) resolve(window.puter);
        else reject(new Error("Puter AI unavailable"));
      };
      s.onerror = function () {
        reject(new Error("Could not load Puter.js"));
      };
      document.head.appendChild(s);
    });
    return puterReady;
  }

  function buildSystemPrompt(data) {
    var parts = [
      "You are Ask Mark, a friendly assistant on Haoxuan (Mark) Sun's personal website.",
      "Answer ONLY using the BIO CONTEXT below. If the answer is not in the context, say you do not know and suggest the Contact page or email sunh23@wfu.edu.",
      "Do not invent degrees, jobs, GPAs, dates, phone numbers, or achievements.",
      "Be concise (usually 2–5 short sentences). Plain text only — no markdown.",
      "Speak about Mark in the third person unless the visitor clearly wants a first-person voice; either is fine if consistent.",
      "",
      "BIO CONTEXT:",
      data.summary,
      "",
    ];
    (data.sections || []).forEach(function (sec) {
      parts.push(sec.title + ": " + sec.text);
      parts.push("");
    });
    return parts.join("\n");
  }

  function scoreSection(query, sec) {
    var q = query.toLowerCase();
    var score = 0;
    var words = q.replace(/[^\w\s]/g, " ").split(/\s+/).filter(function (w) {
      return w.length > 2;
    });
    (sec.keywords || []).forEach(function (kw) {
      if (q.indexOf(kw.toLowerCase()) !== -1) score += 3;
    });
    words.forEach(function (w) {
      if ((sec.text || "").toLowerCase().indexOf(w) !== -1) score += 1;
      if ((sec.title || "").toLowerCase().indexOf(w) !== -1) score += 2;
    });
    return score;
  }

  function localAnswer(query, data) {
    var q = query.toLowerCase().trim();
    if (/^(hi|hello|hey|yo|good (morning|afternoon|evening))\b/.test(q) || q.length < 3) {
      return (
        "Hi — I am Ask Mark, a helper for questions about " +
        data.name +
        ". Ask about education, experience, projects, skills, or how to get in touch."
      );
    }
    if (/who (are you|is (this|ask mark|the bot|the chatbot))/.test(q)) {
      return (
        "I am Ask Mark, a small assistant on this site. I answer questions about " +
        data.name +
        " using his public bio. For anything sensitive or missing, use the Contact page."
      );
    }

    var ranked = (data.sections || [])
      .map(function (sec) {
        return { sec: sec, score: scoreSection(query, sec) };
      })
      .filter(function (x) {
        return x.score > 0;
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });

    if (!ranked.length) {
      return (
        "I am not sure from Mark's public bio. Try the About or Projects pages, or email sunh23@wfu.edu via Contact."
      );
    }

    var top = ranked.slice(0, 2);
    var out = top
      .map(function (x) {
        return x.sec.text;
      })
      .join(" ");
    if (out.length > 700) out = out.slice(0, 697) + "…";
    return out;
  }

  function typeLocal(el, text) {
    return new Promise(function (resolve) {
      var i = 0;
      el.textContent = "";
      function tick() {
        i += 2;
        el.textContent = text.slice(0, i);
        scrollMessages();
        if (i < text.length) {
          window.setTimeout(tick, 12);
        } else {
          resolve(text);
        }
      }
      tick();
    });
  }

  function scrollMessages() {
    var box = $("#ask-mark-messages");
    if (box) box.scrollTop = box.scrollHeight;
  }

  function addMsg(role, text) {
    var box = $("#ask-mark-messages");
    var el = document.createElement("div");
    el.className = "ask-mark__msg ask-mark__msg--" + role;
    el.textContent = text || "";
    box.appendChild(el);
    scrollMessages();
    return el;
  }

  function setBusy(on) {
    busy = !!on;
    var send = $("#ask-mark-send");
    var input = $("#ask-mark-input");
    if (send) send.disabled = busy;
    if (input) input.disabled = busy;
  }

  function openPanel(open) {
    var root = $("#ask-mark");
    var panel = $("#ask-mark-panel");
    var btn = $("#ask-mark-toggle");
    if (!root || !panel || !btn) return;
    root.classList.toggle("ask-mark--open", open);
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      var input = $("#ask-mark-input");
      if (input) input.focus();
    }
  }

  async function streamLlm(question, botEl) {
    var puter = await ensurePuter();
    var response = await puter.ai.chat(conversation.concat([{ role: "user", content: question }]), false, {
      model: MODEL,
      stream: true,
    });
    var answer = "";
    for await (var part of response) {
      if (part && part.text) {
        answer += part.text;
        botEl.textContent = answer;
        scrollMessages();
      }
    }
    if (!answer) throw new Error("Empty model response");
    conversation.push({ role: "user", content: question });
    conversation.push({ role: "assistant", content: answer });
    while (conversation.length > MAX_HISTORY + 1) {
      conversation.splice(1, 1);
    }
    return answer;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (busy) return;
    var input = $("#ask-mark-input");
    var question = (input.value || "").trim();
    if (!question) return;
    input.value = "";
    addMsg("user", question);
    setBusy(true);

    var botEl = addMsg("bot", "");
    botEl.innerHTML =
      '<span class="ask-mark__typing" aria-label="Thinking"><span></span><span></span><span></span></span>';

    try {
      await streamLlm(question, botEl);
    } catch (err) {
      console.warn("ask-mark: LLM unavailable, using local fallback", err);
      var text = localAnswer(question, kb);
      var note =
        "\n\n(Answered from Mark's site bio — full AI chat may ask you to sign in with Puter once.)";
      await typeLocal(botEl, text + note);
      if (conversation) {
        conversation.push({ role: "user", content: question });
        conversation.push({ role: "assistant", content: text });
      }
    } finally {
      setBusy(false);
      var again = $("#ask-mark-input");
      if (again) again.focus();
    }
  }

  function mountChips(data) {
    var row = $("#ask-mark-suggestions");
    if (!row) return;
    row.innerHTML = "";
    (data.suggested || []).forEach(function (label) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "ask-mark__chip";
      b.textContent = label;
      b.addEventListener("click", function () {
        var input = $("#ask-mark-input");
        if (!input || busy) return;
        input.value = label;
        $("#ask-mark-form").dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      });
      row.appendChild(b);
    });
  }

  function buildUi() {
    var root = document.createElement("div");
    root.id = "ask-mark";
    root.className = "ask-mark";
    root.innerHTML =
      '<button type="button" id="ask-mark-toggle" class="ask-mark__toggle" aria-expanded="false" aria-controls="ask-mark-panel" title="Ask about Mark">' +
      '<i class="fa-solid fa-comments" aria-hidden="true"></i>' +
      '<span class="ask-mark__toggle-label">Ask Mark</span>' +
      "</button>" +
      '<div id="ask-mark-panel" class="ask-mark__panel" role="dialog" aria-label="Ask Mark chatbot" hidden>' +
      '<div class="ask-mark__header">' +
      '<div class="ask-mark__header-text">' +
      '<p class="ask-mark__title">Ask Mark</p>' +
      '<p class="ask-mark__subtitle">Questions about education, work, projects, and contact</p>' +
      "</div>" +
      '<button type="button" id="ask-mark-close" class="ask-mark__close" aria-label="Close chat">&times;</button>' +
      "</div>" +
      '<div id="ask-mark-messages" class="ask-mark__messages" aria-live="polite"></div>' +
      '<div id="ask-mark-suggestions" class="ask-mark__suggestions"></div>' +
      '<form id="ask-mark-form" class="ask-mark__form">' +
      '<label class="sr-only" for="ask-mark-input">Your question</label>' +
      '<input id="ask-mark-input" class="ask-mark__input" type="text" maxlength="500" autocomplete="off" placeholder="Ask about Mark…" />' +
      '<button id="ask-mark-send" class="ask-mark__send" type="submit">Send</button>' +
      "</form>" +
      '<p class="ask-mark__footnote">AI answers use Mark\'s public bio. First LLM reply may prompt a free Puter sign-in.</p>' +
      "</div>";
    document.body.appendChild(root);

    $("#ask-mark-toggle").addEventListener("click", function () {
      openPanel(!root.classList.contains("ask-mark--open"));
    });
    $("#ask-mark-close").addEventListener("click", function () {
      openPanel(false);
    });
    $("#ask-mark-form").addEventListener("submit", handleSubmit);
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && root.classList.contains("ask-mark--open")) openPanel(false);
    });
  }

  function init() {
    buildUi();
    loadJson(KB_URL)
      .catch(function () {
        return {
          name: "Haoxuan (Mark) Sun",
          summary: "Personal site of Haoxuan (Mark) Sun.",
          sections: [],
          suggested: ["How can I contact him?"],
        };
      })
      .then(function (data) {
        kb = data;
        conversation = [{ role: "system", content: buildSystemPrompt(data) }];
        mountChips(data);
        addMsg(
          "bot",
          "Hi — ask me about " +
            (data.short_name || "Mark") +
            "'s education, experience, projects, or how to get in touch."
        );
        ensurePuter().catch(function () {
          /* optional until first send */
        });
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
