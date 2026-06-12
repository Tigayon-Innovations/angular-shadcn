import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type FieldLegendVariant = 'legend' | 'label';

/**
 * FieldLegend component - legend/title for a FieldSet.
 *
 * @example
 * <FieldLegend>Address Information</FieldLegend>
 *
 * <!-- Label-sized legend -->
 * <FieldLegend variant="label">Notifications</FieldLegend>
 */
@Component({
  selector: 'FieldLegend',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"field-legend"',
    '[attr.data-variant]': 'variant()',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldLegend {
  /** The visual variant of the legend */
  readonly variant = input<FieldLegendVariant>('legend');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'mb-3 font-medium',
      'data-[variant=legend]:text-base',
      'data-[variant=label]:text-sm',
      this.class(),
    ),
  );
}
