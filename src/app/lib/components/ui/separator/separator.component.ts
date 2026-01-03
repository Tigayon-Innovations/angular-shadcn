import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * Separator component that creates a visual divider.
 *
 * @example
 * <!-- Horizontal separator (default) -->
 * <Separator />
 *
 * <!-- Vertical separator -->
 * <Separator orientation="vertical" />
 *
 * <!-- With decorative role -->
 * <Separator [decorative]="true" />
 */
@Component({
  selector: 'Separator',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': 'decorative() ? "none" : "separator"',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.data-orientation]': 'orientation()',
    'data-slot': 'separator',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Separator {
  /** The orientation of the separator */
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  /** Whether the separator is purely decorative */
  readonly decorative = input<boolean>(false);

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class based on orientation */
  protected readonly computedClass = computed(() =>
    cn(
      'bg-border shrink-0',
      this.orientation() === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      this.class()
    )
  );
}
