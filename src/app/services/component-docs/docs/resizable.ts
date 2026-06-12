/**
 * Resizable Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const RESIZABLE_DOCUMENTATION: ComponentDocumentation = {
  name: 'Resizable',
  slug: 'resizable',
  description:
    'Accessible resizable panel groups and layouts with keyboard support.',

  features: [
    { text: 'Full keyboard navigation with arrow keys.', highlight: true },
    { text: 'Supports horizontal and vertical orientations.' },
    { text: 'Minimum and maximum size constraints per panel.' },
    { text: 'Touch and mouse drag support.', highlight: true },
    { text: 'Optional visible handle grip indicator.' },
    { text: 'Auto-save ID for persisting layout across sessions.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/resizable',
      pnpm: 'pnpm add @ng-cn/resizable',
      yarn: 'yarn add @ng-cn/resizable',
      bun: 'bun add @ng-cn/resizable',
    },
    ngAdd: 'ng g @ng-cn/core:c resizable',
  },

  anatomy: {
    importStatement: `import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/ui/resizable';`,
    structure: `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel />
  <ResizableHandle />
  <ResizablePanel />
</ResizablePanelGroup>`,
  },

  apiReference: [
    {
      name: 'ResizablePanelGroup',
      description:
        'The root container that manages the layout and state of all panels. Provides context to child panels and handles.',
      props: [
        {
          name: 'direction',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'The direction in which panels are laid out and resized.',
        },
        {
          name: 'keyboardResizeBy',
          type: 'number',
          default: '10',
          description: 'The number of percentage points panels resize by on each keyboard arrow key press.',
        },
        {
          name: 'autoSaveId',
          type: 'string | null',
          default: 'null',
          description: 'A unique ID used to persist the panel layout in localStorage. When set, the layout is restored on page load.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the panel group container.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"resizable-panel-group"' },
        { name: '[data-panel-group]', values: 'true' },
        { name: '[data-panel-group-direction]', values: '"horizontal" | "vertical"' },
      ],
    },
    {
      name: 'ResizablePanel',
      description: 'An individual resizable panel within a ResizablePanelGroup.',
      props: [
        {
          name: 'defaultSize',
          type: 'number',
          default: '50',
          description: 'The initial size of the panel as a percentage of the group.',
        },
        {
          name: 'minSize',
          type: 'number',
          default: '0',
          description: 'The minimum size the panel can be resized to, as a percentage.',
        },
        {
          name: 'maxSize',
          type: 'number',
          default: '100',
          description: 'The maximum size the panel can be resized to, as a percentage.',
        },
        {
          name: 'collapsible',
          type: 'boolean',
          default: 'false',
          description: 'When true, the panel can be collapsed to its collapsedSize.',
        },
        {
          name: 'collapsedSize',
          type: 'number',
          default: '0',
          description: 'The size the panel collapses to when collapsible is true.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the panel.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"resizable-panel"' },
        { name: '[data-panel]', values: 'true' },
        { name: '[data-panel-id]', values: 'string (auto-generated)' },
      ],
    },
    {
      name: 'ResizableHandle',
      description:
        'The draggable divider between panels. Fully keyboard accessible — use arrow keys to resize, Home/End for min/max sizes.',
      props: [
        {
          name: 'withHandle',
          type: 'boolean',
          default: 'false',
          description: 'When true, renders a visible grip icon inside the handle.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents interaction with the handle.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the handle.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"resizable-handle"' },
        { name: '[data-panel-resize-handle]', values: 'true' },
        { name: '[data-panel-resize-handle-id]', values: 'string (auto-generated)' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic horizontal',
      description: 'Two panels side by side with a draggable handle.',
      code: `<ResizablePanelGroup
  direction="horizontal"
  class="min-h-[200px] max-w-md rounded-lg border"
>
  <ResizablePanel [defaultSize]="50">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">One</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel [defaultSize]="50">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Two</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
      hasDemo: true,
    },
    {
      title: 'With handle grip',
      description: 'Show a visible drag indicator on the handle using withHandle.',
      code: `<ResizablePanelGroup
  direction="horizontal"
  class="min-h-[200px] max-w-md rounded-lg border"
>
  <ResizablePanel [defaultSize]="25">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Sidebar</span>
    </div>
  </ResizablePanel>
  <ResizableHandle [withHandle]="true" />
  <ResizablePanel [defaultSize]="75">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Content</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    },
    {
      title: 'Vertical layout',
      description: 'Stack panels vertically with a horizontal handle.',
      code: `<ResizablePanelGroup
  direction="vertical"
  class="min-h-[400px] max-w-md rounded-lg border"
>
  <ResizablePanel [defaultSize]="50">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Top</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel [defaultSize]="50">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Bottom</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    },
    {
      title: 'Three panels with constraints',
      description: 'Three panels with minSize and maxSize constraints.',
      code: `<ResizablePanelGroup
  direction="horizontal"
  class="min-h-[200px] rounded-lg border"
>
  <ResizablePanel [defaultSize]="20" [minSize]="15" [maxSize]="30">
    <div class="flex h-full items-center justify-center p-4">
      <span class="text-sm font-semibold">Nav</span>
    </div>
  </ResizablePanel>
  <ResizableHandle [withHandle]="true" />
  <ResizablePanel [defaultSize]="60" [minSize]="40">
    <div class="flex h-full items-center justify-center p-4">
      <span class="text-sm font-semibold">Main</span>
    </div>
  </ResizablePanel>
  <ResizableHandle [withHandle]="true" />
  <ResizablePanel [defaultSize]="20" [minSize]="15" [maxSize]="30">
    <div class="flex h-full items-center justify-center p-4">
      <span class="text-sm font-semibold">Panel</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    },
  ],

  accessibility: {
    keyboardInteractions: [
      {
        key: 'ArrowLeft',
        description: 'Decreases the size of the preceding panel when the group direction is horizontal.',
      },
      {
        key: 'ArrowRight',
        description: 'Increases the size of the preceding panel when the group direction is horizontal.',
      },
      {
        key: 'ArrowUp',
        description: 'Decreases the size of the preceding panel when the group direction is vertical.',
      },
      {
        key: 'ArrowDown',
        description: 'Increases the size of the preceding panel when the group direction is vertical.',
      },
      {
        key: 'Shift + Arrow',
        description: 'Resizes in larger steps (5% instead of 1%).',
      },
      {
        key: 'Home',
        description: 'Sets the preceding panel to its minimum size.',
      },
      {
        key: 'End',
        description: 'Sets the preceding panel to its maximum size.',
      },
      {
        key: 'Tab',
        description: 'Moves focus to the next focusable element.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/resizable',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
