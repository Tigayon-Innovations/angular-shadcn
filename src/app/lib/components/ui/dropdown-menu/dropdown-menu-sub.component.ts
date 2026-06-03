import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  signal,
  type WritableSignal,
} from '@angular/core';

export interface DropdownMenuSubContext {
  open: WritableSignal<boolean>;
  /** True while the mouse is hovering over the sub-content panel */
  isMouseInSubContent: WritableSignal<boolean>;
}

export const DROPDOWN_MENU_SUB_CONTEXT = new InjectionToken<DropdownMenuSubContext>(
  'DROPDOWN_MENU_SUB_CONTEXT',
);

/**
 * DropdownMenuSub component - container for submenu.
 * Matches shadcn/ui React DropdownMenuSub exactly.
 */
@Component({
  selector: 'DropdownMenuSub',
  template: `<ng-content />`,
  providers: [
    {
      provide: DROPDOWN_MENU_SUB_CONTEXT,
      useFactory: (): DropdownMenuSubContext => ({
        open: signal(false),
        isMouseInSubContent: signal(false),
      }),
    },
  ],
  host: {
    'attr.data-slot': '"dropdown-menu-sub"',
    class: 'relative',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuSub {}
