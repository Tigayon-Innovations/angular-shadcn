import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';
import { badgeVariants, type BadgeVariants } from './badge-variants';

/**
 * Badge component that applies shadcn badge styles.
 *
 * @example
 * <!-- Default badge -->
 * <span Badge>New</span>
 *
 * <!-- With variant -->
 * <span Badge variant="secondary">Beta</span>
 *
 * <!-- Destructive -->
 * <span Badge variant="destructive">Error</span>
 *
 * <!-- Outline -->
 * <span Badge variant="outline">Tag</span>
 */
@Component({
  selector: '[Badge]',
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
      this.class()
    )
  );
}
