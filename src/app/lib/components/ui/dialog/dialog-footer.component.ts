import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * DialogFooter component - footer area of the dialog.
 * Matches shadcn/ui React DialogFooter exactly.
 */
@Component({
  selector: 'DialogFooter',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"dialog-footer"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFooter {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', this.class()),
  );
}
