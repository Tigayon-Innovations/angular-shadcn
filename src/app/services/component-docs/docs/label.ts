/**
 * Label Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const LABEL_DOCUMENTATION: ComponentDocumentation = {
  name: 'Label',
  slug: 'label',
  description:
    'Renders an accessible label associated with a form control. Clicking the label focuses the associated input. Based on Radix UI Label primitive with shadcn/ui styling.',

  features: [
    { text: 'Automatic association with form controls via for/htmlFor.', highlight: true },
    { text: 'Text selection prevention on double-click (Radix behavior).' },
    { text: 'Disabled state styling via peer/group utilities.', highlight: true },
    { text: 'Supports both for and htmlFor (React-style) attribute binding.' },
    { text: 'Full accessibility using the native <label> element.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/label',
      pnpm: 'pnpm add @ng-cn/label',
      yarn: 'yarn add @ng-cn/label',
      bun: 'bun add @ng-cn/label',
    },
    ngAdd: 'ng g @ng-cn/core:c label',
  },

  anatomy: {
    importStatement: `import { Label } from '@/ui/label';`,
    structure: `<Label for="field-id">Label text</Label>`,
  },

  apiReference: [
    {
      name: 'Label',
      description: 'An accessible label element that associates with a form control by id.',
      props: [
        {
          name: 'for',
          type: 'string',
          description: 'The id of the form element this label is associated with. Maps to the native for attribute.',
        },
        {
          name: 'htmlFor',
          type: 'string',
          description: 'Alternative binding for the for attribute (React-style). If both for and htmlFor are provided, for takes precedence.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the inner label element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"label"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'Associate a label with an input using the for prop.',
      code: `<Label for="username">Username</Label>
<input Input id="username" type="text" placeholder="Enter username" />`,
      hasDemo: true,
    },
    {
      title: 'With required indicator',
      description: 'Add a required indicator inside the label content.',
      code: `<Label for="email">
  Email address <span class="text-destructive">*</span>
</Label>
<input Input id="email" type="email" placeholder="you@example.com" />`,
    },
    {
      title: 'Disabled state',
      description: 'Wrap the label and input in a group container with data-disabled to style both as disabled.',
      code: `// In your component class:
isDisabled = signal(true);

// In your template:
<div class="group" [attr.data-disabled]="isDisabled()">
  <Label for="username">Username</Label>
  <input Input id="username" [disabled]="isDisabled()" placeholder="Disabled" />
</div>`,
    },
    {
      title: 'Inside a form field',
      description: 'Label integrates naturally within form field components.',
      code: `<div class="flex flex-col gap-1">
  <Label for="bio">Bio</Label>
  <textarea Textarea id="bio" placeholder="Tell us about yourself..."></textarea>
  <p class="text-sm text-muted-foreground">This will be shown on your public profile.</p>
</div>`,
    },
    {
      title: 'With Switch',
      description: 'Pair a Label with a Switch for toggle settings.',
      code: `<div class="flex items-center gap-2">
  <Switch id="notifications" />
  <Label for="notifications">Enable notifications</Label>
</div>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Label WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/',
    keyboardInteractions: [
      {
        key: 'Click',
        description: 'Clicking the label moves focus to the associated form control.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/label',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'Radix UI Label',
      url: 'https://www.radix-ui.com/primitives/docs/components/label',
      icon: 'docs',
    },
  ],
};
