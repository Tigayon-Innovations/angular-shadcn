import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { cn } from '@/lib/utils';

/**
 * Card description element.
 * Secondary text providing additional context.
 *
 * @example
 * <p CardDescription>This is a description of the card content.</p>
 */
@Component({
  selector: '[CardDescription]',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'card-description',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDescription {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-muted-foreground text-sm', this.class())
  );
}
