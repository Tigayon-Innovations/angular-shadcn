import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    OnDestroy,
    OnInit,
    viewChild,
} from '@angular/core';
import { SELECT_CONTEXT } from './select-context';

/**
 * SelectItem component - individual selectable option.
 * Implements proper ARIA option pattern with keyboard navigation.
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
    '[attr.data-value]': 'value()',
    '[attr.data-highlighted]': 'isFocused() ? "" : null',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '(click)': 'select()',
    '(keydown)': 'onKeyDown($event)',
    'data-slot': 'select-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectItem implements OnInit, OnDestroy {
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

  /** Whether this item is focused */
  protected readonly isFocused = computed(() => {
    if (!this.context) return false;
    const values = this.context.itemValues();
    const focusedIndex = this.context.focusedIndex();
    return values[focusedIndex] === this.value();
  });

  ngOnInit(): void {
    // Register this item
    this.context?.itemValues.update(values => {
      if (!values.includes(this.value())) {
        return [...values, this.value()];
      }
      return values;
    });
  }

  ngOnDestroy(): void {
    // Unregister this item
    this.context?.itemValues.update(values =>
      values.filter(v => v !== this.value())
    );
  }

  /** Select this option */
  select() {
    if (!this.disabled()) {
      const textEl = this.textContent()?.nativeElement;
      const label = textEl?.textContent?.trim() || this.value();
      this.context?.setValue(this.value(), label);
    }
  }

  /** Handle keyboard navigation */
  onKeyDown(event: KeyboardEvent): void {
    if (!this.context || this.disabled()) return;

    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.select();
        break;
      case 'ArrowDown':
        event.preventDefault();
        const currentIndex = this.context.focusedIndex();
        const itemCount = this.context.itemValues().length;
        this.context.focusItem(Math.min(currentIndex + 1, itemCount - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        const idx = this.context.focusedIndex();
        this.context.focusItem(Math.max(idx - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        this.context.focusItem(0);
        break;
      case 'End':
        event.preventDefault();
        const lastIndex = this.context.itemValues().length - 1;
        this.context.focusItem(lastIndex);
        break;
      case 'Escape':
        event.preventDefault();
        this.context.open.set(false);
        break;
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
