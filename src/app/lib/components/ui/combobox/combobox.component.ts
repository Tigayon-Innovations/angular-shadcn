import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import {
  COMBOBOX_CONTEXT,
  type ComboboxContext,
  type ComboboxOption,
} from './combobox-context';

/**
 * Combobox component - autocomplete/searchable dropdown.
 * Composition of Popover + Command pattern.
 *
 * @example
 * <Combobox [(value)]="selectedFramework" [options]="frameworks" placeholder="Select framework...">
 *   <ComboboxTrigger>
 *     <ComboboxValue placeholder="Select framework..." />
 *   </ComboboxTrigger>
 *   <ComboboxContent>
 *     <ComboboxInput placeholder="Search framework..." />
 *     <ComboboxEmpty>No framework found.</ComboboxEmpty>
 *     <ComboboxGroup>
 *       @for (option of filteredOptions(); track option.value) {
 *         <ComboboxItem [value]="option.value">{{ option.label }}</ComboboxItem>
 *       }
 *     </ComboboxGroup>
 *   </ComboboxContent>
 * </Combobox>
 */
@Component({
  selector: 'Combobox',
  template: `<ng-content />`,
  host: {
    class: 'relative inline-block',
    '[attr.data-state]': 'context.open() ? "open" : "closed"',
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
  /** The current selected value */
  readonly value = model<string>('');

  /** The options for the combobox */
  readonly options = input<ComboboxOption[]>([]);

  /** Whether the combobox is disabled */
  readonly disabled = input<boolean>(false);

  /** Event emitted when open state changes */
  readonly openChange = output<boolean>();

  /** Context for child components */
  readonly context: ComboboxContext = {
    open: signal(false),
    value: signal(this.value()),
    search: signal(''),
    options: signal(this.options()),
    filteredOptions: signal(this.options()),
    onSelect: (selectedValue: string) => {
      this.value.set(selectedValue);
      this.context.value.set(selectedValue);
      this.context.open.set(false);
      this.context.search.set('');
      this.openChange.emit(false);
    },
    onOpenChange: (open: boolean) => {
      this.context.open.set(open);
      if (!open) {
        this.context.search.set('');
      }
      this.openChange.emit(open);
    },
  };

  constructor() {
    // Sync options changes
    effect(() => {
      this.context.options.set(this.options());
      this.filterOptions();
    });

    // Sync value changes
    effect(() => {
      this.context.value.set(this.value());
    });

    // Filter options when search changes
    effect(() => {
      const search = this.context.search();
      this.filterOptions(search);
    });
  }

  private filterOptions(search: string = ''): void {
    const options = this.options();
    if (!search) {
      this.context.filteredOptions.set(options);
      return;
    }
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    );
    this.context.filteredOptions.set(filtered);
  }
}

/**
 * ComboboxTrigger component - button that opens the combobox.
 */
@Component({
  selector: 'ComboboxTrigger',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    role: 'combobox',
    '[attr.aria-expanded]': 'context.open()',
    '[attr.aria-haspopup]': '"listbox"',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onClick()',
    '(keydown.space)': 'onClick(); $event.preventDefault()',
    '(keydown.arrowdown)': 'onArrowDown($event)',
    '(keydown.arrowup)': 'onArrowUp($event)',
    '(keydown.escape)': 'onEscape()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxTrigger {
  protected readonly context = inject(COMBOBOX_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      this.class()
    )
  );

  protected onClick(): void {
    this.context.onOpenChange(!this.context.open());
  }

  protected onArrowDown(event: Event): void {
    event.preventDefault();
    if (!this.context.open()) {
      this.context.onOpenChange(true);
    }
  }

  protected onArrowUp(event: Event): void {
    event.preventDefault();
    if (!this.context.open()) {
      this.context.onOpenChange(true);
    }
  }

  protected onEscape(): void {
    this.context.onOpenChange(false);
  }
}

/**
 * ComboboxValue component - displays the selected value or placeholder.
 */
@Component({
  selector: 'ComboboxValue',
  template: `
    @if (selectedLabel()) {
      {{ selectedLabel() }}
    } @else {
      <span class="text-muted-foreground">{{ placeholder() }}</span>
    }
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxValue {
  protected readonly context = inject(COMBOBOX_CONTEXT);

  /** Placeholder text */
  readonly placeholder = input<string>('Select...');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly selectedLabel = computed(() => {
    const value = this.context.value();
    const options = this.context.options();
    const option = options.find((o) => o.value === value);
    return option?.label || '';
  });

  protected readonly computedClass = computed(() =>
    cn('pointer-events-none flex-1 text-left', this.class())
  );
}

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

/**
 * ComboboxInput component - search input for filtering options.
 */
@Component({
  selector: 'ComboboxInput',
  template: `
    <input
      [class]="inputClass()"
      [placeholder]="placeholder()"
      [value]="context.search()"
      (input)="onInput($event)"
      (keydown.escape)="onEscape()"
    />
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxInput {
  protected readonly context = inject(COMBOBOX_CONTEXT);

  /** Placeholder text */
  readonly placeholder = input<string>('Search...');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex items-center border-b px-3', this.class())
  );

  protected readonly inputClass = computed(() =>
    cn(
      'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
    )
  );

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.context.search.set(target.value);
  }

  protected onEscape(): void {
    this.context.onOpenChange(false);
  }
}

/**
 * ComboboxEmpty component - displayed when no options match the search.
 */
@Component({
  selector: 'ComboboxEmpty',
  template: `
    @if (context.filteredOptions().length === 0) {
      <ng-content />
    }
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxEmpty {
  protected readonly context = inject(COMBOBOX_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('py-6 text-center text-sm', this.class())
  );
}

/**
 * ComboboxGroup component - groups combobox items.
 */
@Component({
  selector: 'ComboboxGroup',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    role: 'group',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxGroup {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('overflow-hidden p-1', this.class())
  );
}

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
