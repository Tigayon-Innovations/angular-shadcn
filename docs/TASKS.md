# shadcn-angular — Implementation Tasks

## Current Status Overview

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | ✅ Complete | Foundation Setup |
| Phase 2 | ✅ Complete | Basic Components |
| Phase 3 | ✅ Complete | Form Components |
| Phase 4 | ✅ Complete | Layout Components |
| Phase 5 | ✅ Complete | Overlay Components |
| Phase 6 | ✅ Complete | Complex Components |


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
| 10 | **AspectRatio** | ✅ Done | `aspect-ratio/aspect-ratio.component.ts` |
| 11 | **Avatar** | ✅ Done | `avatar/*.component.ts` (4 files) |
| 12 | **Progress** | ✅ Done | `progress/progress.component.ts` |

---

## Phase 3: Form Components ✅

**Difficulty: Medium ⭐⭐**

| # | Component | Status | Dependencies | Files |
|---|-----------|--------|--------------|-------|
| 13 | **Checkbox** | ✅ Done | None | `checkbox/checkbox.component.ts` |
| 14 | **Switch** | ✅ Done | None | `switch/switch.component.ts` |
| 15 | **RadioGroup** | ✅ Done | None | `radio-group/*.ts` (3 files) |
| 16 | **Slider** | ✅ Done | None | `slider/slider.component.ts` |
| 17 | **Toggle** | ✅ Done | Button | `toggle/*.ts` (2 files) |
| 18 | **ToggleGroup** | ✅ Done | Toggle | `toggle-group/*.ts` (3 files) |
| 19 | **Select** | ✅ Done | None | `select/*.ts` (9 files) |
| 20 | **Form** | ✅ Done | ReactiveFormsModule | `form/*.ts` (8 files) |

---

## Phase 4: Layout Components ✅

**Difficulty: Medium ⭐⭐**

| # | Component | Status | Dependencies | Files |
|---|-----------|--------|--------------|-------|
| 21 | **ScrollArea** | ✅ Done | @angular/cdk | `scroll-area/*.ts` (3 files) |
| 22 | **Tabs** | ✅ Done | None | `tabs/*.ts` (5 files) |
| 23 | **Accordion** | ✅ Done | None | `accordion/*.ts` (5 files) |
| 24 | **Collapsible** | ✅ Done | None | `collapsible/*.ts` (4 files) |
| 25 | **Resizable** | ✅ Done | None | `resizable/*.ts` (5 files) |
| 26 | **Table** | ✅ Done | None | `table/*.ts` (9 files) |
| 27 | **Breadcrumb** | ✅ Done | Router | `breadcrumb/*.ts` (8 files) |
| 28 | **Pagination** | ✅ Done | None | `pagination/*.ts` (8 files) |

---

## Phase 5: Overlay Components ✅

**Difficulty: Hard ⭐⭐⭐**

| # | Component | Status | Dependencies | Files |
|---|-----------|--------|--------------|-------|
| 29 | **Tooltip** | ✅ Done | @angular/cdk/overlay | `tooltip/*.ts` (6 files) |
| 30 | **Popover** | ✅ Done | @angular/cdk/overlay | `popover/*.ts` (6 files) |
| 31 | **HoverCard** | ✅ Done | @angular/cdk/overlay | `hover-card/*.ts` (5 files) |
| 32 | **Dialog** | ✅ Done | @angular/cdk/dialog | `dialog/*.ts` (10 files) |
| 33 | **AlertDialog** | ✅ Done | Dialog | `alert-dialog/*.ts` (11 files) |
| 34 | **Sheet** | ✅ Done | @angular/cdk/dialog | `sheet/*.ts` (11 files) |
| 35 | **Drawer** | ✅ Done | @angular/cdk/dialog | `drawer/*.ts` (10 files) |

---

## Phase 6: Complex Components ✅

**Difficulty: Hard ⭐⭐⭐**

| # | Component | Status | Dependencies | Files |
|---|-----------|--------|--------------|-------|
| 36 | **DropdownMenu** | ✅ Done | None | `dropdown-menu/*.ts` (15 files) |
| 37 | **ContextMenu** | ✅ Done | None | `context-menu/*.ts` (14 files) |
| 38 | **Menubar** | ✅ Done | None | `menubar/*.ts` (16 files) |
| 39 | **NavigationMenu** | ✅ Done | None | `navigation-menu/*.ts` (11 files) |
| 40 | **Command** | ✅ Done | None | `command/*.ts` (10 files) |
| 41 | **Calendar** | ✅ Done | Button | `calendar/*.ts` (2 files) |
| 42 | **DatePicker** | ✅ Done | Calendar, Popover | `date-picker/*.ts` (2 files) |
| 43 | **InputOTP** | ✅ Done | None | `input-otp/*.ts` (5 files) |
| 44 | **Carousel** | ✅ Done | Button | `carousel/*.ts` (6 files) |
| 45 | **Toast/Sonner** | ✅ Done | None | `toast/*.ts` (7 files) |


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
| 2026-01-03 | **Phase 2 Complete**: Added AspectRatio, Progress components |
| 2026-01-03 | **Phase 3 Complete**: Added Checkbox, Switch, RadioGroup, Slider, Toggle, ToggleGroup, Select, Form components |
| 2026-01-03 | **Phase 4 Complete**: Added ScrollArea, Resizable, Table, Breadcrumb, Pagination components |
| 2026-01-03 | **Phase 5 Complete**: Added Tooltip, Popover, HoverCard, Dialog, AlertDialog, Sheet, Drawer components |
| 2026-01-03 | Installed @angular/cdk for overlay and dialog support |
| 2026-01-03 | **Phase 6 Complete**: Added DropdownMenu (15 files), ContextMenu (14 files), Menubar (16 files), NavigationMenu (11 files), Command (10 files), Calendar (2 files), DatePicker (2 files), InputOTP (5 files), Carousel (6 files), Toast/Sonner (7 files) - 88 new files total |
| 2026-01-03 | **ALL PHASES COMPLETE**: shadcn-angular component library fully implemented with 45 components |
