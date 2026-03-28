/**
 * Popover Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const POPOVER_DOCUMENTATION: ComponentDocumentation = {
  name: 'Popover',
  slug: 'popover',
  description: 'Displays rich content in a portal, triggered by a button.',

  features: [
    { text: 'Can be controlled or uncontrolled.', highlight: true },
    { text: 'Customize side, alignment, offsets, collision handling.' },
    { text: 'Optionally render a pointing arrow.' },
    { text: 'Focus is fully managed and customizable.' },
    { text: 'Supports modal and non-modal modes.', highlight: true },
    { text: 'Dismissing and layering behavior is highly customizable.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/popover',
      pnpm: 'pnpm add @ng-cn/popover',
      yarn: 'yarn add @ng-cn/popover',
      bun: 'bun add @ng-cn/popover',
    },
    ngAdd: 'ng g @ng-cn/core:c popover',
  },

  anatomy: {
    importStatement: `import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor
} from '@/ui/popover';`,
    structure: `<Popover>
  <PopoverTrigger />
  <PopoverContent />
</Popover>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of a popover.',
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: 'The controlled open state of the popover.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description:
            'The open state of the popover when initially rendered. Use when you do not need to control its open state.',
        },
        {
          name: 'modal',
          type: 'boolean',
          default: 'false',
          description:
            'The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.',
        },
      ],
      events: [
        {
          name: 'openChange',
          type: 'EventEmitter<boolean>',
          description: 'Event handler called when the open state of the popover changes.',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'The button that toggles the popover.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'Change the component to render as the child element.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [{ name: '[data-state]', values: '"open" | "closed"' }],
    },
    {
      name: 'Anchor',
      description:
        'An optional element to position the PopoverContent against. If not used, the content will position alongside the trigger.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'Change the component to render as the child element.',
        },
      ],
    },
    {
      name: 'Content',
      description: 'The component that pops out when the popover is open.',
      props: [
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          default: "'bottom'",
          description: 'The preferred side of the anchor to render against when open.',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '4',
          description: 'The distance in pixels from the anchor.',
        },
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          default: "'center'",
          description: 'The preferred alignment against the anchor.',
        },
        {
          name: 'alignOffset',
          type: 'number',
          default: '0',
          description: 'An offset in pixels from the start or end alignment options.',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          default: 'true',
          description: 'When true, overrides the side and align preferences to prevent collisions.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-side]', values: '"top" | "right" | "bottom" | "left"' },
        { name: '[data-align]', values: '"start" | "center" | "end"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple popover with some content.',
      code: `<Popover>
  <PopoverTrigger>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent class="w-80">
    <div class="grid gap-4">
      <div class="space-y-2">
        <h4 class="font-medium leading-none">Dimensions</h4>
        <p class="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
      <div class="grid gap-2">
        <Label htmlFor="width">Width</Label>
        <Input id="width" defaultValue="100%" />
      </div>
    </div>
  </PopoverContent>
</Popover>`,
      hasDemo: true,
    },
    {
      title: 'Positioning',
      description: 'Position the popover on different sides.',
      code: `<div class="flex gap-4">
  <Popover>
    <PopoverTrigger><Button>Top</Button></PopoverTrigger>
    <PopoverContent side="top">Top content</PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger><Button>Right</Button></PopoverTrigger>
    <PopoverContent side="right">Right content</PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger><Button>Bottom</Button></PopoverTrigger>
    <PopoverContent side="bottom">Bottom content</PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger><Button>Left</Button></PopoverTrigger>
    <PopoverContent side="left">Left content</PopoverContent>
  </Popover>
</div>`,
    },
    {
      title: 'With custom anchor',
      description: 'Anchor the popover to a different element.',
      code: `<Popover>
  <PopoverAnchor>
    <div class="flex items-center gap-2">
      <span>Anchor element</span>
      <PopoverTrigger>
        <Button size="icon" variant="ghost">
          <lucide-icon [img]="InfoIcon" class="h-4 w-4" />
        </Button>
      </PopoverTrigger>
    </div>
  </PopoverAnchor>
  <PopoverContent>
    This popover is anchored to the parent element.
  </PopoverContent>
</Popover>`,
    },
    {
      title: 'Controlled',
      description: 'Control the open state from outside.',
      code: `// In your component:
isOpen = signal(false);

// In template:
<Popover [open]="isOpen()" (openChange)="isOpen.set($event)">
  <PopoverTrigger>
    <Button>Controlled</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Controlled popover content</p>
    <Button (click)="isOpen.set(false)">Close</Button>
  </PopoverContent>
</Popover>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Dialog (Non-Modal) WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/',
    keyboardInteractions: [
      {
        key: 'Space',
        description: 'Opens/closes the popover.',
      },
      {
        key: 'Enter',
        description: 'Opens/closes the popover.',
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
        key: 'Escape',
        description: 'Closes the popover and moves focus back to the trigger.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/popover',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/',
      icon: 'docs',
    },
  ],
};
