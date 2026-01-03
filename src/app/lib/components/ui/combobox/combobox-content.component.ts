import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { COMBOBOX_CONTEXT } from './combobox-context';

/**
 * ComboboxContent component - container for the combobox dropdown.
 */
@Component({
  selector: 'ComboboxContent',
  template: `
    @if (context.open()) {
      <ng-content />
    }
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-state]': 'context.open() ? "open" : "closed"',
    '(clickOutside)': 'onClickOutside()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxContent {
  protected readonly context = inject(COMBOBOX_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'absolute z-50 mt-1 max-h-60 w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      this.class()
    )
  );

  protected onClickOutside(): void {
    this.context.onOpenChange(false);
  }
}
