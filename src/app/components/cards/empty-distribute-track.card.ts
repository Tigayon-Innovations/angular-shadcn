import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, Plus } from 'lucide-angular';

import { Button } from '@/lib/components/ui/button';
import { Card } from '@/lib/components/ui/card';
import { CardContent } from '@/lib/components/ui/card';
import { Empty } from '@/lib/components/ui/empty';
import { EmptyDescription } from '@/lib/components/ui/empty';
import { EmptyIcon } from '@/lib/components/ui/empty';
import { EmptyTitle } from '@/lib/components/ui/empty';

@Component({
  selector: 'card-empty-distribute-track',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucideAngularModule,
    Button,
    Card,
    CardContent,
    Empty,
    EmptyDescription,
    EmptyIcon,
    EmptyTitle,
  ],
  template: `
    <Card>
      <CardContent>
        <Empty class="p-4">
          <EmptyIcon variant="icon">
            <lucide-icon [img]="icons.Plus" />
          </EmptyIcon>
          <div>
            <EmptyTitle>Distribute Track</EmptyTitle>
            <EmptyDescription>
              Upload your first master to start reaching listeners on Spotify,
              Apple Music, and more.
            </EmptyDescription>
          </div>
          <div>
            <Button>Create Release</Button>
          </div>
        </Empty>
      </CardContent>
    </Card>
  `,
})
export class CardEmptyDistributeTrack {
  protected readonly icons = { Plus };
}
