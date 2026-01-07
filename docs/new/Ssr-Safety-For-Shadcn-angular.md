# Product Requirements Document (PRD)

## Title

**SSR-Safe Design System for shadcn-angular**
*Server-Side Rendering compatible, Angular-native, Radix-ready, shadcn-style*

---

## 1. Purpose & Vision

Ensure that **all shadcn-angular components, primitives, and animation/contrast layers** are fully **SSR-compatible**, such that:

* Pages render correctly on the server
* No runtime hydration errors occur
* Universal apps (Angular Universal) can use the system out-of-the-box
* Supports critical SEO and performance goals

> The system must behave consistently in SSR and client contexts without workarounds.

---

## 2. Design Principles

### 2.1 Deterministic Rendering

* DOM structure must be identical between server and client
* No random IDs without deterministic generation
* No side-effects on first render

### 2.2 State Hydration Safety

* Primitives (Dialog, Tabs, Accordion, etc.) expose state safely
* No client-only hooks that break SSR
* Animation presence & exit logic defers to client safely

### 2.3 No Direct `window` / `document` Calls on Server

* All browser-only APIs wrapped in SSR guards
* Portals / overlays use Angular CDK `isPlatformBrowser` checks

### 2.4 CSS-Only Animations / Tailwind Friendly

* Avoid JS-dependent animations during server render
* Use `data-state` attributes, CSS transitions, Tailwind variants
* Client hydration can enhance with motion libraries

### 2.5 Token / Theme Injection SSR Ready

* Tokens (colors, typography, spacing) injected via Angular DI
* Fallbacks in place if server cannot compute values
* Supports theme switching after hydration

---

## 3. Scope

### In Scope

* All 100 UI blocks SSR compatibility
* Animation / motion handling safe on server
* Contrast and theme token injection SSR-safe
* Overlay & portal rendering in SSR context
* Conditional rendering & presence management

### Out of Scope

* Non-Angular frameworks
* Browser-only utilities outside Angular lifecycle
* Non-deterministic content generation (random seeds, unique IDs) without safeguards

---

## 4. Target Users

* Enterprise Angular developers
* SEO-conscious SaaS apps
* Progressive Web Apps with server rendering
* Teams building universal shadcn-angular systems

---

## 5. SSR Safety Contract

Every component/block must:

* Render **static markup** on server
* Avoid **hydration mismatches**
* Provide **deterministic IDs** for overlays, modals, tooltips
* Expose **data attributes** for animations and state without JS
* Lazy-enhance animations on client if needed

---

## 6. SSR Patterns for Core Blocks

### 6.1 Portals / Overlays

* Use `isPlatformBrowser` to attach portals
* Server renders placeholder markup
* Client hydrates portal content dynamically

### 6.2 Animation & Motion

* Server: only `data-state` attributes + static styles
* Client: animate-in/animate-out handled after hydration

### 6.3 Conditional Components

* Use `ngIf` / `ng-template` carefully to avoid mismatch
* Render fallback static markup on server
* Hydrate interactive behavior on client

### 6.4 Randomized or Dynamic IDs

* Use deterministic generator based on input keys
* Avoid `Math.random` or `Date.now()` on server

### 6.5 Theme & Token Injection

* Tokens provided via Angular DI / InjectionToken
* Server renders fallback / default token values
* Client can re-apply theme seamlessly

---

## 7. Success Metrics

* 0 hydration errors in Angular Universal apps
* SEO crawlers see fully-rendered content
* Animation and interactive components hydrate correctly
* 100% of 100 UI blocks render correctly on server
* No flicker / mismatch between SSR and client

---

## 8. Non-Functional Requirements

* SSR-safe modules tree-shakeable
* Minimal performance overhead on server
* Compatible with Angular Ivy & Standalone components
* Supports lazy loading & module splitting
* Works with Tailwind JIT classes without runtime errors

---

## 9. Future Enhancements

* Hydration-aware animation library integration
* Optimized static snapshots for SEO and Lighthouse scores
* Auto-detect and warn if block is not SSR-compatible
* Extend SSR-safety contract to enterprise workflows

---

## 10. Final Positioning Statement

> **shadcn-angular is fully SSR-safe, deterministic, and universal-ready. Components hydrate predictably, animations enhance gracefully, and SEO is preserved, giving Angular developers confidence for any production environment.**

---

End of PRD
