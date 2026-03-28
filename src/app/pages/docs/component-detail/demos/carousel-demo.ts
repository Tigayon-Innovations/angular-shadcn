import { Card, CardContent } from '@/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/carousel';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'CarouselDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Card,
    CardContent,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  ],
  template: `
    <Carousel class="w-full max-w-xs">
      <CarouselContent>
        @for (item of items; track item) {
          <CarouselItem>
            <div class="p-1">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <span class="text-4xl font-semibold">{{ item }}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  `,
})
export class CarouselDemo {
  protected readonly items = [1, 2, 3, 4, 5];
}
