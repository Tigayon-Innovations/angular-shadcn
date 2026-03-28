import { Directive, ElementRef, OnDestroy, afterNextRender, inject, output } from '@angular/core';

/**
 * Directive that detects clicks outside the host element.
 * Uses CDK-grade event handling with proper cleanup.
 *
 * @example
 * <div (clickOutside)="onClickOutside()">
 *   Content here
 * </div>
 */
@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef);

  /** Emits when a click occurs outside the host element */
  readonly clickOutside = output<MouseEvent>();

  private documentClickListener: ((event: MouseEvent) => void) | null = null;
  private documentTouchListener: ((event: TouchEvent) => void) | null = null;

  constructor() {
    // Use afterNextRender for SSR compatibility
    afterNextRender(() => {
      this.setupListeners();
    });
  }

  private setupListeners(): void {
    // Use setTimeout to avoid capturing the opening click
    setTimeout(() => {
      this.documentClickListener = (event: MouseEvent) => {
        this.handleEvent(event);
      };

      this.documentTouchListener = (event: TouchEvent) => {
        // Convert touch to a simulated mouse event for the handler
        const touch = event.touches[0] || event.changedTouches[0];
        if (touch) {
          const mouseEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            clientX: touch.clientX,
            clientY: touch.clientY,
          });
          this.handleEvent(mouseEvent);
        }
      };

      document.addEventListener('click', this.documentClickListener, true);
      document.addEventListener('touchstart', this.documentTouchListener, true);
    }, 0);
  }

  private handleEvent(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    // Check if click is outside the element
    if (
      targetElement &&
      !this.elementRef.nativeElement.contains(targetElement) &&
      this.elementRef.nativeElement !== targetElement
    ) {
      this.clickOutside.emit(event);
    }
  }

  ngOnDestroy(): void {
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener, true);
    }
    if (this.documentTouchListener) {
      document.removeEventListener('touchstart', this.documentTouchListener, true);
    }
  }
}
