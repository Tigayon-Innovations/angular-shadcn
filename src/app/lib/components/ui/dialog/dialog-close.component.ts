import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DIALOG_CONTEXT } from './dialog-context';

/**
 * DialogClose component - button that closes the dialog.
 * Matches shadcn/ui React DialogClose exactly.
 */
@Component({
  selector: 'DialogClose',
  template: `<ng-content />`,
  host: {
    '(click)': 'onClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogClose {
  /** Render as child */
  readonly asChild = input<boolean>(false);

  protected readonly context = inject(DIALOG_CONTEXT);

  onClick(event: Event): void {
    event.stopPropagation();
    this.context.setOpen(false);
  }
}
