import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ItemContent component - main content area of an Item, holding
 * the title and description.
 *
 * @example
 * <ItemContent>
 *   <ItemTitle>Title</ItemTitle>
 *   <ItemDescription>Description</ItemDescription>
 * </ItemContent>
 */
@Component({
  selector: 'ItemContent',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"item-content"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemContent {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none', this.class()),
  );
}
