import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * EmptyTitle component - title for the empty state.
 */
@Component({
  selector: 'EmptyTitle',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"empty-title"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyTitle {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() => cn('mt-4 text-lg font-semibold', this.class()));
}
