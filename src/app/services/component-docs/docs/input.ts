/**
 * Input Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const INPUT_DOCUMENTATION: ComponentDocumentation = {
  name: 'Input',
  slug: 'input',
  description:
    'Displays a form input field. Implements ControlValueAccessor for seamless integration with Angular Reactive Forms and Template-driven Forms.',

  features: [
    { text: 'Full Angular Forms integration (ngModel, formControl, formControlName).', highlight: true },
    { text: 'Supports all native HTML input types.' },
    { text: 'Accessible error states via aria-invalid.', highlight: true },
    { text: 'Disabled state support.' },
    { text: 'File input styling included.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/input',
      pnpm: 'pnpm add @ng-cn/input',
      yarn: 'yarn add @ng-cn/input',
      bun: 'bun add @ng-cn/input',
    },
    ngAdd: 'ng g @ng-cn/core:c input',
  },

  anatomy: {
    importStatement: `import { Input } from '@/ui/input';`,
    structure: `<input Input />`,
  },

  apiReference: [
    {
      name: 'Input',
      description: 'An attribute directive applied to a native <input> element that adds shadcn styling and form integration.',
      props: [
        {
          name: 'type',
          type: 'string',
          default: "'text'",
          description: 'The type of the input element (e.g. "text", "email", "password", "file", "number").',
        },
        {
          name: 'placeholder',
          type: 'string',
          default: "''",
          description: 'Placeholder text shown when the input is empty.',
        },
        {
          name: 'id',
          type: 'string',
          default: "''",
          description: 'The id attribute of the input element. Used to associate with a Label.',
        },
        {
          name: 'name',
          type: 'string',
          default: "''",
          description: 'The name attribute for form submission.',
        },
        {
          name: 'autocomplete',
          type: 'string',
          default: "''",
          description: 'The autocomplete attribute to control browser autofill behavior.',
        },
        {
          name: 'autofocus',
          type: 'boolean | string',
          default: 'false',
          description: 'Whether the input should receive focus on page load.',
        },
        {
          name: 'disabled',
          type: 'boolean | string',
          default: 'false',
          description: 'Whether the input is disabled. Accepts a boolean or an empty string (HTML attribute style).',
        },
        {
          name: 'value',
          type: 'string',
          default: "''",
          description: 'Initial value for non-form usage. Aliased as "value" on the input element.',
        },
        {
          name: 'aria-invalid',
          type: 'boolean | undefined',
          default: 'undefined',
          description: 'Sets the aria-invalid attribute for error state styling.',
        },
        {
          name: 'aria-describedby',
          type: 'string | undefined',
          default: 'undefined',
          description: 'Associates the input with a description element for accessibility.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the input element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"input"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple text input.',
      code: `<input Input type="text" placeholder="Enter your name" />`,
      hasDemo: true,
    },
    {
      title: 'With Label',
      description: 'Pair an Input with a Label for accessible form fields.',
      code: `<Label for="email">Email address</Label>
<input Input id="email" type="email" placeholder="you@example.com" />`,
    },
    {
      title: 'Reactive Forms',
      description: 'Use with Angular Reactive Forms via formControlName.',
      code: `// In your component class:
form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', Validators.required),
});

// In your template:
<form [formGroup]="form">
  <Label for="email">Email</Label>
  <input Input id="email" type="email" formControlName="email"
    placeholder="Enter your email" />

  <Label for="password">Password</Label>
  <input Input id="password" type="password" formControlName="password"
    placeholder="Enter your password" />
</form>`,
    },
    {
      title: 'Disabled',
      description: 'A disabled input prevents user interaction.',
      code: `<input Input type="text" disabled placeholder="Disabled input" />`,
    },
    {
      title: 'File input',
      description: 'Use type="file" for file upload inputs.',
      code: `<Label for="picture">Upload picture</Label>
<input Input id="picture" type="file" />`,
    },
    {
      title: 'With error state',
      description: 'Use aria-invalid to show error styling.',
      code: `<input Input type="email" [attr.aria-invalid]="hasError" placeholder="Invalid email" />`,
    },
  ],

  accessibility: {
    ariaPattern: 'Textbox WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/textbox/',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus to the input.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus away from the input.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/input',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA textbox pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/textbox/',
      icon: 'docs',
    },
  ],
};
