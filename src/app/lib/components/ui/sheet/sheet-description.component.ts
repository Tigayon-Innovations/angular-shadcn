import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SHEET_CONTEXT } from './sheet-context';

/**
 * SheetDescription component - description text of the sheet.
 * Matches shadcn/ui React SheetDescription exactly.
 * Automatically links to sheet via aria-describedby.
 */
@Component({
  selector: 'SheetDescription',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"sheet-description"',
    '[class]': 'computedClass()',
    '[attr.id]': 'context.descriptionId',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetDescription {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(SHEET_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class()),
  );
}
