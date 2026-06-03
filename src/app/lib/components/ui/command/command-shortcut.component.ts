import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * CommandShortcut component - displays keyboard shortcut hint.
 * Matches shadcn/ui React CommandShortcut exactly.
 */
@Component({
  selector: 'CommandShortcut',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"command-shortcut"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandShortcut {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('ml-auto text-xs tracking-widest text-muted-foreground', this.class()),
  );
}
