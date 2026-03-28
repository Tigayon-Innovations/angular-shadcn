import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * DropdownMenuLabel component - a label in the dropdown menu.
 * Matches shadcn/ui React DropdownMenuLabel exactly.
 */
@Component({
  selector: 'DropdownMenuLabel',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuLabel {
  /** Whether the label is inset (extra padding) */
  readonly inset = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('px-3 py-2 text-sm font-semibold', this.inset() && 'pl-8', this.class()),
  );
}
