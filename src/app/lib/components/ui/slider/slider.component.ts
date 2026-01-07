import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    forwardRef,
    input,
    model,
    signal,
    viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Slider component for range selection.
 * Implements ControlValueAccessor for Angular Forms integration.
 *
 * @example
 * <!-- Basic slider -->
 * <Slider [(value)]="volume" />
 *
 * <!-- With reactive forms -->
 * <Slider formControlName="temperature" />
 *
 * <!-- With min/max/step -->
 * <Slider [(value)]="temperature" [min]="0" [max]="100" [step]="5" />
 *
 * <!-- Disabled slider -->
 * <Slider [value]="50" [disabled]="true" />
 */
@Component({
  selector: 'Slider',
  template: `
    <span data-slot="slider-track" [class]="trackClass()">
      <span
        data-slot="slider-range"
        [class]="rangeClass()"
        [style.width.%]="percentage()"
      ></span>
    </span>
    <span
      #thumb
      data-slot="slider-thumb"
      [class]="thumbClass()"
      [style.left.%]="percentage()"
      [attr.aria-valuenow]="value()"
      [attr.aria-valuemin]="min()"
      [attr.aria-valuemax]="max()"
      [attr.aria-valuetext]="ariaValueText()"
      [attr.aria-disabled]="isDisabled()"
      role="slider"
      tabindex="0"
      (keydown)="onKeyDown($event)"
      (blur)="onBlur()"
    ></span>
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
  /** The current slider value */
  readonly value = model<number>(0);

  /** The minimum value */
  readonly min = input<number>(0);

  /** The maximum value */
  readonly max = input<number>(100);

  /** The step increment */
  readonly step = input<number>(1);

  /** Whether the slider is disabled via input */
  readonly disabled = input<boolean>(false);

  /** Whether the slider is disabled via forms */
  private readonly formsDisabled = signal<boolean>(false);

  /** Whether the slider is disabled (either via input or forms) */
  readonly isDisabled = computed(() => this.disabled() || this.formsDisabled());

  /** The orientation of the slider */
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  /** Custom aria-valuetext function */
  readonly ariaValueTextFn = input<((value: number) => string) | undefined>(undefined);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  private readonly thumb = viewChild<ElementRef>('thumb');

  /** ControlValueAccessor callbacks */
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  /** Calculate percentage position */
  protected readonly percentage = computed(() => {
    const val = this.value();
    const minVal = this.min();
    const maxVal = this.max();
    return ((val - minVal) / (maxVal - minVal)) * 100;
  });

  /** Generate aria-valuetext */
  protected readonly ariaValueText = computed(() => {
    const fn = this.ariaValueTextFn();
    return fn ? fn(this.value()) : undefined;
  });

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
      this.isDisabled() && 'pointer-events-none',
      this.class()
    )
  );

  /** Track class */
  protected readonly trackClass = computed(() =>
    cn(
      'bg-primary/20 relative h-1.5 w-full grow overflow-hidden rounded-full'
    )
  );

  /** Range class */
  protected readonly rangeClass = computed(() =>
    cn('bg-primary absolute h-full')
  );

  /** Thumb class */
  protected readonly thumbClass = computed(() =>
    cn(
      'border-primary/50 bg-background focus-visible:ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none',
      'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing'
    )
  );

  // ControlValueAccessor implementation
  writeValue(value: number): void {
    this.value.set(value ?? 0);
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

  /** Update value from position */
  private updateValue(clientX: number, rect: DOMRect) {
    if (this.isDisabled()) return;

    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const range = this.max() - this.min();
    const stepValue = this.step();
    const rawValue = this.min() + percentage * range;
    const steppedValue = Math.round(rawValue / stepValue) * stepValue;
    const clampedValue = Math.max(this.min(), Math.min(this.max(), steppedValue));

    this.value.set(clampedValue);
    this.onChange(clampedValue);
  }

  /** Handle mouse down */
  onMouseDown(event: MouseEvent) {
    if (this.isDisabled()) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.updateValue(event.clientX, rect);

    const onMouseMove = (e: MouseEvent) => {
      this.updateValue(e.clientX, rect);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      this.onTouched();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  /** Handle touch start */
  onTouchStart(event: TouchEvent) {
    if (this.isDisabled()) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const touch = event.touches[0];
    this.updateValue(touch.clientX, rect);

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      this.updateValue(touch.clientX, rect);
    };

    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      this.onTouched();
    };

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  }

  /** Handle keyboard navigation */
  onKeyDown(event: KeyboardEvent) {
    if (this.isDisabled()) return;

    const stepValue = this.step();
    const largeStep = stepValue * 10;
    let newValue = this.value();

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(this.max(), newValue + stepValue);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(this.min(), newValue - stepValue);
        break;
      case 'PageUp':
        newValue = Math.min(this.max(), newValue + largeStep);
        break;
      case 'PageDown':
        newValue = Math.max(this.min(), newValue - largeStep);
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
    this.value.set(newValue);
    this.onChange(newValue);
  }
}
