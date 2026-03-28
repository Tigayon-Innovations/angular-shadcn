import { Button } from '@/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'FormDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  ],
  template: `
    <Form [formGroup]="form" (ngSubmit)="onSubmit()" class="w-full max-w-sm space-y-6">
      <FormField name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" formControlName="username" />
          </FormControl>
          <FormDescription> This is your public display name. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="example@email.com" formControlName="email" />
          </FormControl>
          <FormDescription> We'll never share your email. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  `,
})
export class FormDemo {
  protected readonly form = new FormBuilder().group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
  });

  protected onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
