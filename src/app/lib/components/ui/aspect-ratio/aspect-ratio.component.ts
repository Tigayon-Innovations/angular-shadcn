import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * AspectRatio component that maintains a fixed aspect ratio for its content.
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
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[style.--aspect-ratio]': 'ratio()',
    'data-slot': 'aspect-ratio',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AspectRatio {
  /** The desired aspect ratio (width / height) */
  readonly ratio = input<number>(16 / 9);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'relative w-full',
      '[&>*]:absolute [&>*]:inset-0 [&>*]:h-full [&>*]:w-full',
      'aspect-[var(--aspect-ratio)]',
      this.class()
    )
  );
}
