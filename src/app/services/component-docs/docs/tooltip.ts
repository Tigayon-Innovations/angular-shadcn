/**
 * Tooltip Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const TOOLTIP_DOCUMENTATION: ComponentDocumentation = {
  name: 'Tooltip',
  slug: 'tooltip',
  description:
    'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',

  features: [
    { text: 'Provider to control display delay globally.', highlight: true },
    { text: 'Opens when the trigger is focused or hovered.' },
    { text: 'Closes when the trigger is activated or when pressing escape.' },
    { text: 'Supports custom timings.', highlight: true },
    { text: 'Collision-aware positioning.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/tooltip',
      pnpm: 'pnpm add @ng-cn/tooltip',
      yarn: 'yarn add @ng-cn/tooltip',
      bun: 'bun add @ng-cn/tooltip',
    },
    ngAdd: 'ng g @ng-cn/core:c tooltip',
  },

  anatomy: {
    importStatement: `import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/ui/tooltip';`,
    structure: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger />
    <TooltipContent />
  </Tooltip>
</TooltipProvider>`,
  },

  apiReference: [
    {
      name: 'Provider',
      description:
        'Wraps your app to provide global functionality to your tooltips.',
      props: [
        {
          name: 'delayDuration',
          type: 'number',
          default: '700',
          description:
            'The duration from when the mouse enters a tooltip trigger until the tooltip opens.',
        },
        {
          name: 'skipDelayDuration',
          type: 'number',
          default: '300',
          description:
            'How much time a user has to enter another trigger without incurring a delay again.',
        },
        {
          name: 'disableHoverableContent',
          type: 'boolean',
          default: 'false',
          description:
            'Prevents TooltipContent from remaining open when hovering. Disabling this has accessibility consequences.',
        },
      ],
    },
    {
      name: 'Root',
      description: 'Contains all the parts of a tooltip.',
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: 'The controlled open state of the tooltip.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description:
            'The open state of the tooltip when initially rendered. Use when you do not need to control its open state.',
        },
        {
          name: 'delayDuration',
          type: 'number',
          default: '700',
          description:
            'Override the provider delay duration for this tooltip.',
        },
        {
          name: 'disableHoverableContent',
          type: 'boolean',
          description: 'Override the provider setting for this tooltip.',
        },
      ],
      events: [
        {
          name: 'openChange',
          type: 'EventEmitter<boolean>',
          description: 'Event handler called when the open state of the tooltip changes.',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'The button that toggles the tooltip.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the component to the HTML tag or custom component provided as the child.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
      ],
    },
    {
      name: 'Content',
      description: 'The component that pops out when the tooltip is open.',
      props: [
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          default: "'top'",
          description:
            'The preferred side of the trigger to render against when open.',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '4',
          description: 'The distance in pixels from the trigger.',
        },
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          default: "'center'",
          description: 'The preferred alignment against the trigger.',
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
          description:
            'When true, overrides the side and align preferences to prevent collisions with boundary edges.',
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
      description: 'A simple tooltip on a button.',
      code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      hasDemo: true,
    },
    {
      title: 'With custom delay',
      description: 'Override the default delay duration.',
      code: `<TooltipProvider [delayDuration]="0">
  <Tooltip>
    <TooltipTrigger>
      <Button variant="outline">Instant tooltip</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Shows immediately!</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    },
    {
      title: 'Different positions',
      description: 'Position the tooltip on different sides.',
      code: `<TooltipProvider>
  <div class="flex gap-4">
    <Tooltip>
      <TooltipTrigger><Button>Top</Button></TooltipTrigger>
      <TooltipContent side="top">Top tooltip</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger><Button>Right</Button></TooltipTrigger>
      <TooltipContent side="right">Right tooltip</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger><Button>Bottom</Button></TooltipTrigger>
      <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger><Button>Left</Button></TooltipTrigger>
      <TooltipContent side="left">Left tooltip</TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>`,
    },
    {
      title: 'Controlled',
      description: 'Control the open state programmatically.',
      code: `// In your component:
isOpen = signal(false);

// In template:
<TooltipProvider>
  <Tooltip [open]="isOpen()" (openChange)="isOpen.set($event)">
    <TooltipTrigger>
      <Button>Controlled tooltip</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This tooltip is controlled</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

<Button (click)="isOpen.set(true)">Show tooltip</Button>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Tooltip WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Opens/closes the tooltip when trigger receives/loses focus.',
      },
      {
        key: 'Escape',
        description: 'Closes the tooltip immediately.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/tooltip',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/',
      icon: 'docs',
    },
  ],
};
