# Product Requirements Document (PRD)

## Title

**Radix-Ready Animation System for shadcn-angular**
*(Combined: Behavior-aware animation layer + shadcn-style animation presets)*

---

## 1. Purpose & Vision

Build a **first-class animation system for shadcn-angular** that:

* Feels identical to **shadcn/ui (React)**
* Respects **Radix philosophy** (state-driven, headless, composable)
* Sits cleanly on top of **Angular CDK**
* Is optional, extensible, and design-system friendly

> The system must make animations feel *native*, not bolted on.

---

## 2. Core Design Principles

### 2.1 Separation of Concerns

* **Behavior** → Angular CDK + shadcn-angular primitives
* **State exposure** → data attributes / host bindings
* **Animation** → CSS / Tailwind / Angular Animations (consumer choice)

Animation must **never**:

* Control state
* Affect accessibility
* Block lifecycle events

---

### 2.2 Radix Compatibility Contract

The animation system must work purely via:

* State signals (`open`, `closed`, `entering`, `exiting`)
* Structural stability during exit animations

No animation logic inside primitives.

---

## 3. Scope

### In Scope

* Animation lifecycle model
* State exposure API
* Default animation presets (shadcn clone)
* Tailwind-first implementation
* Angular animation compatibility

### Out of Scope

* Custom motion engines
* Timeline editors
* Physics-based animation engines

---

## 4. Target Users

* Design system engineers
* Angular enterprise teams
* Developers migrating from shadcn/ui (React)
* Teams building branded UI kits

---

## 5. Animation Architecture (Radix-Ready Layer)

### 5.1 Animation Lifecycle States

Each animated primitive must expose **4 explicit phases**:

| Phase      | Description                      |
| ---------- | -------------------------------- |
| `closed`   | Fully hidden, not interactive    |
| `entering` | Mounting + animation in progress |
| `open`     | Fully visible & interactive      |
| `exiting`  | Animation running before unmount |

These must be available as:

* Host bindings
* Data attributes

Example (conceptual):

* `data-state="open"`
* `data-state="closed"`
* `data-motion="from-start"`

---

### 5.2 Presence Handling (Critical)

**Requirement:**
Components must not be destroyed until exit animation completes.

**Implementation direction:**

* Structural directive similar to `Presence`
* Delay detach/unmount until animation end

This is mandatory for:

* Dialog
* Popover
* Dropdown
* Tooltip
* Sheet

---

### 5.3 Direction & Context Awareness

Expose directional metadata:

* Side (`top`, `bottom`, `left`, `right`)
* Alignment (`start`, `center`, `end`)

Used for:

* Slide animations
* Transform origins

---

## 6. State Exposure API

### 6.1 Required Host Attributes

Every animated primitive must expose:

* `data-state`
* `data-side` (if positional)
* `data-align` (if applicable)

These attributes are **stable contracts**.

---

### 6.2 Angular Signals Integration

Internally, primitives may use:

* Signals / Observables

Externally, **only attributes matter**.

This mirrors Radix’s DOM-first philosophy.

---

## 7. shadcn Animation Clone Layer

This layer provides **opinionated defaults**, optional by design.

---

### 7.1 Default Animation Tokens

| Token           | Value    |
| --------------- | -------- |
| Duration (fast) | 150ms    |
| Duration (base) | 200ms    |
| Duration (slow) | 300ms    |
| Easing (in)     | ease-out |
| Easing (out)    | ease-in  |

Tokens must be configurable via:

* CSS variables
* Tailwind config

---

### 7.2 Standard Animations (Parity with shadcn/ui)

#### Fade

* Used by: Tooltip, Overlay
* Opacity: 0 → 1

#### Scale

* Used by: Dialog, Popover
* Scale: 0.95 → 1

#### Slide

* Used by: Sheet, Dropdown
* Direction-aware

#### Combo (Fade + Scale)

* Default for Dialog / Popover

---

### 7.3 Animation Naming Convention

Animations must follow shadcn semantics:

* `animate-in`
* `animate-out`
* `fade-in`
* `fade-out`
* `zoom-in-95`
* `zoom-out-95`
* `slide-in-from-top`
* `slide-out-to-bottom`

This ensures **mental model compatibility** with React shadcn users.

---

## 8. Tailwind-First Implementation

### 8.1 Attribute-Based Triggers

Animations activate via:

* `data-state=open`
* `data-state=closed`

No JS toggling.

---

### 8.2 Zero Runtime Cost

* No JS animation orchestration
* CSS handles transitions
* Angular only controls presence

---

## 9. Angular Animations Compatibility

### Optional Layer

If users opt-in:

* Provide animation hooks
* Expose lifecycle events

But:

* No hard dependency on `@angular/animations`

---

## 10. Component Coverage (Phase 1)

| Component     | Animation         |
| ------------- | ----------------- |
| Dialog        | Fade + Scale      |
| Alert Dialog  | Fade + Scale      |
| Popover       | Fade + Scale      |
| Dropdown Menu | Fade + Slide      |
| Tooltip       | Fade              |
| Sheet         | Directional Slide |
| Toast         | Slide + Fade      |

---

## 11. Non-Functional Requirements

* Tree-shakeable
* SSR-safe
* Works without Tailwind (CSS fallback)
* No runtime warnings

---

## 12. Success Metrics

* shadcn/ui parity demos pass visually
* Zero animation-related a11y regressions
* No forced animation usage
* Developers can disable animations globally

---

## 13. Future Enhancements

* Motion presets API
* Reduced-motion support
* Staggered group animations
* Gesture-based transitions

---

## 14. Final Positioning Statement

> **shadcn-angular animations are Radix-compatible, Angular-native, and visually identical to shadcn/ui—without sacrificing control, accessibility, or performance.**

---

End of PRD
