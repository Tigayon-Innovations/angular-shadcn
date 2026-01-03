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
 * FormLabel component - label for a form field.
 *
 * @example
 * <FormLabel>Email</FormLabel>
 */
@Component({
  selector: 'FormLabel',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.for]': 'fieldContext?.id()',
    '[attr.data-error]': 'hasError() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    'data-slot': 'form-label',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLabel {
  protected readonly fieldContext = inject(FORM_FIELD_CONTEXT, { optional: true });

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Check if field has error */
  protected readonly hasError = computed(() => {
    const control = this.fieldContext?.control();
    return control?.invalid && (control?.dirty || control?.touched);
  });

  /** Check if field is disabled */
  protected readonly isDisabled = computed(() => {
    return this.fieldContext?.control()?.disabled;
  });

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'flex items-center gap-2 text-sm font-medium leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      this.hasError() && 'text-destructive',
      this.class()
    )
  );
}
