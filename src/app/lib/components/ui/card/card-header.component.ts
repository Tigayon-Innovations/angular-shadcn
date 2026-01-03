import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Card header section.
 * Contains the title, description, and optional action.
 *
 * @example
 * <CardHeader>
 *   <CardTitle>Card Title</CardTitle>
 *   <CardDescription>Card description text</CardDescription>
 * </CardHeader>
 */
@Component({
  selector: 'CardHeader',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'card-header',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeader {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
      this.class()
    )
  );
}
