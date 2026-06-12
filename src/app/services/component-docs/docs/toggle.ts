/**
 * Toggle Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const TOGGLE_DOCUMENTATION: ComponentDocumentation = {
  name: 'Toggle',
  slug: 'toggle',
  description: 'A two-state button that can be either on or off.',

  features: [
    { text: 'Two-state pressed/unpressed behavior.', highlight: true },
    { text: 'Supports default and outline visual variants.' },
    { text: 'Multiple size options (sm, default, lg).' },
    { text: 'Full keyboard support with Space and Enter.', highlight: true },
    { text: 'Angular Forms integration via ControlValueAccessor.' },
    { text: 'Can be controlled or uncontrolled.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/toggle',
      pnpm: 'pnpm add @ng-cn/toggle',
      yarn: 'yarn add @ng-cn/toggle',
      bun: 'bun add @ng-cn/toggle',
    },
    ngAdd: 'ng g @ng-cn/core:c toggle',
  },

  anatomy: {
    importStatement: `import { Toggle } from '@/ui/toggle';`,
    structure: `<Toggle>Bold</Toggle>`,
  },

  apiReference: [
    {
      name: 'Toggle',
      description: 'A two-state button that toggles between pressed and unpressed.',
      props: [
        {
          name: 'pressed',
          type: 'boolean',
          default: 'false',
          description: 'The controlled pressed state of the toggle. Use with [(pressed)] for two-way binding.',
        },
        {
          name: 'defaultPressed',
          type: 'boolean',
          default: 'false',
          description: 'The pressed state when initially rendered. Use when you do not need to control the state.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from interacting with the toggle.',
        },
        {
          name: 'variant',
          type: "'default' | 'outline'",
          default: "'default'",
          description: 'The visual style variant of the toggle.',
        },
        {
          name: 'size',
          type: "'sm' | 'default' | 'lg'",
          default: "'default'",
          description: 'The size of the toggle.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the toggle.',
        },
      ],
      events: [
        {
          name: 'pressedChange',
          type: 'boolean',
          description: 'Emitted when the pressed state changes.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"on" | "off"' },
        { name: '[data-disabled]', values: 'Present when disabled' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple toggle button.',
      code: `<Toggle aria-label="Toggle bold">
  Bold
</Toggle>`,
      hasDemo: true,
    },
    {
      title: 'Controlled',
      description: 'Use [(pressed)] for two-way binding to control the toggle state.',
      code: `// In your component class:
isBold = signal(false);

// In your template:
<Toggle [(pressed)]="isBold" aria-label="Toggle bold">
  Bold
</Toggle>

<p>Bold is {{ isBold() ? 'on' : 'off' }}</p>`,
    },
    {
      title: 'Outline variant',
      description: 'Use the outline variant for a bordered toggle.',
      code: `<Toggle variant="outline" aria-label="Toggle italic">
  Italic
</Toggle>`,
    },
    {
      title: 'Sizes',
      description: 'Toggle is available in three sizes.',
      code: `<div class="flex items-center gap-2">
  <Toggle size="sm" aria-label="Small toggle">Sm</Toggle>
  <Toggle size="default" aria-label="Default toggle">Default</Toggle>
  <Toggle size="lg" aria-label="Large toggle">Lg</Toggle>
</div>`,
    },
    {
      title: 'Disabled',
      description: 'Use the disabled prop to prevent interaction.',
      code: `<Toggle [disabled]="true" aria-label="Disabled toggle">
  Disabled
</Toggle>`,
    },
    {
      title: 'With Angular Forms',
      description: 'The Toggle integrates with Angular reactive forms via ControlValueAccessor.',
      code: `// In your component class:
form = new FormGroup({
  bold: new FormControl(false),
});

// In your template:
<form [formGroup]="form">
  <Toggle formControlName="bold" aria-label="Toggle bold">
    Bold
  </Toggle>
</form>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Toggle Button WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/button',
    keyboardInteractions: [
      {
        key: 'Space',
        description: 'Toggles the pressed state of the button.',
      },
      {
        key: 'Enter',
        description: 'Toggles the pressed state of the button.',
      },
      {
        key: 'Tab',
        description: 'Moves focus to the toggle.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/toggle',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
