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
 * ComboboxItem component - individual option in the combobox.
 */
@Component({
  selector: 'ComboboxItem',
  template: `
    <svg
      [class]="checkClass()"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
    <ng-content />
  `,
  host: {
    '[class]': 'computedClass()',
    role: 'option',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.data-selected]': 'isSelected() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '(click)': 'onSelect()',
    '(keydown.enter)': 'onSelect()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxItem {
  protected readonly context = inject(COMBOBOX_CONTEXT);

  /** The value of this item */
  readonly value = input.required<string>();

  /** Whether this item is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly isSelected = computed(
    () => this.context.value() === this.value()
  );

  protected readonly computedClass = computed(() =>
    cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[selected]:bg-accent data-[selected]:text-accent-foreground data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
      this.class()
    )
  );

  protected readonly checkClass = computed(() =>
    cn(
      'absolute right-2 h-4 w-4',
      this.isSelected() ? 'opacity-100' : 'opacity-0'
    )
  );

  protected onSelect(): void {
    if (!this.disabled()) {
      this.context.onSelect(this.value());
    }
  }
}
