import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  signal,
  type WritableSignal,
} from '@angular/core';

export interface ContextMenuSubContext {
  open: WritableSignal<boolean>;
}

export const CONTEXT_MENU_SUB_CONTEXT = new InjectionToken<ContextMenuSubContext>(
  'CONTEXT_MENU_SUB_CONTEXT',
);

/**
 * ContextMenuSub component - container for submenu.
 * Matches shadcn/ui React ContextMenuSub exactly.
 */
@Component({
  selector: 'ContextMenuSub',
  template: `<ng-content />`,
  providers: [
    {
      provide: CONTEXT_MENU_SUB_CONTEXT,
      useFactory: (): ContextMenuSubContext => ({
        open: signal(false),
      }),
    },
  ],
  host: {
    class: 'relative',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuSub {}
