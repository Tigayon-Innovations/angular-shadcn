import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Button } from '@/lib/components/ui/button';
import { Card } from '@/lib/components/ui/card';
import { CardContent } from '@/lib/components/ui/card';
import { CardDescription } from '@/lib/components/ui/card';
import { CardFooter } from '@/lib/components/ui/card';
import { CardHeader } from '@/lib/components/ui/card';
import { CardTitle } from '@/lib/components/ui/card';
import { Checkbox } from '@/lib/components/ui/checkbox';
import { Field } from '@/lib/components/ui/field';
import { FieldContent } from '@/lib/components/ui/field';
import { FieldDescription } from '@/lib/components/ui/field';
import { FieldGroup } from '@/lib/components/ui/field';
import { FieldLabel } from '@/lib/components/ui/field';

@Component({
  selector: 'card-notification-settings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Checkbox,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  ],
  template: `
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose which email and push alerts you want to receive.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox id="notify-transactions" [checked]="true" />
            <FieldContent>
              <FieldLabel for="notify-transactions">Transaction alerts</FieldLabel>
              <FieldDescription>Deposits, withdrawals, and transfers.</FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="notify-security" [checked]="true" />
            <FieldContent>
              <FieldLabel for="notify-security">Security alerts</FieldLabel>
              <FieldDescription>Login attempts and account changes.</FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="notify-goals" />
            <FieldContent>
              <FieldLabel for="notify-goals">Goal milestones</FieldLabel>
              <FieldDescription>Updates at 25%, 50%, 75%, and 100%.</FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="notify-market" />
            <FieldContent>
              <FieldLabel for="notify-market">Market updates</FieldLabel>
              <FieldDescription>Daily portfolio summary and price alerts.</FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Save Preferences</Button>
      </CardFooter>
    </Card>
  `,
})
export class CardNotificationSettings {}
