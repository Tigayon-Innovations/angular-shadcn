import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { cn } from '@/lib/utils';

/**
 * Avatar container component.
 * Wraps the avatar image and fallback.
 *
 * @example
 * <span Avatar>
 *   <img AvatarImage src="/avatar.png" alt="User" />
 *   <span AvatarFallback>JD</span>
 * </span>
 */
@Component({
  selector: '[Avatar]',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'avatar',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Avatar {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'relative flex size-8 shrink-0 overflow-hidden rounded-full',
      this.class()
    )
  );
}
