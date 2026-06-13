/**
 * Accordion Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const ACCORDION_DOCUMENTATION: ComponentDocumentation = {
  name: 'Accordion',
  slug: 'accordion',
  description:
    'A vertically stacked set of interactive headings that each reveal an associated section of content.',

  features: [
    { text: 'Full keyboard navigation.', highlight: true },
    { text: 'Supports horizontal/vertical orientation.' },
    { text: 'Supports Right to Left direction.' },
    { text: 'Can expand one or multiple items.', highlight: true },
    { text: 'Can be controlled or uncontrolled.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/accordion',
      pnpm: 'pnpm add @ng-cn/accordion',
      yarn: 'yarn add @ng-cn/accordion',
      bun: 'bun add @ng-cn/accordion',
    },
    ngAdd: 'ng g @ng-cn/core:c accordion',
  },

  anatomy: {
    importStatement: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/ui/accordion';`,
    structure: `<Accordion>
  <AccordionItem>
    <AccordionTrigger />
    <AccordionContent />
  </AccordionItem>
</Accordion>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of an accordion.',
      props: [
        {
          name: 'type',
          type: "'single' | 'multiple'",
          default: "'single'",
          description: 'Determines whether one or multiple items can be opened at the same time.',
        },
        {
          name: 'value',
          type: 'string | string[]',
          description: 'The controlled value of the item(s) to expand. Use with (valueChange).',
        },
        {
          name: 'defaultValue',
          type: 'string | string[]',
          description:
            'The value of the item(s) to expand when initially rendered. Use when you do not need to control the state.',
        },
        {
          name: 'collapsible',
          type: 'boolean',
          default: 'false',
          description:
            'When type is "single", allows closing content when clicking on the open trigger.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from interacting with the accordion.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the accordion root.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-orientation]',
          values: '"vertical" | "horizontal"',
        },
      ],
    },
    {
      name: 'Item',
      description: 'Contains all the parts of a collapsible section.',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'A unique value for the item.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from interacting with this item.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the item.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-disabled]', values: 'Present when disabled' },
        { name: '[data-orientation]', values: '"vertical" | "horizontal"' },
      ],
    },
    {
      name: 'Trigger',
      description:
        'Toggles the collapsed state of its associated item. It should be nested inside of an AccordionItem.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the trigger.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-disabled]', values: 'Present when disabled' },
        { name: '[data-orientation]', values: '"vertical" | "horizontal"' },
      ],
    },
    {
      name: 'Content',
      description: 'Contains the collapsible content for an item.',
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
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-disabled]', values: 'Present when disabled' },
        { name: '[data-orientation]', values: '"vertical" | "horizontal"' },
      ],
      cssVariables: [
        {
          name: '--accordion-content-width',
          description: 'The width of the content when it opens/closes',
        },
        {
          name: '--accordion-content-height',
          description: 'The height of the content when it opens/closes',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple accordion with three items.',
      code: `<Accordion type="single" collapsible class="w-full max-w-md">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match the shadcn/ui aesthetic.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>
      Yes. It's animated by default with smooth transitions.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
      hasDemo: true,
    },
    {
      title: 'Expanded by default',
      description: 'Use the defaultValue prop to define the open item by default.',
      code: `<Accordion type="single" defaultValue="item-2" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>Content for first item.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second Item (Open by default)</AccordionTrigger>
    <AccordionContent>This item is open by default.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    },
    {
      title: 'Allow collapsing all items',
      description: 'Use the collapsible prop to allow all items to close.',
      code: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Collapsible Item</AccordionTrigger>
    <AccordionContent>
      Click the trigger again to collapse this item.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    },
    {
      title: 'Multiple items open at the same time',
      description: 'Set the type prop to "multiple" to enable opening multiple items at once.',
      code: `<Accordion type="multiple" class="w-full max-w-md">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section One</AccordionTrigger>
    <AccordionContent>
      Content for section one. This can be open alongside other sections.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>Section Two</AccordionTrigger>
    <AccordionContent>
      Content for section two. Multiple sections can be expanded.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger>Section Three</AccordionTrigger>
    <AccordionContent>
      Content for section three.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    },
    {
      title: 'Controlled',
      description: 'Use the value input and valueChange output to control the accordion state.',
      code: `// In your component class:
value = signal<string | undefined>('item-1');

// In your template:
<Accordion
  type="single"
  [value]="value()"
  (valueChange)="value.set($event)"
  collapsible
>
  <AccordionItem value="item-1">
    <AccordionTrigger>Controlled Item 1</AccordionTrigger>
    <AccordionContent>Content controlled externally.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Controlled Item 2</AccordionTrigger>
    <AccordionContent>You can open this from outside.</AccordionContent>
  </AccordionItem>
</Accordion>

<Button (click)="value.set('item-2')">Open Item 2</Button>`,
    },
    {
      title: 'Animating content size',
      description:
        'Use the --accordion-content-height CSS variable to animate the size of the content when it opens/closes.',
      code: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Animated Content</AccordionTrigger>
    <AccordionContent class="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
      This content animates smoothly using CSS animations
      and the height CSS variable.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
      css: `/* In your tailwind.config.js */
animation: {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
},
keyframes: {
  'accordion-down': {
    from: { height: '0' },
    to: { height: 'var(--accordion-content-height)' },
  },
  'accordion-up': {
    from: { height: 'var(--accordion-content-height)' },
    to: { height: '0' },
  },
}`,
    },
  ],

  accessibility: {
    ariaPattern: 'Accordion WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion',
    keyboardInteractions: [
      {
        key: 'Space',
        description:
          'When focus is on an AccordionTrigger of a collapsed section, expands the section.',
      },
      {
        key: 'Enter',
        description:
          'When focus is on an AccordionTrigger of a collapsed section, expands the section.',
      },
      {
        key: 'Tab',
        description: 'Moves focus to the next focusable element.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus to the previous focusable element.',
      },
      {
        key: 'ArrowDown',
        description: 'Moves focus to the next AccordionTrigger when orientation is vertical.',
      },
      {
        key: 'ArrowUp',
        description: 'Moves focus to the previous AccordionTrigger when orientation is vertical.',
      },
      {
        key: 'ArrowRight',
        description: 'Moves focus to the next AccordionTrigger when orientation is horizontal.',
      },
      {
        key: 'ArrowLeft',
        description: 'Moves focus to the previous AccordionTrigger when orientation is horizontal.',
      },
      {
        key: 'Home',
        description:
          'When focus is on an AccordionTrigger, moves focus to the first AccordionTrigger.',
      },
      {
        key: 'End',
        description:
          'When focus is on an AccordionTrigger, moves focus to the last AccordionTrigger.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/tree/main/src/app/lib/components/ui/accordion',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion',
      icon: 'docs',
    },
  ],
};
