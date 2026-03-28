import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { FORM_FIELD_CONTEXT } from './form-context';

/**
 * FormMessage component - displays validation error messages.
 *
 * @example
 * <FormMessage />
 *
 * <!-- Or with custom message -->
 * <FormMessage>Custom error message</FormMessage>
 */
@Component({
  selector: 'FormMessage',
  template: `
    @if (errorMessage() || hasContent) {
      <ng-content />
      @if (!hasContent && errorMessage()) {
        {{ errorMessage() }}
      }
    }
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.id]': 'fieldContext?.formMessageId()',
    '[attr.role]': 'hasError() ? "alert" : null',
    'data-slot': 'form-message',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMessage {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  protected readonly fieldContext = inject(FORM_FIELD_CONTEXT, { optional: true });

  /** Check if field has error */
  protected readonly hasError = computed(() => {
    const control = this.fieldContext?.control();
    return control?.invalid && (control?.dirty || control?.touched);
  });
  /** Get first error message */
  protected readonly errorMessage = computed(() => {
    const control = this.fieldContext?.control();
    if (!control?.errors || !this.hasError()) return null;

    const errors = control.errors;
    const errorKeys = Object.keys(errors);
    if (errorKeys.length === 0) return null;

    const firstErrorKey = errorKeys[0];
    const errorValue = errors[firstErrorKey];

    // Handle common error types
    switch (firstErrorKey) {
      case 'required':
        return 'This field is required';
      case 'minlength':
        return `Minimum length is ${errorValue.requiredLength} characters`;
      case 'maxlength':
        return `Maximum length is ${errorValue.requiredLength} characters`;
      case 'min':
        return `Minimum value is ${errorValue.min}`;
      case 'max':
        return `Maximum value is ${errorValue.max}`;
      case 'email':
        return 'Please enter a valid email address';
      case 'pattern':
        return 'Invalid format';
      default:
        // If error is a string, return it directly
        if (typeof errorValue === 'string') {
          return errorValue;
        }
        // If error has a message property
        if (errorValue?.message) {
          return errorValue.message;
        }
        return 'Invalid value';
    }
  });
  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'text-destructive text-[0.8rem] font-medium',
      !this.hasError() && !this.hasContent && 'hidden',
      this.class(),
    ),
  );

  /** Whether component has projected content */
  hasContent = false;

  ngAfterContentInit() {
    // Check if there's projected content
    // This is a simplified check - in production you might want to use ContentChild
  }
}
