import { Separator } from '@/ui/separator';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'SeparatorDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Separator],
  template: `
    <div class="w-full max-w-md">
      <div class="space-y-1">
        <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
        <p class="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator class="my-4" />
      <div class="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  `,
})
export class SeparatorDemo {}
