import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { TABS_CONTEXT } from './tabs-context';

/**
 * TabsList component - container for tab triggers.
 * Provides proper ARIA tablist role and keyboard navigation.
 *
 * @example
 * <TabsList>
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 */
@Component({
  selector: 'TabsList',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'role': 'tablist',
    '[attr.id]': 'tabs.tablistId',
    '[attr.aria-orientation]': 'tabs.orientation()',
    '(keydown)': 'onKeydown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsList {
  protected readonly tabs = inject(TABS_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'bg-muted text-muted-foreground inline-flex h-11 w-fit items-center justify-center rounded-full p-1.5 gap-1',
      this.class()
    )
  );

  onKeydown(event: KeyboardEvent): void {
    const tabValues = this.tabs.tabValues();
    if (tabValues.length === 0) return;

    const currentValue = this.tabs.value();
    const currentIndex = tabValues.indexOf(currentValue);
    const orientation = this.tabs.orientation();

    let newIndex = currentIndex;
    let handled = false;

    switch (event.key) {
      case 'ArrowLeft':
        if (orientation === 'horizontal') {
          newIndex = currentIndex > 0 ? currentIndex - 1 : tabValues.length - 1;
          handled = true;
        }
        break;
      case 'ArrowRight':
        if (orientation === 'horizontal') {
          newIndex = currentIndex < tabValues.length - 1 ? currentIndex + 1 : 0;
          handled = true;
        }
        break;
      case 'ArrowUp':
        if (orientation === 'vertical') {
          newIndex = currentIndex > 0 ? currentIndex - 1 : tabValues.length - 1;
          handled = true;
        }
        break;
      case 'ArrowDown':
        if (orientation === 'vertical') {
          newIndex = currentIndex < tabValues.length - 1 ? currentIndex + 1 : 0;
          handled = true;
        }
        break;
      case 'Home':
        newIndex = 0;
        handled = true;
        break;
      case 'End':
        newIndex = tabValues.length - 1;
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
      const newValue = tabValues[newIndex];
      this.tabs.onValueChange(newValue);

      // Focus the new tab
      const tabId = this.tabs.getTabId(newValue);
      const tabElement = document.getElementById(tabId);
      tabElement?.focus();
    }
  }
}
