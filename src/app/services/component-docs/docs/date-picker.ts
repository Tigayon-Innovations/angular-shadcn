/**
 * DatePicker Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const DATE_PICKER_DOCUMENTATION: ComponentDocumentation = {
  name: 'Date Picker',
  slug: 'date-picker',
  description:
    'A date selection input that opens a calendar popover. Integrates with Angular Forms via ControlValueAccessor.',

  features: [
    { text: 'Calendar popover for visual date selection.', highlight: true },
    { text: 'Angular Forms support (ngModel and reactive forms).', highlight: true },
    { text: 'Locale-aware date formatting.' },
    { text: 'Min and max date constraints.' },
    { text: 'Custom disabled-date function.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/date-picker',
      pnpm: 'pnpm add @ng-cn/date-picker',
      yarn: 'yarn add @ng-cn/date-picker',
      bun: 'bun add @ng-cn/date-picker',
    },
    ngAdd: 'ng g @ng-cn/core:c date-picker',
  },

  anatomy: {
    importStatement: `import { DatePicker } from '@/ui/date-picker';`,
    structure: `<DatePicker />`,
  },

  apiReference: [
    {
      name: 'DatePicker',
      description:
        'A single-component date picker that wraps a Popover and a Calendar. Implements ControlValueAccessor for seamless Angular Forms integration.',
      props: [
        {
          name: 'date',
          type: 'Date | undefined',
          default: 'undefined',
          description:
            'The selected date. Supports two-way binding with [(date)]. Used when not integrated with Angular Forms.',
        },
        {
          name: 'placeholder',
          type: 'string',
          default: "'Pick a date'",
          description: 'Text shown in the trigger button when no date is selected.',
        },
        {
          name: 'minDate',
          type: 'Date | undefined',
          default: 'undefined',
          description: 'The earliest selectable date. Dates before this are disabled in the calendar.',
        },
        {
          name: 'maxDate',
          type: 'Date | undefined',
          default: 'undefined',
          description: 'The latest selectable date. Dates after this are disabled in the calendar.',
        },
        {
          name: 'disabledDates',
          type: '((date: Date) => boolean) | undefined',
          default: 'undefined',
          description:
            'A predicate function that receives a date and returns true if that date should be disabled.',
        },
        {
          name: 'locale',
          type: 'string',
          default: "'en-US'",
          description:
            "BCP 47 locale string used to format the displayed date (e.g. 'fr-FR', 'de-DE'). Passed to Date.toLocaleDateString().",
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the trigger button.',
        },
      ],
      events: [
        {
          name: 'onSelect',
          type: 'Date | undefined',
          description: 'Emitted when the user selects a date. Also called by ControlValueAccessor.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"date-picker"' },
      ],
      notes: [
        'When used with ngModel or formControl, the value type is Date | undefined.',
        'The disabled state from setDisabledState() visually disables the trigger button and prevents interaction.',
        'The calendar closes automatically after a date is selected.',
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple date picker with two-way binding.',
      hasDemo: true,
      code: `// In your component:
selectedDate = signal<Date | undefined>(undefined);

// In your template:
<DatePicker [(date)]="selectedDate" />

@if (selectedDate()) {
  <p class="mt-2 text-sm text-muted-foreground">
    Selected: {{ selectedDate() | date:'mediumDate' }}
  </p>
}`,
    },
    {
      title: 'With Angular Forms',
      description: 'Use ngModel or formControl for full Forms integration.',
      code: `// Template-driven with ngModel:
<DatePicker [(ngModel)]="birthDate" placeholder="Select your birth date" />

// Reactive forms:
// In your component:
form = new FormGroup({
  startDate: new FormControl<Date | undefined>(undefined),
});

// In your template:
<form [formGroup]="form">
  <DatePicker formControlName="startDate" placeholder="Start date" />
</form>`,
    },
    {
      title: 'With date constraints',
      description: 'Restrict the selectable range with minDate and maxDate, or a custom predicate.',
      code: `// In your component:
today = new Date();
maxDate = new Date(this.today.getFullYear() + 1, 11, 31);

// Disable weekends
isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

selectedDate = signal<Date | undefined>(undefined);

// In your template:
<DatePicker
  [(date)]="selectedDate"
  [minDate]="today"
  [maxDate]="maxDate"
  [disabledDates]="isWeekend"
  placeholder="Pick a weekday"
/>`,
    },
    {
      title: 'Localized date display',
      description: 'Use the locale input to format the displayed date for different regions.',
      code: `// In your component:
selectedDate = signal<Date | undefined>(undefined);

// In your template:
<div class="flex flex-col gap-4">
  <DatePicker [(date)]="selectedDate" locale="en-US" placeholder="MM/DD/YYYY" />
  <DatePicker [(date)]="selectedDate" locale="de-DE" placeholder="TT.MM.JJJJ" />
  <DatePicker [(date)]="selectedDate" locale="fr-FR" placeholder="JJ/MM/AAAA" />
</div>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Dialog (Calendar) WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal',
    keyboardInteractions: [
      {
        key: 'Enter / Space',
        description: 'Opens the calendar popover when focus is on the trigger button.',
      },
      {
        key: 'Escape',
        description: 'Closes the calendar popover.',
      },
      {
        key: 'ArrowLeft / ArrowRight',
        description: 'Navigate between days in the calendar.',
      },
      {
        key: 'ArrowUp / ArrowDown',
        description: 'Navigate between weeks in the calendar.',
      },
      {
        key: 'Enter',
        description: 'Selects the focused date and closes the popover.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/tree/main/src/app/lib/components/ui/date-picker',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
