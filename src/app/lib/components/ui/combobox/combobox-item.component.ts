import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { COMBOBOX_CONTEXT } from './combobox-context';

import { LucideAngularModule } from 'lucide-angular';

/**
 * ComboboxItem component - individual option in the combobox.
 * Implements WAI-ARIA option pattern with keyboard navigation support.
 */
@Component({
  selector: 'ComboboxItem',
  imports: [LucideAngularModule],
  template: `
    <div #itemElement [class]="innerClass()">
      @if (option()?.icon && iconPosition() === 'left') {
        <lucide-icon [img]="option()?.icon" class="h-4 w-4 shrink" />
      }

      <ng-content />

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
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>

      @if (option()?.icon && iconPosition() === 'right') {
        <lucide-icon [img]="option()?.icon" class="h-4 w-4 shrink ms-auto" />
      }
    </div>
  `,
  host: {
    '[class]': 'computedClass()',
    '[id]': 'optionId()',
    role: 'option',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.data-selected]': 'isSelected() ? "" : null',
    '[attr.data-highlighted]': 'isHighlighted() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '(click)': 'onSelect()',
    '(mouseenter)': 'onMouseEnter()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxItem {
  constructor() {
    // Scroll into view when highlighted
    effect(() => {
      if (this.isHighlighted()) {
        this.itemElement()?.nativeElement?.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }

      // console.log('icon position on combobox item', this.iconPosition());
    });
  }

  private readonly itemElement = viewChild<ElementRef<HTMLDivElement>>('itemElement');

  /** The value of this item */
  readonly value = input.required<string>();

  /** Index of this item in the filtered list */
  readonly index = input<number>(0);
  /** Whether this item is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(COMBOBOX_CONTEXT);

  // readonly iconPosition = this.context.iconPosition();
  readonly iconPosition = computed(() => this.context.iconPosition());
  protected readonly option = computed(() =>
    this.context.options().find((o) => o.value === this.value()),
  );
  protected readonly optionId = computed(() => this.context.getOptionId(this.index()));
  protected readonly isSelected = computed(() => this.context.value() === this.value());
  protected readonly isHighlighted = computed(
    () => this.context.highlightedIndex() === this.index(),
  );
  protected readonly computedClass = computed(() => cn('contents', this.class()));
  protected readonly innerClass = computed(() =>
    cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-2.5 pr-8 text-sm outline-none',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'data-[selected]:bg-accent data-[selected]:text-accent-foreground',
      'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
      'hover:bg-accent hover:text-accent-foreground',
      this.isSelected() && 'bg-accent text-accent-foreground',
      this.isHighlighted() && 'bg-accent text-accent-foreground',
    ),
  );
  protected readonly checkClass = computed(() =>
    cn('absolute right-2 h-4 w-4', this.isSelected() ? 'opacity-100' : 'opacity-0'),
  );

  protected onSelect(): void {
    // console.log('Selecting value:', this.value());
    if (!this.disabled()) {
      this.context.onSelect(this.value());
    }
  }
  protected onMouseEnter(): void {
    if (!this.disabled()) {
      this.context.highlightedIndex.set(this.index());
    }
  }
}
