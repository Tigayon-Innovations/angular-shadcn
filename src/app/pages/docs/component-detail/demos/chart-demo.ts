import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ChartDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, CardContent, CardDescription, CardHeader, CardTitle],
  template: `
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="h-[200px] w-full flex items-center justify-center bg-muted/30 rounded-lg">
          <p class="text-sm text-muted-foreground">
            Chart visualization would render here with your data
          </p>
        </div>
      </CardContent>
    </Card>
  `,
})
export class ChartDemo {}
