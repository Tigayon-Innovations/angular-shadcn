# shadcn/ui Parity Audit — page by page

**Goal:** make the Angular port match shadcn/ui's design exactly.

**Method.** The live site `ui.shadcn.com` is blocked by this environment's
network policy, so it can't be screenshotted. Instead the **real shadcn/ui v4
source** was cloned from GitHub (`shadcn-ui/ui`, `apps/v4`) and used as the
spec. This is authoritative and more precise than screenshots: shadcn's design
is defined by deterministic Tailwind classes + CSS variables, so matching the
source tokens/markup reproduces the same pixels. Reference paths below point
into that tree (`apps/v4/...`).

Screenshots of the Angular app (before/after, light + dark, 1440px) are in the
session under `/tmp/audit/`.

---

## Foundation — DONE (biggest lever)

The port had **drifted** from shadcn's tokens, which is the root cause of the
"not quite shadcn / AI-slop" feel. Fixed to match `apps/v4/app/globals.css`
exactly:

| Token | shadcn v4 | was (Angular) | now |
|---|---|---|---|
| `--foreground` / `--primary` (light) | `oklch(0% 0 0)` pure black | `0.145` / `0.205` grey | **fixed** |
| `--muted-foreground` (light) | `0.556` | `0.45` | **fixed** |
| `--destructive-foreground` | `oklch(0.97 0.01 17)` | white | **fixed** |
| chart-1..5 | blue scale | orange/teal/violet | **fixed → blue** |
| `--border`/`--input` (dark) | translucent white `1 0 0 /10–15%` | solid grey `0.269` | **fixed** |
| `--accent` (dark) | `0.371` | `0.269` | **fixed** |
| `--surface/--code/--selection/--code-*` | present | **absent** | **added** |
| `::selection` color | yes | no | **added** |

Also added shadcn's `container` (`max-w-[1400px] px-4 lg:px-8`), `border-grid`,
and `section-soft` utilities. Fonts already matched (Geist sans + Geist Mono;
shadcn uses Geist for headings too).

---

## Page-by-page

Status key: ✅ done this pass · ⚠️ partial · ⛔ todo · ❓ needs product decision

### `/` Home — ❓ + ✅
- **shadcn** (`apps/v4/app/(app)/(root)/page.tsx`): the home IS the live
  dashboard-cards demo ("Build your component library"), not a marketing page.
- **Ours**: a bespoke "Radix + shadcn, rebuilt for Angular" marketing page.
- **Done**: headings now pure black; replaced the 6 multicolor gradient
  feature-icon chips with shadcn's neutral bordered icon treatment.
- **Decision needed**: keep the port's own marketing identity (recommended —
  it's a different product) **or** clone shadcn's exact dashboard-demo home.
  Everything below assumes "match shadcn's design language", not "delete the
  port's content".

### `/blocks`, `/blocks/:category` — ✅ (was the #1 complaint)
- **shadcn** (`components/block-display.tsx`, `block-viewer.tsx`): each block
  card renders the **live component** in a scaled/cropped preview window.
- **Was**: gray "Preview" placeholder boxes.
- **Done**: new `BlockThumbnail` mounts the real Angular block component scaled
  to fit (ResizeObserver), browser-guarded for SSR. Gallery + category pages now
  show real previews (Dashboard with charts, Login forms, Pricing, Settings…).
- **Remaining ⚠️**: shadcn adds a resizable preview (drag handle) + a top
  category filter bar on `/blocks`; ours uses a left sidebar. Cosmetic.

### `/blocks/:category/:slug` Block detail — ⚠️
- **shadcn**: `BlockViewer` with Preview/Code tabs, file tree, resizable frame.
- **Ours**: Preview/Code toggle + live render + install snippet. Functional,
  simpler. Fixed an SSR crash (dynamic render now browser-only).
- **Todo ⛔**: file tree + resizable frame for full parity.

### `/docs/*` (introduction, installation, theming, dark-mode, mcp-setup) — ⚠️
- **shadcn** (`app/(app)/docs/layout.tsx`): three-column — left nav, prose
  content (`max-w-3xl`), **right "On This Page" TOC**; breadcrumb above title;
  prev/next pager at the bottom; `border-grid` dividers.
- **Ours**: left nav + content only.
- **Todo ⛔**: add the right-hand TOC, breadcrumb, and prev/next pager; apply
  `border-grid`. Medium effort, high visual payoff.

### `/docs/components` list — ⚠️
- **shadcn**: components live in the left docs sidebar; no separate searchable
  grid landing.
- **Ours**: a searchable category-filtered card grid (Angular-specific). Styling
  is now on-token. Fine to keep; ensure card radius/borders use shadcn tokens.

### `/docs/components/:slug` Component detail — ⚠️
- **shadcn** (`components/component-preview.tsx`): a single bordered preview with
  **Preview / Code** tabs only.
- **Ours**: preview has an extra device-frame toolbar (phone/tablet/desktop +
  fullscreen + "Interactive" pill) that shadcn does not have — reads as non-shadcn.
- **Todo ⛔**: drop the device toolbar (or hide by default) to match shadcn's
  clean preview. The empty `Select` demo bug (tracked in DESIGN_AUDIT.md, P0)
  still applies here.

### `/charts` — ⚠️
- **shadcn** (`registry/.../charts`): Recharts in Card wrappers with
  `ChartContainer`, blue series, header + footer trend text.
- **Ours**: ApexCharts. Legend dots now blue (token fix). Series fills still
  render near-monochrome/dark — **todo ⛔**: set series colors to
  `var(--chart-1..5)` so areas/bars are visibly blue like shadcn.

### `/colors` — ✅ close
- Matches shadcn's Tailwind palette page well; on-token after the foundation fix.

### `/themes` — ✅ (was a 500)
- Now renders (client-rendered to avoid the SSR Dialog crash). Matches shadcn's
  "Add colors. Make it yours." preview-cards layout.

### `/theme-editor`, `/create`, `/playground`, `/docs/mcp-setup` — ❓
- Angular-port-specific; no shadcn equivalent. Keep, but restyle to shadcn
  language (neutral, `border-grid`, on-token). MCP page still has emoji/pill
  styling that's off-tone (tracked in DESIGN_AUDIT.md).

---

## Cross-cutting (apply once, helps every page)

1. **Header** (`components/site-header.tsx`): shadcn uses `border-grid border-b`,
   a `container-wrapper`, command-menu search, and a compact nav (Docs,
   Components, Blocks, Charts, Themes, Colors). Ours carries extra product nav
   (Theme Editor, Create, Playground) — acceptable, but apply `border-grid` and
   match spacing/height (`h-14`).
2. **Right-hand docs TOC** — the most visible missing shadcn element.
3. **Component preview** — remove the device toolbar.
4. **Chart series colors** — wire to `--chart-*`.

## Still open from the prior audit (DESIGN_AUDIT.md)
- **P0** `Select` renders empty (native `<select>` host swallows children) —
  affects the Select docs demo and any page using `<Select>`.
- **P0** GitHub PAT committed in `package.json` `repository.url` — revoke + scrub.
- Hardcoded "1.2k Stars"; blocks resizable preview; dashboard-01 chart placeholder.
