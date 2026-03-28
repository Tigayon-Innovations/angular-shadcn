import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CAROUSEL_CONTEXT } from './carousel-context';

/**
 * CarouselItem component - individual carousel item.
 * Matches shadcn/ui React CarouselItem exactly.
 */
@Component({
  selector: 'CarouselItem',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    role: 'group',
    'aria-roledescription': 'slide',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselItem {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(CAROUSEL_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(
      'min-w-0 shrink-0 grow-0 basis-full',
      this.context.orientation() === 'horizontal' ? 'pl-4' : 'pt-4',
      this.class(),
    ),
  );
}
