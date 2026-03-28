/**
 * Checkbox Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const CHECKBOX_DOCUMENTATION: ComponentDocumentation = {
  name: 'Checkbox',
  slug: 'checkbox',
  description: 'A control that allows the user to toggle between checked and not checked.',

  features: [
    { text: 'Supports indeterminate state.', highlight: true },
    { text: 'Full keyboard navigation.' },
    { text: 'Can be controlled or uncontrolled.', highlight: true },
    { text: 'Works with Angular Forms (ControlValueAccessor).' },
    { text: 'Accessible by default (WAI-ARIA).' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/checkbox',
      pnpm: 'pnpm add @ng-cn/checkbox',
      yarn: 'yarn add @ng-cn/checkbox',
      bun: 'bun add @ng-cn/checkbox',
    },
    ngAdd: 'ng g @ng-cn/core:c checkbox',
  },

  anatomy: {
    importStatement: `import { Checkbox } from '@/ui/checkbox';`,
    structure: `<Checkbox id="terms" />`,
  },

  apiReference: [
    {
      name: 'Checkbox',
      description:
        'The main checkbox component. Implements ControlValueAccessor for Angular Forms.',
      props: [
        {
          name: 'id',
          type: 'string',
          description: 'The id attribute for the checkbox input - used for label association.',
        },
        {
          name: 'checked',
          type: 'boolean | "indeterminate"',
          default: 'false',
          description:
            'The controlled state of the checkbox. Use with two-way binding: [(checked)]="value".',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from interacting with the checkbox.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the checkbox.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-state]',
          values: '"checked" | "unchecked" | "indeterminate"',
        },
        {
          name: '[data-disabled]',
          values: 'Present when disabled',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple checkbox with default styling.',
      code: `<div class="flex items-center gap-2">
  <Checkbox id="terms" />
  <label for="terms" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    Accept terms and conditions
  </label>
</div>`,
      hasDemo: true,
    },
    {
      title: 'Checked',
      description: 'A checked checkbox with default styling.',
      code: `<div class="flex items-center gap-2">
  <Checkbox id="checked" [checked]="true" />
  <label for="checked" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    Terms accepted
  </label>
</div>`,
    },
    {
      title: 'Disabled',
      description: 'A disabled checkbox with reduced opacity.',
      code: `<div class="flex items-center gap-2">
  <Checkbox id="disabled" disabled />
  <label for="disabled" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    Disabled checkbox
  </label>
</div>`,
    },
    {
      title: 'With two-way binding',
      description: 'Use two-way binding to control the checkbox state.',
      code: `<!-- In your component class -->
isAgreed = signal(false);

<!-- In your template -->
<div class="flex items-center gap-2">
  <Checkbox id="agree" [(checked)]="isAgreed" />
  <label for="agree" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    I agree to the terms
  </label>
</div>

<Button [disabled]="!isAgreed()" (click)="submit()">
  Submit
</Button>`,
    },
    {
      title: 'With Reactive Forms',
      description: 'Use the checkbox with Angular Reactive Forms.',
      code: `<!-- In your component class -->
form = this.fb.group({
  terms: [false, Validators.requiredTrue],
  newsletter: [false],
});

constructor(private fb: FormBuilder) {}

<!-- In your template -->
<form [formGroup]="form">
  <div class="flex items-center gap-2">
    <Checkbox id="terms" formControlName="terms" />
    <label for="terms" class="text-sm font-medium leading-none">
      I accept the terms and conditions
    </label>
  </div>

  <div class="flex items-center gap-2 mt-4">
    <Checkbox id="newsletter" formControlName="newsletter" />
    <label for="newsletter" class="text-sm font-medium leading-none">
      Subscribe to our newsletter
    </label>
  </div>

  <Button
    type="submit"
    [disabled]="form.invalid"
    class="mt-4"
  >
    Submit
  </Button>
</form>`,
    },
    {
      title: 'Indeterminate state',
      description:
        'A checkbox with an indeterminate state - useful for parent checkboxes in a list.',
      code: `<!-- In your component class -->
selectAll = signal<boolean | 'indeterminate'>('indeterminate');
items = signal([
  { id: 1, label: 'Item 1', checked: false },
  { id: 2, label: 'Item 2', checked: true },
  { id: 3, label: 'Item 3', checked: false },
]);

toggleSelectAll() {
  const newState = this.selectAll() === true ? false : true;
  this.items.update(items =>
    items.map(item => ({ ...item, checked: newState }))
  );
  this.selectAll.set(newState);
}

toggleItem(id: number) {
  this.items.update(items =>
    items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    )
  );

  const checkedCount = this.items().filter(i => i.checked).length;
  const total = this.items().length;

  if (checkedCount === 0) {
    this.selectAll.set(false);
  } else if (checkedCount === total) {
    this.selectAll.set(true);
  } else {
    this.selectAll.set('indeterminate');
  }
}

<!-- In your template -->
<div class="space-y-4">
  <div class="flex items-center gap-2 p-4 border rounded-lg">
    <Checkbox
      id="select-all"
      [checked]="selectAll()"
      (click)="toggleSelectAll()"
    />
    <label for="select-all" class="text-sm font-medium">
      Select all items
    </label>
  </div>

  <div class="space-y-2 pl-4">
    @for (item of items(); track item.id) {
      <div class="flex items-center gap-2">
        <Checkbox
          [id]="'item-' + item.id"
          [checked]="item.checked"
          (click)="toggleItem(item.id)"
        />
        <label [for]="'item-' + item.id" class="text-sm">
          {{ item.label }}
        </label>
      </div>
    }
  </div>
</div>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Checkbox WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/checkbox',
    keyboardInteractions: [
      {
        key: 'Space',
        description: 'When focus is on the checkbox, toggles between checked and unchecked.',
      },
      {
        key: 'Tab',
        description: 'Moves focus to the next focusable element.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus to the previous focusable element.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/checkbox',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/checkbox',
      icon: 'docs',
    },
  ],
};
