import { cn, Presence } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CONTEXT_MENU_SUB_CONTEXT } from './context-menu-sub.component';

/**
 * ContextMenuSubContent component - content panel for submenu.
 * Matches shadcn/ui React ContextMenuSubContent exactly.
 */
@Component({
  selector: 'ContextMenuSubContent',
  imports: [Presence],
  template: `
    <Presence [present]="subContext.open()">
      <div
        [class]="computedClass()"
        [attr.data-state]="subContext.open() ? 'open' : 'closed'"
        role="menu"
      >
        <ng-content />
      </div>
    </Presence>
  `,
  host: {
    class: 'contents',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuSubContent {
  protected readonly subContext = inject(CONTEXT_MENU_SUB_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'absolute left-full top-0 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      this.class(),
    ),
  );

  protected onMouseEnter(): void {
    this.subContext.open.set(true);
  }

  protected onMouseLeave(): void {
    this.subContext.open.set(false);
  }
}
