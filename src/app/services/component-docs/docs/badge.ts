/**
 * Badge Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const BADGE_DOCUMENTATION: ComponentDocumentation = {
  name: 'Badge',
  slug: 'badge',
  description:
    'Displays a small status descriptor or label. Useful for highlighting states, counts, or categories. Supports multiple visual variants.',

  features: [
    { text: 'Multiple visual variants (default, secondary, destructive, outline).', highlight: true },
    { text: 'Inline and flexible layout support.' },
    { text: 'Icon support with automatic sizing.', highlight: true },
    { text: 'Accessible focus ring for interactive (anchor) contexts.' },
    { text: 'Smooth color and shadow transitions.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/badge',
      pnpm: 'pnpm add @ng-cn/badge',
      yarn: 'yarn add @ng-cn/badge',
      bun: 'bun add @ng-cn/badge',
    },
    ngAdd: 'ng g @ng-cn/core:c badge',
  },

  anatomy: {
    importStatement: `import { Badge } from '@/ui/badge';`,
    structure: `<Badge>Label</Badge>`,
  },

  apiReference: [
    {
      name: 'Badge',
      description: 'A small inline label component for displaying status or category information.',
      props: [
        {
          name: 'variant',
          type: "'default' | 'secondary' | 'destructive' | 'outline'",
          default: "'default'",
          description: 'The visual style variant of the badge.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the badge.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"badge"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple badge with default styles.',
      code: `<Badge>New</Badge>`,
      hasDemo: true,
    },
    {
      title: 'Variants',
      description: 'Use the variant prop to change the visual appearance of the badge.',
      code: `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`,
    },
    {
      title: 'With icon',
      description: 'Badges can include icons. SVGs inside a badge are automatically sized to 12px.',
      code: `<Badge>
  <lucide-icon name="check" />
  Verified
</Badge>

<Badge variant="destructive">
  <lucide-icon name="x" />
  Failed
</Badge>`,
    },
    {
      title: 'Status indicators',
      description: 'Use badges to display status information in tables or lists.',
      code: `<div class="flex items-center gap-2">
  <span>Order #1042</span>
  <Badge variant="secondary">Processing</Badge>
</div>

<div class="flex items-center gap-2">
  <span>Order #1043</span>
  <Badge>Shipped</Badge>
</div>

<div class="flex items-center gap-2">
  <span>Order #1044</span>
  <Badge variant="destructive">Cancelled</Badge>
</div>`,
    },
    {
      title: 'Notification count',
      description: 'Display notification counts or numeric badges.',
      code: `<div class="relative inline-flex">
  <Button variant="outline" size="icon">
    <lucide-icon name="bell" />
  </Button>
  <Badge class="absolute -top-1.5 -right-1.5 h-5 min-w-5 justify-center px-1 rounded-full text-[10px]">
    3
  </Badge>
</div>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Status WAI-ARIA role',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'When used inside an anchor element, moves focus to the badge link.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/badge',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
