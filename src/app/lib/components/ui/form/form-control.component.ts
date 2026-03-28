import { cn } from '@/lib/utils';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  contentChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FORM_FIELD_CONTEXT } from './form-context';

/**
 * Directive applied to form inputs within FormControl.
 * Automatically sets id, aria-describedby, and aria-invalid attributes.
 */
@Directive({
  selector: 'input, select, textarea, [formControlInput]',
})
export class FormControlInput {
  readonly elementRef = inject(ElementRef<HTMLInputElement>);
}

/**
 * FormControl component - wrapper for form input elements.
 * Automatically applies accessibility attributes to child inputs.
 *
 * @example
 * <FormControl>
 *   <input type="email" formControlName="email" />
 * </FormControl>
 */
@Component({
  selector: 'FormControl',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'form-control',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControl implements AfterContentInit {
  protected readonly fieldContext = inject(FORM_FIELD_CONTEXT, { optional: true });
  private readonly destroyRef = inject(DestroyRef);

  readonly inputDirective = contentChild(FormControlInput);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Check if field has error */
  protected readonly hasError = computed(() => {
    const control = this.fieldContext?.control();
    return control?.invalid && (control?.dirty || control?.touched);
  });

  /** Compute aria-describedby attribute */
  protected readonly ariaDescribedBy = computed(() => {
    const descId = this.fieldContext?.formDescriptionId();
    const msgId = this.fieldContext?.formMessageId();
    const hasError = this.hasError();

    if (!descId && !msgId) return null;

    const parts: string[] = [];
    if (descId) parts.push(descId);
    if (hasError && msgId) parts.push(msgId);

    return parts.join(' ') || null;
  });

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() => cn('relative', this.class()));

  ngAfterContentInit(): void {
    this.applyAccessibilityAttributes();
  }

  private applyAccessibilityAttributes(): void {
    const inputDirective = this.inputDirective();
    if (!inputDirective || !this.fieldContext) return;

    const element = inputDirective.elementRef.nativeElement;

    // Set the id to match the label's 'for' attribute
    const id = this.fieldContext.id();
    if (id) {
      element.setAttribute('id', id);
    }

    // Apply aria-describedby
    const describedBy = this.ariaDescribedBy();
    if (describedBy) {
      element.setAttribute('aria-describedby', describedBy);
    }

    // Apply aria-invalid when there's an error
    if (this.hasError()) {
      element.setAttribute('aria-invalid', 'true');
    }

    // Update attributes when control state changes
    const control = this.fieldContext.control();
    if (control?.statusChanges) {
      control.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.updateAriaInvalid();
      });
    }
  }

  private updateAriaInvalid(): void {
    const inputDirective = this.inputDirective();
    if (!inputDirective) return;
    const element = inputDirective.elementRef.nativeElement;

    if (this.hasError()) {
      element.setAttribute('aria-invalid', 'true');
      const describedBy = this.ariaDescribedBy();
      if (describedBy) {
        element.setAttribute('aria-describedby', describedBy);
      }
    } else {
      element.removeAttribute('aria-invalid');
      // Keep description but remove message ID from describedby
      const descId = this.fieldContext?.formDescriptionId();
      if (descId) {
        element.setAttribute('aria-describedby', descId);
      } else {
        element.removeAttribute('aria-describedby');
      }
    }
  }
}
