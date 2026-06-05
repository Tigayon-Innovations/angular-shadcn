/**
 * PhoneInput Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const PHONE_INPUT_DOCUMENTATION: ComponentDocumentation = {
  name: 'Phone Input',
  slug: 'phone-input',
  description:
    'A composite phone number input combining a CountrySelector (for the dial code) with a native tel input (for the local number). Integrates with Angular Forms via ControlValueAccessor. The CVA value format is "{dialCode} {localNumber}" (e.g. "+1 555-123-4567").',

  features: [
    { text: 'CountrySelector + tel input in a single component.', highlight: true },
    { text: 'Angular Forms support (ngModel and reactive forms).', highlight: true },
    { text: 'CVA value format: "{dialCode} {localNumber}" (e.g. "+1 555-123-4567").' },
    { text: 'Auto-parses dial code on writeValue.' },
    { text: 'Supports disabled state.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/phone-input',
      pnpm: 'pnpm add @ng-cn/phone-input',
      yarn: 'yarn add @ng-cn/phone-input',
      bun: 'bun add @ng-cn/phone-input',
    },
    ngAdd: 'ng g @ng-cn/core:c phone-input',
  },

  anatomy: {
    importStatement: `import { PhoneInput } from '@/ui/phone-input';`,
    structure: `<PhoneInput />`,
  },

  apiReference: [
    {
      name: 'PhoneInput',
      description:
        'A composite phone input composed of a CountrySelector on the left and a native tel input on the right. Implements ControlValueAccessor. The emitted value is the full phone string in the format "{dialCode} {localNumber}" (e.g. "+44 7700-900123"). When the local number is empty, only the dial code is emitted.',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          default: "'Phone number'",
          description: 'Placeholder text for the local number input field.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description:
            'When true, both the country selector and the number input are non-interactive.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes applied to the host element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"phone-input"' },
      ],
      notes: [
        'CVA value format: "{dialCode} {localNumber}" — e.g. "+1 555-123-4567" or "+44 7700-900123".',
        'When writeValue receives a string starting with "+", the component attempts to parse the dial code and set the country automatically.',
        'Default country is US (+1).',
        'The local number part does not include the dial code — only the subscriber number.',
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A phone input with two-way binding via ngModel.',
      hasDemo: true,
      code: `// In your component:
phone = signal('');

// In your template:
<PhoneInput [(ngModel)]="phone" placeholder="Enter phone number" />

@if (phone()) {
  <p class="mt-2 text-sm text-muted-foreground">Value: {{ phone() }}</p>
}`,
    },
    {
      title: 'Reactive forms',
      description: 'Use formControl for reactive forms. The control receives the full "{dialCode} {localNumber}" string.',
      code: `// In your component:
form = new FormGroup({
  phone: new FormControl(''),
});

// In your template:
<form [formGroup]="form" class="flex flex-col gap-4 w-80">
  <PhoneInput formControlName="phone" placeholder="Mobile number" />
  <p class="text-xs text-muted-foreground">
    Raw value: {{ form.value.phone }}
  </p>
</form>`,
    },
    {
      title: 'Pre-filled value',
      description: 'Provide an initial value with a dial code prefix. The component auto-detects the country.',
      code: `// In your component:
// The component will detect "+44" and set the country to GB automatically.
form = new FormGroup({
  contactPhone: new FormControl('+44 7700-900123'),
});

// In your template:
<form [formGroup]="form">
  <PhoneInput formControlName="contactPhone" />
</form>`,
    },
    {
      title: 'Disabled state',
      description: 'Disable the entire component via the disabled input or through the Forms API.',
      code: `// Via input:
<PhoneInput [disabled]="true" [value]="'+1 555-000-0000'" />

// Via reactive forms setDisabledState:
// In your component:
phoneControl = new FormControl({ value: '+1 555-000-0000', disabled: true });

// In your template:
<PhoneInput [formControl]="phoneControl" />`,
    },
  ],

  accessibility: {
    ariaPattern: 'Composite form control',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus from the country selector trigger to the phone number input.',
      },
      {
        key: 'Enter / Space',
        description: 'Opens the country dropdown when focus is on the country selector trigger.',
      },
      {
        key: 'Escape',
        description: 'Closes the country dropdown if open.',
      },
      {
        key: 'ArrowDown / ArrowUp',
        description: 'Navigates countries in the dropdown list.',
      },
      {
        key: 'Type characters',
        description: 'Filters the country list when the dropdown is open, or types into the number input when focused.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/phone-input',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
  ],
};
