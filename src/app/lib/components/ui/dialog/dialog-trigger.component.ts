import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';
import { DIALOG_CONTEXT } from './dialog-context';

/**
 * DialogTrigger component - element that opens the dialog.
 * Matches shadcn/ui React DialogTrigger exactly.
 */
@Component({
  selector: 'DialogTrigger',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"dialog-trigger"',
    '(click)': 'onClick($event)',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'context.isOpen()',
    '[attr.aria-controls]': 'context.contentId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTrigger {
  /** Render as child */
  readonly asChild = input<boolean>(false);

  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  protected readonly context = inject(DIALOG_CONTEXT);

  onClick(event: Event): void {
    event.stopPropagation();
    // Save trigger element for focus restoration
    this.context.setTriggerElement(this._elementRef.nativeElement);
    this.context.setOpen(true);
  }
}
