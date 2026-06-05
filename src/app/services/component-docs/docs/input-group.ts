/**
 * InputGroup Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const INPUT_GROUP_DOCUMENTATION: ComponentDocumentation = {
  name: 'Input Group',
  slug: 'input-group',
  description: 'A wrapper component that combines an input field with prefix and/or suffix addons such as icons, text labels, or buttons.',

  features: [
    { text: 'Combine inputs with prefix and suffix addons.', highlight: true },
    { text: 'Supports icons, text, and button addons.' },
    { text: 'Focus ring applies to the whole group.', highlight: true },
    { text: 'Seamless visual integration with internal input.' },
    { text: 'Accessible focus management.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/input-group',
      pnpm: 'pnpm add @ng-cn/input-group',
      yarn: 'yarn add @ng-cn/input-group',
      bun: 'bun add @ng-cn/input-group',
    },
    ngAdd: 'ng g @ng-cn/core:c input-group',
  },

  anatomy: {
    importStatement: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/ui/input-group';`,
    structure: `<InputGroup>
  <InputGroupAddon position="start" />
  <Input />
  <InputGroupAddon position="end" />
</InputGroup>`,
  },

  apiReference: [
    {
      name: 'InputGroup',
      description: 'The container that wraps an input with optional prefix/suffix addons.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the group container.',
        },
      ],
    },
    {
      name: 'InputGroupAddon',
      description: 'A prefix or suffix addon element placed before or after the input.',
      props: [
        {
          name: 'position',
          type: "'start' | 'end'",
          default: "'start'",
          description: 'Whether this addon is placed before (start) or after (end) the input.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the addon.',
        },
      ],
    },
    {
      name: 'InputGroupInput',
      description: 'A borderless input element optimized for use inside an InputGroup. Use this instead of the regular Input component for better visual integration.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the input.',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'With prefix addon',
      description: 'Add a prefix addon before the input to provide context.',
      code: `<InputGroup>
  <InputGroupAddon position="start">$</InputGroupAddon>
  <Input type="number" placeholder="0.00" />
</InputGroup>`,
      hasDemo: true,
    },
    {
      title: 'With suffix addon',
      description: 'Add a suffix addon after the input for units or actions.',
      code: `<InputGroup>
  <Input type="text" placeholder="Amount" />
  <InputGroupAddon position="end">USD</InputGroupAddon>
</InputGroup>`,
    },
    {
      title: 'With both prefix and suffix',
      description: 'Combine a prefix and suffix addon around the input.',
      code: `<InputGroup>
  <InputGroupAddon position="start">$</InputGroupAddon>
  <Input type="number" placeholder="0.00" />
  <InputGroupAddon position="end">USD</InputGroupAddon>
</InputGroup>`,
    },
    {
      title: 'With icon prefix',
      description: 'Use an SVG icon as a prefix addon for visual cues.',
      code: `<InputGroup>
  <InputGroupAddon position="start">
    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  </InputGroupAddon>
  <Input type="search" placeholder="Search..." />
</InputGroup>`,
    },
  ],

  accessibility: {
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'Moves focus into the input field within the group.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus out of the input field.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/tree/main/src/app/lib/components/ui/input-group',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/tigayon-innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
  ],
};
