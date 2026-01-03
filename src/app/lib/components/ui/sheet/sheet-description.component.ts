import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * SheetDescription component - description text of the sheet.
 * Matches shadcn/ui React SheetDescription exactly.
 */
@Component({
  selector: 'SheetDescription',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetDescription {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}
