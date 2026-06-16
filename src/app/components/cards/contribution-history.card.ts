import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card';
import { Button } from '@/lib/components/ui/button';
import { Item, ItemContent, ItemDescription } from '@/lib/components/ui/item';

@Component({
  selector: 'card-contribution-history',
  standalone: true,
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Button,
    Item,
    ItemContent,
    ItemDescription,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <Card>
      <CardHeader>
        <CardTitle>Contribution History</CardTitle>
        <CardDescription>Last 6 months of activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          class="flex h-[200px] w-full items-end gap-3"
          role="img"
          aria-label="Last 6 months of contribution activity"
        >
          <div class="flex h-full flex-1 flex-col justify-end gap-2">
            <div
              class="min-h-2 rounded-t-md bg-chart-2"
              style="height: 57.142857142857146%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">Dec</span>
          </div>
          <div class="flex h-full flex-1 flex-col justify-end gap-2">
            <div
              class="min-h-2 rounded-t-md bg-chart-2"
              style="height: 78.57142857142857%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">Jan</span>
          </div>
          <div class="flex h-full flex-1 flex-col justify-end gap-2">
            <div
              class="min-h-2 rounded-t-md bg-chart-2"
              style="height: 64.28571428571429%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">Feb</span>
          </div>
          <div class="flex h-full flex-1 flex-col justify-end gap-2">
            <div
              class="min-h-2 rounded-t-md bg-chart-2"
              style="height: 92.85714285714286%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">Mar</span>
          </div>
          <div class="flex h-full flex-1 flex-col justify-end gap-2">
            <div
              class="min-h-2 rounded-t-md bg-chart-2"
              style="height: 53.57142857142857%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">Apr</span>
          </div>
          <div class="flex h-full flex-1 flex-col justify-end gap-2">
            <div
              class="min-h-2 rounded-t-md bg-chart-2"
              style="height: 100%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">May</span>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <div class="grid w-full grid-cols-1 gap-3 xl:grid-cols-2">
          <Item variant="muted" class="flex-col items-stretch">
            <ItemContent class="gap-1">
              <ItemDescription
                class="text-xs font-medium tracking-wider text-muted-foreground uppercase"
              >
                Upcoming
              </ItemDescription>
              <span class="text-base font-semibold">May 2024</span>
              <span class="text-sm text-muted-foreground">Scheduled</span>
            </ItemContent>
          </Item>
          <Item variant="muted" class="hidden flex-col items-stretch xl:flex">
            <ItemContent class="gap-1">
              <ItemDescription
                class="text-xs font-medium tracking-wider text-muted-foreground uppercase"
              >
                Savings Plan
              </ItemDescription>
              <span class="text-base font-semibold">Accelerated</span>
              <span class="text-sm text-muted-foreground">Recurring</span>
            </ItemContent>
          </Item>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full">View Full Report</Button>
      </CardFooter>
    </Card>
  `,
})
export class CardContributionHistory {}
