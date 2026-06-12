/**
 * ButtonGroup Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const BUTTON_GROUP_DOCUMENTATION: ComponentDocumentation = {
  name: 'Button Group',
  slug: 'button-group',
  description: 'A container that groups related buttons together, removing inner border radii to create a unified control.',

  features: [
    { text: 'Seamlessly joins buttons into a cohesive control.', highlight: true },
    { text: 'Supports horizontal and vertical orientations.' },
    { text: 'Negative margin technique removes double borders.', highlight: true },
    { text: 'Works with any Button variant.' },
    { text: 'Accessible with role="group" semantics.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/button-group',
      pnpm: 'pnpm add @ng-cn/button-group',
      yarn: 'yarn add @ng-cn/button-group',
      bun: 'bun add @ng-cn/button-group',
    },
    ngAdd: 'ng g @ng-cn/core:c button-group',
  },

  anatomy: {
    importStatement: `import { ButtonGroup } from '@/ui/button-group';`,
    structure: `<ButtonGroup>
  <Button />
  <Button />
  <Button />
</ButtonGroup>`,
  },

  apiReference: [
    {
      name: 'ButtonGroup',
      description: 'A container with role="group" that visually joins child buttons by removing inner border radii.',
      props: [
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'The layout direction of the button group.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the group container.',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A horizontal group of outline buttons.',
      code: `<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>`,
      hasDemo: true,
    },
    {
      title: 'Vertical',
      description: 'Stack buttons vertically using the orientation prop.',
      code: `<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>`,
    },
    {
      title: 'With icons',
      description: 'Combine icon buttons into a toolbar-like control.',
      code: `<ButtonGroup aria-label="Text alignment">
  <Button variant="outline" size="icon" aria-label="Align left">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/>
    </svg>
  </Button>
  <Button variant="outline" size="icon" aria-label="Align center">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/>
    </svg>
  </Button>
  <Button variant="outline" size="icon" aria-label="Align right">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/>
    </svg>
  </Button>
</ButtonGroup>`,
    },
    {
      title: 'Pagination controls',
      description: 'Use a button group for previous/next pagination controls.',
      code: `<ButtonGroup aria-label="Page navigation">
  <Button variant="outline" (click)="prevPage()">Previous</Button>
  <Button variant="outline" (click)="nextPage()">Next</Button>
</ButtonGroup>`,
    },
  ],

  accessibility: {
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus through each button in the group.',
      },
      {
        key: 'Space / Enter',
        description: 'Activates the focused button.',
      },
    ],
    ariaAttributes: [
      {
        name: 'role="group"',
        description: 'Identifies the container as a group of related buttons for assistive technology.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/button-group',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
