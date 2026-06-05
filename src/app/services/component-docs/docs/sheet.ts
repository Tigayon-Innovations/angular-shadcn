/**
 * Sheet Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const SHEET_DOCUMENTATION: ComponentDocumentation = {
  name: 'Sheet',
  slug: 'sheet',
  description:
    'Extends the Dialog component to display content that complements the main content of the screen, sliding in from any edge.',

  features: [
    { text: 'Slides in from top, right, bottom, or left via the side prop.', highlight: true },
    { text: 'Clicking the overlay closes the sheet.' },
    { text: 'Escape key closes the sheet.' },
    { text: 'Built-in close button rendered in the top-right corner of the panel.', highlight: true },
    { text: 'Focus is trapped inside the sheet while open.' },
    { text: 'Focus is restored to the trigger element on close.' },
    { text: 'Supports controlled and uncontrolled open state.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/sheet',
      pnpm: 'pnpm add @ng-cn/sheet',
      yarn: 'yarn add @ng-cn/sheet',
      bun: 'bun add @ng-cn/sheet',
    },
    ngAdd: 'ng g @ng-cn/core:c sheet',
  },

  anatomy: {
    importStatement: `import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose
} from '@/ui/sheet';`,
    structure: `<Sheet>
  <SheetTrigger />
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle />
      <SheetDescription />
    </SheetHeader>
    <!-- content -->
    <SheetFooter>
      <SheetClose />
    </SheetFooter>
  </SheetContent>
</Sheet>`,
  },

  apiReference: [
    {
      name: 'Root',
      description:
        'The root component that manages open state, side, and ARIA ID context for all child parts.',
      props: [
        {
          name: 'open',
          type: 'boolean | undefined',
          description: 'Controlled open state. When provided, the component becomes controlled.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Initial open state for uncontrolled usage.',
        },
      ],
      events: [
        {
          name: 'openChange',
          type: 'boolean',
          description: 'Emitted whenever the open state changes.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"sheet"' },
      ],
    },
    {
      name: 'Trigger',
      description: 'The element that opens the sheet when clicked.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'When true, renders the trigger as its child element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"sheet-trigger"' },
        { name: '[aria-haspopup]', values: '"dialog"' },
        { name: '[aria-expanded]', values: 'true | false' },
      ],
    },
    {
      name: 'Content',
      description:
        'The sheet panel and backdrop overlay. Includes a built-in close button. Use the side prop to control which edge the sheet slides from.',
      props: [
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          default: "'right'",
          description: 'The edge of the screen the sheet slides in from.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the sheet panel.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"sheet-content"' },
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-side]', values: '"top" | "right" | "bottom" | "left"' },
        { name: 'role', values: '"dialog"' },
        { name: 'aria-modal', values: '"true"' },
      ],
    },
    {
      name: 'Header',
      description: 'A layout wrapper for the title and description at the top of the sheet.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the header.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"sheet-header"' },
      ],
    },
    {
      name: 'Footer',
      description: 'A layout wrapper for actions at the bottom of the sheet.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the footer.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"sheet-footer"' },
      ],
    },
    {
      name: 'Title',
      description: 'The accessible title of the sheet. Automatically associated via aria-labelledby.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the title.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"sheet-title"' },
      ],
    },
    {
      name: 'Description',
      description: 'Supporting description text. Automatically associated via aria-describedby.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the description.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"sheet-description"' },
      ],
    },
    {
      name: 'Close',
      description: 'A wrapper element that closes the sheet when clicked.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'When true, renders the close element as its child element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"sheet-close"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic (right side)',
      description: 'A sheet that slides in from the right — the default side.',
      code: `<Sheet>
  <SheetTrigger>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div class="py-4">
      <p>Sheet content goes here.</p>
    </div>
    <SheetFooter>
      <SheetClose>
        <Button variant="outline">Cancel</Button>
      </SheetClose>
      <Button>Save changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
      hasDemo: true,
    },
    {
      title: 'Left side navigation',
      description: 'Use side="left" to create a slide-over navigation panel.',
      code: `<Sheet>
  <SheetTrigger>
    <Button variant="ghost" size="icon">
      <lucide-icon name="menu" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
    <nav class="mt-6 flex flex-col gap-2">
      <a href="/" class="px-2 py-1 rounded hover:bg-accent">Home</a>
      <a href="/about" class="px-2 py-1 rounded hover:bg-accent">About</a>
      <a href="/contact" class="px-2 py-1 rounded hover:bg-accent">Contact</a>
    </nav>
  </SheetContent>
</Sheet>`,
    },
    {
      title: 'Bottom sheet',
      description: 'Use side="bottom" to display a bottom sheet, useful on mobile.',
      code: `<Sheet>
  <SheetTrigger>
    <Button>Show options</Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Options</SheetTitle>
      <SheetDescription>Select an action to perform.</SheetDescription>
    </SheetHeader>
    <div class="grid gap-2 py-4">
      <Button variant="outline" class="justify-start">Share</Button>
      <Button variant="outline" class="justify-start">Download</Button>
      <Button variant="destructive" class="justify-start">Delete</Button>
    </div>
  </SheetContent>
</Sheet>`,
    },
    {
      title: 'Controlled',
      description: 'Manage the sheet open state from your component.',
      code: `// In your component class:
isOpen = signal(false);

// In your template:
<Sheet [open]="isOpen()" (openChange)="isOpen.set($event)">
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
    </SheetHeader>
    <p class="py-4">Manage your settings here.</p>
  </SheetContent>
</Sheet>

<Button (click)="isOpen.set(true)">Open Settings</Button>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Dialog WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal',
    keyboardInteractions: [
      {
        key: 'Escape',
        description: 'Closes the sheet.',
      },
      {
        key: 'Tab',
        description: 'Moves focus to the next focusable element within the sheet (focus is trapped).',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus to the previous focusable element within the sheet.',
      },
    ],
    ariaAttributes: [
      {
        name: 'role="dialog"',
        description: 'Applied to the sheet content panel.',
      },
      {
        name: 'aria-modal="true"',
        description: 'Tells assistive technologies that content outside the sheet is inert.',
      },
      {
        name: 'aria-labelledby',
        description: 'Automatically linked to the SheetTitle id.',
      },
      {
        name: 'aria-describedby',
        description: 'Automatically linked to the SheetDescription id.',
      },
      {
        name: 'aria-label="Close sheet"',
        description: 'Applied to the built-in close button in the top-right corner.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/sheet',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA dialog pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal',
      icon: 'docs',
    },
  ],
};
