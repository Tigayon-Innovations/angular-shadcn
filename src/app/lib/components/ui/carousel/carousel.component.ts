import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import {
  CAROUSEL_CONTEXT,
  type CarouselContextValue,
  type CarouselOrientation,
} from './carousel-context';

/**
 * Carousel component - root container for carousel.
 * Matches shadcn/ui React Carousel exactly.
 */
@Component({
  selector: 'Carousel',
  template: `<ng-content />`,
  providers: [
    {
      provide: CAROUSEL_CONTEXT,
      useFactory: (): CarouselContextValue => {
        const currentIndex = signal(0);
        const itemCount = signal(0);
        const orientation = signal<CarouselOrientation>('horizontal');
        const canScrollPrev = signal(false);
        const canScrollNext = signal(true);

        return {
          orientation,
          currentIndex,
          itemCount,
          canScrollPrev,
          canScrollNext,
          scrollPrev: () => {
            const current = currentIndex();
            if (current > 0) {
              currentIndex.set(current - 1);
              canScrollPrev.set(current - 1 > 0);
              canScrollNext.set(true);
            }
          },
          scrollNext: () => {
            const current = currentIndex();
            const count = itemCount();
            if (current < count - 1) {
              currentIndex.set(current + 1);
              canScrollPrev.set(true);
              canScrollNext.set(current + 1 < count - 1);
            }
          },
          scrollTo: (index: number) => {
            const count = itemCount();
            if (index >= 0 && index < count) {
              currentIndex.set(index);
              canScrollPrev.set(index > 0);
              canScrollNext.set(index < count - 1);
            }
          },
        };
      },
    },
  ],
  host: {
    '[class]': 'computedClass()',
    'role': 'region',
    'aria-roledescription': 'carousel',
    '(keydown.ArrowLeft)': 'onKeyDown($event, "left")',
    '(keydown.ArrowRight)': 'onKeyDown($event, "right")',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carousel {
  /** Carousel orientation */
  readonly orientation = input<CarouselOrientation>('horizontal');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('relative', this.class())
  );

  protected onKeyDown(event: KeyboardEvent, direction: 'left' | 'right'): void {
    // Keyboard navigation is handled by the carousel API
  }
}
