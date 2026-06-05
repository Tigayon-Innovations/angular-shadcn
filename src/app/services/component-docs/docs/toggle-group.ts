/**
 * ToggleGroup Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const TOGGLE_GROUP_DOCUMENTATION: ComponentDocumentation = {
  name: 'Toggle Group',
  slug: 'toggle-group',
  description: 'A set of two-state buttons that can be toggled on or off, allowing single or multiple selection.',

  features: [
    { text: 'Single or multiple selection modes.', highlight: true },
    { text: 'Full keyboard navigation with arrow keys.', highlight: true },
    { text: 'Roving tabindex for efficient keyboard navigation.' },
    { text: 'Supports horizontal and vertical orientation.' },
    { text: 'Configurable variant and size inherited by all items.' },
    { text: 'Focus loops at group boundaries.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/toggle-group',
      pnpm: 'pnpm add @ng-cn/toggle-group',
      yarn: 'yarn add @ng-cn/toggle-group',
      bun: 'bun add @ng-cn/toggle-group',
    },
    ngAdd: 'ng g @ng-cn/core:c toggle-group',
  },

  anatomy: {
    importStatement: `import {
  ToggleGroup,
  ToggleGroupItem
} from '@/ui/toggle-group';`,
    structure: `<ToggleGroup>
  <ToggleGroupItem value="a" />
  <ToggleGroupItem value="b" />
  <ToggleGroupItem value="c" />
</ToggleGroup>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the toggle items in the group.',
      props: [
        {
          name: 'type',
          type: "'single' | 'multiple'",
          default: "'single'",
          description: 'Determines whether one or multiple items can be pressed at the same time.',
        },
        {
          name: 'value',
          type: 'string | string[]',
          default: "''",
          description: 'The controlled value of the pressed item(s). Use with [(value)] for two-way binding.',
        },
        {
          name: 'defaultValue',
          type: 'string | string[]',
          default: "''",
          description: 'The value of the item(s) to press when initially rendered. Use when not controlling state.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from interacting with any toggle in the group.',
        },
        {
          name: 'variant',
          type: "'default' | 'outline'",
          default: "'default'",
          description: 'The visual style variant applied to all toggle items.',
        },
        {
          name: 'size',
          type: "'sm' | 'default' | 'lg'",
          default: "'default'",
          description: 'The size applied to all toggle items.',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'The orientation of the group, which determines arrow key navigation direction.',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'true',
          description: 'When true, keyboard navigation loops from last item to first and vice versa.',
        },
        {
          name: 'rovingFocus',
          type: 'boolean',
          default: 'true',
          description: 'When true, uses roving tabindex so only one item is in the tab order at a time.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the group.',
        },
      ],
      events: [
        {
          name: 'valueChange',
          type: 'string | string[]',
          description: 'Emitted when the pressed state of any item changes.',
        },
      ],
      dataAttributes: [
        { name: '[data-orientation]', values: '"horizontal" | "vertical"' },
      ],
    },
    {
      name: 'Item',
      description: 'An individual toggle button in the group.',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'A unique value for this toggle item within the group.',
        },
        {
          name: 'variant',
          type: "'default' | 'outline'",
          description: 'Override the variant from the parent group for this specific item.',
        },
        {
          name: 'size',
          type: "'sm' | 'default' | 'lg'",
          description: 'Override the size from the parent group for this specific item.',
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
          description: 'Additional CSS classes to apply to this item.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"on" | "off"' },
        { name: '[data-disabled]', values: 'Present when disabled' },
        { name: '[data-value]', values: 'The value of this item' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple toggle group with single selection for text alignment.',
      code: `<ToggleGroup type="single" aria-label="Text alignment">
  <ToggleGroupItem value="left" aria-label="Align left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">Right</ToggleGroupItem>
</ToggleGroup>`,
      hasDemo: true,
    },
    {
      title: 'Multiple selection',
      description: 'Set type to "multiple" to allow multiple items to be pressed simultaneously.',
      code: `// In your component class:
formats = signal<string[]>([]);

// In your template:
<ToggleGroup type="multiple" [(value)]="formats" aria-label="Text formatting">
  <ToggleGroupItem value="bold" aria-label="Toggle bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">Underline</ToggleGroupItem>
</ToggleGroup>`,
    },
    {
      title: 'Outline variant',
      description: 'Use the outline variant for all items in the group.',
      code: `<ToggleGroup type="single" variant="outline" aria-label="View mode">
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
  <ToggleGroupItem value="table">Table</ToggleGroupItem>
</ToggleGroup>`,
    },
    {
      title: 'Vertical orientation',
      description: 'Use the orientation prop to arrange items vertically.',
      code: `<ToggleGroup type="single" orientation="vertical" aria-label="Size selection">
  <ToggleGroupItem value="sm">Small</ToggleGroupItem>
  <ToggleGroupItem value="md">Medium</ToggleGroupItem>
  <ToggleGroupItem value="lg">Large</ToggleGroupItem>
</ToggleGroup>`,
    },
    {
      title: 'Controlled',
      description: 'Use [(value)] to fully control the selection state.',
      code: `// In your component class:
alignment = signal<string>('center');

// In your template:
<ToggleGroup type="single" [(value)]="alignment" aria-label="Text alignment">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>

<p>Current: {{ alignment() }}</p>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Toolbar WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/toolbar',
    keyboardInteractions: [
      {
        key: 'Space',
        description: 'Toggles the pressed state of the focused item.',
      },
      {
        key: 'Enter',
        description: 'Toggles the pressed state of the focused item.',
      },
      {
        key: 'Tab',
        description: 'Moves focus into and out of the toggle group. Only one item is in the tab order at a time.',
      },
      {
        key: 'ArrowRight',
        description: 'Moves focus to the next item when orientation is horizontal.',
      },
      {
        key: 'ArrowLeft',
        description: 'Moves focus to the previous item when orientation is horizontal.',
      },
      {
        key: 'ArrowDown',
        description: 'Moves focus to the next item when orientation is vertical.',
      },
      {
        key: 'ArrowUp',
        description: 'Moves focus to the previous item when orientation is vertical.',
      },
      {
        key: 'Home',
        description: 'Moves focus to the first item in the group.',
      },
      {
        key: 'End',
        description: 'Moves focus to the last item in the group.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/toggle-group',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
