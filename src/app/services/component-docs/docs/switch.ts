/**
 * Switch Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const SWITCH_DOCUMENTATION: ComponentDocumentation = {
  name: 'Switch',
  slug: 'switch',
  description:
    'A control that allows the user to toggle between checked and unchecked states. Based on Radix UI Switch primitive with shadcn/ui styling. Supports Angular Forms via ControlValueAccessor.',

  features: [
    { text: 'Full Angular Forms integration (ngModel, formControl, formControlName).', highlight: true },
    { text: 'Controlled and uncontrolled modes.' },
    { text: 'Two-way binding via [(checked)] model signal.', highlight: true },
    { text: 'Native form submission support via hidden checkbox input.' },
    { text: 'Keyboard accessible (Space/Enter to toggle).' },
    { text: 'Accessible with role="switch" and aria-checked.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/switch',
      pnpm: 'pnpm add @ng-cn/switch',
      yarn: 'yarn add @ng-cn/switch',
      bun: 'bun add @ng-cn/switch',
    },
    ngAdd: 'ng g @ng-cn/core:c switch',
  },

  anatomy: {
    importStatement: `import { Switch } from '@/ui/switch';`,
    structure: `<Switch />`,
  },

  apiReference: [
    {
      name: 'Switch',
      description: 'An accessible toggle control with checked/unchecked states.',
      props: [
        {
          name: 'checked',
          type: 'boolean',
          default: 'false',
          description: 'The controlled checked state of the switch. Supports two-way binding: [(checked)]="value".',
        },
        {
          name: 'defaultChecked',
          type: 'boolean',
          default: 'false',
          description: 'The initial checked state when used in uncontrolled mode.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Whether the switch is disabled. Prevents interaction and applies disabled styles.',
        },
        {
          name: 'required',
          type: 'boolean',
          default: 'false',
          description: 'Whether the switch is required. Sets aria-required on the button.',
        },
        {
          name: 'id',
          type: 'string',
          description: 'The id for the switch button. Used to associate with a Label.',
        },
        {
          name: 'name',
          type: 'string',
          description: 'The name attribute for the hidden checkbox input used in native form submission.',
        },
        {
          name: 'value',
          type: 'string',
          default: "'on'",
          description: 'The value submitted with the form when the switch is checked.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the switch host element.',
        },
        {
          name: 'buttonClass',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the inner track button element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"switch"' },
        { name: '[data-state]', values: '"checked" | "unchecked"' },
        { name: '[data-disabled]', values: 'Present when disabled' },
      ],
      events: [
        {
          name: 'checkedChange',
          type: 'boolean',
          description: 'Emitted when the checked state changes. Use (checkedChange) or [(checked)] for two-way binding.',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple toggle switch.',
      code: `<Switch id="airplane-mode" />`,
      hasDemo: true,
    },
    {
      title: 'With Label',
      description: 'Pair a Switch with a Label for accessible toggle settings.',
      code: `<div class="flex items-center gap-2">
  <Switch id="notifications" />
  <Label for="notifications">Enable notifications</Label>
</div>`,
    },
    {
      title: 'Two-way binding',
      description: 'Use [(checked)] for two-way binding to a signal or property.',
      code: `// In your component class:
isEnabled = signal(false);

// In your template:
<Switch [(checked)]="isEnabled" />
<p>Notifications are {{ isEnabled() ? 'enabled' : 'disabled' }}.</p>`,
    },
    {
      title: 'Reactive Forms',
      description: 'Use with Angular Reactive Forms via formControlName.',
      code: `// In your component class:
form = new FormGroup({
  notifications: new FormControl(false),
  marketing: new FormControl(false),
});

// In your template:
<form [formGroup]="form">
  <div class="flex items-center gap-2">
    <Switch id="notifications" formControlName="notifications" />
    <Label for="notifications">Email notifications</Label>
  </div>
  <div class="flex items-center gap-2">
    <Switch id="marketing" formControlName="marketing" />
    <Label for="marketing">Marketing emails</Label>
  </div>
</form>`,
    },
    {
      title: 'Disabled',
      description: 'A disabled switch cannot be toggled.',
      code: `<Switch [disabled]="true" />
<Switch [disabled]="true" [defaultChecked]="true" />`,
    },
    {
      title: 'Default checked (uncontrolled)',
      description: 'Use defaultChecked to set the initial state without controlling it.',
      code: `<Switch defaultChecked />`,
    },
  ],

  accessibility: {
    ariaPattern: 'Switch WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/switch/',
    keyboardInteractions: [
      {
        key: 'Space',
        description: 'Toggles the switch between checked and unchecked states.',
      },
      {
        key: 'Enter',
        description: 'Toggles the switch between checked and unchecked states.',
      },
      {
        key: 'Tab',
        description: 'Moves focus to the switch.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus away from the switch.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/switch',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA switch pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/switch/',
      icon: 'docs',
    },
  ],
};
