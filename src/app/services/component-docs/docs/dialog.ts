/**
 * Dialog Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA dialog patterns
 * Matches Radix UI and shadcn/ui design and functionality
 */

import type { ComponentDocumentation } from '../types';

export const DIALOG_DOCUMENTATION: ComponentDocumentation = {
  name: 'Dialog',
  slug: 'dialog',
  description:
    'A modal dialog that overlays the main content and requires user interaction. Based on Radix UI Dialog with full accessibility support.',

  features: [
    { text: 'Built on Radix UI Dialog primitives.', highlight: true },
    { text: 'Fully accessible with ARIA attributes and keyboard support.' },
    { text: 'Focus trap prevents focus from leaving the dialog.', highlight: true },
    { text: 'Closes on Escape key or backdrop click.' },
    { text: 'Supports nested dialogs.' },
    { text: 'Can be controlled or uncontrolled.' },
    { text: 'Customizable open/close animations.' },
    { text: 'Restores focus to trigger element on close.', highlight: true },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/dialog',
      pnpm: 'pnpm add @ng-cn/dialog',
      yarn: 'yarn add @ng-cn/dialog',
      bun: 'bun add @ng-cn/dialog',
    },
    ngAdd: 'ng g @ng-cn/core:c dialog',
  },

  anatomy: {
    importStatement: `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/ui/dialog';`,
    structure: `<Dialog>
  <DialogTrigger>
    Open Dialog
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description text</DialogDescription>
    </DialogHeader>
    <div>Dialog content goes here</div>
    <DialogFooter>
      <DialogClose>Close</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'The root component that manages dialog state and context.',
      props: [
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'The open state of the dialog when it is initially rendered. Use when you do not need to control the state.',
        },
        {
          name: 'open',
          type: 'boolean',
          description:
            'The controlled open state of the dialog. Can be bound with [(open)]="myOpen" or use [open] with (openChange).',
        },
        {
          name: 'modal',
          type: 'boolean',
          default: 'true',
          description:
            'The modality of the dialog. When true, interaction with outside elements will be disabled and only dialog content will be visible to screen readers.',
        },
        {
          name: 'openChange',
          type: 'EventEmitter<boolean>',
          description:
            'Event emitted when the dialog open state changes.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-state]',
          values: '"open" | "closed"',
        },
      ],
    },
    {
      name: 'Trigger',
      description:
        'The button that opens the dialog. This element must be rendered.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child, merging their props and behavior.',
        },
      ],
      dataAttributes: [
        { name: '[aria-haspopup]', values: '"dialog"' },
        { name: '[aria-expanded]', values: 'true | false' },
        { name: '[aria-controls]', values: 'id of DialogContent' },
      ],
    },
    {
      name: 'Content',
      description:
        'The dialog modal content. Should contain DialogHeader, content, and DialogFooter.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the content container.',
        },
        {
          name: 'showClose',
          type: 'boolean',
          default: 'true',
          description:
            'Whether to display the close button in the top right corner.',
        },
        {
          name: 'initialFocus',
          type: 'string',
          description:
            'CSS selector for the element that should receive focus when the dialog opens.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[role]', values: '"dialog"' },
        { name: '[aria-modal]', values: 'true' },
        { name: '[aria-labelledby]', values: 'id of DialogTitle' },
        { name: '[aria-describedby]', values: 'id of DialogDescription' },
      ],
      cssVariables: [
        {
          name: '--dialog-animation-duration',
          description: 'Duration of entry and exit animations',
        },
      ],
    },
    {
      name: 'Header',
      description: 'Container for the dialog title and description.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the header.',
        },
      ],
    },
    {
      name: 'Title',
      description: 'The accessible title of the dialog. Automatically connected via ARIA.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the title.',
        },
      ],
      dataAttributes: [
        { name: '[id]', values: 'auto-generated unique id' },
      ],
    },
    {
      name: 'Description',
      description: 'Optional accessible description of the dialog.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the description.',
        },
      ],
      dataAttributes: [
        { name: '[id]', values: 'auto-generated unique id' },
      ],
    },
    {
      name: 'Footer',
      description: 'Container for dialog action buttons, typically placed at the bottom.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the footer.',
        },
      ],
    },
    {
      name: 'Close',
      description:
        'A button that closes the dialog. Must be rendered within the dialog.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child.',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple dialog with title, description, and close button.',
      code: `<Dialog>
  <DialogTrigger>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      hasDemo: true,
    },
    {
      title: 'Controlled',
      description: 'Control the dialog open state from your component.',
      code: `// In your component:
isOpen = signal(false);

// In your template:
<Dialog [open]="isOpen()" (openChange)="isOpen.set($event)">
  <DialogTrigger>
    <Button>Open Controlled Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Controlled Dialog</DialogTitle>
      <DialogDescription>
        This dialog state is controlled by the component.
      </DialogDescription>
    </DialogHeader>
    <Button (click)="isOpen.set(false)">Close via Component</Button>
  </DialogContent>
</Dialog>

<!-- Open from anywhere -->
<Button (click)="isOpen.set(true)">Programmatically Open</Button>`,
    },
    {
      title: 'With Form',
      description: 'A dialog with a form inside using reactive forms.',
      code: `import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

// In your component:
form = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  message: ['']
});

constructor(private fb: FormBuilder) {}

onSubmit() {
  if (this.form.valid) {
    console.log(this.form.value);
    // Handle submission
  }
}

// In your template:
<Dialog>
  <DialogTrigger>
    <Button>Contact Us</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Send us a message</DialogTitle>
      <DialogDescription>
        Fill out the form below and we'll get back to you as soon as possible.
      </DialogDescription>
    </DialogHeader>

    <form [formGroup]="form" class="space-y-4">
      <div class="space-y-2">
        <Label for="name">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          formControlName="name"
        />
      </div>
      <div class="space-y-2">
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          formControlName="email"
        />
      </div>
      <div class="space-y-2">
        <Label for="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Your message here..."
          formControlName="message"
        />
      </div>
    </form>

    <DialogFooter>
      <DialogClose>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button (click)="onSubmit()" [disabled]="form.invalid">
        Send Message
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
    {
      title: 'Alert Dialog',
      description: 'A dialog used for important alerts and confirmations.',
      code: `<Dialog>
  <DialogTrigger>
    <Button variant="destructive">Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogDescription>
        Warning: This action is permanent and cannot be reversed.
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-4">
      <p class="text-sm text-muted-foreground">
        Your account and all associated data will be permanently deleted.
        This includes all your projects, files, and settings.
      </p>
    </div>

    <DialogFooter>
      <DialogClose>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button
        variant="destructive"
        (click)="deleteAccount()"
      >
        Delete My Account
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
    {
      title: 'Nested Dialogs',
      description: 'Open another dialog from within a dialog.',
      code: `<Dialog>
  <DialogTrigger>
    <Button>Parent Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Parent Dialog</DialogTitle>
      <DialogDescription>
        Click below to open a nested dialog.
      </DialogDescription>
    </DialogHeader>

    <!-- Nested dialog -->
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Open Nested Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nested Dialog</DialogTitle>
          <DialogDescription>
            This is a dialog nested within another dialog.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <DialogFooter>
      <DialogClose>
        <Button variant="outline">Close Parent</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
    {
      title: 'Custom Content Layout',
      description: 'Create a dialog with custom content layout and styling.',
      code: `<Dialog>
  <DialogTrigger>
    <Button variant="secondary">Open Custom Dialog</Button>
  </DialogTrigger>
  <DialogContent class="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Create New Project</DialogTitle>
      <DialogDescription>
        Set up a new project with your preferred settings.
      </DialogDescription>
    </DialogHeader>

    <div class="grid grid-cols-2 gap-4 py-4">
      <div class="space-y-3">
        <h3 class="text-sm font-semibold">Project Settings</h3>
        <div class="space-y-2">
          <Label for="project-name">Project Name</Label>
          <Input id="project-name" placeholder="Enter project name" />
        </div>
        <div class="space-y-2">
          <Label for="project-type">Project Type</Label>
          <Select>
            <SelectTrigger id="project-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="desktop">Desktop</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold">Visibility</h3>
        <div class="space-y-2">
          <div class="flex items-center space-x-2">
            <Checkbox id="private" />
            <Label for="private" class="font-normal">Private</Label>
          </div>
          <div class="flex items-center space-x-2">
            <Checkbox id="org-access" />
            <Label for="org-access" class="font-normal">Org Access</Label>
          </div>
        </div>
      </div>
    </div>

    <DialogFooter>
      <DialogClose>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Create Project</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
    {
      title: 'Loading State',
      description: 'Dialog with loading state during async operation.',
      code: `isLoading = signal(false);

async submitForm() {
  this.isLoading.set(true);
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Success!');
  } finally {
    this.isLoading.set(false);
  }
}

// In template:
<Dialog>
  <DialogTrigger>
    <Button>Submit Data</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Submit Data</DialogTitle>
      <DialogDescription>
        This will send your data to the server.
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-4">
      <p>Ready to submit?</p>
    </div>

    <DialogFooter>
      <DialogClose [disabled]="isLoading()">
        <Button variant="outline" [disabled]="isLoading()">Cancel</Button>
      </DialogClose>
      <Button (click)="submitForm()" [disabled]="isLoading()">
        @if (isLoading()) {
          <Spinner class="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        } @else {
          Submit
        }
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Dialog (Modal) WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal',
    keyboardInteractions: [
      {
        key: 'Tab',
        description:
          'Moves focus to the next focusable element within the dialog. Focus is trapped within the dialog.',
      },
      {
        key: 'Shift + Tab',
        description:
          'Moves focus to the previous focusable element within the dialog.',
      },
      {
        key: 'Escape',
        description:
          'Closes the dialog if it is configured to close on Escape.',
      },
      {
        key: 'Enter',
        description:
          'Activates the focused button or submits the form if a form field is focused.',
      },
      {
        key: 'Space',
        description:
          'Activates the focused button or toggles the focused checkbox.',
      },
    ],
    ariaAttributes: [
      {
        name: 'role="dialog"',
        description: 'Identifies the element as a dialog.',
      },
      {
        name: 'aria-modal="true"',
        description: 'Indicates the dialog is modal.',
      },
      {
        name: 'aria-labelledby',
        description: 'Refers to the element containing the dialog title.',
      },
      {
        name: 'aria-describedby',
        description: 'Refers to the element containing the dialog description.',
      },
      {
        name: 'aria-haspopup="dialog"',
        description: 'Indicates the trigger opens a dialog.',
      },
      {
        name: 'aria-expanded',
        description: 'Indicates whether the dialog is open or closed.',
      },
      {
        name: 'aria-controls',
        description: 'Refers to the dialog content element.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/dialog',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'Dialog (Modal) WAI-ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal',
      icon: 'docs',
    },
    {
      text: 'Radix UI Dialog',
      url: 'https://www.radix-ui.com/primitives/docs/components/dialog',
      icon: 'docs',
    },
    {
      text: 'shadcn/ui Dialog',
      url: 'https://ui.shadcn.com/docs/components/dialog',
      icon: 'docs',
    },
  ],
};
