import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * AlertDialogTitle component - title text of the alert dialog.
 * Matches shadcn/ui React AlertDialogTitle exactly.
 */
@Component({
  selector: 'AlertDialogTitle',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogTitle {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-lg font-semibold', this.class())
  );
}
