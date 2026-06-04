import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { FORM_FIELD_CONTEXT } from './form-context';

/**
 * FormDescription component - helper text for a form field.
 *
 * @example
 * <FormDescription>Enter your email address</FormDescription>
 */
@Component({
  selector: 'FormDescription',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.id]': 'fieldContext?.formDescriptionId()',
    'attr.data-slot': '"form-description"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDescription {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  protected readonly fieldContext = inject(FORM_FIELD_CONTEXT, { optional: true });

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('text-muted-foreground text-[length:var(--font-size-description)]', this.class()),
  );
}
