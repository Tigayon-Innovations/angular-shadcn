import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ContextMenuLabel component - a label in the context menu.
 * Matches shadcn/ui React ContextMenuLabel exactly.
 */
@Component({
  selector: 'ContextMenuLabel',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuLabel {
  /** Whether the label is inset (extra padding) */
  readonly inset = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'px-2 py-1.5 text-sm font-semibold text-foreground',
      this.inset() && 'pl-8',
      this.class()
    )
  );
}
