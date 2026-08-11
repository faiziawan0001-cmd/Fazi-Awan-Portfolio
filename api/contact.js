/* ============================================================
   api/contact.js — Vercel Serverless Function
   Receives contact form submissions and sends them to your
   inbox via the Resend email API.

   Env vars (set in Vercel dashboard — server-side only):
     RESEND_API_KEY   required — API key from resend.com
     RESEND_TO        default 'faiziawan.0001@gmail.com'
     RESEND_FROM      default 'Portfolio <onboarding@resend.dev>'
============================================================ */
'use strict';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const TO_ADDRESS = process.env.RESEND_TO || 'faiziawan.0001@gmail.com';
const FROM_ADDRESS = process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>';

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const ipHits = new Map();

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validate(body) {
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || name.length > 100) return { error: 'Please provide your name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return { error: 'Please provide a valid email address.' };
  }
  if (!message || message.length > 5000) return { error: 'Please write a message (max 5000 characters).' };
  if (subject.length > 200) return { error: 'Subject is too long.' };

  return { values: { name, email, subject, message } };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set in Vercel environment variables.');
    res.status(500).json({ message: 'Server is not configured. Please try again later.' });
    return;
  }

  let body;
  try {
    body = await readBody(req);
  } catch (err) {
    res.status(400).json({ message: 'Invalid request body.' });
    return;
  }

  if (body.website) {
    res.status(200).json({ ok: true });
    return;
  }

  if (isRateLimited(getClientIp(req))) {
    res.status(429).json({ message: 'Too many messages. Please try again in a minute.' });
    return;
  }

  const check = validate(body);
  if (check.error) {
    res.status(400).json({ message: check.error });
    return;
  }

  const { name, email, subject, message } = check.values;
  const displaySubject = subject ? `: ${subject}` : '';
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message)
  };

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#ff5e00;">New contact form message${subject ? ' — ' + safe.subject : ''}</h2>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
      <p><strong>Subject:</strong> ${safe.subject || '—'}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:20px 0;">
      <p style="white-space:pre-line;">${safe.message}</p>
    </div>`;

  const text = `Name: ${name}\nEmail: ${email}\nSubject: ${subject || '—'}\n\n${message}`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        reply_to: [email],
        subject: `New message from ${name}${displaySubject}`,
        html,
        text
      })
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.error('Resend error:', response.status, errText);
      res.status(502).json({ message: 'Message could not be sent. Please try again or email me directly.' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend request failed:', err.message);
    res.status(502).json({ message: 'Message could not be sent. Please try again or email me directly.' });
  }
};
