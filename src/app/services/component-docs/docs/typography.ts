/**
 * Typography Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const TYPOGRAPHY_DOCUMENTATION: ComponentDocumentation = {
  name: 'Typography',
  slug: 'typography',
  description: 'A collection of typographic components for consistent heading, paragraph, list, blockquote, and code text styles across your application.',

  features: [
    { text: 'Complete set of typographic elements: H1–H4, P, Lead, Large, Small, Muted.', highlight: true },
    { text: 'List, Blockquote, and InlineCode components included.' },
    { text: 'Consistent letter-spacing and line-height across headings.', highlight: true },
    { text: 'Each component is independently composable.' },
    { text: 'Block-level display for heading and paragraph elements.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/typography',
      pnpm: 'pnpm add @ng-cn/typography',
      yarn: 'yarn add @ng-cn/typography',
      bun: 'bun add @ng-cn/typography',
    },
    ngAdd: 'ng g @ng-cn/core:c typography',
  },

  anatomy: {
    importStatement: `import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyBlockquote,
  TypographyList,
  TypographyInlineCode
} from '@/ui/typography';`,
    structure: `<TypographyH1>Heading 1</TypographyH1>
<TypographyH2>Heading 2</TypographyH2>
<TypographyP>Paragraph</TypographyP>
<TypographyBlockquote>Quote</TypographyBlockquote>
<TypographyList>
  <li>Item</li>
</TypographyList>
<TypographyInlineCode>code</TypographyInlineCode>`,
  },

  apiReference: [
    {
      name: 'TypographyH1',
      description: 'Extra-large page-level heading (text-4xl / lg:text-5xl).',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'TypographyH2',
      description: 'Section heading with a bottom border (text-3xl).',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'TypographyH3',
      description: 'Sub-section heading (text-2xl).',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'TypographyH4',
      description: 'Smaller sub-section heading (text-xl).',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'TypographyP',
      description: 'Standard paragraph text with top margin when not the first child.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'TypographyLead',
      description: 'Larger introductory paragraph in muted foreground color (text-xl).',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'TypographyLarge',
      description: 'Large semibold text (text-lg font-semibold).',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'TypographySmall',
      description: 'Small medium-weight text (text-sm font-medium).',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'TypographyMuted',
      description: 'Small muted helper text (text-sm text-muted-foreground).',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'TypographyBlockquote',
      description: 'A styled blockquote with a left border and italic text.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'TypographyList',
      description: 'An unordered list with disc bullets and consistent item spacing.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'TypographyInlineCode',
      description: 'Inline code with monospace font and muted background.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Headings',
      description: 'The four heading levels with their default styles.',
      code: `<TypographyH1>The Joke Tax Chronicles</TypographyH1>
<TypographyH2>The People of the Kingdom</TypographyH2>
<TypographyH3>The Joke Tax</TypographyH3>
<TypographyH4>People stopped telling jokes</TypographyH4>`,
      hasDemo: true,
    },
    {
      title: 'Paragraph and lead',
      description: 'Use TypographyLead for introductory text and TypographyP for body copy.',
      code: `<TypographyLead>
  A modal dialog that interrupts the user with important content
  and expects a response.
</TypographyLead>

<TypographyP>
  The king, seeing how much smoke was coming from the kingdom,
  decided that something had to be done.
</TypographyP>

<TypographyP>
  He appointed the Royal Joke Collector to gather all the jokes
  in the kingdom and determine their worth.
</TypographyP>`,
    },
    {
      title: 'Blockquote and list',
      description: 'Blockquote for quotations and List for bulleted content.',
      code: `<TypographyBlockquote>
  "After all," he said, "everyone enjoys a good joke, so it's only fair
  that they should pay for the privilege."
</TypographyBlockquote>

<TypographyList>
  <li>1st level of puns: 5 gold coins</li>
  <li>2nd level of jokes: 10 gold coins</li>
  <li>3rd level of one-liners: 20 gold coins</li>
</TypographyList>`,
    },
    {
      title: 'Inline variants',
      description: 'Smaller text helpers for annotations, labels, and code snippets.',
      code: `<TypographyLarge>Are you absolutely sure?</TypographyLarge>

<TypographySmall>Email address</TypographySmall>

<TypographyMuted>Enter your email to receive a password reset link.</TypographyMuted>

<TypographyP>
  Install the package with <TypographyInlineCode>npm install @ng-cn/ui</TypographyInlineCode> to get started.
</TypographyP>`,
    },
  ],

  accessibility: {
    keyboardInteractions: [],
    ariaAttributes: [
      {
        name: 'Semantic HTML',
        description: 'Each Typography component renders with display:block to behave like its semantic counterpart. Use appropriate heading levels (H1–H4) to maintain document outline structure.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/typography',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
