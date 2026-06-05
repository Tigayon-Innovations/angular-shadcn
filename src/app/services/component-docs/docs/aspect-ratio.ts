/**
 * AspectRatio Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const ASPECT_RATIO_DOCUMENTATION: ComponentDocumentation = {
  name: 'Aspect Ratio',
  slug: 'aspect-ratio',
  description:
    'Displays content within a desired ratio, maintaining consistent dimensions across different screen sizes.',

  features: [
    { text: 'Maintains a fixed aspect ratio for any content.', highlight: true },
    { text: 'Supports any numeric ratio (width / height).' },
    { text: 'Works with images, videos, iframes, and any HTML content.' },
    { text: 'Zero layout shift — dimensions are reserved before content loads.', highlight: true },
    { text: 'Fully customizable with additional CSS classes.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/aspect-ratio',
      pnpm: 'pnpm add @ng-cn/aspect-ratio',
      yarn: 'yarn add @ng-cn/aspect-ratio',
      bun: 'bun add @ng-cn/aspect-ratio',
    },
    ngAdd: 'ng g @ng-cn/core:c aspect-ratio',
  },

  anatomy: {
    importStatement: `import { AspectRatio } from '@/ui/aspect-ratio';`,
    structure: `<AspectRatio [ratio]="16 / 9">
  <img src="..." alt="..." class="object-cover w-full h-full" />
</AspectRatio>`,
  },

  apiReference: [
    {
      name: 'AspectRatio',
      description:
        'A container that enforces a fixed aspect ratio on its contents using padding-bottom technique.',
      props: [
        {
          name: 'ratio',
          type: 'number',
          default: '16 / 9',
          description:
            'The desired aspect ratio expressed as width divided by height (e.g., 16/9, 4/3, 1). Defaults to 16/9.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the aspect ratio container.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-slot]',
          values: '"aspect-ratio"',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A 16:9 aspect ratio containing an image.',
      code: `<div class="w-[450px]">
  <AspectRatio [ratio]="16 / 9">
    <img
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"
      alt="Photo by Drew Beamer"
      class="h-full w-full rounded-md object-cover"
    />
  </AspectRatio>
</div>`,
      hasDemo: true,
    },
    {
      title: 'Square',
      description: 'Use a ratio of 1 to create a perfect square container.',
      code: `<div class="w-[300px]">
  <AspectRatio [ratio]="1">
    <div class="bg-muted flex h-full w-full items-center justify-center rounded-md">
      <span class="text-muted-foreground text-sm">1:1</span>
    </div>
  </AspectRatio>
</div>`,
    },
    {
      title: 'Video embed',
      description: 'Embed a responsive video maintaining a 16:9 ratio.',
      code: `<div class="w-full max-w-2xl">
  <AspectRatio [ratio]="16 / 9" class="overflow-hidden rounded-md">
    <iframe
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="YouTube video"
      class="h-full w-full"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </AspectRatio>
</div>`,
    },
    {
      title: 'Portrait (4:3)',
      description: 'Use a 4:3 ratio for a more traditional landscape format.',
      code: `<div class="w-[400px]">
  <AspectRatio [ratio]="4 / 3" class="overflow-hidden rounded-lg border">
    <img
      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
      alt="Mountain landscape"
      class="h-full w-full object-cover"
    />
  </AspectRatio>
</div>`,
    },
  ],

  accessibility: {
    keyboardInteractions: [],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/aspect-ratio',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
