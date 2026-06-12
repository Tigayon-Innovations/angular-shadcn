import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * FieldGroup component - container that stacks multiple Field components.
 *
 * @example
 * <FieldGroup>
 *   <Field>...</Field>
 *   <FieldSeparator />
 *   <Field>...</Field>
 * </FieldGroup>
 */
@Component({
  selector: 'FieldGroup',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"field-group"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldGroup {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3',
      this.class(),
    ),
  );
}
