import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * InputGroupInput component - styled input for InputGroup without border.
 * Use this instead of the regular Input component within InputGroup
 * for better visual integration.
 */
@Component({
  selector: 'InputGroupInput',
  template: ``,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupInput {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'flex h-9 w-full bg-transparent px-3 py-1 text-base placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      this.class(),
    ),
  );
}
