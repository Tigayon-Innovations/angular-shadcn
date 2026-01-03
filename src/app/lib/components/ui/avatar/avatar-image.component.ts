import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { cn } from '@/lib/utils';

/**
 * Avatar image component.
 * The image to display for the avatar.
 *
 * @example
 * <img AvatarImage src="/avatar.png" alt="User avatar" />
 */
@Component({
  selector: '[AvatarImage]',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'avatar-image',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarImage {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('aspect-square size-full', this.class())
  );
}
