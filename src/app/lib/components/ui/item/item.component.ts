import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Item variants using class-variance-authority.
 * Matches shadcn/ui React item exactly.
 */
export const itemVariants = cva(
  'group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-border',
        muted: 'bg-muted/50',
      },
      size: {
        default: 'p-4 gap-4',
        sm: 'py-3 px-4 gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ItemVariants = VariantProps<typeof itemVariants>;
export type ItemVariant = 'default' | 'outline' | 'muted';
export type ItemSize = 'default' | 'sm';

/**
 * Item component - a flexible row for displaying content with
 * media, title, description and actions.
 *
 * @example
 * <Item variant="outline">
 *   <ItemMedia variant="icon">
 *     <lucide-icon [img]="User" />
 *   </ItemMedia>
 *   <ItemContent>
 *     <ItemTitle>Profile</ItemTitle>
 *     <ItemDescription>Manage your profile settings.</ItemDescription>
 *   </ItemContent>
 *   <ItemActions>
 *     <Button size="sm">Edit</Button>
 *   </ItemActions>
 * </Item>
 */
@Component({
  selector: 'Item',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"item"',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Item {
  /** The visual style variant of the item */
  readonly variant = input<ItemVariant>('default');

  /** The size of the item */
  readonly size = input<ItemSize>('default');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles, variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(itemVariants({ variant: this.variant(), size: this.size() }), this.class()),
  );
}
