import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * AlertDialogDescription component - description text of the alert dialog.
 * Matches shadcn/ui React AlertDialogDescription exactly.
 */
@Component({
  selector: 'AlertDialogDescription',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogDescription {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}
