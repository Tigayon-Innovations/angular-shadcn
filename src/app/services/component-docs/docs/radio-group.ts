/**
 * RadioGroup Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const RADIO_GROUP_DOCUMENTATION: ComponentDocumentation = {
  name: 'Radio Group',
  slug: 'radio-group',
  description:
    'A set of checkable buttons where only one can be checked at a time. Implements roving tabindex and arrow-key navigation per the WAI-ARIA radiogroup pattern.',

  features: [
    { text: 'Single selection from multiple radio items.', highlight: true },
    { text: 'Full keyboard navigation with arrow keys.', highlight: true },
    { text: 'Roving tabindex for efficient focus management.' },
    { text: 'Angular Forms support (ngModel and reactive forms).' },
    { text: 'Horizontal or vertical orientation.' },
    { text: 'Individual items can be disabled.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/radio-group',
      pnpm: 'pnpm add @ng-cn/radio-group',
      yarn: 'yarn add @ng-cn/radio-group',
      bun: 'bun add @ng-cn/radio-group',
    },
    ngAdd: 'ng g @ng-cn/core:c radio-group',
  },

  anatomy: {
    importStatement: `import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';`,
    structure: `<RadioGroup>
  <RadioGroupItem value="..." />
</RadioGroup>`,
  },

  apiReference: [
    {
      name: 'Root',
      description:
        'Container for all radio items. Provides context for selection and keyboard navigation. Implements ControlValueAccessor for Angular Forms integration.',
      props: [
        {
          name: 'value',
          type: 'string',
          default: "''",
          description:
            'The currently selected value. Supports two-way binding with [(value)]. Use with (valueChange) for explicit control.',
        },
        {
          name: 'defaultValue',
          type: 'string',
          default: "''",
          description:
            'The default selected value for uncontrolled mode. Used as fallback in writeValue when no value is provided.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, all radio items in the group are non-interactive.',
        },
        {
          name: 'required',
          type: 'boolean',
          default: 'false',
          description: 'When true, sets aria-required on the group.',
        },
        {
          name: 'orientation',
          type: "'vertical' | 'horizontal'",
          default: "'vertical'",
          description:
            'Controls the direction of arrow-key navigation. Vertical uses ArrowUp/ArrowDown; horizontal uses ArrowLeft/ArrowRight.',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'true',
          description:
            'When true, focus wraps from the last item to the first (and vice versa) during keyboard navigation.',
        },
        {
          name: 'name',
          type: 'string',
          description:
            'The name attribute applied to the hidden radio inputs. Auto-generated if not provided.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the group.',
        },
      ],
      events: [
        {
          name: 'valueChange',
          type: 'string',
          description: 'Emitted when the selected value changes.',
        },
      ],
      dataAttributes: [
        { name: 'role', values: '"radiogroup"' },
        { name: '[aria-orientation]', values: '"vertical" | "horizontal"' },
        { name: '[data-disabled]', values: 'Present when disabled' },
        { name: '[data-slot]', values: '"radio-group"' },
      ],
    },
    {
      name: 'Item',
      description:
        'An individual radio button. Registers itself with the parent RadioGroup context and responds to keyboard navigation. Uses roving tabindex — only the selected item (or the first item when none selected) is in the tab order.',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'The unique value for this radio option.',
        },
        {
          name: 'id',
          type: 'string',
          description:
            'The id applied to the button element. Used to associate a Label with this item via the for attribute.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description:
            'When true, this individual item cannot be selected. Inherits disabled state from parent group.',
        },
        {
          name: 'required',
          type: 'boolean | undefined',
          default: 'undefined',
          description:
            'Whether this item is required. When undefined, inherits the required state from the parent group.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the item wrapper.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"checked" | "unchecked"' },
        { name: '[data-disabled]', values: 'Present when disabled' },
        { name: '[data-value]', values: 'The item value string' },
        { name: '[data-slot]', values: '"radio-group-item"' },
        { name: 'role', values: '"radio"' },
        { name: '[aria-checked]', values: 'true | false' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A vertical radio group with labels.',
      hasDemo: true,
      code: `// In your component:
selected = signal('comfortable');

// In your template:
<RadioGroup [(value)]="selected" class="flex flex-col gap-3">
  <div class="flex items-center gap-2">
    <RadioGroupItem value="default" id="r-default" />
    <Label for="r-default">Default</Label>
  </div>
  <div class="flex items-center gap-2">
    <RadioGroupItem value="comfortable" id="r-comfortable" />
    <Label for="r-comfortable">Comfortable</Label>
  </div>
  <div class="flex items-center gap-2">
    <RadioGroupItem value="compact" id="r-compact" />
    <Label for="r-compact">Compact</Label>
  </div>
</RadioGroup>

<p class="mt-4 text-sm text-muted-foreground">Selected: {{ selected() }}</p>`,
    },
    {
      title: 'Horizontal orientation',
      description: 'Set orientation="horizontal" to use ArrowLeft/ArrowRight for navigation.',
      code: `<RadioGroup orientation="horizontal" [(value)]="size" class="flex gap-6">
  <div class="flex items-center gap-2">
    <RadioGroupItem value="sm" id="size-sm" />
    <Label for="size-sm">Small</Label>
  </div>
  <div class="flex items-center gap-2">
    <RadioGroupItem value="md" id="size-md" />
    <Label for="size-md">Medium</Label>
  </div>
  <div class="flex items-center gap-2">
    <RadioGroupItem value="lg" id="size-lg" />
    <Label for="size-lg">Large</Label>
  </div>
</RadioGroup>`,
    },
    {
      title: 'Reactive forms',
      description: 'Use formControl or formControlName for reactive forms.',
      code: `// In your component:
form = new FormGroup({
  plan: new FormControl('pro'),
});

// In your template:
<form [formGroup]="form" class="flex flex-col gap-2">
  <RadioGroup formControlName="plan">
    <div class="flex items-center gap-2">
      <RadioGroupItem value="free" id="plan-free" />
      <Label for="plan-free">Free</Label>
    </div>
    <div class="flex items-center gap-2">
      <RadioGroupItem value="pro" id="plan-pro" />
      <Label for="plan-pro">Pro</Label>
    </div>
    <div class="flex items-center gap-2">
      <RadioGroupItem value="enterprise" id="plan-enterprise" />
      <Label for="plan-enterprise">Enterprise</Label>
    </div>
  </RadioGroup>
  <p class="text-sm text-muted-foreground">Selected: {{ form.value.plan }}</p>
</form>`,
    },
    {
      title: 'Disabled items',
      description: 'Disable individual items or the entire group.',
      code: `<!-- Single disabled item -->
<RadioGroup [(value)]="selected">
  <div class="flex items-center gap-2">
    <RadioGroupItem value="available" id="opt-a" />
    <Label for="opt-a">Available</Label>
  </div>
  <div class="flex items-center gap-2">
    <RadioGroupItem value="unavailable" id="opt-b" [disabled]="true" />
    <Label for="opt-b" class="opacity-50">Unavailable (disabled)</Label>
  </div>
</RadioGroup>

<!-- Entire group disabled -->
<RadioGroup [disabled]="true" value="option1">
  <div class="flex items-center gap-2">
    <RadioGroupItem value="option1" id="d-opt-1" />
    <Label for="d-opt-1">Option 1</Label>
  </div>
  <div class="flex items-center gap-2">
    <RadioGroupItem value="option2" id="d-opt-2" />
    <Label for="d-opt-2">Option 2</Label>
  </div>
</RadioGroup>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Radio Group WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/radio',
    keyboardInteractions: [
      {
        key: 'Tab',
        description:
          'Moves focus into the radio group. Only the selected item (or first item if none selected) receives focus.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus out of the radio group.',
      },
      {
        key: 'ArrowDown',
        description:
          'Moves focus to and selects the next radio item. Wraps to the first item when loop is true.',
      },
      {
        key: 'ArrowUp',
        description:
          'Moves focus to and selects the previous radio item. Wraps to the last item when loop is true.',
      },
      {
        key: 'ArrowRight',
        description: 'Moves focus and selects the next item when orientation is "horizontal".',
      },
      {
        key: 'ArrowLeft',
        description: 'Moves focus and selects the previous item when orientation is "horizontal".',
      },
      {
        key: 'Home',
        description: 'Moves focus to and selects the first radio item.',
      },
      {
        key: 'End',
        description: 'Moves focus to and selects the last radio item.',
      },
      {
        key: 'Space',
        description: 'Selects the focused radio item if it is not already selected.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/radio-group',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/radio',
      icon: 'docs',
    },
  ],
};
