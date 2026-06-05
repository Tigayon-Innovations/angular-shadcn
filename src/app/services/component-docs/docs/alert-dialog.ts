/**
 * AlertDialog Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const ALERT_DIALOG_DOCUMENTATION: ComponentDocumentation = {
  name: 'Alert Dialog',
  slug: 'alert-dialog',
  description:
    'A modal dialog that interrupts the user with important content and expects a response.',

  features: [
    { text: 'Focus is trapped inside the dialog while open.', highlight: true },
    { text: 'Pressing Escape closes the dialog.' },
    { text: 'Clicking the overlay does NOT close the dialog — user must take explicit action.', highlight: true },
    { text: 'Focus is automatically restored to the trigger when the dialog closes.' },
    { text: 'Cancel button receives initial focus when the dialog opens.' },
    { text: 'Full ARIA alertdialog role and labelling support.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/alert-dialog',
      pnpm: 'pnpm add @ng-cn/alert-dialog',
      yarn: 'yarn add @ng-cn/alert-dialog',
      bun: 'bun add @ng-cn/alert-dialog',
    },
    ngAdd: 'ng g @ng-cn/core:c alert-dialog',
  },

  anatomy: {
    importStatement: `import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from '@/ui/alert-dialog';`,
    structure: `<AlertDialog>
  <AlertDialogTrigger />
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle />
      <AlertDialogDescription />
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel />
      <AlertDialogAction />
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of an alert dialog. Manages open state and ARIA IDs.',
      props: [
        {
          name: 'open',
          type: 'boolean',
          default: 'false',
          description: 'The controlled open state of the dialog. Use with (openChange).',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'The open state when initially rendered (uncontrolled).',
        },
      ],
      events: [
        {
          name: 'openChange',
          type: 'boolean',
          description: 'Emitted when the open state changes.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"alert-dialog"' },
      ],
    },
    {
      name: 'Trigger',
      description: 'The button (or any element) that opens the alert dialog.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'When true, renders the trigger as its child element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"alert-dialog-trigger"' },
        { name: '[aria-haspopup]', values: '"dialog"' },
        { name: '[aria-expanded]', values: 'true | false' },
      ],
    },
    {
      name: 'Content',
      description:
        'The modal content container. Renders an overlay and the dialog panel. The overlay does not close the dialog on click.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the dialog panel.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"alert-dialog-content"' },
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: 'role', values: '"alertdialog"' },
        { name: 'aria-modal', values: '"true"' },
      ],
    },
    {
      name: 'Header',
      description: 'A layout wrapper for the title and description.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the header.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"alert-dialog-header"' },
      ],
    },
    {
      name: 'Footer',
      description: 'A layout wrapper for the action and cancel buttons.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the footer.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"alert-dialog-footer"' },
      ],
    },
    {
      name: 'Title',
      description: 'The accessible title of the alert dialog. Automatically associated via aria-labelledby.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the title.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"alert-dialog-title"' },
      ],
    },
    {
      name: 'Description',
      description: 'The accessible description of the alert dialog. Automatically associated via aria-describedby.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the description.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"alert-dialog-description"' },
      ],
    },
    {
      name: 'Action',
      description: 'The primary action button. Closes the dialog when clicked. Styled as the default button variant.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the action button.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"alert-dialog-action"' },
      ],
    },
    {
      name: 'Cancel',
      description:
        'The cancel button. Closes the dialog when clicked. Receives initial focus when the dialog opens. Styled as the outline button variant.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the cancel button.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"alert-dialog-cancel"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A standard confirmation dialog asking the user to confirm a destructive action.',
      code: `<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="destructive">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      hasDemo: true,
    },
    {
      title: 'Controlled',
      description: 'Use the open input and openChange output to control the dialog state from your component.',
      code: `// In your component class:
isOpen = signal(false);

onConfirm() {
  // handle confirmation logic
  this.isOpen.set(false);
}

// In your template:
<AlertDialog [open]="isOpen()" (openChange)="isOpen.set($event)">
  <AlertDialogTrigger>
    <Button (click)="isOpen.set(true)">Open Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirm Action</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to proceed?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction (click)="onConfirm()">Confirm</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    },
    {
      title: 'Custom action styling',
      description: 'Override the action button appearance using the class prop.',
      code: `<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="outline">Unpublish Post</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Unpublish this post?</AlertDialogTitle>
      <AlertDialogDescription>
        The post will be moved to drafts and hidden from public view.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Keep published</AlertDialogCancel>
      <AlertDialogAction class="bg-yellow-600 hover:bg-yellow-700">
        Unpublish
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    },
    {
      title: 'Without trigger (programmatic open)',
      description: 'Open the dialog programmatically without a built-in trigger element.',
      code: `// In your component class:
showConfirm = signal(false);

deleteItem(id: string) {
  // trigger from elsewhere (e.g., a table row action)
  this.pendingId = id;
  this.showConfirm.set(true);
}

// In your template:
<AlertDialog [open]="showConfirm()" (openChange)="showConfirm.set($event)">
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete item?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently remove the selected item.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Alert and Message Dialogs WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog',
    keyboardInteractions: [
      {
        key: 'Escape',
        description: 'Closes the alert dialog.',
      },
      {
        key: 'Tab',
        description: 'Moves focus to the next focusable element within the dialog (focus is trapped).',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus to the previous focusable element within the dialog.',
      },
      {
        key: 'Space / Enter',
        description: 'Activates the focused button (Cancel or Action).',
      },
    ],
    ariaAttributes: [
      {
        name: 'role="alertdialog"',
        description: 'Applied to the content element. Signals urgency to screen readers.',
      },
      {
        name: 'aria-modal="true"',
        description: 'Tells assistive technologies that content outside the dialog is inert.',
      },
      {
        name: 'aria-labelledby',
        description: 'Automatically linked to the AlertDialogTitle id.',
      },
      {
        name: 'aria-describedby',
        description: 'Automatically linked to the AlertDialogDescription id.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/alert-dialog',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA alertdialog pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog',
      icon: 'docs',
    },
  ],
};
