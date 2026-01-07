import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog-context';

/**
 * AlertDialogDescription component - description text of the alert dialog.
 * Matches shadcn/ui React AlertDialogDescription exactly.
 * Automatically links to dialog via aria-describedby.
 */
@Component({
  selector: 'AlertDialogDescription',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.id]': 'context.descriptionId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogDescription {
  protected readonly context = inject(ALERT_DIALOG_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}
