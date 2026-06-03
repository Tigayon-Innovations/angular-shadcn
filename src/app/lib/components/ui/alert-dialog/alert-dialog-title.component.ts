import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog-context';

/**
 * AlertDialogTitle component - title text of the alert dialog.
 * Matches shadcn/ui React AlertDialogTitle exactly.
 * Automatically links to dialog via aria-labelledby.
 *
 * @example
 * <AlertDialogTitle>Delete Account?</AlertDialogTitle>
 */
@Component({
  selector: 'AlertDialogTitle',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"alert-dialog-title"',
    '[class]': 'computedClass()',
    '[attr.id]': 'context.titleId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogTitle {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  protected readonly context = inject(ALERT_DIALOG_CONTEXT);

  protected readonly computedClass = computed(() => cn('text-lg font-semibold', this.class()));
}
