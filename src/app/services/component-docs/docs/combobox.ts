/**
 * Combobox Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const COMBOBOX_DOCUMENTATION: ComponentDocumentation = {
  name: 'Combobox',
  slug: 'combobox',
  description:
    'Autocomplete input and command palette with a list of suggestions. Supports fuzzy search, keyboard navigation, and icon placement.',

  features: [
    { text: 'Full keyboard navigation.', highlight: true },
    { text: 'Fuzzy and substring search filtering.' },
    { text: 'Supports icons on left or right of items.', highlight: true },
    { text: 'Can be controlled or uncontrolled.' },
    { text: 'Supports disabled options.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/combobox',
      pnpm: 'pnpm add @ng-cn/combobox',
      yarn: 'yarn add @ng-cn/combobox',
      bun: 'bun add @ng-cn/combobox',
    },
    ngAdd: 'ng g @ng-cn/core:c combobox',
  },

  anatomy: {
    importStatement: `import {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxList,
} from '@/ui/combobox';`,
    structure: `<Combobox>
  <ComboboxTrigger>
    <ComboboxValue />
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxInput />
    <ComboboxEmpty />
    <ComboboxGroup>
      <ComboboxItem />
    </ComboboxGroup>
  </ComboboxContent>
</Combobox>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of a combobox. Provides context to child components.',
      props: [
        {
          name: 'options',
          type: 'ComboboxOption[]',
          default: '[]',
          description:
            'Array of options to display. Each option has value, label, optional disabled flag, and optional icon.',
        },
        {
          name: 'value',
          type: 'string',
          default: "''",
          description: 'The controlled selected value. Use with (valueChange) for two-way binding.',
        },
        {
          name: 'iconPosition',
          type: "'left' | 'right'",
          default: "'left'",
          description: 'Position of the option icon relative to the label text.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the combobox root.',
        },
      ],
      events: [
        {
          name: 'valueChange',
          type: 'string',
          description: 'Emitted when the selected value changes.',
        },
        {
          name: 'openChange',
          type: 'boolean',
          description: 'Emitted when the dropdown open state changes.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"combobox"' },
      ],
    },
    {
      name: 'Trigger',
      description:
        'Button that opens and closes the combobox dropdown. Implements WAI-ARIA combobox trigger pattern.',
      props: [
        {
          name: 'showIcon',
          type: 'boolean',
          default: 'false',
          description: 'When true, renders a ChevronDown icon on the right side of the trigger.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the trigger.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"combobox-trigger"' },
        { name: 'role', values: '"combobox"' },
        { name: '[aria-expanded]', values: 'true | false' },
        { name: '[aria-haspopup]', values: '"listbox"' },
      ],
    },
    {
      name: 'Value',
      description: 'Displays the label of the selected option, or a placeholder when nothing is selected.',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          default: "'Select...'",
          description: 'Text shown when no option is selected.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the value display.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"combobox-value"' },
      ],
    },
    {
      name: 'Content',
      description:
        'Container for the dropdown panel. Closes when clicking outside. Animates open and closed.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the dropdown panel.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"combobox-content"' },
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: 'role', values: '"listbox"' },
      ],
    },
    {
      name: 'Input',
      description:
        'Search input that filters the visible options. Auto-focuses when the dropdown opens.',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          default: "'Search...'",
          description: 'Placeholder text for the search input.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the input wrapper.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"combobox-input"' },
      ],
    },
    {
      name: 'Empty',
      description: 'Rendered when no options match the current search term.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"combobox-empty"' },
      ],
    },
    {
      name: 'Group',
      description: 'Groups a set of ComboboxItems with an optional accessible label.',
      props: [
        {
          name: 'label',
          type: 'string',
          description: 'Accessible label for the group, applied as aria-label.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the group.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"combobox-group"' },
        { name: 'role', values: '"group"' },
      ],
    },
    {
      name: 'Item',
      description:
        'Individual option in the dropdown list. Shows a checkmark when selected and highlights on keyboard focus.',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'The value of this option. Must match a value in the parent options array.',
        },
        {
          name: 'index',
          type: 'number',
          default: '0',
          description: 'Index of this item in the filtered list, used for keyboard navigation.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, this option cannot be selected.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"combobox-item"' },
        { name: 'role', values: '"option"' },
        { name: '[data-selected]', values: 'Present when selected' },
        { name: '[data-highlighted]', values: 'Present when keyboard-highlighted' },
        { name: '[data-disabled]', values: 'Present when disabled' },
      ],
    },
    {
      name: 'List',
      description:
        'Convenience component that automatically renders all filtered options from context. Use instead of manually iterating options.',
      props: [],
      dataAttributes: [
        { name: '[data-slot]', values: '"combobox-list"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A combobox with a list of framework options using ComboboxList for automatic rendering.',
      hasDemo: true,
      code: `// In your component:
options: ComboboxOption[] = [
  { value: 'angular', label: 'Angular' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
];
selected = signal('');

// In your template:
<Combobox [options]="options" [value]="selected()" (valueChange)="selected.set($event)" class="w-64">
  <ComboboxTrigger [showIcon]="true">
    <ComboboxValue placeholder="Select a framework..." />
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxInput placeholder="Search frameworks..." />
    <ComboboxEmpty>No framework found.</ComboboxEmpty>
    <ComboboxGroup>
      <ComboboxList />
    </ComboboxGroup>
  </ComboboxContent>
</Combobox>`,
    },
    {
      title: 'Custom item rendering',
      description: 'Manually render items using @for to control layout and pass the correct index.',
      code: `// In your component:
options: ComboboxOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
];
selected = signal('');

// Expose filtered options from the combobox ref
// (use template reference variable)

// In your template:
<Combobox
  #combo
  [options]="options"
  [value]="selected()"
  (valueChange)="selected.set($event)"
  class="w-64"
>
  <ComboboxTrigger [showIcon]="true">
    <ComboboxValue placeholder="Select country..." />
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxInput placeholder="Search..." />
    <ComboboxEmpty>No country found.</ComboboxEmpty>
    <ComboboxGroup>
      @for (option of combo.filteredOptions(); track option.value; let i = $index) {
        <ComboboxItem [value]="option.value" [index]="i">
          {{ option.label }}
        </ComboboxItem>
      }
    </ComboboxGroup>
  </ComboboxContent>
</Combobox>`,
    },
    {
      title: 'With icons',
      description: 'Options can include Lucide icons displayed on the left or right.',
      code: `import { Home, Settings, User } from 'lucide-angular';

// In your component:
options: ComboboxOption[] = [
  { value: 'home',     label: 'Home',     icon: Home     },
  { value: 'profile',  label: 'Profile',  icon: User     },
  { value: 'settings', label: 'Settings', icon: Settings },
];
selected = signal('');

// In your template:
<Combobox
  [options]="options"
  [value]="selected()"
  (valueChange)="selected.set($event)"
  iconPosition="left"
  class="w-64"
>
  <ComboboxTrigger [showIcon]="true">
    <ComboboxValue placeholder="Navigate to..." />
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxInput placeholder="Search pages..." />
    <ComboboxEmpty>No page found.</ComboboxEmpty>
    <ComboboxGroup>
      <ComboboxList />
    </ComboboxGroup>
  </ComboboxContent>
</Combobox>`,
    },
    {
      title: 'With disabled options',
      description: 'Individual options can be disabled so they are visible but not selectable.',
      code: `options: ComboboxOption[] = [
  { value: 'free',       label: 'Free plan' },
  { value: 'pro',        label: 'Pro plan' },
  { value: 'enterprise', label: 'Enterprise (contact sales)', disabled: true },
];
selected = signal('');

<Combobox [options]="options" [value]="selected()" (valueChange)="selected.set($event)" class="w-72">
  <ComboboxTrigger [showIcon]="true">
    <ComboboxValue placeholder="Select plan..." />
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxInput placeholder="Search plans..." />
    <ComboboxEmpty>No plan found.</ComboboxEmpty>
    <ComboboxGroup>
      <ComboboxList />
    </ComboboxGroup>
  </ComboboxContent>
</Combobox>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Combobox WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox',
    keyboardInteractions: [
      {
        key: 'ArrowDown',
        description:
          'Opens the dropdown if closed, or moves highlight to the next option.',
      },
      {
        key: 'ArrowUp',
        description:
          'Opens the dropdown if closed, or moves highlight to the previous option.',
      },
      {
        key: 'Enter',
        description: 'Selects the currently highlighted option.',
      },
      {
        key: 'Escape',
        description: 'Closes the dropdown without changing the selection.',
      },
      {
        key: 'Home',
        description: 'Moves highlight to the first option.',
      },
      {
        key: 'End',
        description: 'Moves highlight to the last option.',
      },
      {
        key: 'Tab',
        description: 'Closes the dropdown and moves focus to the next focusable element.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/combobox',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox',
      icon: 'docs',
    },
  ],
};
