import { InjectionToken, WritableSignal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

export interface FormFieldContext {
  name: WritableSignal<string>;
  control: WritableSignal<AbstractControl | null>;
  id: WritableSignal<string>;
  formDescriptionId: WritableSignal<string>;
  formMessageId: WritableSignal<string>;
}

export const FORM_FIELD_CONTEXT = new InjectionToken<FormFieldContext>(
  'FormFieldContext'
);

export interface FormContext {
  form: WritableSignal<FormGroup | null>;
}

export const FORM_CONTEXT = new InjectionToken<FormContext>('FormContext');
