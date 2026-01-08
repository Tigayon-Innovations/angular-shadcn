/**
 * Toast Component Documentation
 * Radix-like comprehensive documentation for toast notifications
 */

import type { ComponentDocumentation } from '../types';

export const TOAST_DOCUMENTATION: ComponentDocumentation = {
  name: 'Toast',
  slug: 'toast',
  description:
    'A succinct message that is displayed temporarily.',

  features: [
    { text: 'Multiple variants (default, success, error, warning, info).', highlight: true },
    { text: 'Auto-dismiss with configurable duration.' },
    { text: 'Swipe to dismiss support.' },
    { text: 'Action buttons.', highlight: true },
    { text: 'Multiple toast positioning options.' },
    { text: 'Accessible announcements.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/toast',
      pnpm: 'pnpm add @ng-cn/toast',
      yarn: 'yarn add @ng-cn/toast',
      bun: 'bun add @ng-cn/toast',
    },
    ngAdd: 'ng g @ng-cn/core:c toast',
  },

  anatomy: {
    importStatement: `import {
  Toaster,
  ToastService
} from '@/ui/toast';

// Or individual components:
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction
} from '@/ui/toast';`,
    structure: `<!-- Add Toaster to your app root -->
<Toaster />

<!-- Use ToastService to show toasts -->
// this.toastService.success({ title: 'Success!' });`,
  },

  apiReference: [
    {
      name: 'ToastService',
      description: 'Service for managing toast notifications.',
      props: [
        {
          name: 'toasts',
          type: 'Signal<Toast[]>',
          description: 'Reactive list of active toasts.',
        },
      ],
      events: [
        {
          name: 'toast(options)',
          type: '(options: ToastOptions) => string',
          description: 'Shows a default toast. Returns the toast ID.',
        },
        {
          name: 'success(options)',
          type: '(options: ToastOptions) => string',
          description: 'Shows a success toast.',
        },
        {
          name: 'error(options)',
          type: '(options: ToastOptions) => string',
          description: 'Shows an error toast.',
        },
        {
          name: 'warning(options)',
          type: '(options: ToastOptions) => string',
          description: 'Shows a warning toast.',
        },
        {
          name: 'info(options)',
          type: '(options: ToastOptions) => string',
          description: 'Shows an info toast.',
        },
        {
          name: 'dismiss(id)',
          type: '(id: string) => void',
          description: 'Dismisses a specific toast.',
        },
        {
          name: 'dismissAll()',
          type: '() => void',
          description: 'Dismisses all active toasts.',
        },
      ],
    },
    {
      name: 'Toaster',
      description: 'Container component that renders all active toasts.',
      props: [
        {
          name: 'position',
          type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
          default: "'bottom-right'",
          description: 'Position of the toast container.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'Toast',
      description: 'Individual toast notification component.',
      props: [
        {
          name: 'variant',
          type: "'default' | 'success' | 'error' | 'warning' | 'info'",
          default: "'default'",
          description: 'Visual variant of the toast.',
        },
        {
          name: 'showIcon',
          type: 'boolean',
          default: 'true',
          description: 'Whether to display the variant icon.',
        },
        {
          name: 'isVisible',
          type: 'boolean',
          default: 'true',
          description: 'Controls animation state.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      events: [
        {
          name: 'onClose',
          type: 'EventEmitter<void>',
          description: 'Event emitted when close button is clicked.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-swipe]', values: '"start" | "move" | "cancel" | "end"' },
      ],
      cssVariables: [
        {
          name: '--radix-toast-swipe-move-x',
          description: 'Swipe position during drag.',
        },
        {
          name: '--radix-toast-swipe-end-x',
          description: 'Final swipe position.',
        },
      ],
    },
    {
      name: 'ToastTitle',
      description: 'Title text for a toast notification.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'ToastDescription',
      description: 'Description text for a toast notification.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'ToastAction',
      description: 'Action button displayed within a toast.',
      props: [
        {
          name: 'altText',
          type: 'string',
          description: 'Alt text for accessibility within destructive toasts.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      events: [
        {
          name: 'onClick',
          type: 'EventEmitter<void>',
          description: 'Event emitted when action button is clicked.',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'Show a simple toast notification.',
      code: `// In your component:
toastService = inject(ToastService);

showToast() {
  this.toastService.toast({
    title: 'Scheduled: Catch up',
    description: 'Friday, February 10, 2023 at 5:57 PM',
  });
}

// In template:
<Button (click)="showToast()">Show Toast</Button>`,
      hasDemo: true,
    },
    {
      title: 'With variants',
      description: 'Different toast variants for different message types.',
      code: `// Success
this.toastService.success({
  title: 'Success!',
  description: 'Your changes have been saved.',
});

// Error
this.toastService.error({
  title: 'Error',
  description: 'Something went wrong.',
});

// Warning
this.toastService.warning({
  title: 'Warning',
  description: 'This action cannot be undone.',
});

// Info
this.toastService.info({
  title: 'Info',
  description: 'New features are available.',
});`,
    },
    {
      title: 'With action',
      description: 'Toast with an action button.',
      code: `this.toastService.error({
  title: 'Uh oh! Something went wrong.',
  description: 'There was a problem with your request.',
  action: {
    label: 'Try again',
    onClick: () => this.retryRequest(),
  },
});`,
    },
    {
      title: 'Persistent toast',
      description: 'Toast that does not auto-dismiss.',
      code: `const id = this.toastService.info({
  title: 'Uploading...',
  description: 'Please wait while we upload your file.',
  duration: 0, // Won't auto-dismiss
});

// Later, dismiss manually
this.toastService.dismiss(id);`,
    },
    {
      title: 'Custom position',
      description: 'Position toasts at different locations.',
      code: `<Toaster position="top-center" />`,
    },
  ],

  accessibility: {
    ariaPattern: 'Alert WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/alert/',
    keyboardInteractions: [
      {
        key: 'Escape',
        description: 'Closes the focused toast.',
      },
      {
        key: 'Tab',
        description: 'Moves focus to the action button or close button.',
      },
    ],
    ariaAttributes: [
      {
        name: 'role="status"',
        description: 'Announces toast content to screen readers.',
      },
      {
        name: 'aria-atomic="true"',
        description: 'Ensures full content is read on update.',
      },
      {
        name: 'aria-live="polite"',
        description: 'Toaster region announces new toasts.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/toast',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/alert/',
      icon: 'docs',
    },
  ],
};
