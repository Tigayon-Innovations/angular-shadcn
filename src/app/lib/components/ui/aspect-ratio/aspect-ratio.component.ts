import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * AspectRatio component that maintains a fixed aspect ratio for its content.
 * Matches shadcn/ui React AspectRatio exactly.
 * Follows Radix UI AspectRatio specification.
 *
 * @example
 * <!-- 16:9 aspect ratio (default) -->
 * <AspectRatio [ratio]="16/9">
 *   <img src="image.jpg" alt="Image" class="object-cover w-full h-full" />
 * </AspectRatio>
 *
 * <!-- Square aspect ratio -->
 * <AspectRatio [ratio]="1">
 *   <div class="bg-muted flex items-center justify-center">Square</div>
 * </AspectRatio>
 *
 * <!-- 4:3 aspect ratio -->
 * <AspectRatio [ratio]="4/3">
 *   <video src="video.mp4"></video>
 * </AspectRatio>
 */
@Component({
  selector: 'AspectRatio',
  template: `
    <div class="absolute inset-0 h-full w-full">
      <ng-content />
    </div>
  `,
  host: {
    'attr.data-slot': '"aspect-ratio"',
    '[class]': 'computedClass()',
    '[style.padding-bottom]': 'paddingBottom()',
    '[style.position]': '"relative"',
    '[style.display]': '"block"',
    '[style.width]': '"100%"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AspectRatio {
  /** The desired aspect ratio (width / height). Defaults to 16/9 */
  readonly ratio = input<number>(16 / 9);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Calculate padding-bottom for aspect ratio */
  protected readonly paddingBottom = computed(() => {
    const r = this.ratio();
    return r > 0 ? `${(1 / r) * 100}%` : '56.25%';
  });

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() => cn('relative block w-full', this.class()));
}
