/**
 * Shared outbound email helper (Web3Forms). Used by appointment form + Ask Mark alerts.
 */
(function (global) {
  "use strict";

  var ENDPOINT = "https://api.web3forms.com/submit";

  function getConfig() {
    return global.SITE_MAIL_CONFIG || {};
  }

  function hasAccessKey() {
    var k = getConfig().accessKey;
    return !!(k && String(k).trim());
  }

  /**
   * @param {object} fields - flat string fields for the email body
   * @param {object} [opts]
   * @param {string} [opts.subject]
   * @param {string} [opts.from_name]
   * @returns {Promise<object>}
   */
  function send(fields, opts) {
    opts = opts || {};
    var cfg = getConfig();
    var key = (cfg.accessKey || "").trim();
    if (!key) {
      return Promise.reject(new Error("missing_access_key"));
    }

    var payload = Object.assign({}, fields, {
      access_key: key,
      subject: opts.subject || fields.subject || "Website form",
      from_name: opts.from_name || "MarkSun04HX.github.io",
    });
    delete payload.botcheck;

    return fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    }).then(function (r) {
      return r.json().then(function (body) {
        if (!r.ok || body.success === false) {
          var err = new Error((body && body.message) || "send_failed");
          err.body = body;
          throw err;
        }
        return body;
      });
    });
  }

  function mailtoFallback(to, subject, body) {
    var href =
      "mailto:" +
      encodeURIComponent(to).replace(/%40/g, "@") +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
    global.location.href = href;
  }

  global.SiteMail = {
    hasAccessKey: hasAccessKey,
    send: send,
    mailtoFallback: mailtoFallback,
  };
})(window);
