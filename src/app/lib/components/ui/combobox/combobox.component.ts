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

/**
 * Combobox component - searchable dropdown with autocomplete.
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
 *       @for (option of options; track option.value) {
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

  /** Context for child components */
  readonly context: ComboboxContext = {
    options: signal<ComboboxOption[]>([]),
    filteredOptions: signal<ComboboxOption[]>([]),
    value: signal<string>(''),
    open: signal<boolean>(false),
    search: signal<string>(''),
    onSelect: (value: string) => {
      this.context.value.set(value);
      this.context.open.set(false);
      this.context.search.set('');
      this.valueChange.emit(value);
    },
    onOpenChange: (open: boolean) => {
      this.context.open.set(open);
      if (!open) {
        this.context.search.set('');
      }
      this.openChange.emit(open);
    },
  };

  protected readonly computedClass = computed(() =>
    cn('relative', this.class())
  );

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
