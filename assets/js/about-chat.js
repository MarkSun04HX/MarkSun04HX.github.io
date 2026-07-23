/**
 * Ask Mark — sitewide chatbot (Puter.js LLM + RAG over Jekyll corpus + local fallback).
 */
(function () {
  "use strict";

  var KB_URL = "/assets/data/about-chat-kb.json";
  var CORPUS_URL = "/assets/data/site-chat-corpus.json";
  var PUTER_SRC = "https://js.puter.com/v2/";
  var MODEL = "gpt-5.4-nano";
  var MAX_HISTORY = 12;
  var TOP_K = 8;
  var MAX_CONTEXT_CHARS = 12000;
  var RELATIONSHIP_REPLY =
    "That's personal — I won't share Mark's private life here. If you're curious, ask him yourself or see what you can discover the old-fashioned way. I can help with his public work, projects, and writing instead.";

  var cfg = window.ASK_MARK_CONFIG || {};
  var NOTIFY_ENABLED = cfg.notifyEnabled !== false;
  var NOTIFY_EMAIL = cfg.notifyEmail || "sunm80292@gmail.com";

  var kb = null;
  var corpusDocs = [];
  var searchDocs = [];
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

  function baseSystemPrompt(data) {
    return [
      "You are Ask Mark, a friendly assistant on Haoxuan (Mark) Sun's personal website.",
      "Answer ONLY using the SITE EXCERPTS provided with each user message (plus this bio summary).",
      "If the answer is not in the excerpts, say you do not know and suggest the Contact page or email sunm80292@gmail.com / sunhaoxuan@u.nus.edu.",
      "Do not invent degrees, jobs, GPAs, dates, phone numbers, or achievements.",
      "Be concise (usually 2–5 short sentences). Plain text only — no markdown.",
      "When helpful, mention the page title the fact came from.",
      "",
      "PERSONAL RELATIONSHIPS (strict): If anyone asks about Mark's dating life, girlfriend/boyfriend, partner, marriage, crush, romantic history, or similar private relationship topics, do NOT answer with facts or speculation. Warmly refuse and encourage them to ask Mark directly or try to discover on their own. Offer to help with public professional topics instead.",
      "",
      "BIO SUMMARY:",
      data.summary || "Personal site of Haoxuan (Mark) Sun.",
    ].join("\n");
  }

  function isRelationshipQuestion(query) {
    var q = String(query || "").toLowerCase();
    return /\b(girlfriend|boyfriend|fiancee?|fiancé|fiancée|wife|husband|married|marriage|dating|date\s+him|relationship|romantic|partner|crush|significant other|love life|in a relationship|seeing anyone|single\b|ex-?(girl|boy)?friend)\b/.test(
      q
    );
  }

  function buildSearchIndex(data, corpus) {
    var docs = [];
    (data.sections || []).forEach(function (sec) {
      docs.push({
        id: "kb:" + sec.id,
        title: sec.title,
        url: "/aboutme/",
        type: "bio",
        tags: sec.keywords || [],
        text: sec.text || "",
        boost: 2,
      });
    });
    (corpus.documents || []).forEach(function (doc) {
      docs.push({
        id: doc.id,
        title: doc.title || "Untitled",
        url: doc.url || "",
        type: doc.type || "page",
        tags: doc.tags || [],
        text: doc.text || "",
        boost: 1,
      });
    });
    return docs;
  }

  function tokenize(query) {
    return query
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(function (w) {
        return w.length > 2;
      });
  }

  function scoreDoc(query, doc) {
    var q = query.toLowerCase();
    var words = tokenize(query);
    var score = 0;
    var title = (doc.title || "").toLowerCase();
    var text = (doc.text || "").toLowerCase();
    var tags = (doc.tags || []).join(" ").toLowerCase();

    words.forEach(function (w) {
      if (title.indexOf(w) !== -1) score += 4;
      if (tags.indexOf(w) !== -1) score += 3;
      if (text.indexOf(w) !== -1) score += 1;
    });

    (doc.tags || []).forEach(function (kw) {
      if (q.indexOf(String(kw).toLowerCase()) !== -1) score += 3;
    });

    if (doc.type === "bio") score += 1;
    return score * (doc.boost || 1);
  }

  function retrieve(query) {
    var ranked = searchDocs
      .map(function (doc) {
        return { doc: doc, score: scoreDoc(query, doc) };
      })
      .filter(function (x) {
        return x.score > 0;
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });

    var picked = [];
    var used = 0;
    for (var i = 0; i < ranked.length && picked.length < TOP_K; i++) {
      var d = ranked[i].doc;
      var chunk = (d.text || "").slice(0, 1800);
      var block =
        "[" +
        (d.type || "page") +
        "] " +
        d.title +
        (d.url ? " (" + d.url + ")" : "") +
        "\n" +
        chunk;
      if (used + block.length > MAX_CONTEXT_CHARS && picked.length > 0) break;
      picked.push({ doc: d, score: ranked[i].score, block: block });
      used += block.length;
    }
    return picked;
  }

  function formatExcerpts(picked) {
    if (!picked.length) return "(No matching site excerpts found.)";
    return picked
      .map(function (x, i) {
        return "Excerpt " + (i + 1) + ":\n" + x.block;
      })
      .join("\n\n");
  }

  function localAnswer(query) {
    var q = query.toLowerCase().trim();
    if (isRelationshipQuestion(query)) return RELATIONSHIP_REPLY;
    if (/^(hi|hello|hey|yo|good (morning|afternoon|evening))\b/.test(q) || q.length < 3) {
      return (
        "Hi — I am Ask Mark. Ask about Mark's background, projects, blog posts, notes, or how to get in touch. I search across the public pages on this site."
      );
    }
    if (/who (are you|is (this|ask mark|the bot|the chatbot))/.test(q)) {
      return (
        "I am Ask Mark, a helper on this site. I answer from Mark's public pages and posts (not private résumé or class-notes sections)."
      );
    }

    var picked = retrieve(query);
    if (!picked.length) {
      return (
        "I could not find that on the public site pages. Try About, Projects, or Blog — or email sunm80292@gmail.com / sunhaoxuan@u.nus.edu."
      );
    }

    var out = picked
      .slice(0, 2)
      .map(function (x) {
        var t = x.doc.text || "";
        if (t.length > 420) t = t.slice(0, 417) + "…";
        return x.doc.title + ": " + t;
      })
      .join("\n\n");
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

  function userMessageWithContext(question) {
    var excerpts = formatExcerpts(retrieve(question));
    return (
      "SITE EXCERPTS (use only these):\n" +
      excerpts +
      "\n\nVISITOR QUESTION:\n" +
      question
    );
  }

  async function streamLlm(question, botEl) {
    var puter = await ensurePuter();
    var grounded = userMessageWithContext(question);
    var response = await puter.ai.chat(conversation.concat([{ role: "user", content: grounded }]), false, {
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
    conversation.push({ role: "user", content: grounded });
    conversation.push({ role: "assistant", content: answer });
    while (conversation.length > MAX_HISTORY + 1) {
      conversation.splice(1, 2);
    }
    return answer;
  }

  function notifyOwner(question) {
    if (!NOTIFY_ENABLED) return;
    if (!window.SiteMail || !window.SiteMail.hasAccessKey()) {
      console.warn("ask-mark: skip notify — add web3forms_access_key in _config.yml");
      return;
    }
    window.SiteMail.send(
      {
        question: question,
        page: typeof location !== "undefined" ? location.href : "",
        when: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        language: typeof navigator !== "undefined" ? navigator.language : "",
        notify_to: NOTIFY_EMAIL,
      },
      { subject: "Ask Mark — new chat question", from_name: "Ask Mark chatbot" }
    ).catch(function (err) {
      console.warn("ask-mark: notify email failed", err);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (busy) return;
    var input = $("#ask-mark-input");
    var question = (input.value || "").trim();
    if (!question) return;
    input.value = "";
    addMsg("user", question);
    notifyOwner(question);
    setBusy(true);

    var botEl = addMsg("bot", "");
    botEl.innerHTML =
      '<span class="ask-mark__typing" aria-label="Thinking"><span></span><span></span><span></span></span>';

    if (isRelationshipQuestion(question)) {
      await typeLocal(botEl, RELATIONSHIP_REPLY);
      if (conversation) {
        conversation.push({ role: "user", content: question });
        conversation.push({ role: "assistant", content: RELATIONSHIP_REPLY });
      }
      setBusy(false);
      var againRel = $("#ask-mark-input");
      if (againRel) againRel.focus();
      return;
    }

    try {
      await streamLlm(question, botEl);
    } catch (err) {
      console.warn("ask-mark: LLM unavailable, using local fallback", err);
      var text = localAnswer(question);
      var note =
        "\n\n(Answered from site pages — full AI chat may ask you to sign in with Puter once.)";
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
    var suggestions = (data.suggested || []).slice();
    if (suggestions.indexOf("What did he write about Arsenal?") === -1) {
      suggestions.push("What did he write about Arsenal?");
    }
    suggestions.forEach(function (label) {
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
      '<p class="ask-mark__subtitle">Answers from Mark’s public pages, posts, and notes</p>' +
      "</div>" +
      '<button type="button" id="ask-mark-close" class="ask-mark__close" aria-label="Close chat">&times;</button>' +
      "</div>" +
      '<div id="ask-mark-messages" class="ask-mark__messages" aria-live="polite"></div>' +
      '<div id="ask-mark-suggestions" class="ask-mark__suggestions"></div>' +
      '<form id="ask-mark-form" class="ask-mark__form">' +
      '<label class="sr-only" for="ask-mark-input">Your question</label>' +
      '<input id="ask-mark-input" class="ask-mark__input" type="text" maxlength="500" autocomplete="off" placeholder="Ask about Mark or this site…" />' +
      '<button id="ask-mark-send" class="ask-mark__send" type="submit">Send</button>' +
      "</form>" +
      '<p class="ask-mark__footnote">Searches public site content each time you ask. First LLM reply may prompt a free Puter sign-in.</p>' +
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
    Promise.all([
      loadJson(KB_URL).catch(function () {
        return {
          name: "Haoxuan (Mark) Sun",
          summary: "Personal site of Haoxuan (Mark) Sun.",
          sections: [],
          suggested: ["How can I contact him?"],
        };
      }),
      loadJson(CORPUS_URL).catch(function () {
        return { documents: [] };
      }),
    ]).then(function (pair) {
      kb = pair[0];
      corpusDocs = pair[1].documents || [];
      searchDocs = buildSearchIndex(kb, pair[1]);
      conversation = [{ role: "system", content: baseSystemPrompt(kb) }];
      mountChips(kb);
      var n = searchDocs.length;
      addMsg(
        "bot",
        "Hi — ask me about " +
          (kb.short_name || "Mark") +
          " or anything on this site. I search " +
          n +
          " public pages/posts for each question."
      );
      ensurePuter().catch(function () {});
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
