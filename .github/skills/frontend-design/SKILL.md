---
name: frontend-design
description: Create or refactor Angular dashboards, internal tools, and application surfaces in this repository with a minimalist Vercel/Apple-like UI direction. Use when building premium-feeling admin pages, analytics views, cards, tables, filters, sidebars, settings screens, empty states, or polished dashboard refactors that should feel quiet, sharp, spacious, and production-ready rather than generic.
license: Complete terms in LICENSE.txt
---

# Frontend Design

Use this skill for Angular UI work that should feel premium, minimal, and highly intentional.

## Design Direction

Commit to one calm direction before coding:

- Tone: Vercel-like restraint with Apple-like clarity and polish
- Palette: mostly neutral surfaces with one disciplined accent color
- Layout: spacious, structured, and density-aware rather than sparse for its own sake
- Signature detail: one memorable but restrained moment such as a segmented control bar, ultra-clean KPI rail, or elegant command strip

Do not mix multiple competing aesthetics in the same feature.

## Required Workflow

1. Audit the target feature's folder structure, routing style, and styling approach before editing.
2. Decide whether the surrounding area is Tailwind-first, SCSS-first, standalone, or legacy module-driven, then stay consistent.
3. Sketch the dashboard shell first: header, actions, summary cards, filters, primary content, and optional secondary panel.
4. Build the layout and information hierarchy before decorative polish.
5. Add all product states: loading, empty, error, hover, focus, selected, and disabled.
6. Finish with spacing, border, typography, and motion refinement.

## Angular Implementation Rules

- Prefer Angular-native patterns already supported here: `signal`, `computed`, `@if`, `@for`, and standalone components when the target area already uses them.
- In older feature areas, respect the existing component/module structure instead of forcing a broad architectural rewrite.
- Keep templates declarative and move derived state into TypeScript.
- Reuse nearby shared primitives before inventing new wrappers.
- When building a new page shell, align with the closest existing dashboard shell nearby and use `.github/skills/apple-ui-ux-design/SKILL.md` when the request explicitly calls for Apple-inspired direction.

## Visual Rules

- Favor quiet neutrals, precise spacing, soft depth, and strong hierarchy.
- Use thin borders, subtle shadows, generous radii, and clean card grouping.
- Keep typography refined and restrained. Prioritize crisp labels, compact helper text, and confident metric numerals.
- Let whitespace create premium feel; do not rely on heavy gradients or decorative clutter.
- Use one accent color with discipline for active states, charts, highlights, and primary calls to action.

Avoid these patterns unless the user explicitly asks for them:

- loud gradient backgrounds
- neon glows
- glassmorphism on every surface
- dense badge overload
- playful or novelty typography
- generic "AI SaaS" hero/dashboard styling

## Dashboard Composition

- Header: title, concise context, and one clear primary action
- Summary row: 3-5 KPI cards with strong numerals and restrained delta text
- Filter rail: search, segmented tabs, date range, and compact quick filters in one organized strip
- Primary content: table, list, chart, or split panel inside a strong surface container
- Secondary content: insights, activity, notes, or detail panels only if they clarify the main workflow

Default to fewer sections with stronger hierarchy rather than many competing cards.

## Styling Rules

- Prefer Tailwind utilities for new UI in modern/shared workspace flows.
- If the target feature already leans on `.scss`, keep utility usage light and place repeated or complex visual rules in the stylesheet.
- Use CSS variables for feature-level tokens when multiple surfaces share the same palette, spacing rhythm, or shadow system.
- Preserve dark-mode parity when the surrounding feature supports it. Prefer restrained neutral dark surfaces and keep contrast strong enough for tables, forms, and actions.

## Motion Rules

- Keep motion subtle, fast, and useful.
- Favor small opacity, transform, and shadow transitions over dramatic choreography.
- Use stagger only when it clarifies hierarchy on initial load.
- Hover, active, and focus states should feel tactile but quiet.

## Validation Checklist

- The first screen read is clear in under three seconds.
- Primary actions are obvious without shouting.
- Cards, tables, and filters feel like one system.
- Mobile and laptop layouts both preserve hierarchy.
- Empty and loading states feel designed, not forgotten.
- The result feels calmer and sharper than the surrounding legacy UI without breaking local conventions.

## Reference Patterns

Read `references/angular-minimalist-dashboard-patterns.md` before introducing a new dashboard layout system.

Use these repo skills alongside this one when relevant:

- `.github/skills/apple-ui-ux-design/SKILL.md`
- `.github/skills/brand-voice/SKILL.md`
- `.github/skills/tailwindcss-development/SKILL.md`
- `.github/skills/angular-component/SKILL.md`
