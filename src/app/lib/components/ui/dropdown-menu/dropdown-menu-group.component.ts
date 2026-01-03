import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * DropdownMenuGroup component - groups related menu items.
 * Matches shadcn/ui React DropdownMenuGroup exactly.
 */
@Component({
  selector: 'DropdownMenuGroup',
  template: `<ng-content />`,
  host: {
    '[attr.role]': '"group"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuGroup {}
