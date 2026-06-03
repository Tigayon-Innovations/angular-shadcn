import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';

/**
 * CommandGroup component - a group of command items.
 * Matches shadcn/ui React CommandGroup exactly.
 * Automatically hides groups with no visible items.
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
    'attr.data-slot': '"command-group"',
    '[class]': 'computedClass()',
    '[hidden]': '!hasVisibleItems()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandGroup {
  constructor() {
    // Trigger re-evaluation of hasVisibleItems when children change
    effect(() => {
      // Create a MutationObserver to detect when child visibility changes
      const observer = new MutationObserver(() => {
        // Mark for change detection by accessing the computed signal
        this.hasVisibleItems();
      });

      const element = this._elementRef.nativeElement;
      observer.observe(element, {
        attributes: true,
        attributeFilter: ['hidden'],
        subtree: true,
      });

      return () => observer.disconnect();
    });
  }

  /** Group heading */
  readonly heading = input<string>('');
  /** Additional CSS classes */
  readonly class = input<string>('');

  private readonly _elementRef = inject(ElementRef);

  /** Check if group has any visible items */
  protected readonly hasVisibleItems = computed(() => {
    // This will be re-evaluated whenever DOM changes
    const element = this._elementRef.nativeElement;
    const visibleItems = element.querySelectorAll('CommandItem:not([hidden])');
    return visibleItems.length > 0;
  });
  protected readonly computedClass = computed(() =>
    cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
      this.class(),
    ),
  );
}
