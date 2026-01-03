import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { CONTEXT_MENU_CONTEXT } from './context-menu-context';

/**
 * ContextMenuContent component - the content panel of the context menu.
 * Matches shadcn/ui React ContextMenuContent exactly.
 */
@Component({
  selector: 'ContextMenuContent',
  template: `
    @if (context.open()) {
      <div
        [class]="computedClass()"
        [style.position]="'fixed'"
        [style.left.px]="context.position().x"
        [style.top.px]="context.position().y"
        role="menu"
        aria-orientation="vertical"
      >
        <ng-content />
      </div>
    }
  `,
  host: {
    class: 'contents',
    '(document:click)': 'onDocumentClick()',
    '(document:keydown.escape)': 'onEscapeKey()',
    '(document:contextmenu)': 'onAnotherContextMenu()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuContent {
  protected readonly context = inject(CONTEXT_MENU_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
      'animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      this.class()
    )
  );

  protected onDocumentClick(): void {
    this.context.open.set(false);
  }

  protected onEscapeKey(): void {
    this.context.open.set(false);
  }

  protected onAnotherContextMenu(): void {
    // Will be handled by new context menu trigger
  }
}
