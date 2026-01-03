import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

/**
 * InputGroupAddon component - prefix or suffix addon for InputGroup.
 *
 * @example
 * <InputGroupAddon position="start">$</InputGroupAddon>
 * <InputGroupAddon position="end">
 *   <svg>...</svg>
 * </InputGroupAddon>
 */
@Component({
  selector: 'InputGroupAddon',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupAddon {
  /** Position of the addon */
  readonly position = input<'start' | 'end'>('start');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'flex h-9 items-center justify-center bg-muted px-3 text-sm text-muted-foreground',
      this.position() === 'start'
        ? 'rounded-l-md border-r'
        : 'rounded-r-md border-l',
      this.class()
    )
  );
}
