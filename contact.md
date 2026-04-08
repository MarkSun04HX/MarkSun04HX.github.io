---
layout: page
title: Contact
subtitle: Questions and requests
permalink: /contact/
---

{% assign formspree_id = site.contact.formspree_form_id | default: "" | strip %}

<p class="mb-4">Use this form for <strong>questions</strong>, <strong>collaboration ideas</strong>, or <strong>résumé / materials requests</strong>. I read everything; response time varies with coursework and travel.</p>

{% if formspree_id == "" %}
<p class="small text-muted border rounded p-3 mb-4" style="border-color:#dde4ec;background:#f8fafc;">This site is not yet wired to a form backend, so <strong>Send</strong> will open your email app with a pre-filled message to <a href="mailto:{{ site.contact.email }}">{{ site.contact.email }}</a>. To deliver straight from the page, add a <a href="https://formspree.io" target="_blank" rel="noopener noreferrer">Formspree</a> form id in <code>_config.yml</code> under <code>contact.formspree_form_id</code> (see README).</p>
{% endif %}

<form
  id="contact-form"
  class="contact-form"
  {% if formspree_id != "" %}
  action="https://formspree.io/f/{{ formspree_id }}"
  method="POST"
  {% else %}
  action="#"
  method="post"
  data-contact-mailto="true"
  {% endif %}
>
  {% if formspree_id != "" %}
  <input type="hidden" name="_next" value="{{ site.url }}/contact/?sent=1" />
  {% endif %}

  <div class="form-group">
    <label for="contact-your-email">Your email <span class="text-muted font-weight-normal">(optional, so I can reply)</span></label>
    <input class="form-control" type="email" id="contact-your-email" name="email" inputmode="email" autocomplete="email" placeholder="you@example.com" />
  </div>

  <div class="form-group">
    <label for="contact-subject">Title / subject</label>
    <input class="form-control" type="text" id="contact-subject" name="_subject" required maxlength="200" placeholder="Short summary of your message" />
  </div>

  <div class="form-group">
    <label for="contact-message">Message</label>
    <textarea class="form-control" id="contact-message" name="message" rows="8" required maxlength="12000" placeholder="Details, context, or questions"></textarea>
  </div>

  <p class="small text-muted">Delivered to <strong>{{ site.contact.email }}</strong>{% if formspree_id != "" %} via Formspree{% endif %}. When your address changes, update <code>contact.email</code> in <code>_config.yml</code> and your Formspree notification email if you use it.</p>

  <div class="d-none" aria-hidden="true">
    <label for="contact-gotcha">Leave this empty</label>
    <input type="text" id="contact-gotcha" name="_gotcha" tabindex="-1" autocomplete="off" />
  </div>

  <button type="submit" class="btn btn-primary">Send</button>
</form>

<p id="contact-sent-banner" class="alert alert-success mt-4 d-none" role="status">Thanks — your message was sent. I will get back to you when I can.</p>

<script>
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  if (new URLSearchParams(window.location.search).get('sent') === '1') {
    var banner = document.getElementById('contact-sent-banner');
    if (banner) banner.classList.remove('d-none');
    try {
      history.replaceState({}, '', window.location.pathname);
    } catch (e) {}
  }

  if (form.getAttribute('data-contact-mailto') === 'true') {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var gotcha = document.getElementById('contact-gotcha');
      if (gotcha && gotcha.value) return;

      var to = {{ site.contact.email | jsonify }};
      var subEl = document.getElementById('contact-subject');
      var msgEl = document.getElementById('contact-message');
      var fromEl = document.getElementById('contact-your-email');
      var subject = (subEl && subEl.value) ? subEl.value.trim() : '';
      var body = (msgEl && msgEl.value) ? msgEl.value.trim() : '';
      var from = (fromEl && fromEl.value) ? fromEl.value.trim() : '';
      if (!subject || !body) return;

      var fullBody = body;
      if (from) {
        fullBody = 'Reply-to: ' + from + '\n\n' + fullBody;
      }

      var href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(fullBody);
      window.location.href = href;
    });
  }
})();
</script>
