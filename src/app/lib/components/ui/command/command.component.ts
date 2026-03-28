import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    forwardRef,
    input,
    signal,
} from '@angular/core';
import {
    COMMAND_CONTEXT,
    type CommandContextValue,
    type CommandFilterFunction,
} from './command-context';

let commandIdCounter = 0;

/**
 * Default filter function for command items.
 */
const defaultFilterFn: CommandFilterFunction = (
  value: string,
  search: string,
  keywords?: string[],
): number => {
  if (!search.trim()) return 1;

  const extendedValue = keywords ? `${value} ${keywords.join(' ')}` : value;
  const normalizedValue = extendedValue.toLowerCase();
  const normalizedSearch = search.toLowerCase();

  // Exact match scores highest
  if (normalizedValue === normalizedSearch) return 1;

  // Prefix match
  if (normalizedValue.startsWith(normalizedSearch)) return 0.8;

  // Check if any word starts with search
  const words = normalizedValue.split(' ');
  for (const word of words) {
    if (word.startsWith(normalizedSearch)) return 0.7;
  }

  // Contains match
  if (normalizedValue.includes(normalizedSearch)) return 0.5;

  // No match
  return 0;
};

/**
 * Command component - a command palette/menu component.
 * Matches shadcn/ui React Command exactly.
 * Implements combobox pattern with proper ARIA roles and keyboard navigation.
 */
@Component({
  selector: 'Command',
  template: `<ng-content />`,
  providers: [
    {
      provide: COMMAND_CONTEXT,
      useExisting: forwardRef(() => Command),
    },
  ],
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Command implements CommandContextValue {
  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Custom filter function for search */
  readonly filter = input<CommandFilterFunction | undefined>(undefined);

  // CommandContextValue implementation
  private readonly _id = commandIdCounter++;
  private readonly _items: string[] = [];

  readonly search = signal('');
  readonly selectedValue = signal('');
  readonly focusedIndex = signal(0);
  readonly itemCount = signal(0);
  readonly visibleItemCount = signal(0);
  readonly listId = `command-list-${this._id}`;
  readonly inputId = `command-input-${this._id}`;

  readonly filterFunction = computed(() => {
    return this.filter() ?? defaultFilterFn;
  });

  registerItem = (value: string) => {
    if (!this._items.includes(value)) {
      this._items.push(value);
    }
  };

  unregisterItem = (value: string) => {
    const index = this._items.indexOf(value);
    if (index > -1) {
      this._items.splice(index, 1);
    }
  };

  getItems = () => this._items;

  shouldShowItem = (value: string, keywords?: string[]): boolean => {
    const searchValue = this.search();
    if (!searchValue) return true;
    return this.filterFunction()(value, searchValue, keywords) > 0;
  };

  protected readonly computedClass = computed(() =>
    cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      this.class(),
    ),
  );
}
