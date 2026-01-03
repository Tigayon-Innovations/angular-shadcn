import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ToastTitle component - toast title text.
 * Matches shadcn/ui React ToastTitle exactly.
 */
@Component({
  selector: 'ToastTitle',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastTitle {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-sm font-semibold [&+div]:text-xs', this.class())
  );
}
