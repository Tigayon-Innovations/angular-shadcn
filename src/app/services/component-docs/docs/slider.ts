/**
 * Slider Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const SLIDER_DOCUMENTATION: ComponentDocumentation = {
  name: 'Slider',
  slug: 'slider',
  description:
    'An input where the user selects a value from within a given range by dragging a thumb. Supports mouse, touch, and full keyboard interaction.',

  features: [
    { text: 'Mouse and touch drag interaction.', highlight: true },
    { text: 'Full keyboard navigation per WAI-ARIA slider pattern.', highlight: true },
    { text: 'Angular Forms support (ngModel and reactive forms).' },
    { text: 'Horizontal and vertical orientation.' },
    { text: 'Inverted direction support.' },
    { text: 'Configurable min, max, and step.' },
    { text: 'Custom aria-valuetext function for accessibility.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/slider',
      pnpm: 'pnpm add @ng-cn/slider',
      yarn: 'yarn add @ng-cn/slider',
      bun: 'bun add @ng-cn/slider',
    },
    ngAdd: 'ng g @ng-cn/core:c slider',
  },

  anatomy: {
    importStatement: `import { Slider } from '@/ui/slider';`,
    structure: `<Slider />`,
  },

  apiReference: [
    {
      name: 'Slider',
      description:
        'A single-thumb range slider. Implements ControlValueAccessor for Angular Forms integration. The track, range, and thumb are rendered internally.',
      props: [
        {
          name: 'value',
          type: 'number',
          default: '0',
          description:
            'The current slider value. Supports two-way binding with [(value)]. Use with (valueChange) for explicit control.',
        },
        {
          name: 'defaultValue',
          type: 'number',
          default: '0',
          description: 'The default value for uncontrolled mode and as CVA writeValue fallback.',
        },
        {
          name: 'min',
          type: 'number',
          default: '0',
          description: 'The minimum value of the slider.',
        },
        {
          name: 'max',
          type: 'number',
          default: '100',
          description: 'The maximum value of the slider.',
        },
        {
          name: 'step',
          type: 'number',
          default: '1',
          description:
            'The step increment. Arrow keys move by one step; PageUp/PageDown move by 10 steps.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, the slider is non-interactive and visually dimmed.',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description:
            'The layout direction. Vertical sliders grow upward; apply a height class to give them size.',
        },
        {
          name: 'inverted',
          type: 'boolean',
          default: 'false',
          description:
            'When true, the direction is reversed (right-to-left for horizontal, top-to-bottom for vertical).',
        },
        {
          name: 'name',
          type: 'string',
          description:
            'Name for the hidden input element, useful for native form submission.',
        },
        {
          name: 'getAriaValueText',
          type: '((value: number) => string) | undefined',
          default: 'undefined',
          description:
            'A function that returns a human-readable string for the current value, used as aria-valuetext.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the slider root.',
        },
      ],
      events: [
        {
          name: 'valueChange',
          type: 'number',
          description: 'Emitted continuously while the user drags or presses arrow keys.',
        },
        {
          name: 'valueCommit',
          type: 'number',
          description:
            'Emitted once when the user releases the mouse button or lifts their finger, signalling a committed value change.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"slider"' },
        { name: '[data-disabled]', values: 'Present when disabled' },
        { name: '[data-orientation]', values: '"horizontal" | "vertical"' },
      ],
      notes: [
        'The thumb element has role="slider" with aria-valuenow, aria-valuemin, aria-valuemax, and aria-orientation.',
        'For vertical sliders, provide an explicit height class (e.g. class="h-40").',
        'When inverted is true, the percentage calculation is flipped so the thumb starts at the opposite end.',
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple horizontal slider with two-way binding.',
      hasDemo: true,
      code: `// In your component:
volume = signal(50);

// In your template:
<Slider [(value)]="volume" class="w-64" />
<p class="mt-2 text-sm text-muted-foreground">Volume: {{ volume() }}</p>`,
    },
    {
      title: 'Custom range and step',
      description: 'Constrain the slider to a specific range and increment.',
      code: `// In your component:
temperature = signal(20);

// In your template:
<Slider
  [(value)]="temperature"
  [min]="0"
  [max]="40"
  [step]="0.5"
  class="w-64"
/>
<p class="mt-2 text-sm text-muted-foreground">{{ temperature() }}°C</p>`,
    },
    {
      title: 'Reactive forms',
      description: 'Integrate with Angular reactive forms using formControl.',
      code: `// In your component:
form = new FormGroup({
  brightness: new FormControl(75),
});

// In your template:
<form [formGroup]="form" class="flex flex-col gap-4">
  <Slider formControlName="brightness" [min]="0" [max]="100" class="w-64" />
  <p class="text-sm text-muted-foreground">
    Brightness: {{ form.value.brightness }}%
  </p>
</form>`,
    },
    {
      title: 'Vertical orientation',
      description: 'Use orientation="vertical" and provide a height class.',
      code: `// In your component:
level = signal(30);

// In your template:
<div class="flex items-center gap-4">
  <Slider
    [(value)]="level"
    orientation="vertical"
    class="h-40"
  />
  <p class="text-sm text-muted-foreground">Level: {{ level() }}</p>
</div>`,
    },
    {
      title: 'With custom aria-valuetext',
      description: 'Provide a getAriaValueText function for a human-readable accessibility label.',
      code: `// In your component:
price = signal(250);
formatPrice = (value: number): string => \`$\${value.toLocaleString()}\`;

// In your template:
<Slider
  [(value)]="price"
  [min]="0"
  [max]="1000"
  [step]="10"
  [getAriaValueText]="formatPrice"
  class="w-64"
/>
<p class="mt-2 text-sm text-muted-foreground">Max price: {{ formatPrice(price()) }}</p>`,
    },
    {
      title: 'Inverted',
      description: 'Reverse the slider direction with the inverted input.',
      code: `// In your component:
countdown = signal(80);

// In your template:
<Slider
  [(value)]="countdown"
  [inverted]="true"
  class="w-64"
/>
<p class="mt-2 text-sm text-muted-foreground">Remaining: {{ countdown() }}%</p>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Slider WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider',
    keyboardInteractions: [
      {
        key: 'ArrowRight',
        description: 'Increases value by one step (horizontal orientation).',
      },
      {
        key: 'ArrowLeft',
        description: 'Decreases value by one step (horizontal orientation).',
      },
      {
        key: 'ArrowUp',
        description: 'Increases value by one step (respects inverted flag).',
      },
      {
        key: 'ArrowDown',
        description: 'Decreases value by one step (respects inverted flag).',
      },
      {
        key: 'PageUp',
        description: 'Increases value by 10 steps (large step).',
      },
      {
        key: 'PageDown',
        description: 'Decreases value by 10 steps (large step).',
      },
      {
        key: 'Home',
        description: 'Sets value to the minimum.',
      },
      {
        key: 'End',
        description: 'Sets value to the maximum.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/slider',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider',
      icon: 'docs',
    },
  ],
};
