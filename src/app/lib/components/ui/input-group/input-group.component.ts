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
      this.class()
    )
  );
}
