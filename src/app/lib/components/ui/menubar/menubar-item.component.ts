import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { MENUBAR_CONTEXT, MENUBAR_MENU_CONTEXT } from './menubar-context';

/**
 * MenubarItem component - individual menu item.
 * Matches shadcn/ui React MenubarItem exactly.
 * Supports roving tabindex for proper keyboard navigation.
 */
@Component({
  selector: 'MenubarItem',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"menubar-item"',
    '[class]': 'computedClass()',
    '[attr.role]': '"menuitem"',
    '[attr.tabindex]': 'disabled() ? -1 : -1',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'disabled()',
    '(click)': 'handleClick($event)',
    '(keydown.enter)': 'handleClick($event)',
    '(keydown.space)': 'handleClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarItem {
  /** Select event */
  readonly onSelect = output<void>();

  /** Additional CSS classes */
  readonly class = input<string>('');
  /** Whether the item is disabled */
  readonly disabled = input<boolean>(false);
  /** Whether the item is inset (extra padding) */
  readonly inset = input<boolean>(false);

  private readonly _context = inject(MENUBAR_CONTEXT);
  private readonly _menuContext = inject(MENUBAR_MENU_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      this.inset() && 'pl-8',
      !this.disabled() && 'cursor-pointer hover:bg-accent hover:text-accent-foreground',
      this.class(),
    ),
  );

  protected handleClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.onSelect.emit();
    this._menuContext.open.set(false);
    this._context.activeMenu.set(null);
    this._menuContext.focusedItemIndex.set(-1);
  }
}
