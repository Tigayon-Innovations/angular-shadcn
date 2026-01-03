import { Button } from '@/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'TooltipDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Button],
  template: `
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  `,
})
export class TooltipDemo {}
