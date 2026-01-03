import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    viewChild,
} from '@angular/core';
import { SELECT_CONTEXT } from './select-context';

/**
 * SelectItem component - individual selectable option.
 *
 * @example
 * <SelectItem value="apple">Apple</SelectItem>
 */
@Component({
  selector: 'SelectItem',
  template: `
    <span
      class="absolute left-2 flex size-3.5 items-center justify-center"
    >
      @if (isSelected()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      }
    </span>
    <span #textContent data-slot="select-item-text">
      <ng-content />
    </span>
  `,
  host: {
    '[class]': 'computedClass()',
    'role': 'option',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.data-state]': 'isSelected() ? "checked" : "unchecked"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-highlighted]': 'null',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '(click)': 'select()',
    '(keydown.space)': 'select(); $event.preventDefault()',
    '(keydown.enter)': 'select(); $event.preventDefault()',
    'data-slot': 'select-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectItem {
  private readonly context = inject(SELECT_CONTEXT, { optional: true });

  private readonly textContent = viewChild<ElementRef>('textContent');

  /** The value of this option */
  readonly value = input.required<string>();

  /** Whether this option is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Whether this item is selected */
  protected readonly isSelected = computed(() => {
    return this.context?.value() === this.value();
  });

  /** Select this option */
  select() {
    if (!this.disabled()) {
      const textEl = this.textContent()?.nativeElement;
      const label = textEl?.textContent?.trim() || this.value();
      this.context?.setValue(this.value(), label);
    }
  }

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
      'hover:bg-accent hover:text-accent-foreground cursor-pointer',
      this.disabled() && 'pointer-events-none opacity-50',
      this.class()
    )
  );
}
