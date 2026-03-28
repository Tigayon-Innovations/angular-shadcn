# Angular Minimalist Dashboard Patterns

Use these patterns when the request calls for a quiet premium dashboard language.

## Core Visual System

- Background: soft neutral canvas, not pure white unless the feature is intentionally stark
- Surface: white or near-white cards with faint borders and restrained shadows
- Radius: usually `rounded-2xl` or `rounded-3xl`
- Borders: low-contrast separators that define structure without shouting
- Accent: one dark or muted accent for active states and key actions
- Copy hierarchy: short labels, strong numbers, muted supporting text

## Layout Recipe

Use this order unless the task clearly needs something else:

1. Header with title, subtitle, and primary action
2. KPI rail with compact metric cards
3. Unified toolbar for search, tabs, filters, and date controls
4. Main content card for table, chart, feed, or split layout
5. Optional side insights panel only if it reduces context switching

## Surface Recipes

### Page shell

- Outer spacing should feel generous on desktop and compressed but breathable on mobile.
- Separate page background from card surfaces so the dashboard has depth without heavy decoration.

### KPI cards

- Keep each card to one label, one primary metric, and one supporting trend or status line.
- Prefer horizontal rhythm and aligned baselines over decorative icons.
- Use icons sparingly and only when they improve scan speed.

### Filter/tool bar

- Keep all controls on one visual plane.
- Use segmented controls, pills, and search fields with consistent height and border treatment.
- Avoid mixing too many button styles in the same toolbar.

### Table/list surface

- Use one parent surface with a clear header, optional helper text, and a quiet divider before rows.
- Actions should cluster to the right and never overpower the data.
- Empty states should preserve the same card shell instead of switching to an unrelated layout.

## Tailwind Direction

For new Angular UI in this repository, default to a tokenized neutral system:

```html
<section
  class="min-h-full bg-[#f5f5f2] text-slate-900 dark:bg-neutral-950 dark:text-neutral-100"
></section>
```

```html
<div
  class="rounded-[28px] border border-black/5 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] dark:border-neutral-800 dark:bg-neutral-900"
></div>
```

If the feature already uses component SCSS heavily, keep the HTML readable and move repeated visual values into local CSS variables.

## CSS Variable Starter

Use feature-local variables when the design needs repeated visual consistency:

```css
:host {
  --fd-bg: #f5f5f2;
  --fd-surface: rgba(255, 255, 255, 0.92);
  --fd-border: rgba(15, 23, 42, 0.08);
  --fd-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
  --fd-text: #0f172a;
  --fd-muted: #64748b;
  --fd-accent: #111827;
}
```

## Angular Behavior Patterns

- Use `signal` or `computed` for local dashboard UI state such as selected tabs, range presets, or panel expansion.
- Use `@for` for card or row rendering in modern templates.
- Keep chart, table, and filter state separate enough that each region can be refined independently.
- For legacy areas, improve the interface without forcing a full migration to new Angular patterns.

## What Good Looks Like

- The page feels calm on first load.
- There is a clear visual backbone from header to content.
- Metrics are readable at a glance.
- Tables and filters feel premium without becoming ornate.
- The design improves the product signal rather than competing with it.
