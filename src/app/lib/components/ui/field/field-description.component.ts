import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * FieldDescription component - helper text for a Field.
 *
 * @example
 * <Field>
 *   <FieldLabel htmlFor="email">Email</FieldLabel>
 *   <input Input id="email" type="email" />
 *   <FieldDescription>We will never share your email.</FieldDescription>
 * </Field>
 */
@Component({
  selector: 'FieldDescription',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"field-description"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldDescription {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'text-muted-foreground text-sm leading-normal font-normal',
      'group-has-[[data-orientation=horizontal]]/field:text-balance',
      this.class(),
    ),
  );
}
