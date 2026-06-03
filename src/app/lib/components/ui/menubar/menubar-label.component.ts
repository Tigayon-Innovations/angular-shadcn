import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * MenubarLabel component - label in the menu.
 * Matches shadcn/ui React MenubarLabel exactly.
 */
@Component({
  selector: 'MenubarLabel',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"menubar-label"',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarLabel {
  /** Whether the label is inset */
  readonly inset = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('px-2 py-1.5 text-sm font-semibold', this.inset() && 'pl-8', this.class()),
  );
}
