/**
 * CountrySelector Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const COUNTRY_SELECTOR_DOCUMENTATION: ComponentDocumentation = {
  name: 'Country Selector',
  slug: 'country-selector',
  description:
    'A searchable country dropdown backed by a built-in list of countries. Integrates with Angular Forms via ControlValueAccessor. The CVA value is the ISO 2-letter country code (e.g. "US").',

  features: [
    { text: 'Built-in list of countries with flag emoji and dial codes.', highlight: true },
    { text: 'Full-text search across country name, code, and dial code.' },
    { text: 'Angular Forms support (ngModel and reactive forms).', highlight: true },
    { text: 'Emits a typed Country object on selection.' },
    { text: 'Supports disabled state.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/country-selector',
      pnpm: 'pnpm add @ng-cn/country-selector',
      yarn: 'yarn add @ng-cn/country-selector',
      bun: 'bun add @ng-cn/country-selector',
    },
    ngAdd: 'ng g @ng-cn/core:c country-selector',
  },

  anatomy: {
    importStatement: `import { CountrySelector } from '@/ui/country-selector';
import type { Country } from '@/ui/country-selector';`,
    structure: `<CountrySelector />`,
  },

  apiReference: [
    {
      name: 'CountrySelector',
      description:
        'A single-component country picker. Uses a Command palette inside a Popover for search. Implements ControlValueAccessor — the CVA/ngModel value is the ISO 2-letter country code string.',
      props: [
        {
          name: 'value',
          type: 'string',
          default: "''",
          description:
            'ISO 2-letter country code (e.g. "US", "GB", "JP"). Syncs to internal state and takes precedence over CVA writeValue when set.',
        },
        {
          name: 'placeholder',
          type: 'string',
          default: "'Select country'",
          description: 'Text shown in the trigger button when no country is selected.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, the selector is non-interactive.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes applied to the host element.',
        },
      ],
      events: [
        {
          name: 'countryChange',
          type: 'Country',
          description:
            'Emitted when the user selects a country. Carries the full Country object, not just the code.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"country-selector"' },
      ],
      notes: [
        'The CVA / ngModel value is a plain string — the ISO 2-letter country code (e.g. "US").',
        'Use (countryChange) when you need the full Country object including name, flag, and dialCode.',
        'Country type shape: { code: string; name: string; flag: string; dialCode: string }',
      ],
    },
    {
      name: 'Country (type)',
      description: 'The shape of the country object emitted by countryChange and used internally.',
      props: [
        {
          name: 'code',
          type: 'string',
          description: 'ISO 3166-1 alpha-2 country code, e.g. "US", "GB", "JP".',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Full English country name, e.g. "United States", "United Kingdom".',
        },
        {
          name: 'flag',
          type: 'string',
          description: 'Emoji flag for the country, e.g. "🇺🇸", "🇬🇧".',
        },
        {
          name: 'dialCode',
          type: 'string',
          description: 'International dialing prefix including the "+", e.g. "+1", "+44", "+81".',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple country selector with two-way binding on the ISO country code.',
      hasDemo: true,
      code: `// In your component:
countryCode = signal('US');

// In your template:
<CountrySelector
  [value]="countryCode()"
  (countryChange)="countryCode.set($event.code)"
  class="w-72"
/>`,
    },
    {
      title: 'With Angular Forms (ngModel)',
      description: 'Use ngModel for template-driven forms. The model value is the ISO country code string.',
      code: `// In your component:
selectedCode = 'GB';

onCountryChange(country: Country): void {
  console.log('Selected:', country.name, country.dialCode);
}

// In your template:
<CountrySelector
  [(ngModel)]="selectedCode"
  (countryChange)="onCountryChange($event)"
  class="w-72"
/>
<p class="text-sm text-muted-foreground">Selected code: {{ selectedCode }}</p>`,
    },
    {
      title: 'Reactive forms',
      description: 'Integrates with FormControl. The control value is the ISO code string.',
      code: `// In your component:
form = new FormGroup({
  country: new FormControl('DE'),
});

// In your template:
<form [formGroup]="form" class="flex flex-col gap-4">
  <CountrySelector formControlName="country" class="w-72" />
  <p class="text-sm text-muted-foreground">
    Value: {{ form.value.country }}
  </p>
</form>`,
    },
    {
      title: 'Accessing the full Country object',
      description: 'Use (countryChange) to receive the full Country object when a selection is made.',
      code: `import type { Country } from '@/ui/country-selector';

// In your component:
selectedCountry = signal<Country | null>(null);

// In your template:
<CountrySelector
  (countryChange)="selectedCountry.set($event)"
  class="w-72"
/>

@if (selectedCountry(); as country) {
  <div class="mt-4 rounded-md border p-4 text-sm space-y-1">
    <p><span class="font-medium">Flag:</span> {{ country.flag }}</p>
    <p><span class="font-medium">Name:</span> {{ country.name }}</p>
    <p><span class="font-medium">Code:</span> {{ country.code }}</p>
    <p><span class="font-medium">Dial code:</span> {{ country.dialCode }}</p>
  </div>
}`,
    },
  ],

  accessibility: {
    ariaPattern: 'Combobox WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox',
    keyboardInteractions: [
      {
        key: 'Enter / Space',
        description: 'Opens the country dropdown when focus is on the trigger button.',
      },
      {
        key: 'Escape',
        description: 'Closes the dropdown without changing the selection.',
      },
      {
        key: 'ArrowDown / ArrowUp',
        description: 'Navigates between countries in the list.',
      },
      {
        key: 'Type characters',
        description: 'Filters the country list by name, ISO code, or dial code.',
      },
      {
        key: 'Enter',
        description: 'Selects the highlighted country and closes the dropdown.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/country-selector',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
  ],
};
