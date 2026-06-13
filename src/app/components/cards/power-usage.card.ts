import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card';
import { Separator } from '@/lib/components/ui/separator';

@Component({
  selector: 'card-power-usage',
  standalone: true,
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Separator,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <Card>
      <CardHeader>
        <CardTitle>Power Usage</CardTitle>
        <CardDescription>Whole Home</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div
          class="flex h-[140px] w-full items-end gap-2"
          role="img"
          aria-label="Power usage by hour"
        >
          <div class="flex h-full flex-1 flex-col justify-end gap-1.5">
            <div
              class="min-h-2 rounded-t bg-chart-2"
              style="height: 31.578947368421055%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">6a</span>
          </div>
          <div class="flex h-full flex-1 flex-col justify-end gap-1.5">
            <div
              class="min-h-2 rounded-t bg-chart-2"
              style="height: 73.68421052631578%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">8a</span>
          </div>
          <div class="flex h-full flex-1 flex-col justify-end gap-1.5">
            <div
              class="min-h-2 rounded-t bg-chart-2"
              style="height: 81.57894736842105%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">10a</span>
          </div>
          <div class="flex h-full flex-1 flex-col justify-end gap-1.5">
            <div
              class="min-h-2 rounded-t bg-chart-2"
              style="height: 63.1578947368421%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">12p</span>
          </div>
          <div class="flex h-full flex-1 flex-col justify-end gap-1.5">
            <div
              class="min-h-2 rounded-t bg-chart-2"
              style="height: 89.47368421052632%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">2p</span>
          </div>
          <div class="flex h-full flex-1 flex-col justify-end gap-1.5">
            <div
              class="min-h-2 rounded-t bg-chart-2"
              style="height: 76.31578947368422%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">4p</span>
          </div>
          <div class="flex h-full flex-1 flex-col justify-end gap-1.5">
            <div
              class="min-h-2 rounded-t bg-chart-2"
              style="height: 100%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">6p</span>
          </div>
          <div class="flex h-full flex-1 flex-col justify-end gap-1.5">
            <div
              class="min-h-2 rounded-t bg-chart-2"
              style="height: 84.21052631578947%"
            ></div>
            <span class="text-center text-xs text-muted-foreground">8p</span>
          </div>
        </div>
        <Separator />
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-0.5">
            <span class="text-sm text-muted-foreground">Currently Using</span>
            <span class="text-lg font-semibold tabular-nums">3.4 kW</span>
          </div>
          <div class="flex flex-col gap-0.5">
            <span class="text-sm text-muted-foreground">Solar Gen</span>
            <span class="text-lg font-semibold tabular-nums">+1.2 kW</span>
          </div>
        </div>
      </CardContent>
    </Card>
  `,
})
export class CardPowerUsage {}
