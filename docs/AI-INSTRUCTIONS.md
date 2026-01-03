# AI Implementation Instructions

This document provides context and instructions for AI assistants working on the shadcn-angular project.

## Project Overview

shadcn-angular is an Angular port of shadcn/ui components. The key requirements are:

1. **Exact naming parity** with React shadcn/ui
2. **Element selectors only** for all components (e.g., `<Button>`, `<Card>`, `<Input>`)
3. **No attribute selectors** - all components use element selectors
4. **Tailwind CSS v4** compatibility
5. **Standalone components** only (no NgModules)
6. **Signal-based** state management

## Before Starting Any Task

1. **Read `docs/TASKS.md`** to understand current progress
2. **Read `docs/PRD.md`** for requirements
3. **Check existing components** in `src/app/lib/components/ui/` for patterns
4. **Use Context7 MCP tool** for up-to-date Angular documentation
a
## File Structure

```
src/app/lib/
├── components/ui/          # all UI components
│   ├── button/
│   │   ├── index.ts        # exports
│   │   ├── button.component.Ts
│   │   └── button-variants.ts
│   └── [other-components]/
├── utils/
│   ├── cn.ts               # Class merging utility
│   └── index.Ts
└── index.ts                # Public API
```

## Component implementationion Pattern

### Selector Strategy

**ALL components use element selectors** - no attribute selectors:
- `<Button>` - badgeutton component
- `<Input>` - input component  
- `<Label>` - label component
- `<Textarea>` - textarea component
- `<Card>`, `<CardHeader>`, `<CardTitle>`, etc.
- `<Alert>`, `<AlertTitle>`a, `<AlertDescription>`
- `<Avatar>`, `<AvatarImage>`, `<AvatarFallback>`
- `<Badge>`, `<Separator>`, `<Skeleton>`
- `<Accordion>`,a `<AccordionItem>`, `<AccordionTrigger>`, `<AccordionContent>`
- `<Tabs>`, `<TabsList>`, `<TabsTrigger>`, `<TabsContent>`
above
### 1. Create the variants file (if component has variants)

```typescript
// component-variants.ts
import { cva, type VariantsiantProps } from 'class name {
  constructor(parameters) {
    
  }
}-variance-authority';

export const componentVariants = cva(
  'base-classesimport { Injectable } from '@angular/core';
  import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class YourInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req);
    }
  }here',
  {
    variants: {
      variant: {
        default: 'variant-classes',
        secondary: 'other-classes',
      },
      size: {
        default: 'size-classes',
        sm: 'small-classes',
        lg: 'large-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ComponentVariants = VariantProps<typeof componentVariants>;
```

### 2. Create the component (element selector)

```typescript
// component.component.ts
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '@/utils';
import { componentVariants, type ComponentVariants } from './component-variants';

@Component({
  selector: 'ComponentName',  // ELEMENT SELECTOR - always
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'computedClass()',
  },
  template: `<ng-content />`,
})
export class ComponentName {
  readonly variant = input<ComponentVariants['variant']>('default');
  readonly size = input<ComponentVariants['size']>('default');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      componentVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.class()
    )
  );
}
```

### 3. Create the index file

```typescript
// index.ts
export { ComponentName } from './component.component';
export { componentVariants, type ComponentVariants } from './component-variants';
```

### 4. Export from main index

Add to `src/app/lib/components/ui/index.ts`:
```typescript
export * from './component-name';
```

## Key Conventions

### DO:
- ✅ Use element selectors for ALL components: `selector: 'Button'`, `selector: 'Input'`
- ✅ Use `ChangeDetectionStrategy.OnPush`
- ✅ Use `input()` function (not `@Input` decorator)
- ✅ Use `computed()` for derived state
- ✅ Use `cn()` utility for class merging
- ✅ Use `host` object for host bindings
- ✅ Accept `class` input: `readonly class = input<string>('');`

### DON'T:
- ❌ Use attribute selectors like `[Button]` or `[Input]`
- ❌ Use custom prefixes like `ui-button` or `shad-card`
- ❌ Use `@HostBinding` or `@HostListener` decorators
- ❌ Use `@Input()` decorator (use `input()` function instead)
- ❌ Use `ngClass` or `ngStyle` (use class/style bindings)
- ❌ Set `standalone: true` explicitly (it's the default in Angular 21+)

### Example Usage in Templates:

```html
<!-- Buttons -->
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive" size="lg">Delete</Button>

<!-- Form inputs -->
<Label for="email">Email</Label>
<Input type="email" id="email" placeholder="Enter email" />

<Label for="message">Message</Label>
<Textarea id="message" placeholder="Type here..."></Textarea>

<!-- Card -->
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>

<!-- Avatar -->
<Avatar>
  <AvatarImage src="/avatar.png" alt="User" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

<!-- Alert -->
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

## Tailwind v4 Notes

- Import: `@use "tailwindcss";` (not `@tailwind` directives)
- Use CSS variables defined in `styles.scss`
- No deprecated utilities (use replacements in PRD)

## Testing

After implementing a component:

```bash
# Run the dev server to test visually
npm run start

# Run unit tests
npm test

# Type check
npx tsc --noEmit
```

## Updating Progress

After completing a component:

1. Update `docs/TASKS.md` - mark component as ✅ Done
2. Add files created to the component row
3. Update the changelog at the bottom

## Common Imports

```typescript
// Always needed
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '@/utils';

// For variants
import { cva, type VariantProps } from 'class-variance-authority';

// For context/state sharing
import { signal, Injectable, inject } from '@angular/core';

// For CDK (overlays, dialogs)
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
```

## Path Aliases

These are configured in `tsconfig.json`:
- `@/` → `src/app/lib/`
- `@/ui` → `src/app/lib/components/ui/`
- `@/utils` → `src/app/lib/utils/`

## Quick Component Checklist

- [ ] Element selector (no attribute selectors)
- [ ] Selector matches React shadcn name exactly
- [ ] OnPush change detection
- [ ] Signal-based inputs with `input()`
- [ ] Host class binding with `cn()`
- [ ] Accepts custom `class` prop
- [ ] Exported from component index
- [ ] Exported from main ui/index.ts
- [ ] Added to showcase in app.html (if applicable)
- [ ] TASKS.md updated
