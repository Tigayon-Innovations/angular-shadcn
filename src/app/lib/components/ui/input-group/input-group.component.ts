import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * InputGroup component - wrapper for input with prefix/suffix addons.
 *
 * @example
 * <!-- With prefix -->
 * <InputGroup>
 *   <InputGroupAddon position="start">
 *     <svg>...</svg>
 *   </InputGroupAddon>
 *   <Input type="email" placeholder="Enter email" />
 * </InputGroup>
 *
 * <!-- With suffix -->
 * <InputGroup>
 *   <Input type="text" placeholder="Amount" />
 *   <InputGroupAddon position="end">.00</InputGroupAddon>
 * </InputGroup>
 *
 * <!-- With both -->
 * <InputGroup>
 *   <InputGroupAddon position="start">$</InputGroupAddon>
 *   <Input type="number" placeholder="0.00" />
 *   <InputGroupAddon position="end">USD</InputGroupAddon>
 * </InputGroup>
 */
@Component({
  selector: 'InputGroup',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroup {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'flex items-center rounded-md border border-input bg-background shadow-xs ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 [&>input]:border-0 [&>input]:shadow-none [&>input]:focus-visible:ring-0 [&>input]:focus-visible:ring-offset-0',
      this.class()
    )
  );
}
