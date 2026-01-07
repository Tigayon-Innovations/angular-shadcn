import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { buttonVariants } from '../button/button-variants';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog-context';

/**
 * AlertDialogCancel component - cancel button that closes dialog.
 * Matches shadcn/ui React AlertDialogCancel exactly.
 * This is the default focus target when AlertDialog opens.
 */
@Component({
  selector: 'AlertDialogCancel',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '(click)': 'onClick($event)',
    'data-slot': 'alert-dialog-cancel',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogCancel {
  protected readonly context = inject(ALERT_DIALOG_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', this.class())
  );

  onClick(event: Event): void {
    event.stopPropagation();
    this.context.setOpen(false);
  }
}
