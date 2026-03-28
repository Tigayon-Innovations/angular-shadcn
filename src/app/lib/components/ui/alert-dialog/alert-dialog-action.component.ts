import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { buttonVariants } from '../button/button-variants';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog-context';

/**
 * AlertDialogAction component - action button that confirms and closes the dialog.
 * Matches shadcn/ui React AlertDialogAction exactly.
 * Styled as the primary action button.
 *
 * @example
 * <AlertDialogAction>Delete Account</AlertDialogAction>
 */
@Component({
  selector: 'AlertDialogAction',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '(click)': 'onClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogAction {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  protected readonly context = inject(ALERT_DIALOG_CONTEXT);

  protected readonly computedClass = computed(() => cn(buttonVariants(), this.class()));

  onClick(event: Event): void {
    // Allow the click to propagate for custom handlers
    event.stopPropagation();
    this.context.setOpen(false);
  }
}
