import { cn } from '@/lib/utils';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { COMMAND_CONTEXT } from './command-context';

let itemIndexCounter = 0;

/**
 * CommandItem component - a single item in the command list.
 * Matches shadcn/ui React CommandItem exactly.
 * Implements option role with proper focus management.
 */
@Component({
  selector: 'CommandItem',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"option"',
    '[attr.id]': 'itemId',
    '[attr.data-command-index]': 'visibleIndex()',
    '[attr.tabindex]': '"-1"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-selected]': 'isFocused() ? "" : null',
    '[attr.aria-selected]': 'isFocused()',
    '[attr.aria-disabled]': 'disabled()',
    '[hidden]': '!isVisible()',
    '(click)': 'handleClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandItem implements OnInit, OnDestroy {
  constructor() {
    // Scroll into view when focused
    effect(() => {
      if (this.isFocused()) {
        this._elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
      }
    });

    // Update local index after render (browser-only)
    afterNextRender(() => {
      this.updateLocalIndex();
      this.context.itemCount.update((c) => c + 1);
    });
  }

  /** Select event emitted when item is clicked */
  readonly onSelect = output<string>();

  /** Unique value for this item */
  readonly value = input<string>('');
  /** Keywords for search filtering */
  readonly keywords = input<string[]>([]);
  /** Whether the item is disabled */
  readonly disabled = input<boolean>(false);
  /** Additional CSS classes */
  readonly class = input<string>('');

  private readonly _elementRef = inject(ElementRef);

  protected readonly context = inject(COMMAND_CONTEXT);

  /** Whether item matches current search filter */
  protected readonly isVisible = computed(() => {
    return this.context.shouldShowItem(this.value(), this.keywords());
  });
  /** Get visible index among shown items */
  protected readonly visibleIndex = computed(() => {
    if (!this.isVisible()) return -1;

    const parent = this._elementRef.nativeElement.closest('CommandList, [role="listbox"]');
    if (parent) {
      const visibleItems = Array.from(parent.querySelectorAll('CommandItem:not([hidden])'));
      return visibleItems.indexOf(this._elementRef.nativeElement);
    }
    return this.localIndex;
  });
  protected readonly isFocused = computed(() => {
    const focusedIdx = this.context.focusedIndex();
    return this.isVisible() && this.getLocalIndex() === focusedIdx;
  });
  protected readonly computedClass = computed(() =>
    cn(
      'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[selected]:bg-accent data-[selected]:text-accent-foreground data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
      !this.disabled() && 'cursor-pointer hover:bg-accent hover:text-accent-foreground',
      this.class(),
    ),
  );

  readonly itemIndex = itemIndexCounter++;
  readonly itemId = `command-item-${this.itemIndex}`;
  private localIndex = -1;

  ngOnInit(): void {
    this.context.registerItem(this.value());
  }
  ngOnDestroy(): void {
    this.context.unregisterItem(this.value());
    this.context.itemCount.update((c) => Math.max(0, c - 1));
  }

  private updateLocalIndex(): void {
    // Find our position among sibling command items
    const parent = this._elementRef.nativeElement.closest('CommandList, [role="listbox"]');
    if (parent) {
      const items = Array.from(parent.querySelectorAll('CommandItem'));
      this.localIndex = items.indexOf(this._elementRef.nativeElement);
    }
  }
  private getLocalIndex(): number {
    // Dynamically compute index based on visible DOM position
    const parent = this._elementRef.nativeElement.closest('CommandList, [role="listbox"]');
    if (parent) {
      const visibleItems = Array.from(parent.querySelectorAll('CommandItem:not([hidden])'));
      return visibleItems.indexOf(this._elementRef.nativeElement);
    }
    return this.localIndex;
  }
  protected handleClick(): void {
    if (this.disabled() || !this.isVisible()) return;
    this.context.selectedValue.set(this.value());
    this.onSelect.emit(this.value());
  }
}
