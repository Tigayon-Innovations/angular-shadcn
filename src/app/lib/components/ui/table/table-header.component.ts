import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * TableHeader component - thead wrapper.
 * Matches shadcn/ui React TableHeader exactly.
 */
@Component({
  selector: 'TableHeader',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeader {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('[&_tr]:border-b', this.class())
  );
}
