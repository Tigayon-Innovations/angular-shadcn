import { Button } from '@/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/ui/collapsible';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChevronsUpDown, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'CollapsibleDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Collapsible, CollapsibleContent, CollapsibleTrigger, Button, LucideAngularModule],
  template: `
    <Collapsible [open]="isOpen()" (openChange)="isOpen.set($event ?? false)" class="w-full max-w-md space-y-2">
      <div class="flex items-center justify-between space-x-4 px-4">
        <h4 class="text-sm font-semibold">
          &#64;peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger>
          <Button variant="ghost" size="sm" class="w-9 p-0">
            <lucide-icon [img]="ChevronsUpDown" class="h-4 w-4" />
            <span class="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div class="rounded-md border px-4 py-3 font-mono text-sm">
        &#64;radix-ui/primitives
      </div>
      <CollapsibleContent class="space-y-2">
        <div class="rounded-md border px-4 py-3 font-mono text-sm">
          &#64;radix-ui/colors
        </div>
        <div class="rounded-md border px-4 py-3 font-mono text-sm">
          &#64;stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  `,
})
export class CollapsibleDemo {
  protected readonly isOpen = signal(false);
  protected readonly ChevronsUpDown = ChevronsUpDown;
}
