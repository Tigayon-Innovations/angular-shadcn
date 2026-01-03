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
 * AlertDialogAction component - action button that confirms and closes dialog.
 * Matches shadcn/ui React AlertDialogAction exactly.
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
  protected readonly context = inject(ALERT_DIALOG_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(buttonVariants(), this.class())
  );

  onClick(event: Event): void {
    // Allow the click to propagate for custom handlers
    this.context.setOpen(false);
  }
}
