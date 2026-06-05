/**
 * Carousel Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const CAROUSEL_DOCUMENTATION: ComponentDocumentation = {
  name: 'Carousel',
  slug: 'carousel',
  description:
    'A slideshow component for cycling through elements — images, text, or custom content — with previous/next navigation controls and screen reader announcements.',

  features: [
    { text: 'Horizontal and vertical orientations.', highlight: true },
    { text: 'Screen reader live announcements for every slide change.', highlight: true },
    { text: 'Previous and next navigation buttons that auto-disable at boundaries.' },
    { text: 'Keyboard arrow navigation.' },
    { text: 'Composable anatomy: Root, Content, Item, Previous, Next.' },
    { text: 'Button variant and size customisation on navigation controls.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/carousel',
      pnpm: 'pnpm add @ng-cn/carousel',
      yarn: 'yarn add @ng-cn/carousel',
      bun: 'bun add @ng-cn/carousel',
    },
    ngAdd: 'ng g @ng-cn/core:c carousel',
  },

  anatomy: {
    importStatement: `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/ui/carousel';`,
    structure: `<Carousel>
  <CarouselContent>
    <CarouselItem />
    <CarouselItem />
    <CarouselItem />
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  },

  apiReference: [
    {
      name: 'Carousel',
      description:
        'Root container. Provides carousel context to all child components and announces slide changes to screen readers.',
      props: [
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description:
            'Controls the scroll direction. Affects the layout of CarouselContent and the position of navigation buttons.',
        },
        {
          name: 'ariaLabel',
          type: 'string',
          default: "'Carousel'",
          description: 'Accessible label applied to the carousel region landmark.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the carousel root.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"carousel"' },
      ],
    },
    {
      name: 'CarouselContent',
      description: 'Overflow container that wraps all carousel items and clips them.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the overflow container.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"carousel-content"' },
      ],
    },
    {
      name: 'CarouselItem',
      description:
        'An individual slide. Has role="group" and aria-roledescription="slide" for assistive technology.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes — commonly used to set basis/width (e.g. basis-1/2).',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"carousel-item"' },
      ],
    },
    {
      name: 'CarouselPrevious',
      description:
        'Navigation button that scrolls to the previous slide. Disabled automatically when on the first slide.',
      props: [
        {
          name: 'variant',
          type: "'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'",
          default: "'outline'",
          description: 'Visual variant of the button.',
        },
        {
          name: 'size',
          type: "'default' | 'sm' | 'lg' | 'icon'",
          default: "'icon'",
          description: 'Size of the button.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the button.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"carousel-previous"' },
      ],
    },
    {
      name: 'CarouselNext',
      description:
        'Navigation button that scrolls to the next slide. Disabled automatically when on the last slide.',
      props: [
        {
          name: 'variant',
          type: "'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'",
          default: "'outline'",
          description: 'Visual variant of the button.',
        },
        {
          name: 'size',
          type: "'default' | 'sm' | 'lg' | 'icon'",
          default: "'icon'",
          description: 'Size of the button.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the button.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"carousel-next"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple horizontal carousel with three slides.',
      hasDemo: true,
      code: `<Carousel class="w-full max-w-xs">
  <CarouselContent>
    @for (item of [1, 2, 3, 4, 5]; track item) {
      <CarouselItem>
        <div class="p-1">
          <div class="flex aspect-square items-center justify-center rounded-md border p-6 text-4xl font-semibold">
            {{ item }}
          </div>
        </div>
      </CarouselItem>
    }
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    },
    {
      title: 'Multiple items per view',
      description: 'Show multiple slides at once using a fractional basis class on CarouselItem.',
      code: `<Carousel class="w-full max-w-sm">
  <CarouselContent class="-ml-1">
    @for (item of items; track item.id) {
      <CarouselItem class="pl-1 md:basis-1/2 lg:basis-1/3">
        <div class="p-1">
          <div class="rounded-md border p-4">{{ item.title }}</div>
        </div>
      </CarouselItem>
    }
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    },
    {
      title: 'Vertical orientation',
      description: 'Set orientation="vertical" to scroll items up and down.',
      code: `<Carousel orientation="vertical" class="w-full max-w-xs">
  <CarouselContent class="-mt-1 h-[200px]">
    @for (item of [1, 2, 3, 4, 5]; track item) {
      <CarouselItem class="pt-1 md:basis-1/2">
        <div class="flex h-full items-center justify-center rounded-md border p-6 text-4xl font-semibold">
          {{ item }}
        </div>
      </CarouselItem>
    }
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    },
    {
      title: 'Custom button variants',
      description: 'Use the variant and size props on navigation buttons to match your design.',
      code: `<Carousel class="w-full max-w-xs">
  <CarouselContent>
    @for (slide of slides; track slide) {
      <CarouselItem>
        <div class="rounded-md border p-8 text-center">{{ slide }}</div>
      </CarouselItem>
    }
  </CarouselContent>
  <CarouselPrevious variant="default" size="sm" />
  <CarouselNext variant="default" size="sm" />
</Carousel>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Carousel WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/',
    keyboardInteractions: [
      {
        key: 'ArrowLeft',
        description: 'Scrolls to the previous slide when orientation is horizontal.',
      },
      {
        key: 'ArrowRight',
        description: 'Scrolls to the next slide when orientation is horizontal.',
      },
      {
        key: 'Tab',
        description: 'Moves focus to the next interactive element inside the carousel.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus to the previous interactive element inside the carousel.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/carousel',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA carousel pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/',
      icon: 'docs',
    },
  ],
};
