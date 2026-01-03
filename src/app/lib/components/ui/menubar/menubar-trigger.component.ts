import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MENUBAR_CONTEXT, MENUBAR_MENU_CONTEXT } from './menubar-context';

/**
 * MenubarTrigger component - trigger button for a menu.
 * Matches shadcn/ui React MenubarTrigger exactly.
 */
@Component({
  selector: 'MenubarTrigger',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"menuitem"',
    '[attr.aria-expanded]': 'menuContext.open()',
    '[attr.aria-haspopup]': '"menu"',
    '[attr.data-state]': 'menuContext.open() ? "open" : "closed"',
    '(click)': 'toggle()',
    '(mouseenter)': 'onMouseEnter()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarTrigger {
  protected readonly context = inject(MENUBAR_CONTEXT);
  protected readonly menuContext = inject(MENUBAR_MENU_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      this.class()
    )
  );

  protected toggle(): void {
    this.menuContext.open.update(v => !v);
    if (this.menuContext.open()) {
      this.context.activeMenu.set(this.menuContext.menuId);
    } else {
      this.context.activeMenu.set(null);
    }
  }

  protected onMouseEnter(): void {
    // If another menu is already open, open this one on hover
    const activeMenu = this.context.activeMenu();
    if (activeMenu && activeMenu !== this.menuContext.menuId) {
      this.context.activeMenu.set(this.menuContext.menuId);
      this.menuContext.open.set(true);
    }
  }
}
