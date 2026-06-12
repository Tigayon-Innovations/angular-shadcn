/**
 * Sonner Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const SONNER_DOCUMENTATION: ComponentDocumentation = {
  name: 'Sonner',
  slug: 'sonner',
  description:
    'An opinionated toast notification component. Mount the toaster once near your app root, then call toast() from anywhere to show non-intrusive, stacked notifications.',

  features: [
    { text: 'Single mount, call toast() from anywhere in your app.', highlight: true },
    { text: 'Success, error, warning, info, loading, and promise variants.', highlight: true },
    { text: 'Stacked and expanded display modes.' },
    { text: 'Configurable position, theme, duration, and rich colors.' },
    { text: 'Animated enter/exit transitions with reduced-motion support.' },
    { text: 'Optional close button and custom actions per toast.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/sonner',
      pnpm: 'pnpm add @ng-cn/sonner',
      yarn: 'yarn add @ng-cn/sonner',
      bun: 'bun add @ng-cn/sonner',
    },
    ngAdd: 'ng g @ng-cn/core:c sonner',
  },

  anatomy: {
    importStatement: `import { Sonner, toast } from '@/ui/sonner';`,
    structure: `<!-- Mount once near the root of your app -->
<Sonner />

<!-- Trigger from any component -->
toast('Message here')`,
  },

  apiReference: [
    {
      name: 'Sonner',
      description: 'The toaster container. Mount once in your app root template.',
      props: [
        {
          name: 'theme',
          type: "'light' | 'dark' | 'system'",
          default: "'system'",
          description: 'The visual theme for toast notifications.',
        },
        {
          name: 'position',
          type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
          default: "'bottom-right'",
          description: 'Where on the screen toasts appear.',
        },
        {
          name: 'richColors',
          type: 'boolean',
          default: 'false',
          description: 'Use saturated colors for success/error/warning/info variants.',
        },
        {
          name: 'expand',
          type: 'boolean',
          default: 'false',
          description: 'Expand toasts by default instead of stacking them.',
        },
        {
          name: 'duration',
          type: 'number',
          default: '4000',
          description: 'Default time in milliseconds before a toast auto-dismisses.',
        },
        {
          name: 'visibleToasts',
          type: 'number',
          default: '3',
          description: 'Maximum number of toasts visible at one time.',
        },
        {
          name: 'closeButton',
          type: 'boolean',
          default: 'false',
          description: 'Show a close (×) button on every toast.',
        },
        {
          name: 'offset',
          type: 'string | number | null',
          default: 'null',
          description: 'Distance from the edge of the viewport.',
        },
        {
          name: 'dir',
          type: "'ltr' | 'rtl' | 'auto'",
          default: "'auto'",
          description: 'Text direction for toast content.',
        },
        {
          name: 'toasterClass',
          type: 'string',
          default: "'toaster group'",
          description: 'Additional CSS classes applied to the toaster container.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"sonner"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'Mount the toaster once, then call toast() from any component.',
      code: `<!-- In your root template (app.component.ts) -->
<Sonner />

<!-- In any component -->
import { toast } from '@/ui/sonner';

<Button (click)="toast('Event has been created')">Show Toast</Button>`,
      hasDemo: true,
    },
    {
      title: 'Variants',
      description: 'Use typed variants to communicate intent.',
      code: `toast('Default notification')
toast.success('Profile saved successfully')
toast.error('Something went wrong')
toast.warning('Your storage is almost full')
toast.info('New update available')`,
    },
    {
      title: 'Loading and Promise',
      description: 'Show a loading state that resolves to success or error.',
      code: `// Promise pattern — automatically transitions states
const save = fetch('/api/save');
toast.promise(save, {
  loading: 'Saving...',
  success: 'Saved!',
  error: 'Failed to save',
});`,
    },
    {
      title: 'With description',
      description: 'Add a description for more context.',
      code: `toast('File uploaded', {
  description: 'report-q4-2024.pdf was uploaded to /documents.',
})`,
    },
    {
      title: 'With action',
      description: 'Add an inline action button to the toast.',
      code: `toast('Message deleted', {
  action: {
    label: 'Undo',
    onClick: () => undoDelete(),
  },
})`,
    },
    {
      title: 'Custom position and theme',
      description: 'Override the default position and color theme.',
      code: `<!-- Top-center with rich colors -->
<Sonner position="top-center" [richColors]="true" />`,
    },
  ],

  accessibility: {
    ariaPattern: 'ARIA Live Region',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/alert/',
    keyboardInteractions: [
      {
        key: 'Escape',
        description: 'Dismisses the focused toast.',
      },
      {
        key: 'Tab',
        description: 'Moves focus between the toast and its action/close button.',
      },
    ],
    ariaAttributes: [
      {
        name: 'role="status"',
        description: 'Applied to non-urgent toasts so screen readers announce them politely.',
      },
      {
        name: 'role="alert"',
        description: 'Applied to error/destructive toasts for immediate announcement.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/sonner',
      icon: 'source',
    },
    {
      text: 'ngx-sonner',
      url: 'https://ngx-sonner.vercel.app',
      icon: 'external',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
