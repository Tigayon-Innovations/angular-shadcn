import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CONTEXT_MENU_CONTEXT } from './context-menu-context';

/**
 * ContextMenuTrigger component - the area that responds to right-click.
 * Matches shadcn/ui React ContextMenuTrigger exactly.
 */
@Component({
  selector: 'ContextMenuTrigger',
  template: `<ng-content />`,
  host: {
    '(contextmenu)': 'onContextMenu($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuTrigger {
  protected readonly context = inject(CONTEXT_MENU_CONTEXT);

  protected onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.context.position.set({ x: event.clientX, y: event.clientY });
    this.context.open.set(true);
  }
}
