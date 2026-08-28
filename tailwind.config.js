/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./scripts/main.js"],
  theme: {
    extend: {
      colors: {
        "text-muted": "#888888",
        "primary-container": "#ff5e00",
        "on-surface": "#e5e2e1",
        "inverse-on-surface": "#313030",
        "inverse-surface": "#e5e2e1",
        "surface-border": "#1A1A1A",
        "surface-container": "#201f1f",
        "tertiary-fixed-dim": "#c9c6c5",
        "primary": "#ffb599",
        "surface-dim": "#131313",
        "on-primary-fixed-variant": "#7f2b00",
        "background": "#131313",
        "on-tertiary-fixed": "#1c1b1b",
        "inverse-primary": "#a63b00",
        "on-secondary-fixed": "#1a1c1c",
        "surface": "#131313",
        "primary-fixed": "#ffdbce",
        "on-primary-container": "#531900",
        "secondary-container": "#454747",
        "on-secondary-container": "#b4b5b5",
        "surface-container-lowest": "#0e0e0e",
        "on-primary": "#5a1c00",
        "secondary-fixed": "#e2e2e2",
        "on-background": "#e5e2e1",
        "outline": "#ab897d",
        "accent-glow": "rgba(255, 94, 0, 0.15)",
        "surface-bright": "#3a3939",
        "secondary": "#c6c6c7",
        "on-tertiary-container": "#2d2c2c",
        "tertiary-container": "#959393",
        "on-tertiary-fixed-variant": "#474646",
        "tertiary-fixed": "#e5e2e1",
        "surface-tint": "#ffb599",
        "on-tertiary": "#313030",
        "on-error-container": "#ffdad6",
        "on-surface-variant": "#e4bfb1",
        "on-error": "#690005",
        "primary-fixed-dim": "#ffb599",
        "surface-variant": "#353534",
        "error": "#ffb4ab",
        "on-primary-fixed": "#370e00",
        "surface-container-highest": "#353534",
        "surface-container-low": "#1c1b1b",
        "surface-container-high": "#2a2a2a",
        "on-secondary": "#2f3131",
        "on-secondary-fixed-variant": "#454747",
        "tertiary": "#c9c6c5",
        "secondary-fixed-dim": "#c6c6c7",
        "error-container": "#93000a",
        "outline-variant": "#5b4137"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        "2xl": "1rem",
        full: "0.75rem"
      },
      spacing: {
        "margin-mobile": "20px",
        "section-gap": "120px",
        "margin-desktop": "64px",
        "gutter": "24px",
        "container-max": "1280px",
        "unit": "8px"
      },
      fontFamily: {
        "headline-md": ["Hanken Grotesk", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "label-code": ["JetBrains Mono", "monospace"],
        "headline-lg-mobile": ["Hanken Grotesk", "sans-serif"],
        "display": ["Hanken Grotesk", "sans-serif"],
        "headline-lg": ["Hanken Grotesk", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "headline": ["Hanken Grotesk", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "headline-md": ["24px", { lineHeight: "1.4", fontWeight: "600" }],
        "label-caps": ["12px", { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "700" }],
        "label-code": ["14px", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "500" }],
        "headline-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "display": ["72px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "800" }],
        "headline-lg": ["40px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ]
};
