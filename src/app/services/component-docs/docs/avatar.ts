/**
 * Avatar Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const AVATAR_DOCUMENTATION: ComponentDocumentation = {
  name: 'Avatar',
  slug: 'avatar',
  description: 'An image element with a fallback for representing the user.',

  features: [
    { text: 'Automatic and manual control over when the image renders.', highlight: true },
    { text: 'Fallback part accepts any children.' },
    { text: 'Optionally delay fallback rendering to avoid content flashing.', highlight: true },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/avatar',
      pnpm: 'pnpm add @ng-cn/avatar',
      yarn: 'yarn add @ng-cn/avatar',
      bun: 'bun add @ng-cn/avatar',
    },
    ngAdd: 'ng g @ng-cn/core:c avatar',
  },

  anatomy: {
    importStatement: `import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '@/ui/avatar';`,
    structure: `<Avatar>
  <AvatarImage />
  <AvatarFallback />
</Avatar>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of an avatar.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the avatar root.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-slot]',
          values: '"avatar"',
        },
      ],
    },
    {
      name: 'Image',
      description:
        'The image to render. By default it will only render when it has loaded. You can use the onLoadingStatusChange handler if you need more control.',
      props: [
        {
          name: 'src',
          type: 'string',
          required: true,
          description: 'The source URL of the image to display.',
        },
        {
          name: 'alt',
          type: 'string',
          required: true,
          description: 'The alternate text for the image.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the image.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"avatar-image"' },
      ],
    },
    {
      name: 'Fallback',
      description:
        'An element that renders when the image hasn\'t loaded. This means whilst it\'s loading, or if there was an error. If you notice a flash during loading, you can provide a delayMs prop to delay its rendering so it only renders for those with slower connections.',
      props: [
        {
          name: 'delayMs',
          type: 'number',
          description:
            'Delay in milliseconds before showing the fallback. Useful to avoid flashing during fast loads.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the fallback.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"avatar-fallback"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple avatar with image and fallback initials.',
      code: `<Avatar>
  <AvatarImage
    src="https://github.com/shadcn.png"
    alt="@shadcn"
  />
  <AvatarFallback>SC</AvatarFallback>
</Avatar>`,
      hasDemo: true,
    },
    {
      title: 'With delay on fallback',
      description: 'Use the delayMs prop to delay the fallback rendering and avoid content flashing.',
      code: `<Avatar>
  <AvatarImage
    src="https://github.com/shadcn.png"
    alt="@shadcn"
  />
  <AvatarFallback [delayMs]="600">SC</AvatarFallback>
</Avatar>`,
    },
    {
      title: 'Fallback only',
      description: 'Avatar can be used with only a fallback when no image is provided.',
      code: `<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`,
    },
    {
      title: 'Multiple avatars',
      description: 'Display multiple avatars in a group.',
      code: `<div class="flex gap-2">
  <Avatar>
    <AvatarImage
      src="https://github.com/shadcn.png"
      alt="@shadcn"
    />
    <AvatarFallback>SC</AvatarFallback>
  </Avatar>

  <Avatar>
    <AvatarImage
      src="https://github.com/vercel.png"
      alt="@vercel"
    />
    <AvatarFallback>VL</AvatarFallback>
  </Avatar>

  <Avatar>
    <AvatarFallback>AC</AvatarFallback>
  </Avatar>
</div>`,
    },
    {
      title: 'Avatar with tooltip',
      description: 'Compose the Avatar with a Tooltip to display extra information.',
      code: `<Tooltip>
  <TooltipTrigger>
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
      />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  </TooltipTrigger>

  <TooltipContent side="top">
    User Profile
    <TooltipArrow />
  </TooltipContent>
</Tooltip>`,
    },
    {
      title: 'Avatar sizes',
      description: 'Use the class prop to customize avatar sizes using Tailwind classes.',
      code: `<div class="flex items-center gap-4">
  <!-- Small -->
  <Avatar class="size-6">
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>SC</AvatarFallback>
  </Avatar>

  <!-- Medium (default) -->
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>SC</AvatarFallback>
  </Avatar>

  <!-- Large -->
  <Avatar class="size-12">
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback class="text-lg">SC</AvatarFallback>
  </Avatar>
</div>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Avatar',
    ariaPatternUrl: 'https://www.radix-ui.com/primitives/docs/components/avatar',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Avatar can receive focus if it\'s interactive (e.g., wrapped in a button or link).',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/shadcn-ng/ui/tree/main/src/app/lib/components/ui/avatar',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/shadcn-ng/ui/issues/new',
      icon: 'issue',
    },
    {
      text: 'Radix Avatar',
      url: 'https://www.radix-ui.com/primitives/docs/components/avatar',
      icon: 'docs',
    },
  ],
};
