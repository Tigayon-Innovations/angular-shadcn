/**
 * Separator Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const SEPARATOR_DOCUMENTATION: ComponentDocumentation = {
  name: 'Separator',
  slug: 'separator',
  description:
    'Visually or semantically separates content with a horizontal or vertical line.',

  features: [
    { text: 'Horizontal and vertical orientations.', highlight: true },
    { text: 'Decorative mode hides the separator from assistive technology.' },
    { text: 'Semantic role="separator" for meaningful dividers.', highlight: true },
    { text: 'Correct aria-orientation attribute applied automatically.' },
    { text: 'Fully customizable with additional CSS classes.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/separator',
      pnpm: 'pnpm add @ng-cn/separator',
      yarn: 'yarn add @ng-cn/separator',
      bun: 'bun add @ng-cn/separator',
    },
    ngAdd: 'ng g @ng-cn/core:c separator',
  },

  anatomy: {
    importStatement: `import { Separator } from '@/ui/separator';`,
    structure: `<Separator />`,
  },

  apiReference: [
    {
      name: 'Separator',
      description:
        'A thin line that separates content. Renders as a block element. Uses role="separator" unless decorative.',
      props: [
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description:
            'The orientation of the separator. A horizontal separator spans the full width; a vertical separator spans the full height.',
        },
        {
          name: 'decorative',
          type: 'boolean',
          default: 'false',
          description:
            'When true, the separator is purely visual and is hidden from assistive technology (role="none"). When false, role="separator" is applied.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the separator element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"separator"' },
        { name: '[data-orientation]', values: '"horizontal" | "vertical"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Horizontal',
      description: 'A full-width horizontal separator between sections of content.',
      code: `<div class="space-y-4">
  <div>
    <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
    <p class="text-muted-foreground text-sm">An open-source UI component library.</p>
  </div>
  <Separator />
  <div class="flex h-5 items-center space-x-4 text-sm">
    <span>Blog</span>
    <Separator orientation="vertical" />
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Source</span>
  </div>
</div>`,
      hasDemo: true,
    },
    {
      title: 'Vertical',
      description: 'A vertical separator used to divide inline items.',
      code: `<div class="flex h-5 items-center gap-4 text-sm">
  <span>Home</span>
  <Separator orientation="vertical" />
  <span>About</span>
  <Separator orientation="vertical" />
  <span>Contact</span>
</div>`,
    },
    {
      title: 'Decorative',
      description: 'A purely visual separator that is hidden from screen readers.',
      code: `<div class="space-y-6">
  <section>
    <h3 class="text-lg font-medium">Section One</h3>
    <p class="text-muted-foreground text-sm mt-1">Content for the first section.</p>
  </section>
  <Separator [decorative]="true" />
  <section>
    <h3 class="text-lg font-medium">Section Two</h3>
    <p class="text-muted-foreground text-sm mt-1">Content for the second section.</p>
  </section>
</div>`,
    },
    {
      title: 'Custom styled',
      description: 'Apply custom color or thickness via the class prop.',
      code: `<div class="space-y-4">
  <p class="text-sm">Content above</p>
  <Separator class="bg-primary/40 h-0.5" />
  <p class="text-sm">Content below</p>
</div>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Separator WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/separator',
    keyboardInteractions: [],
    ariaAttributes: [
      {
        name: 'role="separator"',
        description: 'Applied when decorative is false, indicating a semantic divider to screen readers.',
      },
      {
        name: 'role="none"',
        description: 'Applied when decorative is true, hiding the element from assistive technology.',
      },
      {
        name: 'aria-orientation',
        description: 'Set to "vertical" when orientation is vertical. Horizontal is the ARIA default and is omitted.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/separator',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/separator',
      icon: 'docs',
    },
  ],
};
