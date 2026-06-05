/**
 * Alert Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const ALERT_DOCUMENTATION: ComponentDocumentation = {
  name: 'Alert',
  slug: 'alert',
  description: 'Displays a callout for user attention.',

  features: [
    { text: 'Supports default and destructive variants.', highlight: true },
    { text: 'Composed of Alert, AlertTitle, and AlertDescription sub-components.' },
    { text: 'Automatically lays out an optional leading icon alongside content.' },
    { text: 'Fully accessible with role="alert" for screen readers.', highlight: true },
    { text: 'Supports custom CSS classes on every sub-component.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/alert',
      pnpm: 'pnpm add @ng-cn/alert',
      yarn: 'yarn add @ng-cn/alert',
      bun: 'bun add @ng-cn/alert',
    },
    ngAdd: 'ng g @ng-cn/core:c alert',
  },

  anatomy: {
    importStatement: `import {
  Alert,
  AlertTitle,
  AlertDescription
} from '@/ui/alert';`,
    structure: `<Alert>
  <AlertTitle />
  <AlertDescription />
</Alert>`,
  },

  apiReference: [
    {
      name: 'Alert',
      description: 'The root alert container. Renders with role="alert" for immediate screen-reader announcement.',
      props: [
        {
          name: 'variant',
          type: "'default' | 'destructive'",
          default: "'default'",
          description: 'The visual style of the alert. Use "destructive" for error or danger messages.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the alert container.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"alert"' },
      ],
    },
    {
      name: 'AlertTitle',
      description: 'The title of the alert. Rendered in the second grid column alongside an optional icon.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the title element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"alert-title"' },
      ],
    },
    {
      name: 'AlertDescription',
      description: 'The supporting description of the alert. Placed below the title in the same grid column.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the description element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"alert-description"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Default',
      description: 'A basic informational alert with a title and description.',
      code: `<Alert>
  <lucide-icon name="terminal" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>`,
      hasDemo: true,
    },
    {
      title: 'Destructive',
      description: 'Use the "destructive" variant to communicate errors or dangerous actions.',
      code: `<Alert variant="destructive">
  <lucide-icon name="alert-circle" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`,
    },
    {
      title: 'Without icon',
      description: 'The icon is optional. Without it the content spans the full width.',
      code: `<Alert>
  <AlertTitle>Note</AlertTitle>
  <AlertDescription>
    This alert has no icon — the content takes up the full row.
  </AlertDescription>
</Alert>`,
    },
    {
      title: 'Custom class',
      description: 'Pass a class to any sub-component to extend or override default styles.',
      code: `<Alert class="border-blue-500 bg-blue-50 text-blue-900">
  <lucide-icon name="info" />
  <AlertTitle class="text-blue-800">Info</AlertTitle>
  <AlertDescription class="text-blue-700">
    Custom styled alert using Tailwind utility classes.
  </AlertDescription>
</Alert>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Alert WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/alert',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus to any interactive elements within the alert.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus to the previous focusable element.',
      },
    ],
    ariaAttributes: [
      {
        name: 'role="alert"',
        description: 'Applied to the root element so screen readers announce the content immediately.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/alert',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA alert pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/alert',
      icon: 'docs',
    },
  ],
};
