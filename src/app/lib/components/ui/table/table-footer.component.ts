import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * TableFooter component - tfoot wrapper.
 * Matches shadcn/ui React TableFooter exactly.
 */
@Component({
  selector: 'TableFooter',
  template: `<tfoot [class]="computedClass()">
    <ng-content />
  </tfoot>`,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFooter {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', this.class()),
  );
}
