import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { INPUT_OTP_CONTEXT, type InputOTPContextValue } from './input-otp-context';

/**
 * InputOTP component - OTP input field.
 * Matches shadcn/ui React InputOTP exactly.
 */
@Component({
  selector: 'InputOTP',
  template: `
    <div [class]="computedClass()">
      <input
        #hiddenInput
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        autocomplete="one-time-code"
        [maxlength]="maxLength()"
        [value]="value()"
        (input)="onInput($event)"
        (keydown)="onKeyDown($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
        class="absolute inset-0 w-full h-full opacity-0 cursor-text"
        [disabled]="disabled()"
      />
      <ng-content />
    </div>
  `,
  providers: [
    {
      provide: INPUT_OTP_CONTEXT,
      useFactory: (): InputOTPContextValue => ({
        value: signal(''),
        maxLength: signal(6),
        activeIndex: signal(-1),
      }),
    },
  ],
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOTP {
  private readonly hiddenInput = viewChild<ElementRef<HTMLInputElement>>('hiddenInput');

  /** Current value */
  readonly value = model<string>('');

  /** Maximum length of OTP */
  readonly maxLength = input<number>(6);

  /** Whether the input is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Value change event */
  readonly onChange = output<string>();

  /** Completion event */
  readonly onComplete = output<string>();

  protected readonly isFocused = signal(false);
  protected readonly activeIndex = signal(-1);

  protected readonly computedClass = computed(() =>
    cn(
      'relative flex items-center gap-2 has-[:disabled]:opacity-50',
      this.class()
    )
  );

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value.replace(/\D/g, '').slice(0, this.maxLength());

    this.value.set(newValue);
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
        this.activeIndex.set(newValue.length);
        this.onChange.emit(newValue);
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

  focus(): void {
    this.hiddenInput()?.nativeElement.focus();
  }
}
