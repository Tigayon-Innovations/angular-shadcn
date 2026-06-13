/**
 * Select Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const SELECT_DOCUMENTATION: ComponentDocumentation = {
  name: 'Select',
  slug: 'select',
  description: 'Displays a list of options for the user to pick from—triggered by a button.',

  features: [
    { text: 'Can be controlled or uncontrolled.', highlight: true },
    { text: 'Supports items, labels, and groups of items.' },
    { text: 'Focus is fully managed.', highlight: true },
    { text: 'Full keyboard navigation.' },
    { text: 'Supports Right to Left direction.' },
    { text: 'Typeahead support.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/select',
      pnpm: 'pnpm add @ng-cn/select',
      yarn: 'yarn add @ng-cn/select',
      bun: 'bun add @ng-cn/select',
    },
    ngAdd: 'ng g @ng-cn/core:c select',
  },

  anatomy: {
    importStatement: `import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator
} from '@/ui/select';`,
    structure: `<Select>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel />
      <SelectItem />
    </SelectGroup>
    <SelectSeparator />
  </SelectContent>
</Select>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of a select.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'The controlled value of the select.',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'The value of the select when initially rendered.',
        },
        {
          name: 'open',
          type: 'boolean',
          description: 'The controlled open state of the select.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'The open state of the select when initially rendered.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from interacting with select.',
        },
        {
          name: 'name',
          type: 'string',
          description:
            'The name of the select. Submitted with its owning form as part of a name/value pair.',
        },
        {
          name: 'required',
          type: 'boolean',
          default: 'false',
          description:
            'When true, indicates that the user must select a value before the owning form can be submitted.',
        },
      ],
      events: [
        {
          name: 'valueChange',
          type: 'EventEmitter<string>',
          description: 'Event handler called when the value changes.',
        },
        {
          name: 'openChange',
          type: 'EventEmitter<boolean>',
          description: 'Event handler called when the open state changes.',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'The button that toggles the select.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-disabled]', values: 'Present when disabled' },
        { name: '[data-placeholder]', values: 'Present when placeholder is shown' },
      ],
    },
    {
      name: 'Value',
      description: 'The part that reflects the selected value.',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          description: 'The content that will be rendered when no value or defaultValue is set.',
        },
      ],
    },
    {
      name: 'Content',
      description: 'The component that pops out when the select is open.',
      props: [
        {
          name: 'position',
          type: "'item-aligned' | 'popper'",
          default: "'item-aligned'",
          description:
            'The positioning mode. item-aligned aligns with the selected item, popper positions like a popover.',
        },
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          default: "'bottom'",
          description: 'The preferred side when position is popper.',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '0',
          description: 'The distance in pixels from the trigger.',
        },
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          default: "'start'",
          description: 'The preferred alignment when position is popper.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-side]', values: '"top" | "right" | "bottom" | "left"' },
        { name: '[data-align]', values: '"start" | "center" | "end"' },
      ],
    },
    {
      name: 'Item',
      description: 'The component that contains the select items.',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'The value given as data when submitted with a name.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from selecting the item.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"checked" | "unchecked"' },
        { name: '[data-highlighted]', values: 'Present when highlighted' },
        { name: '[data-disabled]', values: 'Present when disabled' },
      ],
    },
    {
      name: 'Group',
      description: 'Used to group multiple items.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'Label',
      description: 'Used to render the label of a group.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'Separator',
      description: 'Used to visually separate items in the select.',
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
      description: 'A simple select with a few options.',
      code: `<Select>
  <SelectTrigger class="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>`,
      hasDemo: true,
    },
    {
      title: 'With groups',
      description: 'Group related items together.',
      code: `<Select>
  <SelectTrigger class="w-[200px]">
    <SelectValue placeholder="Select a timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
      <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
      <SelectItem value="cet">Central European Time (CET)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
    },
    {
      title: 'Controlled',
      description: 'Control the select state from outside.',
      code: `// In your component:
selectedFruit = signal('');

// In template:
<Select [value]="selectedFruit()" (valueChange)="selectedFruit.set($event)">
  <SelectTrigger class="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>

<p>Selected: {{ selectedFruit() }}</p>`,
    },
    {
      title: 'With form',
      description: 'Use with Angular forms.',
      code: `<form [formGroup]="form">
  <Select name="fruit" formControlName="fruit" [required]="true">
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectContent>
  </Select>
</form>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Listbox WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/',
    keyboardInteractions: [
      {
        key: 'Space',
        description: 'When focus is on trigger, opens/closes the select.',
      },
      {
        key: 'Enter',
        description:
          'When focus is on trigger, opens the select. When focus is on item, selects it.',
      },
      {
        key: 'ArrowDown',
        description:
          'When focus is on trigger, opens the select. When open, moves focus to next item.',
      },
      {
        key: 'ArrowUp',
        description: 'When open, moves focus to previous item.',
      },
      {
        key: 'Home',
        description: 'When open, moves focus to first item.',
      },
      {
        key: 'End',
        description: 'When open, moves focus to last item.',
      },
      {
        key: 'Escape',
        description: 'Closes the select.',
      },
      {
        key: 'A-Z / a-z',
        description: 'When open, moves focus to item starting with typed character.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/tree/main/src/app/lib/components/ui/select',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/',
      icon: 'docs',
    },
  ],
};
