import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    '[attr.aria-expanded]': 'context.open()',
    '[attr.aria-haspopup]': '"menu"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuTrigger {
  protected readonly context = inject(DROPDOWN_MENU_CONTEXT);

  toggle(): void {
    this.context.open.update(v => !v);
  }
}
