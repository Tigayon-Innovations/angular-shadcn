/**
 * Kbd Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const KBD_DOCUMENTATION: ComponentDocumentation = {
  name: 'Kbd',
  slug: 'kbd',
  description: 'Displays a keyboard key or shortcut in a styled badge that visually resembles a physical keyboard key.',

  features: [
    { text: 'Monospace font for authentic key display.', highlight: true },
    { text: 'Three size variants: sm, default, and lg.' },
    { text: 'Non-interactive — pointer events disabled.' },
    { text: 'Muted background and border for subtle appearance.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/kbd',
      pnpm: 'pnpm add @ng-cn/kbd',
      yarn: 'yarn add @ng-cn/kbd',
      bun: 'bun add @ng-cn/kbd',
    },
    ngAdd: 'ng g @ng-cn/core:c kbd',
  },

  anatomy: {
    importStatement: `import { Kbd } from '@/ui/kbd';`,
    structure: `<Kbd>K</Kbd>`,
  },

  apiReference: [
    {
      name: 'Kbd',
      description: 'A styled keyboard key indicator component.',
      props: [
        {
          name: 'size',
          type: "'sm' | 'default' | 'lg'",
          default: "'default'",
          description: 'The size of the keyboard key badge.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'Display a single keyboard key.',
      code: `<Kbd>K</Kbd>`,
      hasDemo: true,
    },
    {
      title: 'Keyboard shortcut',
      description: 'Combine multiple Kbd elements to show a keyboard shortcut.',
      code: `<span class="flex items-center gap-1">
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</span>`,
    },
    {
      title: 'Common shortcuts',
      description: 'Display common keyboard shortcuts in a list.',
      code: `<div class="flex flex-col gap-2 text-sm">
  <div class="flex items-center justify-between">
    <span>Save</span>
    <span class="flex items-center gap-1">
      <Kbd>⌘</Kbd>
      <Kbd>S</Kbd>
    </span>
  </div>
  <div class="flex items-center justify-between">
    <span>Undo</span>
    <span class="flex items-center gap-1">
      <Kbd>⌘</Kbd>
      <Kbd>Z</Kbd>
    </span>
  </div>
  <div class="flex items-center justify-between">
    <span>Find</span>
    <span class="flex items-center gap-1">
      <Kbd>⌘</Kbd>
      <Kbd>F</Kbd>
    </span>
  </div>
</div>`,
    },
    {
      title: 'Sizes',
      description: 'Kbd is available in three sizes.',
      code: `<div class="flex items-center gap-2">
  <Kbd size="sm">Sm</Kbd>
  <Kbd size="default">Default</Kbd>
  <Kbd size="lg">Lg</Kbd>
</div>`,
    },
  ],

  accessibility: {
    keyboardInteractions: [],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/kbd',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
