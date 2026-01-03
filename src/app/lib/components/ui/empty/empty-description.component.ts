import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * EmptyDescription component - description for the empty state.
 */
@Component({
  selector: 'EmptyDescription',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyDescription {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'mb-4 mt-2 text-sm text-muted-foreground max-w-sm mx-auto',
      this.class()
    )
  );
}
