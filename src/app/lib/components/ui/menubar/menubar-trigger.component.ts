import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { MENUBAR_CONTEXT, MENUBAR_MENU_CONTEXT } from './menubar-context';

/**
 * MenubarTrigger component - trigger button for a menu.
 * Matches shadcn/ui React MenubarTrigger exactly.
 * Supports Arrow Left/Right navigation between menus.
 */
@Component({
  selector: 'MenubarTrigger',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"menuitem"',
    '[attr.tabindex]': 'isFocused() ? 0 : -1',
    '[attr.aria-expanded]': 'menuContext.open()',
    '[attr.aria-haspopup]': '"menu"',
    '[attr.data-state]': 'menuContext.open() ? "open" : "closed"',
    '(click)': 'toggle()',
    '(mouseenter)': 'onMouseEnter()',
    '(keydown)': 'onKeydown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarTrigger {
  constructor() {
    // Focus this trigger when it becomes the focused menu
    effect(() => {
      if (this.isFocused()) {
        this._elementRef.nativeElement.focus();
      }
    });
  }

  /** Additional CSS classes */
  readonly class = input<string>('');

  private readonly _elementRef = inject(ElementRef);

  protected readonly context = inject(MENUBAR_CONTEXT);
  protected readonly menuContext = inject(MENUBAR_MENU_CONTEXT);

  protected readonly isFocused = computed(() => {
    const menuIds = this.context.menuIds();
    const focusedIdx = this.context.focusedMenuIndex();
    return menuIds[focusedIdx] === this.menuContext.menuId;
  });
  protected readonly computedClass = computed(() =>
    cn(
      'flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      this.class(),
    ),
  );

  protected toggle(): void {
    this.menuContext.open.update((v) => !v);
    if (this.menuContext.open()) {
      this.context.activeMenu.set(this.menuContext.menuId);
      this.menuContext.focusedItemIndex.set(0);
    } else {
      this.context.activeMenu.set(null);
      this.menuContext.focusedItemIndex.set(-1);
    }
  }
  protected onMouseEnter(): void {
    // If another menu is already open, open this one on hover
    const activeMenu = this.context.activeMenu();
    if (activeMenu && activeMenu !== this.menuContext.menuId) {
      this.context.activeMenu.set(this.menuContext.menuId);
      this.menuContext.open.set(true);
      this.menuContext.focusedItemIndex.set(0);
    }
  }
  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this.context.focusNextMenu();
        // If a menu is open, open the next one
        if (this.context.activeMenu()) {
          this.closeCurrentMenu();
          setTimeout(() => this.openFocusedMenu(), 0);
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.context.focusPreviousMenu();
        // If a menu is open, open the previous one
        if (this.context.activeMenu()) {
          this.closeCurrentMenu();
          setTimeout(() => this.openFocusedMenu(), 0);
        }
        break;
      case 'ArrowDown':
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!this.menuContext.open()) {
          this.menuContext.open.set(true);
          this.context.activeMenu.set(this.menuContext.menuId);
          this.menuContext.focusedItemIndex.set(0);
        }
        break;
      case 'Escape':
        if (this.menuContext.open()) {
          event.preventDefault();
          this.menuContext.open.set(false);
          this.context.activeMenu.set(null);
          this.menuContext.focusedItemIndex.set(-1);
        }
        break;
    }
  }
  private closeCurrentMenu(): void {
    // Close current menu by finding it through activeMenu
    this.menuContext.open.set(false);
    this.menuContext.focusedItemIndex.set(-1);
  }
  private openFocusedMenu(): void {
    const menuIds = this.context.menuIds();
    const focusedIdx = this.context.focusedMenuIndex();
    const focusedMenuId = menuIds[focusedIdx];
    if (focusedMenuId) {
      this.context.activeMenu.set(focusedMenuId);
    }
  }
}
