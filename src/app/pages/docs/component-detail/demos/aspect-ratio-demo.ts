import { AspectRatio } from '@/ui/aspect-ratio';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'AspectRatioDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AspectRatio],
  template: `
    <div class="w-full max-w-md">
      <AspectRatio [ratio]="16 / 9" class="bg-muted rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          class="h-full w-full object-cover"
        />
      </AspectRatio>
      <p class="text-sm text-muted-foreground mt-2 text-center">
        16:9 Aspect Ratio
      </p>
    </div>
  `,
})
export class AspectRatioDemo {}
