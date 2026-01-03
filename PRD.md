# shadcn-angular — Product Requirements Document

## Overview

**Purpose:** Build `shadcn-angular`, an Angular (>=21) port and packaging of the shadcn/ui component set, compatible with Tailwind CSS 4+. The library must keep the same component names and conventions as shadcn/ui (React), be integrable with `tweak-cn`, provide `ng add` for quick setup, and allow per-component installation and consumption.

**Audience:** Angular developers who want the shadcn design system and Tailwind utilities in Angular apps.

## Goals & Non-Goals

- **Goal:** Provide a first-class Angular implementation of all shadcn/ui components as standalone, tree-shakable components compatible with Angular 21+ and Tailwind 4+.
- **Goal:** Support `ng add` to install base styles and optional components, and support per-component installable packages (e.g. `ng add @shadcn-angular/button` or `npm i @shadcn-angular/button`).
- **Goal:** Maintain **exact naming parity** with shadcn/ui React — no custom prefixes, no "shad-" prefix. Use attribute selectors that match React component names exactly (e.g., `[Button]`, `[Card]`, `[Dialog]`).
- **Goal:** Integrate seamlessly with `tweak-cn` without remapping.
- **Non-Goal:** Produce extensive end-user docs in this repo. Instead, provide a machine-readable `mcp.json` manifest so tooling can generate docs or integrate CI systems.

## Scope

- Deliverable components: **Full shadcn/ui component set** matching React implementation:
  - **Layout:** AspectRatio, Card, Collapsible, Resizable, ScrollArea, Separator
  - **Forms:** Button, Checkbox, DatePicker, Form, Input, InputOTP, Label, RadioGroup, Select, Slider, Switch, Textarea, Toggle, ToggleGroup
  - **Data Display:** Avatar, Badge, Calendar, Table
  - **Feedback:** Alert, AlertDialog, Dialog, Drawer, HoverCard, Popover, Sheet, Skeleton, Sonner/Toast, Tooltip, Progress
  - **Navigation:** Breadcrumb, Command, ContextMenu, DropdownMenu, Menubar, NavigationMenu, Pagination, Tabs
  - **Overlay:** Dialog, Drawer, Sheet, Popover, Tooltip, HoverCard, AlertDialog
  - **Other:** Accordion, Carousel

- Packaging: monorepo layout that supports publishing individual packages (scoped `@shadcn-angular/*`) plus a meta package `@shadcn-angular/all`.
- Tooling: `ng add` schematic at repo-level which optionally installs or configures Tailwind and base styles; per-package `ng add` to add only requested components.
- Compatibility: `tweak-cn` compatible (class names + utilities alignment).

## User Stories

- As an Angular developer, I want to run `ng add @shadcn-angular/cli` (or `@shadcn-angular/all`) to set up Tailwind 4+ and base tokens quickly.
- As an Angular developer, I want to install only the `button` component package and import its standalone component without pulling the whole library.
- As a tooling author, I want a machine-readable manifest (`mcp.json`) listing components and metadata so I can generate docs or UI catalogs automatically.

## Functional Requirements

### FR1 — Standalone Components
All components must be implemented as standalone Angular components (no NgModule export required) and marked tree-shakable.

### FR2 — Naming Parity (No Prefix)
Component selectors and exported names must match shadcn/ui React naming **exactly**:
- Use **attribute selectors** matching React component names: `[Button]`, `[Card]`, `[Dialog]`, etc.
- **No custom prefixes** (no `shad-`, no `ui-`, no `ng-`)
- Export names match React: `Button`, `Card`, `DialogTrigger`, etc.

**Example usage (mirrors React shadcn):**
```html
<!-- Angular (attribute selectors) -->
<button Button variant="default">Click me</button>
<div Card>
  <div CardHeader>
    <h3 CardTitle>Title</h3>
  </div>
  <div CardContent>Content</div>
</div>

<!-- React shadcn equivalent -->
<Button variant="default">Click me</Button>
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### FR3 — Tailwind 4+ Ready
Each component should use Tailwind utility classes and be compatible with Tailwind v4 features. The `ng add` schematic must optionally scaffold `tailwind.config.ts` and required PostCSS entries.

### FR4 — ng-add (global)
`ng add @shadcn-angular/all` (or `@shadcn-angular/cli`) adds base Tailwind + shadcn token CSS, updates `angular.json` and `styles` entry, and offers interactive per-component choices.

### FR5 — ng-add (per-component)
Each per-component package supports `ng add` to register only that component and add any required styles or providers.

### FR6 — Per-Component Install
Each component is installable via npm independently and exports a small public API (standalone component, types, theme tokens).

### FR7 — MCP Manifest
Provide `mcp.json` at repo root describing package metadata, Angular/tailwind compatibility, component list, and schematics metadata. No human docs — machine-readable only.

## Non-Functional Requirements

- **NFR1 — Angular Support:** Must support Angular 21 and above.
- **NFR2 — Type Safety:** Provide full TypeScript typings; no `any` in public API.
- **NFR3 — Accessibility:** Components must meet basic accessibility standards (keyboard support, ARIA where applicable).
- **NFR4 — Performance:** Keep bundle sizes small; components should be tree-shakable and lazy-load friendly.
- **NFR5 — Testing:** Provide unit tests for behaviors (Jest / Angular Testing Library) and E2E smoke tests for critical overlays (Dialog, Popover, Tooltip).
- **NFR6 — CI:** Linting, tests, type checks, and build matrix for Node/Angular versions on each PR.

## Acceptance Criteria

- **AC1:** Running `ng add @shadcn-angular/all` in a sample Angular 21 app bootstraps Tailwind 4+ and adds the shadcn base styles without manual edits.
- **AC2:** Installing `@shadcn-angular/button` and importing the standalone `Button` directive renders correctly with Tailwind utilities and matches shadcn class names.
- **AC3:** `mcp.json` lists all components with correct selectors (attribute selectors matching React names), Angular/Tailwind min versions, and schematics metadata.
- **AC4:** All components export strong typings and pass unit tests.
- **AC5:** Component selectors have **no custom prefix** — they match React shadcn exactly.

## API / Developer Experience

**Import pattern:** Prefer standalone imports. Example usage:

```typescript
import { Button } from '@shadcn-angular/button';
import { Card, CardHeader, CardTitle, CardContent } from '@shadcn-angular/card';

@Component({
  imports: [Button, Card, CardHeader, CardTitle, CardContent],
  template: `
    <button Button variant="outline">Click</button>
    
    <div Card>
      <div CardHeader>
        <h3 CardTitle>Card Title</h3>
      </div>
      <div CardContent>
        <p>Card content goes here.</p>
      </div>
    </div>
  `
})
export class MyComponent {}
```

**Per-component package:** Each package exports standalone directives/components and optional helper services where required (e.g., toast service).

**Schematic options:** `--all` (install all components), `--components=button,card`, `--skipTailwind`.

## Component List (Full shadcn/ui parity)

| Package | Components |
|---------|-----------|
| `@shadcn-angular/accordion` | Accordion, AccordionItem, AccordionTrigger, AccordionContent |
| `@shadcn-angular/alert` | Alert, AlertTitle, AlertDescription |
| `@shadcn-angular/alert-dialog` | AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel |
| `@shadcn-angular/aspect-ratio` | AspectRatio |
| `@shadcn-angular/avatar` | Avatar, AvatarImage, AvatarFallback |
| `@shadcn-angular/badge` | Badge |
| `@shadcn-angular/breadcrumb` | Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis |
| `@shadcn-angular/button` | Button |
| `@shadcn-angular/calendar` | Calendar |
| `@shadcn-angular/card` | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| `@shadcn-angular/carousel` | Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext |
| `@shadcn-angular/checkbox` | Checkbox |
| `@shadcn-angular/collapsible` | Collapsible, CollapsibleTrigger, CollapsibleContent |
| `@shadcn-angular/command` | Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator |
| `@shadcn-angular/context-menu` | ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent |
| `@shadcn-angular/date-picker` | DatePicker |
| `@shadcn-angular/dialog` | Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose |
| `@shadcn-angular/drawer` | Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose |
| `@shadcn-angular/dropdown-menu` | DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent |
| `@shadcn-angular/form` | Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage |
| `@shadcn-angular/hover-card` | HoverCard, HoverCardTrigger, HoverCardContent |
| `@shadcn-angular/input` | Input |
| `@shadcn-angular/input-otp` | InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator |
| `@shadcn-angular/label` | Label |
| `@shadcn-angular/menubar` | Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub, MenubarSubTrigger, MenubarSubContent, MenubarShortcut |
| `@shadcn-angular/navigation-menu` | NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport |
| `@shadcn-angular/pagination` | Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis |
| `@shadcn-angular/popover` | Popover, PopoverTrigger, PopoverContent, PopoverAnchor |
| `@shadcn-angular/progress` | Progress |
| `@shadcn-angular/radio-group` | RadioGroup, RadioGroupItem |
| `@shadcn-angular/resizable` | ResizablePanelGroup, ResizablePanel, ResizableHandle |
| `@shadcn-angular/scroll-area` | ScrollArea, ScrollBar |
| `@shadcn-angular/select` | Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator |
| `@shadcn-angular/separator` | Separator |
| `@shadcn-angular/sheet` | Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose |
| `@shadcn-angular/skeleton` | Skeleton |
| `@shadcn-angular/slider` | Slider |
| `@shadcn-angular/sonner` | Sonner |
| `@shadcn-angular/switch` | Switch |
| `@shadcn-angular/table` | Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption |
| `@shadcn-angular/tabs` | Tabs, TabsList, TabsTrigger, TabsContent |
| `@shadcn-angular/textarea` | Textarea |
| `@shadcn-angular/toast` | Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, Toaster |
| `@shadcn-angular/toggle` | Toggle |
| `@shadcn-angular/toggle-group` | ToggleGroup, ToggleGroupItem |
| `@shadcn-angular/tooltip` | Tooltip, TooltipTrigger, TooltipContent, TooltipProvider |

## Packaging & Publishing

- Use a monorepo (pnpm/workspace or npm workspaces) that can publish each `@shadcn-angular/*` package separately and a meta package.
- Peer dependencies: `@angular/core`, `@angular/common`, `tailwindcss >=4`, and optionally `@angular/cdk` for overlays if used.

## Compatibility with tweak-cn

- Ensure classes and utility keys used by components match `tweak-cn` expectations.
- Provide an interoperability note in `mcp.json` field `compat.tweakCn = true` so tools know this library is compatible.

## Security & Licensing

- License: follow the upstream shadcn licensing model and verify compatibility. Document licensing in the published packages.

## Roadmap & Milestones

- **MVP (4 weeks):** Implement core components (Button, Card, Input, Form, Dialog, Tooltip, Popover) + `ng add` + `mcp.json` + per-component packaging for core set.
- **Phase 2 (6 weeks):** Implement remaining components, CI & publishing automation, E2E tests.
- **Phase 3 (ongoing):** Polish accessibility, performance, add examples and showcase app.

## Risks & Mitigations

- **Risk:** Tailwind v4 feature shifts vs v3 API. **Mitigation:** Target Tailwind 4+, keep config minimal and provide compatibility layer if needed.
- **Risk:** Naming differences cause confusion. **Mitigation:** Strictly follow shadcn/ui React names; include explicit mapping checks in CI.

## Machine-readable manifest

This repository includes `mcp.json` for tooling (no human docs). The manifest must be kept in sync with actual packages and schematics.

## Deliverables

- `mcp.json` (machine manifest) — present in repo root.
- `.prettierrc` — present in repo root for Angular formatting standards.
- `ng add` schematic and per-component packages (design & acceptance criteria defined here).
- Release plan & CI pipelines for publishing individual packages.

---

## Implementation Plan (Step-by-Step)

### Phase 1: Foundation Setup (Week 1)

**Step 1.1: Project Configuration**
- [ ] Install Tailwind CSS 4+ and configure with Angular
- [ ] Set up neutral theme CSS variables (light/dark mode)
- [ ] Create `cn()` utility function using `clsx` + `tailwind-merge`
- [ ] Configure base styles in `styles.scss`

**Step 1.2: Folder Structure**
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

### Phase 2: Basic Components (Week 1-2)

**Difficulty: Easy ⭐**

| Order | Component | Description | Dependencies |
|-------|-----------|-------------|--------------|
| 1 | **Button** | Primary interactive element with variants | None |
| 2 | **Badge** | Small status indicator | None |
| 3 | **Separator** | Visual divider | None |
| 4 | **Skeleton** | Loading placeholder | None |
| 5 | **Label** | Form label element | None |
| 6 | **Input** | Text input field | None |
| 7 | **Textarea** | Multi-line text input | None |
| 8 | **Card** | Container with header/content/footer | None |
| 9 | **Alert** | Feedback message container | None |
| 10 | **AspectRatio** | Maintain aspect ratio wrapper | None |
| 11 | **Avatar** | User profile image with fallback | None |
| 12 | **Progress** | Progress indicator bar | None |

### Phase 3: Form Components (Week 2-3)

**Difficulty: Medium ⭐⭐**

| Order | Component | Description | Dependencies |
|-------|-----------|-------------|--------------|
| 13 | **Checkbox** | Boolean selection input | None |
| 14 | **Switch** | Toggle switch | None |
| 15 | **RadioGroup** | Single selection from options | None |
| 16 | **Slider** | Range selection input | None |
| 17 | **Toggle** | Pressable toggle button | Button |
| 18 | **ToggleGroup** | Group of toggle buttons | Toggle |
| 19 | **Select** | Dropdown selection | @angular/cdk |
| 20 | **Form** | Form validation wrapper | ReactiveFormsModule |

### Phase 4: Layout Components (Week 3-4)

**Difficulty: Medium ⭐⭐**

| Order | Component | Description | Dependencies |
|-------|-----------|-------------|--------------|
| 21 | **ScrollArea** | Custom scrollbar container | @angular/cdk |
| 22 | **Tabs** | Tabbed content navigation | None |
| 23 | **Accordion** | Collapsible content sections | None |
| 24 | **Collapsible** | Single collapsible panel | None |
| 25 | **Resizable** | Resizable panel layout | None |
| 26 | **Table** | Data table structure | None |
| 27 | **Breadcrumb** | Navigation breadcrumb | Router |
| 28 | **Pagination** | Page navigation | None |

### Phase 5: Overlay Components (Week 4-5)

**Difficulty: Hard ⭐⭐⭐**

| Order | Component | Description | Dependencies |
|-------|-----------|-------------|--------------|
| 29 | **Tooltip** | Hover information popup | @angular/cdk/overlay |
| 30 | **Popover** | Click-triggered popup | @angular/cdk/overlay |
| 31 | **HoverCard** | Hover-triggered card popup | @angular/cdk/overlay |
| 32 | **Dialog** | Modal dialog window | @angular/cdk/dialog |
| 33 | **AlertDialog** | Confirmation dialog | Dialog |
| 34 | **Sheet** | Slide-out panel | @angular/cdk/overlay |
| 35 | **Drawer** | Mobile-friendly sheet | Sheet |

### Phase 6: Menu Components (Week 5-6)

**Difficulty: Hard ⭐⭐⭐**

| Order | Component | Description | Dependencies |
|-------|-----------|-------------|--------------|
| 36 | **DropdownMenu** | Dropdown action menu | @angular/cdk/overlay |
| 37 | **ContextMenu** | Right-click menu | @angular/cdk/overlay |
| 38 | **Menubar** | Application menu bar | DropdownMenu |
| 39 | **NavigationMenu** | Site navigation | @angular/cdk/overlay |
| 40 | **Command** | Command palette (⌘K) | @angular/cdk |

### Phase 7: Advanced Components (Week 6-7)

**Difficulty: Hard ⭐⭐⭐**

| Order | Component | Description | Dependencies |
|-------|-----------|-------------|--------------|
| 41 | **Calendar** | Date picker calendar | None |
| 42 | **DatePicker** | Date selection input | Calendar, Popover |
| 43 | **InputOTP** | One-time password input | None |
| 44 | **Carousel** | Image/content slider | None |
| 45 | **Toast/Sonner** | Toast notifications | Service pattern |

### Phase 8: Blocks (Week 7-8)

**Difficulty: Composition ⭐⭐**

Pre-built compositions using the component primitives:

| Order | Block | Description | Components Used |
|-------|-------|-------------|-----------------|
| 46 | **Sidebar** | Collapsible side navigation | Sheet, Button, Tooltip, ScrollArea |
| 47 | **Navbar** | Top navigation bar | NavigationMenu, Button, DropdownMenu |
| 48 | **Dashboard Layout** | Admin dashboard shell | Sidebar, Navbar, Card |
| 49 | **Auth Forms** | Login/Register forms | Card, Form, Input, Button, Label |
| 50 | **Data Table** | Advanced table with sorting/filtering | Table, Button, DropdownMenu, Checkbox |
| 51 | **Settings Page** | Settings form layout | Card, Form, Tabs, Switch, Select |
| 52 | **Profile Card** | User profile display | Card, Avatar, Badge, Button |
| 53 | **Empty State** | No data placeholder | Card, Button |
| 54 | **Error Page** | 404/500 error layouts | Card, Button |
| 55 | **Command Menu** | Global command palette | Command, Dialog |

---

## Theming

### Default Theme: Neutral

The library ships with shadcn's neutral theme by default, supporting both light and dark modes.

**Color System (oklch):**
- Background/Foreground pairs for semantic theming
- CSS custom properties for easy customization
- Dark mode via `.dark` class on `<html>` or `<body>`

**CSS Variables:**
```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... full neutral palette */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode overrides */
}
```

### Dark Mode Implementation
- System preference detection via `prefers-color-scheme`
- Manual toggle support via `.dark` class
- Provide `ThemeService` for programmatic theme switching
- SSR-compatible (no flash of unstyled content)

---

## Next Steps (recommended immediate tasks)

1. ✅ Create implementation plan (this document)
2. [ ] Set up Tailwind 4+ with neutral theme CSS variables
3. [ ] Create `cn()` utility and folder structure  
4. [ ] Implement Button component as canonical example
5. [ ] Implement Card component family
6. [ ] Add CI tasks to validate naming parity and `mcp.json` sync

---

For tooling automation, see `mcp.json` at the repo root. This PRD intentionally omits human-facing docs — we supply the machine manifest so docs/site generation can be automated later.
