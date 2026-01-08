import { AspectRatio } from '@/ui/aspect-ratio';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'AspectRatioDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AspectRatio],
  template: `
    <div class="w-full max-w-md">
      <AspectRatio [ratio]="16 / 9" class="bg-muted rounded-lg overflow-hidden" >
        <img
          src="https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1588345921523-c2dcdb7f1dcd%3Fw%3D800%26dpr%3D2%26q%3D80&w=3840&q=75"
          alt="Photo by Drew Beamer"
          class="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  `,
})
export class AspectRatioDemo {}
