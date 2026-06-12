import { Button } from '@/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/ui/field';
import { Input } from '@/ui/input';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'FieldDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    Input,
  ],
  template: `
    <form class="w-full max-w-md" (submit)="$event.preventDefault()">
      <FieldSet>
        <FieldLegend>Payment Details</FieldLegend>
        <FieldDescription>
          All transactions are secure and encrypted.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-demo-name">Name on Card</FieldLabel>
            <input Input id="field-demo-name" type="text" placeholder="Evil Rabbit" />
          </Field>
          <Field>
            <FieldLabel htmlFor="field-demo-card">Card Number</FieldLabel>
            <input Input id="field-demo-card" type="text" placeholder="1234 5678 9012 3456" />
            <FieldDescription>Enter your 16-digit card number.</FieldDescription>
          </Field>
          <Field orientation="responsive">
            <Field>
              <FieldLabel htmlFor="field-demo-exp">Expiry</FieldLabel>
              <input Input id="field-demo-exp" type="text" placeholder="MM/YY" />
            </Field>
            <Field>
              <FieldLabel htmlFor="field-demo-cvv">CVV</FieldLabel>
              <input Input id="field-demo-cvv" type="text" placeholder="123" />
            </Field>
          </Field>
          <FieldSeparator content="Billing" />
          <Field>
            <FieldLabel htmlFor="field-demo-zip">Billing Zip Code</FieldLabel>
            <input Input id="field-demo-zip" type="text" placeholder="90210" />
            <FieldDescription>We use this to verify your card.</FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Button type="submit">Submit Payment</Button>
            <Button type="button" variant="outline">Cancel</Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  `,
})
export class FieldDemo {}
