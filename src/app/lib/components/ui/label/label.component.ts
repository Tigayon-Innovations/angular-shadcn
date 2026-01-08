import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
} from '@angular/core';

// ============================================================================
// Types
// ============================================================================

export type LabelProps = {
  /** ID of the form element this label is for */
  for?: string;
  /** Alternative binding for 'for' attribute (React-style) */
  htmlFor?: string;
  /** Additional CSS classes to apply */
  class?: string;
};

// ============================================================================
// Label Component
// ============================================================================

/**
 * Label component renders an accessible label associated with form controls.
 * Based on Radix UI Label primitive with shadcn/ui styling.
 *
 * ## Features
 * - Automatic association with form controls via `for`/`htmlFor`
 * - Text selection prevention on double-click (matches Radix behavior)
 * - Disabled state styling when associated control is disabled
 * - Full accessibility support
 *
 * ## Accessibility
 * - Uses native `<label>` element for built-in accessibility
 * - Clicking the label focuses the associated form control
 * - Screen readers announce the label when the control receives focus
 *
 * @example
 * <!-- Basic usage with form control -->
 * <Label for="email">Email address</Label>
 * <Input id="email" type="email" />
 *
 * @example
 * <!-- With required indicator -->
 * <Label for="name">
 *   Name <span class="text-destructive">*</span>
 * </Label>
 *
 * @example
 * <!-- With disabled styling (wrap in group) -->
 * <div class="group" [attr.data-disabled]="isDisabled">
 *   <Label for="username">Username</Label>
 *   <Input id="username" [disabled]="isDisabled" />
 * </div>
 *
 * @example
 * <!-- Within FormField context -->
 * <FormField name="email">
 *   <FormItem>
 *     <FormLabel>Email</FormLabel>
 *     <FormControl>
 *       <Input type="email" formControlName="email" />
 *     </FormControl>
 *     <FormMessage />
 *   </FormItem>
 * </FormField>
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/label Radix Label}
 * @see {@link https://ui.shadcn.com/docs/components/label shadcn/ui Label}
 */
@Component({
  selector: 'Label',
  template: `
    <label
      [attr.for]="forId()"
      [class]="computedClass()"
      (mousedown)="onMouseDown($event)"
    >
      <ng-content />
    </label>
  `,
  host: {
    'data-slot': 'label',
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Label {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** ID of the form element this label is for */
  readonly for = input<string>();

  /** Alternative binding for 'for' attribute (React-style) */
  readonly htmlFor = input<string>();

  /** Computed ID - prefers 'for' over 'htmlFor' */
  protected readonly forId = computed(() => this.for() || this.htmlFor());

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      // Base styles
      'flex items-center gap-2 text-sm font-medium leading-none',
      // Cursor
      'cursor-pointer select-none',
      // Disabled states - peer for sibling inputs, group for parent containers
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
      // Custom classes
      this.class()
    )
  );

  /**
   * Prevents text selection on double-click (Radix behavior).
   * This allows double-clicking the label to focus the control without selecting text.
   */
  protected onMouseDown(event: MouseEvent): void {
    // Only prevent default if the target is the label itself (not nested interactive elements)
    const target = event.target as HTMLElement;
    if (target.closest('button, input, select, textarea')) {
      return;
    }

    // Prevent text selection on double-click
    if (event.detail > 1) {
      event.preventDefault();
    }
  }
}
