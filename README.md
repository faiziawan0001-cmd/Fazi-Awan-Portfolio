# Fazi Awan — Malik Nexus Portfolio

A premium single-page portfolio website built from Stitch design assets. Optimised for Vercel deployment.

## 🚀 Deploy to Vercel

### Method 1 — Vercel Dashboard (recommended)
1. Push this repository to GitHub/GitLab
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. **No build command needed** (static site — Vercel auto-detects)
5. Set **Output Directory** to `.` (root)
6. Add environment variables from `.env.example`
7. Click **Deploy**

### Method 2 — Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## 📁 Project Structure

```
/
├── index.html          ← SPA entry point (all sections)
├── styles/
│   └── main.css        ← Custom CSS extending Tailwind
├── scripts/
│   └── main.js         ← Carousel, nav, form, animations
├── vercel.json         ← Routing, headers, cache config
├── .env.example        ← Environment variable template
├── .gitignore
└── README.md
```

## ⚙️ Environment Variables

Copy `.env.example` → `.env` and fill in values:

| Variable | Description | Required |
|---|---|---|
| `CONTACT_ENDPOINT` | Form POST URL (e.g. Formspree) | No (demo mode if empty) |
| `GA_MEASUREMENT_ID` | Google Analytics 4 ID | No |
| `GITHUB_URL` | GitHub profile link | No |
| `LINKEDIN_URL` | LinkedIn profile link | No |

## 🎨 Tech Stack

- **HTML5** — Semantic, accessible markup
- **Tailwind CSS v3** — CDN, design tokens from Stitch
- **Vanilla JS** — No framework overhead
- **Google Fonts** — Hanken Grotesk, Inter, JetBrains Mono
- **Material Symbols** — Icon system

## 📬 Contact Form Setup

1. Create a free account at [Formspree.io](https://formspree.io)
2. Create a new form → copy the endpoint URL
3. Set `CONTACT_ENDPOINT=https://formspree.io/f/YOUR_ID` in Vercel environment variables

## 🔒 Security Headers (via vercel.json)

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restricting camera/mic/geolocation

## 📄 License

© 2025 Fazi Awan — Malik Nexus. All rights reserved.
