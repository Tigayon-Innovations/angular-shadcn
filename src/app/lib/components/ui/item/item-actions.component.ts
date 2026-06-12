import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ItemActions component - trailing actions (buttons, icons) for an Item.
 *
 * @example
 * <ItemActions>
 *   <Button variant="outline" size="sm">Open</Button>
 * </ItemActions>
 */
@Component({
  selector: 'ItemActions',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"item-actions"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemActions {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('flex items-center gap-2', this.class()),
  );
}
