import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card';
import { Button } from '@/lib/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/lib/components/ui/field';
import { Progress } from '@/lib/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';
import { Textarea } from '@/lib/components/ui/textarea';

@Component({
  selector: 'card-payout-threshold',
  standalone: true,
  imports: [
    LucideAngularModule,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Button,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Progress,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <Card>
      <CardHeader>
        <CardTitle>Payout Threshold</CardTitle>
        <CardDescription>
          Set the minimum balance required before a payout is triggered.
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="icon"
            class="bg-muted"
            aria-label="Dismiss payout threshold"
          >
            <lucide-icon [img]="icons.X" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel for="preferred-currency">
              Preferred Currency
            </FieldLabel>
            <Select value="usd">
              <SelectTrigger id="preferred-currency" class="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="usd">USD — United States Dollar</SelectItem>
                  <SelectItem value="eur">EUR — Euro</SelectItem>
                  <SelectItem value="gbp">GBP — British Pound</SelectItem>
                  <SelectItem value="jpy">JPY — Japanese Yen</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <div class="flex items-baseline justify-between">
              <FieldLabel id="min-payout-label">
                Minimum Payout Amount
              </FieldLabel>
              <span class="text-2xl font-semibold tabular-nums">
                $2500.00
              </span>
            </div>
            <Progress
              [value]="25"
              aria-labelledby="min-payout-label"
              aria-valuetext="$2,500 of $10,000"></Progress>
            <div class="flex items-center justify-between">
              <FieldDescription>$50 (MIN)</FieldDescription>
              <FieldDescription>$10,000 (MAX)</FieldDescription>
            </div>
          </Field>
          <Field>
            <FieldLabel for="payout-notes">Notes</FieldLabel>
            <textarea
              Textarea
              id="payout-notes"
              placeholder="Add any notes for this payout configuration..."
              class="min-h-[100px]"
            ></textarea>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Save Threshold</Button>
      </CardFooter>
    </Card>
  `,
})
export class CardPayoutThreshold {
  protected readonly icons = { X };
}
