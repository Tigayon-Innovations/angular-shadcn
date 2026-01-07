import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { DIALOG_CONTEXT } from './dialog-context';

/**
 * DialogDescription component - description text of the dialog.
 * Matches shadcn/ui React DialogDescription exactly.
 * Automatically links to dialog via aria-describedby.
 */
@Component({
  selector: 'DialogDescription',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.id]': 'context.descriptionId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDescription {
  protected readonly context = inject(DIALOG_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}
