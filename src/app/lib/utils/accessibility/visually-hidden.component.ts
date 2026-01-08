import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * VisuallyHidden component - renders content that is visually hidden
 * but still accessible to screen readers.
 *
 * This is essential for providing context to assistive technology users
 * without affecting the visual layout.
 *
 * @example
 * <button>
 *   <svg>...</svg>
 *   <VisuallyHidden>Close dialog</VisuallyHidden>
 * </button>
 *
 * @example
 * <VisuallyHidden>
 *   <h2>Navigation</h2>
 * </VisuallyHidden>
 * <nav>...</nav>
 */
@Component({
  selector: 'VisuallyHidden',
  template: `<ng-content />`,
  host: {
    '[class]': '"sr-only"',
    '[attr.aria-hidden]': 'focusable() ? null : undefined',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisuallyHidden {
  /**
   * When true, the element can receive focus (useful for skip links).
   * When focused, it becomes visible.
   */
  readonly focusable = input<boolean>(false);
}

/**
 * VisuallyHiddenInput - a visually hidden form input for accessibility.
 * Useful for custom form controls that need a native input for form submission
 * or accessibility purposes.
 *
 * @example
 * <CustomCheckbox>
 *   <VisuallyHiddenInput type="checkbox" [checked]="checked" />
 *   <span class="custom-checkbox-visual">...</span>
 * </CustomCheckbox>
 */
@Component({
  selector: 'VisuallyHiddenInput',
  template: `
    <input
      class="sr-only"
      [type]="type()"
      [attr.name]="name()"
      [attr.value]="value()"
      [checked]="checked()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-describedby]="ariaDescribedBy()"
      [attr.tabindex]="tabIndex()"
    />
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisuallyHiddenInput {
  readonly type = input<string>('text');
  readonly name = input<string | undefined>(undefined);
  readonly value = input<string | undefined>(undefined);
  readonly checked = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly ariaDescribedBy = input<string | undefined>(undefined);
  readonly tabIndex = input<number>(-1);
}
