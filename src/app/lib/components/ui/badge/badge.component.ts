import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { badgeVariants, type BadgeVariants } from './badge-variants';

/**
 * Badge component that applies shadcn badge styles.
 *
 * @example
 * <!-- Default badge -->
 * <Badge>New</Badge>
 *
 * <!-- With variant -->
 * <Badge variant="secondary">Beta</Badge>
 *
 * <!-- Destructive -->
 * <Badge variant="destructive">Error</Badge>
 *
 * <!-- Outline -->
 * <Badge variant="outline">Tag</Badge>
 */
@Component({
  selector: 'Badge',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Badge {
  /** The visual style variant of the badge */
  readonly variant = input<BadgeVariants['variant']>('default');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      badgeVariants({
        variant: this.variant(),
      }),
      this.class(),
    ),
  );
}
