import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { FORM_CONTEXT, FORM_FIELD_CONTEXT, type FormFieldContext } from './form-context';

/**
 * FormField component - provides context for a single form field.
 *
 * @example
 * <FormField name="email">
 *   <FormItem>
 *     <FormLabel>Email</FormLabel>
 *     <FormControl>
 *       <Input type="email" formControlName="email" />
 *     </FormControl>
 *     <FormMessage />
 *   </FormItem>
 * </FormField>
 */
@Component({
  selector: 'FormField',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'form-field',
  },
  providers: [
    {
      provide: FORM_FIELD_CONTEXT,
      useFactory: (component: FormField) => component.fieldContext,
      deps: [forwardRef(() => FormField)],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField {
  /** The name of the form control */
  readonly name = input.required<string>();

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  private readonly _formContext = inject(FORM_CONTEXT, { optional: true });

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() => cn('space-y-2', this.class()));

  /** Generate unique IDs */
  private readonly uniqueId = `form-field-${Math.random().toString(36).substring(7)}`;

  /** Context for child components */
  readonly fieldContext: FormFieldContext = {
    name: signal(''),
    control: signal(null),
    id: signal(this.uniqueId),
    formDescriptionId: signal(`${this.uniqueId}-description`),
    formMessageId: signal(`${this.uniqueId}-message`),
  };

  ngOnInit() {
    this.fieldContext.name.set(this.name());
    const form = this._formContext?.form();
    if (form) {
      this.fieldContext.control.set(form.get(this.name()));
    }
  }
  ngOnChanges() {
    this.fieldContext.name.set(this.name());
    const form = this._formContext?.form();
    if (form) {
      this.fieldContext.control.set(form.get(this.name()));
    }
  }
}
