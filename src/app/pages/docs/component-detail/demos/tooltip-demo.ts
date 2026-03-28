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
          <Button variant="outline" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span class="sr-only">Add</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent> Add to library </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  `,
})
export class TooltipDemo {}
