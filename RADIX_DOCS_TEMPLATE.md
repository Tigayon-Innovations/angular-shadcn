# Radix-Style Component Documentation Implementation Guide

## Overview

This guide explains how to add comprehensive Radix-style documentation to ng-cn components. The system provides:

- **Features list** with highlights
- **Installation** instructions (npm, pnpm, yarn, bun, ng add)
- **Anatomy** showing component structure
- **API Reference** with separate sections for each sub-component
- **Examples** with code snippets
- **Accessibility** information with keyboard interactions
- **Additional links** (source, issues, ARIA specs)

## Architecture

The documentation system consists of:

1. **Types** (`src/app/services/component-docs/types.ts`) - Defines the data structure
2. **Documentation Data** (`src/app/services/component-docs/docs/*.ts`) - Per-component docs
3. **Registry Service** (`src/app/services/component-docs/component-docs.service.ts`) - Manages docs
4. **Documentation Page** (`src/app/pages/docs/component-detail/component-doc.component.ts`) - Renders Radix-style UI
5. **Router Wrapper** (`src/app/pages/docs/component-detail/component-detail-router.component.ts`) - Smart dispatcher

## How It Works

### Current Implementation

**Accordion** is fully implemented as an example. When users visit `/docs/components/accordion`:

1. `ComponentDetailRouter` checks if accordion has detailed documentation
2. If yes → renders `ComponentDocPage` with Radix-style UI
3. If no → falls back to `ComponentDetailPage` (legacy format)

### Adding a New Component

To add documentation for a component (e.g., `Button`), follow these steps:

## Step 1: Create Component Documentation File

Create: `src/app/services/component-docs/docs/button.ts`

```typescript
import type { ComponentDocumentation } from '../types';

export const BUTTON_DOCUMENTATION: ComponentDocumentation = {
  name: 'Button',
  slug: 'button',
  description: 'Displays a button or a component that looks like a button.',

  features: [
    { text: 'Multiple visual variants (primary, secondary, destructive, etc.)' },
    { text: 'Customizable sizes (sm, md, lg)', highlight: true },
    { text: 'Loading and disabled states', highlight: true },
    { text: 'Full keyboard support' },
    { text: 'Accessible by default' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/button',
      pnpm: 'pnpm add @ng-cn/button',
      yarn: 'yarn add @ng-cn/button',
      bun: 'bun add @ng-cn/button',
    },
    ngAdd: 'ng g @ng-cn/core:c button',
  },

  anatomy: {
    importStatement: `import { Button } from '@/ui/button';`,
    structure: `<Button>Click me</Button>`,
  },

  apiReference: [
    {
      name: 'Button',
      description: 'The main button component.',
      props: [
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'",
          default: "'primary'",
          description: 'The visual style variant of the button.',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: 'The size of the button.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Whether the button is disabled.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-state]',
          values: "'active' | 'inactive'",
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple button with default styling.',
      code: `<Button>Click me</Button>`,
      hasDemo: true,
    },
    {
      title: 'Variants',
      description: 'Different button variants for different use cases.',
      code: `<div class="flex flex-wrap gap-2">
  <Button>Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`,
    },
    {
      title: 'Sizes',
      description: 'Buttons come in different sizes.',
      code: `<div class="flex flex-wrap gap-2">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>`,
    },
    {
      title: 'Disabled',
      description: 'Use the disabled prop to prevent interaction.',
      code: `<Button disabled>Disabled Button</Button>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Button WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/button',
    keyboardInteractions: [
      {
        key: 'Space',
        description: 'When focus is on the button, activates it.',
      },
      {
        key: 'Enter',
        description: 'When focus is on the button, activates it.',
      },
      {
        key: 'Tab',
        description: 'Moves focus to the next focusable element.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus to the previous focusable element.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/button',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/button',
      icon: 'docs',
    },
  ],
};
```

## Step 2: Register Documentation in Service

Edit: `src/app/services/component-docs/component-docs.service.ts`

Add the import:
```typescript
import { BUTTON_DOCUMENTATION } from './docs/button';
```

Add to the docs map in `ComponentDocsRegistry`:
```typescript
private readonly docs: Map<string, ComponentDocumentation> = new Map([
  ['accordion', ACCORDION_DOCUMENTATION],
  ['button', BUTTON_DOCUMENTATION],  // Add this line
  // ... more components
]);
```

## Step 3: Export from Index

Edit: `src/app/services/component-docs/index.ts`

Add the export:
```typescript
export { BUTTON_DOCUMENTATION } from './docs/button';
```

## Step 4: Done!

The component documentation is now automatically available at `/docs/components/button` with the Radix-style UI.

## Data Structure Reference

### ComponentDocumentation

| Field | Type | Description |
|-------|------|-------------|
| name | string | Component name (e.g., "Button") |
| slug | string | URL slug (e.g., "button") |
| description | string | Brief description |
| features | Feature[] | List of key features |
| installation | InstallationInfo | Package manager instructions |
| anatomy | AnatomyInfo | Component structure |
| apiReference | ComponentApiReference[] | API for each sub-component |
| examples | DocumentationExample[] | Code examples |
| accessibility | AccessibilityInfo | ARIA & keyboard info |
| links | ExternalLink[] | Related links |

### Feature

```typescript
{
  text: string;           // Feature description
  highlight?: boolean;    // Make it stand out
}
```

### ComponentApiReference

```typescript
{
  name: string;                           // "Root", "Item", "Trigger", etc.
  description: string;                    // What this part does
  props: ApiProp[];                      // Component inputs/props
  dataAttributes?: DataAttribute[];      // [data-*] attributes
  cssVariables?: CssVariable[];          // CSS custom properties
}
```

### ApiProp

```typescript
{
  name: string;           // Property name
  type: string;           // TypeScript type (e.g., "'sm' | 'md' | 'lg'")
  default?: string;       // Default value if any
  required?: boolean;     // Is it required?
  description: string;    // What it does
}
```

### DataAttribute

```typescript
{
  name: string;          // e.g., "[data-state]"
  values: string;        // e.g., "'open' | 'closed'"
}
```

### CssVariable

```typescript
{
  name: string;          // e.g., "--button-padding"
  description: string;   // What this controls
}
```

### DocumentationExample

```typescript
{
  title: string;              // Example title
  description?: string;       // Explanation
  code: string;              // Code snippet (HTML/TS)
  css?: string;              // Optional CSS if needed
  hasDemo?: boolean;         // Has interactive demo?
}
```

### AccessibilityInfo

```typescript
{
  ariaPattern?: string;                      // e.g., "Button WAI-ARIA design pattern"
  ariaPatternUrl?: string;                   // Link to pattern spec
  keyboardInteractions: KeyboardInteraction[];
}
```

### KeyboardInteraction

```typescript
{
  key: string;          // e.g., "Space", "Enter", "ArrowDown"
  description: string;  // What this key does
}
```

### ExternalLink

```typescript
{
  text: string;                    // Link text
  url: string;                     // URL
  icon?: 'source' | 'issue' | 'docs' | 'external';
}
```

## Component Demo Registration (Optional)

To enable interactive demos, also register in `ComponentDemos` service:

File: `src/app/services/component-demos.service.ts`

```typescript
this.registerDemo('button', () =>
  import('@/pages/docs/component-detail/demos/button-demo').then((m) => ({
    component: m.ButtonDemo,
  }))
);
```

## Process for Future Components

1. **Prepare the component folder** - Have the full component with all sub-components
2. **Drag to conversation** - Include both:
   - The component folder (e.g., `src/app/lib/components/ui/button/`)
   - This markdown file
3. **Say: "Implement accordion-style docs for [ComponentName]"**
4. **Done!** - Full Radix-style documentation will be set up

## Example: Full Implementation Workflow

```
User drops:
  📁 button/ (component folder)
  📄 RADIX_DOCS_TEMPLATE.md (this file)

User says:
  "Implement accordion-style docs for Button"

System:
  ✅ Creates src/app/services/component-docs/docs/button.ts
  ✅ Updates component-docs.service.ts
  ✅ Updates component-docs/index.ts
  ✅ Component available at /docs/components/button
  ✅ Renders with Radix-style UI automatically
```

## Best Practices

1. **Highlights** - Use `highlight: true` for 2-3 key features
2. **Examples** - Start simple, then show advanced usage
3. **API Props** - Keep descriptions concise and actionable
4. **Keyboard Interactions** - Follow WAI-ARIA standards
5. **Links** - Always include GitHub source and ARIA pattern link
6. **Demos** - Mark examples with `hasDemo: true` if they have interactive demos

## Testing

After implementing:

1. Visit `/docs/components/[slug]`
2. Verify all sections render correctly
3. Check keyboard navigation works
4. Ensure links are accessible
5. Test responsive layout on mobile

## Troubleshooting

**Documentation not showing?**
- Check the slug matches the URL
- Verify import in component-docs.service.ts
- Confirm export in component-docs/index.ts

**Missing sections?**
- Ensure all required fields in ComponentDocumentation
- Check for typos in field names

**Demo not showing?**
- Register in ComponentDemos service
- Set `hasDemo: true` in example

## Migration Path

This system allows **gradual migration** from old to new format:
- Old components use `ComponentDetailPage`
- New components use `ComponentDocPage`
- Router automatically picks the right one
- No breaking changes
