import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * TableRow component - tr wrapper.
 * Matches shadcn/ui React TableRow exactly.
 */
@Component({
  selector: 'TableRow',
  template: `<tr [class]="computedClass()" [attr.data-state]="selected() ? 'selected' : null"><ng-content /></tr>`,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRow {
  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Whether the row is selected */
  readonly selected = input<boolean>(false);

  protected readonly computedClass = computed(() =>
    cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      this.class()
    )
  );
}
