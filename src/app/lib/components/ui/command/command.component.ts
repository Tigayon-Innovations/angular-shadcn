import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { COMMAND_CONTEXT, type CommandContextValue } from './command-context';

/**
 * Command component - a command palette/menu component.
 * Matches shadcn/ui React Command exactly.
 */
@Component({
  selector: 'Command',
  template: `<ng-content />`,
  providers: [
    {
      provide: COMMAND_CONTEXT,
      useFactory: (): CommandContextValue => ({
        search: signal(''),
        selectedValue: signal(''),
      }),
    },
  ],
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Command {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      this.class()
    )
  );
}
