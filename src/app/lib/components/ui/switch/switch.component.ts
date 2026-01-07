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

/**
 * Switch component for toggling between on/off states.
 * Implements ControlValueAccessor for Angular Forms integration.
 *
 * @example
 * <!-- Basic switch -->
 * <Switch id="airplane-mode" />
 *
 * <!-- Controlled switch -->
 * <Switch [(checked)]="isEnabled" />
 *
 * <!-- With reactive forms -->
 * <Switch formControlName="notifications" />
 *
 * <!-- Disabled switch -->
 * <Switch [disabled]="true" />
 *
 * <!-- With label -->
 * <div class="flex items-center gap-2">
 *   <Switch id="notifications" />
 *   <Label for="notifications">Enable notifications</Label>
 * </div>
 */
@Component({
  selector: 'Switch',
  template: `
    <span
      data-slot="switch-thumb"
      [class]="thumbClass()"
    ></span>
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"switch"',
    '[attr.aria-checked]': 'checked()',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.data-state]': 'checked() ? "checked" : "unchecked"',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.tabindex]': 'isDisabled() ? -1 : 0',
    '(click)': 'toggle()',
    '(keydown.space)': 'toggle(); $event.preventDefault()',
    '(keydown.enter)': 'toggle(); $event.preventDefault()',
    'data-slot': 'switch',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switch),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Switch implements ControlValueAccessor {
  /** Whether the switch is checked/on */
  readonly checked = model<boolean>(false);

  /** Whether the switch is disabled via input */
  readonly disabled = input<boolean>(false);

  /** Whether the switch is disabled via forms */
  private readonly formsDisabled = signal<boolean>(false);

  /** Whether the switch is disabled (either via input or forms) */
  readonly isDisabled = computed(() => this.disabled() || this.formsDisabled());

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** ControlValueAccessor callbacks */
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  /** Toggle the switch state */
  toggle() {
    if (!this.isDisabled()) {
      this.checked.update((v) => !v);
      this.onChange(this.checked());
      this.onTouched();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.checked.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formsDisabled.set(isDisabled);
  }

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
      this.isDisabled() && 'cursor-not-allowed opacity-50',
      this.class()
    )
  );

  /** Computed thumb class */
  protected readonly thumbClass = computed(() =>
    cn(
      'bg-background pointer-events-none block size-4 rounded-full shadow-lg ring-0 transition-transform',
      this.checked() ? 'translate-x-4' : 'translate-x-0'
    )
  );
}
