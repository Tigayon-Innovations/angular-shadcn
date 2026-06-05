/**
 * Spinner Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const SPINNER_DOCUMENTATION: ComponentDocumentation = {
  name: 'Spinner',
  slug: 'spinner',
  description: 'An animated loading indicator that communicates an ongoing operation to the user.',

  features: [
    { text: 'Spinning SVG animation with smooth rotation.', highlight: true },
    { text: 'Five size variants: xs, sm, default, lg, xl.' },
    { text: 'Four color variants: default, secondary, muted, destructive.', highlight: true },
    { text: 'ARIA role="status" with aria-label for screen readers.' },
    { text: 'Composable — drop in anywhere a loading state is needed.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/spinner',
      pnpm: 'pnpm add @ng-cn/spinner',
      yarn: 'yarn add @ng-cn/spinner',
      bun: 'bun add @ng-cn/spinner',
    },
    ngAdd: 'ng g @ng-cn/core:c spinner',
  },

  anatomy: {
    importStatement: `import { Spinner } from '@/ui/spinner';`,
    structure: `<Spinner />`,
  },

  apiReference: [
    {
      name: 'Spinner',
      description: 'An animated loading spinner with configurable size and color variant.',
      props: [
        {
          name: 'variant',
          type: "'default' | 'secondary' | 'muted' | 'destructive'",
          default: "'default'",
          description: 'The color variant of the spinner.',
        },
        {
          name: 'size',
          type: "'xs' | 'sm' | 'default' | 'lg' | 'xl'",
          default: "'default'",
          description: 'The size of the spinner.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the spinner SVG.',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A default spinner to indicate loading.',
      code: `<Spinner />`,
      hasDemo: true,
    },
    {
      title: 'Sizes',
      description: 'Spinner is available in five sizes.',
      code: `<div class="flex items-center gap-4">
  <Spinner size="xs" />
  <Spinner size="sm" />
  <Spinner size="default" />
  <Spinner size="lg" />
  <Spinner size="xl" />
</div>`,
    },
    {
      title: 'Variants',
      description: 'Spinner supports four color variants to match different UI contexts.',
      code: `<div class="flex items-center gap-4">
  <Spinner variant="default" />
  <Spinner variant="secondary" />
  <Spinner variant="muted" />
  <Spinner variant="destructive" />
</div>`,
    },
    {
      title: 'Loading button',
      description: 'Embed a spinner inside a button to indicate a pending action.',
      code: `<Button [disabled]="isLoading()">
  @if (isLoading()) {
    <Spinner size="sm" class="text-current" />
    Saving...
  } @else {
    Save changes
  }
</Button>`,
    },
    {
      title: 'Full page loading',
      description: 'Show a centered spinner for full-page loading states.',
      code: `@if (isLoading()) {
  <div class="flex min-h-screen items-center justify-center">
    <Spinner size="xl" />
  </div>
} @else {
  <router-outlet />
}`,
    },
  ],

  accessibility: {
    keyboardInteractions: [],
    ariaAttributes: [
      {
        name: 'role="status"',
        description: 'Announces the loading state to screen readers without interrupting the user.',
      },
      {
        name: 'aria-label="Loading"',
        description: 'Provides a text description of the spinner for screen readers.',
      },
      {
        name: 'aria-busy="true"',
        description: 'Indicates to assistive technology that the region is currently loading.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/spinner',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
