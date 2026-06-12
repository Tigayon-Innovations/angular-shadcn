/**
 * Item Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const ITEM_DOCUMENTATION: ComponentDocumentation = {
  name: 'Item',
  slug: 'item',
  description:
    'A versatile component for displaying rows of content with media, title, description and actions. Great for lists, notifications and settings rows.',

  features: [
    { text: 'Composable media, content, title, description and actions slots.', highlight: true },
    { text: 'Default, outline and muted variants.', highlight: true },
    { text: 'Default and small sizes.' },
    { text: 'Icon and image media variants with sensible sizing.' },
    { text: 'Group items into lists with ItemGroup and ItemSeparator.' },
    { text: 'Focus-visible ring styling for interactive items.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/item',
      pnpm: 'pnpm add @ng-cn/item',
      yarn: 'yarn add @ng-cn/item',
      bun: 'bun add @ng-cn/item',
    },
    ngAdd: 'ng g @ng-cn/core:c item',
  },

  anatomy: {
    importStatement: `import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle
} from '@/ui/item';`,
    structure: `<ItemGroup>
  <Item>
    <ItemHeader />
    <ItemMedia />
    <ItemContent>
      <ItemTitle />
      <ItemDescription />
    </ItemContent>
    <ItemActions />
    <ItemFooter />
  </Item>
  <ItemSeparator />
  <Item />
</ItemGroup>`,
  },

  apiReference: [
    {
      name: 'ItemGroup',
      description: 'Container that stacks multiple Item components as a list.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the group.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"item-group"' }],
      notes: ['Rendered with role="list" for assistive technology.'],
    },
    {
      name: 'ItemSeparator',
      description: 'Horizontal divider between items in an ItemGroup.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the separator.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"item-separator"' },
        { name: '[data-orientation]', values: '"horizontal"' },
      ],
      notes: ['Purely decorative (role="none") and hidden from assistive technology.'],
    },
    {
      name: 'Item',
      description: 'The item row itself. Holds media, content, actions, header and footer.',
      props: [
        {
          name: 'variant',
          type: "'default' | 'outline' | 'muted'",
          default: "'default'",
          description: 'Visual style of the item.',
        },
        {
          name: 'size',
          type: "'default' | 'sm'",
          default: "'default'",
          description: 'Padding and gap size of the item.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the item.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"item"' },
        { name: '[data-variant]', values: '"default" | "outline" | "muted"' },
        { name: '[data-size]', values: '"default" | "sm"' },
      ],
    },
    {
      name: 'ItemMedia',
      description: 'Leading media for the item, such as an icon, image or avatar.',
      props: [
        {
          name: 'variant',
          type: "'default' | 'icon' | 'image'",
          default: "'default'",
          description:
            'Media style. "icon" renders a bordered, muted square sized for icons; "image" renders a rounded container with object-cover images.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the media container.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"item-media"' },
        { name: '[data-variant]', values: '"default" | "icon" | "image"' },
      ],
    },
    {
      name: 'ItemContent',
      description: 'Main content area of the item, holding the title and description.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the content.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"item-content"' }],
    },
    {
      name: 'ItemTitle',
      description: 'Title text for the item.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the title.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"item-title"' }],
    },
    {
      name: 'ItemDescription',
      description: 'Secondary description text, clamped to two lines.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the description.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"item-description"' }],
    },
    {
      name: 'ItemActions',
      description: 'Trailing actions such as buttons or icon buttons.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the actions container.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"item-actions"' }],
    },
    {
      name: 'ItemHeader',
      description: 'Full-width header row inside the item.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the header.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"item-header"' }],
    },
    {
      name: 'ItemFooter',
      description: 'Full-width footer row inside the item.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the footer.',
        },
      ],
      dataAttributes: [{ name: '[data-slot]', values: '"item-footer"' }],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'An item with icon media, content and an action.',
      code: `<Item variant="outline">
  <ItemMedia variant="icon">
    <lucide-icon [img]="BadgeCheck" />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Your profile has been verified.</ItemTitle>
    <ItemDescription>Verified on Feb 21, 2026.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="outline" size="sm">View</Button>
  </ItemActions>
</Item>`,
      hasDemo: true,
    },
    {
      title: 'Variants',
      description: 'Items support default, outline and muted variants.',
      code: `<Item>
  <ItemContent>
    <ItemTitle>Default variant</ItemTitle>
  </ItemContent>
</Item>

<Item variant="outline">
  <ItemContent>
    <ItemTitle>Outline variant</ItemTitle>
  </ItemContent>
</Item>

<Item variant="muted">
  <ItemContent>
    <ItemTitle>Muted variant</ItemTitle>
  </ItemContent>
</Item>`,
    },
    {
      title: 'Item group with separators',
      description: 'Stack items into a list with ItemGroup and divide them with ItemSeparator.',
      code: `<ItemGroup class="rounded-md border">
  <Item>
    <ItemMedia variant="icon">
      <lucide-icon [img]="Music" />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Midnight City Lights</ItemTitle>
      <ItemDescription>Neon Dreams &middot; 3:45</ItemDescription>
    </ItemContent>
  </Item>
  <ItemSeparator />
  <Item>
    <ItemMedia variant="icon">
      <lucide-icon [img]="Shield" />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Two-factor authentication</ItemTitle>
      <ItemDescription>Secure your account with 2FA.</ItemDescription>
    </ItemContent>
  </Item>
</ItemGroup>`,
    },
    {
      title: 'Image media',
      description: 'Use the image media variant for avatars or album art.',
      code: `<Item variant="outline">
  <ItemMedia variant="image">
    <img src="/avatars/01.png" alt="Album cover" />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Summer Nights EP</ItemTitle>
    <ItemDescription>Sunset Collective</ItemDescription>
  </ItemContent>
</Item>`,
    },
    {
      title: 'Small size',
      description: 'Use size="sm" for compact rows.',
      code: `<Item variant="muted" size="sm">
  <ItemContent>
    <ItemTitle>Compact item</ItemTitle>
  </ItemContent>
  <ItemActions>
    <Button variant="ghost" size="sm">Dismiss</Button>
  </ItemActions>
</Item>`,
    },
  ],

  accessibility: {
    keyboardInteractions: [
      {
        key: 'Tab',
        description:
          'Moves focus to the next focusable element inside the item (e.g. action buttons).',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus to the previous focusable element.',
      },
    ],
    ariaAttributes: [
      {
        name: 'role="list"',
        description: 'Applied to ItemGroup so screen readers announce the number of items.',
      },
      {
        name: 'role="none"',
        description: 'Applied to ItemSeparator so decorative dividers are ignored.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/item',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'shadcn/ui Item',
      url: 'https://ui.shadcn.com/docs/components/item',
      icon: 'docs',
    },
  ],
};
