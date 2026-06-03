import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { kbdVariants, type KbdVariants } from './kbd-variants';

/**
 * Kbd component - displays keyboard keys or shortcuts.
 *
 * @example
 * <!-- Single key -->
 * <Kbd>K</Kbd>
 *
 * <!-- Shortcut combination -->
 * <span class="flex items-center gap-1">
 *   <Kbd>⌘</Kbd>
 *   <Kbd>K</Kbd>
 * </span>
 *
 * <!-- With size -->
 * <Kbd size="lg">Enter</Kbd>
 */
@Component({
  selector: 'Kbd',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"kbd"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Kbd {
  /** The size of the kbd element */
  readonly size = input<KbdVariants['size']>('default');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      kbdVariants({
        size: this.size(),
      }),
      this.class(),
    ),
  );
}
