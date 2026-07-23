---
layout: page
title: Book an appointment
subtitle: Request a time to meet with Mark
permalink: /appointment/
---

{% assign notify_email = site.ask_mark.notify_email | default: site.contact.email %}

<p class="mb-4">Use this form to propose a meeting — coffee chat, career conversation, project discussion, or collaboration. Include preferred <strong>time</strong>, <strong>location</strong> (or video link preference), and how to reach you. Submissions go to <strong>{{ notify_email }}</strong>.</p>

<p class="small text-muted border rounded p-3 mb-4" style="border-color:#dde4ec;background:#f8fafc;">This is a <strong>request</strong>, not a confirmed booking. Mark will reply to confirm or suggest another slot. Response time varies with coursework and travel.</p>

<form id="appointment-form" class="appointment-form contact-form" novalidate>
  <input type="hidden" name="_subject" value="Appointment request — Mark Sun site" />
  <input type="hidden" name="_template" value="table" />
  <input type="hidden" name="_captcha" value="false" />

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
    <input type="text" id="appt-gotcha" name="_gotcha" tabindex="-1" autocomplete="off" />
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

    var data = {
      _subject: 'Appointment request — Mark Sun site',
      _template: 'table',
      _captcha: 'false',
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

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    fetch('https://formsubmit.co/ajax/' + encodeURIComponent(notifyEmail), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(function (r) {
        return r.json().then(function (body) {
          return { ok: r.ok, body: body };
        });
      })
      .then(function (res) {
        if (!res.ok && res.body && res.body.success === 'false') {
          throw new Error(res.body.message || 'Could not send request');
        }
        form.reset();
        if (okEl) {
          okEl.classList.remove('d-none');
          okEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      })
      .catch(function (err) {
        console.warn('appointment form', err);
        showError(
          'Could not send automatically. Please email ' +
            notifyEmail +
            ' directly, or try again after confirming FormSubmit in your inbox.'
        );
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
