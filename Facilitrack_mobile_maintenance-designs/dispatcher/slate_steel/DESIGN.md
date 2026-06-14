---
name: Slate & Steel
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  h1:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  mono-sm:
    fontFamily: Geist Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-padding: 16px
  card-gap: 12px
---

## Brand & Style
The design system focuses on precision, reliability, and modern enterprise aesthetics. It is designed for high-performance facility management where clarity and ease of use are paramount.

The style is a refined take on **Modern Minimalism**, heavily inspired by the shadcn/ui aesthetic. It utilizes a neutral-heavy palette to ensure that status indicators (like alerts or completion states) remain the focal point. The interface feels premium through the use of generous whitespace, subtle border treatments, and soft, layered shadows that create a clear sense of depth without visual clutter.

**Target Audience:** Facility managers, maintenance technicians, and operations directors.
**Emotional Response:** Efficiency, professional trust, calmness under pressure, and systematic order.

## Colors
This design system utilizes a sophisticated grayscale-first palette to maintain an "Enterprise Pro" feel. 

- **Primary (Slate-900):** Used for primary actions, high-level headings, and active states.
- **Secondary (Slate-500):** Used for meta-data, descriptions, and placeholder text.
- **Accent/Success (Emerald):** Reserved specifically for completed work orders and healthy system statuses.
- **Warning/Destructive:** Used sparingly for overdue tasks or critical equipment failures.
- **Background (Slate-50):** A cool-toned off-white that reduces eye strain compared to pure white while maintaining a clean look.

## Typography
We use **Inter** for its exceptional legibility on mobile screens and its neutral, systematic character. 

- **Hierarchy:** Use `h1` for page titles (e.g., "Work Order #402") and `h2` for section headers within cards.
- **Utility:** Use `mono-sm` (Geist Mono or similar) for equipment IDs, serial numbers, and technical timestamps to distinguish them from descriptive text.
- **Weights:** Stick to 400 (Regular), 500 (Medium), and 600 (Semi-bold). Avoid Bold (700) to maintain the "light/airy" premium feel.

## Layout & Spacing
The layout follows a **Mobile-First Fixed-Width** approach (centered on larger screens but optimized for a 390px-430px viewport).

- **Grid:** Use a simple 4-column layout for internal card alignment.
- **Gaps:** Maintain a consistent `12px` or `16px` vertical gap between list items to ensure clear separation without breaking the flow.
- **Safe Areas:** All primary content must be inset by `16px` (container-padding) from the device edges. 
- **Rhythm:** Use an 8pt grid system. Elements should almost always have margins or paddings in multiples of 8.

## Elevation & Depth
Depth is created using a "Layered Surface" approach rather than heavy shadows.

- **Level 0 (Background):** Slate-50.
- **Level 1 (Cards/Sheet):** Pure White (#FFFFFF) with a 1px border of Slate-200.
- **Shadows:** Use a single, very soft "ambient" shadow for primary cards: `0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)`.
- **Active States:** When a card is pressed, it should scale slightly (0.98) and the shadow should diminish to simulate physical pressing.

## Shapes
The design uses generous rounding to evoke a modern, "soft-enterprise" feel.

- **Containers/Cards:** Use `rounded-xl` (1.5rem/24px) for main dashboard cards to give them a friendly, approachable look.
- **Buttons/Inputs:** Use `rounded-lg` (1rem/16px) for standard interactive elements.
- **Badges/Chips:** Always use a fully rounded `pill` shape for status indicators.
- **Icons:** Use Lucide icons with a 2px stroke width to match the weight of the Inter typeface.

## Components

- **Work Order Cards:** White background, 1px Slate-200 border, `rounded-xl`. High-contrast Title (Slate-900) and Secondary Metadata (Slate-500).
- **Status Badges:** Subtle background tints with high-contrast text (e.g., Success: Emerald-100 background with Emerald-700 text).
- **Buttons:** 
    - *Primary:* Slate-900 background, White text. 
    - *Secondary:* White background, Slate-200 border, Slate-900 text.
- **Inputs:** Simple 1px Slate-200 border that transitions to Slate-900 (or Ring-offset) on focus.
- **Timelines:** A vertical 2px Slate-200 line with 8px circular nodes. Active nodes use the Primary Slate-900 color.
- **Tabs:** Underline style with a 2px Slate-900 bar for active states, or the "Segmented Control" style using a Slate-100 background and white active toggle.
- **Icons:** Lucide icons sized to 20px for standard actions and 16px for inline metadata icons.