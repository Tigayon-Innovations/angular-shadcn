import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * ItemMedia variants using class-variance-authority.
 * Matches shadcn/ui React item-media exactly.
 */
export const itemMediaVariants = cva(
  'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image: 'size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ItemMediaVariants = VariantProps<typeof itemMediaVariants>;
export type ItemMediaVariant = 'default' | 'icon' | 'image';

/**
 * ItemMedia component - leading media (icon, image or avatar) for an Item.
 *
 * @example
 * <!-- Icon -->
 * <ItemMedia variant="icon">
 *   <lucide-icon [img]="Music" />
 * </ItemMedia>
 *
 * <!-- Image -->
 * <ItemMedia variant="image">
 *   <img src="..." alt="..." />
 * </ItemMedia>
 */
@Component({
  selector: 'ItemMedia',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"item-media"',
    '[attr.data-variant]': 'variant()',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemMedia {
  /** The visual style variant of the media container */
  readonly variant = input<ItemMediaVariant>('default');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles, variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(itemMediaVariants({ variant: this.variant() }), this.class()),
  );
}
