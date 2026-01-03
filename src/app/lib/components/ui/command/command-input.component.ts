import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';
import { COMMAND_CONTEXT } from './command-context';

/**
 * CommandInput component - the search input for the command palette.
 * Matches shadcn/ui React CommandInput exactly.
 */
@Component({
  selector: 'CommandInput',
  imports: [LucideAngularModule],
  template: `
    <div class="flex items-center border-b px-3" cmdk-input-wrapper>
      <lucide-icon [img]="SearchIcon" class="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        [class]="computedClass()"
        [placeholder]="placeholder()"
        [value]="context.search()"
        (input)="onInput($event)"
        type="text"
      />
    </div>
  `,
  host: {
    class: 'contents',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandInput {
  protected readonly context = inject(COMMAND_CONTEXT);
  protected readonly SearchIcon = Search;

  /** Placeholder text */
  readonly placeholder = input<string>('Search...');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
      this.class()
    )
  );

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.context.search.set(target.value);
  }
}
