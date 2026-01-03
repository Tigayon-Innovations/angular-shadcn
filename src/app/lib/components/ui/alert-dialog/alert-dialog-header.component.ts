import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * AlertDialogHeader component - header area of the alert dialog.
 * Matches shadcn/ui React AlertDialogHeader exactly.
 */
@Component({
  selector: 'AlertDialogHeader',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogHeader {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex flex-col space-y-2 text-center sm:text-left', this.class())
  );
}
