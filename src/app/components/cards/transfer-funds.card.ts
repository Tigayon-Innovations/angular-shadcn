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
import { Field, FieldGroup, FieldLabel } from '@/lib/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/lib/components/ui/input-group';
import { Item, ItemContent } from '@/lib/components/ui/item';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';
import { Separator } from '@/lib/components/ui/separator';

@Component({
  selector: 'card-transfer-funds',
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
    FieldGroup,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Item,
    ItemContent,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Separator,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <Card>
      <CardHeader>
        <CardTitle>Transfer Funds</CardTitle>
        <CardDescription>
          Move money between your connected accounts.
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="icon"
            class="bg-muted"
            aria-label="Dismiss transfer funds"
          >
            <lucide-icon [img]="icons.X" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel for="transfer-amount">
              Amount to Transfer
            </FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <span>$</span>
              </InputGroupAddon>
              <InputGroupInput id="transfer-amount" value="1,200.00" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel for="from-account">From Account</FieldLabel>
            <Select value="checking">
              <SelectTrigger id="from-account" class="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="checking">Main Checking (··8402) — $12,450.00</SelectItem>
                  <SelectItem value="business">Business (··7731) — $8,920.00</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel for="to-account">To Account</FieldLabel>
            <Select value="savings">
              <SelectTrigger id="to-account" class="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="savings">High Yield Savings (··1192) — $42,100.00</SelectItem>
                  <SelectItem value="investment">Investment (··3349) — $18,200.00</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Item variant="muted" class="flex-col items-stretch">
            <ItemContent class="gap-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">
                  Estimated arrival
                </span>
                <span class="text-sm font-medium">Today, Apr 14</span>
              </div>
              <Separator />
              <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">
                  Transaction fee
                </span>
                <span class="text-sm font-medium tabular-nums">$0.00</span>
              </div>
              <Separator />
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium">Total amount</span>
                <span class="text-sm font-semibold tabular-nums">
                  $1,200.00
                </span>
              </div>
            </ItemContent>
          </Item>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Confirm Transfer</Button>
      </CardFooter>
    </Card>
  `,
})
export class CardTransferFunds {
  protected readonly icons = { X };
}
