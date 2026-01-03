import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { cn } from '@/lib/utils';

/**
 * Card container component.
 * Provides the main card wrapper with shadow and rounded corners.
 *
 * @example
 * <section Card>
 *   <div CardHeader>
 *     <h3 CardTitle>Title</h3>
 *     <p CardDescription>Description</p>
 *   </div>
 *   <div CardContent>Content here</div>
 *   <div CardFooter>Footer actions</div>
 * </section>
 */
@Component({
  selector: '[Card]',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-slot': 'card',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
      this.class()
    )
  );
}
