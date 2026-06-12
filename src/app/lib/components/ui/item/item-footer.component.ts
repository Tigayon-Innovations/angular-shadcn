import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ItemFooter component - full-width footer row inside an Item.
 *
 * @example
 * <Item>
 *   <ItemContent>...</ItemContent>
 *   <ItemFooter>Footer content</ItemFooter>
 * </Item>
 */
@Component({
  selector: 'ItemFooter',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"item-footer"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemFooter {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('flex basis-full items-center justify-between gap-2', this.class()),
  );
}
