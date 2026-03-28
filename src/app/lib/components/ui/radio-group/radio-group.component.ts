import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  RADIO_GROUP_CONTEXT,
  type RadioGroupContext,
  type RadioGroupOrientation,
} from './radio-group-context';

export type RadioGroupProps = {
  /** Current selected value */
  value?: string;
  /** Default value for uncontrolled mode */
  defaultValue?: string;
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Whether the group is required */
  required?: boolean;
  /** The name for radio inputs */
  name?: string;
  /** Orientation for keyboard navigation */
  orientation?: RadioGroupOrientation;
  /** Whether to loop focus at boundaries */
  loop?: boolean;
  /** Additional CSS classes */
  class?: string;
};

/**
 * RadioGroup component for single selection from multiple options.
 * Based on Radix UI RadioGroup primitive with shadcn/ui styling.
 * Implements roving tabindex and arrow key navigation per WAI-ARIA radiogroup pattern.
 *
 * ## Features
 * - Single selection from multiple radio items
 * - Full keyboard navigation with arrow keys
 * - Roving tabindex for efficient keyboard navigation
 * - Angular Forms integration (ngModel, formControl)
 * - Horizontal or vertical orientation
 *
 * ## Accessibility
 * - Uses `role="radiogroup"` for grouping semantics
 * - `aria-orientation` indicates layout direction
 * - `aria-required` when required
 * - Roving tabindex: only selected (or first) item is in tab order
 * - Arrow keys navigate between items and select
 *
 * ## Keyboard Navigation
 * - **ArrowRight/ArrowDown**: Focus and select next item
 * - **ArrowLeft/ArrowUp**: Focus and select previous item
 * - **Space**: Select current focused item (if not already selected)
 *
 * @example
 * <RadioGroup [(value)]="selectedValue">
 *   <div class="flex items-center space-x-2">
 *     <RadioGroupItem value="option1" id="option1" />
 *     <Label for="option1">Option 1</Label>
 *   </div>
 *   <div class="flex items-center space-x-2">
 *     <RadioGroupItem value="option2" id="option2" />
 *     <Label for="option2">Option 2</Label>
 *   </div>
 * </RadioGroup>
 *
 * @example
 * <!-- With reactive forms -->
 * <RadioGroup formControlName="preference">
 *   <RadioGroupItem value="a" id="pref-a" />
 *   <Label for="pref-a">Option A</Label>
 *   <RadioGroupItem value="b" id="pref-b" />
 *   <Label for="pref-b">Option B</Label>
 * </RadioGroup>
 *
 * @example
 * <!-- Horizontal orientation -->
 * <RadioGroup orientation="horizontal" [(value)]="size">
 *   <div class="flex gap-4">
 *     <RadioGroupItem value="sm" />
 *     <RadioGroupItem value="md" />
 *     <RadioGroupItem value="lg" />
 *   </div>
 * </RadioGroup>
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/radio-group Radix RadioGroup}
 * @see {@link https://ui.shadcn.com/docs/components/radio-group shadcn/ui RadioGroup}
 */
@Component({
  selector: 'RadioGroup',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    role: 'radiogroup',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.aria-required]': 'required() || null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    'data-slot': 'radio-group',
  },
  providers: [
    {
      provide: RADIO_GROUP_CONTEXT,
      useFactory: (component: RadioGroup) => component.context,
      deps: [forwardRef(() => RadioGroup)],
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroup),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroup implements ControlValueAccessor {
  /** Emitted when value changes */
  readonly valueChange = output<string>();

  /** The current selected value */
  readonly value = model<string>('');

  /** Default value for uncontrolled mode */
  readonly defaultValue = input<string>('');
  /** Whether the radio group is disabled via input */
  readonly disabled = input<boolean>(false);
  /** Whether the radio group is required */
  readonly required = input<boolean>(false);
  /** The orientation of the radio group */
  readonly orientation = input<RadioGroupOrientation>('vertical');
  /** Whether to loop focus at boundaries */
  readonly loop = input<boolean>(true);
  /** The name attribute for the radio inputs */
  readonly name = input<string>(`radio-group-${Math.random().toString(36).substring(7)}`);
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  private readonly _elementRef = inject(ElementRef<HTMLElement>);

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('grid gap-3', this.orientation() === 'horizontal' && 'flex flex-row', this.class()),
  );
  /** Whether the group is disabled */
  readonly isDisabled = computed(() => this.disabled() || this.isFormsDisabled());

  /** Whether disabled via forms */
  private readonly isFormsDisabled = signal<boolean>(false);

  /** Context for child RadioGroupItem components */
  readonly context: RadioGroupContext = {
    value: signal(this.value()),
    disabled: signal(this.disabled()),
    name: signal(this.name()),
    orientation: signal(this.orientation()),
    loop: signal(this.loop()),
    required: signal(this.required()),
    itemValues: signal<string[]>([]),
    setValue: (value: string) => {
      if (!this.isDisabled()) {
        this.value.set(value);
        this.context.value.set(value);
        this.onChange(value);
        this.onTouched();
        this.valueChange.emit(value);
      }
    },
    focusNext: (currentValue: string) => this.focusItem(currentValue, 1),
    focusPrevious: (currentValue: string) => this.focusItem(currentValue, -1),
    focusFirst: () => this.focusItemByIndex(0),
    focusLast: () => this.focusItemByIndex(this.context.itemValues().length - 1),
  };
  /** ControlValueAccessor callbacks */
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnChanges(): void {
    this.context.value.set(this.value());
    this.context.disabled.set(this.disabled());
    this.context.name.set(this.name());
    this.context.orientation.set(this.orientation());
    this.context.loop.set(this.loop());
    this.context.required.set(this.required());
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    const resolvedValue = value ?? this.defaultValue();
    this.value.set(resolvedValue);
    this.context.value.set(resolvedValue);
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isFormsDisabled.set(isDisabled);
    this.context.disabled.set(this.isDisabled());
  }

  /** Focus a radio item relative to the current item */
  private focusItem(currentValue: string, direction: number): void {
    const values = this.context.itemValues();
    const currentIndex = values.indexOf(currentValue);
    if (currentIndex === -1) return;

    const shouldLoop = this.loop();
    let nextIndex = currentIndex + direction;

    if (shouldLoop) {
      // Wrap around
      if (nextIndex < 0) nextIndex = values.length - 1;
      if (nextIndex >= values.length) nextIndex = 0;
    } else {
      // Clamp to boundaries
      if (nextIndex < 0 || nextIndex >= values.length) return;
    }

    this.focusItemByIndex(nextIndex);
  }
  /** Focus a radio item by index and select it */
  private focusItemByIndex(index: number): void {
    const values = this.context.itemValues();
    if (index < 0 || index >= values.length) return;

    const targetValue = values[index];
    const radioElement = this._elementRef.nativeElement.querySelector(
      `[data-slot="radio-group-item"][data-value="${targetValue}"]`,
    ) as HTMLElement;

    if (radioElement) {
      radioElement.focus();
      // Also select the item on focus (per ARIA spec for radio groups)
      this.context.setValue(targetValue);
    }
  }
}
