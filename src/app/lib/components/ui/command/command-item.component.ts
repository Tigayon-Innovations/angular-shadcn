import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { COMMAND_CONTEXT } from './command-context';

/**
 * CommandItem component - a single item in the command list.
 * Matches shadcn/ui React CommandItem exactly.
 */
@Component({
  selector: 'CommandItem',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"option"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-selected]': 'isSelected() ? "" : null',
    '(click)': 'handleClick()',
    '(keydown.enter)': 'handleClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandItem {
  protected readonly context = inject(COMMAND_CONTEXT);

  /** Unique value for this item */
  readonly value = input<string>('');

  /** Keywords for search filtering */
  readonly keywords = input<string[]>([]);

  /** Whether the item is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Select event emitted when item is clicked */
  readonly onSelect = output<string>();

  protected readonly isSelected = computed(() => this.context.selectedValue() === this.value());

  protected readonly computedClass = computed(() =>
    cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[selected]:bg-accent data-[selected]:text-accent-foreground data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      !this.disabled() && 'cursor-pointer hover:bg-accent hover:text-accent-foreground',
      this.class()
    )
  );

  protected handleClick(): void {
    if (this.disabled()) return;
    this.context.selectedValue.set(this.value());
    this.onSelect.emit(this.value());
  }
}
