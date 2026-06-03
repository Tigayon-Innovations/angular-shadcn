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
import { LucideAngularModule, Search } from 'lucide-angular';
import { COMBOBOX_CONTEXT } from './combobox-context';

/**
 * ComboboxInput component - search input for filtering options.
 * Supports keyboard navigation within the combobox.
 */
@Component({
  selector: 'ComboboxInput',
  imports: [LucideAngularModule],
  template: `
    <lucide-icon [img]="SearchIcon" class="mr-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
    <input
      #searchInput
      type="text"
      [class]="inputClass()"
      [placeholder]="placeholder()"
      [value]="context.search()"
      role="searchbox"
      [attr.aria-label]="placeholder()"
      [attr.aria-controls]="context.listboxId"
      [attr.aria-activedescendant]="context.activeDescendantId()"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      (input)="onInput($event)"
      (keydown)="onKeyDown($event)"
    />
  `,
  host: {
    'attr.data-slot': '"combobox-input"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxInput {
  constructor() {
    // Auto-focus input when combobox opens
    effect(() => {
      if (this.context.open()) {
        setTimeout(() => {
          this.searchInput()?.nativeElement?.focus();
        }, 0);
      }
    });
  }

  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  /** Placeholder text */
  readonly placeholder = input<string>('Search...');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(COMBOBOX_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn('flex items-center border-b px-3', this.class()),
  );
  protected readonly inputClass = computed(() =>
    cn(
      'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
    ),
  );

  protected readonly SearchIcon = Search;

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.context.onSearch(target.value);
  }
  protected onKeyDown(event: KeyboardEvent): void {
    // Pass keyboard events to the main handler for navigation
    this.context.onKeyDown(event);
  }
}
