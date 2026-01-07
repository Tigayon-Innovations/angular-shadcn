import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    forwardRef,
    input,
    output,
    signal,
} from '@angular/core';
import {
    COMBOBOX_CONTEXT,
    type ComboboxContext,
    type ComboboxOption,
} from './combobox-context';

let comboboxIdCounter = 0;

/**
 * Combobox component - searchable dropdown with autocomplete.
 * Implements WAI-ARIA Combobox pattern with full keyboard navigation.
 *
 * @example
 * <Combobox [options]="options" [(value)]="selected">
 *   <ComboboxTrigger>
 *     <ComboboxValue placeholder="Select option..." />
 *   </ComboboxTrigger>
 *   <ComboboxContent>
 *     <ComboboxInput placeholder="Search..." />
 *     <ComboboxEmpty>No options found.</ComboboxEmpty>
 *     <ComboboxGroup>
 *       @for (option of filteredOptions(); track option.value; let i = $index) {
 *         <ComboboxItem [value]="option.value" [index]="i">{{ option.label }}</ComboboxItem>
 *       }
 *     </ComboboxGroup>
 *   </ComboboxContent>
 * </Combobox>
 */
@Component({
  selector: 'Combobox',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'combobox',
  },
  providers: [
    {
      provide: COMBOBOX_CONTEXT,
      useFactory: (component: Combobox) => component.context,
      deps: [forwardRef(() => Combobox)],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Combobox {
  private readonly uniqueId = `combobox-${++comboboxIdCounter}`;

  /** Available options */
  readonly options = input<ComboboxOption[]>([]);

  /** Currently selected value */
  readonly value = input<string>('');

  /** Value change event */
  readonly valueChange = output<string>();

  /** Open state change event */
  readonly openChange = output<boolean>();

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Internal signals */
  private readonly _options = signal<ComboboxOption[]>([]);
  private readonly _value = signal<string>('');
  private readonly _open = signal<boolean>(false);
  private readonly _search = signal<string>('');
  private readonly _highlightedIndex = signal<number>(-1);

  /** Computed filtered options */
  private readonly _filteredOptions = computed(() => {
    const options = this._options();
    const search = this._search().toLowerCase().trim();

    if (!search) {
      return options;
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(search)
    );
  });

  /** Computed active descendant ID */
  private readonly _activeDescendantId = computed(() => {
    const index = this._highlightedIndex();
    const filtered = this._filteredOptions();
    if (index >= 0 && index < filtered.length) {
      return `${this.uniqueId}-option-${index}`;
    }
    return null;
  });

  /** Context for child components */
  readonly context: ComboboxContext = {
    id: this.uniqueId,
    open: this._open,
    value: this._value,
    search: this._search,
    options: this._options,
    filteredOptions: this._filteredOptions,
    highlightedIndex: this._highlightedIndex,
    listboxId: `${this.uniqueId}-listbox`,
    activeDescendantId: this._activeDescendantId,

    onSelect: (value: string) => {
      this._value.set(value);
      this._open.set(false);
      this._search.set('');
      this._highlightedIndex.set(-1);
      this.valueChange.emit(value);
    },

    onOpenChange: (open: boolean) => {
      this._open.set(open);
      if (!open) {
        this._search.set('');
        this._highlightedIndex.set(-1);
      } else {
        // When opening, highlight current value if exists
        const currentValue = this._value();
        if (currentValue) {
          const index = this._filteredOptions().findIndex(o => o.value === currentValue);
          if (index >= 0) {
            this._highlightedIndex.set(index);
          }
        }
      }
      this.openChange.emit(open);
    },

    onSearch: (searchTerm: string) => {
      this._search.set(searchTerm);
      // Reset highlight when search changes
      this._highlightedIndex.set(searchTerm ? 0 : -1);
    },

    onKeyDown: (event: KeyboardEvent) => {
      this.handleKeyDown(event);
    },

    highlightPrevious: () => {
      const filtered = this._filteredOptions();
      if (filtered.length === 0) return;

      const current = this._highlightedIndex();
      let newIndex = current - 1;

      // Skip disabled options
      while (newIndex >= 0 && filtered[newIndex]?.disabled) {
        newIndex--;
      }

      if (newIndex < 0) {
        newIndex = filtered.length - 1;
        while (newIndex > 0 && filtered[newIndex]?.disabled) {
          newIndex--;
        }
      }

      this._highlightedIndex.set(newIndex);
    },

    highlightNext: () => {
      const filtered = this._filteredOptions();
      if (filtered.length === 0) return;

      const current = this._highlightedIndex();
      let newIndex = current + 1;

      // Skip disabled options
      while (newIndex < filtered.length && filtered[newIndex]?.disabled) {
        newIndex++;
      }

      if (newIndex >= filtered.length) {
        newIndex = 0;
        while (newIndex < filtered.length && filtered[newIndex]?.disabled) {
          newIndex++;
        }
      }

      this._highlightedIndex.set(newIndex);
    },

    selectHighlighted: () => {
      const index = this._highlightedIndex();
      const filtered = this._filteredOptions();
      if (index >= 0 && index < filtered.length) {
        const option = filtered[index];
        if (!option.disabled) {
          this.context.onSelect(option.value);
        }
      }
    },

    getOptionId: (index: number) => `${this.uniqueId}-option-${index}`,
  };

  protected readonly computedClass = computed(() =>
    cn('relative inline-block', this.class())
  );

  constructor() {
    // Sync options from input to internal signal
    effect(() => {
      this._options.set(this.options());
    });

    // Sync value from input to internal signal
    effect(() => {
      this._value.set(this.value());
    });
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const open = this._open();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!open) {
          this.context.onOpenChange(true);
        } else {
          this.context.highlightNext();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!open) {
          this.context.onOpenChange(true);
        } else {
          this.context.highlightPrevious();
        }
        break;

      case 'Enter':
        if (open) {
          event.preventDefault();
          this.context.selectHighlighted();
        }
        break;

      case 'Escape':
        if (open) {
          event.preventDefault();
          this.context.onOpenChange(false);
        }
        break;

      case 'Home':
        if (open) {
          event.preventDefault();
          const filtered = this._filteredOptions();
          if (filtered.length > 0) {
            this._highlightedIndex.set(0);
          }
        }
        break;

      case 'End':
        if (open) {
          event.preventDefault();
          const filtered = this._filteredOptions();
          if (filtered.length > 0) {
            this._highlightedIndex.set(filtered.length - 1);
          }
        }
        break;

      case 'Tab':
        if (open) {
          this.context.onOpenChange(false);
        }
        break;
    }
  }
}
