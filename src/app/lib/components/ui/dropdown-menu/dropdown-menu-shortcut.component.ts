import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * DropdownMenuShortcut component - displays keyboard shortcut hint.
 * Matches shadcn/ui React DropdownMenuShortcut exactly.
 */
@Component({
  selector: 'DropdownMenuShortcut',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuShortcut {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('ml-auto text-xs tracking-widest opacity-60', this.class())
  );
}
