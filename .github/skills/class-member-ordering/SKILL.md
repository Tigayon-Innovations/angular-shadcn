---
name: class-member-ordering
description: Enforce consistent class member ordering in Angular components, services, and stores. Use when creating new components, refactoring existing ones, or during code review to ensure uniform readability. Activates for any TypeScript Angular class file.
---

# Class Member Ordering

Every Angular component, directive, service, and store class MUST follow this exact member ordering. Consistent ordering makes scanning and navigating classes predictable across the entire codebase.

## Canonical Order

```
1.  constructor
2.  viewChild / viewChildren
3.  output
4.  model
5.  input.required
6.  input
7.  private inject (private readonly _ prefix)
8.  public inject (public readonly, no prefix)
9.  store items / currentItem (direct store property aliases)
10. computed
11. signals
12. forms (FormGroup, FormBuilder.group)
13. constants (readonly arrays, enums, static values)
14. lifecycle hooks (ngOnInit, ngAfterViewInit, ngOnDestroy)
15. public methods (sorted by importance)
16. private methods (sorted by importance)
17. effects
```

## Detailed Rules

### 1. Constructor

Place the constructor first. Keep it minimal — only `afterNextRender`, `inject`-based setup, or absolutely necessary initialization:

```typescript
export class ManageIssueModalComponent {
    constructor() {
        afterNextRender(() => {
            setTimeout(() => {
                this.focusable().nativeElement.focus()
            }, 500)
        })
    }
```

If the constructor is empty, omit it entirely.

### 2. View Queries

`viewChild` and `viewChildren` come immediately after the constructor:

```typescript
    public readonly focusable = viewChild.required<ElementRef<HTMLInputElement>>('focusable')
    public readonly tableRows = viewChildren<ElementRef>('row')
```

### 3. Outputs

Signal-based outputs before any inputs:

```typescript
    public readonly closed = output<void>()
    public readonly saved = output<Issue>()
```

### 4. Models

Two-way binding model signals:

```typescript
    public readonly selectedTab = model<string>('overview')
```

### 5. Required Inputs First, Then Optional Inputs

`input.required` members always come before regular `input`:

```typescript
    // Required inputs first
    public readonly issueSignalStore = input.required<any>()

    // Optional inputs after
    public readonly issue = input<Issue[]>([])
    public readonly showCategory = input(false)
    public readonly replaceStatusWithType = input(false)
    public readonly set_active_item = input('true')
```

### 6. Private Injections

All `private readonly` injected dependencies, prefixed with `_`:

```typescript
    private readonly _formBuilder = inject(FormBuilder)
    private readonly _alertSignalStore = inject(AlertSignalStore)
    private readonly _issueSignalStore = inject(IssueSignalStore)
    private readonly _projectBoardSignalStore = inject(ProjectBoardSignalStore)
    private readonly _projectBoardMemberSignalStore = inject(ProjectBoardMemberSignalStore)
```

### 7. Public Injections

All `public readonly` injected dependencies (services used in templates):

```typescript
    public readonly viewEpicModalService = inject(ViewEpicModalService)
    public readonly fuseConfirmationService = inject(FuseConfirmationService)
    public readonly manageIssueModalService = inject(ManageIssueModalService)
```

### 8. Store Property Aliases

Direct store signal aliases used as shorthand:

```typescript
    public readonly currentBoard = this._projectBoardSignalStore.currentItem
```

### 9. Computed Signals

All `computed()` values, grouped by purpose:

```typescript
    public readonly isLoading = computed(() => {
        return this.issueSignalStore().loader().getLoader === LoadingStateEnum.LOADING
    })

    public readonly projectBoardMemberUserIds = computed(() =>
        this._projectBoardMemberSignalStore.items().map((m) => m.user.user_id),
    )

    public readonly filteredIssues = computed(() => {
        const issues = this.issues()
        // ...filter logic
        return result
    })
```

### 10. Signals

All writable `signal()` values:

```typescript
    public readonly assignee = signal<User | undefined>(undefined)
    public readonly reporter = signal<User | undefined>(undefined)
    public readonly selectedType = signal<string>('')
    public readonly selectedPriority = signal<string | null>(null)
    public readonly tableCellToEdit = signal<TableCellToEdit[]>([])
```

### 11. Forms

Reactive form groups and form-related declarations:

```typescript
    public readonly formGroup = this._formBuilder.group({
        id: [''],
        epic_id: [''],
        summary: ['', Validators.minLength(3)],
        description: ['', Validators.minLength(10)],
        story_points: [0, [Validators.min(0), Validators.max(100)]],
    })
```

### 12. Constants

Static readonly values, enum snapshots, and table headers:

```typescript
    public readonly ISSUE_TYPES = Object.values(IssueTypeEnum)
    public readonly ISSUE_PRIORITIES = Object.values(ProjectPriorityEnum)
    public readonly TABLE_HEADERS = ['', 'Work', 'Priority', 'Points', 'Status', 'Actions']
    public readonly IssueTypeEnum = IssueTypeEnum
```

### 13. Lifecycle Hooks

Always declare lifecycle hooks in the order Angular actually calls them at runtime:

```typescript
    // Execution order mirrors Angular's call sequence
    ngOnChanges(changes: SimpleChanges): void { ... }   // 1st — input changes (before/on init)
    ngOnInit(): void { ... }                            // 2nd — after first ngOnChanges
    ngDoCheck(): void { ... }                           // 3rd — every change detection run
    ngAfterContentInit(): void { ... }                  // 4th — after projected content init
    ngAfterContentChecked(): void { ... }               // 5th — after every projected content check
    ngAfterViewInit(): void { ... }                     // 6th — after component view init
    ngAfterViewChecked(): void { ... }                  // 7th — after every view check
    ngOnDestroy(): void { ... }                         // last — before component is destroyed
```

Only implement the hooks your component actually needs. Never declare an empty hook.

| Hook                    | When it runs                                                     |
| ----------------------- | ---------------------------------------------------------------- |
| `ngOnChanges`           | Before `ngOnInit` and on every input change                      |
| `ngOnInit`              | Once, after the first `ngOnChanges`                              |
| `ngDoCheck`             | Every change detection cycle                                     |
| `ngAfterContentInit`    | Once, after content projection (`<ng-content>`) is initialized   |
| `ngAfterContentChecked` | After every content projection check                             |
| `ngAfterViewInit`       | Once, after the component's view and child views are initialized |
| `ngAfterViewChecked`    | After every view and child view check                            |
| `ngOnDestroy`           | Once, just before the component is destroyed — use for cleanup   |

**Common usage patterns:**

```typescript
    // Fetch data on load
    ngOnInit(): void {
        this._loadCandidates()
    }

    // Access ViewChild references (available only after view init)
    ngAfterViewInit(): void {
        this.chart.render()
    }

    // Cleanup subscriptions, timers, manual DOM listeners
    ngOnDestroy(): void {
        this._subscription.unsubscribe()
        this._modalService.issue.set(undefined)
    }
```

### 14. Public Methods (Sorted by Importance)

Primary actions first (save, submit, create), then secondary actions (update, delete), then utility methods:

```typescript
    async save(): Promise<void> { ... }
    async updateField(issue: Issue, index: number, data: { key: string; value: string }): Promise<void> { ... }
    async updateAssignee(issue: Issue, assignee: User): Promise<void> { ... }
    async updatePriority(issue: Issue, priority: ProjectPriorityEnum): Promise<void> { ... }
    viewIssue(issue: Issue): void { ... }
    handleMember(user: User, type: 'assignee' | 'reporter'): void { ... }
    isEditing(index: number, key: string): boolean { ... }
    setEditing(index: number, key: string, mode: 'edit' | 'close'): void { ... }
```

### 15. Private Methods (Sorted by Importance)

```typescript
    private filterActiveJobs(jobs: Job[]): Job[] { ... }
    private sortByDate(jobs: Job[]): Job[] { ... }
```

### 16. Effects (Always Last)

All `effect()` declarations at the bottom of the class:

```typescript
    public readonly projectBoardEffectRef = effect(() => {
        const projectBoard = this._projectBoardSignalStore.currentItem()
        if (!!projectBoard && !this.manageIssueModalService.issue()) {
            this.formGroup.patchValue({
                project_board_id: projectBoard.id,
                project_id: projectBoard.project_id,
            })
        }
    })

    public readonly itemEffectRef = effect(() => {
        const issue = this.manageIssueModalService.issue()
        if (!!issue) {
            this.formGroup.patchValue(issue as any)
        }
    })
```

## Full Example

```typescript
export class ManageIssueModalComponent {
    // 1. Constructor
    constructor() {
        afterNextRender(() => { ... })
    }

    // 2. View queries
    public readonly focusable = viewChild.required<ElementRef<HTMLInputElement>>('focusable')

    // 3. Outputs
    // (none in this component)

    // 4. Models
    // (none in this component)

    // 5. Required inputs, then optional inputs
    // (none in this component)

    // 6. Private injections (grouped — no blank lines between them)
    private readonly _formBuilder = inject(FormBuilder)
    private readonly _epicSignalStore = inject(EpicSignalStore)
    private readonly _alertSignalStore = inject(AlertSignalStore)
    private readonly _issueSignalStore = inject(IssueSignalStore)
    private readonly _projectBoardSignalStore = inject(ProjectBoardSignalStore)
    private readonly _projectBoardMemberSignalStore = inject(ProjectBoardMemberSignalStore)

    // 7. Public injections (grouped — no blank lines between them)
    public readonly manageIssueModalService = inject(ManageIssueModalService)

    // 8. Store property aliases
    // (none in this component)

    // 9. Computed signals (single-line grouped, multi-line separated)
    public readonly isLoading = computed(() => {
        const { createLoader, updateLoader } = this._issueSignalStore.loader()
        return [createLoader, updateLoader].includes(LoadingStateEnum.LOADING)
    })

    public readonly projectBoardMemberUserIds = computed(() =>
        this._projectBoardMemberSignalStore.items().map((m) => m.user.user_id),
    )

    // 10. Signals (grouped — no blank lines between them)
    public readonly assignee = signal<User | undefined>(undefined)
    public readonly reporter = signal<User | undefined>(undefined)

    // 11. Forms
    public readonly formGroup = this._formBuilder.group({
        id: [''],
        epic_id: [''],
        summary: ['', Validators.minLength(3)],
        description: ['', Validators.minLength(10)],
    })

    // 12. Constants (grouped — no blank lines between them)
    public readonly ISSUE_TYPES = Object.values(IssueTypeEnum)
    public readonly ISSUE_PRIORITIES = Object.values(ProjectPriorityEnum)

    // 13. Lifecycle hooks (in Angular execution order)
    ngOnInit(): void { ... }

    ngAfterViewInit(): void { ... }

    ngOnDestroy(): void {
        this._epicSignalStore.patchState({ currentItem: undefined })
        this.manageIssueModalService.issue.set(undefined)
    }

    // 14. Public methods (by importance) — blank line between each method
    async save(): Promise<void> { ... }

    handleMember(user: User, type: 'assignee' | 'reporter'): void { ... }

    // 15. Private methods (by importance) — blank line between each method
    // (none in this component)

    // 16. Effects (always last)
    public readonly projectBoardEffectRef = effect(() => { ... })

    public readonly itemEffectRef = effect(() => { ... })
}
```

## Vertical Spacing Rules

Consistent blank lines make class files scannable and separate intent visually.

### Between Different Member Categories

Always add **one blank line** when transitioning from one category to the next (e.g., from private injects to public injects, from signals to forms, from constants to lifecycle hooks).

### Within a Groupable Category (No Blank Lines)

Consecutive declarations of the **same category** are stacked without blank lines. Groupable categories:

- Private injects
- Public injects
- Store aliases
- Single-line computed signals
- Writable signals
- Constants

```typescript
// Good — private injects grouped tightly
private readonly _formBuilder = inject(FormBuilder)
private readonly _alertSignalStore = inject(AlertSignalStore)
private readonly _issueSignalStore = inject(IssueSignalStore)
```

### Multi-line Computed Signals

Multi-line `computed()` blocks get a blank line before and after, even when adjacent to other computed signals.

### Methods — Always Separated

Every method (public, private, lifecycle hook) must have a **blank line** before and after it. No exceptions:

```typescript
ngOnInit(): void {
    this._loadData()
}

async save(): Promise<void> {
    const payload = this.formGroup.getRawValue()

    await this._apiService.create(payload)

    this._alertSignalStore.success('Saved')
}

private _loadData(): void {
    this._store.loadAll()
}
```

### Inside Method Bodies

Separate each logical block within a function with a blank line. A "logical block" is a group of statements serving one micro-purpose (guard clause, data preparation, transformation, side-effect, return):

```typescript
async save(): Promise<void> {
    if (!this.formGroup.valid) {
        return
    }

    const payload = this.formGroup.getRawValue()

    const sanitized = this._sanitize(payload)

    await this._apiService.create(sanitized)

    this._alertSignalStore.success('Created successfully')
}
```

## Quick Checklist

Before committing any component class:

- [ ] Constructor is first (or omitted if empty)
- [ ] `viewChild`/`viewChildren` immediately after constructor
- [ ] Outputs before inputs
- [ ] `input.required` before optional `input`
- [ ] Private `inject` grouped together with `_` prefix
- [ ] Public `inject` grouped together without prefix
- [ ] Store aliases before computed
- [ ] All `computed()` grouped together
- [ ] All `signal()` grouped together after computed
- [ ] Forms after signals
- [ ] Constants after forms
- [ ] Lifecycle hooks in Angular execution order (`ngOnChanges` → `ngOnInit` → `ngDoCheck` → `ngAfterContentInit` → `ngAfterContentChecked` → `ngAfterViewInit` → `ngAfterViewChecked` → `ngOnDestroy`)
- [ ] Only implemented hooks declared — no empty hook methods
- [ ] Public methods sorted by importance
- [ ] Private methods sorted by importance
- [ ] All `effect()` declarations at the very bottom
- [ ] Blank line between every different member category
- [ ] No blank lines within groupable categories (private injects, public injects, store aliases, single-line computed, signals, constants)
- [ ] Blank line between every method (lifecycle hooks, public methods, private methods)
- [ ] Blank lines between logical blocks inside method bodies
- [ ] Multi-line `computed()` blocks separated by blank lines
