import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { CONTEXT_MENU_CONTEXT } from './context-menu-context';

/**
 * ContextMenuTrigger component - the area that responds to right-click.
 * Matches shadcn/ui React ContextMenuTrigger exactly.
 * Supports keyboard trigger via Shift+F10.
 */
@Component({
  selector: 'ContextMenuTrigger',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"context-menu-trigger"',
    '[attr.tabindex]': '0',
    '(contextmenu)': 'onContextMenu($event)',
    '(keydown)': 'onKeydown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuTrigger {
  private readonly _elementRef = inject(ElementRef);

  protected readonly context = inject(CONTEXT_MENU_CONTEXT);

  protected onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.context.position.set({ x: event.clientX, y: event.clientY });
    this.context.triggerElement.set(this._elementRef.nativeElement);
    this.context.focusedIndex.set(-1);
    this.context.open.set(true);
  }
  protected onKeydown(event: KeyboardEvent): void {
    // Shift+F10 opens context menu (Windows convention)
    if (event.key === 'F10' && event.shiftKey) {
      event.preventDefault();
      const rect = this._elementRef.nativeElement.getBoundingClientRect();
      this.context.position.set({ x: rect.left, y: rect.bottom });
      this.context.triggerElement.set(this._elementRef.nativeElement);
      this.context.focusedIndex.set(-1);
      this.context.open.set(true);
    }
    // Also support ContextMenu key
    if (event.key === 'ContextMenu') {
      event.preventDefault();
      const rect = this._elementRef.nativeElement.getBoundingClientRect();
      this.context.position.set({ x: rect.left, y: rect.bottom });
      this.context.triggerElement.set(this._elementRef.nativeElement);
      this.context.focusedIndex.set(-1);
      this.context.open.set(true);
    }
  }
}
