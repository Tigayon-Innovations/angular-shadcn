/**
 * Progress Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const PROGRESS_DOCUMENTATION: ComponentDocumentation = {
  name: 'Progress',
  slug: 'progress',
  description: 'Displays an indicator showing the completion progress of a task.',

  features: [
    { text: 'Determinate mode with a value from 0 to max.', highlight: true },
    { text: 'Indeterminate mode with a pulsing animation when value is null.', highlight: true },
    { text: 'Complete state when value reaches max.' },
    { text: 'Full ARIA progressbar role implementation.' },
    { text: 'Customizable indicator and container styling.' },
    { text: 'Supports custom accessible value-text labels.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/progress',
      pnpm: 'pnpm add @ng-cn/progress',
      yarn: 'yarn add @ng-cn/progress',
      bun: 'bun add @ng-cn/progress',
    },
    ngAdd: 'ng g @ng-cn/core:c progress',
  },

  anatomy: {
    importStatement: `import { Progress } from '@/ui/progress';`,
    structure: `<Progress [value]="50" />`,
  },

  apiReference: [
    {
      name: 'Progress',
      description:
        'The progress bar component. Renders a track and a sliding indicator. Implements the ARIA progressbar role.',
      props: [
        {
          name: 'value',
          type: 'number | null',
          default: 'null',
          description:
            'The current progress value between 0 and max. Pass null to show the indeterminate loading state.',
        },
        {
          name: 'max',
          type: 'number',
          default: '100',
          description: 'The maximum progress value.',
        },
        {
          name: 'ariaLabel',
          type: 'string',
          default: "'Progress'",
          description: 'Accessible label for the progress bar.',
        },
        {
          name: 'ariaValueText',
          type: 'string | undefined',
          description:
            'Human-readable text description of current progress (e.g., "Step 3 of 10"). Overrides the default computed label.',
        },
        {
          name: 'getValueLabel',
          type: '((value: number, max: number) => string) | undefined',
          description:
            'Function to compute the aria-valuetext string from the current value and max.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the progress track.',
        },
        {
          name: 'indicatorClass',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the progress indicator.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"progress"' },
        { name: '[data-state]', values: '"indeterminate" | "loading" | "complete"' },
        { name: '[data-value]', values: 'Current numeric value' },
        { name: '[data-max]', values: 'Maximum numeric value' },
        { name: 'role', values: '"progressbar"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A determinate progress bar at 60%.',
      code: `<Progress [value]="60" />`,
      hasDemo: true,
    },
    {
      title: 'Indeterminate',
      description:
        'When value is null (the default) the bar displays an indeterminate pulsing animation.',
      code: `<!-- Indeterminate (default) -->
<Progress />

<!-- Or explicitly null -->
<Progress [value]="null" />`,
    },
    {
      title: 'Custom max',
      description: 'Use the max prop to represent progress over a non-100 scale.',
      code: `<!-- 3 out of 10 steps complete -->
<Progress [value]="3" [max]="10" />`,
    },
    {
      title: 'Accessible label',
      description: 'Provide a meaningful ariaLabel and ariaValueText for screen readers.',
      code: `<Progress
  [value]="66"
  ariaLabel="Uploading file"
  ariaValueText="66% uploaded"
/>`,
    },
    {
      title: 'Dynamic value from a signal',
      description: 'Bind to a reactive signal to animate progress as work completes.',
      code: `// In your component class:
progress = signal(0);

startUpload() {
  const interval = setInterval(() => {
    this.progress.update(v => {
      if (v >= 100) { clearInterval(interval); return 100; }
      return v + 10;
    });
  }, 300);
}

// In your template:
<Progress [value]="progress()" />
<Button (click)="startUpload()">Start Upload</Button>`,
    },
    {
      title: 'Custom styling',
      description: 'Override the track height and indicator colour via class and indicatorClass.',
      code: `<Progress
  [value]="75"
  class="h-4 rounded-full"
  indicatorClass="bg-emerald-500"
/>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Progressbar WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/meter',
    keyboardInteractions: [],
    ariaAttributes: [
      {
        name: 'role="progressbar"',
        description: 'Identifies the element as a progress indicator.',
      },
      {
        name: 'aria-valuenow',
        description: 'The current numeric value. Omitted in indeterminate state.',
      },
      {
        name: 'aria-valuemin',
        description: 'Always 0.',
      },
      {
        name: 'aria-valuemax',
        description: 'The maximum value (defaults to 100).',
      },
      {
        name: 'aria-valuetext',
        description: 'Human-readable progress description. Defaults to "X% complete" or "Loading".',
      },
      {
        name: 'aria-label',
        description: 'The accessible name of the progress bar.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/progress',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'Radix UI Progress',
      url: 'https://www.radix-ui.com/primitives/docs/components/progress',
      icon: 'docs',
    },
  ],
};
