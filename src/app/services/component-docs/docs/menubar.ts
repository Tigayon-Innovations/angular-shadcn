/**
 * Menubar Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const MENUBAR_DOCUMENTATION: ComponentDocumentation = {
  name: 'Menubar',
  slug: 'menubar',
  description:
    'A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.',

  features: [
    { text: 'Full keyboard navigation.', highlight: true },
    { text: 'Supports submenus with configurable reading direction.' },
    { text: 'Supports items, labels, groups of items.', highlight: true },
    { text: 'Supports checkable items (single and multiple).' },
    { text: 'Typeahead character navigation.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/menubar',
      pnpm: 'pnpm add @ng-cn/menubar',
      yarn: 'yarn add @ng-cn/menubar',
      bun: 'bun add @ng-cn/menubar',
    },
    ngAdd: 'ng g @ng-cn/core:c menubar',
  },

  anatomy: {
    importStatement: `import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarShortcut
} from '@/ui/menubar';`,
    structure: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger />
    <MenubarContent>
      <MenubarItem />
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger />
        <MenubarSubContent />
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of a menubar.',
      props: [
        {
          name: 'loop',
          type: 'boolean',
          default: 'true',
          description:
            'When true, keyboard navigation will loop from last item to first and vice versa.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'Menu',
      description: 'A top-level menu item, contains a trigger and content.',
      props: [],
      notes: ['Automatically registers with parent menubar for keyboard navigation.'],
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
        { name: '[data-highlighted]', values: 'Present when focused' },
      ],
    },
    {
      name: 'Content',
      description: 'The component that pops out when a menu is open.',
      props: [
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          default: "'start'",
          description: 'The preferred alignment against the trigger.',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '8',
          description: 'The distance in pixels from the trigger.',
        },
        {
          name: 'alignOffset',
          type: 'number',
          default: '-4',
          description: 'An offset in pixels from the alignment option.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [{ name: '[data-state]', values: '"open" | "closed"' }],
    },
    {
      name: 'Item',
      description: 'A menubar item.',
      props: [
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from interacting with the item.',
        },
        {
          name: 'inset',
          type: 'boolean',
          default: 'false',
          description: 'When true, adds padding to align with checkbox/radio items.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      events: [
        {
          name: 'onSelect',
          type: 'EventEmitter<void>',
          description: 'Event handler called when the item is selected.',
        },
      ],
      dataAttributes: [
        { name: '[data-highlighted]', values: 'Present when focused' },
        { name: '[data-disabled]', values: 'Present when disabled' },
      ],
    },
    {
      name: 'CheckboxItem',
      description: 'A menubar item that can be checked.',
      props: [
        {
          name: 'checked',
          type: 'boolean',
          description: 'The controlled checked state.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from interacting with the item.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      events: [
        {
          name: 'checkedChange',
          type: 'EventEmitter<boolean>',
          description: 'Event handler called when the checked state changes.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"checked" | "unchecked"' },
        { name: '[data-highlighted]', values: 'Present when focused' },
        { name: '[data-disabled]', values: 'Present when disabled' },
      ],
    },
    {
      name: 'RadioGroup',
      description: 'Group of menubar radio items.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'The value of the selected item.',
        },
      ],
      events: [
        {
          name: 'valueChange',
          type: 'EventEmitter<string>',
          description: 'Event handler called when the value changes.',
        },
      ],
    },
    {
      name: 'RadioItem',
      description: 'A menubar item that is part of a radio group.',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'The unique value of the item.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents the user from interacting with the item.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"checked" | "unchecked"' },
        { name: '[data-highlighted]', values: 'Present when focused' },
        { name: '[data-disabled]', values: 'Present when disabled' },
      ],
    },
    {
      name: 'Sub',
      description: 'Contains a submenu.',
      props: [],
    },
    {
      name: 'SubTrigger',
      description: 'The item that opens a submenu.',
      props: [
        {
          name: 'inset',
          type: 'boolean',
          default: 'false',
          description: 'When true, adds padding to align with checkbox/radio items.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-highlighted]', values: 'Present when focused' },
      ],
    },
    {
      name: 'SubContent',
      description: 'The component that pops out when a submenu is open.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
      dataAttributes: [{ name: '[data-state]', values: '"open" | "closed"' }],
    },
    {
      name: 'Separator',
      description: 'Used to visually separate items.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'Label',
      description: 'Used to render a label.',
      props: [
        {
          name: 'inset',
          type: 'boolean',
          default: 'false',
          description: 'When true, adds padding to align with checkbox/radio items.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
    {
      name: 'Shortcut',
      description: 'Displays keyboard shortcut hint.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply.',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A menubar with File and Edit menus.',
      code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        New Window <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>
        Print <MenubarShortcut>⌘P</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
      hasDemo: true,
    },
    {
      title: 'With checkbox and radio items',
      description: 'View menu with checkbox and radio options.',
      code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>View</MenubarTrigger>
    <MenubarContent>
      <MenubarCheckboxItem [(checked)]="showToolbar">
        Show Toolbar
      </MenubarCheckboxItem>
      <MenubarCheckboxItem [(checked)]="showSidebar">
        Show Sidebar
      </MenubarCheckboxItem>
      <MenubarSeparator />
      <MenubarLabel>Appearance</MenubarLabel>
      <MenubarRadioGroup [(value)]="theme">
        <MenubarRadioItem value="light">Light</MenubarRadioItem>
        <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
        <MenubarRadioItem value="system">System</MenubarRadioItem>
      </MenubarRadioGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    },
    {
      title: 'With submenus',
      description: 'Menubar with nested submenus.',
      code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Cut</MenubarItem>
      <MenubarItem>Copy</MenubarItem>
      <MenubarItem>Paste</MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>Find</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>Find...</MenubarItem>
          <MenubarItem>Find Next</MenubarItem>
          <MenubarItem>Find Previous</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Menu Bar WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/menubar/',
    keyboardInteractions: [
      {
        key: 'Space',
        description: 'Activates the focused item.',
      },
      {
        key: 'Enter',
        description: 'Activates the focused item.',
      },
      {
        key: 'ArrowDown',
        description: 'Opens menu, moves focus to next item.',
      },
      {
        key: 'ArrowUp',
        description: 'Moves focus to previous item.',
      },
      {
        key: 'ArrowRight',
        description: 'Moves focus to next menu, or opens submenu.',
      },
      {
        key: 'ArrowLeft',
        description: 'Moves focus to previous menu, or closes submenu.',
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
        description: 'Closes the open menu.',
      },
      {
        key: 'A-Z / a-z',
        description: 'Moves focus to item starting with typed character.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/menubar',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA design pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menubar/',
      icon: 'docs',
    },
  ],
};
