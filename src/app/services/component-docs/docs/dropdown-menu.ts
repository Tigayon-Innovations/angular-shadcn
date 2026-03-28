/**
 * Dropdown Menu Component Documentation
 * Radix-like comprehensive documentation following WAI-ARIA patterns
 * Based on Radix UI and shadcn/ui specifications
 */

import type { ComponentDocumentation } from '../types';

export const DROPDOWN_MENU_DOCUMENTATION: ComponentDocumentation = {
  name: 'Dropdown Menu',
  slug: 'dropdown-menu',
  description:
    'Displays a menu to the user—such as a set of actions or functions—triggered by a button. Supports submenus, checkable items, radio groups, and full keyboard navigation.',

  features: [
    { text: 'Can be controlled or uncontrolled.', highlight: true },
    { text: 'Supports submenus with configurable reading direction.', highlight: true },
    { text: 'Supports items, labels, groups of items.' },
    {
      text: 'Supports checkable items (single or multiple) with optional indeterminate state.',
      highlight: true,
    },
    { text: 'Supports modal and non-modal modes.' },
    { text: 'Customize side, alignment, offsets, collision handling.' },
    { text: 'Optionally render a pointing arrow.' },
    { text: 'Focus is fully managed.' },
    { text: 'Full keyboard navigation.' },
    { text: 'Typeahead support.' },
    { text: 'Dismissing and layering behavior is highly customizable.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/dropdown-menu',
      pnpm: 'pnpm add @ng-cn/dropdown-menu',
      yarn: 'yarn add @ng-cn/dropdown-menu',
      bun: 'bun add @ng-cn/dropdown-menu',
    },
    ngAdd: 'ng g @ng-cn/core:c dropdown-menu',
  },

  anatomy: {
    importStatement: `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from '@/ui/dropdown-menu';`,
    structure: `<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Action</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Group Label</DropdownMenuLabel>
    <DropdownMenuGroup>
      <DropdownMenuItem>Sub Action</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuCheckboxItem checked={true}>
      Checkbox Item
    </DropdownMenuCheckboxItem>
    <DropdownMenuRadioGroup value="option1">
      <DropdownMenuRadioItem value="option1">
        Radio Option 1
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Sub Item</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>`,
  },

  apiReference: [
    {
      name: 'Root',
      description: 'Contains all the parts of a dropdown menu.',
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: 'The controlled open state of the dropdown menu. Use with (openChange).',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description:
            'The open state when the dropdown menu is initially rendered. Use when you do not need to control its open state.',
        },
        {
          name: 'modal',
          type: 'boolean',
          default: 'true',
          description:
            'When true, the menu operates in modal mode (prevents interaction outside). When false, allows interaction with other elements.',
        },
        {
          name: 'dir',
          type: "'ltr' | 'rtl'",
          description:
            'The reading direction of the dropdown menu when its content overflows. Defaults to inheriting from the document.',
        },
      ],
      dataAttributes: [{ name: '[data-state]', values: '"open" | "closed"' }],
    },
    {
      name: 'Trigger',
      description:
        'The button that toggles the dropdown menu. By default, the DropdownMenuContent will position itself against the trigger.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child, merging their props and behavior.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-disabled]', values: 'Present when disabled' },
      ],
    },
    {
      name: 'Portal',
      description:
        'When used, portals the content part into the body. This is useful for avoiding stacking context issues.',
      props: [
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Used to force mounting when more control is needed.',
        },
        {
          name: 'container',
          type: 'HTMLElement',
          default: 'document.body',
          description: 'The element to portal into. Defaults to the body.',
        },
      ],
    },
    {
      name: 'Content',
      description: 'The component that pops out when the dropdown menu is open.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child, merging their props and behavior.',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'false',
          description:
            'When true, keyboard navigation will loop from last item to first, and vice versa.',
        },
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          default: "'bottom'",
          description: 'The preferred side of the trigger to render against.',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '0',
          description: 'The distance in pixels from the trigger to the content.',
        },
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          default: "'start'",
          description:
            'The preferred alignment against the trigger. May change when collisions occur.',
        },
        {
          name: 'alignOffset',
          type: 'number',
          default: '0',
          description: 'An offset in pixels from the start or end alignment option.',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          default: 'true',
          description:
            'When true, overrides the side and align preferences to avoid collisions with boundary edges.',
        },
        {
          name: 'collisionBoundary',
          type: 'Element | null | Element[]',
          default: '[]',
          description:
            'Element used to calculate available space. By default uses the viewport. Pass null to disable boundary checks.',
        },
        {
          name: 'collisionPadding',
          type: 'number | Partial<Record<Side, number>>',
          default: '0',
          description:
            'The distance in pixels from the boundary edges where collision detection should occur.',
        },
        {
          name: 'arrowPadding',
          type: 'number',
          default: '0',
          description:
            'The padding between the arrow and the edges of the content. If your content has border-radius, this will prevent it from overflowing the corners.',
        },
        {
          name: 'sticky',
          type: "'partial' | 'always'",
          default: "'partial'",
          description:
            'The sticky behavior of the content. "partial" will keep the content in the viewport as the user scrolls.',
        },
        {
          name: 'hideWhenDetached',
          type: 'boolean',
          default: 'false',
          description: 'When true, hides the content when the trigger becomes hidden.',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Used to force mounting when more control is needed.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the content.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-side]', values: '"left" | "right" | "bottom" | "top"' },
        { name: '[data-align]', values: '"start" | "end" | "center"' },
        { name: '[data-orientation]', values: '"vertical" | "horizontal"' },
      ],
      cssVariables: [
        {
          name: '--radix-dropdown-menu-content-transform-origin',
          description:
            'The transform-origin computed from the content and arrow positions/offsets.',
        },
        {
          name: '--radix-dropdown-menu-content-available-width',
          description: 'The remaining width between the trigger and the boundary edge.',
        },
        {
          name: '--radix-dropdown-menu-content-available-height',
          description: 'The remaining height between the trigger and the boundary edge.',
        },
        {
          name: '--radix-dropdown-menu-trigger-width',
          description: 'The width of the trigger.',
        },
        {
          name: '--radix-dropdown-menu-trigger-height',
          description: 'The height of the trigger.',
        },
      ],
    },
    {
      name: 'Item',
      description: 'The component that contains the dropdown menu items.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child, merging their props and behavior.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'When true, prevents the user from interacting with this item.',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Callback fired when the user selects the item.',
        },
        {
          name: 'textValue',
          type: 'string',
          description:
            'Optional text used for typeahead purposes. By default the typeahead will use the .textContent of the item.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the item.',
        },
      ],
      dataAttributes: [
        { name: '[data-orientation]', values: '"vertical" | "horizontal"' },
        { name: '[data-highlighted]', values: 'Present when highlighted' },
        { name: '[data-disabled]', values: 'Present when disabled' },
      ],
    },
    {
      name: 'Group',
      description: 'Used to group multiple DropdownMenuItems.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child, merging their props and behavior.',
        },
      ],
    },
    {
      name: 'Label',
      description:
        "Used to render a label. It won't be focusable using arrow keys. Can be used to describe a group of items.",
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child, merging their props and behavior.',
        },
      ],
    },
    {
      name: 'CheckboxItem',
      description: 'An item that can be controlled and rendered like a checkbox.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child, merging their props and behavior.',
        },
        {
          name: 'checked',
          type: "boolean | 'indeterminate'",
          description: 'The controlled checked state of the checkbox item.',
        },
        {
          name: 'onCheckedChange',
          type: "(checked: boolean | 'indeterminate') => void",
          description: 'Callback fired when the checked state changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'When true, prevents the user from interacting with this item.',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Callback fired when the user selects the item.',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Optional text used for typeahead purposes.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"checked" | "unchecked" | "indeterminate"' },
        { name: '[data-highlighted]', values: 'Present when highlighted' },
        { name: '[data-disabled]', values: 'Present when disabled' },
      ],
    },
    {
      name: 'RadioGroup',
      description: 'Used to group multiple DropdownMenuRadioItems.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'The value of the selected radio item.',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback fired when the value changes.',
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child, merging their props and behavior.',
        },
      ],
    },
    {
      name: 'RadioItem',
      description: 'An item that can be controlled and rendered like a radio.',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'The value of the radio item.',
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child, merging their props and behavior.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'When true, prevents the user from interacting with this item.',
        },
        {
          name: 'onSelect',
          type: '(event: Event) => void',
          description: 'Callback fired when the user selects the item.',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Optional text used for typeahead purposes.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"checked" | "unchecked"' },
        { name: '[data-highlighted]', values: 'Present when highlighted' },
        { name: '[data-disabled]', values: 'Present when disabled' },
      ],
    },
    {
      name: 'ItemIndicator',
      description:
        'Renders when the parent DropdownMenuCheckboxItem or DropdownMenuRadioItem is checked. Can be used as a wrapper for an icon.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child, merging their props and behavior.',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Used to force mounting when more control is needed.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"checked" | "unchecked" | "indeterminate"' },
      ],
    },
    {
      name: 'Separator',
      description: 'Used to visually separate items in the dropdown menu.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child, merging their props and behavior.',
        },
      ],
    },
    {
      name: 'Shortcut',
      description: 'Used to render keyboard shortcut hints alongside menu items.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the shortcut.',
        },
      ],
    },
    {
      name: 'Sub',
      description: 'Contains all the parts of a submenu.',
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: 'The controlled open state of the submenu.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          description:
            'The open state when the submenu is initially rendered. Use when you do not need to control its open state.',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback fired when the open state changes.',
        },
      ],
    },
    {
      name: 'SubTrigger',
      description: 'An item that opens a submenu. Must be rendered inside DropdownMenuSub.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child, merging their props and behavior.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'When true, prevents the user from interacting with this item.',
        },
        {
          name: 'textValue',
          type: 'string',
          description: 'Optional text used for typeahead purposes.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-highlighted]', values: 'Present when highlighted' },
        { name: '[data-disabled]', values: 'Present when disabled' },
      ],
    },
    {
      name: 'SubContent',
      description:
        'The component that pops out when a submenu is open. Must be rendered inside DropdownMenuSub.',
      props: [
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description:
            'Change the default rendered element for the one passed as a child, merging their props and behavior.',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: 'false',
          description:
            'When true, keyboard navigation will loop from last item to first, and vice versa.',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '0',
          description: 'The distance in pixels from the trigger to the content.',
        },
        {
          name: 'alignOffset',
          type: 'number',
          default: '0',
          description: 'An offset in pixels from the start or end alignment option.',
        },
        {
          name: 'avoidCollisions',
          type: 'boolean',
          default: 'true',
          description: 'When true, overrides the side and align preferences to avoid collisions.',
        },
        {
          name: 'collisionBoundary',
          type: 'Element | null | Element[]',
          default: '[]',
          description: 'Element used to calculate available space.',
        },
        {
          name: 'collisionPadding',
          type: 'number | Partial<Record<Side, number>>',
          default: '0',
          description:
            'The distance in pixels from the boundary edges where collision detection should occur.',
        },
        {
          name: 'arrowPadding',
          type: 'number',
          default: '0',
          description: 'The padding between the arrow and the edges of the content.',
        },
        {
          name: 'sticky',
          type: "'partial' | 'always'",
          default: "'partial'",
          description: 'The sticky behavior of the content.',
        },
        {
          name: 'hideWhenDetached',
          type: 'boolean',
          default: 'false',
          description: 'When true, hides the content when the trigger becomes hidden.',
        },
        {
          name: 'forceMount',
          type: 'boolean',
          description: 'Used to force mounting when more control is needed.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"open" | "closed"' },
        { name: '[data-side]', values: '"left" | "right" | "bottom" | "top"' },
        { name: '[data-align]', values: '"start" | "end" | "center"' },
        { name: '[data-orientation]', values: '"vertical" | "horizontal"' },
      ],
    },
  ],

  examples: [
    {
      title: 'Basic',
      description: 'A simple dropdown menu with basic items and actions.',
      code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
      hasDemo: true,
    },
    {
      title: 'With Checkboxes',
      description: 'Use checkbox items for toggling options on and off.',
      code: `import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';
import { signal } from '@angular/core';
import { CheckIcon } from 'lucide-angular';

export function DropdownMenuCheckboxes() {
  const showStatusBar = signal(true);
  const showActivityBar = signal(false);
  const showPanel = signal(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar()}
          onCheckedChange={() => showStatusBar.update(v => !v)}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar()}
          onCheckedChange={() => showActivityBar.update(v => !v)}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel()}
          onCheckedChange={() => showPanel.update(v => !v)}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
    },
    {
      title: 'With Radio Group',
      description: 'Use radio items for mutually exclusive options.',
      code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';
import { signal } from '@angular/core';

export function DropdownMenuRadioGroupDemo() {
  const position = signal('bottom');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position()} onValueChange={(val) => position.set(val)}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
    },
    {
      title: 'With Submenus',
      description: 'Create nested submenus with the Sub component.',
      code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';
import { ChevronRightIcon } from 'lucide-angular';

export function DropdownMenuSubmenus() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            More Tools
            <ChevronRightIcon className="ml-auto h-4 w-4" />
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={-4}>
              <DropdownMenuItem>Save Page As...</DropdownMenuItem>
              <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Developer Tools</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
    },
    {
      title: 'With Disabled Items',
      description: 'Disable items to prevent user interaction.',
      code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';

export function DropdownMenuDisabled() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem disabled>Archive</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
    },
    {
      title: 'With Shortcuts',
      description: 'Display keyboard shortcuts alongside menu items.',
      code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';

export function DropdownMenuShortcuts() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
    },
    {
      title: 'With Complex Items',
      description: 'Render rich content inside menu items.',
      code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { NgFor } from '@angular/common';

export function DropdownMenuComplex() {
  const users = [
    { name: 'Adolfo Hess', avatar: 'AH' },
    { name: 'Miyah Myles', avatar: 'MM' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <NgFor [ngForOf]="users">
          <DropdownMenuItem className="gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="..." />
              <AvatarFallback>{{ user.avatar }}</AvatarFallback>
            </Avatar>
            {{ user.name }}
          </DropdownMenuItem>
        </NgFor>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
    },
    {
      title: 'Controlling Position',
      description: 'Use side, align, and sideOffset to control content positioning.',
      code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';

export function DropdownMenuPositioning() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="end"
        sideOffset={8}
        className="w-48"
      >
        <DropdownMenuItem>New Tab</DropdownMenuItem>
        <DropdownMenuItem>New Window</DropdownMenuItem>
        <DropdownMenuItem>New Private Window</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
    },
    {
      title: 'Origin-Aware Animations',
      description:
        'Use CSS custom properties to create animations that originate from the correct position.',
      code: `// Component
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';

export function DropdownMenuAnimated() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 animate-in fade-in-0 zoom-in-95" sideOffset={5}>
        <DropdownMenuItem>New Tab</DropdownMenuItem>
        <DropdownMenuItem>New Window</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Tailwind config for custom animation
export const tailwindConfig = {
  theme: {
    extend: {
      animation: {
        'content-show': 'content-show 0.16s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'content-show': {
          from: {
            opacity: '0',
            transform: 'scale(0.96) translate(0, -2px)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
    },
  },
};`,
      css: `/* Using CSS custom properties for origin-aware animations */
[data-radix-dropdown-menu-content] {
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
  animation: scaleIn 0.2s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Collision-aware animations */
[data-radix-dropdown-menu-content][data-side="top"] {
  animation: slideDown 0.2s ease-out;
}

[data-radix-dropdown-menu-content][data-side="bottom"] {
  animation: slideUp 0.2s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
    },
  ],

  accessibility: {
    ariaPattern: 'Menu Button WAI-ARIA design pattern',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/',
    keyboardInteractions: [
      {
        key: 'Space',
        description:
          'When focus is on DropdownMenuTrigger, opens the dropdown menu and focuses the first item. When focus is on an item, activates the focused item.',
      },
      {
        key: 'Enter',
        description:
          'When focus is on DropdownMenuTrigger, opens the dropdown menu and focuses the first item. When focus is on an item, activates the focused item.',
      },
      {
        key: 'ArrowDown',
        description:
          'When focus is on DropdownMenuTrigger, opens the dropdown menu. When focus is on an item, moves focus to the next item.',
      },
      {
        key: 'ArrowUp',
        description: 'When focus is on an item, moves focus to the previous item.',
      },
      {
        key: 'ArrowRight',
        description:
          'When focus is on DropdownMenuSubTrigger, opens or closes the submenu depending on reading direction.',
      },
      {
        key: 'ArrowLeft',
        description:
          'When focus is on DropdownMenuSubTrigger, opens or closes the submenu depending on reading direction.',
      },
      {
        key: 'Esc',
        description: 'Closes the dropdown menu and moves focus to DropdownMenuTrigger.',
      },
      {
        key: 'Tab',
        description:
          'Moves focus to the next focusable element. Does not move focus within the dropdown menu items.',
      },
      {
        key: 'Typeahead',
        description:
          'When focus is within the dropdown menu, typing a character moves focus to the next menu item that starts with that character.',
      },
    ],
    ariaAttributes: [
      {
        name: 'role="menu"',
        description: 'Applied to the dropdown menu content container.',
      },
      {
        name: 'role="menuitem"',
        description: 'Applied to individual menu items.',
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
        name: 'aria-checked',
        description: 'Indicates the checked state of checkbox and radio items.',
      },
      {
        name: 'aria-disabled',
        description: 'Indicates when a menu item is disabled.',
      },
      {
        name: 'aria-haspopup="menu"',
        description: 'Applied to submenu triggers.',
      },
      {
        name: 'aria-expanded',
        description: 'Indicates whether a submenu is open or closed.',
      },
    ],
  },

  links: [
    {
      text: 'Radix UI Documentation',
      url: 'https://www.radix-ui.com/primitives/docs/components/dropdown-menu',
      icon: 'docs',
    },
    {
      text: 'shadcn/ui Documentation',
      url: 'https://ui.shadcn.com/docs/components/dropdown-menu',
      icon: 'docs',
    },
    {
      text: 'View source',
      url: 'https://github.com/shadcn-angular/shadcn-angular/tree/main/src/app/lib/components/ui/dropdown-menu',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/shadcn-angular/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'WAI-ARIA Menu Button Pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/',
      icon: 'docs',
    },
  ],
};
