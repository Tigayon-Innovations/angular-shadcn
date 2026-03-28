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
import { FormsModule } from '@angular/forms';
import { INPUT_OTP_CONTEXT, type InputOTPContextValue } from './input-otp-context';

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the InputOTP component
 */
export interface InputOTPProps {
  /** The value of the input. Should be used with onChange. */
  value?: string;
  /** Maximum number of characters */
  maxLength?: number;
  /** Whether the input is disabled.
   * @default false */
  disabled?: boolean;
  /** Pattern for input validation.
   * @default "^[0-9]*$" */
  pattern?: string;
  /** Input mode for virtual keyboard.
   * @default "numeric" */
  inputMode?: 'numeric' | 'text' | 'decimal' | 'tel' | 'search' | 'email' | 'url';
  /** Additional CSS classes */
  class?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component InputOTP
 *
 * Accessible one-time password component with copy paste functionality.
 *
 * @description
 * InputOTP provides an accessible OTP/verification code input with individual
 * slots for each character. It handles paste, keyboard navigation, and auto-completion.
 *
 * ## Features
 * - Individual slot rendering
 * - Copy/paste support
 * - Keyboard navigation
 * - Numeric or alphanumeric modes
 * - Accessible with proper ARIA
 * - Disabled state support
 * - Auto-focus next slot
 *
 * ## Accessibility
 * - Uses native input for accessibility
 * - `autocomplete="one-time-code"` for autofill
 * - Visual focus indicator
 * - Works with password managers
 *
 * ## Keyboard Navigation
 * - Type to fill slots
 * - `Backspace` - Clear and move back
 * - `ArrowLeft/Right` - Navigate slots (future)
 * - Paste - Fill from clipboard
 *
 * @example Basic usage
 * ```html
 * <InputOTP [maxLength]="6" [(value)]="otp" (onComplete)="verify($event)">
 *   <InputOTPGroup>
 *     <InputOTPSlot [index]="0" />
 *     <InputOTPSlot [index]="1" />
 *     <InputOTPSlot [index]="2" />
 *   </InputOTPGroup>
 *   <InputOTPSeparator />
 *   <InputOTPGroup>
 *     <InputOTPSlot [index]="3" />
 *     <InputOTPSlot [index]="4" />
 *     <InputOTPSlot [index]="5" />
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 *
 * @example Simple 4-digit
 * ```html
 * <InputOTP [maxLength]="4" (onComplete)="submitCode($event)">
 *   <InputOTPGroup>
 *     @for (i of [0,1,2,3]; track i) {
 *       <InputOTPSlot [index]="i" />
 *     }
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 */
@Component({
  selector: 'InputOTP',
  imports: [FormsModule],
  template: `
    <div [class]="computedClass()" (click)="focus()">
      <input
        #hiddenInput
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        autocomplete="one-time-code"
        [attr.maxlength]="maxLength()"
        [value]="value()"
        (input)="onInput($event)"
        (keydown)="onKeyDown($event)"
        (paste)="onPaste($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
        class="absolute inset-0 w-full h-full opacity-0 cursor-text z-10"
        [disabled]="disabled()"
        [attr.aria-label]="'OTP input, ' + maxLength() + ' digits'"
      />
      <ng-content />
    </div>
  `,
  providers: [
    {
      provide: INPUT_OTP_CONTEXT,
      useFactory: (component: InputOTP): InputOTPContextValue => ({
        value: component.internalValue,
        maxLength: signal(6),
        activeIndex: component.activeIndex,
      }),
      deps: [forwardRef(() => InputOTP)],
    },
  ],
  host: {
    class: 'contents',
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOTP {
  private readonly hiddenInput = viewChild<ElementRef<HTMLInputElement>>('hiddenInput');

  /** The controlled value of the input */
  readonly value = model<string>('');

  /** Internal value signal for context sharing */
  readonly internalValue = signal<string>('');

  /** Maximum number of characters */
  readonly maxLength = input<number>(6);

  /** Whether the input is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Event handler called when the value changes */
  readonly onChange = output<string>();

  /** Event handler called when all slots are filled */
  readonly onComplete = output<string>();

  protected readonly isFocused = signal(false);
  readonly activeIndex = signal(-1);

  protected readonly computedClass = computed(() =>
    cn('relative flex items-center gap-2 has-[:disabled]:opacity-50', this.class()),
  );

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value.replace(/\D/g, '').slice(0, this.maxLength());

    this.value.set(newValue);
    this.internalValue.set(newValue);
    this.activeIndex.set(newValue.length);
    this.onChange.emit(newValue);

    if (newValue.length === this.maxLength()) {
      this.onComplete.emit(newValue);
    }
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Backspace') {
      const currentValue = this.value();
      if (currentValue.length > 0) {
        const newValue = currentValue.slice(0, -1);
        this.value.set(newValue);
        this.internalValue.set(newValue);
        this.activeIndex.set(newValue.length);
        this.onChange.emit(newValue);
      }
    }
  }

  protected onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') ?? '';
    // Extract only digits from pasted content
    const digits = pastedData.replace(/\D/g, '').slice(0, this.maxLength());

    if (digits.length > 0) {
      this.value.set(digits);
      this.internalValue.set(digits);
      this.activeIndex.set(digits.length);
      this.onChange.emit(digits);

      // Auto-submit if all slots are filled
      if (digits.length === this.maxLength()) {
        this.onComplete.emit(digits);
      }
    }
  }

  protected onFocus(): void {
    this.isFocused.set(true);
    this.activeIndex.set(this.value().length);
  }

  protected onBlur(): void {
    this.isFocused.set(false);
    this.activeIndex.set(-1);
  }

  /** Programmatically focus the input */
  focus(): void {
    this.hiddenInput()?.nativeElement.focus();
  }
}
