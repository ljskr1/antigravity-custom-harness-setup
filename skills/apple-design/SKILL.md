---
name: apple-design
description: Complete Apple Human Interface Guidelines (HIG) and Apple Web Design System standard. Use when designing, building, or auditing UI/UX for iOS, iPadOS, macOS, visionOS, SwiftUI, or Apple-styled photography-first web applications.
version: 2.0.0
license: MIT
tags:
  - design-system
  - apple
  - hig
  - swiftui
  - ios
  - macos
  - visionos
  - web-design
  - photography-first
  - ui-ux
  - audit
---

# Unified Apple Design System & Human Interface Guidelines (HIG)

This skill equips AI coding agents with the exact visual specifications, component architectures, typography metrics, color tokens, motion curves, and automated compliance auditing defined by **Apple's Human Interface Guidelines (HIG)** and **Apple's Web Gallery Design System**.

---

## 🎯 Operational Modes

### Mode 1 — Native Apple HIG (iOS / macOS / iPadOS / visionOS / SwiftUI)
When creating or styling native Apple platform applications:
1. **Navigation**: Bottom Tab Bar (iOS), Sidebar (macOS/iPad), Floating Ornaments (visionOS).
2. **Surfaces & Curvature**: 8pt spatial grid with continuous squircle curvature (`G2 continuity`).
3. **Typography**: SF Pro / New York scales with optical sizing and negative tracking on headlines.
4. **Materials**: Dynamic semantic system colors (Light & Dark OLED mode) and Liquid Frosted Glass (`backdrop-filter: blur(20px)`).
5. **Physics**: Apple spring physics (`cubic-bezier(0.25, 1, 0.5, 1)`) and tactile active feedback (`scale(0.97)`).

### Mode 2 — Apple Web & Marketing Gallery Design System (Apple.com Standard)
When building web applications, landing pages, or product showcases in Apple's web aesthetic:
1. **Museum Gallery Architecture**: Edge-to-edge product tiles alternating light (`#ffffff`, `#f5f5f7`) and dark (`#272729`, `#2a2a2c`) canvases acting as natural section dividers.
2. **Strict Color Discipline**: Single interactive accent—**Action Blue** (`#0066cc`), Focus Blue (`#0071e3`), and Sky Link Blue (`#2997ff` on dark). Pure black (`#000000`) is reserved strictly for global nav chrome and true void.
3. **Editorial Typography Cadence**:
   - SF Pro Display headlines (≥17px) carry negative tracking (`-0.28px` to `-0.374px`) for the signature "Apple tight" feel.
   - Body copy runs at **17px** with **1.47** line-height (not standard SaaS 16px).
   - Weight ladder is strictly `300 / 400 / 600 / 700` (weight 500 is deliberately absent).
4. **Elevation Discipline**: Exactly **one** drop-shadow in the entire system (`rgba(0, 0, 0, 0.22) 3px 5px 30px`), applied strictly to product imagery resting on a surface. Zero shadows on cards, buttons, or chrome; zero decorative CSS gradients.
5. **Component Standards**:
   - `button-primary`: Pill CTA (`rounded: 9999px`, active state `scale(0.95)`).
   - `sub-nav-frosted`: 52px sticky bar (`backdrop-filter: saturate(180%) blur(20px)`).
   - `store-utility-card`: 18px border radius with 1px hairline border (`#e0e0e0`).
   - Detailed specification: [references/apple-web-design.md](references/apple-web-design.md).

### Mode 3 — Apple HIG & Web Compliance Audit (0–100 Scoring Engine)
When auditing existing codebases or mockups:
1. Run the static audit tool:
   ```bash
   node skills/apple-design/scripts/audit-apple-design.mjs [path]
   ```
2. Verify WCAG relative luminance contrast ratios (minimum 4.5:1 for body copy).
3. Validate minimum touch targets (≥ 44×44 pt).
4. Enforce the 0–100 scoring rubric:
   - 🟢 **90–100 pts**: **Ship** — Meets Apple aesthetic and accessibility standards.
   - 🟡 **70–89 pts**: **Fix before release** — Address contrast or touch-target issues.
   - 🔴 **< 70 pts**: **Systematic redesign required** — Severe HIG violations.

---

## 🚫 Forbidden Anti-Patterns
- **NO Purple/Violet on Dark Themes**: Use Apple System Blue (`#0A84FF` / `#2997ff`) or semantic tints.
- **NO Harsh Drop Shadows**: Never use black un-diffused shadows. Only use ambient diffusion or the single product surface shadow.
- **NO Sharp 0px Corners**: All interactive elements must follow continuous squircle curvature or full pills (`rounded: 9999px`).
- **NO Decorative Gradients**: Depth comes from authentic lighting and photography, never CSS background gradients.
- **NO Weight 500 in Web Copy**: Use 400 for regular body, 600 for strong/display.

---

## 📦 Bundled Assets
- `skills/apple-design/assets/apple-web-tokens.css`: Complete CSS variables for web implementations.
- `skills/apple-design/assets/apple-tokens.css`: Native Apple HIG design tokens.
- `skills/apple-design/references/apple-web-design.md`: Full Apple Web Analysis & component reference.
- `skills/apple-design/scripts/audit-apple-design.mjs`: Automated CLI audit engine.
