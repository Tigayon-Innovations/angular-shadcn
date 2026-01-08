import {
    Directive,
    ElementRef,
    OnInit,
    Renderer2,
    inject,
    input,
} from '@angular/core';

/**
 * TouchTarget directive - expands the clickable/tappable area of an element
 * to meet WCAG 2.5.5 Target Size (Enhanced) minimum of 44x44px.
 *
 * This uses an invisible pseudo-element to expand the touch target without
 * affecting visual layout.
 *
 * @example
 * <button touchTarget>Small Button</button>
 *
 * @example
 * <Checkbox touchTarget [touchTargetSize]="48" />
 */
@Directive({
  selector: '[touchTarget]',
})
export class TouchTargetDirective implements OnInit {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  /** Minimum touch target size in pixels (default: 44px per WCAG) */
  readonly touchTargetSize = input<number>(44);

  /** Whether to apply on mobile only */
  readonly touchTargetMobileOnly = input<boolean>(false);

  ngOnInit(): void {
    this.applyTouchTarget();
  }

  private applyTouchTarget(): void {
    const element = this.el.nativeElement;
    const size = this.touchTargetSize();

    // Apply position relative if not already positioned
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.position === 'static') {
      this.renderer.setStyle(element, 'position', 'relative');
    }

    // Add the touch target expansion class
    this.renderer.addClass(element, 'touch-target');

    // Set CSS custom property for the size
    this.renderer.setStyle(element, '--touch-target-size', `${size}px`);

    if (this.touchTargetMobileOnly()) {
      this.renderer.addClass(element, 'touch-target-mobile-only');
    }
  }
}

/**
 * Minimum touch target wrapper component.
 * Ensures content has at least 44x44px touch target.
 *
 * @example
 * <MinTouchTarget>
 *   <Checkbox />
 * </MinTouchTarget>
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'MinTouchTarget',
  template: `<ng-content />`,
  host: {
    class: 'inline-flex items-center justify-center min-w-[44px] min-h-[44px]',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinTouchTarget {}
