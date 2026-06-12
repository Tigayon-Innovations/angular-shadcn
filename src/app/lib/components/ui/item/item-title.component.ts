import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ItemTitle component - title text for an Item.
 *
 * @example
 * <ItemTitle>Basic Item</ItemTitle>
 */
@Component({
  selector: 'ItemTitle',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"item-title"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemTitle {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('flex w-fit items-center gap-2 text-sm leading-snug font-medium', this.class()),
  );
}
