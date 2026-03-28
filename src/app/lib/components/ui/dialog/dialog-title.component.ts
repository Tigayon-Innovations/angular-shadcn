import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DIALOG_CONTEXT } from './dialog-context';

/**
 * DialogTitle component - title text of the dialog.
 * Matches shadcn/ui React DialogTitle exactly.
 * Automatically links to dialog via aria-labelledby.
 */
@Component({
  selector: 'DialogTitle',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.id]': 'context.titleId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTitle {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(DIALOG_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn('text-lg font-semibold leading-none tracking-tight', this.class()),
  );
}
