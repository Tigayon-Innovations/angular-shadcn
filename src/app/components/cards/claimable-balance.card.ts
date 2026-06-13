import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card';
import { Badge } from '@/lib/components/ui/badge';
import { Item, ItemContent } from '@/lib/components/ui/item';
import { Separator } from '@/lib/components/ui/separator';

@Component({
  selector: 'card-claimable-balance',
  standalone: true,
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Badge,
    Item,
    ItemContent,
    Separator,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <Card>
      <CardHeader>
        <CardDescription>Claimable Balance</CardDescription>
        <CardTitle class="text-4xl tabular-nums">$1,211.29</CardTitle>
        <Badge variant="outline">
          <span class="size-2 rounded-full bg-yellow-500"></span>
          Pending Setup
        </Badge>
      </CardHeader>
      <CardContent class="flex flex-1 flex-col justify-end">
        <Item variant="muted" class="flex-col items-stretch">
          <ItemContent class="gap-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-muted-foreground">Net Royalties</span>
              <span class="text-sm font-medium tabular-nums">$1,248.75</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-muted-foreground">Processing Fee</span>
              <span class="text-sm font-medium tabular-nums">-$37.46</span>
            </div>
            <Separator />
            <div class="flex items-center justify-between">
              <span class="text-sm text-muted-foreground">
                Total Ready to Claim
              </span>
              <span class="text-sm font-semibold tabular-nums">
                $1,211.29 USD
              </span>
            </div>
          </ItemContent>
        </Item>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Once your bank is connected, balances over $10.00 are automatically
          eligible for monthly distribution on the 15th of each month.
        </CardDescription>
      </CardFooter>
    </Card>
  `,
})
export class CardClaimableBalance {}
