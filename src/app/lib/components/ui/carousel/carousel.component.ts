import { cn } from '@/lib/utils';
import { LiveAnnouncerService } from '@/lib/utils/accessibility';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
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
 *
 * ACCESSIBILITY: Includes live region announcements for slide changes.
 */
@Component({
  selector: 'Carousel',
  template: `
    <ng-content />
    <!-- Live region for announcements -->
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      {{ slideAnnouncement() }}
    </div>
  `,
  providers: [
    {
      provide: CAROUSEL_CONTEXT,
      useFactory: (carousel: Carousel): CarouselContextValue => {
        const currentIndex = signal(0);
        const itemCount = signal(0);
        const orientation = signal<CarouselOrientation>('horizontal');
        const canScrollPrev = signal(false);
        const canScrollNext = signal(true);

        const announceSlide = (index: number, total: number) => {
          carousel.announceSlideChange(index, total);
        };

        return {
          orientation,
          currentIndex,
          itemCount,
          canScrollPrev,
          canScrollNext,
          announceSlide,
          scrollPrev: () => {
            const current = currentIndex();
            if (current > 0) {
              currentIndex.set(current - 1);
              canScrollPrev.set(current - 1 > 0);
              canScrollNext.set(true);
              announceSlide(current - 1, itemCount());
            }
          },
          scrollNext: () => {
            const current = currentIndex();
            const count = itemCount();
            if (current < count - 1) {
              currentIndex.set(current + 1);
              canScrollPrev.set(true);
              canScrollNext.set(current + 1 < count - 1);
              announceSlide(current + 1, count);
            }
          },
          scrollTo: (index: number) => {
            const count = itemCount();
            if (index >= 0 && index < count) {
              currentIndex.set(index);
              canScrollPrev.set(index > 0);
              canScrollNext.set(index < count - 1);
              announceSlide(index, count);
            }
          },
        };
      },
      deps: [Carousel],
    },
  ],
  host: {
    '[class]': 'computedClass()',
    'role': 'region',
    '[attr.aria-label]': 'ariaLabel()',
    'aria-roledescription': 'carousel',
    '(keydown.arrowleft)': 'onKeyDown($event, "left")',
    '(keydown.arrowright)': 'onKeyDown($event, "right")',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carousel {
  private readonly liveAnnouncer = inject(LiveAnnouncerService);

  /** Carousel orientation */
  readonly orientation = input<CarouselOrientation>('horizontal');

  /** Accessible label for the carousel */
  readonly ariaLabel = input<string>('Carousel');

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Current slide announcement for screen readers */
  readonly slideAnnouncement = signal<string>('');

  protected readonly computedClass = computed(() =>
    cn('relative', this.class())
  );

  protected onKeyDown(_event: Event, _direction: 'left' | 'right'): void {
    // Keyboard navigation is handled by the carousel API
  }

  /** Announce slide change to screen readers */
  announceSlideChange(index: number, total: number): void {
    const message = `Slide ${index + 1} of ${total}`;
    this.slideAnnouncement.set(message);
    this.liveAnnouncer.announce(message, 'polite');
  }
}
