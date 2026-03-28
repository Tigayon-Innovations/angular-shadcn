import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Card description element.
 * Secondary text providing additional context.
 *
 * @example
 * <CardDescription>This is a description of the card content.</CardDescription>
 */
@Component({
  selector: 'CardDescription',
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
    cn('text-muted-foreground text-sm', this.class()),
  );
}
