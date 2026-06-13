import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { toggleVariants, type ToggleVariants } from './toggle-variants';

export type ToggleState = 'on' | 'off';

export type ToggleProps = {
  /** The controlled pressed state */
  pressed?: boolean;
  /** Whether the toggle starts pressed (uncontrolled) */
  defaultPressed?: boolean;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** The visual style variant */
  variant?: ToggleVariants['variant'];
  /** The size of the toggle */
  size?: ToggleVariants['size'];
  /** Additional CSS classes */
  class?: string;
};

/**
 * Toggle component - a two-state button that can be on or off.
 * Based on Radix UI Toggle primitive with shadcn/ui styling.
 * Implements ControlValueAccessor for Angular Forms integration.
 *
 * ## Features
 * - Toggle between on/off (pressed/not pressed) states
 * - Multiple visual variants (default, outline)
 * - Multiple sizes (sm, default, lg)
 * - Full keyboard support
 * - Angular Forms integration (ngModel, formControl)
 *
 * ## Accessibility
 * - Uses `aria-pressed` to indicate pressed state
 * - Keyboard: Space/Enter to toggle
 * - Focus ring for keyboard navigation
 * - Disabled state removes from tab order
 *
 * ## Data Attributes
 * - `data-state`: "on" | "off"
 * - `data-disabled`: Present when disabled
 *
 * @example
 * <!-- Basic toggle -->
 * <Toggle aria-label="Toggle bold">
 *   <BoldIcon />
 * </Toggle>
 *
 * @example
 * <!-- Controlled with two-way binding -->
 * <Toggle [(pressed)]="isBold" aria-label="Toggle bold">
 *   <BoldIcon />
 * </Toggle>
 *
 * @example
 * <!-- With variant -->
 * <Toggle variant="outline" aria-label="Toggle italic">
 *   <ItalicIcon />
 * </Toggle>
 *
 * @example
 * <!-- Different sizes -->
 * <Toggle size="sm" aria-label="Small toggle"><Icon /></Toggle>
 * <Toggle size="default" aria-label="Default toggle"><Icon /></Toggle>
 * <Toggle size="lg" aria-label="Large toggle"><Icon /></Toggle>
 *
 * @example
 * <!-- With text content -->
 * <Toggle [(pressed)]="isActive">
 *   Toggle me
 * </Toggle>
 *
 * @example
 * <!-- Disabled -->
 * <Toggle [disabled]="true" aria-label="Disabled toggle">
 *   <Icon />
 * </Toggle>
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/toggle Radix Toggle}
 * @see {@link https://ui.shadcn.com/docs/components/toggle shadcn/ui Toggle}
 */
@Component({
  selector: 'Toggle',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    type: 'button',
    '[attr.aria-pressed]': 'pressed()',
    '[attr.data-state]': 'state()',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '(click)': 'toggle()',
    'data-slot': 'toggle',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Toggle),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toggle implements ControlValueAccessor {
  constructor() {
    // Initialize from defaultPressed if provided
    if (this.defaultPressed()) {
      this.pressed.set(true);
    }
  }

  /** Whether the toggle is pressed/on */
  readonly pressed = model<boolean>(false);

  /** Whether the toggle starts pressed (uncontrolled mode) */
  readonly defaultPressed = input<boolean>(false);
  /** The visual style variant of the toggle */
  readonly variant = input<ToggleVariants['variant']>('default');
  /** The size of the toggle */
  readonly size = input<ToggleVariants['size']>('default');
  /** Whether the toggle is disabled */
  readonly disabled = input<boolean>(false);
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Whether the toggle is effectively disabled (input or Angular Forms) */
  protected readonly isDisabled = computed(() => this.disabled() || this.isFormsDisabled());

  /** Current state for data attribute */
  protected readonly state = computed((): ToggleState => (this.pressed() ? 'on' : 'off'));
  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      toggleVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.class(),
    ),
  );

  /** Tracks disabled state set by Angular Forms (.disable() / .enable()) */
  private readonly isFormsDisabled = signal<boolean>(false);

  /** ControlValueAccessor callbacks */
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};
  setDisabledState(isDisabled: boolean): void {
    this.isFormsDisabled.set(isDisabled);
  }

  /** Toggle the pressed state */
  toggle(): void {
    if (!this.isDisabled()) {
      const newValue = !this.pressed();
      this.pressed.set(newValue);
      this.onChange(newValue);
      this.onTouched();
    }
  }
  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.pressed.set(value ?? false);
  }
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
