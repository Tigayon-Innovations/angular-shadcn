/**
 * Component metadata for shadcn-angular MCP Server
 */

import { ComponentMetadata } from './types.js';

export const componentsData: ComponentMetadata[] = [
  {
    name: 'Button',
    selector: 'Button',
    package: '@shadcn-angular/button',
    description: 'A versatile button component with multiple variants and sizes.',
    category: 'basic',
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    inputs: [
      {
        name: 'variant',
        type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
        description: 'The visual style variant of the button',
        default: "'default'",
        required: false,
      },
      {
        name: 'size',
        type: "'default' | 'sm' | 'lg' | 'icon'",
        description: 'The size of the button',
        default: "'default'",
        required: false,
      },
      {
        name: 'class',
        type: 'string',
        description: 'Additional CSS classes to apply',
        default: "''",
        required: false,
      },
    ],
    examples: [
      {
        title: 'Default Button',
        description: 'A basic button with default styling',
        code: `<Button>Click me</Button>`,
      },
      {
        title: 'Button Variants',
        description: 'Different visual styles',
        code: `<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`,
      },
      {
        title: 'Button Sizes',
        description: 'Different button sizes',
        code: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <svg><!-- Icon --></svg>
</Button>`,
      },
    ],
    installation: {
      npm: 'npm install @shadcn-angular/button',
      pnpm: 'pnpm add @shadcn-angular/button',
      yarn: 'yarn add @shadcn-angular/button',
      bun: 'bun add @shadcn-angular/button',
      ngAdd: 'ng add @shadcn-angular/button',
      manual: {
        description: 'Manually copy the component files to your project',
        steps: [
          'Create src/app/lib/components/ui/button directory',
          'Copy button.component.ts and button-variants.ts',
          'Import Button in your component',
        ],
        files: [
          'src/app/lib/components/ui/button/button.component.ts',
          'src/app/lib/components/ui/button/button-variants.ts',
        ],
      },
    },
    usage: `import { Button } from '@/lib/components/ui/button';

<Button>Click me</Button>
<Button variant="destructive">Delete</Button>`,
    variants: [
      {
        name: 'variant',
        values: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
        default: 'default',
      },
      {
        name: 'size',
        values: ['default', 'sm', 'lg', 'icon'],
        default: 'default',
      },
    ],
    relatedComponents: ['ButtonGroup'],
  },
  {
    name: 'Card',
    selector: 'Card',
    package: '@shadcn-angular/card',
    description: 'A container component for displaying content with header, body, and footer sections.',
    category: 'basic',
    dependencies: [],
    examples: [
      {
        title: 'Basic Card',
        description: 'A simple card with title and description',
        code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`,
      },
    ],
    installation: {
      npm: 'npm install @shadcn-angular/card',
      pnpm: 'pnpm add @shadcn-angular/card',
      yarn: 'yarn add @shadcn-angular/card',
      bun: 'bun add @shadcn-angular/card',
      ngAdd: 'ng add @shadcn-angular/card',
      manual: {
        description: 'Manually copy the card component files',
        steps: [
          'Create src/app/lib/components/ui/card directory',
          'Copy all card component files',
          'Import Card components in your component',
        ],
        files: [
          'src/app/lib/components/ui/card/card.component.ts',
          'src/app/lib/components/ui/card/card-header.component.ts',
          'src/app/lib/components/ui/card/card-title.component.ts',
          'src/app/lib/components/ui/card/card-description.component.ts',
          'src/app/lib/components/ui/card/card-content.component.ts',
          'src/app/lib/components/ui/card/card-footer.component.ts',
        ],
      },
    },
    usage: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/lib/components/ui/card';`,
    relatedComponents: ['Alert', 'Dialog'],
  },
  {
    name: 'Input',
    selector: 'Input',
    package: '@shadcn-angular/input',
    description: 'A styled text input component that integrates with Angular forms.',
    category: 'form',
    dependencies: [],
    inputs: [
      {
        name: 'type',
        type: 'string',
        description: 'The HTML input type',
        default: "'text'",
        required: false,
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text',
        required: false,
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Whether the input is disabled',
        default: 'false',
        required: false,
      },
      {
        name: 'class',
        type: 'string',
        description: 'Additional CSS classes',
        default: "''",
        required: false,
      },
    ],
    examples: [
      {
        title: 'Basic Input',
        description: 'A simple text input',
        code: `<Input placeholder="Enter text..." />`,
      },
      {
        title: 'With Form Control',
        description: 'Input with reactive forms',
        code: `<Input [formControl]="emailControl" type="email" placeholder="Email" />`,
      },
    ],
    installation: {
      npm: 'npm install @shadcn-angular/input',
      pnpm: 'pnpm add @shadcn-angular/input',
      yarn: 'yarn add @shadcn-angular/input',
      bun: 'bun add @shadcn-angular/input',
      ngAdd: 'ng add @shadcn-angular/input',
      manual: {
        description: 'Manually copy the input component',
        steps: [
          'Create src/app/lib/components/ui/input directory',
          'Copy input.component.ts',
          'Import Input in your component',
        ],
        files: ['src/app/lib/components/ui/input/input.component.ts'],
      },
    },
    usage: `import { Input } from '@/lib/components/ui/input';

<Input placeholder="Email" type="email" />`,
    relatedComponents: ['Form', 'Label', 'Textarea'],
  },
  {
    name: 'Dialog',
    selector: 'Dialog',
    package: '@shadcn-angular/dialog',
    description: 'A modal dialog component for displaying content that requires user interaction.',
    category: 'overlay',
    dependencies: ['@angular/cdk'],
    examples: [
      {
        title: 'Basic Dialog',
        description: 'A simple dialog with trigger',
        code: `<Dialog>
  <DialogTrigger>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description goes here.</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
    <DialogFooter>
      <Button>Cancel</Button>
      <Button variant="default">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    ],
    installation: {
      npm: 'npm install @shadcn-angular/dialog @angular/cdk',
      pnpm: 'pnpm add @shadcn-angular/dialog @angular/cdk',
      yarn: 'yarn add @shadcn-angular/dialog @angular/cdk',
      bun: 'bun add @shadcn-angular/dialog @angular/cdk',
      ngAdd: 'ng add @shadcn-angular/dialog',
      manual: {
        description: 'Manually copy the dialog component files',
        steps: [
          'Install @angular/cdk',
          'Create src/app/lib/components/ui/dialog directory',
          'Copy all dialog component files',
          'Import Dialog components in your component',
        ],
        files: [
          'src/app/lib/components/ui/dialog/dialog.component.ts',
          'src/app/lib/components/ui/dialog/dialog-trigger.directive.ts',
          'src/app/lib/components/ui/dialog/dialog-content.component.ts',
          'src/app/lib/components/ui/dialog/dialog-header.component.ts',
          'src/app/lib/components/ui/dialog/dialog-footer.component.ts',
          'src/app/lib/components/ui/dialog/dialog-title.component.ts',
          'src/app/lib/components/ui/dialog/dialog-description.component.ts',
          'src/app/lib/components/ui/dialog/dialog-close.directive.ts',
        ],
      },
    },
    usage: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/lib/components/ui/dialog';`,
    relatedComponents: ['AlertDialog', 'Sheet', 'Drawer'],
  },
  {
    name: 'Select',
    selector: 'Select',
    package: '@shadcn-angular/select',
    description: 'A dropdown select component for choosing from a list of options.',
    category: 'form',
    dependencies: ['@angular/cdk'],
    examples: [
      {
        title: 'Basic Select',
        description: 'A simple select dropdown',
        code: `<Select placeholder="Select an option">
  <SelectTrigger>
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
    <SelectItem value="3">Option 3</SelectItem>
  </SelectContent>
</Select>`,
      },
    ],
    installation: {
      npm: 'npm install @shadcn-angular/select @angular/cdk',
      pnpm: 'pnpm add @shadcn-angular/select @angular/cdk',
      yarn: 'yarn add @shadcn-angular/select @angular/cdk',
      bun: 'bun add @shadcn-angular/select @angular/cdk',
      ngAdd: 'ng add @shadcn-angular/select',
      manual: {
        description: 'Manually copy the select component files',
        steps: [
          'Install @angular/cdk',
          'Create src/app/lib/components/ui/select directory',
          'Copy all select component files',
        ],
        files: [
          'src/app/lib/components/ui/select/select.component.ts',
          'src/app/lib/components/ui/select/select-trigger.component.ts',
          'src/app/lib/components/ui/select/select-value.component.ts',
          'src/app/lib/components/ui/select/select-content.component.ts',
          'src/app/lib/components/ui/select/select-item.component.ts',
        ],
      },
    },
    usage: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/lib/components/ui/select';`,
    relatedComponents: ['Combobox', 'Command', 'NativeSelect'],
  },
];

export const componentCategories = {
  basic: 'Basic Components',
  form: 'Form Components',
  layout: 'Layout Components',
  overlay: 'Overlay Components',
  complex: 'Complex Components',
  advanced: 'Advanced Components',
};

export function searchComponents(query: string, category?: string): ComponentMetadata[] {
  let results = componentsData;

  if (category) {
    results = results.filter((c) => c.category === category);
  }

  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery) ||
        c.selector.toLowerCase().includes(lowerQuery)
    );
  }

  return results;
}

export function getComponent(name: string): ComponentMetadata | undefined {
  return componentsData.find(
    (c) => c.name.toLowerCase() === name.toLowerCase() || c.selector.toLowerCase() === name.toLowerCase()
  );
}
