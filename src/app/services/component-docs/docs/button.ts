/**
 * Button Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const BUTTON_DOCUMENTATION: ComponentDocumentation = {
  name: 'Button',
  slug: 'button',
  description:
    'Displays a button or a component that looks like a button. Supports multiple variants and sizes with full accessibility.',

  features: [
    { text: 'Multiple visual variants (default, destructive, outline, secondary, ghost, link).', highlight: true },
    { text: 'Multiple sizes (default, sm, lg, icon).' },
    { text: 'Built-in loading state with spinner.', highlight: true },
    { text: 'Disabled state support.' },
    { text: 'Fully accessible with ARIA attributes.' },
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
      description: 'An interactive button element with support for variants, sizes, and loading states.',
      props: [
        {
          name: 'variant',
          type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
          default: "'default'",
          description: 'The visual style variant of the button.',
        },
        {
          name: 'size',
          type: "'default' | 'sm' | 'lg' | 'icon'",
          default: "'default'",
          description: 'The size of the button.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Whether the button is disabled. Also disables pointer events and reduces opacity.',
        },
        {
          name: 'loading',
          type: 'boolean',
          default: 'false',
          description: 'Whether the button is in a loading state. Displays a spinner and sets aria-busy. Implicitly disables the button.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the button.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"button"' },
        { name: '[data-loading]', values: 'Present when loading is true' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple button with default styles.',
      code: `<Button>Click me</Button>`,
      hasDemo: true,
    },
    {
      title: 'Variants',
      description: 'Use the variant prop to change the visual style of the button.',
      code: `<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`,
    },
    {
      title: 'Sizes',
      description: 'Use the size prop to change the size of the button.',
      code: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <lucide-icon name="plus" />
</Button>`,
    },
    {
      title: 'Loading state',
      description: 'Use the loading prop to show a spinner and prevent interaction while an action is in progress.',
      code: `// In your component class:
isSubmitting = signal(false);

async onSubmit() {
  this.isSubmitting.set(true);
  await submitForm();
  this.isSubmitting.set(false);
}

// In your template:
<Button [loading]="isSubmitting()" (click)="onSubmit()">
  Submit
</Button>`,
    },
    {
      title: 'Disabled',
      description: 'Use the disabled prop to prevent user interaction.',
      code: `<Button [disabled]="true">Disabled</Button>
<Button variant="outline" [disabled]="true">Disabled Outline</Button>`,
    },
    {
      title: 'With icon',
      description: 'Buttons can include icons alongside text.',
      code: `<Button>
  <lucide-icon name="mail" />
  Send email
</Button>

<Button variant="outline" size="icon">
  <lucide-icon name="settings" />
</Button>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Button WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
    keyboardInteractions: [
      {
        key: 'Space',
        description: 'Activates the button.',
      },
      {
        key: 'Enter',
        description: 'Activates the button.',
      },
      {
        key: 'Tab',
        description: 'Moves focus to the button.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus away from the button.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/button',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
      icon: 'docs',
    },
  ],
};
