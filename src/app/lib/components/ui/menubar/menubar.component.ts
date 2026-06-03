import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MENUBAR_CONTEXT, type MenubarContextValue } from './menubar-context';

/**
 * Props for the Menubar component
 */
export interface MenubarProps {
  /** Whether to loop focus at the ends.
   * @default true */
  loop?: boolean;
  /** Additional CSS classes */
  class?: string;
}

/**
 * @component Menubar
 *
 * A visually persistent menu common in desktop applications.
 *
 * @description
 * Menubar provides a horizontal menu bar with dropdown menus, commonly used
 * in desktop-style applications. It supports full keyboard navigation,
 * submenus, checkbox items, and radio groups.
 *
 * ## Features
 * - Horizontal menu bar with multiple menus
 * - Full keyboard navigation (Arrow keys, Home/End)
 * - Submenus with hover/arrow key support
 * - Checkbox and radio menu items
 * - Typeahead character navigation
 * - Menu opens on hover when another is open
 *
 * ## Accessibility
 * - Uses `role="menubar"` for proper semantics
 * - `aria-orientation="horizontal"` for navigation context
 * - Roving tabindex for focus management
 * - Escape key closes menus
 * - Menu items use `role="menuitem"`, `"menuitemcheckbox"`, `"menuitemradio"`
 *
 * ## Keyboard Navigation
 * - `Enter/Space` - Open menu, activate item
 * - `ArrowLeft/Right` - Navigate between menus
 * - `ArrowUp/Down` - Navigate within menu
 * - `Home/End` - Jump to first/last item
 * - `Escape` - Close menu
 * - Type character - Jump to matching item
 *
 * ## Data Attributes
 * | Attribute | Values |
 * |-----------|--------|
 * | `data-state` | `"open"` \| `"closed"` |
 * | `data-highlighted` | Present when item is focused |
 * | `data-disabled` | Present when item is disabled |
 *
 * @example Basic usage
 * ```html
 * <Menubar>
 *   <MenubarMenu>
 *     <MenubarTrigger>File</MenubarTrigger>
 *     <MenubarContent>
 *       <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
 *       <MenubarItem>New Window <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
 *       <MenubarSeparator />
 *       <MenubarItem>Print <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
 *     </MenubarContent>
 *   </MenubarMenu>
 *   <MenubarMenu>
 *     <MenubarTrigger>Edit</MenubarTrigger>
 *     <MenubarContent>
 *       <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
 *       <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
 *     </MenubarContent>
 *   </MenubarMenu>
 * </Menubar>
 * ```
 *
 * @example With checkbox and radio items
 * ```html
 * <Menubar>
 *   <MenubarMenu>
 *     <MenubarTrigger>View</MenubarTrigger>
 *     <MenubarContent>
 *       <MenubarCheckboxItem [(checked)]="showToolbar">
 *         Show Toolbar
 *       </MenubarCheckboxItem>
 *       <MenubarSeparator />
 *       <MenubarRadioGroup [(value)]="theme">
 *         <MenubarRadioItem value="light">Light</MenubarRadioItem>
 *         <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
 *         <MenubarRadioItem value="system">System</MenubarRadioItem>
 *       </MenubarRadioGroup>
 *     </MenubarContent>
 *   </MenubarMenu>
 * </Menubar>
 * ```
 */
@Component({
  selector: 'Menubar',
  template: `<ng-content />`,
  providers: [
    {
      provide: MENUBAR_CONTEXT,
      useFactory: (): MenubarContextValue => {
        const menuIds = signal<string[]>([]);
        const focusedMenuIndex = signal(-1);
        return {
          activeMenu: signal(null),
          menuIds,
          focusedMenuIndex,
          registerMenu: (menuId: string) => {
            menuIds.update((ids) => [...ids, menuId]);
          },
          unregisterMenu: (menuId: string) => {
            menuIds.update((ids) => ids.filter((id) => id !== menuId));
          },
          focusNextMenu: () => {
            const ids = menuIds();
            const currentIdx = focusedMenuIndex();
            const nextIdx = currentIdx < ids.length - 1 ? currentIdx + 1 : 0;
            focusedMenuIndex.set(nextIdx);
          },
          focusPreviousMenu: () => {
            const ids = menuIds();
            const currentIdx = focusedMenuIndex();
            const prevIdx = currentIdx > 0 ? currentIdx - 1 : ids.length - 1;
            focusedMenuIndex.set(prevIdx);
          },
        };
      },
    },
  ],
  host: {
    'attr.data-slot': '"menubar"',
    '[class]': 'computedClass()',
    role: 'menubar',
    'aria-orientation': 'horizontal',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menubar {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm',
      this.class(),
    ),
  );
}
