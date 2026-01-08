import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * AlertDialogFooter component - footer area of the alert dialog.
 * Matches shadcn/ui React AlertDialogFooter exactly.
 * Contains action and cancel buttons.
 *
 * @example
 * <AlertDialogFooter>
 *   <AlertDialogCancel>Cancel</AlertDialogCancel>
 *   <AlertDialogAction>Delete</AlertDialogAction>
 * </AlertDialogFooter>
 */
@Component({
  selector: 'AlertDialogFooter',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogFooter {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', this.class())
  );
}
