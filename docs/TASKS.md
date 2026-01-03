# shadcn-angular — Implementation Tasks

## Current Status Overview

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | ✅ Complete | Foundation Setup |
| Phase 2 | ✅ Complete | Basic Components |
| Phase 3 | 🔄 In Progress | Form Components |
| Phase 4 | 🔄 In Progress | Layout Components |
| Phase 5 | ⏳ Pending | Overlay Components |
| Phase 6 | ⏳ Pending | Complex Components |

---

## Phase 1: Foundation Setup ✅

### Step 1.1: Project Configuration
- [x] Install Tailwind CSS 4+ and configure with Angular
- [x] Set up neutral theme CSS variables (light/dark mode)
- [x] Create `cn()` utility function using `clsx` + `tailwind-merge`
- [x] Configure base styles in `styles.scss`
- [x] Configure PostCSS for Tailwind 4
- [x] Setup Vitest for unit testing

### Step 1.2: Folder Structure
```
src/
├── app/
│   ├── lib/
│   │   ├── components/
│   │   │   └── ui/           # All shadcn components
│   │   ├── utils/
│   │   │   └── cn.ts         # Class merging utility
│   │   └── index.ts          # Public API exports
│   └── ...
```

---

## Phase 2: Basic Components ✅

**Difficulty: Easy ⭐**

| # | Component | Status | Files |
|---|-----------|--------|-------|
| 1 | **Button** | ✅ Done | `button/button.component.ts`, `button/button-variants.ts` |
| 2 | **Badge** | ✅ Done | `badge/badge.component.ts`, `badge/badge-variants.ts` |
| 3 | **Separator** | ✅ Done | `separator/separator.component.ts` |
| 4 | **Skeleton** | ✅ Done | `skeleton/skeleton.component.ts` |
| 5 | **Label** | ✅ Done | `label/label.component.ts` |
| 6 | **Input** | ✅ Done | `input/input.component.ts` |
| 7 | **Textarea** | ✅ Done | `textarea/textarea.component.ts` |
| 8 | **Card** | ✅ Done | `card/*.component.ts` (7 files) |
| 9 | **Alert** | ✅ Done | `alert/*.component.ts` (4 files) |
| 10 | **AspectRatio** | ⏳ Pending | — |
| 11 | **Avatar** | ✅ Done | `avatar/*.component.ts` (4 files) |
| 12 | **Progress** | ⏳ Pending | — |

---

## Phase 3: Form Components 🔄

**Difficulty: Medium ⭐⭐**

| # | Component | Status | Dependencies | Notes |
|---|-----------|--------|--------------|-------|
| 13 | **Checkbox** | ⏳ Pending | None | Boolean selection input |
| 14 | **Switch** | ⏳ Pending | None | Toggle switch |
| 15 | **RadioGroup** | ⏳ Pending | None | Single selection from options |
| 16 | **Slider** | ⏳ Pending | None | Range selection input |
| 17 | **Toggle** | ⏳ Pending | Button | Pressable toggle button |
| 18 | **ToggleGroup** | ⏳ Pending | Toggle | Group of toggle buttons |
| 19 | **Select** | ⏳ Pending | @angular/cdk | Dropdown selection |
| 20 | **Form** | ⏳ Pending | ReactiveFormsModule | Form validation wrapper |

---

## Phase 4: Layout Components 🔄

**Difficulty: Medium ⭐⭐**

| # | Component | Status | Dependencies | Notes |
|---|-----------|--------|--------------|-------|
| 21 | **ScrollArea** | ⏳ Pending | @angular/cdk | Custom scrollbar container |
| 22 | **Tabs** | ⏳ Pending | None | Tabbed content navigation |
| 23 | **Accordion** | ✅ Done | None | Already implemented |
| 24 | **Collapsible** | ⏳ Pending | None | Single collapsible panel |
| 25 | **Resizable** | ⏳ Pending | None | Resizable panel layout |
| 26 | **Table** | ⏳ Pending | None | Data table structure |
| 27 | **Breadcrumb** | ⏳ Pending | Router | Navigation breadcrumb |
| 28 | **Pagination** | ⏳ Pending | None | Page navigation |

---

## Phase 5: Overlay Components ⏳

**Difficulty: Hard ⭐⭐⭐**

| # | Component | Status | Dependencies | Notes |
|---|-----------|--------|--------------|-------|
| 29 | **Tooltip** | ⏳ Pending | @angular/cdk/overlay | Hover information popup |
| 30 | **Popover** | ⏳ Pending | @angular/cdk/overlay | Click-triggered popup |
| 31 | **HoverCard** | ⏳ Pending | @angular/cdk/overlay | Hover-triggered card popup |
| 32 | **Dialog** | ⏳ Pending | @angular/cdk/dialog | Modal dialog window |
| 33 | **AlertDialog** | ⏳ Pending | Dialog | Confirmation dialog |
| 34 | **Sheet** | ⏳ Pending | @angular/cdk/dialog | Slide-out panel |
| 35 | **Drawer** | ⏳ Pending | @angular/cdk/dialog | Bottom/side drawer |

---

## Phase 6: Complex Components ⏳

**Difficulty: Hard ⭐⭐⭐**

| # | Component | Status | Dependencies | Notes |
|---|-----------|--------|--------------|-------|
| 36 | **DropdownMenu** | ⏳ Pending | @angular/cdk/menu | Dropdown with items |
| 37 | **ContextMenu** | ⏳ Pending | DropdownMenu | Right-click menu |
| 38 | **Menubar** | ⏳ Pending | DropdownMenu | Horizontal menu bar |
| 39 | **NavigationMenu** | ⏳ Pending | @angular/cdk | Navigation with links |
| 40 | **Command** | ⏳ Pending | None | Command palette |
| 41 | **Calendar** | ⏳ Pending | None | Date picker calendar |
| 42 | **DatePicker** | ⏳ Pending | Calendar, Popover | Date selection |
| 43 | **InputOTP** | ⏳ Pending | None | OTP input fields |
| 44 | **Carousel** | ⏳ Pending | None | Image/content carousel |
| 45 | **Toast/Sonner** | ⏳ Pending | None | Toast notifications |

---

## Implementation Guidelines

### Component Structure Pattern

Each component should follow this structure:

```
component-name/
├── index.ts                    # Public exports
├── component-name.component.ts # Main component
├── component-name-variants.ts  # CVA variants (if needed)
└── component-name-context.ts   # Context/state (if needed)
```

### Coding Standards

1. **Standalone Components**: All components must be standalone
2. **OnPush Change Detection**: Use `ChangeDetectionStrategy.OnPush`
3. **Signal-based State**: Use signals for local component state
4. **Element Selectors Only**: ALL components use element selectors (no attribute selectors)
5. **CVA for Variants**: Use `class-variance-authority` for variant styling
6. **cn() Utility**: Always use `cn()` for class merging
7. **No Prefixes**: Component names match React shadcn exactly

### Selector Strategy - Element Selectors Only

**ALL components use element selectors:**
```typescript
@Component({ selector: 'Button' })  // <Button>
@Component({ selector: 'Input' })   // <Input>
@Component({ selector: 'Label' })   // <Label>
@Component({ selector: 'Card' })    // <Card>
@Component({ selector: 'Alert' })   // <Alert>
@Component({ selector: 'Badge' })   // <Badge>
@Component({ selector: 'Tabs' })    // <Tabs>
```

### Example Component Template

```typescript
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '@/utils';
import { componentVariants, type ComponentVariants } from './component-variants';

@Component({
  selector: 'ComponentName',  // Element selector always
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'computedClass()',
  },
  template: `<ng-content />`,
})
export class ComponentName {
  readonly variant = input<ComponentVariants['variant']>('default');
  readonly class = input<string>('');
  
  protected computedClass = computed(() => 
    cn(componentVariants({ variant: this.variant() }), this.class())
  );
}
```

### Example Usage

```html
<!-- All components use element selectors -->
<Button variant="default">Click me</Button>
<Button variant="destructive" size="lg">Delete</Button>

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

<Label for="email">Email</Label>
<Input type="email" id="email" placeholder="Enter email" />

<Textarea placeholder="Message"></Textarea>

<Avatar>
  <AvatarImage src="/avatar.png" alt="User" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

---

## Testing Requirements

- Unit tests for each component using Vitest
- Test variant classes are applied correctly
- Test accessibility attributes
- Test keyboard navigation where applicable
- Test signal reactivity

---

## Notes for AI Assistants

When implementing components:

1. **Read this file first** to understand current progress
2. **Check existing implementations** for patterns and conventions
3. **Follow the PRD** for naming and selector requirements
4. **Use Context7** for up-to-date Angular documentation
5. **Update this TASKS.md** after completing components
6. **Run tests** to verify implementations
7. **ALL selectors are element selectors** - no attribute selectors

### Quick Reference Commands

```bash
# Start dev server
npm run start

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Type check
npx tsc --noEmit
```

---

## Changelog

| Date | Changes |
|------|---------|
| 2026-01-03 | Initial task document created, Phase 1-2 marked complete |
| 2026-01-03 | Added Accordion to Phase 4 as complete |
| 2026-01-03 | Setup Vitest testing framework |
| 2026-01-03 | **MAJOR**: Changed ALL selectors to element selectors only (no attribute selectors) |
| 2026-01-03 | Updated Button, Input, Label, Textarea, AvatarImage to use element selectors |
