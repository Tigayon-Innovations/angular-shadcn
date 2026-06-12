/**
 * Textarea Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const TEXTAREA_DOCUMENTATION: ComponentDocumentation = {
  name: 'Textarea',
  slug: 'textarea',
  description:
    'Displays a multi-line text input field. Implements ControlValueAccessor for seamless integration with Angular Reactive Forms and Template-driven Forms. Supports optional auto-resize behavior.',

  features: [
    { text: 'Full Angular Forms integration (ngModel, formControl, formControlName).', highlight: true },
    { text: 'Optional auto-resize as the user types.', highlight: true },
    { text: 'Accessible error states via aria-invalid.' },
    { text: 'Configurable visible row count.' },
    { text: 'Disabled state support.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/textarea',
      pnpm: 'pnpm add @ng-cn/textarea',
      yarn: 'yarn add @ng-cn/textarea',
      bun: 'bun add @ng-cn/textarea',
    },
    ngAdd: 'ng g @ng-cn/core:c textarea',
  },

  anatomy: {
    importStatement: `import { Textarea } from '@/ui/textarea';`,
    structure: `<textarea Textarea></textarea>`,
  },

  apiReference: [
    {
      name: 'Textarea',
      description: 'An attribute directive applied to a native <textarea> element that adds shadcn styling and Angular Forms integration.',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          default: "''",
          description: 'Placeholder text shown when the textarea is empty.',
        },
        {
          name: 'id',
          type: 'string',
          default: "''",
          description: 'The id attribute of the textarea element. Used to associate with a Label.',
        },
        {
          name: 'name',
          type: 'string',
          default: "''",
          description: 'The name attribute for form submission.',
        },
        {
          name: 'rows',
          type: 'number',
          default: '3',
          description: 'The number of visible text rows. Controls the initial height of the textarea.',
        },
        {
          name: 'disabled',
          type: 'boolean | string',
          default: 'false',
          description: 'Whether the textarea is disabled. Accepts a boolean or an empty string (HTML attribute style).',
        },
        {
          name: 'autoResize',
          type: 'boolean',
          default: 'false',
          description: 'When true, the textarea height adjusts automatically as the user types.',
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
          description: 'Associates the textarea with a description element for accessibility.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the textarea element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"textarea"' },
        { name: '[data-auto-resize]', values: 'Present when autoResize is true' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple multi-line text input.',
      code: `<textarea Textarea placeholder="Type your message here."></textarea>`,
      hasDemo: true,
    },
    {
      title: 'With Label',
      description: 'Pair a Textarea with a Label for an accessible form field.',
      code: `<Label for="message">Message</Label>
<textarea Textarea id="message" placeholder="Enter your message..."></textarea>`,
    },
    {
      title: 'Auto-resize',
      description: 'Use autoResize to make the textarea grow automatically as the user types.',
      code: `<Label for="bio">Bio</Label>
<textarea Textarea id="bio" [autoResize]="true"
  placeholder="Tell us about yourself...">
</textarea>`,
    },
    {
      title: 'Reactive Forms',
      description: 'Use with Angular Reactive Forms via formControlName.',
      code: `// In your component class:
form = new FormGroup({
  message: new FormControl('', Validators.required),
});

// In your template:
<form [formGroup]="form">
  <Label for="message">Message</Label>
  <textarea Textarea id="message" formControlName="message"
    placeholder="Enter your message" [rows]="5">
  </textarea>
</form>`,
    },
    {
      title: 'Disabled',
      description: 'A disabled textarea prevents user interaction.',
      code: `<textarea Textarea disabled placeholder="Disabled textarea"></textarea>`,
    },
    {
      title: 'With error state',
      description: 'Use aria-invalid to show error styling alongside an error message.',
      code: `<textarea Textarea
  [attr.aria-invalid]="form.controls.message.invalid && form.controls.message.touched"
  [attr.aria-describedby]="'message-error'"
  placeholder="Enter your message"
></textarea>
<p id="message-error" class="text-sm text-destructive">Message is required.</p>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Textbox (multiline) WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/textbox/',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus to the textarea.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus away from the textarea.',
      },
      {
        key: 'Enter',
        description: 'Inserts a new line within the textarea.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/textarea',
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
