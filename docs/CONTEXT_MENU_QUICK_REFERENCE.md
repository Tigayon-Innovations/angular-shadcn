# Context Menu - Quick Reference Guide

## Installation

Choose your preferred package manager:

```bash
# npm
npm install @ng-cn/context-menu

# pnpm
pnpm add @ng-cn/context-menu

# yarn
yarn add @ng-cn/context-menu

# bun
bun add @ng-cn/context-menu

# Angular CLI
ng g @ng-cn/core:c context-menu
```

## Basic Usage

```typescript
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@/ui/context-menu';

@Component({
  selector: 'app-example',
  template: `
    <ContextMenu>
      <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Print...</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  `,
})
export class ExampleComponent {}
```

## With Keyboard Shortcuts

```html
<ContextMenuContent>
  <ContextMenuItem>
    Cut
    <ContextMenuShortcut>⌘X</ContextMenuShortcut>
  </ContextMenuItem>
  <ContextMenuItem>
    Copy
    <ContextMenuShortcut>⌘C</ContextMenuShortcut>
  </ContextMenuItem>
  <ContextMenuItem>
    Paste
    <ContextMenuShortcut>⌘V</ContextMenuShortcut>
  </ContextMenuItem>
</ContextMenuContent>
```

## With Checkboxes

```typescript
export class MyComponent {
  showBookmarks = signal(false);
}
```

```html
<ContextMenuCheckboxItem
  [checked]="showBookmarks()"
  (checkedChange)="showBookmarks.set($event)"
>
  Show Bookmarks
</ContextMenuCheckboxItem>
```

## With Radio Group

```typescript
export class MyComponent {
  viewMode = signal('list');
}
```

```html
<ContextMenuRadioGroup
  [value]="viewMode()"
  (valueChange)="viewMode.set($event)"
>
  <ContextMenuRadioItem value="list">List View</ContextMenuRadioItem>
  <ContextMenuRadioItem value="grid">Grid View</ContextMenuRadioItem>
</ContextMenuRadioGroup>
```

## With Submenus

```html
<ContextMenuSub>
  <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem>Email link</ContextMenuItem>
    <ContextMenuItem>Messages</ContextMenuItem>
    <ContextMenuItem>Notes</ContextMenuItem>
  </ContextMenuSubContent>
</ContextMenuSub>
```

## API Reference

### ContextMenu

Root container for context menu.

**Props:**
- `class?: string` - CSS classes

**Data Attributes:**
- `[data-state]="open|closed"` - Menu open state

### ContextMenuTrigger

Element that triggers the context menu on right-click or keyboard.

**Props:**
- `class?: string` - CSS classes

**Features:**
- Right-click (contextmenu event) opens menu
- Shift+F10 or ContextMenu key opens menu
- Must have focus for keyboard triggers

### ContextMenuContent

The dropdown menu container.

**Props:**
- `class?: string` - CSS classes

**Data Attributes:**
- `[data-state]="open|closed"` - Menu state

**Features:**
- Arrow keys navigate menu items
- Escape closes the menu
- Tab closes and moves focus naturally
- Type characters for typeahead search

### ContextMenuItem

Single menu item.

**Props:**
- `disabled?: boolean` - Disable interaction (default: false)
- `inset?: boolean` - Add left padding (default: false)
- `class?: string` - CSS classes

**Events:**
- `(onSelect)="handler()"` - Item selected

**Data Attributes:**
- `[data-disabled]` - Present when disabled

### ContextMenuCheckboxItem

Menu item with checkbox.

**Props:**
- `checked?: boolean` - Checkbox state (default: false)
- `disabled?: boolean` - Disable interaction (default: false)
- `inset?: boolean` - Add left padding (default: false)
- `class?: string` - CSS classes

**Events:**
- `(checkedChange)="handler($event)"` - State changed
- `(onSelect)="handler()"` - Item selected

**Data Attributes:**
- `[data-state]="checked|unchecked"` - Checkbox state
- `[data-disabled]` - Present when disabled

### ContextMenuRadioGroup

Container for radio menu items.

**Props:**
- `value?: string` - Selected value
- `class?: string` - CSS classes

**Events:**
- `(valueChange)="handler($event)"` - Selected value changed

### ContextMenuRadioItem

Menu item with radio button.

**Props:**
- `value: string` - Radio value (required)
- `disabled?: boolean` - Disable interaction (default: false)
- `inset?: boolean` - Add left padding (default: false)
- `class?: string` - CSS classes

**Events:**
- `(onSelect)="handler()"` - Item selected

**Data Attributes:**
- `[data-state]="checked|unchecked"` - Radio state
- `[data-disabled]` - Present when disabled

### ContextMenuLabel

Non-interactive label for menu items.

**Props:**
- `inset?: boolean` - Add left padding (default: false)
- `class?: string` - CSS classes

### ContextMenuSeparator

Visual separator between items.

**Props:**
- `class?: string` - CSS classes

### ContextMenuShortcut

Keyboard shortcut display (presentational only).

**Props:**
- `class?: string` - CSS classes

### ContextMenuSub

Container for a submenu.

**Props:**
- `class?: string` - CSS classes

### ContextMenuSubTrigger

Item that opens a submenu.

**Props:**
- `disabled?: boolean` - Disable interaction (default: false)
- `inset?: boolean` - Add left padding (default: false)
- `class?: string` - CSS classes

**Data Attributes:**
- `[data-state]="open|closed"` - Submenu state
- `[data-disabled]` - Present when disabled

**Features:**
- Arrow Right opens submenu
- Arrow Left closes submenu

### ContextMenuSubContent

Content container for a submenu.

**Props:**
- `class?: string` - CSS classes

**Data Attributes:**
- `[data-state]="open|closed"` - Submenu state

## Keyboard Interactions

| Key | Action |
|-----|--------|
| **Space** | Activate item or open submenu |
| **Enter** | Activate item or open submenu |
| **ArrowDown** | Move to next item |
| **ArrowUp** | Move to previous item |
| **ArrowRight** | Open submenu (on SubTrigger) |
| **ArrowLeft** | Close submenu |
| **Home** | Move to first item |
| **End** | Move to last item |
| **Tab** | Close menu and move focus |
| **Escape** | Close menu and return focus to trigger |
| **Shift+F10** | Open context menu (Windows) |
| **ContextMenu** | Open context menu (keyboard users) |
| **Character** | Jump to item starting with character |

## Accessibility Features

✓ **WAI-ARIA Menu Pattern** - Follows official accessibility guidelines  
✓ **Full Keyboard Navigation** - All functions accessible by keyboard  
✓ **ARIA Roles** - menu, menuitem, menuitemcheckbox, menuitemradio  
✓ **ARIA Attributes** - aria-disabled, aria-checked, aria-orientation  
✓ **Focus Management** - Proper focus handling with roving tabindex  
✓ **Semantic HTML** - Proper elements for assistive technologies  

## Styling Examples

### Customize Item Styling

```html
<ContextMenuItem class="text-red-600">Delete</ContextMenuItem>
<ContextMenuItem [disabled]="true" class="opacity-50">Disabled</ContextMenuItem>
```

### Customize Shortcut Styling

```html
<ContextMenuItem>
  Save
  <ContextMenuShortcut class="ml-auto text-xs text-muted-foreground">⌘S</ContextMenuShortcut>
</ContextMenuItem>
```

### Customize Content Styling

```html
<ContextMenuContent class="w-56 bg-slate-900 text-white">
  <!-- content -->
</ContextMenuContent>
```

## Common Patterns

### File Context Menu

```html
<ContextMenu>
  <ContextMenuTrigger>Right click file</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Open</ContextMenuItem>
    <ContextMenuItem>Open With</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Cut</ContextMenuItem>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

### Settings Menu

```html
<ContextMenu>
  <ContextMenuTrigger>Settings</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuCheckboxItem
      [checked]="darkMode()"
      (checkedChange)="darkMode.set($event)"
    >
      Dark Mode
    </ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem
      [checked]="notifications()"
      (checkedChange)="notifications.set($event)"
    >
      Notifications
    </ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>
```

### Nested Menu

```html
<ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuSub>
      <ContextMenuSubTrigger>Export as</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>PDF</ContextMenuItem>
        <ContextMenuItem>PNG</ContextMenuItem>
        <ContextMenuItem>SVG</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>
```

## Documentation

For complete documentation including all 7 examples, visit:

**📚 [Context Menu Documentation](/docs/components/context-menu)**

- Complete feature list with highlights
- Installation instructions for all package managers
- Component anatomy and structure
- Detailed API reference for all 12 components
- 7 real-world usage examples
- Full accessibility information
- External links to Radix UI and WAI-ARIA specs
