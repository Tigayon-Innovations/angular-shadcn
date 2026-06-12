import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ItemDescription component - secondary description text for an Item.
 *
 * @example
 * <ItemDescription>A short summary of the item.</ItemDescription>
 */
@Component({
  selector: 'ItemDescription',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"item-description"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDescription {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance',
      this.class(),
    ),
  );
}
