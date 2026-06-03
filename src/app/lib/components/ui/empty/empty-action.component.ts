import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * EmptyAction component - container for action buttons in empty state.
 */
@Component({
  selector: 'EmptyAction',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"empty-action"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyAction {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() => cn('mt-2', this.class()));
}
