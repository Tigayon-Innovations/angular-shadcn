/**
 * Direction Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const DIRECTION_DOCUMENTATION: ComponentDocumentation = {
  name: 'Direction',
  slug: 'direction',
  description:
    'A context provider that sets the text direction (LTR or RTL) for all descendant components. Equivalent to Radix UI\'s DirectionProvider.',

  features: [
    { text: 'Sets dir="ltr" or dir="rtl" on the host element for CSS and browser layout.', highlight: true },
    { text: 'Propagates direction context via Angular DI to nested components.', highlight: true },
    { text: 'Signals-based — reactive direction changes propagate instantly.' },
    { text: 'display: contents — no extra DOM wrapper affects layout.' },
    { text: 'Compatible with any component that reads DIRECTION_CONTEXT.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/direction',
      pnpm: 'pnpm add @ng-cn/direction',
      yarn: 'yarn add @ng-cn/direction',
      bun: 'bun add @ng-cn/direction',
    },
    ngAdd: 'ng g @ng-cn/core:c direction',
  },

  anatomy: {
    importStatement: `import { Direction } from '@/ui/direction';`,
    structure: `<Direction dir="rtl">
  <!-- All descendant components receive RTL context -->
</Direction>`,
  },

  apiReference: [
    {
      name: 'Direction',
      description: 'Wraps content and provides a direction context token to all descendants. Renders as display: contents — it does not affect the visual layout.',
      props: [
        {
          name: 'dir',
          type: "'ltr' | 'rtl'",
          default: "'ltr'",
          description: 'The text direction to apply. Sets the HTML dir attribute and injects DIRECTION_CONTEXT for components to consume.',
          required: false,
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"direction"' },
        { name: '[dir]', values: '"ltr" | "rtl"', description: 'Reflects the active text direction for CSS selectors.' },
      ],
    },
  ],

  examples: [
    {
      title: 'RTL layout',
      description: 'Wrap a section of your UI in Direction to switch it to right-to-left layout.',
      code: `<Direction dir="rtl">
  <div class="flex items-center gap-3 p-4 border rounded-lg">
    <Input placeholder="ادخل اسمك هنا" class="flex-1" />
    <Button>إرسال</Button>
  </div>
</Direction>`,
    },
    {
      title: 'Reactive direction',
      description: 'Bind dir to a signal for dynamic direction switching.',
      code: `// component.ts
protected readonly dir = signal<'ltr' | 'rtl'>('ltr');
protected toggle() { this.dir.update(d => d === 'ltr' ? 'rtl' : 'ltr'); }

// template
<Button (click)="toggle()">Toggle RTL</Button>
<Direction [dir]="dir()">
  <div class="space-y-2 mt-4">
    <Input placeholder="Type here..." />
    <Select>
      <option>Option A</option>
      <option>Option B</option>
    </Select>
  </div>
</Direction>`,
    },
    {
      title: 'Global direction',
      description: 'Set direction for your entire app by placing Direction at the root.',
      code: `<!-- app.component.html -->
<Direction [dir]="appDir()">
  <router-outlet />
  <Sonner />
</Direction>`,
    },
  ],

  accessibility: {
    keyboardInteractions: [],
    ariaAttributes: [
      {
        name: 'dir="ltr" | dir="rtl"',
        description: 'Applied to the host element. Browsers and assistive technologies use this to determine reading order and layout direction.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/direction',
      icon: 'source',
    },
    {
      text: 'HTML dir attribute',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir',
      icon: 'docs',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
