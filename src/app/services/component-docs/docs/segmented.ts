/**
 * Segmented Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const SEGMENTED_DOCUMENTATION: ComponentDocumentation = {
  name: 'Segmented',
  slug: 'segmented',
  description: 'An iOS-style segmented control that lets users select a single option from a compact group of options.',

  features: [
    { text: 'iOS-style segmented control appearance.', highlight: true },
    { text: 'Single selection with active item highlighting.' },
    { text: 'Supports sm, default, and lg sizes.' },
    { text: 'Can be controlled or uncontrolled.', highlight: true },
    { text: 'Keyboard accessible with Space and Enter.' },
    { text: 'Supports tab and button ARIA roles per item.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/segmented',
      pnpm: 'pnpm add @ng-cn/segmented',
      yarn: 'yarn add @ng-cn/segmented',
      bun: 'bun add @ng-cn/segmented',
    },
    ngAdd: 'ng g @ng-cn/core:c segmented',
  },

  anatomy: {
    importStatement: `import {
  Segmented,
  SegmentedItem
} from '@/ui/segmented';`,
    structure: `<Segmented>
  <SegmentedItem value="a" />
  <SegmentedItem value="b" />
  <SegmentedItem value="c" />
</Segmented>`,
  },

  apiReference: [
    {
      name: 'Segmented',
      description: 'The container for the segmented control. Manages selected state and provides context to items.',
      props: [
        {
          name: 'value',
          type: 'string',
          default: "''",
          description: 'The controlled value of the selected item. Use with [(value)] for two-way binding.',
        },
        {
          name: 'size',
          type: "'sm' | 'default' | 'lg'",
          default: "'default'",
          description: 'The size of the segmented control.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from interacting with any item.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the segmented control.',
        },
      ],
    },
    {
      name: 'SegmentedItem',
      description: 'An individual option within the segmented control.',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'The unique value for this item.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from selecting this item.',
        },
        {
          name: 'role',
          type: "'tab' | 'button'",
          default: "'tab'",
          description: 'The ARIA role applied to the item. Use "tab" for tab-like semantics or "button" for button semantics.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to this item.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"active" | "inactive"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple segmented control for filtering content.',
      code: `<Segmented [(value)]="filter">
  <SegmentedItem value="all">All</SegmentedItem>
  <SegmentedItem value="unread">Unread</SegmentedItem>
  <SegmentedItem value="archived">Archived</SegmentedItem>
</Segmented>`,
      hasDemo: true,
    },
    {
      title: 'Sizes',
      description: 'Segmented control is available in three sizes.',
      code: `<div class="flex flex-col gap-4">
  <Segmented size="sm" value="a">
    <SegmentedItem value="a">Small</SegmentedItem>
    <SegmentedItem value="b">Options</SegmentedItem>
  </Segmented>

  <Segmented size="default" value="a">
    <SegmentedItem value="a">Default</SegmentedItem>
    <SegmentedItem value="b">Options</SegmentedItem>
  </Segmented>

  <Segmented size="lg" value="a">
    <SegmentedItem value="a">Large</SegmentedItem>
    <SegmentedItem value="b">Options</SegmentedItem>
  </Segmented>
</div>`,
    },
    {
      title: 'View toggle',
      description: 'Use a segmented control as a view mode switcher.',
      code: `// In your component class:
viewMode = signal('grid');

// In your template:
<Segmented [(value)]="viewMode">
  <SegmentedItem value="list">List</SegmentedItem>
  <SegmentedItem value="grid">Grid</SegmentedItem>
  <SegmentedItem value="kanban">Kanban</SegmentedItem>
</Segmented>`,
    },
    {
      title: 'Disabled item',
      description: 'Individual items can be disabled while the rest remain interactive.',
      code: `<Segmented value="monthly">
  <SegmentedItem value="monthly">Monthly</SegmentedItem>
  <SegmentedItem value="yearly">Yearly</SegmentedItem>
  <SegmentedItem value="custom" [disabled]="true">Custom</SegmentedItem>
</Segmented>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Tabs WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs',
    keyboardInteractions: [
      {
        key: 'Space',
        description: 'Selects the focused item.',
      },
      {
        key: 'Enter',
        description: 'Selects the focused item.',
      },
      {
        key: 'Tab',
        description: 'Moves focus between items in the segmented control.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/segmented',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
