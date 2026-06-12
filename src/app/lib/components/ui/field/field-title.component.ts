import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * FieldTitle component - title text inside FieldContent.
 *
 * @example
 * <FieldContent>
 *   <FieldTitle>Two-factor authentication</FieldTitle>
 *   <FieldDescription>Add an extra layer of security.</FieldDescription>
 * </FieldContent>
 */
@Component({
  selector: 'FieldTitle',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"field-title"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldTitle {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('flex w-fit items-center gap-2 text-sm leading-snug font-medium', this.class()),
  );
}
