import { Empty, EmptyDescription, EmptyIcon, EmptyTitle } from '@/ui/empty';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Inbox, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'EmptyDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Empty, EmptyDescription, EmptyIcon, EmptyTitle, LucideAngularModule],
  template: `
    <Empty class="py-12">
      <EmptyIcon>
        <lucide-icon [img]="Inbox" class="h-12 w-12 text-muted-foreground" />
      </EmptyIcon>
      <EmptyTitle>No items found</EmptyTitle>
      <EmptyDescription>
        You haven't added any items yet. Start by creating a new item.
      </EmptyDescription>
    </Empty>
  `,
})
export class EmptyDemo {
  protected readonly Inbox = Inbox;
}
