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

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the Form component
 */
export interface FormProps {
  /** The reactive form group to bind to */
  formGroup?: FormGroup | null;
  /** Additional CSS classes */
  class?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component Form
 *
 * Building forms with Angular Reactive Forms.
 *
 * @description
 * Form provides a wrapper for Angular Reactive Forms that integrates with
 * the form component system for consistent styling and accessibility.
 *
 * ## Features
 * - Integrates with Angular Reactive Forms
 * - Provides context for FormField, FormItem, FormLabel, etc.
 * - Automatic error message display
 * - Accessible form structure with proper ARIA relationships
 * - Consistent validation styling
 *
 * ## Form Components
 * - `Form` - Wrapper providing form context
 * - `FormField` - Wraps a form control with context
 * - `FormItem` - Container for label, control, description, message
 * - `FormLabel` - Label with accessibility bindings
 * - `FormControl` - Control with ARIA attributes
 * - `FormDescription` - Helper text for the field
 * - `FormMessage` - Error/validation messages
 *
 * ## Accessibility
 * - `aria-describedby` links controls to description and errors
 * - `aria-invalid` when field has errors
 * - Labels properly associated with controls
 *
 * @example Basic usage
 * ```html
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
 *   <Button type="submit">Submit</Button>
 * </Form>
 * ```
 *
 * @example With validation
 * ```typescript
 * loginForm = this.fb.group({
 *   email: ['', [Validators.required, Validators.email]],
 *   password: ['', [Validators.required, Validators.minLength(8)]],
 * });
 * ```
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

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Context for child components */
  readonly context: FormContext = {
    form: signal(this.formGroup()),
  };

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() => cn('space-y-6', this.class()));

  ngOnChanges() {
    this.context.form.set(this.formGroup());
  }
}
