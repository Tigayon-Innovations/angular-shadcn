/**
 * Skeleton Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const SKELETON_DOCUMENTATION: ComponentDocumentation = {
  name: 'Skeleton',
  slug: 'skeleton',
  description: 'Use to show a placeholder while content is loading.',

  features: [
    { text: 'Simple single-element component with an animated pulse.', highlight: true },
    { text: 'Composable — combine multiple Skeleton elements for complex loading states.' },
    { text: 'Fully accessible with role="status" and aria-busy="true".', highlight: true },
    { text: 'Customisable size and shape via the class prop.' },
    { text: 'Supports a custom accessible label via ariaLabel.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/skeleton',
      pnpm: 'pnpm add @ng-cn/skeleton',
      yarn: 'yarn add @ng-cn/skeleton',
      bun: 'bun add @ng-cn/skeleton',
    },
    ngAdd: 'ng g @ng-cn/core:c skeleton',
  },

  anatomy: {
    importStatement: `import { Skeleton } from '@/ui/skeleton';`,
    structure: `<Skeleton class="h-4 w-[250px]" />`,
  },

  apiReference: [
    {
      name: 'Skeleton',
      description:
        'A single loading placeholder block. Renders as an empty element with a pulsing background animation.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description:
            'CSS classes that control the skeleton dimensions and shape (e.g. height, width, border-radius).',
        },
        {
          name: 'ariaLabel',
          type: 'string',
          default: "'Loading...'",
          description: 'Accessible label announced by screen readers while the content is loading.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"skeleton"' },
        { name: 'role', values: '"status"' },
        { name: 'aria-busy', values: '"true"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple text-line placeholder.',
      code: `<Skeleton class="h-4 w-[250px]" />`,
      hasDemo: true,
    },
    {
      title: 'Avatar',
      description: 'A circular skeleton for an avatar image.',
      code: `<Skeleton class="h-12 w-12 rounded-full" />`,
    },
    {
      title: 'Card skeleton',
      description: 'Compose multiple Skeleton elements to represent a loading card.',
      code: `<div class="flex flex-col space-y-3">
  <Skeleton class="h-[125px] w-[250px] rounded-xl" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-[250px]" />
    <Skeleton class="h-4 w-[200px]" />
  </div>
</div>`,
    },
    {
      title: 'Profile skeleton',
      description: 'Simulate a user profile row while data is being fetched.',
      code: `<div class="flex items-center space-x-4">
  <Skeleton class="h-12 w-12 rounded-full" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-[200px]" />
    <Skeleton class="h-4 w-[150px]" />
  </div>
</div>`,
    },
    {
      title: 'Conditional display',
      description: 'Show the skeleton while loading, then replace it with real content.',
      code: `@if (isLoading()) {
  <div class="space-y-2">
    <Skeleton class="h-4 w-full" />
    <Skeleton class="h-4 w-3/4" />
    <Skeleton class="h-4 w-1/2" />
  </div>
} @else {
  <p>{{ article.body }}</p>
}`,
    },
  ],

  accessibility: {
    keyboardInteractions: [],
    ariaAttributes: [
      {
        name: 'role="status"',
        description:
          'Identifies the element as a live region so screen readers can announce that content is loading.',
      },
      {
        name: 'aria-busy="true"',
        description: 'Signals that the element is still loading and its final content is not ready.',
      },
      {
        name: 'aria-label',
        description: 'Provides a human-readable label (defaults to "Loading...") for the loading state.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/skeleton',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
