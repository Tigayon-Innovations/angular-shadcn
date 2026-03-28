---
name: clean-code
description: Enforce clean coding standards inspired by ANSI/ISO conventions without comment overloading. Use when writing or refactoring TypeScript/Angular code to ensure proper return types, descriptive variable/function/class names, single-responsibility functions, and self-documenting code. Activates for any new feature implementation, refactoring, or code quality improvement where readable, maintainable code is the goal.
---

# Clean Code

Write self-documenting TypeScript/Angular code. No comment clutter — let names and structure communicate intent.

## Naming Conventions

### Variables

- Use descriptive nouns that reveal purpose: `activeJobCount`, not `cnt` or `x`.
- Booleans start with `is`, `has`, `can`, `should`: `isLoading`, `hasPermission`, `canEdit`.
- Collections use plural nouns: `candidates`, `selectedJobIds`, `filteredApplications`.
- Signals append semantic suffix when helpful: `isLoading`, `searchQuery`, `currentPage`.
- Avoid abbreviations unless universally understood (`id`, `url`, `api`).
- Avoid generic names: `data`, `info`, `item`, `temp`, `result`, `value`, `stuff`.

### Inject Variables

Name every injected dependency using the **full camelCase of the injected class name** — no shortening, no abbreviations.

- **Private:** prefix with `_` + full camelCase of class name.
- **Public:** full camelCase of class name, no prefix.

```typescript
// Good — full class name, correctly scoped
private readonly _screeningTemplatesSignalStore = inject(ScreeningTemplatesSignalStore)
private readonly _formBuilder = inject(FormBuilder)
private readonly _matSnackBar = inject(MatSnackBar)
public readonly campaignScreeningTemplatesModalService = inject(CampaignScreeningTemplatesModalService)
public readonly fuseConfirmationService = inject(FuseConfirmationService)

// Bad — abbreviated or genericised names
private readonly _store = inject(ScreeningTemplatesSignalStore)
private readonly _fb = inject(FormBuilder)
private readonly _snackBar = inject(MatSnackBar)
public readonly modalService = inject(CampaignScreeningTemplatesModalService)
```

### Functions & Methods

- Use verb + noun: `fetchCandidates()`, `updateJobStatus()`, `calculateTotalScore()`.
- Event handlers use `on` + event: `onRowClick()`, `onFilterChange()`, `onSubmit()`.
- Boolean-returning functions use `is`/`has`/`can`: `isExpired()`, `hasAccess()`, `canPublish()`.
- Transformation functions describe input→output: `mapResponseToCandidate()`, `formatDateToISO()`.
- Keep functions short — one level of abstraction per function.
- Avoid `handle` as a prefix when `on` is more precise.

### Classes & Components

- Components: `CandidateListComponent`, `JobDetailPageComponent`.
- Services: `CandidateApiService`, `AuthenticationService`.
- Stores: `CandidateSignalStore`, `JobListingStore`.
- Models/Interfaces: `Candidate`, `JobListing`, `ApplicationStatus`.
- Enums: `ApplicationStatusEnum`, `JobTypeEnum`.

### Files

- Kebab-case matching the class: `candidate-list.component.ts`, `job-detail-page.component.ts`.
- One export per file for classes/components. Grouped exports only for barrel files, small enums, or tightly coupled types.

## Return Types

Explicitly annotate return types on every public and private method:

```typescript
// Correct
public fetchCandidates(): Observable<Candidate[]> { ... }
private calculateScore(ratings: number[]): number { ... }
public isExpired(): boolean { ... }
protected mapToViewModel(response: CandidateResponse): CandidateViewModel { ... }

// Wrong — implicit return types
public fetchCandidates() { ... }
private calculateScore(ratings: number[]) { ... }
```

Exceptions where return type annotation may be omitted:

- Simple arrow-function callbacks inside `.pipe()`, `.map()`, `.filter()`.
- Single-expression computed signals where TypeScript inference is trivially obvious.

## Function Design

### Single Responsibility

Each function does exactly one thing:

```typescript
// Good — separate concerns
private filterActiveJobs(jobs: Job[]): Job[] {
  return jobs.filter(job => job.status === JobStatusEnum.Active);
}

private sortByDate(jobs: Job[]): Job[] {
  return [...jobs].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// Bad — mixed concerns
private getJobs(jobs: Job[]): Job[] {
  return jobs
    .filter(job => job.status === JobStatusEnum.Active)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
```

### Parameter Discipline

- Maximum 3 positional parameters. Beyond that, use an options object.
- Use destructuring for options objects.

```typescript
// Good
public searchCandidates(options: { query: string; page: number; filters: CandidateFilter }): Observable<PaginatedResult<Candidate>> { ... }

// Bad — too many positional params
public searchCandidates(query: string, page: number, limit: number, sortBy: string, filters: CandidateFilter): Observable<PaginatedResult<Candidate>> { ... }
```

### Pure Functions When Possible

Prefer functions that take inputs and return outputs without side effects.

## Comments Policy

### Do Not Add

- Comments restating what the code does: `// get candidates` above `getCandidates()`.
- Section dividers: `// ========= METHODS =========`.
- Commented-out code — delete it; version control exists.
- JSDoc for obvious signatures: `/** Gets the name */ getName(): string`.
- TODO comments without a linked issue or ticket number.

### Acceptable Comments

- **Why** something non-obvious is done (business rule, workaround, constraint):
  ```typescript
  // API returns dates as UTC strings without timezone — convert to local before display
  const localDate = convertUtcToLocal(response.createdAt);
  ```
- Complex regex explanation.
- Link to external documentation for non-trivial algorithms.
- `TODO(TICKET-123):` with a real ticket reference.

## TypeScript Patterns

### Immutability

```typescript
private readonly candidateApi = inject(CandidateApiService);
public readonly candidates = signal<Candidate[]>([]);
public readonly isLoading = signal<boolean>(false);
public readonly activeCount = computed<number>(() =>
  this.candidates().filter(c => c.isActive).length
);
```

### Type Safety

- No `any` — use `unknown` and narrow with type guards.
- Define interfaces for all API response shapes.
- Use union types and enums for constrained values.
- Prefer `readonly` arrays when mutation is not needed: `ReadonlyArray<Candidate>`.

### Early Returns

Reduce nesting with guard clauses:

```typescript
public processApplication(application: Application): ProcessResult {
  if (!application.isValid) {
    return ProcessResult.Invalid;
  }

  if (application.isExpired()) {
    return ProcessResult.Expired;
  }

  return this.submitApplication(application);
}
```

### Signal Patterns

```typescript
// Derived state with computed — always annotate
public readonly visibleCandidates = computed<Candidate[]>(() =>
  this.filterActiveJobs(this.candidates())
);

// Effects for side-effects only
effect(() => {
  const query = this.searchQuery();
  untracked(() => this.performSearch(query));
});
```

## Whitespace & Spacing Rules

Consistent vertical spacing makes code scannable and separates logical intent. Apply these rules to every TypeScript class file.

### Inside Functions / Methods

Separate each logical block within a function body with a blank line. A "logical block" is a group of statements serving one micro-purpose (guard clause, data preparation, transformation, side-effect, return).

```typescript
// Good — blank lines between logical blocks
async save(): Promise<void> {
  if (!this.formGroup.valid) {
    return
  }

  const payload = this.formGroup.getRawValue()

  const sanitizedPayload = this.sanitizePayload(payload)

  await this._candidateApiService.create(sanitizedPayload)

  this._alertSignalStore.success('Candidate created')
}

// Bad — wall of code with no breathing room
async save(): Promise<void> {
  if (!this.formGroup.valid) {
    return
  }
  const payload = this.formGroup.getRawValue()
  const sanitizedPayload = this.sanitizePayload(payload)
  await this._candidateApiService.create(sanitizedPayload)
  this._alertSignalStore.success('Candidate created')
}
```

### Between Class Members

Add a blank line between every method declaration. Methods must always be visually separated:

```typescript
// Good — blank line between every method
async save(): Promise<void> { ... }

async delete(id: string): Promise<void> { ... }

viewDetail(item: Candidate): void { ... }

// Bad — methods stacked without spacing
async save(): Promise<void> { ... }
async delete(id: string): Promise<void> { ... }
viewDetail(item: Candidate): void { ... }
```

### Grouping Declarations (No Blank Line Within a Group)

Consecutive declarations of the **same category** may be stacked without blank lines between them. These groupable categories are:

- Private injects (`private readonly _x = inject(...)`)
- Public injects (`public readonly x = inject(...)`)
- Store aliases (`public readonly x = this._store.prop`)
- Computed signals (`public readonly x = computed(...)` — single-line only)
- Writable signals (`public readonly x = signal(...)`)
- Constants (`public readonly X = ...`)

```typescript
// Good — private injects stacked together, no extra blank lines
private readonly _formBuilder = inject(FormBuilder)
private readonly _alertSignalStore = inject(AlertSignalStore)
private readonly _candidateApiService = inject(CandidateApiService)

// Good — signals stacked together
public readonly isLoading = signal<boolean>(false)
public readonly searchQuery = signal<string>('')
public readonly selectedTab = signal<string>('overview')
```

### Between Different Member Categories

Always add a blank line when transitioning from one category to another (e.g., from private injects to public injects, from signals to forms, from constants to lifecycle hooks):

```typescript
private readonly _formBuilder = inject(FormBuilder)
private readonly _alertSignalStore = inject(AlertSignalStore)

public readonly modalService = inject(ManageModalService)

public readonly items = this._store.items

public readonly isLoading = computed(() => this._store.loader().getLoader === LoadingStateEnum.LOADING)
public readonly isEmpty = computed(() => this.items().length === 0)

public readonly searchQuery = signal<string>('')
public readonly selectedId = signal<string | undefined>(undefined)

public readonly formGroup = this._formBuilder.group({ ... })

public readonly TABLE_HEADERS = ['Name', 'Status', 'Actions']

ngOnInit(): void {
  this._loadData()
}

async save(): Promise<void> { ... }

async delete(id: string): Promise<void> { ... }

private _loadData(): void { ... }

private _sanitize(value: string): string { ... }
```

### Multi-line Computed Signals

Multi-line `computed()` blocks must have a blank line before and after them, even when adjacent to other computed signals:

```typescript
public readonly isLoading = computed(() => this._store.loader().getLoader === LoadingStateEnum.LOADING)

public readonly filteredItems = computed(() => {
  const items = this._store.items()
  const query = this.searchQuery()

  return items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
})

public readonly totalCount = computed(() => this.filteredItems().length)
```

## Code Structure Order

Within a component/service class, maintain this order:

1. Injected dependencies (`inject()`)
2. Input signals / `@Input`
3. Output signals / `@Output`
4. Public signals and computed values
5. Private signals and computed values
6. Lifecycle hooks (`ngOnInit`, `ngOnDestroy`)
7. Public methods
8. Private methods

## Anti-Patterns to Avoid

| Anti-Pattern                         | Fix                                                 |
| ------------------------------------ | --------------------------------------------------- |
| Magic numbers/strings                | Extract to named constant or enum                   |
| Nested ternaries                     | Use `@switch` in templates or early returns in TS   |
| God functions (>30 lines)            | Split into composed single-responsibility functions |
| Mutable shared state                 | Use signals and computed values                     |
| Catch-all error handlers             | Handle specific error types with typed responses    |
| Boolean parameters                   | Use an enum or options object for clarity           |
| Barrel re-exports in feature modules | Import directly from source                         |

## Quick Checklist

Before committing code, verify:

- [ ] Every public/private method has an explicit return type
- [ ] Variable names describe their purpose without needing a comment
- [ ] Functions are named with verb + noun
- [ ] No commented-out code
- [ ] No generic names (`data`, `result`, `temp`)
- [ ] No `any` types
- [ ] Functions are ≤30 lines; split if longer
- [ ] ≤3 positional parameters per function
- [ ] Immutable by default (`readonly`, `const`, `signal`)
- [ ] Comments explain **why**, not **what**
