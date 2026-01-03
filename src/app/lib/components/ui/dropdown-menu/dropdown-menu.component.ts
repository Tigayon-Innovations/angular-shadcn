import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DROPDOWN_MENU_CONTEXT, type DropdownMenuContextValue } from './dropdown-menu-context';

/**
 * DropdownMenu component - root container for dropdown menu.
 * Matches shadcn/ui React DropdownMenu exactly.
 */
@Component({
  selector: 'DropdownMenu',
  template: `<ng-content />`,
  providers: [
    {
      provide: DROPDOWN_MENU_CONTEXT,
      useFactory: (): DropdownMenuContextValue => ({
        open: signal(false),
      }),
    },
  ],
  host: {
    class: 'relative inline-block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenu {}
