/**
 * Card Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const CARD_DOCUMENTATION: ComponentDocumentation = {
  name: 'Card',
  slug: 'card',
  description:
    'Displays a card with header, content, and footer sections for grouping related information.',

  features: [
    { text: 'Composable sub-components: Header, Title, Description, Content, Footer, Action.', highlight: true },
    { text: 'Built-in shadow, border, and rounded corner styling.' },
    { text: 'Flexible layout — works with any content.' },
    { text: 'Supports optional action slot in the header area.', highlight: true },
    { text: 'Fully customizable with additional CSS classes on each part.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/card',
      pnpm: 'pnpm add @ng-cn/card',
      yarn: 'yarn add @ng-cn/card',
      bun: 'bun add @ng-cn/card',
    },
    ngAdd: 'ng g @ng-cn/core:c card',
  },

  anatomy: {
    importStatement: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '@/ui/card';`,
    structure: `<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
    <CardAction />
  </CardHeader>
  <CardContent />
  <CardFooter />
</Card>`,
  },

  apiReference: [
    {
      name: 'Card',
      description:
        'The root container component. Provides the main card wrapper with shadow, border, and rounded corners.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the card root element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"card"' },
      ],
    },
    {
      name: 'CardHeader',
      description:
        'The header section of the card. Contains the title, description, and optional action. Supports a two-column layout when a CardAction is present.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the card header.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"card-header"' },
      ],
    },
    {
      name: 'CardTitle',
      description: 'The main heading of the card. Rendered with semibold font weight.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the card title.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"card-title"' },
      ],
    },
    {
      name: 'CardDescription',
      description:
        'Secondary descriptive text below the title. Rendered in a muted foreground color at a smaller font size.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the card description.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"card-description"' },
      ],
    },
    {
      name: 'CardContent',
      description: 'The main content area of the card. Provides horizontal padding.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the card content area.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"card-content"' },
      ],
    },
    {
      name: 'CardFooter',
      description:
        'The footer section of the card. Displays items in a row and provides horizontal padding.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the card footer.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"card-footer"' },
      ],
    },
    {
      name: 'CardAction',
      description:
        'An optional action element placed in the header. Positioned to the right of the title and description using CSS grid. Must be a direct child of CardHeader.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the card action.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"card-action"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple card with header, content, and footer.',
      code: `<Card class="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your project content goes here.</p>
  </CardContent>
  <CardFooter class="flex justify-between">
    <button Button variant="outline">Cancel</button>
    <button Button>Deploy</button>
  </CardFooter>
</Card>`,
      hasDemo: true,
    },
    {
      title: 'With action in header',
      description: 'Use CardAction to add a button or link to the top-right of the card header.',
      code: `<Card class="w-[400px]">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
    <CardAction>
      <button Button variant="ghost" size="sm">Mark all read</button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <ul class="space-y-2">
      <li class="text-sm">New comment on your post</li>
      <li class="text-sm">Your export is ready</li>
      <li class="text-sm">Invite accepted by Sarah</li>
    </ul>
  </CardContent>
</Card>`,
    },
    {
      title: 'Stats card',
      description: 'A minimal card displaying a single metric.',
      code: `<Card class="w-[200px]">
  <CardHeader>
    <CardDescription>Total Revenue</CardDescription>
    <CardTitle class="text-2xl">$45,231.89</CardTitle>
  </CardHeader>
  <CardContent>
    <p class="text-muted-foreground text-xs">+20.1% from last month</p>
  </CardContent>
</Card>`,
    },
    {
      title: 'Profile card',
      description: 'A card displaying a user profile with avatar and bio.',
      code: `<Card class="w-[320px]">
  <CardHeader>
    <div class="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <CardTitle>shadcn</CardTitle>
        <CardDescription>@shadcn</CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <p class="text-sm">Building design systems for the modern web.</p>
  </CardContent>
  <CardFooter>
    <button Button class="w-full">Follow</button>
  </CardFooter>
</Card>`,
    },
  ],

  accessibility: {
    keyboardInteractions: [],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/card',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
