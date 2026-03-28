---
name: angular-signal-effect-untracked
description: Best practice for using effects with signals and stores, specifically wrapping side effects in untracked().
---

# Angular Signal Effect Pattern

## Overview

When using Angular Signals, `effect()` is used to run side effects when signals change. However, when these effects involve calling methods on a store (like `load` or `all`) or other actions that might read signals, it's crucial to prevent accidental dependencies and infinite loops.

## The Pattern

Always wrap the execution of the side effect (e.g., the store call) in `untracked()`. This ensures that the effect _only_ re-runs when the specific signals you explicitly read (like `this.categoryId()`) change, and not because of any internal signal reads within the called method.

## Implementation

```typescript
import { Component, effect, inject, input, untracked } from '@angular/core';

@Component({ ... })
export class MyComponent {
    // 1. Define Signal Input
    public readonly categoryId = input<string>();

    // 2. Inject Store
    private readonly store = inject(MyStore);

    constructor() {
        // 3. Define Effect
        effect(() => {
            // 4. Read the trigger signal(s) *outside* untracked()
            const id = this.categoryId();

            // 5. Wrap the action in untracked()
            untracked(() => {
                if (id) {
                    this.store.load({ id });
                } else {
                    this.store.clear();
                }
            });
        });
    }
}
```

## Checklist

- [ ] Import `effect` and `untracked` from `@angular/core`.
- [ ] Read the signal(s) that should trigger the effect _before_ the `untracked` block.
- [ ] Place the store call or side effect _inside_ the `untracked` block.
- [ ] Ensure `allowSignalWrites: true` is set if the effect needs to write to signals (though cleaner architecture usually avoids this).
