import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SHEET_CONTEXT } from './sheet-context';

/**
 * SheetClose component - button that closes the sheet.
 * Matches shadcn/ui React SheetClose exactly.
 */
@Component({
  selector: 'SheetClose',
  template: `<ng-content />`,
  host: {
    class: 'contents',
    '(click)': 'onClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetClose {
  protected readonly context = inject(SHEET_CONTEXT);

  /** Render as child */
  readonly asChild = input<boolean>(false);

  onClick(event: Event): void {
    event.stopPropagation();
    this.context.setOpen(false);
  }
}
