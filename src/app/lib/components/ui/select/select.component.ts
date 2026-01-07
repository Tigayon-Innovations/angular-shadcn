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
    signal,
} from '@angular/core';
import { SELECT_CONTEXT, type SelectContext } from './select-context';

/**
 * Select component - a dropdown selection input.
 * Implements WAI-ARIA listbox pattern with keyboard navigation.
 *
 * @example
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
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly ariaIdService = inject(AriaIdService);
  private readonly ariaIds = this.ariaIdService.generateMenuIds('select');

  /** The current selected value */
  readonly value = model<string>('');

  /** Whether the select is open */
  readonly open = model<boolean>(false);

  /** Whether the select is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Internal signals for context */
  private readonly _value = signal<string>('');
  private readonly _open = signal<boolean>(false);
  private readonly _disabled = signal<boolean>(false);

  /** Context for child components */
  readonly context: SelectContext = {
    value: this._value,
    open: this._open,
    disabled: this._disabled,
    placeholder: signal(''),
    selectedLabel: signal(''),
    contentId: this.ariaIds.contentId,
    triggerElement: signal<HTMLElement | null>(null),
    itemValues: signal<string[]>([]),
    focusedIndex: signal(-1),
    setValue: (value: string, label?: string) => {
      this._value.set(value);
      this.value.set(value);
      if (label) {
        this.context.selectedLabel.set(label);
      }
      this._open.set(false);
      this.open.set(false);
      // Restore focus to trigger
      const trigger = this.context.triggerElement();
      if (trigger) {
        setTimeout(() => trigger.focus());
      }
    },
    focusItem: (index: number) => this.focusItemByIndex(index),
  };

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('relative inline-block', this.class())
  );

  constructor() {
    // Sync value input to internal signal
    effect(() => {
      this._value.set(this.value());
    });

    // Sync open input to internal signal
    effect(() => {
      this._open.set(this.open());
    });

    // Sync disabled input to internal signal
    effect(() => {
      this._disabled.set(this.disabled());
    });
  }

  /** Focus an item by index */
  private focusItemByIndex(index: number): void {
    const values = this.context.itemValues();
    if (index < 0 || index >= values.length) return;

    this.context.focusedIndex.set(index);
    const value = values[index];
    const item = this.elementRef.nativeElement.querySelector(
      `[data-slot="select-item"][data-value="${value}"]`
    ) as HTMLElement;
    if (item) {
      item.focus();
    }
  }
}
