/**
 * Empty Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const EMPTY_DOCUMENTATION: ComponentDocumentation = {
  name: 'Empty',
  slug: 'empty',
  description: 'A composable empty state component for displaying placeholder content when there is no data to show.',

  features: [
    { text: 'Composable structure with icon, title, description, and action slots.', highlight: true },
    { text: 'Dashed border placeholder appearance.' },
    { text: 'Animated entrance with fade-in effect.', highlight: true },
    { text: 'Centered layout with consistent spacing.' },
    { text: 'Flexible — works with any icon or action content.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/empty',
      pnpm: 'pnpm add @ng-cn/empty',
      yarn: 'yarn add @ng-cn/empty',
      bun: 'bun add @ng-cn/empty',
    },
    ngAdd: 'ng g @ng-cn/core:c empty',
  },

  anatomy: {
    importStatement: `import {
  Empty,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  EmptyAction
} from '@/ui/empty';`,
    structure: `<Empty>
  <EmptyIcon />
  <EmptyTitle />
  <EmptyDescription />
  <EmptyAction />
</Empty>`,
  },

  apiReference: [
    {
      name: 'Empty',
      description: 'The root container for the empty state. Provides a centered, dashed-border area with fade-in animation.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the empty state container.',
        },
      ],
    },
    {
      name: 'EmptyIcon',
      description: 'A circular container for the empty state icon or illustration.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the icon container.',
        },
      ],
    },
    {
      name: 'EmptyTitle',
      description: 'The primary heading text of the empty state.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the title.',
        },
      ],
    },
    {
      name: 'EmptyDescription',
      description: 'Supporting description text that provides context about the empty state.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the description.',
        },
      ],
    },
    {
      name: 'EmptyAction',
      description: 'A container for call-to-action buttons or links.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the action container.',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple empty state with an icon, title, and description.',
      code: `<Empty>
  <EmptyIcon>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  </EmptyIcon>
  <EmptyTitle>No messages</EmptyTitle>
  <EmptyDescription>You have no messages at this time.</EmptyDescription>
</Empty>`,
      hasDemo: true,
    },
    {
      title: 'With action button',
      description: 'Include a call-to-action to guide users on what to do next.',
      code: `<Empty>
  <EmptyIcon>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
    </svg>
  </EmptyIcon>
  <EmptyTitle>No projects yet</EmptyTitle>
  <EmptyDescription>
    Get started by creating your first project.
  </EmptyDescription>
  <EmptyAction>
    <Button>
      Create project
    </Button>
  </EmptyAction>
</Empty>`,
    },
    {
      title: 'Search results empty state',
      description: 'Show contextual feedback when a search returns no results.',
      code: `<Empty>
  <EmptyIcon>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  </EmptyIcon>
  <EmptyTitle>No results found</EmptyTitle>
  <EmptyDescription>
    We couldn't find anything matching "{{ searchQuery }}".
    Try adjusting your search terms or filters.
  </EmptyDescription>
  <EmptyAction>
    <Button variant="outline" (click)="clearSearch()">
      Clear search
    </Button>
  </EmptyAction>
</Empty>`,
    },
  ],

  accessibility: {
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus to interactive elements within the empty state, such as action buttons.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/empty',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
