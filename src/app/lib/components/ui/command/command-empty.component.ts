import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * CommandEmpty component - displayed when no results are found.
 * Matches shadcn/ui React CommandEmpty exactly.
 */
@Component({
  selector: 'CommandEmpty',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandEmpty {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn('py-6 text-center text-sm', this.class()));
}
