/**
 * Collapsible Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA design patterns
 */

import type { ComponentDocumentation } from '../types';

export const COLLAPSIBLE_DOCUMENTATION: ComponentDocumentation = {
  name: 'Collapsible',
  slug: 'collapsible',
  description:
    'An interactive component which expands/collapses a panel. A disclosure pattern that hides or shows additional content.',

  features: [
    { text: 'Full keyboard navigation.', highlight: true },
    { text: 'Can be controlled or uncontrolled.' },
    { text: 'Supports controlled and uncontrolled state.' },
    { text: 'Adheres to the Disclosure WAI-ARIA design pattern.', highlight: true },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/collapsible',
      pnpm: 'pnpm add @ng-cn/collapsible',
      yarn: 'yarn add @ng-cn/collapsible',
      bun: 'bun add @ng-cn/collapsible',
    },
    ngAdd: 'ng g @ng-cn/core:c collapsible',
  },

  anatomy: {
    importStatement: `import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/ui/collapsible';`,
    structure: `<Collapsible>
  <CollapsibleTrigger />
  <CollapsibleContent />
</Collapsible>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of a collapsible.',
      props: [
        {
          name: 'open',
          type: 'boolean | undefined',
          description:
            'The controlled open state of the collapsible. Use with (openChange) for controlled mode.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description:
            'The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from interacting with the collapsible.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the root.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-state]',
          values: '"open" | "closed"',
        },
        {
          name: '[data-disabled]',
          values: 'Present when disabled',
        },
      ],
      cssVariables: [
        {
          name: '--collapsible-content-width',
          description: 'The width of the content when it opens/closes',
        },
        {
          name: '--collapsible-content-height',
          description: 'The height of the content when it opens/closes',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'The button that toggles the collapsible.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the trigger.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-state]',
          values: '"open" | "closed"',
        },
        {
          name: '[data-disabled]',
          values: 'Present when disabled',
        },
      ],
    },
    {
      name: 'Content',
      description: 'The component that contains the collapsible content.',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description:
            'Used to force mounting when more control is needed. Useful for animation libraries.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the content.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-state]',
          values: '"open" | "closed"',
        },
        {
          name: '[data-disabled]',
          values: 'Present when disabled',
        },
      ],
      cssVariables: [
        {
          name: '--collapsible-content-width',
          description: 'The width of the content when it opens/closes',
        },
        {
          name: '--collapsible-content-height',
          description: 'The height of the content when it opens/closes',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple collapsible with trigger and content.',
      code: `<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. Free to use for personal and commercial projects. No attribution required.
  </CollapsibleContent>
</Collapsible>`,
      hasDemo: true,
    },
    {
      title: 'Open by default',
      description: 'Use the defaultOpen prop to have the collapsible open by default.',
      code: `<Collapsible [defaultOpen]="true">
  <CollapsibleTrigger>Is it accessible?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. It adheres to the WAI-ARIA design pattern.
  </CollapsibleContent>
</Collapsible>`,
    },
    {
      title: 'Controlled',
      description: 'Use the open input and openChange output to control the collapsible state.',
      code: `// In your component class:
isOpen = signal(false);

// In your template:
<Collapsible
  [open]="isOpen()"
  (openChange)="isOpen.set($event)"
>
  <CollapsibleTrigger>Toggle me</CollapsibleTrigger>
  <CollapsibleContent>
    This content is controlled externally.
  </CollapsibleContent>
</Collapsible>

<Button (click)="isOpen.set(!isOpen())">Toggle from outside</Button>`,
    },
    {
      title: 'Disabled',
      description: 'Use the disabled prop to disable the collapsible.',
      code: `<Collapsible [disabled]="true">
  <CollapsibleTrigger>This is disabled</CollapsibleTrigger>
  <CollapsibleContent>
    You cannot interact with this collapsible.
  </CollapsibleContent>
</Collapsible>`,
    },
    {
      title: 'With custom trigger',
      description: 'Customize the trigger with your own button or layout.',
      code: `<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline" size="sm">
      <ChevronsUpDown class="h-4 w-4" />
      <span>@peduarte starred 3 repositories</span>
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent class="mt-4">
    <div class="space-y-2">
      <div class="rounded-md border px-4 py-2">
        @radix-ui/primitives
      </div>
      <div class="rounded-md border px-4 py-2">
        @radix-ui/colors
      </div>
      <div class="rounded-md border px-4 py-2">
        @stitches/react
      </div>
    </div>
  </CollapsibleContent>
</Collapsible>`,
    },
    {
      title: 'Animating content size',
      description:
        'Use the --collapsible-content-height CSS variable to animate the size of the content when it opens/closes.',
      code: `<Collapsible>
  <CollapsibleTrigger>Animated Content</CollapsibleTrigger>
  <CollapsibleContent class="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
    This content animates smoothly using CSS animations
    and the height CSS variable.
  </CollapsibleContent>
</Collapsible>`,
      css: `/* In your tailwind.config.ts */
animation: {
  'collapsible-down': 'collapsible-down 0.2s ease-out',
  'collapsible-up': 'collapsible-up 0.2s ease-out',
},
keyframes: {
  'collapsible-down': {
    from: { height: '0' },
    to: { height: 'var(--collapsible-content-height)' },
  },
  'collapsible-up': {
    from: { height: 'var(--collapsible-content-height)' },
    to: { height: '0' },
  },
}`,
    },
  ],

  accessibility: {
    ariaPattern: 'Disclosure WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure',
    keyboardInteractions: [
      {
        key: 'Space',
        description: 'Opens/closes the collapsible.',
      },
      {
        key: 'Enter',
        description: 'Opens/closes the collapsible.',
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
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/collapsible',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure',
      icon: 'docs',
    },
  ],
};
