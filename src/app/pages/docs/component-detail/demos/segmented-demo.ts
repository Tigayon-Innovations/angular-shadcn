import { Segmented, SegmentedItem } from '@/ui/segmented';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'SegmentedDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Segmented, SegmentedItem],
  template: `
    <Segmented [value]="value()" (valueChange)="value.set($event)">
      <SegmentedItem value="all">All</SegmentedItem>
      <SegmentedItem value="active">Active</SegmentedItem>
      <SegmentedItem value="draft">Draft</SegmentedItem>
      <SegmentedItem value="archived">Archived</SegmentedItem>
    </Segmented>
  `,
})
export class SegmentedDemo {
  protected readonly value = signal('all');
}
