import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * TableBody component - tbody wrapper.
 * Matches shadcn/ui React TableBody exactly.
 */
@Component({
  selector: 'TableBody',
  template: `<tbody [class]="computedClass()">
    <ng-content />
  </tbody>`,
  host: {
    'attr.data-slot': '"table-body"',
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBody {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn('[&_tr:last-child]:border-0', this.class()));
}
