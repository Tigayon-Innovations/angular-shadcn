import { cn } from '@/lib/utils';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';
import { COMMAND_CONTEXT } from './command-context';

/**
 * CommandInput component - the search input for the command palette.
 * Matches shadcn/ui React CommandInput exactly.
 * Implements combobox pattern with arrow key navigation.
 */
@Component({
  selector: 'CommandInput',
  imports: [LucideAngularModule],
  template: `
    <div class="flex items-center border-b px-3" cmdk-input-wrapper>
      <lucide-icon [img]="SearchIcon" class="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        #inputEl
        [class]="computedClass()"
        [placeholder]="placeholder()"
        [value]="context.search()"
        [id]="context.inputId"
        role="combobox"
        [attr.aria-expanded]="true"
        [attr.aria-controls]="context.listId"
        [attr.aria-activedescendant]="activeDescendant()"
        aria-autocomplete="list"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        (input)="onInput($event)"
        (keydown)="onKeydown($event)"
        type="text"
      />
    </div>
  `,
  host: {
    'attr.data-slot': '"command-input-wrapper"',
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandInput {
  constructor() {
    // Auto-focus input when rendered (browser-only)
    afterNextRender(() => {
      const el = this.inputEl();
      if (el) {
        el.nativeElement.focus();
      }
    });
  }

  private readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');

  /** Placeholder text */
  readonly placeholder = input<string>('Search...');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(COMMAND_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(
      'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
      this.class(),
    ),
  );
  protected readonly activeDescendant = computed(() => {
    const index = this.context.focusedIndex();
    if (index >= 0) {
      return `command-item-${index}`;
    }
    return null;
  });

  protected readonly SearchIcon = Search;

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.context.search.set(target.value);
    // Reset focus to first visible item when searching
    this.context.focusedIndex.set(0);
  }
  protected onKeydown(event: KeyboardEvent): void {
    const currentIndex = this.context.focusedIndex();
    const listEl = document.getElementById(this.context.listId);
    const visibleItems = listEl
      ? Array.from(listEl.querySelectorAll('CommandItem:not([hidden])'))
      : [];
    const visibleCount = visibleItems.length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (visibleCount > 0) {
          const nextIndex = currentIndex < visibleCount - 1 ? currentIndex + 1 : 0;
          this.context.focusedIndex.set(nextIndex);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (visibleCount > 0) {
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleCount - 1;
          this.context.focusedIndex.set(prevIndex);
        }
        break;
      case 'Home':
        event.preventDefault();
        if (visibleCount > 0) {
          this.context.focusedIndex.set(0);
        }
        break;
      case 'End':
        event.preventDefault();
        if (visibleCount > 0) {
          this.context.focusedIndex.set(visibleCount - 1);
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (currentIndex >= 0 && currentIndex < visibleCount) {
          (visibleItems[currentIndex] as HTMLElement).click();
        }
        break;
    }
  }
}
