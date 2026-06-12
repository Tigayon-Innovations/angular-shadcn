/**
 * Pagination Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const PAGINATION_DOCUMENTATION: ComponentDocumentation = {
  name: 'Pagination',
  slug: 'pagination',
  description:
    'Pagination with page navigation, next and previous links.',

  features: [
    { text: 'Semantic nav landmark with configurable aria-label.', highlight: true },
    { text: 'Active page indicated with aria-current="page".' },
    { text: 'Ellipsis component for omitted page ranges.', highlight: true },
    { text: 'Previous and Next navigation links with icons.' },
    { text: 'Size variants on page links: default, sm, lg, icon.' },
    { text: 'Ghost and outline button variants for active/inactive states.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/pagination',
      pnpm: 'pnpm add @ng-cn/pagination',
      yarn: 'yarn add @ng-cn/pagination',
      bun: 'bun add @ng-cn/pagination',
    },
    ngAdd: 'ng g @ng-cn/core:c pagination',
  },

  anatomy: {
    importStatement: `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/ui/pagination';`,
    structure: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
  },

  apiReference: [
    {
      name: 'Pagination',
      description:
        'The root navigation container. Renders a <nav> element with role="navigation" and a configurable aria-label.',
      props: [
        {
          name: 'ariaLabel',
          type: 'string',
          default: "'Pagination'",
          description: 'Accessible label for the navigation landmark. Override to avoid conflicts when multiple paginations exist on a page.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the pagination nav element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"pagination"' },
      ],
    },
    {
      name: 'PaginationContent',
      description:
        'A flex row container for pagination items. Wraps all PaginationItem children.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the pagination content wrapper.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"pagination-content"' },
      ],
    },
    {
      name: 'PaginationItem',
      description: 'A wrapper for a single pagination control (link, previous, next, or ellipsis).',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the pagination item.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"pagination-item"' },
      ],
    },
    {
      name: 'PaginationLink',
      description:
        'A page number link. Renders with an outline variant when active, ghost variant otherwise. Active links get aria-current="page".',
      props: [
        {
          name: 'href',
          type: 'string',
          default: "'#'",
          description: 'The URL to navigate to when this page link is clicked.',
        },
        {
          name: 'isActive',
          type: 'boolean',
          default: 'false',
          description: 'When true, applies the outline button variant and sets aria-current="page".',
        },
        {
          name: 'size',
          type: "'default' | 'sm' | 'lg' | 'icon'",
          default: "'icon'",
          description: 'The size of the page link button.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the pagination link.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"pagination-link"' },
      ],
    },
    {
      name: 'PaginationPrevious',
      description:
        'A link to the previous page. Renders a left-pointing chevron with a "Previous" label. Has aria-label="Go to previous page".',
      props: [
        {
          name: 'href',
          type: 'string',
          default: "'#'",
          description: 'The URL to navigate to for the previous page.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the previous page link.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"pagination-previous"' },
      ],
    },
    {
      name: 'PaginationNext',
      description:
        'A link to the next page. Renders a "Next" label with a right-pointing chevron. Has aria-label="Go to next page".',
      props: [
        {
          name: 'href',
          type: 'string',
          default: "'#'",
          description: 'The URL to navigate to for the next page.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the next page link.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"pagination-next"' },
      ],
    },
    {
      name: 'PaginationEllipsis',
      description:
        'Indicates that some pages are omitted from the visible list. Renders a three-dot icon with a visually hidden "More pages" label.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the ellipsis element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"pagination-ellipsis"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A standard pagination control with previous, next, and numbered pages.',
      code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/page/1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/2" [isActive]="true">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/3">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/page/3" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
      hasDemo: true,
    },
    {
      title: 'With ellipsis',
      description: 'Use PaginationEllipsis to indicate omitted pages in a long range.',
      code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/page/4" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/4">4</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/5" [isActive]="true">5</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/6">6</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/10">10</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/page/6" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    },
    {
      title: 'Dynamic pagination',
      description: 'Build a dynamic paginator driven by component state.',
      code: `// In your component:
currentPage = signal(1);
totalPages = 10;

pages = computed(() =>
  Array.from({ length: this.totalPages }, (_, i) => i + 1)
);

// In your template:
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious
        [href]="'/page/' + (currentPage() - 1)"
        [class]="currentPage() === 1 ? 'pointer-events-none opacity-50' : ''"
      />
    </PaginationItem>

    @for (page of pages(); track page) {
      <PaginationItem>
        <PaginationLink
          [href]="'/page/' + page"
          [isActive]="page === currentPage()"
          (click)="currentPage.set(page)"
        >
          {{ page }}
        </PaginationLink>
      </PaginationItem>
    }

    <PaginationItem>
      <PaginationNext
        [href]="'/page/' + (currentPage() + 1)"
        [class]="currentPage() === totalPages ? 'pointer-events-none opacity-50' : ''"
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    },
  ],

  accessibility: {
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus to the next pagination link.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus to the previous pagination link.',
      },
      {
        key: 'Enter',
        description: 'Activates the focused link and navigates to that page.',
      },
    ],
    ariaAttributes: [
      {
        name: 'aria-label',
        description: 'Applied to the Pagination nav element. Defaults to "Pagination". Configure via the ariaLabel prop.',
      },
      {
        name: 'aria-current="page"',
        description: 'Applied to the active PaginationLink to indicate the current page to screen readers.',
      },
      {
        name: 'aria-label="Go to previous page"',
        description: 'Applied to PaginationPrevious for screen reader identification.',
      },
      {
        name: 'aria-label="Go to next page"',
        description: 'Applied to PaginationNext for screen reader identification.',
      },
      {
        name: 'aria-hidden="true"',
        description: 'Applied to PaginationEllipsis so the decorative icon is not announced.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/pagination',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
