import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { DROPDOWN_MENU_CONTEXT } from './dropdown-menu-context';

/**
 * DropdownMenuTrigger component - the trigger that opens the dropdown.
 * Matches shadcn/ui React DropdownMenuTrigger exactly.
 */
@Component({
  selector: 'DropdownMenuTrigger',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"dropdown-menu-trigger"',
    class: 'cursor-pointer',
    '(click)': 'toggle()',
    '(keydown)': 'onKeyDown($event)',
    '[attr.aria-expanded]': 'context.open()',
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-controls]': 'context.open() ? context.contentId : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuTrigger {
  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  protected readonly context = inject(DROPDOWN_MENU_CONTEXT);

  toggle(): void {
    this.context.triggerElement.set(this._elementRef.nativeElement);
    this.context.open.update((v) => !v);
  }
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.context.triggerElement.set(this._elementRef.nativeElement);
        this.context.open.set(true);
        this.context.focusedIndex.set(0);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.context.triggerElement.set(this._elementRef.nativeElement);
        this.context.open.set(true);
        // Set focusedIndex to -1 so the content effect opens normally,
        // then after it renders and focuses the first item we move to last.
        this.context.focusedIndex.set(-1);
        setTimeout(() => {
          // After the content's own setTimeout(0) has run and focused item[0],
          // query the menu items and focus the last one.
          const menu = document.querySelector('[data-slot="dropdown-menu-content"] [role="menu"]');
          if (menu) {
            const items = Array.from(
              menu.querySelectorAll<HTMLElement>(
                '[role="menuitem"]:not([aria-disabled="true"]):not([data-disabled=""])',
              ),
            );
            if (items.length > 0) {
              const lastIndex = items.length - 1;
              items[lastIndex].focus();
              this.context.focusedIndex.set(lastIndex);
            }
          }
        }, 10);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
        break;
    }
  }
}
