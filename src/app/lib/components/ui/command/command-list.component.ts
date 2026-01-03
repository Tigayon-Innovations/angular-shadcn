import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * CommandList component - the scrollable list of items.
 * Matches shadcn/ui React CommandList exactly.
 */
@Component({
  selector: 'CommandList',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandList {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('max-h-[300px] overflow-y-auto overflow-x-hidden', this.class())
  );
}
