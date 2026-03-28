import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * TableCell component - td wrapper.
 * Matches shadcn/ui React TableCell exactly.
 */
@Component({
  selector: 'TableCell',
  template: `<td [class]="computedClass()"><ng-content /></td>`,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCell {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      this.class(),
    ),
  );
}
