import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * Avatar fallback component.
 * Shown when the image fails to load or is not provided.
 *
 * @example
 * <span AvatarFallback>JD</span>
 */
@Component({
  selector: '[AvatarFallback]',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'avatar-fallback',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarFallback {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'bg-muted flex size-full items-center justify-center rounded-full text-xs',
      this.class()
    )
  );
}
