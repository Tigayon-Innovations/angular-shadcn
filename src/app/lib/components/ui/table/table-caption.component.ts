import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * TableCaption component - caption wrapper.
 * Matches shadcn/ui React TableCaption exactly.
 */
@Component({
  selector: 'TableCaption',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCaption {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('mt-4 text-sm text-muted-foreground', this.class())
  );
}
