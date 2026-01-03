import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * SheetTitle component - title text of the sheet.
 * Matches shadcn/ui React SheetTitle exactly.
 */
@Component({
  selector: 'SheetTitle',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetTitle {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-lg font-semibold text-foreground', this.class())
  );
}
