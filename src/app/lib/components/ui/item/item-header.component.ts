import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ItemHeader component - full-width header row inside an Item.
 *
 * @example
 * <Item>
 *   <ItemHeader>Header content</ItemHeader>
 *   <ItemContent>...</ItemContent>
 * </Item>
 */
@Component({
  selector: 'ItemHeader',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"item-header"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemHeader {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('flex basis-full items-center justify-between gap-2', this.class()),
  );
}
