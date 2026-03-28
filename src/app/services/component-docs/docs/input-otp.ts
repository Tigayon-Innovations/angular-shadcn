/**
 * InputOTP Component Documentation
 * Radix-like comprehensive documentation for OTP input
 */

import type { ComponentDocumentation } from '../types';

export const INPUT_OTP_DOCUMENTATION: ComponentDocumentation = {
  name: 'Input OTP',
  slug: 'input-otp',
  description: 'Accessible one-time password component with copy paste functionality.',

  features: [
    { text: 'Copy/paste support.', highlight: true },
    { text: 'Keyboard navigation.' },
    { text: 'Customizable slot rendering.', highlight: true },
    { text: 'Works with password managers.' },
    { text: 'Supports numeric and alphanumeric modes.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/input-otp',
      pnpm: 'pnpm add @ng-cn/input-otp',
      yarn: 'yarn add @ng-cn/input-otp',
      bun: 'bun add @ng-cn/input-otp',
    },
    ngAdd: 'ng g @ng-cn/core:c input-otp',
  },

  anatomy: {
    importStatement: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from '@/ui/input-otp';`,
    structure: `<InputOTP>
  <InputOTPGroup>
    <InputOTPSlot [index]="0" />
    <InputOTPSlot [index]="1" />
    <InputOTPSlot [index]="2" />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot [index]="3" />
    <InputOTPSlot [index]="4" />
    <InputOTPSlot [index]="5" />
  </InputOTPGroup>
</InputOTP>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of an input OTP.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'The controlled value of the input.',
        },
        {
          name: 'maxLength',
          type: 'number',
          default: '6',
          description: 'Maximum number of characters.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from interacting with the input.',
        },
        {
          name: 'pattern',
          type: 'string',
          default: '"^[0-9]*$"',
          description: 'Pattern for input validation.',
        },
        {
          name: 'inputMode',
          type: "'numeric' | 'text' | 'decimal' | 'tel'",
          default: "'numeric'",
          description: 'Input mode for virtual keyboard.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      events: [
        {
          name: 'onChange',
          type: 'EventEmitter<string>',
          description: 'Event handler called when the value changes.',
        },
        {
          name: 'onComplete',
          type: 'EventEmitter<string>',
          description: 'Event handler called when all slots are filled.',
        },
      ],
      dataAttributes: [{ name: '[data-disabled]', values: 'Present when disabled' }],
    },
    {
      name: 'Group',
      description: 'Used to group multiple InputOTPSlot components.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'Slot',
      description: 'Renders an individual input slot.',
      props: [
        {
          name: 'index',
          type: 'number',
          required: true,
          description: 'The index of this slot (0-based).',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-active]', values: 'Present when slot is active' },
        { name: '[data-filled]', values: 'Present when slot has a value' },
      ],
    },
    {
      name: 'Separator',
      description: 'Used to render a separator between slot groups.',
      props: [
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
      description: 'A 6-digit OTP input with separator.',
      code: `<InputOTP [maxLength]="6">
  <InputOTPGroup>
    <InputOTPSlot [index]="0" />
    <InputOTPSlot [index]="1" />
    <InputOTPSlot [index]="2" />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot [index]="3" />
    <InputOTPSlot [index]="4" />
    <InputOTPSlot [index]="5" />
  </InputOTPGroup>
</InputOTP>`,
      hasDemo: true,
    },
    {
      title: 'Simple 4-digit',
      description: 'A simple 4-digit OTP without separator.',
      code: `<InputOTP [maxLength]="4">
  <InputOTPGroup>
    @for (i of [0,1,2,3]; track i) {
      <InputOTPSlot [index]="i" />
    }
  </InputOTPGroup>
</InputOTP>`,
    },
    {
      title: 'Controlled',
      description: 'Control the OTP value externally.',
      code: `// In your component:
otp = signal('');

onComplete(value: string) {
  console.log('OTP completed:', value);
}

// In template:
<InputOTP
  [(value)]="otp"
  [maxLength]="6"
  (onComplete)="onComplete($event)"
>
  <InputOTPGroup>
    @for (i of [0,1,2,3,4,5]; track i) {
      <InputOTPSlot [index]="i" />
    }
  </InputOTPGroup>
</InputOTP>

<p>Current value: {{ otp() }}</p>`,
    },
    {
      title: 'With pattern',
      description: 'Alphanumeric OTP with custom pattern.',
      code: `<InputOTP [maxLength]="6" pattern="^[a-zA-Z0-9]*$" inputMode="text">
  <InputOTPGroup>
    @for (i of [0,1,2,3,4,5]; track i) {
      <InputOTPSlot [index]="i" />
    }
  </InputOTPGroup>
</InputOTP>`,
    },
    {
      title: 'Disabled',
      description: 'Disabled state.',
      code: `<InputOTP [maxLength]="6" [disabled]="true">
  <InputOTPGroup>
    @for (i of [0,1,2,3,4,5]; track i) {
      <InputOTPSlot [index]="i" />
    }
  </InputOTPGroup>
</InputOTP>`,
    },
  ],

  accessibility: {
    ariaPattern: 'OTP/PIN input pattern',
    keyboardInteractions: [
      {
        key: '0-9',
        description: 'Types the digit into the current slot and moves to next.',
      },
      {
        key: 'Backspace',
        description: 'Clears the current slot and moves to previous.',
      },
      {
        key: 'Paste',
        description: 'Fills slots with pasted content.',
      },
    ],
    ariaAttributes: [
      {
        name: 'autocomplete',
        description: 'Set to "one-time-code" for OTP autofill support.',
      },
      {
        name: 'aria-label',
        description: 'Describes the OTP input purpose.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/input-otp',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
  ],
};
