---
name: Deep Space Portfolio
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e4bfb1'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ab897d'
  outline-variant: '#5b4137'
  surface-tint: '#ffb599'
  primary: '#ffb599'
  on-primary: '#5a1c00'
  primary-container: '#ff5e00'
  on-primary-container: '#531900'
  inverse-primary: '#a63b00'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#c9c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#959393'
  on-tertiary-container: '#2d2c2c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbce'
  primary-fixed-dim: '#ffb599'
  on-primary-fixed: '#370e00'
  on-primary-fixed-variant: '#7f2b00'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  surface-border: '#1A1A1A'
  text-muted: '#888888'
  accent-glow: rgba(255, 94, 0, 0.15)
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

The design system is engineered for a high-end developer and founder persona. It radiates technical authority, precision, and a "premium-dark" aesthetic. The brand personality is sophisticated and focused, catering to an audience of CTOs, investors, and high-tier collaborators who value clean code and visionary thinking.

The visual style is a fusion of **Minimalism** and **Glassmorphism**. It utilizes a nearly-black canvas to allow content to breathe, accented by razor-sharp typography and subtle translucent overlays. The goal is to evoke the feeling of a high-performance IDE or a premium physical hardware interface—utilitarian yet luxurious.

- **Minimalism:** Aggressive use of whitespace (negative space) and a strictly limited color palette.
- **Glassmorphism:** Used sparingly for navigational elements and cards to provide a sense of depth and layering without cluttering the visual field.
- **Precision:** Every element is aligned to a strict grid, reflecting the methodical nature of software engineering.

## Colors

The color strategy centers on "True Dark" aesthetics. The background uses a tiered approach: `#050505` for the base canvas and `#0A0A0A` for elevated containers, creating a sense of infinite depth. 

- **Primary Accent:** `#FF5E00` (Safety Orange) is used exclusively for calls to action, active states, and critical highlights. It provides a high-energy contrast against the dark background.
- **Typography:** Pure White (`#FFFFFF`) is reserved for headlines to ensure maximum readability, while muted grays are used for secondary content to establish a clear hierarchy.
- **Interactive States:** Use the `accent-glow` for subtle hover effects and backlighting to simulate an emissive hardware display.

## Typography

Typography is the primary vehicle for the "Founder" aesthetic. We use **Hanken Grotesk** for display and headlines; its sharp, contemporary geometry feels both architectural and modern. 

**Inter** handles body copy for maximum legibility on high-resolution screens. To emphasize the "Developer" aspect of the portfolio, **JetBrains Mono** is utilized for labels, metadata, and technical specifications, providing a functional, monospaced rhythm to technical details.

- **Hierarchy:** Maintain a dramatic contrast between `display` and `body` sizes.
- **Refinement:** Use negative letter-spacing on large headlines to create a "tight" editorial look.
- **Technicality:** Always use monospaced fonts for dates, version numbers, or code snippets.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop to ensure a controlled, gallery-like presentation of work. A 12-column grid is used with generous gutters to maintain a clean, airy feel despite the dark theme.

- **Rhythm:** All spacing is based on an 8px baseline. Vertical gaps between sections should be significant (120px+) to allow the user to focus on one project or concept at a time.
- **Mobile Adaptivity:** On mobile, the grid collapses to a single column with 20px side margins. Padding within cards and containers should be reduced by 25% compared to desktop to maximize screen real estate.
- **Alignment:** Use asymmetrical layouts (e.g., content spanning columns 2-10) to create visual interest and emphasize the minimalist "founder" aesthetic.

## Elevation & Depth

In a dark-mode-first system, depth is created through **Tonal Layering** and **Subtle Outlines** rather than heavy shadows.

- **Surface Tiers:** The base level is `#050505`. Floating elements like cards or navigation bars use `#0A0A0A`.
- **Ghost Borders:** Instead of shadows, use 1px solid borders in `#1A1A1A` to define the edges of containers. 
- **Backdrop Blurs:** Navigation menus and modals should use a 20px Gaussian blur with a 70% opaque `#0A0A0A` fill to create a glassmorphic effect that maintains context of the content underneath.
- **Emissive Highlights:** Use a 2px top-border of the primary color (`#FF5E00`) on active cards or focused inputs to simulate a "glowing" edge.

## Shapes

The shape language is "Soft-Industrial." While the brand is modern, it avoids overly "bubbly" or circular elements to maintain a professional, serious tone.

- **Corners:** Use a consistent `0.25rem` (4px) radius for most UI elements (buttons, inputs, cards). This provides a hint of approachability while appearing mostly sharp and precise.
- **Interactive Elements:** Buttons may use slightly more rounded corners (`0.5rem`) to distinguish them from structural containers.
- **Icons:** Use linear, 2px stroke icons with sharp or slightly rounded caps to match the typography's weight.

## Components

### Buttons
- **Primary:** Background `#FF5E00`, text `#FFFFFF`, 4px radius. High-impact, used for main CTAs.
- **Secondary:** Background transparent, border 1px `#FFFFFF`, text `#FFFFFF`. Hover state fills with white and changes text to `#050505`.
- **Tertiary/Ghost:** Text `#888888`, no border. Hover state changes text to pure white.

### Cards
- Background `#0A0A0A`, border 1px `#1A1A1A`. 
- Hover state: Border changes to `#FF5E00` or applies the `accent-glow` box-shadow.

### Input Fields
- Background `#050505`, border 1px `#1A1A1A`, text `Inter 16px`. 
- Focus state: Border becomes `#FF5E00` with a subtle outer glow.

### Chips / Tags
- Background `#1A1A1A`, text `JetBrains Mono 12px`, `#888888`.
- Used for tech stack lists (e.g., "React", "TypeScript").

### Lists
- Clean, no bullets. Use 1px bottom border `#1A1A1A` to separate list items in a "data-table" style.

### Navigation
- Sticky top bar with backdrop blur. Use `label-caps` for links with an animated 1px underline on hover.