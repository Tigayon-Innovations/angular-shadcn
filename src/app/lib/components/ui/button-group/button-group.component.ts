import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';
import {
    buttonGroupVariants,
    type ButtonGroupVariants,
} from './button-group-variants';

/**
 * ButtonGroup component - groups buttons together with shared styling.
 *
 * @example
 * <!-- Horizontal button group -->
 * <ButtonGroup>
 *   <Button variant="outline">Left</Button>
 *   <Button variant="outline">Center</Button>
 *   <Button variant="outline">Right</Button>
 * </ButtonGroup>
 *
 * <!-- Vertical button group -->
 * <ButtonGroup orientation="vertical">
 *   <Button variant="outline">Top</Button>
 *   <Button variant="outline">Middle</Button>
 *   <Button variant="outline">Bottom</Button>
 * </ButtonGroup>
 */
@Component({
  selector: 'ButtonGroup',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    role: 'group',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroup {
  /** The orientation of the button group */
  readonly orientation =
    input<ButtonGroupVariants['orientation']>('horizontal');

  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining variants and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      buttonGroupVariants({
        orientation: this.orientation(),
      }),
      this.class()
    )
  );
}
