import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * MenubarShortcut component - keyboard shortcut hint.
 * Matches shadcn/ui React MenubarShortcut exactly.
 */
@Component({
  selector: 'MenubarShortcut',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarShortcut {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('ml-auto text-xs tracking-widest text-muted-foreground', this.class())
  );
}
