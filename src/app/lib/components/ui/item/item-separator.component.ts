import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ItemSeparator component - horizontal divider between items in an ItemGroup.
 *
 * @example
 * <ItemGroup>
 *   <Item>...</Item>
 *   <ItemSeparator />
 *   <Item>...</Item>
 * </ItemGroup>
 */
@Component({
  selector: 'ItemSeparator',
  template: ``,
  host: {
    'attr.data-slot': '"item-separator"',
    role: 'none',
    'attr.data-orientation': '"horizontal"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemSeparator {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('bg-border shrink-0 h-px w-full my-0', this.class()),
  );
}
