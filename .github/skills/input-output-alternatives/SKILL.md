---
name: input-output-alternatives
description: Avoid @Input/@Output in Angular sub-components when a shared service or signal store can wire state directly. Use when building modal sub-components, child panels, or any feature where multiple components share the same data flow. Prefer service injection over property/event binding for cross-component communication. Fall back to model() two-way binding only when a structural prop (e.g. FormGroup) has no service-based alternative.
---

# Input/Output Alternatives

Eliminate `input()` / `output()` boilerplate in Angular sub-components by wiring directly to a shared service or signal store.

## Decision Order

1. **Inject the signal store or service** — sub-components read signals and call methods directly.
2. **If a structural prop is truly needed** (e.g. passing a `FormGroup` to a molecule) — use `input.required<T>()`.
3. **If two-way binding is needed** — use `model()` instead of an input + output pair.
4. **Never** use `output()` to bubble events to a parent that just forwards them to a service.

## Pattern: Service-Wired Sub-Components

### Before (input/output relay)

```typescript
// parent.component.ts
@Component({ ... })
export class ParentComponent {
  private readonly store = inject(MyStore)
  readonly items = this.store.items
  readonly selectedId = signal<string | null>(null)

  onSelect(id: string): void {
    this.selectedId.set(id)
  }
}
```

```html
<!-- parent.component.html -->
<child-list [items]="items()" [selectedId]="selectedId()" (select)="onSelect($event)" />
```

```typescript
// child-list.component.ts
export class ChildListComponent {
  readonly items = input.required<Item[]>();
  readonly selectedId = input<string | null>(null);
  readonly select = output<string>();

  onItemClick(id: string): void {
    this.select.emit(id);
  }
}
```

### After (service-wired)

```typescript
// feature-modal.service.ts
@Injectable({ providedIn: 'root' })
export class FeatureModalService extends AppModal {
  private readonly store = inject(MyStore);

  readonly items = this.store.items;
  readonly selectedId = signal<string | null>(null);

  selectItem(id: string): void {
    this.selectedId.set(id);
  }

  clearSelection(): void {
    this.selectedId.set(null);
  }
}
```

```typescript
// parent.component.ts — now minimal
@Component({ ... })
export class ParentComponent {
  readonly modalService = inject(FeatureModalService)

  ngOnInit(): void {
    this.modalService.loadItems()
  }
}
```

```html
<!-- parent.component.html — no bindings -->
<child-list />
```

```typescript
// child-list.component.ts — reads from service directly
export class ChildListComponent {
  readonly modalService = inject(FeatureModalService);

  onItemClick(id: string): void {
    this.modalService.selectItem(id);
  }
}
```

## Pattern: Effect-Driven Reactions

When a sub-component must react to selection changes (e.g. patching a form), use `effect()` + `untracked()`:

```typescript
constructor() {
  effect(() => {
    const id = this.modalService.selectedId()

    untracked(() => {
      if (id) {
        const item = this.modalService.selectedItem()
        if (item) this.patchForm(item)
      } else {
        this.resetForm()
      }
    })
  })
}
```

## Pattern: Molecule Decomposition

For structural decomposition (breaking a large template into smaller components), `input()` for `FormGroup` / `FormArray` is acceptable since there is no service-based alternative:

```typescript
// molecule component
export class TemplateBasicsComponent {
  private readonly modalService = inject(FeatureModalService);

  readonly form = input.required<FormGroup>();

  // Derive display data from service, not from parent inputs
  readonly parentItems = computed(() => {
    const currentId = this.modalService.selectedId();
    return this.modalService.items().filter((i) => i.id !== currentId);
  });
}
```

## Pattern: model() Two-Way Binding

Use `model()` only when true two-way binding is needed and a service is overkill (e.g. a reusable toggle, inline-edit cell):

```typescript
export class InlineEditComponent {
  readonly value = model.required<string>();

  onBlur(newValue: string): void {
    this.value.set(newValue);
  }
}
```

```html
<inline-edit [(value)]="name" />
```

## Checklist

- [ ] Sub-components inject the service/store — no `input()` for state, no `output()` for events.
- [ ] Parent template has zero `[binding]` / `(event)` on child selectors (except structural molecule props).
- [ ] Computed signals in sub-components derive from service signals.
- [ ] `effect()` + `untracked()` used when sub-component must react to selection/state changes.
- [ ] `model()` used only for true two-way binding in reusable primitives.
- [ ] FormGroup / FormArray passed via `input.required()` to molecules (acceptable exception).
