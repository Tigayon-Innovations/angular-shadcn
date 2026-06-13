/**
 * Calendar Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const CALENDAR_DOCUMENTATION: ComponentDocumentation = {
  name: 'Calendar',
  slug: 'calendar',
  description:
    'A date picker calendar that allows users to browse months and select dates with full keyboard navigation and screen reader support.',

  features: [
    { text: 'Full keyboard navigation between dates and months.', highlight: true },
    { text: 'Screen reader announcements for month changes and date selections.', highlight: true },
    { text: 'Min/max date constraints with automatic navigation blocking.' },
    { text: 'Custom disabled dates via a predicate function.' },
    { text: 'Locale-aware date formatting.' },
    { text: 'Controlled and uncontrolled selection via model input.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/calendar',
      pnpm: 'pnpm add @ng-cn/calendar',
      yarn: 'yarn add @ng-cn/calendar',
      bun: 'bun add @ng-cn/calendar',
    },
    ngAdd: 'ng g @ng-cn/core:c calendar',
  },

  anatomy: {
    importStatement: `import { Calendar } from '@/ui/calendar';`,
    structure: `<Calendar
  [(selected)]="date"
  (onSelect)="handleSelect($event)"
/>`,
  },

  apiReference: [
    {
      name: 'Calendar',
      description: 'A single-component calendar that renders a monthly grid and navigation.',
      props: [
        {
          name: 'selected',
          type: 'Date | undefined',
          default: 'undefined',
          description:
            'The currently selected date. Use as a two-way binding with [(selected)] for model-based control.',
        },
        {
          name: 'mode',
          type: "'single' | 'multiple' | 'range'",
          default: "'single'",
          description:
            'Selection mode. Currently "single" is fully implemented; multiple and range are planned.',
        },
        {
          name: 'numberOfMonths',
          type: 'number',
          default: '1',
          description: 'Number of months to display side by side.',
        },
        {
          name: 'showOutsideDays',
          type: 'boolean',
          default: 'true',
          description: 'Whether to render days that fall outside the current month.',
        },
        {
          name: 'disabled',
          type: '((date: Date) => boolean) | undefined',
          default: 'undefined',
          description:
            'A predicate function that receives a date and returns true when that date should be disabled.',
        },
        {
          name: 'minDate',
          type: 'Date | undefined',
          default: 'undefined',
          description:
            'Earliest selectable date. Dates before this are disabled and the previous-month button is blocked when the current month reaches this boundary.',
        },
        {
          name: 'maxDate',
          type: 'Date | undefined',
          default: 'undefined',
          description:
            'Latest selectable date. Dates after this are disabled and the next-month button is blocked when the current month reaches this boundary.',
        },
        {
          name: 'locale',
          type: 'string',
          default: "'en-US'",
          description:
            'BCP 47 locale tag used for formatting the month/year heading and accessible date labels (e.g. "fr-FR", "ja-JP").',
        },
        {
          name: 'ariaLabel',
          type: 'string',
          default: "'Calendar'",
          description: 'Accessible label applied to the calendar application landmark.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the calendar root element.',
        },
      ],
      events: [
        {
          name: 'onSelect',
          type: 'Date | undefined',
          description: 'Emitted when the user clicks a date cell. Carries the selected Date.',
        },
        {
          name: 'onMonthChange',
          type: 'Date',
          description:
            'Emitted when the visible month changes via the previous/next navigation buttons. Carries the first day of the new month.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"calendar"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple date picker calendar.',
      hasDemo: true,
      code: `// In your component:
date = signal<Date | undefined>(undefined);

// In your template:
<Calendar [(selected)]="date" />`,
    },
    {
      title: 'Controlled selection',
      description: 'Listen to the onSelect output to react to user selections.',
      code: `// In your component:
selected = signal<Date | undefined>(undefined);

handleSelect(date: Date | undefined): void {
  this.selected.set(date);
  console.log('User selected:', date);
}

// In your template:
<Calendar
  [selected]="selected()"
  (onSelect)="handleSelect($event)"
/>
<p>Selected: {{ selected() | date }}</p>`,
    },
    {
      title: 'Min and max dates',
      description: 'Restrict navigation and selection to a specific date range.',
      code: `// In your component:
today = new Date();
minDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
maxDate = new Date(this.today.getFullYear(), this.today.getMonth() + 2, 0);
selected = signal<Date | undefined>(undefined);

// In your template:
<Calendar
  [(selected)]="selected"
  [minDate]="minDate"
  [maxDate]="maxDate"
/>`,
    },
    {
      title: 'Disabled dates via predicate',
      description: 'Disable specific dates such as weekends or holidays.',
      code: `// In your component:
selected = signal<Date | undefined>(undefined);

// Disable weekends
isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

// In your template:
<Calendar
  [(selected)]="selected"
  [disabled]="isWeekend"
/>`,
    },
    {
      title: 'Locale-aware formatting',
      description: 'Render the calendar in a different locale.',
      code: `<Calendar
  [(selected)]="selected"
  locale="fr-FR"
/>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Date Picker WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/',
    keyboardInteractions: [
      {
        key: 'ArrowLeft',
        description: 'Moves focus to the previous day. Navigates to the previous month if needed.',
      },
      {
        key: 'ArrowRight',
        description: 'Moves focus to the next day. Navigates to the next month if needed.',
      },
      {
        key: 'ArrowUp',
        description: 'Moves focus to the same day in the previous week.',
      },
      {
        key: 'ArrowDown',
        description: 'Moves focus to the same day in the next week.',
      },
      {
        key: 'Home',
        description: 'Moves focus to the first day of the current month.',
      },
      {
        key: 'End',
        description: 'Moves focus to the last day of the current month.',
      },
      {
        key: 'Enter / Space',
        description: 'Selects the currently focused date.',
      },
      {
        key: 'Tab',
        description: 'Moves focus between the navigation buttons and the calendar grid.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/tree/main/src/app/lib/components/ui/calendar',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA date picker pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/',
      icon: 'docs',
    },
  ],
};
