/**
 * NativeSelect Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const NATIVE_SELECT_DOCUMENTATION: ComponentDocumentation = {
  name: 'Native Select',
  slug: 'native-select',
  description: 'A styled wrapper for the browser\'s native HTML select element, providing consistent design while retaining full native functionality.',

  features: [
    { text: 'Uses the native HTML select element for maximum compatibility.', highlight: true },
    { text: 'Custom chevron arrow via CSS background image.' },
    { text: 'Supports sm, default, and lg sizes.' },
    { text: 'Dark mode adaptive arrow icon.', highlight: true },
    { text: 'Fully accessible with native keyboard and screen reader support.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/native-select',
      pnpm: 'pnpm add @ng-cn/native-select',
      yarn: 'yarn add @ng-cn/native-select',
      bun: 'bun add @ng-cn/native-select',
    },
    ngAdd: 'ng g @ng-cn/core:c native-select',
  },

  anatomy: {
    importStatement: `import { NativeSelect } from '@/ui/native-select';`,
    structure: `<select NativeSelect>
  <option value="">Select an option</option>
  <option value="a">Option A</option>
</select>`,
  },

  apiReference: [
    {
      name: 'NativeSelect',
      description: 'Applied as an attribute selector on a native <select> element to style it. Can also be used as a standalone element selector.',
      props: [
        {
          name: 'size',
          type: "'sm' | 'default' | 'lg'",
          default: "'default'",
          description: 'The size of the select element.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the select element.',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'Apply the NativeSelect directive to a native select element.',
      code: `<select NativeSelect>
  <option value="">Select a framework</option>
  <option value="angular">Angular</option>
  <option value="react">React</option>
  <option value="vue">Vue</option>
</select>`,
      hasDemo: true,
    },
    {
      title: 'With label',
      description: 'Pair with a Label component for proper accessibility.',
      code: `<div class="flex flex-col gap-2">
  <Label for="framework">Framework</Label>
  <select NativeSelect id="framework" name="framework">
    <option value="">Select a framework</option>
    <option value="angular">Angular</option>
    <option value="react">React</option>
    <option value="vue">Vue</option>
  </select>
</div>`,
    },
    {
      title: 'Sizes',
      description: 'NativeSelect is available in three sizes.',
      code: `<div class="flex flex-col gap-3">
  <select NativeSelect size="sm">
    <option>Small size</option>
  </select>
  <select NativeSelect size="default">
    <option>Default size</option>
  </select>
  <select NativeSelect size="lg">
    <option>Large size</option>
  </select>
</div>`,
    },
    {
      title: 'Disabled',
      description: 'Use the native disabled attribute to prevent interaction.',
      code: `<select NativeSelect disabled>
  <option value="">Disabled select</option>
  <option value="1">Option 1</option>
</select>`,
    },
    {
      title: 'With Angular Forms',
      description: 'Works directly with Angular reactive and template-driven forms.',
      code: `// In your component class:
form = new FormGroup({
  framework: new FormControl(''),
});

// In your template:
<form [formGroup]="form">
  <select NativeSelect formControlName="framework">
    <option value="">Select a framework</option>
    <option value="angular">Angular</option>
    <option value="react">React</option>
  </select>
</form>`,
    },
  ],

  accessibility: {
    keyboardInteractions: [
      {
        key: 'Space / Enter',
        description: 'Opens the native select dropdown.',
      },
      {
        key: 'ArrowUp / ArrowDown',
        description: 'Navigates between options in the dropdown.',
      },
      {
        key: 'Tab',
        description: 'Moves focus to the select element.',
      },
      {
        key: 'Escape',
        description: 'Closes the dropdown without changing the selection.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/native-select',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
