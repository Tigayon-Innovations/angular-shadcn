import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * Skeleton component that creates a loading placeholder.
 * Use to show a placeholder while content is loading.
 *
 * @example
 * <!-- Basic skeleton -->
 * <Skeleton class="h-4 w-[250px]" />
 *
 * <!-- Circle skeleton (avatar) -->
 * <Skeleton class="h-12 w-12 rounded-full" />
 *
 * <!-- Card skeleton -->
 * <div class="flex flex-col space-y-3">
 *   <Skeleton class="h-[125px] w-[250px] rounded-xl" />
 *   <div class="space-y-2">
 *     <Skeleton class="h-4 w-[250px]" />
 *     <Skeleton class="h-4 w-[200px]" />
 *   </div>
 * </div>
 */
@Component({
  selector: 'Skeleton',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    'aria-busy': 'true',
    '[attr.aria-label]': 'ariaLabel()',
    'role': 'status',
    'data-slot': 'skeleton',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skeleton {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Accessible label for the loading skeleton */
  readonly ariaLabel = input<string>('Loading...');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('bg-accent animate-pulse rounded-md', this.class())
  );
}
