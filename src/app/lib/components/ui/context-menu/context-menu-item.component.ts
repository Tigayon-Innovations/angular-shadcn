import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { CONTEXT_MENU_CONTEXT } from './context-menu-context';

/**
 * ContextMenuItem component - a single item in the context menu.
 * Matches shadcn/ui React ContextMenuItem exactly.
 */
@Component({
  selector: 'ContextMenuItem',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"menuitem"',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '(click)': 'handleClick($event)',
    '(keydown.enter)': 'handleClick($event)',
    '(keydown.space)': 'handleClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuItem {
  private readonly context = inject(CONTEXT_MENU_CONTEXT);

  /** Whether the item is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether the item is inset (extra padding) */
  readonly inset = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Select event emitted when item is clicked */
  readonly onSelect = output<void>();

  protected readonly computedClass = computed(() =>
    cn(
      "relative flex cursor-default select-none items-center gap-3 rounded-md px-3 py-2.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      this.inset() && 'pl-8',
      !this.disabled() && 'cursor-pointer hover:bg-accent hover:text-accent-foreground',
      this.class()
    )
  );

  protected handleClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.onSelect.emit();
    this.context.open.set(false);
  }
}
