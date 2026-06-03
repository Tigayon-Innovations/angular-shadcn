import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  signal,
  type WritableSignal,
} from '@angular/core';

export interface MenubarSubContext {
  open: WritableSignal<boolean>;
}

export const MENUBAR_SUB_CONTEXT = new InjectionToken<MenubarSubContext>('MENUBAR_SUB_CONTEXT');

/**
 * MenubarSub component - container for submenu.
 * Matches shadcn/ui React MenubarSub exactly.
 */
@Component({
  selector: 'MenubarSub',
  template: `<ng-content />`,
  providers: [
    {
      provide: MENUBAR_SUB_CONTEXT,
      useFactory: (): MenubarSubContext => ({
        open: signal(false),
      }),
    },
  ],
  host: {
    'attr.data-slot': '"menubar-sub"',
    class: 'relative',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarSub {}
