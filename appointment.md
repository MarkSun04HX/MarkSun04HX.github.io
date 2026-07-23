---
layout: page
title: Book an appointment
subtitle: Request a time to meet with Mark
permalink: /appointment/
---

{% assign notify_email = site.ask_mark.notify_email | default: site.contact.email %}
{% assign w3_key = site.web3forms_access_key | default: "" | strip %}

<p class="mb-4">Use this form to propose a meeting — coffee chat, career conversation, project discussion, or collaboration. Include preferred <strong>time</strong>, <strong>location</strong> (or video link preference), and how to reach you. Requests go to <strong>{{ notify_email }}</strong>.</p>

<p class="small text-muted border rounded p-3 mb-4" style="border-color:#dde4ec;background:#f8fafc;">This is a <strong>request</strong>, not a confirmed booking. Mark will reply to confirm or suggest another slot. Response time varies with coursework and travel.</p>

{% if w3_key == "" %}
<p class="small border rounded p-3 mb-4" style="border-color:#fde68a;background:#fffbeb;">
  <strong>Email delivery setup:</strong> FormSubmit activation links often break. This site now uses <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer">Web3Forms</a> instead.
  Until an access key is added in <code>_config.yml</code> (<code>web3forms_access_key</code>), <strong>Submit</strong> will open your email app with a pre-filled message (still works).
</p>
{% endif %}

<form id="appointment-form" class="appointment-form contact-form" novalidate>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="appt-name">Your name <span class="text-danger">*</span></label>
      <input class="form-control" type="text" id="appt-name" name="name" required maxlength="120" autocomplete="name" placeholder="Full name" />
    </div>
    <div class="form-group col-md-6">
      <label for="appt-email">Your email <span class="text-danger">*</span></label>
      <input class="form-control" type="email" id="appt-email" name="email" required maxlength="200" inputmode="email" autocomplete="email" placeholder="you@example.com" />
    </div>
  </div>

  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="appt-phone">Phone / WeChat / other contact</label>
      <input class="form-control" type="text" id="appt-phone" name="phone_or_wechat" maxlength="120" autocomplete="tel" placeholder="Optional secondary contact" />
    </div>
    <div class="form-group col-md-6">
      <label for="appt-people">Who is coming <span class="text-danger">*</span></label>
      <input class="form-control" type="text" id="appt-people" name="people" required maxlength="300" placeholder="e.g. just me · me + 1 classmate · recruiting team" />
    </div>
  </div>

  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="appt-datetime">Preferred date &amp; time <span class="text-danger">*</span></label>
      <input class="form-control" type="datetime-local" id="appt-datetime" name="preferred_datetime" required />
      <p class="small text-muted mb-0 mt-1">Use your local timezone; mention another option in notes if needed.</p>
    </div>
    <div class="form-group col-md-6">
      <label for="appt-duration">Approx. duration</label>
      <select class="form-control" id="appt-duration" name="duration">
        <option value="15 minutes">15 minutes</option>
        <option value="30 minutes" selected>30 minutes</option>
        <option value="45 minutes">45 minutes</option>
        <option value="60 minutes">60 minutes</option>
        <option value="Flexible">Flexible</option>
      </select>
    </div>
  </div>

  <div class="form-group">
    <label for="appt-location">Location / format <span class="text-danger">*</span></label>
    <input class="form-control" type="text" id="appt-location" name="location" required maxlength="300" placeholder="e.g. Zoom · Google Meet · NUS campus · Winston-Salem café" />
  </div>

  <div class="form-group">
    <label for="appt-topic">Topic / purpose <span class="text-danger">*</span></label>
    <input class="form-control" type="text" id="appt-topic" name="topic" required maxlength="300" placeholder="e.g. career chat · project feedback · research idea" />
  </div>

  <div class="form-group">
    <label for="appt-notes">Notes for Mark</label>
    <textarea class="form-control" id="appt-notes" name="notes" rows="5" maxlength="4000" placeholder="Context, alternate times, links, or anything else useful"></textarea>
  </div>

  <div class="d-none" aria-hidden="true">
    <label for="appt-gotcha">Leave this empty</label>
    <input type="text" id="appt-gotcha" name="botcheck" tabindex="-1" autocomplete="off" />
  </div>

  <p id="appt-error" class="small text-danger d-none" role="alert"></p>
  <p id="appt-success" class="alert alert-success d-none" role="status">Thanks — your appointment request was sent. Mark will reply by email when he can.</p>

  <button type="submit" id="appt-submit" class="btn btn-primary">Submit request</button>
  <p class="small text-muted mt-3 mb-0">Prefer email? Write directly to <a href="mailto:{{ notify_email }}">{{ notify_email }}</a> or use <a href="{{ '/contact/' | relative_url }}">Contact</a>.</p>
</form>

<script>
(function () {
  var form = document.getElementById('appointment-form');
  if (!form) return;

  var notifyEmail = {{ notify_email | jsonify }};
  var submitBtn = document.getElementById('appt-submit');
  var errEl = document.getElementById('appt-error');
  var okEl = document.getElementById('appt-success');

  function showError(msg) {
    if (!errEl) return;
    errEl.textContent = msg || '';
    errEl.classList.toggle('d-none', !msg);
  }

  function collect() {
    return {
      name: document.getElementById('appt-name').value.trim(),
      email: document.getElementById('appt-email').value.trim(),
      phone_or_wechat: document.getElementById('appt-phone').value.trim() || '(none)',
      people: document.getElementById('appt-people').value.trim(),
      preferred_datetime: document.getElementById('appt-datetime').value,
      duration: document.getElementById('appt-duration').value,
      location: document.getElementById('appt-location').value.trim(),
      topic: document.getElementById('appt-topic').value.trim(),
      notes: document.getElementById('appt-notes').value.trim() || '(none)',
      page: window.location.href,
      submitted_at: new Date().toISOString()
    };
  }

  function toMailtoBody(data) {
    return [
      'Appointment request',
      '',
      'Name: ' + data.name,
      'Email: ' + data.email,
      'Phone/WeChat: ' + data.phone_or_wechat,
      'People: ' + data.people,
      'Preferred datetime: ' + data.preferred_datetime,
      'Duration: ' + data.duration,
      'Location: ' + data.location,
      'Topic: ' + data.topic,
      'Notes: ' + data.notes,
      '',
      'Page: ' + data.page
    ].join('\n');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    showError('');
    if (okEl) okEl.classList.add('d-none');

    var gotcha = document.getElementById('appt-gotcha');
    if (gotcha && gotcha.value) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var data = collect();
    var subject = 'Appointment request — ' + data.name;

    if (!window.SiteMail || !window.SiteMail.hasAccessKey()) {
      if (window.SiteMail && window.SiteMail.mailtoFallback) {
        window.SiteMail.mailtoFallback(notifyEmail, subject, toMailtoBody(data));
      } else {
        window.location.href =
          'mailto:' + notifyEmail +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(toMailtoBody(data));
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    window.SiteMail.send(data, { subject: subject, from_name: 'Appointment form' })
      .then(function () {
        form.reset();
        if (okEl) {
          okEl.classList.remove('d-none');
          okEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      })
      .catch(function (err) {
        console.warn('appointment form', err);
        showError('Automatic send failed — opening your email app as a backup.');
        setTimeout(function () {
          if (window.SiteMail && window.SiteMail.mailtoFallback) {
            window.SiteMail.mailtoFallback(notifyEmail, subject, toMailtoBody(data));
          }
        }, 400);
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit request';
        }
      });
  });
})();
</script>
