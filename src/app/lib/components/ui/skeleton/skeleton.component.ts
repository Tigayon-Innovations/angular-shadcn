import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { cn } from '@/lib/utils';

/**
 * Skeleton component that creates a loading placeholder.
 * Use to show a placeholder while content is loading.
 *
 * @example
 * <!-- Basic skeleton -->
 * <div Skeleton class="h-4 w-[250px]"></div>
 *
 * <!-- Circle skeleton (avatar) -->
 * <div Skeleton class="h-12 w-12 rounded-full"></div>
 *
 * <!-- Card skeleton -->
 * <div class="flex flex-col space-y-3">
 *   <div Skeleton class="h-[125px] w-[250px] rounded-xl"></div>
 *   <div class="space-y-2">
 *     <div Skeleton class="h-4 w-[250px]"></div>
 *     <div Skeleton class="h-4 w-[200px]"></div>
 *   </div>
 * </div>
 */
@Component({
  selector: '[Skeleton]',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'skeleton',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skeleton {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('bg-accent animate-pulse rounded-md', this.class())
  );
}
