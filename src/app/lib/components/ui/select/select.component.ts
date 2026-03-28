import { cn } from '@/lib/utils';
import { AriaIdService } from '@/lib/utils/accessibility';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { SELECT_CONTEXT, type SelectContext } from './select-context';

export type SelectState = 'open' | 'closed';

/**
 * Props for the Select component
 */
export interface SelectProps {
  /** The value of the select when initially rendered.
   * Use when you do not need to control the state of the select. */
  defaultValue?: string;
  /** The controlled value of the select.
   * Should be used in conjunction with onValueChange. */
  value?: string;
  /** The controlled open state of the select.
   * Must be used in conjunction with onOpenChange. */
  open?: boolean;
  /** When true, prevents the user from interacting with select.
   * @default false */
  disabled?: boolean;
  /** The name of the select. Submitted with its owning form as part of a name/value pair. */
  name?: string;
  /** When true, indicates that the user must select a value before the owning form can be submitted.
   * @default false */
  required?: boolean;
  /** Additional CSS classes */
  class?: string;
}

/**
 * @component Select
 *
 * Displays a list of options for the user to pick from—triggered by a button.
 *
 * @description
 * Select provides a dropdown selection input that implements the WAI-ARIA
 * listbox pattern with full keyboard navigation.
 *
 * ## Features
 * - Full keyboard navigation
 * - Supports controlled and uncontrolled usage
 * - Groups and separators for organizing options
 * - Disabled items and groups
 * - Custom trigger and value display
 * - Form submission with native hidden input
 *
 * ## Accessibility
 * Implements the WAI-ARIA Listbox Pattern:
 * - `role="listbox"` on content
 * - `role="option"` on items
 * - `aria-expanded` on trigger
 * - `aria-labelledby` relationships
 * - Roving tabindex for keyboard navigation
 *
 * ## Keyboard Navigation
 * When focus is on the trigger:
 * - `Enter` / `Space` / `ArrowDown` / `ArrowUp` - Open the select
 *
 * When focus is on an item:
 * - `Enter` / `Space` - Select the focused item
 * - `ArrowDown` - Focus next item
 * - `ArrowUp` - Focus previous item
 * - `Home` - Focus first item
 * - `End` - Focus last item
 * - `Escape` - Close the select
 * - Type to search - Focus matching item
 *
 * @example Basic usage
 * ```html
 * <Select [(value)]="selectedFruit">
 *   <SelectTrigger class="w-[180px]">
 *     <SelectValue placeholder="Select a fruit" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="apple">Apple</SelectItem>
 *     <SelectItem value="banana">Banana</SelectItem>
 *     <SelectItem value="orange">Orange</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * @example With groups
 * ```html
 * <Select>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select a timezone" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectGroup>
 *       <SelectLabel>North America</SelectLabel>
 *       <SelectItem value="est">Eastern Time</SelectItem>
 *       <SelectItem value="cst">Central Time</SelectItem>
 *     </SelectGroup>
 *     <SelectSeparator />
 *     <SelectGroup>
 *       <SelectLabel>Europe</SelectLabel>
 *       <SelectItem value="gmt">GMT</SelectItem>
 *       <SelectItem value="cet">Central European</SelectItem>
 *     </SelectGroup>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * @example Form usage
 * ```html
 * <Select name="fruit" [required]="true">
 *   <SelectTrigger>
 *     <SelectValue placeholder="Required field" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="apple">Apple</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * @data-attributes
 * - `data-state` - 'open' | 'closed'
 * - `data-disabled` - Present when disabled
 */
@Component({
  selector: 'Select',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-state]': 'context.open() ? "open" : "closed"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    'data-slot': 'select',
  },
  providers: [
    {
      provide: SELECT_CONTEXT,
      useFactory: (component: Select) => component.context,
      deps: [forwardRef(() => Select)],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select {
  constructor() {
    // Sync value input to internal signal
    effect(() => {
      this._value.set(this.value());
    });

    // Sync open input to internal signal
    effect(() => {
      this._isOpen.set(this.open());
    });

    // Sync disabled input to internal signal
    effect(() => {
      this._isDisabled.set(this.disabled());
    });
  }

  /** Event handler called when the value changes */
  readonly valueChange = output<string>();
  /** Event handler called when the open state changes */
  readonly openChange = output<boolean>();

  /** The controlled value of the select */
  readonly value = model<string>('');
  /** The controlled open state of the select */
  readonly open = model<boolean>(false);

  /** When true, prevents the user from interacting with select */
  readonly disabled = input<boolean>(false);
  /** The name of the select for form submission */
  readonly name = input<string>('');
  /** When true, indicates that the user must select a value */
  readonly required = input<boolean>(false);
  /** Additional CSS classes */
  readonly class = input<string>('');

  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _ariaIdService = inject(AriaIdService);

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() => cn('relative block w-full', this.class()));

  /** Internal signals for context */
  private readonly _value = signal<string>('');
  private readonly _isOpen = signal<boolean>(false);
  private readonly _isDisabled = signal<boolean>(false);

  private readonly ariaIds = this._ariaIdService.generateMenuIds('select');
  /** Context for child components */
  readonly context: SelectContext = {
    value: this._value,
    open: this._isOpen,
    setOpen: (open: boolean) => {
      this._isOpen.set(open);
      this.open.set(open);
      this.openChange.emit(open);
    },
    disabled: this._isDisabled,
    placeholder: signal(''),
    selectedLabel: signal(''),
    contentId: this.ariaIds.contentId,
    triggerElement: signal<HTMLElement | null>(null),
    itemValues: signal<string[]>([]),
    focusedIndex: signal(-1),
    required: () => this.required(),
    name: () => this.name(),
    setValue: (value: string, label?: string) => {
      this._value.set(value);
      this.value.set(value);
      this.valueChange.emit(value);
      if (label) {
        this.context.selectedLabel.set(label);
      }
      this.context.setOpen(false);
      // Restore focus to trigger
      const trigger = this.context.triggerElement();
      if (trigger) {
        setTimeout(() => trigger.focus());
      }
    },
    focusItem: (index: number) => this.focusItemByIndex(index),
  };

  /** Focus an item by index */
  private focusItemByIndex(index: number): void {
    const values = this.context.itemValues();
    if (index < 0 || index >= values.length) return;

    this.context.focusedIndex.set(index);
    const targetValue = values[index];
    const selectItem = this._elementRef.nativeElement.querySelector(
      `[data-slot="select-item"][data-value="${targetValue}"]`,
    ) as HTMLElement;
    if (selectItem) {
      selectItem.focus();
    }
  }
}
