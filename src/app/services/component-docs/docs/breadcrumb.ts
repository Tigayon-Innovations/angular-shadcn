/**
 * Breadcrumb Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const BREADCRUMB_DOCUMENTATION: ComponentDocumentation = {
  name: 'Breadcrumb',
  slug: 'breadcrumb',
  description:
    'Displays the path to the current resource using a hierarchy of links.',

  features: [
    { text: 'Semantic nav landmark with aria-label="breadcrumb".', highlight: true },
    { text: 'Current page indicated with aria-current="page".' },
    { text: 'Ellipsis component for collapsing long paths.', highlight: true },
    { text: 'Customizable separator — defaults to a chevron icon.' },
    { text: 'Fully composable with 7 sub-components.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/breadcrumb',
      pnpm: 'pnpm add @ng-cn/breadcrumb',
      yarn: 'yarn add @ng-cn/breadcrumb',
      bun: 'bun add @ng-cn/breadcrumb',
    },
    ngAdd: 'ng g @ng-cn/core:c breadcrumb',
  },

  anatomy: {
    importStatement: `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/ui/breadcrumb';`,
    structure: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/" />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage />
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },

  apiReference: [
    {
      name: 'Breadcrumb',
      description:
        'The root navigation container. Renders a <nav> element with role="navigation" and aria-label="breadcrumb".',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the breadcrumb nav element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"breadcrumb"' },
      ],
    },
    {
      name: 'BreadcrumbList',
      description:
        'An ordered list (<ol>) that wraps all breadcrumb items. Applies flex layout with wrapping and responsive gap.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the breadcrumb list.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"breadcrumb-list"' },
      ],
    },
    {
      name: 'BreadcrumbItem',
      description:
        'A single item in the breadcrumb trail. Renders a <li> element with inline-flex alignment.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the breadcrumb item.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"breadcrumb-item"' },
      ],
    },
    {
      name: 'BreadcrumbLink',
      description:
        'An anchor element linking to a previous page in the hierarchy. Renders an <a> tag with hover color transition.',
      props: [
        {
          name: 'href',
          type: 'string | undefined',
          description: 'The URL the breadcrumb link navigates to.',
        },
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the breadcrumb link.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"breadcrumb-link"' },
      ],
    },
    {
      name: 'BreadcrumbPage',
      description:
        'Represents the current page in the breadcrumb. Renders with aria-current="page" and aria-disabled="true" to indicate the active location.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the breadcrumb page element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"breadcrumb-page"' },
      ],
    },
    {
      name: 'BreadcrumbSeparator',
      description:
        'A visual separator between breadcrumb items. Defaults to a chevron icon. Accepts custom content via ng-content to replace the default icon.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the separator.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"breadcrumb-separator"' },
      ],
    },
    {
      name: 'BreadcrumbEllipsis',
      description:
        'An indicator that some items in the breadcrumb trail have been collapsed. Renders three dots icon with a visually hidden "More" label.',
      props: [
        {
          name: 'class',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the ellipsis element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"breadcrumb-ellipsis"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple three-level breadcrumb with a current page.',
      code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      hasDemo: true,
    },
    {
      title: 'With ellipsis',
      description: 'Collapse middle items with BreadcrumbEllipsis for long paths.',
      code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components/ui">UI</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    },
    {
      title: 'Custom separator',
      description: 'Replace the default chevron with a custom separator character.',
      code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <span aria-hidden="true">/</span>
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <span aria-hidden="true">/</span>
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Getting Started</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    },
    {
      title: 'Responsive with dropdown',
      description: 'Hide intermediate items on smaller screens using a dropdown menu.',
      code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <!-- Hidden on small screens, shown on md+ -->
    <BreadcrumbItem class="hidden md:block">
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator class="hidden md:block" />
    <BreadcrumbItem>
      <BreadcrumbPage>Components</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Breadcrumb WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus to the next focusable breadcrumb link.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus to the previous focusable breadcrumb link.',
      },
      {
        key: 'Enter',
        description: 'Activates the focused breadcrumb link and navigates to the target.',
      },
    ],
    ariaAttributes: [
      {
        name: 'aria-label="breadcrumb"',
        description: 'Applied to the root Breadcrumb nav element to identify the navigation landmark.',
      },
      {
        name: 'aria-current="page"',
        description: 'Applied to BreadcrumbPage to indicate the current page to screen readers.',
      },
      {
        name: 'aria-disabled="true"',
        description: 'Applied to BreadcrumbPage to prevent it from being treated as a navigable link.',
      },
      {
        name: 'aria-hidden="true"',
        description: 'Applied to BreadcrumbEllipsis so the icon is not announced by screen readers.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/breadcrumb',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb',
      icon: 'docs',
    },
  ],
};
