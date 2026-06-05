/**
 * Drawer Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const DRAWER_DOCUMENTATION: ComponentDocumentation = {
  name: 'Drawer',
  slug: 'drawer',
  description:
    'A panel that slides in from an edge of the screen. Supports touch-swipe to dismiss.',

  features: [
    { text: 'Slides in from bottom, top, left, or right.', highlight: true },
    { text: 'Touch-swipe gesture to dismiss on mobile.', highlight: true },
    { text: 'Clicking the overlay closes the drawer.' },
    { text: 'Escape key closes the drawer.' },
    { text: 'Focus is trapped inside the drawer while open.' },
    { text: 'Focus is restored to the trigger element on close.' },
    { text: 'Supports controlled and uncontrolled open state.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/drawer',
      pnpm: 'pnpm add @ng-cn/drawer',
      yarn: 'yarn add @ng-cn/drawer',
      bun: 'bun add @ng-cn/drawer',
    },
    ngAdd: 'ng g @ng-cn/core:c drawer',
  },

  anatomy: {
    importStatement: `import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from '@/ui/drawer';`,
    structure: `<Drawer>
  <DrawerTrigger />
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle />
      <DrawerDescription />
    </DrawerHeader>
    <!-- content -->
    <DrawerFooter>
      <DrawerClose />
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
  },

  apiReference: [
    {
      name: 'Root',
      description:
        'The root component that manages open state, direction, and ARIA ID context for all child parts.',
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
        {
          name: 'shouldScaleBackground',
          type: 'boolean',
          default: 'true',
          description: 'Whether to show the drag handle bar at the top of the drawer content.',
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
        { name: '[data-slot]', values: '"drawer"' },
      ],
    },
    {
      name: 'Trigger',
      description: 'The element that opens the drawer when clicked.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'When true, renders the trigger as its child element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"drawer-trigger"' },
        { name: '[aria-haspopup]', values: '"dialog"' },
        { name: '[aria-expanded]', values: 'true | false' },
      ],
    },
    {
      name: 'Content',
      description:
        'The drawer panel and backdrop overlay. Handles swipe-to-dismiss gestures, focus trapping, and body scroll lock.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the drawer panel.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"drawer-content"' },
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: 'role', values: '"dialog"' },
        { name: 'aria-modal', values: '"true"' },
      ],
    },
    {
      name: 'Header',
      description: 'A layout wrapper for the title and description at the top of the drawer.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the header.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"drawer-header"' },
      ],
    },
    {
      name: 'Footer',
      description: 'A layout wrapper for actions at the bottom of the drawer.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the footer.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"drawer-footer"' },
      ],
    },
    {
      name: 'Title',
      description: 'The accessible title of the drawer. Automatically associated via aria-labelledby.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the title.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"drawer-title"' },
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
        { name: '[data-slot]', values: '"drawer-description"' },
      ],
    },
    {
      name: 'Close',
      description: 'A wrapper element that closes the drawer when clicked.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: 'When true, renders the close button as its child element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"drawer-close"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A drawer that slides up from the bottom of the screen.',
      code: `<Drawer>
  <DrawerTrigger>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Edit Profile</DrawerTitle>
      <DrawerDescription>
        Make changes to your profile here. Click save when you're done.
      </DrawerDescription>
    </DrawerHeader>
    <div class="p-4">
      <p>Drawer content goes here.</p>
    </div>
    <DrawerFooter>
      <Button>Save changes</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
      hasDemo: true,
    },
    {
      title: 'Controlled open state',
      description: 'Manage the drawer state externally with a signal.',
      code: `// In your component class:
isOpen = signal(false);

// In your template:
<Drawer [open]="isOpen()" (openChange)="isOpen.set($event)">
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Notifications</DrawerTitle>
    </DrawerHeader>
    <div class="p-4">You have 3 unread messages.</div>
    <DrawerFooter>
      <DrawerClose>
        <Button variant="outline">Dismiss</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

<Button (click)="isOpen.set(true)">Show Notifications</Button>`,
    },
    {
      title: 'Default open',
      description: 'Open the drawer on initial render without controlling state.',
      code: `<Drawer [defaultOpen]="true">
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Welcome</DrawerTitle>
      <DrawerDescription>This drawer opens automatically.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose>
        <Button>Got it</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
    },
    {
      title: 'Form in drawer',
      description: 'Place a form inside a drawer for contextual data entry.',
      code: `<Drawer>
  <DrawerTrigger>
    <Button>Add item</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>New Item</DrawerTitle>
      <DrawerDescription>Fill in the details below.</DrawerDescription>
    </DrawerHeader>
    <form class="p-4 space-y-4" (ngSubmit)="onSubmit()">
      <input class="w-full border rounded p-2" placeholder="Item name" />
      <textarea class="w-full border rounded p-2" placeholder="Description"></textarea>
      <DrawerFooter class="px-0">
        <Button type="submit">Create</Button>
        <DrawerClose>
          <Button type="button" variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </form>
  </DrawerContent>
</Drawer>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Dialog WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal',
    keyboardInteractions: [
      {
        key: 'Escape',
        description: 'Closes the drawer.',
      },
      {
        key: 'Tab',
        description: 'Moves focus to the next focusable element within the drawer (focus is trapped).',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus to the previous focusable element within the drawer.',
      },
    ],
    ariaAttributes: [
      {
        name: 'role="dialog"',
        description: 'Applied to the drawer content panel.',
      },
      {
        name: 'aria-modal="true"',
        description: 'Tells assistive technologies that content outside the drawer is inert.',
      },
      {
        name: 'aria-labelledby',
        description: 'Automatically linked to the DrawerTitle id.',
      },
      {
        name: 'aria-describedby',
        description: 'Automatically linked to the DrawerDescription id.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/drawer',
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
