import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * EmptyIcon component - container for the empty state icon.
 */
@Component({
  selector: 'EmptyIcon',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"empty-icon"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyIcon {
  /** Additional CSS classes to apply */
  readonly class = input<string>('');

  /** Computed class combining base styles and custom classes */
  protected readonly computedClass = computed(() =>
    cn(
      'mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&>svg]:size-6 [&>lucide-icon]:size-6',
      this.class(),
    ),
  );
}
