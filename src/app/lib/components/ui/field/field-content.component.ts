import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * FieldContent component - groups a field's title/label and description,
 * useful in horizontal orientation next to a control.
 *
 * @example
 * <Field orientation="horizontal">
 *   <FieldContent>
 *     <FieldTitle>Enable notifications</FieldTitle>
 *     <FieldDescription>Receive updates about your account.</FieldDescription>
 *   </FieldContent>
 *   <Switch />
 * </Field>
 */
@Component({
  selector: 'FieldContent',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"field-content"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldContent {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('group/field-content flex flex-1 flex-col gap-1.5 leading-snug', this.class()),
  );
}
