/**
 * ScrollArea Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const SCROLL_AREA_DOCUMENTATION: ComponentDocumentation = {
  name: 'Scroll Area',
  slug: 'scroll-area',
  description:
    'Augments native scroll functionality for custom, cross-browser styling.',

  features: [
    { text: 'Scrollbar sits on top of the scrollable content, taking up no space.', highlight: true },
    { text: 'Scrolling is native; no underlying position movements via CSS transformations.' },
    { text: 'Shims pointer behaviors only when interacting with the controls.', highlight: true },
    { text: 'Supports Right to Left direction.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/scroll-area',
      pnpm: 'pnpm add @ng-cn/scroll-area',
      yarn: 'yarn add @ng-cn/scroll-area',
      bun: 'bun add @ng-cn/scroll-area',
    },
    ngAdd: 'ng g @ng-cn/core:c scroll-area',
  },

  anatomy: {
    importStatement: `import {
  ScrollArea,
  ScrollBar
} from '@/ui/scroll-area';`,
    structure: `<ScrollArea>
  <!-- content -->
  <ScrollBar orientation="vertical" />
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of a scroll area.',
      props: [
        {
          name: 'type',
          type: "'auto' | 'always' | 'scroll' | 'hover'",
          default: "'hover'",
          description:
            'Describes the nature of scrollbar visibility: auto shows when content overflows, always keeps them visible, scroll shows during scrolling, hover shows when hovering.',
        },
        {
          name: 'scrollHideDelay',
          type: 'number',
          default: '600',
          description:
            'Duration in ms from when the mouse leaves the scroll area until the scrollbar hides. Only applies when type is scroll or hover.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
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
      name: 'Viewport',
      description: 'The viewport area of the scroll area.',
      props: [],
      notes: [
        'Automatically added within ScrollArea component.',
      ],
    },
    {
      name: 'Scrollbar',
      description: 'The vertical or horizontal scrollbar.',
      props: [
        {
          name: 'orientation',
          type: "'vertical' | 'horizontal'",
          default: "'vertical'",
          description: 'The orientation of the scrollbar.',
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
        {
          name: '[data-state]',
          values: '"visible" | "hidden"',
        },
        {
          name: '[data-orientation]',
          values: '"vertical" | "horizontal"',
        },
      ],
    },
    {
      name: 'Thumb',
      description: 'The thumb to be used in the scrollbar.',
      props: [],
      notes: [
        'Automatically added within ScrollBar component.',
      ],
    },
    {
      name: 'Corner',
      description: 'The corner where both scrollbars meet.',
      props: [],
      notes: [
        'Automatically added when both scrollbars are present.',
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple scroll area with vertical scrollbar.',
      code: `<ScrollArea class="h-72 w-48 rounded-md border">
  <div class="p-4">
    <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
    @for (tag of tags; track tag) {
      <div class="text-sm">{{ tag }}</div>
      <Separator class="my-2" />
    }
  </div>
</ScrollArea>`,
      hasDemo: true,
    },
    {
      title: 'Horizontal scrolling',
      description: 'A scroll area with horizontal scrollbar.',
      code: `<ScrollArea class="w-96 whitespace-nowrap rounded-md border">
  <div class="flex w-max space-x-4 p-4">
    @for (artwork of artworks; track artwork.name) {
      <figure class="shrink-0">
        <div class="overflow-hidden rounded-md">
          <img
            [src]="artwork.src"
            [alt]="artwork.name"
            class="aspect-[3/4] h-fit w-fit object-cover"
          />
        </div>
        <figcaption class="pt-2 text-xs text-muted-foreground">
          {{ artwork.name }}
        </figcaption>
      </figure>
    }
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
    },
    {
      title: 'Both scrollbars',
      description: 'A scroll area with both vertical and horizontal scrollbars.',
      code: `<ScrollArea class="h-[300px] w-[300px] rounded-md border">
  <div class="p-4 w-[500px]">
    <h4 class="mb-4 text-sm font-medium leading-none">Large Content</h4>
    <p class="text-sm">
      This content is larger than the container,
      requiring both scrollbars.
    </p>
    <!-- More content here -->
  </div>
  <ScrollBar orientation="vertical" />
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
    },
    {
      title: 'Always visible scrollbar',
      description: 'Keep the scrollbar always visible.',
      code: `<ScrollArea type="always" class="h-72 w-48 rounded-md border">
  <div class="p-4">
    <!-- Content that overflows -->
  </div>
</ScrollArea>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Scrollbar ARIA pattern',
    keyboardInteractions: [
      {
        key: 'Arrow keys',
        description: 'Scrolls content when focused within the scroll area.',
      },
      {
        key: 'Page Up / Page Down',
        description: 'Scrolls content by a page.',
      },
      {
        key: 'Home / End',
        description: 'Scrolls to the top/bottom of the content.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/scroll-area',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
  ],
};
