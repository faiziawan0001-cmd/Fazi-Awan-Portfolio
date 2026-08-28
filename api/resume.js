/* ============================================================
   api/resume.js — Vercel Serverless Function
   Receives resume interaction alerts and sends notifications
   to your inbox via the Resend email API.

   Env vars (set in Vercel dashboard — server-side only):
     RESEND_API_KEY   required — API key from resend.com
     RESEND_TO        default 'faiziawan.0001@gmail.com'
     RESEND_FROM      default 'Portfolio <onboarding@resend.dev>'
============================================================ */
'use strict';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const TO_ADDRESS = process.env.RESEND_TO || 'faiziawan.0001@gmail.com';
const FROM_ADDRESS = process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>';

// Rate limit: Max 5 actions per IP per minute (clicks + submits combined)
const RATE_LIMIT_MAX = 5;
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

function validateSubmit(body) {
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : ''; // optional note

  if (!name || name.length > 100) return { error: 'Please provide your name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return { error: 'Please provide a valid email address.' };
  }
  if (message.length > 2000) return { error: 'Note is too long (max 2000 characters).' };

  return { values: { name, email, message } };
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

  // Honeypot field for spam prevention
  if (body.website) {
    res.status(200).json({ ok: true });
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({ message: 'Too many requests. Please wait a minute.' });
    return;
  }

  const action = typeof body.action === 'string' ? body.action.trim() : '';

  if (action === 'click') {
    // Notify about resume button touch
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;padding:20px;border-radius:8px;">
        <h2 style="color:#ff5e00;margin-top:0;">📂 Resume Touch Alert</h2>
        <p>Hello Faizan,</p>
        <p>Someone clicked the <strong>"My resume"</strong> button on your portfolio website to view/request it.</p>
        <hr style="border:none;border-top:1px solid #ddd;margin:20px 0;">
        <p style="color:#666;font-size:12px;">This is an automated notification from your portfolio backend.</p>
      </div>`;

    const text = `Resume Touch Alert\n\nSomeone clicked the "My resume" button on your portfolio website to view/request it.`;

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
          subject: `📂 Resume Touch Alert - Someone opened your Resume!`,
          html,
          text
        })
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        console.error('Resend error (click):', response.status, errText);
      }

      res.status(200).json({ ok: true });
    } catch (err) {
      console.error('Resend click request failed:', err.message);
      res.status(200).json({ ok: true }); // Silent fail so user flow isn't disrupted
    }
    return;
  }

  if (action === 'submit') {
    // Validate request inputs
    const check = validateSubmit(body);
    if (check.error) {
      res.status(400).json({ message: check.error });
      return;
    }

    const { name, email, message } = check.values;
    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      message: escapeHtml(message)
    };

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;padding:20px;border-radius:8px;">
        <h2 style="color:#ff5e00;margin-top:0;">📄 Resume Requested</h2>
        <p>Hello Faizan,</p>
        <p>A user has requested your resume and submitted their details.</p>
        <div style="background:#f9f9f9;padding:15px;border-radius:4px;margin:15px 0;border-left:4px solid #ff5e00;">
          <p style="margin:5px 0;"><strong>Name:</strong> ${safe.name}</p>
          <p style="margin:5px 0;"><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
          <p style="margin:5px 0;"><strong>Message/Note:</strong> ${safe.message ? safe.message : '<em>No message left</em>'}</p>
        </div>
        <hr style="border:none;border-top:1px solid #ddd;margin:20px 0;">
        <p style="color:#666;font-size:12px;">This is an automated notification from your portfolio backend.</p>
      </div>`;

    const text = `Resume Requested\n\nName: ${name}\nEmail: ${email}\nMessage: ${message || 'No message left'}`;

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
          subject: `📄 Resume Requested by ${name}`,
          html,
          text
        })
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        console.error('Resend error (submit):', response.status, errText);
        res.status(502).json({ message: 'Request could not be submitted. Please try again or email me directly.' });
        return;
      }

      res.status(200).json({ ok: true });
    } catch (err) {
      console.error('Resend submit request failed:', err.message);
      res.status(502).json({ message: 'Request could not be submitted. Please try again or email me directly.' });
    }
    return;
  }

  res.status(400).json({ message: 'Invalid action.' });
};
