import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from '@angular/core';
import { DIALOG_CONTEXT } from './dialog-context';

/**
 * DialogTrigger component - element that opens the dialog.
 * Matches shadcn/ui React DialogTrigger exactly.
 */
@Component({
  selector: 'DialogTrigger',
  template: `<ng-content />`,
  host: {
    '(click)': 'onClick($event)',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'context.open()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTrigger {
  protected readonly context = inject(DIALOG_CONTEXT);

  /** Render as child */
  readonly asChild = input<boolean>(false);

  onClick(event: Event): void {
    event.stopPropagation();
    this.context.setOpen(true);
  }
}
