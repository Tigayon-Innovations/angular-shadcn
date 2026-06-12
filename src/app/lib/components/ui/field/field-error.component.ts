import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * FieldError component - validation error message(s) for a Field.
 *
 * @example
 * <!-- With projected content -->
 * <FieldError>This field is required.</FieldError>
 *
 * <!-- With an errors array -->
 * <FieldError [errors]="['Too short.', 'Must include a number.']" />
 */
@Component({
  selector: 'FieldError',
  template: `
    @if (errors() && errors()!.length > 0) {
      @if (errors()!.length === 1) {
        {{ errors()![0] }}
      } @else {
        <ul class="ml-4 flex list-disc flex-col gap-1">
          @for (error of errors(); track error) {
            <li>{{ error }}</li>
          }
        </ul>
      }
    }
    <ng-content />
  `,
  host: {
    'attr.data-slot': '"field-error"',
    role: 'alert',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldError {
  /** List of error messages to render. When omitted, projected content is shown. */
  readonly errors = input<string[] | undefined>(undefined);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('text-destructive text-sm font-normal', this.class()),
  );
}
