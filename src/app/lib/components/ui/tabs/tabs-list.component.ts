import { cn } from '@/lib/utils';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
} from '@angular/core';
import { TABS_CONTEXT } from './tabs-context';

/**
 * Props for the TabsList component
 */
export interface TabsListProps {
  /** Whether to show the animated indicator.
   * @default true */
  showIndicator?: boolean;
  /** Additional CSS classes for the indicator */
  indicatorClass?: string;
  /** Additional CSS classes */
  class?: string;
}

/**
 * @component TabsList
 *
 * Contains the tab triggers. Provides proper ARIA tablist role and keyboard navigation.
 *
 * @description
 * TabsList serves as the container for TabsTrigger components and implements
 * the tablist role with proper ARIA attributes and keyboard navigation.
 *
 * ## Features
 * - Animated indicator showing active tab
 * - Full keyboard navigation (arrow keys, Home, End)
 * - Proper ARIA tablist role
 * - Horizontal and vertical orientation support
 * - Automatic or manual activation modes
 *
 * ## Accessibility
 * - `role="tablist"` on the container
 * - `aria-orientation` reflects the orientation
 * - Manages focus between tabs via roving tabindex
 *
 * ## Keyboard Navigation
 * - `ArrowRight/ArrowLeft` - Navigate tabs (horizontal)
 * - `ArrowDown/ArrowUp` - Navigate tabs (vertical)
 * - `Home` - Focus first tab
 * - `End` - Focus last tab
 *
 * @example Basic usage
 * ```html
 * <TabsList>
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 * ```
 *
 * @example Without indicator
 * ```html
 * <TabsList [showIndicator]="false">
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 * ```
 *
 * @data-attributes Inherits data-orientation from parent Tabs
 */
@Component({
  selector: 'TabsList',
  template: `
    <ng-content />
    @if (showIndicator()) {
      <span
        data-slot="tabs-indicator"
        [class]="computedIndicatorClass()"
        [style.width.px]="indicatorStyle().width"
        [style.left.px]="indicatorStyle().left"
        aria-hidden="true"
      ></span>
    }
  `,
  host: {
    'attr.data-slot': '"tabs-list"',
    '[class]': 'computedClass()',
    role: 'tablist',
    '[attr.id]': 'tabs.tablistId',
    '[attr.aria-orientation]': 'tabs.orientation()',
    '(keydown)': 'onKeydown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsList {
  constructor() {
    // Update indicator when value changes (browser-only via afterNextRender)
    effect(() => {
      const _ = this.tabs.value(); // Subscribe to value changes
      // Schedule browser-only DOM update
      afterNextRender(
        () => {
          this.updateIndicator();
        },
        { injector: this._injector },
      );
    });
  }

  /** Additional CSS classes */
  readonly class = input<string>('');
  /** Whether to show the animated indicator */
  readonly showIndicator = input<boolean>(false);
  /** Additional indicator CSS classes */
  readonly indicatorClass = input<string>('');

  private readonly _elementRef = inject(ElementRef);
  private readonly _injector = inject(Injector);

  protected readonly tabs = inject(TABS_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(
      'text-muted-foreground inline-flex h-9 w-fit items-center justify-center gap-1 rounded-lg bg-transparent p-1',
      this.class(),
    ),
  );
  protected readonly computedIndicatorClass = computed(() =>
    cn(
      'absolute inset-y-1 bg-background rounded-md shadow-sm transition-all duration-200',
      this.indicatorClass(),
    ),
  );

  /** Indicator position and size */
  protected readonly indicatorStyle = signal({ width: 0, left: 0 });

  onKeydown(event: KeyboardEvent): void {
    const tabValues = this.tabs.tabValues();
    if (tabValues.length === 0) return;

    const currentValue = this.tabs.value();
    const currentIndex = tabValues.indexOf(currentValue);
    const orientation = this.tabs.orientation();
    const activationMode = this.tabs.activationMode();

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
      if (typeof document === 'undefined') return;

      // Skip disabled tabs — scan in the movement direction
      const direction =
        event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'End' ? -1 : 1;
      newIndex = this.findEnabledIndex(tabValues, newIndex, direction);

      const newValue = tabValues[newIndex];

      // In automatic mode, activate on focus; in manual mode, just focus
      if (activationMode === 'automatic') {
        this.tabs.onValueChange(newValue);
      }

      // Focus the new tab
      const tabId = this.tabs.getTabId(newValue);
      const tabElement = document.getElementById(tabId);
      tabElement?.focus();
    }
  }

  private findEnabledIndex(tabValues: string[], startIndex: number, direction: 1 | -1): number {
    const length = tabValues.length;
    let index = startIndex;
    for (let i = 0; i < length; i++) {
      const tabId = this.tabs.getTabId(tabValues[index]);
      const el = typeof document !== 'undefined' ? document.getElementById(tabId) : null;
      if (!el?.hasAttribute('data-disabled')) return index;
      index = ((index + direction) + length) % length;
    }
    return startIndex;
  }

  private updateIndicator(): void {
    if (typeof document === 'undefined') return;
    const activeValue = this.tabs.value();
    if (!activeValue) return;

    const tabId = this.tabs.getTabId(activeValue);
    const tabElement = document.getElementById(tabId);
    const listElement = this._elementRef.nativeElement;

    if (tabElement && listElement) {
      const tabRect = tabElement.getBoundingClientRect();
      const listRect = listElement.getBoundingClientRect();

      this.indicatorStyle.set({
        width: tabRect.width,
        left: tabRect.left - listRect.left,
      });
    }
  }
}
