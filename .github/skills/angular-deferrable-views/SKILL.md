---
name: angular-deferrable-views
description: Enforce mandatory use of Angular @defer blocks to lazy-load components below the viewport and optimize initial bundle size. Use when creating or refactoring templates that render heavy, below-fold, or conditionally visible components. Activates for any new page, modal, list, or section where deferring non-critical content improves LCP and TTFB.
---

# Angular Deferrable Views

Defer every component that is not needed for the initial above-fold render. Deferrable views (`@defer`) split code into separate chunks loaded on demand, reducing the main bundle and improving Core Web Vitals (LCP, TTFB, CLS).

## When to Defer (Mandatory)

| Scenario                                           | Trigger to Use                                                       |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| Component is below the viewport fold               | `on viewport`                                                        |
| Heavy component that is not immediately visible    | `on viewport` or `on idle`                                           |
| Modal content rendered conditionally               | `when condition`                                                     |
| Tabs/sections the user must click to reveal        | `on interaction`                                                     |
| Non-critical widgets (charts, maps, embeds)        | `on idle` or `on viewport`                                           |
| SSR-rendered content needing incremental hydration | `hydrate on idle` / `hydrate on viewport` / `hydrate on interaction` |

## When NOT to Defer

- Above-fold hero/primary content the user sees on first paint.
- Critical layout components (`page-header`, `page-container`, navigation).
- Components already eagerly needed by the parent template logic.

## Core Syntax

### Basic Deferral (Defaults to Idle Trigger)

```html
@defer {
<heavy-component />
}
```

### With Placeholder and Loading States

```html
@defer (on viewport) {
<analytics-chart />
} @placeholder {
<div class="h-64 animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
} @loading (after 100ms; minimum 500ms) {
<div class="flex items-center justify-center h-64">
  <span class="text-sm text-gray-500">Loading chart...</span>
</div>
} @error {
<p class="text-sm text-red-500">Failed to load chart.</p>
}
```

### Prefetching for Faster Interaction

```html
@defer (on interaction; prefetch on idle) {
<large-form />
} @placeholder {
<button class="btn">Click to load form</button>
}
```

### Conditional Deferral

```html
@defer (when isTabActive()) {
<tab-content />
} @placeholder {
<tab-skeleton />
}
```

### Hydration Triggers (SSR Only)

```html
@defer (hydrate on viewport) {
<below-fold-section />
} @placeholder {
<div class="h-96 bg-gray-50 dark:bg-neutral-900"></div>
}
```

## Available Triggers

| Trigger                | Behavior                                                      |
| ---------------------- | ------------------------------------------------------------- |
| `on idle`              | Loads when browser is idle (default)                          |
| `on viewport`          | Loads when placeholder enters viewport (IntersectionObserver) |
| `on interaction`       | Loads on click/keydown on placeholder                         |
| `on hover`             | Loads on mouseover/focusin                                    |
| `on immediate`         | Loads right after non-deferred content renders                |
| `on timer(500ms)`      | Loads after specified delay                                   |
| `when condition`       | Loads when expression becomes truthy                          |
| `prefetch on idle`     | Prefetches JS on idle, renders on main trigger                |
| `prefetch on viewport` | Prefetches JS when entering viewport                          |

## Hydration Triggers (SSR + Incremental Hydration)

| Trigger                  | Behavior                                 |
| ------------------------ | ---------------------------------------- |
| `hydrate on idle`        | Hydrates when browser is idle            |
| `hydrate on viewport`    | Hydrates when entering viewport          |
| `hydrate on interaction` | Hydrates on user interaction             |
| `hydrate on hover`       | Hydrates on hover                        |
| `hydrate on immediate`   | Hydrates immediately after other content |
| `hydrate on timer(ms)`   | Hydrates after delay                     |
| `hydrate when condition` | Hydrates when condition is truthy        |
| `hydrate never`          | Stays dehydrated (static content)        |

## Rules for This Repository

### Rule 1: Defer Below-Fold Components

Every component rendered below the viewport fold MUST be wrapped in `@defer (on viewport)` with a placeholder that matches the expected layout dimensions to prevent CLS.

```html
<!-- Good: below-fold section deferred -->
@defer (on viewport) {
<team-members-section />
} @placeholder {
<div class="h-64 animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
}

<!-- Bad: below-fold component eagerly loaded -->
<team-members-section />
```

### Rule 2: Use Skeleton Placeholders

When a project skeleton component exists (e.g., `table-skeleton`), use it as the `@placeholder`:

```html
@defer (on viewport) {
<issue-list [issueSignalStore]="store" />
} @placeholder {
<table-skeleton />
}
```

### Rule 3: Prefetch Heavy Interactions

For components that appear on user interaction (modals, expanded sections), use `prefetch on idle` so the JS is ready:

```html
@defer (on interaction; prefetch on idle) {
<advanced-filters />
} @placeholder {
<button>Show Filters</button>
}
```

### Rule 4: Standalone Components Only

Only standalone components can be deferred. Non-standalone components inside `@defer` are eagerly loaded regardless. Verify the component is standalone before wrapping.

### Rule 5: Avoid Cascading Nested Defers

When nesting `@defer` blocks, use different triggers to avoid simultaneous cascading requests:

```html
<!-- Good: different triggers -->
@defer (on viewport) {
<parent-section />
@defer (on interaction) {
<child-detail />
} }

<!-- Bad: same trigger causes cascade -->
@defer (on viewport) {
<parent-section />
@defer (on viewport) {
<child-detail />
} }
```

### Rule 6: Placeholder Dimensions Must Match

Always size `@placeholder` content to match the expected rendered dimensions of the deferred component. This prevents cumulative layout shift (CLS):

```html
@defer (on viewport) {
<chart-card class="h-80" />
} @placeholder {
<div class="h-80 animate-pulse rounded-xl bg-gray-100 dark:bg-neutral-800"></div>
}
```

### Rule 7: Accessibility with Live Regions

When deferred content replaces placeholder in a way that screen readers should announce, wrap the block in an `aria-live` region:

```html
<div aria-live="polite" aria-atomic="true">
  @defer (on viewport) {
  <status-panel />
  } @placeholder {
  <p>Loading status...</p>
  }
</div>
```

### Rule 8: HMR Override Awareness

During development with HMR active, all `@defer` chunks are fetched eagerly. Serve with `--no-hmr` to test actual defer behavior.

## Implementation Checklist

When creating or reviewing a template:

- [ ] Identify components below the viewport fold → wrap in `@defer (on viewport)`
- [ ] Identify conditionally visible components (tabs, modals, expanded sections) → wrap in `@defer (when condition)` or `@defer (on interaction)`
- [ ] Heavy non-critical widgets (charts, maps) → wrap in `@defer (on idle)` or `@defer (on viewport)`
- [ ] Add `@placeholder` with matching dimensions and skeleton/pulse styling
- [ ] Add `@loading` for components with noticeable fetch time
- [ ] Add `@error` for components that depend on network calls
- [ ] Add `prefetch on idle` for interaction-triggered defers
- [ ] Verify deferred components are standalone
- [ ] Verify no CLS from placeholder-to-content swap
- [ ] Maintain dark mode parity in placeholder styles (`dark:bg-neutral-800`)
