---
name: code-review
description: Post-coding review agent that audits changed or new TypeScript/Angular files against clean code standards. Use after implementing a feature, refactoring, or before committing to catch naming issues, missing return types, comment clutter, god functions, any types, and structural violations. Triggers when the user asks for a code review, quality check, or wants to verify code before merging.
---

# Code Review

Run a structured review pass on changed/new files after coding is complete.

## When to Invoke

- After completing a feature implementation.
- Before committing or creating a PR.
- When the user requests a code review or quality check.
- As the final step in the `Selection Order for Complex Frontend Features`.

## Review Process

### Step 1: Identify Files to Review

Determine the scope:

- If the user specifies files, review those.
- If a recent implementation just finished, review all files that were created or modified.
- Use `get_changed_files` or ask the user for the file list.

### Step 2: Run the Checklist

For each `.ts` and `.html` file, evaluate against these categories. Report findings grouped by file.

#### A — Naming (from `$clean-code`)

| Check                                         | Fail Condition                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------- |
| Variable names are descriptive nouns          | Generic names: `data`, `result`, `temp`, `item`, `value`, `info`, `stuff` |
| Booleans use `is`/`has`/`can`/`should` prefix | `loading`, `active`, `valid` without prefix                               |
| Functions use verb + noun                     | `process()`, `run()`, `execute()` without noun                            |
| Event handlers use `on` prefix                | `handleClick()`, `clickHandler()`                                         |
| Collections are pluralized                    | `candidate` for an array, `list` suffix                                   |
| No abbreviations (except `id`, `url`, `api`)  | `cnt`, `mgr`, `btn`, `lbl`, `cfg`, `msg`                                  |

#### B — Return Types

| Check                                       | Fail Condition                |
| ------------------------------------------- | ----------------------------- |
| Public methods have explicit return type    | `public fetch() { ... }`      |
| Private methods have explicit return type   | `private calculate() { ... }` |
| Protected methods have explicit return type | `protected map() { ... }`     |

Exceptions: simple callbacks in `.pipe()`, `.map()`, `.filter()`, and trivially obvious single-expression computed signals.

#### C — Function Design

| Check                     | Fail Condition                                       |
| ------------------------- | ---------------------------------------------------- |
| Functions ≤ 30 lines      | Function exceeds 30 lines of logic                   |
| ≤ 3 positional parameters | More than 3 positional params without options object |
| Single responsibility     | Function does filtering AND sorting AND mapping      |
| Pure when possible        | Unnecessary side effects in utility functions        |

#### D — Comments & Clutter

| Check                           | Fail Condition                                  |
| ------------------------------- | ----------------------------------------------- |
| No "what" comments              | `// get the candidates` above `getCandidates()` |
| No section dividers             | `// ========= METHODS =========`                |
| No commented-out code           | Blocks of `// old code here`                    |
| No JSDoc for obvious signatures | `/** Returns the name */ getName(): string`     |
| TODOs have ticket references    | `// TODO: fix this later` without ticket        |

#### E — TypeScript Quality

| Check                            | Fail Condition                                                         |
| -------------------------------- | ---------------------------------------------------------------------- |
| No `any` type                    | `any` used anywhere                                                    |
| Immutable by default             | `let` where `const` suffices; missing `readonly` on injections/signals |
| Early returns for guard clauses  | Deeply nested `if/else` chains                                         |
| Enums/constants for magic values | Hardcoded strings or numbers without named constant                    |

#### F — Angular Conventions

| Check                                | Fail Condition                                                                                                          |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Modern syntax `@if`/`@for`/`@switch` | `*ngIf`, `*ngFor`, `[ngSwitch]`                                                                                         |
| Signal-first state                   | `BehaviorSubject` where a `signal` suffices                                                                             |
| Class member order                   | Injections, inputs, outputs, public signals, private signals, lifecycle, public methods, private methods — out of order |
| Standalone component imports correct | Missing or extraneous imports in `imports` array                                                                        |

#### G — Template Quality (HTML files)

| Check                                                              | Fail Condition                                                                  |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Tailwind only, no inline styles                                    | `style="..."` in template                                                       |
| Dark mode parity                                                   | Missing `dark:` variants for visible colors/backgrounds                         |
| `border-gray-300` as default border                                | `border-gray-200` or other non-300 default                                      |
| Responsive classes present                                         | Fixed widths without responsive breakpoints                                     |
| `stopPropagation` on nested interactive elements in clickable rows | Click handler on parent row with nested buttons/links without propagation guard |

### Step 3: Report Findings

Format the review as a single structured report:

```
## Code Review Report

### [file-path.ts]

**Pass:** Naming, Return Types, Comments
**Issues:**
- **Function Design:** `processAllApplications()` is 45 lines — split into `validateApplications()` and `submitBatch()`.
- **TypeScript Quality:** `any` on line 23 — type the API response as `ApplicationResponse`.

### [file-path.component.html]

**Pass:** Tailwind, Dark Mode, Responsive
**Issues:**
- **Template Quality:** Missing `stopPropagation` on delete button inside clickable row (line 67).

### Summary

- **Files reviewed:** 4
- **Issues found:** 3
- **Critical:** 1 (any type)
- **Suggestions:** 2
```

### Step 4: Offer Fixes

After reporting, ask:

> "Want me to fix these issues?"

If the user agrees, apply fixes directly using the clean code patterns from `$clean-code`.

## Severity Levels

| Level          | Examples                                                        | Action                |
| -------------- | --------------------------------------------------------------- | --------------------- |
| **Critical**   | `any` type, missing return types on public API, security issues | Must fix before merge |
| **Warning**    | God functions, generic names, missing dark mode                 | Should fix            |
| **Suggestion** | Could extract utility, slightly better name exists              | Optional improvement  |

## Integration with Other Skills

This skill consumes the standards defined in:

- `$clean-code` — naming, return types, function design, comments policy
- `$tailwindcss-development` — Tailwind patterns
- `$frontend-design` — premium interface consistency, minimalist layout judgment, and calm dark-mode direction when relevant

Apply this skill **last** in the Selection Order, after all implementation skills are done.
