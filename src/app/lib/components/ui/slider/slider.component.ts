import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    forwardRef,
    input,
    model,
    output,
    signal,
    viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// ============================================================================
// Types
// ============================================================================

export type SliderOrientation = 'horizontal' | 'vertical';

export type SliderProps = {
  /** The controlled value */
  value?: number;
  /** The default value for uncontrolled mode */
  defaultValue?: number;
  /** The minimum value */
  min?: number;
  /** The maximum value */
  max?: number;
  /** The step increment */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** The orientation of the slider */
  orientation?: SliderOrientation;
  /** Whether the direction is inverted */
  inverted?: boolean;
  /** The name for form submission */
  name?: string;
  /** Function to get value label for accessibility */
  getAriaValueText?: (value: number) => string;
  /** Additional CSS classes */
  class?: string;
};

// ============================================================================
// Slider Component
// ============================================================================

/**
 * Slider component for range selection.
 * Based on Radix UI Slider primitive with shadcn/ui styling.
 * Implements ControlValueAccessor for Angular Forms integration.
 *
 * ## Features
 * - Single thumb slider for value selection
 * - Full keyboard support for accessibility
 * - Mouse and touch interaction
 * - Step increments
 * - Min/max boundaries
 * - Angular Forms integration (ngModel, formControl)
 * - Custom aria-valuetext function
 *
 * ## Accessibility
 * - Uses native `slider` role
 * - `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for current state
 * - `aria-valuetext` for human-readable value description
 * - `aria-orientation` for layout direction
 * - Full keyboard support per WAI-ARIA slider pattern
 *
 * ## Keyboard Navigation
 * - **ArrowRight/ArrowUp**: Increase value by step
 * - **ArrowLeft/ArrowDown**: Decrease value by step
 * - **PageUp**: Increase value by 10x step (large step)
 * - **PageDown**: Decrease value by 10x step (large step)
 * - **Home**: Set to minimum value
 * - **End**: Set to maximum value
 *
 * ## Data Attributes
 * - `data-disabled`: Present when disabled
 * - `data-orientation`: "horizontal" | "vertical"
 *
 * @example
 * <!-- Basic slider -->
 * <Slider [(value)]="volume" />
 *
 * @example
 * <!-- With reactive forms -->
 * <Slider formControlName="temperature" />
 *
 * @example
 * <!-- With min/max/step -->
 * <Slider
 *   [(value)]="temperature"
 *   [min]="0"
 *   [max]="100"
 *   [step]="5"
 * />
 *
 * @example
 * <!-- Disabled slider -->
 * <Slider [value]="50" [disabled]="true" />
 *
 * @example
 * <!-- With custom value text -->
 * <Slider
 *   [(value)]="price"
 *   [min]="0"
 *   [max]="1000"
 *   [getAriaValueText]="formatPrice"
 * />
 * // In component: formatPrice = (value: number) => `$${value}`;
 *
 * @example
 * <!-- Vertical orientation -->
 * <Slider
 *   [(value)]="level"
 *   orientation="vertical"
 *   class="h-40"
 * />
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/slider Radix Slider}
 * @see {@link https://ui.shadcn.com/docs/components/slider shadcn/ui Slider}
 */
@Component({
  selector: 'Slider',
  template: `
    <span data-slot="slider-track" [class]="trackClass()">
      <span
        data-slot="slider-range"
        [class]="rangeClass()"
        [style.width.%]="isHorizontal() ? percentage() : undefined"
        [style.height.%]="!isHorizontal() ? percentage() : undefined"
      ></span>
    </span>
    <span
      #thumb
      data-slot="slider-thumb"
      [class]="thumbClass()"
      [style.left.%]="isHorizontal() ? percentage() : undefined"
      [style.bottom.%]="!isHorizontal() ? percentage() : undefined"
      [attr.aria-valuenow]="value()"
      [attr.aria-valuemin]="min()"
      [attr.aria-valuemax]="max()"
      [attr.aria-valuetext]="computedAriaValueText()"
      [attr.aria-orientation]="orientation()"
      [attr.aria-disabled]="isDisabled() || null"
      role="slider"
      tabindex="0"
      (keydown)="onKeyDown($event)"
      (blur)="onBlur()"
    ></span>
    @if (name()) {
      <input
        type="hidden"
        [attr.name]="name()"
        [value]="value()"
        [disabled]="isDisabled()"
      />
    }
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-orientation]': 'orientation()',
    '(mousedown)': 'onMouseDown($event)',
    '(touchstart)': 'onTouchStart($event)',
    'data-slot': 'slider',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Slider),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Slider implements ControlValueAccessor {
  private readonly thumb = viewChild<ElementRef<HTMLElement>>('thumb');
  private readonly elementRef = viewChild<ElementRef<HTMLElement>>('slider');

  /** The current slider value */
  readonly value = model<number>(0);

  /** The default value for uncontrolled mode */
  readonly defaultValue = input<number>(0);

  /** The minimum value */
  readonly min = input<number>(0);

  /** The maximum value */
  readonly max = input<number>(100);

  /** The step increment */
  readonly step = input<number>(1);

  /** Whether the slider is disabled via input */
  readonly disabled = input<boolean>(false);

  /** The orientation of the slider */
  readonly orientation = input<SliderOrientation>('horizontal');

  /** Whether the direction is inverted */
  readonly inverted = input<boolean>(false);

  /** The name for form submission */
  readonly name = input<string>();

  /** Function to get value label for accessibility */
  readonly getAriaValueText = input<((value: number) => string) | undefined>(
    undefined
  );

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Emitted when value changes */
  readonly valueChange = output<number>();

  /** Emitted when value change is committed (on release) */
  readonly valueCommit = output<number>();

  /** Whether the slider is disabled via forms */
  private readonly formsDisabled = signal<boolean>(false);

  /** Whether the slider is disabled (either via input or forms) */
  readonly isDisabled = computed(() => this.disabled() || this.formsDisabled());

  /** Whether the slider is horizontal */
  protected readonly isHorizontal = computed(
    () => this.orientation() === 'horizontal'
  );

  /** ControlValueAccessor callbacks */
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  /** Calculate percentage position */
  protected readonly percentage = computed(() => {
    const val = this.value();
    const minVal = this.min();
    const maxVal = this.max();
    const percent = ((val - minVal) / (maxVal - minVal)) * 100;
    return this.inverted() ? 100 - percent : percent;
  });

  /** Generate aria-valuetext */
  protected readonly computedAriaValueText = computed(() => {
    const fn = this.getAriaValueText();
    return fn ? fn(this.value()) : undefined;
  });

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'relative flex touch-none select-none items-center',
      this.isHorizontal() ? 'w-full' : 'flex-col h-full',
      this.isDisabled() && 'opacity-50 pointer-events-none',
      this.class()
    )
  );

  /** Track class */
  protected readonly trackClass = computed(() =>
    cn(
      'bg-primary/20 relative overflow-hidden rounded-full',
      this.isHorizontal() ? 'h-1.5 w-full grow' : 'w-1.5 h-full grow'
    )
  );

  /** Range class */
  protected readonly rangeClass = computed(() =>
    cn(
      'bg-primary absolute',
      this.isHorizontal() ? 'h-full' : 'w-full bottom-0'
    )
  );

  /** Thumb class */
  protected readonly thumbClass = computed(() =>
    cn(
      'block shrink-0 rounded-full border border-primary/50 bg-background shadow-sm ring-0',
      'transition-[color,box-shadow] outline-none',
      'focus-visible:ring-[3px] focus-visible:ring-ring/50',
      'disabled:pointer-events-none',
      'absolute cursor-grab active:cursor-grabbing',
      this.isHorizontal()
        ? 'size-4 top-1/2 -translate-x-1/2 -translate-y-1/2'
        : 'size-4 left-1/2 -translate-x-1/2 translate-y-1/2'
    )
  );

  // ControlValueAccessor implementation
  writeValue(value: number): void {
    this.value.set(value ?? this.defaultValue());
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formsDisabled.set(isDisabled);
  }

  /** Handle blur for forms touched state */
  onBlur(): void {
    this.onTouched();
  }

  /** Clamp and step a value */
  private clampValue(rawValue: number): number {
    const stepValue = this.step();
    const steppedValue = Math.round(rawValue / stepValue) * stepValue;
    return Math.max(this.min(), Math.min(this.max(), steppedValue));
  }

  /** Update value from position */
  private updateValueFromPosition(
    clientPos: number,
    rect: DOMRect,
    isVertical: boolean
  ): void {
    if (this.isDisabled()) return;

    let percentage: number;
    if (isVertical) {
      percentage = 1 - (clientPos - rect.top) / rect.height;
    } else {
      percentage = (clientPos - rect.left) / rect.width;
    }

    if (this.inverted()) {
      percentage = 1 - percentage;
    }

    percentage = Math.max(0, Math.min(1, percentage));
    const range = this.max() - this.min();
    const rawValue = this.min() + percentage * range;
    const newValue = this.clampValue(rawValue);

    if (newValue !== this.value()) {
      this.value.set(newValue);
      this.onChange(newValue);
      this.valueChange.emit(newValue);
    }
  }

  /** Handle mouse down */
  onMouseDown(event: MouseEvent): void {
    if (this.isDisabled() || event.button !== 0) return;

    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const isVertical = !this.isHorizontal();

    this.updateValueFromPosition(
      isVertical ? event.clientY : event.clientX,
      rect,
      isVertical
    );

    // Focus the thumb
    this.thumb()?.nativeElement.focus();

    const onMouseMove = (e: MouseEvent) => {
      this.updateValueFromPosition(
        isVertical ? e.clientY : e.clientX,
        rect,
        isVertical
      );
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      this.onTouched();
      this.valueCommit.emit(this.value());
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  /** Handle touch start */
  onTouchStart(event: TouchEvent): void {
    if (this.isDisabled()) return;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const touch = event.touches[0];
    const isVertical = !this.isHorizontal();

    this.updateValueFromPosition(
      isVertical ? touch.clientY : touch.clientX,
      rect,
      isVertical
    );

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      this.updateValueFromPosition(
        isVertical ? touch.clientY : touch.clientX,
        rect,
        isVertical
      );
    };

    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      this.onTouched();
      this.valueCommit.emit(this.value());
    };

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  }

  /** Handle keyboard navigation */
  onKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;

    const stepValue = this.step();
    const largeStep = stepValue * 10;
    let newValue = this.value();
    const isVertical = !this.isHorizontal();

    // Adjust direction based on orientation
    const increment = isVertical ? -1 : 1;

    switch (event.key) {
      case 'ArrowRight':
        newValue += stepValue * increment;
        break;
      case 'ArrowLeft':
        newValue -= stepValue * increment;
        break;
      case 'ArrowUp':
        newValue += stepValue;
        break;
      case 'ArrowDown':
        newValue -= stepValue;
        break;
      case 'PageUp':
        newValue += largeStep;
        break;
      case 'PageDown':
        newValue -= largeStep;
        break;
      case 'Home':
        newValue = this.min();
        break;
      case 'End':
        newValue = this.max();
        break;
      default:
        return;
    }

    event.preventDefault();
    newValue = this.clampValue(newValue);

    if (newValue !== this.value()) {
      this.value.set(newValue);
      this.onChange(newValue);
      this.valueChange.emit(newValue);
    }
  }
}
