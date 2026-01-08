/**
 * Context Menu Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 * Matches Radix UI and shadcn/ui implementations exactly
 */

import type { ComponentDocumentation } from '../types';

export const CONTEXT_MENU_DOCUMENTATION: ComponentDocumentation = {
  name: 'Context Menu',
  slug: 'context-menu',
  description:
    'A menu that opens on right-click or keyboard shortcut. Follows the menu button pattern, providing context-specific actions for a targeted area.',

  features: [
    { text: 'Full keyboard navigation with arrow keys.', highlight: true },
    { text: 'Supports submenus with nested navigation.', highlight: true },
    { text: 'Checkbox and radio group items.' },
    { text: 'Type-ahead search for quick navigation.' },
    { text: 'Supports keyboard trigger (Shift+F10 or ContextMenu key).' },
    { text: 'Automatic positioning with overflow detection.' },
    { text: 'Focus management with roving tabindex.' },
    { text: 'Accessible labels and ARIA attributes.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/context-menu',
      pnpm: 'pnpm add @ng-cn/context-menu',
      yarn: 'yarn add @ng-cn/context-menu',
      bun: 'bun add @ng-cn/context-menu',
    },
    ngAdd: 'ng g @ng-cn/core:c context-menu',
  },

  anatomy: {
    importStatement: `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuRadioGroup
} from '@/ui/context-menu';`,
    structure: `<ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>
      Edit
      <ContextMenuShortcut>⌘E</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Save Page As...</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of a context menu.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the context menu root.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-state]',
          values: '"open" | "closed"',
        },
      ],
    },
    {
      name: 'Trigger',
      description: 'The element that opens the context menu on right-click.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes.',
        },
      ],
      notes: [
        'Right-click (contextmenu event) opens the menu.',
        'Shift+F10 or ContextMenu key opens the menu.',
        'Focus is required for keyboard triggers.',
      ],
    },
    {
      name: 'Content',
      description: 'The dropdown menu content containing the menu items.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to customize menu appearance.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-state]',
          values: '"open" | "closed"',
        },
      ],
      notes: [
        'Positioned at the mouse coordinates.',
        'Supports arrow key navigation.',
        'Escape key closes the menu.',
        'Tab key closes and moves focus naturally.',
        'Supports typeahead search by typing characters.',
      ],
    },
    {
      name: 'Item',
      description: 'A single menu item.',
      props: [
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents interaction with the item.',
        },
        {
          name: 'inset',
          type: 'boolean',
          default: 'false',
          description: 'When true, adds extra left padding (for alignment).',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes.',
        },
      ],
      events: [
        {
          name: 'onSelect',
          type: 'EventEmitter<void>',
          description: 'Emitted when the menu item is selected.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-disabled]',
          values: '""',
          description: 'Present when item is disabled.',
        },
      ],
    },
    {
      name: 'CheckboxItem',
      description: 'A menu item with a checkbox.',
      props: [
        {
          name: 'checked',
          type: 'boolean',
          default: 'false',
          description: 'The checked state of the checkbox item.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents interaction.',
        },
        {
          name: 'inset',
          type: 'boolean',
          default: 'false',
          description: 'When true, adds extra left padding.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes.',
        },
      ],
      events: [
        {
          name: 'checkedChange',
          type: 'EventEmitter<boolean>',
          description: 'Emitted when the checkbox state changes.',
        },
        {
          name: 'onSelect',
          type: 'EventEmitter<void>',
          description: 'Emitted when the menu item is selected.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-state]',
          values: '"checked" | "unchecked"',
        },
        {
          name: '[data-disabled]',
          values: '""',
          description: 'Present when item is disabled.',
        },
      ],
    },
    {
      name: 'RadioGroup',
      description: 'A group of radio menu items.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'The currently selected radio item value.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes.',
        },
      ],
      events: [
        {
          name: 'valueChange',
          type: 'EventEmitter<string>',
          description: 'Emitted when the selected radio item changes.',
        },
      ],
    },
    {
      name: 'RadioItem',
      description: 'A menu item with a radio button.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'The value of the radio item.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents interaction.',
        },
        {
          name: 'inset',
          type: 'boolean',
          default: 'false',
          description: 'When true, adds extra left padding.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes.',
        },
      ],
      events: [
        {
          name: 'onSelect',
          type: 'EventEmitter<void>',
          description: 'Emitted when the menu item is selected.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-state]',
          values: '"checked" | "unchecked"',
        },
        {
          name: '[data-disabled]',
          values: '""',
          description: 'Present when item is disabled.',
        },
      ],
    },
    {
      name: 'Label',
      description: 'A non-interactive label for menu items.',
      props: [
        {
          name: 'inset',
          type: 'boolean',
          default: 'false',
          description: 'When true, adds extra left padding for alignment.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes.',
        },
      ],
    },
    {
      name: 'Separator',
      description: 'A visual separator between menu items.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes.',
        },
      ],
    },
    {
      name: 'Shortcut',
      description: 'A keyboard shortcut display for menu items.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes.',
        },
      ],
      notes: ['Purely presentational - does not trigger the shortcut.'],
    },
    {
      name: 'Sub',
      description: 'Container for a submenu.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes.',
        },
      ],
    },
    {
      name: 'SubTrigger',
      description: 'The item that opens a submenu.',
      props: [
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'When true, prevents interaction.',
        },
        {
          name: 'inset',
          type: 'boolean',
          default: 'false',
          description: 'When true, adds extra left padding.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-state]',
          values: '"open" | "closed"',
        },
        {
          name: '[data-disabled]',
          values: '""',
          description: 'Present when item is disabled.',
        },
      ],
      notes: ['Arrow key (right) opens submenu, arrow key (left) closes it.'],
    },
    {
      name: 'SubContent',
      description: 'The content of a submenu.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-state]',
          values: '"open" | "closed"',
        },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic context menu',
      description: 'A simple context menu with basic menu items.',
      code: `<ContextMenu>
  <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Back</ContextMenuItem>
    <ContextMenuItem>Forward</ContextMenuItem>
    <ContextMenuItem>Reload</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Print...</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
      hasDemo: true,
    },
    {
      title: 'With keyboard shortcut display',
      description: 'Context menu items with visible keyboard shortcuts.',
      code: `<ContextMenu>
  <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
    Right click for options
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>
      Edit
      <ContextMenuShortcut>⌘E</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      Duplicate
      <ContextMenuShortcut>⌘D</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>
      Delete
      <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    },
    {
      title: 'With submenus',
      description: 'Nested context menus with arrow key navigation.',
      code: `<ContextMenu>
  <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
    Right click for more options
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>View Page Source</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Email link</ContextMenuItem>
        <ContextMenuItem>Messages</ContextMenuItem>
        <ContextMenuItem>Notes</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuItem>
      Save Page As...
      <ContextMenuShortcut>⌘S</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    },
    {
      title: 'With checkbox items',
      description: 'Checkbox items for toggling options in a context menu.',
      code: `// In your component class:
showBookmarks = signal(false);
showFullUrls = signal(true);

// In your template:
<ContextMenu>
  <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
    Right click for settings
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuCheckboxItem
      [checked]="showBookmarks()"
      (checkedChange)="showBookmarks.set($event)"
    >
      Show Bookmarks
    </ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem
      [checked]="showFullUrls()"
      (checkedChange)="showFullUrls.set($event)"
    >
      Show Full URLs
    </ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>`,
    },
    {
      title: 'With radio group',
      description: 'Radio items for selecting one option from a group.',
      code: `// In your component class:
viewMode = signal('list');

// In your template:
<ContextMenu>
  <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
    Right click to change view
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>View Mode</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuRadioGroup
      [value]="viewMode()"
      (valueChange)="viewMode.set($event)"
    >
      <ContextMenuRadioItem value="list">List View</ContextMenuRadioItem>
      <ContextMenuRadioItem value="grid">Grid View</ContextMenuRadioItem>
      <ContextMenuRadioItem value="compact">Compact View</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>`,
    },
    {
      title: 'Complex menu',
      description: 'A feature-rich context menu with labels, items, separators, and submenus.',
      code: `// In your component class:
isLocked = signal(false);
fileType = signal('pdf');

// In your template:
<ContextMenu>
  <ContextMenuTrigger class="flex h-[200px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
    Right click on this file
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>
      Open
      <ContextMenuShortcut>⏎</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      Open With
      <ContextMenuShortcut>⌘↵</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Edit</ContextMenuItem>
    <ContextMenuItem>Rename</ContextMenuItem>
    <ContextMenuCheckboxItem
      [checked]="isLocked()"
      (checkedChange)="isLocked.set($event)"
    >
      Lock
    </ContextMenuCheckboxItem>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger>Convert to</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuRadioGroup
          [value]="fileType()"
          (valueChange)="fileType.set($event)"
        >
          <ContextMenuRadioItem value="pdf">PDF</ContextMenuRadioItem>
          <ContextMenuRadioItem value="docx">Word Document</ContextMenuRadioItem>
          <ContextMenuRadioItem value="xlsx">Excel Sheet</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuItem class="text-destructive">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    },
    {
      title: 'Disabled items',
      description: 'Context menu with disabled items for unavailable actions.',
      code: `// In your component class:
canDelete = signal(false);

// In your template:
<ContextMenu>
  <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
    Right click - some items are disabled
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Cut</ContextMenuItem>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem [disabled]="true">
      Duplicate (Locked file)
    </ContextMenuItem>
    <ContextMenuItem [disabled]="!canDelete()">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Menu and Menubar WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu',
    keyboardInteractions: [
      {
        key: 'Space',
        description: 'When focus is on an item, activates the item or opens a submenu.',
      },
      {
        key: 'Enter',
        description: 'When focus is on an item, activates the item or opens a submenu.',
      },
      {
        key: 'ArrowDown',
        description: 'Moves focus to the next menu item.',
      },
      {
        key: 'ArrowUp',
        description: 'Moves focus to the previous menu item.',
      },
      {
        key: 'ArrowRight',
        description: 'When on a SubTrigger, opens the submenu or moves focus into it.',
      },
      {
        key: 'ArrowLeft',
        description: 'When in a submenu, closes the submenu and returns to the parent menu.',
      },
      {
        key: 'Home',
        description: 'Moves focus to the first menu item.',
      },
      {
        key: 'End',
        description: 'Moves focus to the last menu item.',
      },
      {
        key: 'Tab',
        description: 'Closes the menu and moves focus to the next focusable element.',
      },
      {
        key: 'Escape',
        description: 'Closes the menu and returns focus to the trigger element.',
      },
      {
        key: 'Shift + F10',
        description: 'Opens the context menu on the trigger element (Windows convention).',
      },
      {
        key: 'ContextMenu',
        description: 'Opens the context menu on the trigger element (keyboard-only users).',
      },
      {
        key: 'Character',
        description: 'Types a character to jump to the next menu item starting with that letter.',
      },
    ],
    ariaAttributes: [
      {
        name: 'role="menu"',
        description: 'Applied to the content element to identify it as a menu.',
      },
      {
        name: 'role="menuitem"',
        description: 'Applied to regular menu items.',
      },
      {
        name: 'role="menuitemcheckbox"',
        description: 'Applied to checkbox menu items.',
      },
      {
        name: 'role="menuitemradio"',
        description: 'Applied to radio menu items.',
      },
      {
        name: 'aria-disabled',
        description: 'Indicates whether a menu item is disabled.',
      },
      {
        name: 'aria-checked',
        description: 'Indicates the checked state of checkbox and radio items.',
      },
      {
        name: 'aria-orientation="vertical"',
        description: 'Applied to the content to indicate vertical menu orientation.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/context-menu',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'Radix Context Menu',
      url: 'https://www.radix-ui.com/primitives/docs/components/context-menu',
      icon: 'docs',
    },
    {
      text: 'Menu WAI-ARIA pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu',
      icon: 'docs',
    },
  ],
};
