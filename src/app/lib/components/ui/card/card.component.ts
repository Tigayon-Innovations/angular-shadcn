import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Card container component.
 * Provides the main card wrapper with shadow and rounded corners.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content here</CardContent>
 *   <CardFooter>Footer actions</CardFooter>
 * </Card>
 */
@Component({
  selector: 'Card',
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
      this.class(),
    ),
  );
}
