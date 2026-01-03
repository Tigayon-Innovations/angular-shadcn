import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    forwardRef,
    input,
    signal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FORM_CONTEXT, type FormContext } from './form-context';

/**
 * Form component - wrapper for reactive forms with validation styling.
 *
 * @example
 * <Form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
 *   <FormField name="email">
 *     <FormItem>
 *       <FormLabel>Email</FormLabel>
 *       <FormControl>
 *         <Input type="email" formControlName="email" />
 *       </FormControl>
 *       <FormDescription>Enter your email address</FormDescription>
 *       <FormMessage />
 *     </FormItem>
 *   </FormField>
 * </Form>
 */
@Component({
  selector: 'Form',
  imports: [ReactiveFormsModule],
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'form',
  },
  providers: [
    {
      provide: FORM_CONTEXT,
      useFactory: (component: Form) => component.context,
      deps: [forwardRef(() => Form)],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  /** The reactive form group */
  readonly formGroup = input<FormGroup | null>(null);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Context for child components */
  readonly context: FormContext = {
    form: signal(this.formGroup()),
  };

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn('space-y-6', this.class())
  );

  ngOnChanges() {
    this.context.form.set(this.formGroup());
  }
}
