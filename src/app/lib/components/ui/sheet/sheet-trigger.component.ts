import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';
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
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'context.open()',
    '[attr.aria-controls]': 'context.contentId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetTrigger {
  /** Render as child */
  readonly asChild = input<boolean>(false);

  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  protected readonly context = inject(SHEET_CONTEXT);

  onClick(event: Event): void {
    event.stopPropagation();
    // Save trigger element for focus restoration
    this.context.triggerElement.set(this._elementRef.nativeElement);
    this.context.setOpen(true);
  }
}
