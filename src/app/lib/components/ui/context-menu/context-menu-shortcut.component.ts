import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * ContextMenuShortcut component - displays keyboard shortcut hint.
 * Matches shadcn/ui React ContextMenuShortcut exactly.
 */
@Component({
  selector: 'ContextMenuShortcut',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuShortcut {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('ml-auto text-xs tracking-widest text-muted-foreground', this.class())
  );
}
