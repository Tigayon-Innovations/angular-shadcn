import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * SheetHeader component - header area of the sheet.
 * Matches shadcn/ui React SheetHeader exactly.
 */
@Component({
  selector: 'SheetHeader',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetHeader {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex flex-col space-y-2 text-center sm:text-left', this.class())
  );
}
