import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';
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
    '[attr.aria-expanded]': 'context.isOpen()',
    '[attr.aria-controls]': 'context.contentId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogTrigger {
  /** Render as child (for custom trigger elements) */
  readonly asChild = input<boolean>(false);

  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  protected readonly context = inject(ALERT_DIALOG_CONTEXT);

  onClick(event: Event): void {
    event.stopPropagation();
    // Save trigger element for focus restoration when dialog closes
    this.context.setTriggerElement(this._elementRef.nativeElement);
    this.context.setOpen(true);
  }
}
