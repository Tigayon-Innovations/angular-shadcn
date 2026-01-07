import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { SHEET_CONTEXT } from './sheet-context';

/**
 * SheetTitle component - title text of the sheet.
 * Matches shadcn/ui React SheetTitle exactly.
 * Automatically links to sheet via aria-labelledby.
 */
@Component({
  selector: 'SheetTitle',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.id]': 'context.titleId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetTitle {
  protected readonly context = inject(SHEET_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-lg font-semibold text-foreground', this.class())
  );
}
