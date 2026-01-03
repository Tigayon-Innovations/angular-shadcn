import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * DialogDescription component - description text of the dialog.
 * Matches shadcn/ui React DialogDescription exactly.
 */
@Component({
  selector: 'DialogDescription',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDescription {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}
