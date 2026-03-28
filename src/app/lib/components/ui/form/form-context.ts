import { InjectionToken, WritableSignal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

export interface FormFieldContext {
  /** The name of the form field */
  name: WritableSignal<string>;
  /** The form control for this field */
  control: WritableSignal<AbstractControl | null>;
  /** Unique ID for the form control element */
  id: WritableSignal<string>;
  /** ID for the form description element */
  formDescriptionId: WritableSignal<string>;
  /** ID for the form message element */
  formMessageId: WritableSignal<string>;
}

export interface FormContext {
  /** The reactive form group */
  form: WritableSignal<FormGroup | null>;
}

export const FORM_FIELD_CONTEXT = new InjectionToken<FormFieldContext>('FormFieldContext');

export const FORM_CONTEXT = new InjectionToken<FormContext>('FormContext');
