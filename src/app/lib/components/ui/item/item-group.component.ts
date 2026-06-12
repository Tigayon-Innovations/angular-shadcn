import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ItemGroup component - container that stacks multiple Item components.
 *
 * @example
 * <ItemGroup>
 *   <Item>...</Item>
 *   <ItemSeparator />
 *   <Item>...</Item>
 * </ItemGroup>
 */
@Component({
  selector: 'ItemGroup',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"item-group"',
    role: 'list',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemGroup {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('group/item-group flex flex-col', this.class()),
  );
}
