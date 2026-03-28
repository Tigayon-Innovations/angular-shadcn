import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CAROUSEL_CONTEXT } from './carousel-context';

/**
 * CarouselContent component - container for carousel items.
 * Matches shadcn/ui React CarouselContent exactly.
 */
@Component({
  selector: 'CarouselContent',
  template: `
    <div [class]="innerClass()">
      <ng-content />
    </div>
  `,
  host: {
    '[class]': 'computedClass()',
    'aria-atomic': 'false',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselContent {
  protected readonly context = inject(CAROUSEL_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn('overflow-hidden', this.class()));

  protected readonly innerClass = computed(() =>
    cn('flex', this.context.orientation() === 'horizontal' ? '-ml-4' : '-mt-4 flex-col'),
  );
}
