import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { FORM_FIELD_CONTEXT } from './form-context';

/**
 * FormControl component - wrapper for form input elements.
 *
 * @example
 * <FormControl>
 *   <Input type="email" formControlName="email" />
 * </FormControl>
 */
@Component({
  selector: 'FormControl',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.aria-invalid]': 'hasError()',
    'data-slot': 'form-control',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControl {
  protected readonly fieldContext = inject(FORM_FIELD_CONTEXT, { optional: true });

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
  protected readonly computedClass = computed(() =>
    cn('relative', this.class())
  );
}
