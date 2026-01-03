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
| Phase 7 | 🔲 Pending | Extended Components |
| Phase 8 | 🔲 Pending | Advanced Components |
| Phase 9 | 🔲 Pending | Documentation Site |
| Phase 10 | 🔲 Pending | Dark Mode System |
| Phase 11 | 🔲 Pending | Routing & Navigation |


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

## Phase 7: Extended Components 🔲

**Difficulty: Medium ⭐⭐**

These components extend beyond base shadcn/ui to match ZardUI feature parity.

| # | Component | Status | Dependencies | Description |
|---|-----------|--------|--------------|-------------|
| 46 | **Combobox** | 🔲 Pending | Popover, Command | Autocomplete/searchable dropdown (composition pattern) |
| 47 | **ButtonGroup** | 🔲 Pending | Button | Grouped buttons with shared styling |
| 48 | **Spinner** | 🔲 Pending | None | Loading indicator animations |
| 49 | **Kbd** | 🔲 Pending | None | Keyboard key indicator component |
| 50 | **Empty** | 🔲 Pending | None | Empty state placeholder component |
| 51 | **InputGroup** | 🔲 Pending | Input, Button | Input with prefix/suffix addons |
| 52 | **NativeSelect** | 🔲 Pending | None | HTML native select with styling |
| 53 | **Typography** | 🔲 Pending | None | Text styling components (H1-H6, P, Lead, Muted, etc.) |
| 54 | **Segmented** | 🔲 Pending | None | iOS-style segmented control buttons |

---

## Phase 8: Advanced Components 🔲

**Difficulty: Hard ⭐⭐⭐**

| # | Component | Status | Dependencies | Description |
|---|-----------|--------|--------------|-------------|
| 55 | **Sidebar** | 🔲 Pending | Collapsible, Sheet | Full sidebar system with collapsible states |
| 56 | **DataTable** | 🔲 Pending | Table, Checkbox, Pagination | Sortable, filterable, selectable data tables |
| 57 | **Chart** | 🔲 Pending | External lib (ng2-charts/ngx-charts) | Chart components (Line, Bar, Pie, Area, etc.) |

### Sidebar Sub-components
- SidebarProvider
- Sidebar
- SidebarHeader
- SidebarContent
- SidebarFooter
- SidebarGroup
- SidebarGroupLabel
- SidebarGroupContent
- SidebarGroupAction
- SidebarMenu
- SidebarMenuItem
- SidebarMenuButton
- SidebarMenuAction
- SidebarMenuSub
- SidebarMenuSubItem
- SidebarMenuSubButton
- SidebarMenuBadge
- SidebarMenuSkeleton
- SidebarSeparator
- SidebarTrigger
- SidebarRail
- SidebarInset

---

## Phase 9: Documentation Site 🔲

**Difficulty: Hard ⭐⭐⭐**

Build a documentation site inspired by ZardUI (https://zardui.com).

### Step 9.1: Site Structure & Layout
- [ ] Create site header component with logo, navigation, theme toggle
- [ ] Create site footer component with links
- [ ] Create docs layout with sidebar navigation
- [ ] Set up routing for all documentation pages

### Step 9.2: Home Page (ZardUI Style)
- [ ] Hero section with title, badges, CTA buttons
- [ ] Beautiful Components showcase section with interactive demos
- [ ] Features section (Lightning Fast, Beautiful Design, DX, Modular, Type Safe, Community)
- [ ] Stats section (45+ Components, 99% TypeScript, 100% Tree Shakable)
- [ ] Featured/testimonials section

### Step 9.3: Documentation Pages
- [ ] Introduction page
- [ ] Installation page (CLI and manual setup)
- [ ] Theming documentation
- [ ] Dark mode guide

### Step 9.4: Components Pages
- [ ] Components index page with grid layout
- [ ] Component search/filter functionality
- [ ] Category filtering (Layout, Form, Feedback, Navigation, Data)
- [ ] Component detail page template
- [ ] Live preview component with preview/code tabs
- [ ] Code block component with syntax highlighting and copy button
- [ ] API reference table component

### Step 9.5: Component Documentation
Generate documentation pages for all 57 components with:
- [ ] Component description
- [ ] Live interactive preview
- [ ] Code examples (Basic, Variants, etc.)
- [ ] Installation instructions
- [ ] API reference (Props, Events, Methods)
- [ ] Previous/Next navigation

---

## Phase 10: Dark Mode System 🔲

**Difficulty: Medium ⭐⭐**

Implement complete dark mode system matching shadcn/ui.

### Step 10.1: Theme Service
- [ ] Create `theme.service.ts` with signal-based state
- [ ] Support themes: 'light' | 'dark' | 'system'
- [ ] Store preference in localStorage
- [ ] Listen to system preference changes (prefers-color-scheme media query)
- [ ] Add/remove 'dark' class on document root

### Step 10.2: Theme Toggle Component
- [ ] Create `ThemeToggle` component
- [ ] Dropdown with Sun (light), Moon (dark), Monitor (system) icons
- [ ] Use DropdownMenu component
- [ ] Smooth icon transitions/animations

### Step 10.3: Integration
- [ ] Add theme toggle to site header
- [ ] Ensure all components respect dark mode
- [ ] Test transitions between modes
- [ ] Test system preference detection

---

## Phase 11: Routing & Navigation 🔲

**Difficulty: Medium ⭐⭐**

### Step 11.1: App Routes Configuration
```typescript
const routes = [
  { path: '', component: HomePageComponent },
  { path: 'docs', component: DocsLayoutComponent, children: [
    { path: '', redirectTo: 'introduction', pathMatch: 'full' },
    { path: 'introduction', component: IntroductionComponent },
    { path: 'installation', component: InstallationComponent },
    { path: 'theming', component: ThemingComponent },
    { path: 'dark-mode', component: DarkModeComponent },
    { path: 'components', component: ComponentsListComponent },
    { path: 'components/:name', component: ComponentDetailComponent },
  ]},
];
```

### Step 11.2: Documentation Sidebar Navigation
- [ ] Create collapsible sidebar with all doc sections
- [ ] Getting Started section
- [ ] Components section with all 57 components listed
- [ ] Active state highlighting
- [ ] Mobile responsive drawer

### Step 11.3: Component Registry
- [ ] Create component metadata registry service
- [ ] Store component info: name, description, category, examples, API
- [ ] Dynamic component loading for previews

---

## Pre-Phase 7: Tailwind Setup (Step 0) 🔲

Before starting Phase 7, ensure Tailwind CSS is properly set up:

### Step 0.1: Clean Install
- [ ] Uninstall existing Tailwind packages
  ```bash
  npm uninstall tailwindcss @tailwindcss/postcss postcss
  ```
- [ ] Install via Angular CLI
  ```bash
  ng add tailwindcss
  ```

### Step 0.2: Verify Setup
- [ ] Confirm `styles.scss` uses `@use "tailwindcss"`
- [ ] Run `npm start` and verify Tailwind classes work
- [ ] Test dark mode toggle functionality
- [ ] Verify all existing components render correctly

---

## Project Structure (Extended)

```
src/app/
├── lib/
│   └── components/ui/          # All shadcn components (57 total)
│       ├── [existing 45 components]
│       ├── combobox/           # Phase 7
│       ├── button-group/       # Phase 7
│       ├── spinner/            # Phase 7
│       ├── kbd/                # Phase 7
│       ├── empty/              # Phase 7
│       ├── input-group/        # Phase 7
│       ├── native-select/      # Phase 7
│       ├── typography/         # Phase 7
│       ├── segmented/          # Phase 7
│       ├── sidebar/            # Phase 8
│       ├── data-table/         # Phase 8
│       └── chart/              # Phase 8
├── pages/
│   ├── home/                   # Phase 9
│   └── docs/
│       ├── layout/             # Phase 9
│       ├── introduction/       # Phase 9
│       ├── installation/       # Phase 9
│       ├── theming/            # Phase 9
│       ├── dark-mode/          # Phase 9
│       ├── components-list/    # Phase 9
│       └── component-detail/   # Phase 9
├── components/
│   ├── site-header/            # Phase 9
│   ├── site-footer/            # Phase 9
│   ├── docs-sidebar/           # Phase 9
│   ├── component-preview/      # Phase 9
│   ├── code-block/             # Phase 9
│   └── theme-toggle/           # Phase 10
├── services/
│   ├── theme.service.ts        # Phase 10
│   └── component-registry.ts   # Phase 11
└── data/
    └── components.ts           # Phase 9
```

---

## Component Gap Analysis

| Component | shadcn-angular | ZardUI | shadcn/ui | Status |
|-----------|----------------|--------|-----------|--------|
| Accordion | ✅ | ✅ | ✅ | Done |
| Alert | ✅ | ✅ | ✅ | Done |
| AlertDialog | ✅ | ✅ | ✅ | Done |
| AspectRatio | ✅ | ✅ | ✅ | Done |
| Avatar | ✅ | ✅ | ✅ | Done |
| Badge | ✅ | ✅ | ✅ | Done |
| Breadcrumb | ✅ | ✅ | ✅ | Done |
| Button | ✅ | ✅ | ✅ | Done |
| **ButtonGroup** | ❌ | ✅ | ❌ | Phase 7 |
| Calendar | ✅ | ✅ | ✅ | Done |
| Card | ✅ | ✅ | ✅ | Done |
| Carousel | ✅ | ✅ | ✅ | Done |
| **Chart** | ❌ | 🔜 | ✅ | Phase 8 |
| Checkbox | ✅ | ✅ | ✅ | Done |
| Collapsible | ✅ | ✅ | ✅ | Done |
| **Combobox** | ❌ | ✅ | ✅ | Phase 7 |
| Command | ✅ | ✅ | ✅ | Done |
| ContextMenu | ✅ | ✅ | ✅ | Done |
| **DataTable** | ❌ | ✅ | ✅ | Phase 8 |
| DatePicker | ✅ | ✅ | ✅ | Done |
| Dialog | ✅ | ✅ | ✅ | Done |
| Drawer | ✅ | ✅ | ✅ | Done |
| DropdownMenu | ✅ | ✅ | ✅ | Done |
| **Empty** | ❌ | ✅ | ❌ | Phase 7 |
| Form | ✅ | ✅ | ✅ | Done |
| HoverCard | ✅ | ✅ | ✅ | Done |
| Input | ✅ | ✅ | ✅ | Done |
| **InputGroup** | ❌ | ✅ | ❌ | Phase 7 |
| InputOTP | ✅ | ✅ | ✅ | Done |
| **Kbd** | ❌ | ✅ | ❌ | Phase 7 |
| Label | ✅ | ✅ | ✅ | Done |
| Menubar | ✅ | ✅ | ✅ | Done |
| **NativeSelect** | ❌ | ✅ | ❌ | Phase 7 |
| NavigationMenu | ✅ | ✅ | ✅ | Done |
| Pagination | ✅ | ✅ | ✅ | Done |
| Popover | ✅ | ✅ | ✅ | Done |
| Progress | ✅ | ✅ | ✅ | Done |
| RadioGroup | ✅ | ✅ | ✅ | Done |
| Resizable | ✅ | ✅ | ✅ | Done |
| ScrollArea | ✅ | ✅ | ✅ | Done |
| **Segmented** | ❌ | ✅ | ❌ | Phase 7 |
| Select | ✅ | ✅ | ✅ | Done |
| Separator | ✅ | ✅ | ✅ | Done |
| Sheet | ✅ | ✅ | ✅ | Done |
| **Sidebar** | ❌ | ✅ | ✅ | Phase 8 |
| Skeleton | ✅ | ✅ | ✅ | Done |
| Slider | ✅ | ✅ | ✅ | Done |
| **Spinner** | ❌ | ✅ | ✅ | Phase 7 |
| Switch | ✅ | ✅ | ✅ | Done |
| Table | ✅ | ✅ | ✅ | Done |
| Tabs | ✅ | ✅ | ✅ | Done |
| Textarea | ✅ | ✅ | ✅ | Done |
| Toast | ✅ | ✅ | ✅ | Done |
| Toggle | ✅ | ✅ | ✅ | Done |
| ToggleGroup | ✅ | ✅ | ✅ | Done |
| Tooltip | ✅ | ✅ | ✅ | Done |
| **Typography** | ❌ | ✅ | ❌ | Phase 7 |


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
8. **Use `class` NOT `className`** - Angular convention differs from React; use `readonly class = input<string>('')`

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
|------|---------|| 2026-01-03 | **CONVENTION**: Input property for CSS classes must be `class` not `className` (Angular convention) || 2026-01-03 | Initial task document created, Phase 1-2 marked complete |
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
| 2026-01-03 | **ALL PHASES 1-6 COMPLETE**: shadcn-angular component library core implemented with 45 components |
| 2026-01-03 | Added Phase 7-11 planning: Extended Components, Advanced Components, Documentation Site, Dark Mode System, Routing & Navigation |
| 2026-01-03 | Added Component Gap Analysis comparing shadcn-angular, ZardUI, and shadcn/ui |
