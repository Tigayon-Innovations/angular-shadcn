import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from '@angular/core';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog-context';

/**
 * AlertDialogTrigger component - element that opens the alert dialog.
 * Matches shadcn/ui React AlertDialogTrigger exactly.
 */
@Component({
  selector: 'AlertDialogTrigger',
  template: `<ng-content />`,
  host: {
    '(click)': 'onClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogTrigger {
  protected readonly context = inject(ALERT_DIALOG_CONTEXT);

  /** Render as child */
  readonly asChild = input<boolean>(false);

  onClick(event: Event): void {
    event.stopPropagation();
    this.context.setOpen(true);
  }
}
