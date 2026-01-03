import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';
import { buttonVariants } from '../button';
import { CAROUSEL_CONTEXT } from './carousel-context';

/**
 * CarouselNext component - next navigation button.
 * Matches shadcn/ui React CarouselNext exactly.
 */
@Component({
  selector: 'CarouselNext',
  imports: [LucideAngularModule],
  template: `
    <button
      type="button"
      [class]="computedClass()"
      [disabled]="!context.canScrollNext()"
      (click)="context.scrollNext()"
      aria-label="Next slide"
    >
      <lucide-icon [img]="ArrowRightIcon" class="h-4 w-4" />
      <span class="sr-only">Next slide</span>
    </button>
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselNext {
  protected readonly context = inject(CAROUSEL_CONTEXT);
  protected readonly ArrowRightIcon = ArrowRight;

  /** Button variant */
  readonly variant = input<'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'>('outline');

  /** Button size */
  readonly size = input<'default' | 'sm' | 'lg' | 'icon'>('icon');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'absolute h-8 w-8 rounded-full',
      this.context.orientation() === 'horizontal'
        ? '-right-12 top-1/2 -translate-y-1/2'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
      this.class()
    )
  );
}
