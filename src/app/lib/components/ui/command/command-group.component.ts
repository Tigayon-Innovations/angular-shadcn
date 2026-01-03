import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * CommandGroup component - a group of command items.
 * Matches shadcn/ui React CommandGroup exactly.
 */
@Component({
  selector: 'CommandGroup',
  template: `
    @if (heading()) {
      <div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">{{ heading() }}</div>
    }
    <ng-content />
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandGroup {
  /** Group heading */
  readonly heading = input<string>('');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
      this.class()
    )
  );
}
