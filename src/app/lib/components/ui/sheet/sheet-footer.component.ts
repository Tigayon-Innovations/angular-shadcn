import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * SheetFooter component - footer area of the sheet.
 * Matches shadcn/ui React SheetFooter exactly.
 */
@Component({
  selector: 'SheetFooter',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetFooter {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', this.class()),
  );
}
