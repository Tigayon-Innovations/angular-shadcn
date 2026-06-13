import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { Card } from '@/lib/components/ui/card';
import { CardAction } from '@/lib/components/ui/card';
import { CardDescription } from '@/lib/components/ui/card';
import { CardHeader } from '@/lib/components/ui/card';
import { CardTitle } from '@/lib/components/ui/card';

@Component({
  selector: 'card-analytics',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Badge, Button, Card, CardAction, CardDescription, CardHeader, CardTitle],
  template: `
    <Card class="mx-auto w-full max-w-sm data-[size=sm]:pb-0" size="sm">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>
          418.2K Visitors <Badge>+10%</Badge>
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View Analytics
          </Button>
        </CardAction>
      </CardHeader>
      <svg
        viewBox="0 0 100 86"
        preserveAspectRatio="none"
        class="aspect-[1/0.35] w-full text-chart-1"
        role="img"
        aria-label="Visitor trend"
      >
        <path d="M0 52L18 40L36 46L54 70L72 50L100 49V86H0Z" fill="currentColor" opacity="0.28" />
        <path
          d="M0 52L18 40L36 46L54 70L72 50L100 49"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    </Card>
  `,
})
export class CardAnalytics {}
