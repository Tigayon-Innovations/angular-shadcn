/**
 * Tabs Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const TABS_DOCUMENTATION: ComponentDocumentation = {
  name: 'Tabs',
  slug: 'tabs',
  description:
    'A set of layered sections of content—known as tab panels—that are displayed one at a time.',

  features: [
    { text: 'Full keyboard navigation.', highlight: true },
    { text: 'Supports horizontal/vertical orientation.' },
    { text: 'Supports automatic/manual activation modes.', highlight: true },
    { text: 'Can be controlled or uncontrolled.' },
    { text: 'Supports Right to Left direction.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/tabs',
      pnpm: 'pnpm add @ng-cn/tabs',
      yarn: 'yarn add @ng-cn/tabs',
      bun: 'bun add @ng-cn/tabs',
    },
    ngAdd: 'ng g @ng-cn/core:c tabs',
  },

  anatomy: {
    importStatement: `import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/ui/tabs';`,
    structure: `<Tabs>
  <TabsList>
    <TabsTrigger />
    <TabsTrigger />
  </TabsList>
  <TabsContent />
  <TabsContent />
</Tabs>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the tabs component parts.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'The controlled value of the tab to activate. Use with (valueChange).',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description:
            'The value of the tab that should be active when initially rendered. Use when you do not need to control the state.',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'The orientation of the component.',
        },
        {
          name: 'activationMode',
          type: "'automatic' | 'manual'",
          default: "'automatic'",
          description:
            'When automatic, tabs are activated when receiving focus. When manual, tabs are activated when clicked.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      events: [
        {
          name: 'valueChange',
          type: 'EventEmitter<string>',
          description: 'Event handler called when the value changes.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-orientation]',
          values: '"horizontal" | "vertical"',
        },
      ],
    },
    {
      name: 'List',
      description: 'Contains the triggers that are aligned along the edge of the active content.',
      props: [
        {
          name: 'loop',
          type: 'boolean',
          default: 'true',
          description:
            'When true, keyboard navigation will loop from last tab to first, and vice versa.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-orientation]',
          values: '"horizontal" | "vertical"',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'The button that activates its associated content.',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'A unique value that associates the trigger with a content.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from interacting with the tab.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"active" | "inactive"' },
        { name: '[data-disabled]', values: 'Present when disabled' },
        { name: '[data-orientation]', values: '"horizontal" | "vertical"' },
      ],
    },
    {
      name: 'Content',
      description: 'Contains the content associated with each trigger.',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'A unique value that associates the content with a trigger.',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description:
            'Used to force mounting when more control is needed. Useful when controlling animation with Angular animation libraries.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"active" | "inactive"' },
        { name: '[data-orientation]', values: '"horizontal" | "vertical"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple tabs component with two panels.',
      code: `<Tabs defaultValue="account" class="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Make changes to your account here.</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Change your password here.</p>
  </TabsContent>
</Tabs>`,
      hasDemo: true,
    },
    {
      title: 'Vertical orientation',
      description: 'Use the orientation prop for vertical tabs.',
      code: `<Tabs defaultValue="tab1" orientation="vertical" class="flex gap-4">
  <TabsList class="flex-col h-auto">
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <div class="flex-1">
    <TabsContent value="tab1">Content 1</TabsContent>
    <TabsContent value="tab2">Content 2</TabsContent>
    <TabsContent value="tab3">Content 3</TabsContent>
  </div>
</Tabs>`,
    },
    {
      title: 'Controlled',
      description: 'Control the active tab from outside the component.',
      code: `// In your component:
activeTab = signal('account');

// In template:
<Tabs [value]="activeTab()" (valueChange)="activeTab.set($event)">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
  <TabsContent value="password">Password content</TabsContent>
</Tabs>

<Button (click)="activeTab.set('password')">Go to Password</Button>`,
    },
    {
      title: 'Manual activation',
      description:
        'By default, tabs activate automatically on focus. Set activationMode to manual to require a click.',
      code: `<Tabs defaultValue="tab1" activationMode="manual">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Focus with arrow keys, then press Enter to activate.
  </TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Tabs WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/',
    keyboardInteractions: [
      {
        key: 'Tab',
        description: 'When focus moves onto the tabs, focuses the active trigger.',
      },
      {
        key: 'ArrowDown',
        description:
          'Moves focus to the next trigger (vertical orientation) and activates its associated content.',
      },
      {
        key: 'ArrowRight',
        description:
          'Moves focus to the next trigger (horizontal orientation) and activates its associated content.',
      },
      {
        key: 'ArrowUp',
        description:
          'Moves focus to the previous trigger (vertical orientation) and activates its associated content.',
      },
      {
        key: 'ArrowLeft',
        description:
          'Moves focus to the previous trigger (horizontal orientation) and activates its associated content.',
      },
      {
        key: 'Home',
        description: 'Moves focus to the first trigger and activates its associated content.',
      },
      {
        key: 'End',
        description: 'Moves focus to the last trigger and activates its associated content.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/tree/main/src/app/lib/components/ui/tabs',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/',
      icon: 'docs',
    },
  ],
};
