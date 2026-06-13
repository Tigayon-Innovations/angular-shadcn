/**
 * NavigationMenu Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const NAVIGATION_MENU_DOCUMENTATION: ComponentDocumentation = {
  name: 'Navigation Menu',
  slug: 'navigation-menu',
  description: 'A collection of links for navigating websites.',

  features: [
    { text: 'Can be controlled or uncontrolled.', highlight: true },
    { text: 'Flexible layout structure.' },
    { text: 'Supports submenus.', highlight: true },
    { text: 'Optional active item indicator.' },
    { text: 'Full keyboard navigation.' },
    { text: 'Supports Right to Left direction.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/navigation-menu',
      pnpm: 'pnpm add @ng-cn/navigation-menu',
      yarn: 'yarn add @ng-cn/navigation-menu',
      bun: 'bun add @ng-cn/navigation-menu',
    },
    ngAdd: 'ng g @ng-cn/core:c navigation-menu',
  },

  anatomy: {
    importStatement: `import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from '@/ui/navigation-menu';`,
    structure: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger />
      <NavigationMenuContent />
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink />
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuIndicator />
  <NavigationMenuViewport />
</NavigationMenu>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of a navigation menu.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'The controlled value of the menu item to activate.',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'The value of the menu item to activate when initially rendered.',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'The orientation of the menu.',
        },
        {
          name: 'delayDuration',
          type: 'number',
          default: '200',
          description: 'The duration from when the mouse enters a trigger until content opens.',
        },
        {
          name: 'skipDelayDuration',
          type: 'number',
          default: '300',
          description: 'Time to enter another trigger without incurring delay again.',
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
      dataAttributes: [{ name: '[data-orientation]', values: '"horizontal" | "vertical"' }],
    },
    {
      name: 'List',
      description: 'Contains the top level menu items.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [{ name: '[data-orientation]', values: '"horizontal" | "vertical"' }],
    },
    {
      name: 'Item',
      description: 'A top level menu item, contains a link or trigger with content combination.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'A unique value that associates this item with a content.',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'The button that toggles the content.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-disabled]', values: 'Present when disabled' },
      ],
    },
    {
      name: 'Content',
      description: 'Contains the content associated with each trigger.',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Used to force mounting when more control is needed.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-motion]', values: '"from-start" | "from-end" | "to-start" | "to-end"' },
      ],
    },
    {
      name: 'Link',
      description: 'A navigation link.',
      props: [
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: 'When true, indicates the link is active.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [{ name: '[data-active]', values: 'Present when active' }],
    },
    {
      name: 'Indicator',
      description: 'An optional indicator element that highlights the current active item.',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Used to force mounting when more control is needed.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"visible" | "hidden"' },
        { name: '[data-orientation]', values: '"horizontal" | "vertical"' },
      ],
    },
    {
      name: 'Viewport',
      description: 'An optional viewport element for positioning the content.',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Used to force mounting when more control is needed.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-orientation]', values: '"horizontal" | "vertical"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A navigation menu with dropdown content.',
      code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li class="row-span-3">
            <NavigationMenuLink routerLink="/">
              <div class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                <div class="mb-2 mt-4 text-lg font-medium">
                  shadcn/ui
                </div>
                <p class="text-sm leading-tight text-muted-foreground">
                  Beautifully designed components built with Radix UI and Tailwind CSS.
                </p>
              </div>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink routerLink="/docs">
              Introduction
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink routerLink="/docs/installation">
              Installation
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink [class]="navigationMenuTriggerStyle()" routerLink="/about">
        About
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
      hasDemo: true,
    },
    {
      title: 'With components list',
      description: 'Display a grid of component links.',
      code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          @for (component of components; track component.title) {
            <li>
              <NavigationMenuLink [routerLink]="component.href">
                <div class="text-sm font-medium leading-none">
                  {{ component.title }}
                </div>
                <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {{ component.description }}
                </p>
              </NavigationMenuLink>
            </li>
          }
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    },
    {
      title: 'Simple links',
      description: 'Navigation menu with simple links (no dropdown).',
      code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink [class]="navigationMenuTriggerStyle()" routerLink="/">
        Home
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink [class]="navigationMenuTriggerStyle()" routerLink="/about">
        About
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink [class]="navigationMenuTriggerStyle()" routerLink="/contact">
        Contact
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    },
    {
      title: 'With indicator',
      description: 'Navigation menu with active indicator.',
      code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <!-- Content -->
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuIndicator />
</NavigationMenu>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Disclosure Navigation Menu WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/',
    keyboardInteractions: [
      {
        key: 'Space',
        description: 'When focus is on trigger, opens/closes the content.',
      },
      {
        key: 'Enter',
        description:
          'When focus is on trigger, opens/closes the content. When on link, follows the link.',
      },
      {
        key: 'Tab',
        description: 'Moves focus between trigger and content.',
      },
      {
        key: 'ArrowDown',
        description: 'Opens the content (horizontal). Moves to next item (vertical).',
      },
      {
        key: 'ArrowUp',
        description: 'Moves to previous item (vertical).',
      },
      {
        key: 'ArrowRight',
        description: 'Moves to next trigger (horizontal). Opens submenu (vertical).',
      },
      {
        key: 'ArrowLeft',
        description: 'Moves to previous trigger (horizontal). Closes submenu (vertical).',
      },
      {
        key: 'Home',
        description: 'Moves focus to first item.',
      },
      {
        key: 'End',
        description: 'Moves focus to last item.',
      },
      {
        key: 'Escape',
        description: 'Closes the open content.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/tree/main/src/app/lib/components/ui/navigation-menu',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/Tigayon-Innovations/angular-shadcn/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/',
      icon: 'docs',
    },
  ],
};
