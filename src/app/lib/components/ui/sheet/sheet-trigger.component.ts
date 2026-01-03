import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from '@angular/core';
import { SHEET_CONTEXT } from './sheet-context';

/**
 * SheetTrigger component - element that opens the sheet.
 * Matches shadcn/ui React SheetTrigger exactly.
 */
@Component({
  selector: 'SheetTrigger',
  template: `<ng-content />`,
  host: {
    '(click)': 'onClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetTrigger {
  protected readonly context = inject(SHEET_CONTEXT);

  /** Render as child */
  readonly asChild = input<boolean>(false);

  onClick(event: Event): void {
    event.stopPropagation();
    this.context.setOpen(true);
  }
}
