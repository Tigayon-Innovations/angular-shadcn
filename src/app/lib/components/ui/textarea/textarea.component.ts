import { cn } from '@/lib/utils';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Textarea component that applies shadcn textarea styles.
 * Implements ControlValueAccessor for Angular Forms integration.
 * Applied as an attribute on a native <textarea> element.
 *
 * @example
 * <!-- Basic textarea -->
 * <textarea Textarea placeholder="Type your message here."></textarea>
 *
 * <!-- Disabled -->
 * <textarea Textarea disabled placeholder="Disabled"></textarea>
 *
 * <!-- Auto-resize -->
 * <textarea Textarea [autoResize]="true" placeholder="Grows as you type..."></textarea>
 *
 * <!-- With reactive forms -->
 * <textarea Textarea formControlName="message" placeholder="Enter message"></textarea>
 */
@Component({
  selector: 'textarea[Textarea], Textarea',
  template: '',
  host: {
    '[class]': 'computedClass()',
    '[disabled]': 'isDisabled()',
    '[id]': 'id()',
    '[name]': 'name()',
    '[placeholder]': 'placeholder()',
    '[rows]': 'rows()',
    '[attr.data-slot]': '"textarea"',
    '[attr.data-auto-resize]': 'autoResize() || null',
    '[attr.aria-invalid]': 'ariaInvalid() || null',
    '[attr.aria-describedby]': 'ariaDescribedBy() || null',
    '(input)': 'onInput($event)',
    '(blur)': 'onTouched()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Textarea),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Textarea implements ControlValueAccessor, AfterViewInit {
  /** Placeholder text */
  readonly placeholder = input<string>('');
  /** Textarea id attribute */
  readonly id = input<string>('');
  /** Textarea name attribute */
  readonly name = input<string>('');
  /** Number of visible text rows */
  readonly rows = input<number>(3);
  /** Whether the textarea is disabled */
  readonly disabled = input(false, {
    transform: (value: boolean | string) => value === '' || value === true || value === 'true',
  });
  /** Aria-invalid state for error display */
  readonly ariaInvalid = input<boolean | undefined>(undefined, { alias: 'aria-invalid' });
  /** Aria-describedby for accessibility */
  readonly ariaDescribedBy = input<string | undefined>(undefined, { alias: 'aria-describedby' });
  /** Additional CSS classes to apply */
  readonly class = input<string>('');
  /** When true, the textarea height adjusts automatically as the user types */
  readonly autoResize = input<boolean>(false);

  private readonly _elementRef = inject(ElementRef<HTMLTextAreaElement>);

  /** Internal disabled state (set by ControlValueAccessor) */
  protected readonly isDisabled = signal<boolean>(false);

  /** ControlValueAccessor callbacks */
  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      'resize-none data-[auto-resize=true]:resize-none',
      this.class(),
    ),
  );

  ngAfterViewInit(): void {
    // Ensure element is available after hydration
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    const el = this._elementRef.nativeElement;
    el.value = value ?? '';
    if (this.autoResize()) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  /** Focus the textarea element */
  focus(): void {
    this._elementRef.nativeElement.focus();
  }

  /** Handle input events */
  protected onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.onChange(target.value);
    if (this.autoResize()) {
      const el = this._elementRef.nativeElement;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }
}
