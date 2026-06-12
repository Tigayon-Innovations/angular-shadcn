import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * FieldSet component - groups related fields together with fieldset semantics.
 *
 * @example
 * <FieldSet>
 *   <FieldLegend>Profile</FieldLegend>
 *   <FieldGroup>
 *     <Field>...</Field>
 *   </FieldGroup>
 * </FieldSet>
 */
@Component({
  selector: 'FieldSet',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"field-set"',
    role: 'group',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldSet {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'flex flex-col gap-6',
      'has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
      this.class(),
    ),
  );
}
