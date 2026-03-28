import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';
import { DRAWER_CONTEXT } from './drawer-context';

/**
 * DrawerTrigger component - element that opens the drawer.
 * Matches shadcn/ui React DrawerTrigger exactly with enhanced accessibility.
 */
@Component({
  selector: 'DrawerTrigger',
  template: `<ng-content />`,
  host: {
    '(click)': 'onClick($event)',
    '[attr.aria-controls]': 'context.contentId',
    '[attr.aria-expanded]': 'context.open()',
    '[attr.aria-haspopup]': '"dialog"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerTrigger {
  protected readonly context = inject(DRAWER_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Render as child */
  readonly asChild = input<boolean>(false);

  onClick(event: Event): void {
    event.stopPropagation();
    // Save trigger element for focus restoration
    this.context.triggerElement.set(this.elementRef.nativeElement);
    this.context.setOpen(true);
  }
}
