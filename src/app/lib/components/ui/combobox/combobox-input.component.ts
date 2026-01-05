import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';
import { COMBOBOX_CONTEXT } from './combobox-context';

/**
 * ComboboxInput component - search input for filtering options.
 */
@Component({
  selector: 'ComboboxInput',
  imports: [LucideAngularModule],
  template: `
    <lucide-icon [img]="SearchIcon" class="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <input
      [class]="inputClass()"
      [placeholder]="placeholder()"
      [value]="context.search()"
      (input)="onInput($event)"
      (keydown.escape)="onEscape()"
    />
  `,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxInput {
  protected readonly context = inject(COMBOBOX_CONTEXT);
  protected readonly SearchIcon = Search;

  /** Placeholder text */
  readonly placeholder = input<string>('Search...');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex items-center border-b px-3', this.class())
  );

  protected readonly inputClass = computed(() =>
    cn(
      'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
    )
  );

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.context.search.set(target.value);
  }

  protected onEscape(): void {
    this.context.onOpenChange(false);
  }
}
