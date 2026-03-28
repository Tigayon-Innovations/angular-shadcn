import { ScrollArea } from '@/ui/scroll-area';
import { Separator } from '@/ui/separator';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ScrollAreaDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollArea, Separator],
  template: `
    <ScrollArea class="h-80 w-64 rounded-xl border bg-card shadow-sm">
      <div class="p-5">
        <h4 class="mb-4 text-base font-semibold leading-none">Tags</h4>
        @for (tag of tags; track tag; let last = $last) {
          <div
            class="text-sm py-2 px-1 hover:bg-accent/50 rounded-md transition-colors cursor-pointer"
          >
            {{ tag }}
          </div>
          @if (!last) {
            <Separator class="my-1" />
          }
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
