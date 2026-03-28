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
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
        break;
    }
  }
}
