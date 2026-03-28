---
name: apple-ui-ux-design
description: Design Apple-inspired homepage and authenticated product experiences with a planning-first workflow, minimal visual language, customer-first information hierarchy, and HIG-aligned usability. Use when the request calls for premium, calm, intuitive, highly polished UI/UX that should feel simple, spacious, and easy to use without copying Apple literally.
---

# Apple UI/UX Design

Use this skill when designing or refining public marketing pages, dashboards, admin panels, onboarding flows, settings screens, forms, and supporting UI that should feel Apple-inspired, minimal, and deeply usable.

## Core Goal

Create interfaces that feel calm, precise, and obvious to use. Start with customer understanding and task clarity before visual polish.

## Required Workflow

Follow this order every time:

1. Define the user, the primary task, and the one most important outcome.
2. Plan the information hierarchy before choosing components or styling.
3. Reduce the interface to the fewest necessary elements.
4. Build a clean visual system with consistent spacing, type, borders, and states.
5. Validate the result against usability, accessibility, and clarity.

Do not jump straight into styling before the structure is clear.

## Customer-First Planning Rules

Before implementing, identify:

- Who is using this page right now.
- What they are trying to accomplish.
- What they need to see first.
- What can be deferred, hidden, or removed.
- What might create hesitation, confusion, or extra effort.

Prioritize the customer's next step over feature exposure.

## Surface Direction

Use one of these two directions and keep the distinction clear:

- Homepage and public marketing surfaces: emotionally light, outcome-first, visually polished, with strong hero hierarchy and restrained storytelling.
- Authenticated and admin surfaces: more compact, task-led, operationally clear, with simple navigation and friction-free controls.

## Apple-Inspired Principles

- Clarity over cleverness.
- Hierarchy over decoration.
- Restraint over feature noise.
- Confidence over hype.
- Motion only when it improves understanding.
- Every element must earn its place.

## HIG-Aligned Interaction Rules

- Primary actions should be obvious without overpowering the screen.
- Navigation should be predictable and shallow whenever possible.
- Use familiar patterns for forms, tables, settings, and confirmation flows.
- Make status, selection, hover, focus, pressed, disabled, empty, and loading states easy to distinguish.
- Reduce decision fatigue by limiting visible choices at each moment.
- Keep copy short, direct, and supportive.
- Ensure controls are touch-friendly, keyboard-accessible, and visually calm.

## Homepage Design Rules

- Lead with one strong headline and one supporting statement.
- Keep hero actions limited to one primary CTA and one optional secondary CTA.
- Use generous spacing and strong section rhythm.
- Show proof or product value in a structured, low-noise way.
- Prefer neutral palettes, subtle depth, crisp typography, and sparse accent usage.
- Avoid stacking too many cards, badges, chips, or decorative flourishes above the fold.

## Authenticated and Admin Design Rules

- Design for speed of understanding and speed of action.
- Keep page headers concise and orient the user quickly.
- Group related controls into clear rails, toolbars, or surface blocks.
- Make dense information feel calm through spacing and alignment, not through oversized elements.
- Keep tables and forms highly legible with clear labels, strong row rhythm, and obvious actions.
- Use confirmation, destructive, and warning states with precision.
- Prefer fewer filters and clearer defaults over exposing every control at once.

## Visual System Rules

- Use a restrained palette: mostly white, near-white, graphite, and soft neutral grays.
- Introduce one disciplined accent color only when it improves orientation or emphasis.
- Prefer subtle borders and soft shadows over heavy fills.
- Use rounded corners with intention, not exaggeration.
- Typography should feel refined, highly readable, and not ornamental.
- Let spacing create luxury and ease.

## Minimalism Guardrails

Minimal does not mean empty. Never remove:

- critical labels
- context needed for decisions
- accessibility affordances
- feedback during async actions
- clear recovery paths for errors

If removing something makes the UI more ambiguous, put it back.

## Planning Output

For substantial UI work, create a short internal design plan that covers:

- user type
- core task
- page structure
- primary action
- key states
- visual direction
- risk areas for confusion

Then implement from that plan.

## Design Checklist

Use this checklist before shipping any Apple-inspired UI work:

- The user and primary task are explicitly identified.
- The layout shows the most important information first.
- The page has one clear primary action.
- Secondary actions do not compete with the primary action.
- Labels, statuses, and helper text are short and obvious.
- The interface feels minimal because of focus, not because information was removed blindly.
- Spacing is consistent and creates calm separation between sections.
- Typography is highly legible and restrained.
- Color usage is mostly neutral with one disciplined accent strategy.
- Borders, shadows, and radii are subtle and consistent.
- Empty, loading, error, disabled, hover, focus, and selected states are all designed.
- Forms and tables are easy to scan and act on.
- Navigation is predictable and does not create unnecessary choices.
- The experience is usable on both mobile and desktop.
- Accessibility basics are covered: contrast, keyboard access, focus visibility, and touch target sizing.
- Public pages feel polished and customer-led.
- Authenticated pages feel operational, quiet, and efficient.

## Recommended Companion Skills

Use these repo skills alongside this one when relevant:

- `.github/skills/frontend-design/SKILL.md` for Angular-specific premium UI implementation patterns
- `.github/skills/brand-voice/SKILL.md` for Apple-inspired copy and microcopy direction
- `.github/skills/tailwindcss-development/SKILL.md` for Tailwind utility execution
- `.github/skills/angular-component/SKILL.md` for Angular component structure
- `.github/skills/angular-forms/SKILL.md` for form architecture and validation

## Final Validation Checklist

- The first screen is understandable in a few seconds.
- The user knows what to do next without reading deeply.
- The layout feels calm, not sparse or unfinished.
- Interaction states are complete and accessible.
- Public pages feel premium and customer-led.
- Authenticated pages feel minimal, operational, and easy to use.
