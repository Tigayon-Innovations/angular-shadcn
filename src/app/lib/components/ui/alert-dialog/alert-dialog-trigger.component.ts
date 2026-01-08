import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    input,
} from '@angular/core';
import { ALERT_DIALOG_CONTEXT } from './alert-dialog-context';

/**
 * AlertDialogTrigger component - element that opens the alert dialog.
 * Matches shadcn/ui React AlertDialogTrigger exactly.
 * Saves the trigger element for focus restoration when dialog closes.
 *
 * @example
 * <AlertDialogTrigger>
 *   <Button variant="destructive">Delete</Button>
 * </AlertDialogTrigger>
 */
@Component({
  selector: 'AlertDialogTrigger',
  template: `<ng-content />`,
  host: {
    '(click)': 'onClick($event)',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'context.open()',
    '[attr.aria-controls]': 'context.contentId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogTrigger {
  protected readonly context = inject(ALERT_DIALOG_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Render as child (for custom trigger elements) */
  readonly asChild = input<boolean>(false);

  onClick(event: Event): void {
    event.stopPropagation();
    // Save trigger element for focus restoration when dialog closes
    this.context.triggerElement.set(this.elementRef.nativeElement);
    this.context.setOpen(true);
  }
}
