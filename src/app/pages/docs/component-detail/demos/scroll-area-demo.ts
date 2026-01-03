import { ScrollArea } from '@/ui/scroll-area';
import { Separator } from '@/ui/separator';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ScrollAreaDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollArea, Separator],
  template: `
    <ScrollArea class="h-72 w-48 rounded-md border">
      <div class="p-4">
        <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
        @for (tag of tags; track tag) {
          <div class="text-sm">{{ tag }}</div>
          <Separator class="my-2" />
        }
      </div>
    </ScrollArea>
  `,
})
export class ScrollAreaDemo {
  protected readonly tags = [
    'Angular',
    'TypeScript',
    'Tailwind CSS',
    'Signals',
    'Standalone Components',
    'Server-Side Rendering',
    'Hydration',
    'Zoneless',
    'Control Flow',
    'Deferrable Views',
    'Reactive Forms',
    'Router',
    'HTTP Client',
    'Animations',
    'Testing',
  ];
}
