/**
 * Command Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 */

import type { ComponentDocumentation } from '../types';

export const COMMAND_DOCUMENTATION: ComponentDocumentation = {
  name: 'Command',
  slug: 'command',
  description:
    'A command palette component for fast keyboard-driven search and navigation. Implements the ARIA combobox pattern with live filtering, keyboard navigation, grouped items, and an optional modal dialog variant.',

  features: [
    { text: 'Real-time fuzzy filtering with customisable filter function.', highlight: true },
    { text: 'Full keyboard navigation: arrow keys, Home, End, Enter to select.', highlight: true },
    { text: 'Groups automatically collapse when all items are filtered out.' },
    { text: 'CommandDialog wraps the palette in an animated modal overlay.' },
    { text: 'CommandShortcut displays keyboard hint badges inside items.' },
    { text: 'Supports disabled items and keyword-based search boosting.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/command',
      pnpm: 'pnpm add @ng-cn/command',
      yarn: 'yarn add @ng-cn/command',
      bun: 'bun add @ng-cn/command',
    },
    ngAdd: 'ng g @ng-cn/core:c command',
  },

  anatomy: {
    importStatement: `import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog
} from '@/ui/command';`,
    structure: `<Command>
  <CommandInput />
  <CommandList>
    <CommandEmpty />
    <CommandGroup>
      <CommandItem>
        <CommandShortcut />
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup>
      <CommandItem />
    </CommandGroup>
  </CommandList>
</Command>`,
  },

  apiReference: [
    {
      name: 'Command',
      description:
        'Root container. Provides the shared command context (search state, item registry, filter function) to all descendants.',
      props: [
        {
          name: 'filter',
          type: '((value: string, search: string, keywords?: string[]) => number) | undefined',
          default: 'undefined',
          description:
            'Custom filter function. Return a score between 0 (hidden) and 1 (exact match). Defaults to a built-in prefix/contains scorer.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the command root.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"command"' },
      ],
    },
    {
      name: 'CommandInput',
      description:
        'Search input with a leading search icon. Implements the ARIA combobox role and drives keyboard navigation.',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          default: "'Search...'",
          description: 'Placeholder text shown inside the input.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the input element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"command-input-wrapper"' },
      ],
      notes: [
        'Automatically focuses on mount.',
        'ArrowDown / ArrowUp move the virtual focus through visible items.',
        'Enter triggers a click on the currently focused item.',
      ],
    },
    {
      name: 'CommandList',
      description:
        'Scrollable container for all groups and items. Has role="listbox" and a max height of 300 px.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the list.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"command-list"' },
      ],
    },
    {
      name: 'CommandEmpty',
      description: 'Shown when no items match the current search. Always rendered; style or hide with @if.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the empty state.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"command-empty"' },
      ],
    },
    {
      name: 'CommandGroup',
      description:
        'Groups related items under an optional heading. Automatically hidden when all child items are filtered out.',
      props: [
        {
          name: 'heading',
          type: 'string',
          default: "''",
          description: 'Optional heading label rendered above the group items.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the group container.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"command-group"' },
        { name: '[hidden]', values: 'Present when all items in the group are filtered out' },
      ],
    },
    {
      name: 'CommandItem',
      description:
        'A selectable option inside a CommandGroup or CommandList. Implements role="option" with roving virtual focus.',
      props: [
        {
          name: 'value',
          type: 'string',
          default: "''",
          description: 'Unique value used for filtering and for the onSelect output.',
        },
        {
          name: 'keywords',
          type: 'string[]',
          default: '[]',
          description: 'Extra search keywords appended to the value string during filtering.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, the item is not clickable and not reachable via keyboard.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the item.',
        },
      ],
      events: [
        {
          name: 'onSelect',
          type: 'string',
          description: 'Emitted with the item value when the item is clicked or activated via Enter.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"command-item"' },
        { name: '[data-selected]', values: 'Present when the item is virtually focused' },
        { name: '[data-disabled]', values: 'Present when disabled is true' },
        { name: '[hidden]', values: 'Present when the item is filtered out' },
        { name: '[aria-selected]', values: 'true when virtually focused' },
        { name: '[aria-disabled]', values: 'true when disabled' },
      ],
    },
    {
      name: 'CommandSeparator',
      description: 'A thin horizontal rule used to visually separate groups.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the separator.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"command-separator"' },
      ],
    },
    {
      name: 'CommandShortcut',
      description:
        'Displays a keyboard shortcut hint aligned to the right inside a CommandItem.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the shortcut element.',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"command-shortcut"' },
      ],
    },
    {
      name: 'CommandDialog',
      description:
        'A modal overlay that wraps Command with animated open/close transitions. Pressing Escape closes it.',
      props: [
        {
          name: 'open',
          type: 'boolean',
          default: 'false',
          description: 'Controls whether the dialog is visible.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the dialog panel.',
        },
      ],
      events: [
        {
          name: 'openChange',
          type: 'boolean',
          description:
            'Emitted with false when the user closes the dialog (backdrop click or Escape key).',
        },
      ],
      dataAttributes: [
        { name: '[data-slot]', values: '"command-dialog"' },
        { name: '[data-state]', values: '"open" | "closed"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A command palette with grouped items and an empty state.',
      hasDemo: true,
      code: `<Command class="rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem value="calendar">Calendar</CommandItem>
      <CommandItem value="search-emoji">Search Emoji</CommandItem>
      <CommandItem value="calculator">Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem value="profile">Profile</CommandItem>
      <CommandItem value="billing">Billing</CommandItem>
      <CommandItem value="settings">Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    },
    {
      title: 'With keyboard shortcuts',
      description: 'Display keyboard hint badges using CommandShortcut.',
      code: `<Command class="rounded-lg border shadow-md">
  <CommandInput placeholder="Search commands..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem value="new-file">
        New File
        <CommandShortcut>⌘N</CommandShortcut>
      </CommandItem>
      <CommandItem value="open-file">
        Open File
        <CommandShortcut>⌘O</CommandShortcut>
      </CommandItem>
      <CommandItem value="save">
        Save
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    },
    {
      title: 'Dialog',
      description: 'Open the command palette in a modal dialog triggered by a keyboard shortcut.',
      code: `// In your component:
open = signal(false);

constructor() {
  // Toggle with ⌘K / Ctrl+K
}

// In your template:
<Button (click)="open.set(true)">Open Command Menu</Button>

<CommandDialog [open]="open()" (openChange)="open.set($event)">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem value="calendar" (onSelect)="open.set(false)">
        Calendar
      </CommandItem>
      <CommandItem value="settings" (onSelect)="open.set(false)">
        Settings
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`,
    },
    {
      title: 'With search keywords',
      description: 'Boost item discoverability by supplying extra keywords.',
      code: `<Command class="rounded-lg border shadow-md">
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>Nothing found.</CommandEmpty>
    <CommandGroup heading="People">
      <CommandItem value="alice" [keywords]="['engineer', 'frontend']">
        Alice — Frontend Engineer
      </CommandItem>
      <CommandItem value="bob" [keywords]="['designer', 'ux']">
        Bob — UX Designer
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    },
    {
      title: 'Custom filter function',
      description: 'Supply your own scoring logic via the filter input.',
      code: `// In your component:
exactFilter = (value: string, search: string): number => {
  return value.toLowerCase() === search.toLowerCase() ? 1 : 0;
};

// In your template:
<Command [filter]="exactFilter" class="rounded-lg border shadow-md">
  <CommandInput placeholder="Exact match only..." />
  <CommandList>
    <CommandEmpty>No exact match.</CommandEmpty>
    <CommandGroup>
      <CommandItem value="foo">foo</CommandItem>
      <CommandItem value="bar">bar</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Combobox WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/',
    keyboardInteractions: [
      {
        key: 'ArrowDown',
        description: 'Moves virtual focus to the next visible item in the list.',
      },
      {
        key: 'ArrowUp',
        description: 'Moves virtual focus to the previous visible item. Wraps to the last item.',
      },
      {
        key: 'Home',
        description: 'Moves virtual focus to the first visible item.',
      },
      {
        key: 'End',
        description: 'Moves virtual focus to the last visible item.',
      },
      {
        key: 'Enter',
        description: 'Activates the currently focused item, triggering its onSelect output.',
      },
      {
        key: 'Escape',
        description: 'Closes the CommandDialog when it is open.',
      },
      {
        key: 'Tab',
        description: 'Moves browser focus to the next focusable element outside the command.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/command',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'ARIA combobox pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/',
      icon: 'docs',
    },
  ],
};
