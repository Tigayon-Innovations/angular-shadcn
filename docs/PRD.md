# shadcn-angular — Product Requirements Document

## Overview

**Purpose:** Build `shadcn-angular`, an Angular (>=21) port and packaging of the shadcn/ui component set, compatible with Tailwind CSS 4+. The library must keep the same component names and conventions as shadcn/ui (React), be integrable with `tweak-cn`, provide `ng add` for quick setup, and allow per-component installation and consumption.

**Audience:** Angular developers who want the shadcn design system and Tailwind utilities in Angular apps.

## Goals & Non-Goals

- **Goal:** Provide a first-class Angular implementation of all shadcn/ui components as standalone, tree-shakable components compatible with Angular 21+ and Tailwind 4+.
- **Goal:** Support `ng add` to install base styles and optional components, and support per-component installable packages (e.g. `ng add @shadcn-angular/button` or `npm i @shadcn-angular/button`).
- **Goal:** Maintain **exact naming parity** with shadcn/ui React — no custom prefixes, no "shad-" prefix. Use **element selectors only** for all components (e.g., `<Button>`, `<Card>`, `<Input>`).
- **Goal:** Integrate seamlessly with `tweak-cn` without remapping.
- **Non-Goal:** Produce extensive end-user docs in this repo. Instead, provide a machine-readable `mcp.json` manifest so tooling can generate docs or integrate CI systems.

## Scope

### Deliverable Components (Full shadcn/ui component set)

**Layout:**
- AspectRatio, Card, Collapsible, Resizable, ScrollArea, Separator

**Navigation:**
- Breadcrumb, ContextMenu, DropdownMenu, Menubar, NavigationMenu, Pagination, Tabs

**Feedback/Display:**
- Alert, AlertDialog, Badge, Dialog, Drawer, HoverCard, Popover, Progress, Skeleton, Sonner, Toast, Tooltip

**Form/Input:**
- Button, Calendar, Checkbox, Command, DatePicker, Form, Input, InputOTP, Label, RadioGroup, Select, Slider, Switch, Textarea, Toggle, ToggleGroup

**Data:**
- Avatar, Carousel, Table

**Other:**
- Accordion, Carousel

### Packaging
- Monorepo layout that supports publishing individual packages (scoped `@shadcn-angular/*`) plus a meta package `@shadcn-angular/all`.

### Tooling
- `ng add` schematic at repo-level which optionally installs or configures Tailwind and base styles
- Per-package `ng add` to add only requested components

### Compatibility
- `tweak-cn` compatible (class names + utilities alignment)

## User Stories

1. As an Angular developer, I want to run `ng add @shadcn-angular/cli` (or `@shadcn-angular/all`) to set up Tailwind 4+ and base tokens quickly.
2. As an Angular developer, I want to install only the `button` component package and import its standalone component without pulling the whole library.
3. As a tooling author, I want a machine-readable manifest (`mcp.json`) listing components and metadata so I can generate docs or UI catalogs automatically.

## Functional Requirements

### FR1 — Standalone Components
All components must be implemented as standalone Angular components (no NgModule export required) and marked tree-shakable.

### FR2 — Naming Parity (No Prefix, Element Selectors Only)
Component selectors and exported names must match shadcn/ui React naming **exactly**:
- Use **element selectors** for ALL components: `<Button>`, `<Card>`, `<Input>`, `<Label>`, etc.
- **No attribute selectors** - all components use element selectors
- **No custom prefixes** (no `shad-`, no `ui-`, no `ng-`)
- Export names match React: `Button`, `Card`, `DialogTrigger`, etc.
- **Use `class` NOT `className`** for the CSS classes input property (Angular convention)

**Example usage (mirrors React shadcn):**
```html
<!-- Angular (element selectors) -->
<Button variant="default">Click me</Button>
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
<Label for="email">Email</Label>
<Input type="email" id="email" placeholder="Enter email" />

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
- **NFR5 — Testing:** Provide unit tests for behaviors (Vitest / Angular Testing Library) and E2E smoke tests for critical overlays (Dialog, Popover, Tooltip).
- **NFR6 — CI:** Linting, tests, type checks, and build matrix for Node/Angular versions on each PR.

## Acceptance Criteria

- **AC1:** Running `ng add @shadcn-angular/all` in a sample Angular 21 app bootstraps Tailwind 4+ and adds the shadcn base styles without manual edits.
- **AC2:** Installing `@shadcn-angular/button` and importing the standalone `Button` component renders correctly with Tailwind utilities and matches shadcn class names.
- **AC3:** `mcp.json` lists all components with correct selectors (element selectors matching React names), Angular/Tailwind min versions, and schematics metadata.
- **AC4:** All components export strong typings and pass unit tests.
- **AC5:** Component selectors have **no custom prefix** — they match React shadcn exactly.

## API / Developer Experience

**Import pattern:** Prefer standalone imports. Example usage:

```typescript
import { Button } from '@shadcn-angular/button';
import { Card, CardHeader, CardTitle, CardContent } from '@shadcn-angular/card';
import { Input } from '@shadcn-angular/input';
import { Label } from '@shadcn-angular/label';

@Component({
  imports: [Button, Card, CardHeader, CardTitle, CardContent, Input, Label],
  template: `
    <Button variant="default">Click me</Button>
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Label for="email">Email</Label>
        <Input type="email" id="email" />
      </CardContent>
    </Card>
  `
})
export class MyComponent {}
```

**Per-component package:** Each package exports standalone components and optional helper services where required (e.g., toast service).

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

## Phase 7+ Requirements: Extended Components & Documentation Site

### Additional Components (ZardUI/shadcn Parity)

The following components extend beyond the base shadcn/ui set to provide full feature parity with ZardUI:

| Package | Components | Description |
|---------|-----------|-------------|
| `@shadcn-angular/combobox` | Combobox | Autocomplete/searchable dropdown (composition of Popover + Command) |
| `@shadcn-angular/button-group` | ButtonGroup | Grouped buttons with shared styling |
| `@shadcn-angular/spinner` | Spinner | Loading indicator animations |
| `@shadcn-angular/kbd` | Kbd | Keyboard key indicator component |
| `@shadcn-angular/empty` | Empty | Empty state placeholder component |
| `@shadcn-angular/input-group` | InputGroup | Input with prefix/suffix addons |
| `@shadcn-angular/native-select` | NativeSelect | HTML native select with styling |
| `@shadcn-angular/typography` | Typography (H1-H6, P, Lead, etc.) | Text styling components |
| `@shadcn-angular/segmented` | Segmented | iOS-style segmented control buttons |
| `@shadcn-angular/sidebar` | Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarRail | Full sidebar system with collapsible states |
| `@shadcn-angular/data-table` | DataTable | Sortable, filterable, selectable data tables |
| `@shadcn-angular/chart` | Chart (Line, Bar, Pie, Area, etc.) | Chart components using external charting library |

### Documentation Site Requirements

**Goal:** Build a documentation site inspired by ZardUI (https://zardui.com) that showcases all components with live demos, code examples, and API documentation.

#### FR8 — Documentation Site Structure

```
/                       → Home page (hero, features, component showcase)
/docs                   → Documentation landing
/docs/introduction      → Getting started guide
/docs/installation      → Setup instructions
/docs/theming           → Theming documentation
/docs/dark-mode         → Dark mode implementation guide
/docs/components        → Components index (grid of all components)
/docs/components/[name] → Individual component page (preview, code, API)
```

#### FR9 — Home Page (ZardUI Style)

The home page must include:

1. **Hero Section**
   - Title: "Finally, a real @shadcn/ui alternative for Angular."
   - Subtitle with Angular, TypeScript, Tailwind CSS badges
   - "Get Started" and "View Components" CTA buttons

2. **Beautiful Components Section**
   - Interactive component cards (Button, Badge, Input, Checkbox, Switch, Progress, Avatar, Tooltip)
   - Each card shows live component demo with description
   - "View All" link to components page
   - Stats: "45+ Components", "99% TypeScript", "100% Tree Shakable"

3. **Features Section**
   - Lightning Fast (performance optimization)
   - Beautiful Design (modern design principles)
   - Developer Experience (TypeScript-first, IDE support)
   - Modular Architecture (tree-shakable)
   - Type Safe (strict typing)
   - Community Driven (open source)

4. **Footer**
   - Links to GitHub, NPM, social media

#### FR10 — Components Index Page

- Grid layout of component cards (3-column responsive)
- Categories: Layout, Form, Feedback, Navigation, Data
- Search/filter functionality
- Previous/Next navigation between components

#### FR11 — Component Detail Page

Each component page must include:

1. **Header** - Component name and description
2. **Live Preview** - Interactive demo with preview/code tabs
3. **Installation** - CLI and manual installation instructions
4. **Examples** - Multiple usage examples (Basic, Variants, etc.)
5. **API Reference** - Props table with types, defaults, and descriptions

### Dark Mode System Requirements

**Goal:** Implement a complete dark mode system matching shadcn/ui's implementation.

#### FR12 — Theme Provider Service

```typescript
// theme.service.ts
- Store theme preference in localStorage
- Support themes: 'light' | 'dark' | 'system'
- Listen to system preference changes (prefers-color-scheme)
- Add/remove 'dark' class on document root element
- Provide reactive theme state via signals
```

#### FR13 — Theme Toggle Component

```typescript
// theme-toggle.component.ts
- Dropdown menu with Sun/Moon/System icons
- Uses DropdownMenu component
- Persists selection to localStorage
- Smooth icon transitions
```

#### FR14 — CSS Variables

CSS variables are already defined in `styles.scss` with:
- Light mode colors (`:root`)
- Dark mode colors (`.dark`)
- Sidebar-specific theming
- Chart colors for both modes

### Project Structure for Documentation Site

```
src/app/
├── lib/
│   └── components/ui/          # Existing UI components
│       ├── combobox/           # NEW
│       ├── button-group/       # NEW
│       ├── spinner/            # NEW
│       ├── kbd/                # NEW
│       ├── empty/              # NEW
│       ├── input-group/        # NEW
│       ├── native-select/      # NEW
│       ├── typography/         # NEW
│       ├── segmented/          # NEW
│       ├── sidebar/            # NEW
│       ├── data-table/         # NEW
│       └── chart/              # NEW
├── pages/
│   ├── home/                   # Home page component
│   └── docs/
│       ├── layout/             # Docs sidebar layout
│       ├── introduction/       # Introduction page
│       ├── installation/       # Installation guide
│       ├── theming/            # Theming documentation
│       ├── dark-mode/          # Dark mode guide
│       ├── components-list/    # Components grid page
│       └── component-detail/   # Dynamic component detail page
├── components/
│   ├── site-header/            # Site navigation header
│   ├── site-footer/            # Site footer
│   ├── docs-sidebar/           # Documentation sidebar nav
│   ├── component-preview/      # Live component preview wrapper
│   ├── code-block/             # Syntax highlighted code block
│   └── theme-toggle/           # Dark mode toggle button
├── services/
│   ├── theme.service.ts        # Theme management service
│   └── component-registry.ts   # Component metadata registry
└── data/
    └── components.ts           # Component metadata and examples
```

### Routing Configuration

```typescript
// app.routes.ts
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

### Design Guidelines

1. **Color Scheme:** Dark background (`oklch(0.145 0 0)`) with white text as default
2. **Component Cards:** Rounded corners (`--radius: 0.625rem`), subtle borders, dark card backgrounds
3. **Interactive Demos:** Live components inside preview boxes with code toggle
4. **Code Blocks:** Syntax highlighted with copy button
5. **Typography:** Clean, modern, good spacing using Tailwind typography utilities
6. **Responsive:** Mobile-first design, collapsible sidebar on mobile

### Acceptance Criteria (Extended)

- **AC6:** All 12 additional components (Combobox through Chart) are implemented with element selectors
- **AC7:** Documentation site home page matches ZardUI design with hero, features, and component showcase
- **AC8:** Each component has a dedicated documentation page with preview, code, and API reference
- **AC9:** Dark mode toggle persists preference and responds to system changes
- **AC10:** Documentation site is fully responsive and accessible
