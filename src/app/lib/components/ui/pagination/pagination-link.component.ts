import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { buttonVariants } from '../button/button-variants';

/**
 * PaginationLink component - page link.
 * Matches shadcn/ui React PaginationLink exactly.
 */
@Component({
  selector: 'PaginationLink',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.href]': 'href()',
    '[attr.aria-current]': 'isActive() ? "page" : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationLink {
  /** Link href */
  readonly href = input<string>('#');

  /** Whether this is the active page */
  readonly isActive = input<boolean>(false);

  /** Size of the link */
  readonly size = input<'default' | 'sm' | 'lg' | 'icon'>('icon');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      buttonVariants({
        variant: this.isActive() ? 'outline' : 'ghost',
        size: this.size(),
      }),
      this.class(),
    ),
  );
}
