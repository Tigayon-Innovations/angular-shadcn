# Design Audit — shadcn-angular site

Audited on a live sandbox build (`ng serve`, Angular 22) at 1440×900 desktop, 390×844 mobile,
light and dark mode. Every route was screenshotted and reviewed against shadcn/ui as the
design reference. Findings are split into what was **fixed in this branch** and what
**still needs a decision or deeper work**.

---

## Fixed in this branch

### Build / functional (the site did not compile before these)

1. **Angular 22 compile failure** — 8 UI components declared an explicit
   `output()` (`valueChange`, `openChange`, `checkedChange`, `pressedChange`) alongside a
   `model()` of the same name, which Angular 22 rejects (NG1054) and which cascaded into
   NG2012 errors in every consumer. Removed the duplicate outputs; the `model()` signals
   already emit those events. Affected: collapsible, radio-group, select, sidebar-provider,
   slider, switch, toggle, toggle-group.
2. **`Input`/`Textarea` components never attached** — selectors were attribute-only
   (`input[Input]`, `textarea[Textarea]`) while every consumer writes `<Input>` /
   `<Textarea>` elements. Because Angular's schema check lowercases unknown tags to valid
   HTML, this silently degraded to *bare unstyled native inputs everywhere* (login blocks,
   settings, search fields, playground). Added element selectors (same pattern already used
   by `NativeSelect`) and added the missing `Input` imports in 9 consumer components.
3. **Block category pages empty** — `/blocks/login`, `/blocks/sidebar`, etc. all showed
   "No blocks found in this category". The route param is `:category` but the component
   declared `slug = input.required()`, so router input binding never matched. Renamed.
4. **`/themes` returned a 500** — the page renders Dialog overlays that crash Angular SSR
   serialization (NG0502). Route is now client-rendered (`RenderMode.Client`).
   Production prerender now completes.

### Design / content

5. **Broken header logo** — the Angular logo was hotlinked from
   `upload.wikimedia.org` and rendered as a broken-image icon on every page (worse in dark
   mode). Replaced with the existing inline mark + a `shadcn/angular` text wordmark,
   matching shadcn.com's brand pattern.
6. **Header overflow at 1440px** — "Theme Editor" wrapped to two lines, "GitHub" was
   clipped under the search box, and the Install button was cut off at the right edge.
   Removed the redundant GitHub nav link (the Stars button already covers it), added
   `whitespace-nowrap`, and narrowed the search trigger (`w-48 lg:w-64`).
7. **Stale version copy** — hero badge and Introduction page said "Angular 21"; the
   library ships Angular 22. Updated.
8. **Placeholder GitHub URLs** — header, footer, and ~40 docs pages linked to
   `github.com/example/shadcn-angular` (a dead link). Now point at
   `Tigayon-Innovations/angular-shadcn`.

---

## P0 — must fix before this is presentable

1. **`Select` is invisible wherever it's used.** The component selector is `Select`, so
   `<Select>` becomes a **native `<select>` host element** in the DOM
   (`document.createElement` lowercases tag names), and browsers refuse to render
   arbitrary children inside a `<select>`. The Select docs demo shows an empty preview with
   a floating chevron; every block/page that uses `<Select>` is affected. Fix requires
   changing the consumer-facing tag (e.g. `<UiSelect>`/`<SelectRoot>`) or restructuring the
   component — an API-breaking decision that should be made deliberately. Note
   `SelectTrigger` also has a literal `attr.data-slot="'select-trigger'"` attribute (binding
   written without brackets).
2. **GitHub personal access token committed in `package.json`** — `repository.url`
   embeds a `ghp_…` token. Revoke that token immediately and scrub it from the file (and
   ideally from git history). This is a security incident, not just a cosmetic issue.
3. **Blocks have no preview images.** The featured grid on `/blocks` and every category
   grid show gray "Preview" placeholder boxes. shadcn.com renders live, scaled previews.
   Either render the block components inline (scaled iframe/zoom wrapper) or generate
   static screenshots per block.
4. **Dashboard-01 block ships a "Chart visualization area" placeholder** instead of an
   actual chart, and its panel header says "Documents" over revenue stats. The flagship
   dashboard block must look finished.

## P1 — inconsistencies a design-literate visitor will notice

1. **Hardcoded "1.2k Stars"** in the header (`starCount = signal('1.2k')`). Fetch the real
   count from the GitHub API or remove the number.
2. **Mobile header has no brand** — the logo/wordmark is `hidden md:flex`, so on phones the
   header is just three icons. Show the wordmark on mobile.
3. **Home feature icons use off-system colors** (pink/orange/green/teal chips). shadcn's
   aesthetic is monochrome neutrals; the multicolor icon chips next to the neutral cards
   read as a different design system. Pick one accent treatment and apply it consistently
   (the hero gradient can stay as the single brand moment).
4. **MCP Setup page tone** — emoji in body copy ("🎉", "✨ One-Click Setup") and a
   pill-badge style not used elsewhere in the docs. Tighten to match the rest.
5. **Sidebar-02/03/07 and several blocks didn't compile until this branch** — they were
   silently broken by the same NG1054/NG2012 cascade; worth a visual QA pass per block now
   that they render.
6. **Playground "Custom Template" renderer logs `DOMParser is not defined`** during
   prerender (non-fatal but noisy in CI); guard the dynamic renderer for SSR.
7. **Date-picker demo NG8107 warning** (`dateControl.value?.toDateString()`) — trivial, but
   it's the only warning in an otherwise clean build.

## P2 — polish

- Docs layout: footer renders inside the viewport on short pages but content scrolls in an
  inner container; consider a single document scroll like shadcn.com.
- `/charts` interactive area chart renders monochrome by default; the legend chips
  (Desktop/Mobile) use colors the chart doesn't — align series colors with the legend.
- Search dialog ⌘K hint renders as squares if the system font lacks the glyph — consider
  `Ctrl K` text on non-mac platforms (there is already a `K` kbd).
- `environment.ts` is gitignored but required to compile (`google-ai.service.ts` imports
  it); add an `environment.example.ts` or default stub so fresh clones build.

---

### Verification

- `ng build` (production, prerender included) completes with zero errors.
- All 21 routes screenshot-verified after fixes; `/themes`, `/blocks/:category`,
  login/settings blocks, and the docs search render correctly.
