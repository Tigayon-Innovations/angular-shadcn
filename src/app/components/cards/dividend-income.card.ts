import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card';
import { Button } from '@/lib/components/ui/button';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/lib/components/ui/item';

@Component({
  selector: 'card-dividend-income',
  standalone: true,
  imports: [
    LucideAngularModule,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Button,
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <Card>
      <CardHeader>
        <CardTitle>Q2 Dividend Income</CardTitle>
        <CardDescription>
          Quarterly dividend payouts across your portfolio holdings.
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="icon"
            class="bg-muted"
            aria-label="Dismiss dividend income"
          >
            <lucide-icon [img]="icons.X" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <Item role="listitem" variant="muted">
            <ItemContent>
              <ItemTitle>Vanguard</ItemTitle>
              <ItemDescription>450 Shares</ItemDescription>
            </ItemContent>
            <div
              class="hidden h-8 w-24 items-end gap-1 md:flex"
              role="img"
              aria-label="Vanguard quarterly dividends"
            >
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 58.28220858895706%"
              ></div>
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 64.41717791411043%"
              ></div>
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 59.81595092024539%"
              ></div>
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 100%"
              ></div>
            </div>
          </Item>
          <Item role="listitem" variant="muted">
            <ItemContent>
              <ItemTitle>S&amp;P 500 VOO</ItemTitle>
              <ItemDescription>112 Shares</ItemDescription>
            </ItemContent>
            <div
              class="hidden h-8 w-24 items-end gap-1 md:flex"
              role="img"
              aria-label="S&P 500 VOO quarterly dividends"
            >
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 56.25%"
              ></div>
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 65.625%"
              ></div>
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 100%"
              ></div>
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 68.125%"
              ></div>
            </div>
          </Item>
          <Item role="listitem" variant="muted">
            <ItemContent>
              <ItemTitle>Apple AAPL</ItemTitle>
              <ItemDescription>85 Shares</ItemDescription>
            </ItemContent>
            <div
              class="hidden h-8 w-24 items-end gap-1 md:flex"
              role="img"
              aria-label="Apple AAPL quarterly dividends"
            >
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 50%"
              ></div>
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 58.333333333333336%"
              ></div>
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 100%"
              ></div>
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 75%"
              ></div>
            </div>
          </Item>
          <Item role="listitem" variant="muted">
            <ItemContent>
              <ItemTitle>Realty Income</ItemTitle>
              <ItemDescription>320 Shares</ItemDescription>
            </ItemContent>
            <div
              class="hidden h-8 w-24 items-end gap-1 md:flex"
              role="img"
              aria-label="Realty Income quarterly dividends"
            >
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 66.66666666666666%"
              ></div>
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 72.22222222222221%"
              ></div>
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 77.77777777777779%"
              ></div>
              <div
                class="min-h-1 flex-1 rounded-t-sm bg-chart-2"
                style="height: 100%"
              ></div>
            </div>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  `,
})
export class CardDividendIncome {
  protected readonly icons = { X };
}
