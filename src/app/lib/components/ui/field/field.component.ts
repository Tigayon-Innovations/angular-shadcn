import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Field variants using class-variance-authority.
 * Matches shadcn/ui React field exactly.
 */
export const fieldVariants = cva('group/field flex w-full gap-3 data-[invalid=true]:text-destructive', {
  variants: {
    orientation: {
      vertical: 'flex-col [&>*]:w-full [&>.sr-only]:w-auto',
      horizontal: 'flex-row items-center [&>[data-slot=field-label]]:flex-auto',
      responsive:
        'flex-col [&>*]:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export type FieldVariants = VariantProps<typeof fieldVariants>;
export type FieldOrientation = 'vertical' | 'horizontal' | 'responsive';

/**
 * Field component - wraps a single form field with its label,
 * control, description and error message.
 *
 * @example
 * <!-- Vertical (default) -->
 * <Field>
 *   <FieldLabel htmlFor="email">Email</FieldLabel>
 *   <input Input id="email" type="email" />
 *   <FieldDescription>We never share your email.</FieldDescription>
 * </Field>
 *
 * <!-- Horizontal -->
 * <Field orientation="horizontal">
 *   <FieldLabel htmlFor="newsletter">Subscribe to newsletter</FieldLabel>
 *   <Switch id="newsletter" />
 * </Field>
 */
@Component({
  selector: 'Field',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"field"',
    role: 'group',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Field {
  /** Layout orientation of the field */
  readonly orientation = input<FieldOrientation>('vertical');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles, variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(fieldVariants({ orientation: this.orientation() }), this.class()),
  );
}
