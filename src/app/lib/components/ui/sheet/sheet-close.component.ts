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
    'attr.data-slot': '"sheet-close"',
    class: 'contents',
    '(click)': 'onClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetClose {
  /** Render as child */
  readonly asChild = input<boolean>(false);

  protected readonly context = inject(SHEET_CONTEXT);

  onClick(event: Event): void {
    event.stopPropagation();
    this.context.setOpen(false);
  }
}
