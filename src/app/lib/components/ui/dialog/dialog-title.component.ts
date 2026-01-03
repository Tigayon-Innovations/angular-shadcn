import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * DialogTitle component - title text of the dialog.
 * Matches shadcn/ui React DialogTitle exactly.
 */
@Component({
  selector: 'DialogTitle',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTitle {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-lg font-semibold leading-none tracking-tight', this.class())
  );
}
