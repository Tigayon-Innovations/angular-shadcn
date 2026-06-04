---
applyTo: '**/*.ts,**/*.html'
---

# JobsGlobal Copilot Instructions

## Core Implementation Rules

- Use modern Angular syntax (`@if`, `@for`, `@switch`) and signal-first state patterns.
- Keep variables immutable where possible (`private readonly`, `public readonly`).
- Use HTML + Tailwind utilities only for styling; avoid introducing new SCSS/CSS files unless explicitly requested.
- Maintain dark mode parity for all new UI.
- Prefer `border-gray-300` as the default light border tone.
- Use meaningful, descriptive names for files, classes, methods, and signals.
- Wrap below-viewport and non-critical components in `@defer` blocks to reduce initial bundle size. Use `@defer (on viewport)` for below-fold content, `@defer (on idle)` for non-critical widgets, and `@defer (on interaction; prefetch on idle)` for interaction-triggered content.
- Avoid mock data unless the user explicitly asks for it.
- Do not create tests or extra documentation files unless explicitly requested.
- Separate each logical block inside a function body with a blank line (guard clauses, data prep, transformations, side-effects, return).
- Add a blank line between every method declaration in a class. Methods must always be visually separated.
- Do NOT add blank lines between consecutive declarations of the same groupable category (private injects, public injects, store aliases, single-line computed signals, writable signals, constants).
- Always add a blank line when transitioning from one member category to another.

## Folder Structure Rules

- Follow `src/app/modules/internal-workspace/projects` conventions.
- Keep domain/data logic under `core/`.
- Keep reusable UI under `shared/components/`.
- Keep route pages under `shared/pages/`.
- Keep modals under `shared/modals/` (`manage/`, `view/`, and feature modal host).
- Keep skeletons under `shared/skeletons/`.

## Skill-Driven Workflow

When a request matches one of the skills below, load and apply that skill before implementing.

### Skill Discovery and Loading Rules

- Treat `.github/skills/` as the authoritative repo-local skill library. Do not rely only on the abbreviated list below.
- First look for packaged skills at `.github/skills/<skill-name>/SKILL.md`. If the user explicitly names `$skill-name`, load that exact skill first.
- If no skill is explicitly named, choose the smallest matching set of skills by checking each skill's frontmatter `name` and `description`.
- `SKILL.md` is authoritative. Read `references/*` only when the skill points to them or when you need a concrete in-repo example.
- If a skill contains `agents/openai.yaml`, use it as a short summary or handoff prompt, not as a replacement for `SKILL.md`.
- Legacy standalone notes under `.github/skills/*.md`, such as `.github/skills/angular-signal-effect-untracked.md`, are still valid and should be applied when relevant.
- When a skill references concrete repository files, treat those files as canonical patterns before inventing a new structure.
- Apply the minimum number of skills needed, in this order when possible: planning, structure, page/component implementation, styling/copy, then review.
- Treat `.github/skills/` as the source of truth for repo-local skills. If this repository later introduces a mirror or sync script, keep any mirrored skill copies synchronized as part of the same change.

### Subagent Auto-Invocation System

The repository includes specialized subagents that automatically coordinate complex tasks. These subagents are defined as skills in `.github/skills/subagent-*/SKILL.md`:

**Available Subagents:**

- `subagent-planner`: Breaks down features into implementation tasks (tools: `['read', 'search']`)
- `subagent-implementer`: Writes production code following standards (tools: `['read', 'edit', 'search']`)
- `subagent-reviewer`: Audits code quality and security (tools: `['read', 'search']`)
- `subagent-architect`: Validates designs against patterns (tools: `['read', 'search']`)

**Auto-Invocation Rules:**

- Recognize keywords in user requests: "plan", "implement", "review", "architecture" → auto-invoke matching subagent
- For multi-step workflows (plan → implement → review), coordinate sequential subagent invocations
- For skill detection, coordinate subagents per pre-configured patterns when a task clearly benefits from architecture review before implementation
- For independent tasks, invoke multiple subagents in parallel and synthesize results

**Coordinator Agent:**

- Main Feature Builder agent (user-selectable in VS Code) orchestrates all subagent delegation
- Configured in `.vscode/Feature-Builder.agent.md` with subagent registry in `.vscode/agents.json`
- Automatically recognizes when tasks benefit from isolated subagent focus
- Collects and synthesizes results back to user

**Example Workflows:**

```
"Plan a new dashboard" → Auto-invoke Planner
"Implement the design" → Auto-invoke Implementer
"Review my code" → Auto-invoke Reviewer
"Validate architecture" → Auto-invoke Architect
"Plan, then implement a new admin dashboard" → Auto-invoke Planner, then Architect or Implementer as needed
```

See `.vscode/SUBAGENT-AUTO-INVOCATION.md` for complete documentation.

### Frequently used skills in this repository

This is a high-signal subset. Additional specialized skills also live under `.github/skills/` and should be used when they match the request.

- `$apple-ui-ux-design`
  - Use first for Apple-inspired homepage and authenticated/admin design work. It enforces planning-first, customer-first, minimal HIG-aligned design decisions before implementation.
- `$frontend-design`
  - Use for Angular UI design/refactors that should feel premium, minimal, and production-grade. Best for dashboards, analytics pages, KPI cards, filters, settings screens, sidebars, empty states, and restrained Apple-inspired interface polish.
- `$brand-voice`
  - Use for rewriting homepage, product, and admin copy in an Apple-inspired premium voice while keeping admin microcopy minimal and compliance-safe.
- `$tailwindcss-development`
  - Use for UI styling/restyling with Tailwind CSS v4 and responsive behavior.
- `$angular-component`
  - Use for Angular component creation and refactors that should follow repo component patterns.
- `$angular-forms`
  - Use for forms, validation, form architecture, and user-input flows.
- `$angular-signals`
  - Use for signal-first state modeling and reactive Angular patterns.
- `$angular-routing`
  - Use for route structure, navigation flows, guards, redirects, and router-driven UI.
- `$angular-http`
  - Use for API integration, resource loading flows, and HTTP data patterns.
- `$angular-deferrable-views`
  - Use when creating or refactoring templates to defer below-viewport and non-critical components with `@defer` blocks.
- `$clean-code`
  - Use for self-documenting TypeScript/Angular code, strong naming, blank-line discipline, and smaller focused functions.
- `$class-member-ordering`
  - Use to enforce consistent Angular class member ordering and vertical spacing.
- `$code-review`
  - Use after coding to audit changed files for naming, return types, function design, comment clutter, any types, and Angular convention violations.
- `$ui-ux-pro-max`
  - Use when a task needs broader design-system, accessibility, interaction, layout, typography, or responsive UX guidance beyond the Apple-inspired design direction.

## Selection Order for Complex Frontend Features

1. Start with `$apple-ui-ux-design` when the request emphasizes Apple-inspired direction, homepage refinement, customer-first planning, or minimal authenticated/admin UX.
2. Apply `$frontend-design` for Angular-specific premium layout, dashboard composition, and visual execution.
3. Apply `$angular-component` before creating or refactoring standalone Angular UI building blocks.
4. Apply `$angular-signals` for stateful interactive pages and derived UI state.
5. Apply `$angular-routing` when the flow depends on route structure or navigation behavior.
6. Apply `$angular-forms` for settings, onboarding, profile, and data-entry experiences.
7. Apply `$angular-http` when the page depends on loading, mutation, or API-driven product states.
8. Apply `$angular-deferrable-views` to defer below-fold and non-critical components.
9. Apply `$tailwindcss-development` for final UI styling consistency.
10. Apply `$brand-voice` when polishing homepage copy, product microcopy, or admin labels.
11. Apply `$class-member-ordering` to enforce consistent class member order.
12. Apply `$clean-code` during refactors that need clearer naming or better method structure.
13. Apply `$code-review` as the final quality gate before hand-off.

## Loading Pattern Rules

- Use `normal-loader` for page-level loading states.
- Use `table-skeleton` for table-level loading states.
- Keep interaction controls inside clickable rows wrapped with `stopPropagation` when needed.

## Quality Checks Before Hand-off

- Verify responsive behavior on mobile and desktop breakpoints.
- Verify light/dark contrast for text and controls.
- Verify route and import paths match existing local conventions.
- Verify no unrelated files were changed.

## Edit Tool - Whitespace Handling

The Read tool uses `→` to mark where line numbers end and file content begins.

**Rule:** Copy the EXACT whitespace that appears after the `→` marker.

- Whatever appears between `→` and the code text is what's actually in the file
- That whitespace must be used EXACTLY in Edit tool's old_string
- Don't count arrows, don't interpret - just copy what's after the `→`

**Example:**
14→ private byte tag;
For Edit, use: `		private byte tag;` (copy everything after →, including the two tabs)

**If Edit fails:** Stop and explain the problem. Do not attempt sed/awk/bash workarounds.

**IMPORTANT**: Trust the Read tool output. Copy what's after `→` into Edit immediately. DO NOT verify with sed/od/grep first - that's wasting time and the instructions already tell you to stop if Edit fails, not to pre-verify.
