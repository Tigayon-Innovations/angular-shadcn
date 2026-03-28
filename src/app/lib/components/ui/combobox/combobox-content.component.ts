import { cn, Presence } from '@/lib/utils';
import { ClickOutsideDirective } from '@/lib/utils/accessibility';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { COMBOBOX_CONTEXT } from './combobox-context';

/**
 * ComboboxContent component - container for the combobox dropdown.
 * Implements proper listbox role and click-outside behavior.
 */
@Component({
  selector: 'ComboboxContent',
  imports: [ClickOutsideDirective, Presence],
  template: `
    <Presence [present]="context.open()">
      <div
        [id]="context.listboxId"
        [class]="dropdownClass()"
        [attr.data-state]="context.open() ? 'open' : 'closed'"
        role="listbox"
        [attr.aria-labelledby]="context.id + '-trigger'"
        (clickOutside)="onClickOutside()"
      >
        <ng-content />
      </div>
    </Presence>
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-state]': 'context.open() ? "open" : "closed"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxContent {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(COMBOBOX_CONTEXT);

  protected readonly computedClass = computed(() => cn('contents'));
  protected readonly dropdownClass = computed(() =>
    cn(
      'absolute z-50 mt-1 max-h-72 w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      this.class(),
    ),
  );

  protected onClickOutside(): void {
    this.context.onOpenChange(false);
  }
}
