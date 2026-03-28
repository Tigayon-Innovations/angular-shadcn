/**
 * HoverCard Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const HOVER_CARD_DOCUMENTATION: ComponentDocumentation = {
  name: 'Hover Card',
  slug: 'hover-card',
  description: 'For sighted users to preview content available behind a link.',

  features: [
    { text: 'Can be controlled or uncontrolled.', highlight: true },
    { text: 'Customize side, alignment, offsets, collision handling.' },
    { text: 'Optionally render a pointing arrow.' },
    { text: 'Supports custom open and close delays.', highlight: true },
    { text: 'Ignored by screen readers.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/hover-card',
      pnpm: 'pnpm add @ng-cn/hover-card',
      yarn: 'yarn add @ng-cn/hover-card',
      bun: 'bun add @ng-cn/hover-card',
    },
    ngAdd: 'ng g @ng-cn/core:c hover-card',
  },

  anatomy: {
    importStatement: `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/ui/hover-card';`,
    structure: `<HoverCard>
  <HoverCardTrigger />
  <HoverCardContent />
</HoverCard>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of a hover card.',
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: 'The controlled open state of the hover card.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'The open state of the hover card when initially rendered.',
        },
        {
          name: 'openDelay',
          type: 'number',
          default: '700',
          description:
            'The duration from when the mouse enters the trigger until the hover card opens.',
        },
        {
          name: 'closeDelay',
          type: 'number',
          default: '300',
          description:
            'The duration from when the mouse leaves the trigger until the hover card closes.',
        },
      ],
      events: [
        {
          name: 'openChange',
          type: 'EventEmitter<boolean>',
          description: 'Event handler called when the open state changes.',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'The link that opens the hover card when hovered.',
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
      name: 'Content',
      description: 'The component that pops out when the hover card is open.',
      props: [
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          default: "'bottom'",
          description: 'The preferred side of the trigger to render against when open.',
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
          description: 'An offset in pixels from the alignment options.',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          default: 'true',
          description: 'When true, overrides the side and align preferences to prevent collisions.',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Used to force mounting when more control is needed.',
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
      description: 'A hover card showing user information.',
      code: `<HoverCard>
  <HoverCardTrigger>
    <a href="#" class="underline">&#64;shadcn</a>
  </HoverCardTrigger>
  <HoverCardContent class="w-80">
    <div class="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <div class="space-y-1">
        <h4 class="text-sm font-semibold">&#64;shadcn</h4>
        <p class="text-sm">
          The creator of shadcn/ui – beautifully designed components.
        </p>
        <div class="flex items-center pt-2">
          <lucide-icon [img]="CalendarIcon" class="mr-2 h-4 w-4 opacity-70" />
          <span class="text-xs text-muted-foreground">
            Joined December 2021
          </span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
      hasDemo: true,
    },
    {
      title: 'With custom delays',
      description: 'Customize the open and close delays.',
      code: `<HoverCard [openDelay]="200" [closeDelay]="500">
  <HoverCardTrigger>
    <a href="#" class="underline">Quick open, slow close</a>
  </HoverCardTrigger>
  <HoverCardContent>
    Opens quickly, closes slowly.
  </HoverCardContent>
</HoverCard>`,
    },
    {
      title: 'Positioning',
      description: 'Position the hover card on different sides.',
      code: `<div class="flex gap-8">
  <HoverCard>
    <HoverCardTrigger><a href="#">Top</a></HoverCardTrigger>
    <HoverCardContent side="top">Top content</HoverCardContent>
  </HoverCard>

  <HoverCard>
    <HoverCardTrigger><a href="#">Right</a></HoverCardTrigger>
    <HoverCardContent side="right">Right content</HoverCardContent>
  </HoverCard>
</div>`,
    },
    {
      title: 'Controlled',
      description: 'Control the open state programmatically.',
      code: `// In your component:
isOpen = signal(false);

// In template:
<HoverCard [open]="isOpen()" (openChange)="isOpen.set($event)">
  <HoverCardTrigger>
    <a href="#">Controlled hover card</a>
  </HoverCardTrigger>
  <HoverCardContent>
    Controlled content
  </HoverCardContent>
</HoverCard>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Supplementary content pattern',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus to the trigger element.',
      },
      {
        key: 'Enter',
        description: 'Activates the link if trigger is a link.',
      },
    ],
    ariaAttributes: [
      {
        name: 'aria-hidden',
        description: 'The content is hidden from screen readers as it duplicates information.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/hover-card',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
  ],
};
