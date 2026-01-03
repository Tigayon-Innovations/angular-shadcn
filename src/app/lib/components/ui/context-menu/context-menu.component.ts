import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CONTEXT_MENU_CONTEXT, type ContextMenuContextValue } from './context-menu-context';

/**
 * ContextMenu component - root container for context menu.
 * Matches shadcn/ui React ContextMenu exactly.
 */
@Component({
  selector: 'ContextMenu',
  template: `<ng-content />`,
  providers: [
    {
      provide: CONTEXT_MENU_CONTEXT,
      useFactory: (): ContextMenuContextValue => ({
        open: signal(false),
        position: signal({ x: 0, y: 0 }),
      }),
    },
  ],
  host: {
    class: 'relative inline-block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenu {}
