import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TABS_CONTEXT } from './tabs-context';

export type TabsTriggerState = 'active' | 'inactive';

/**
 * Props for the TabsTrigger component
 */
export interface TabsTriggerProps {
  /** A unique value that associates the trigger with a content */
  value: string;
  /** When true, prevents the user from interacting with the tab.
   * @default false */
  disabled?: boolean;
  /** Additional CSS classes */
  class?: string;
}

/**
 * @component TabsTrigger
 *
 * The button that activates its associated content.
 *
 * @description
 * TabsTrigger is the interactive element users click or focus to activate
 * a tab panel. It implements the tab role with proper ARIA attributes.
 *
 * ## Features
 * - Click activation
 * - Keyboard activation (Enter/Space)
 * - Disabled state support
 * - Roving tabindex for keyboard navigation
 * - Auto-registration with parent TabsList
 *
 * ## Accessibility
 * - `role="tab"` on the element
 * - `aria-selected` reflects active state
 * - `aria-controls` points to associated panel
 * - `tabindex` follows roving tabindex pattern (0 for active, -1 for inactive)
 * - `aria-disabled` when disabled
 *
 * @example Basic usage
 * ```html
 * <TabsTrigger value="account">Account</TabsTrigger>
 * ```
 *
 * @example Disabled trigger
 * ```html
 * <TabsTrigger value="settings" [disabled]="true">Settings</TabsTrigger>
 * ```
 *
 * @example With icon
 * ```html
 * <TabsTrigger value="account">
 *   <UserIcon class="size-4" />
 *   Account
 * </TabsTrigger>
 * ```
 *
 * @data-attributes
 * - `data-state` - 'active' | 'inactive'
 * - `data-disabled` - Present when disabled
 */
@Component({
  selector: 'TabsTrigger',
  template: `<ng-content />`,
  host: {
    'attr.data-slot': '"tabs-trigger"',
    '[class]': 'computedClass()',
    '[attr.id]': 'tabId()',
    '[attr.data-state]': 'state()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.aria-selected]': 'isActive()',
    '[attr.aria-controls]': 'panelId()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.tabindex]': 'isActive() ? 0 : -1',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onClick()',
    '(keydown.space)': 'onSpace($event)',
    role: 'tab',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsTrigger implements OnInit, OnDestroy {
  /** A unique value that associates the trigger with a content */
  readonly value = input.required<string>();

  /** When true, prevents the user from interacting with the tab */
  readonly disabled = input<boolean>(false);
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly tabs = inject(TABS_CONTEXT);

  /** Check if this tab is currently active */
  protected readonly isActive = computed(() => this.tabs.value() === this.value());
  /** Generate tab ID */
  protected readonly tabId = computed(() => this.tabs.getTabId(this.value()));
  /** Generate panel ID for aria-controls */
  protected readonly panelId = computed(() => this.tabs.getPanelId(this.value()));
  protected readonly computedClass = computed(() =>
    cn(
      'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border data-[state=active]:border-border data-[state=active]:shadow-sm',
      'data-[state=inactive]:hover:text-foreground',
      'cursor-pointer',
      this.disabled() && 'pointer-events-none opacity-50',
      this.class(),
    ),
  );

  /** Current state: active or inactive */
  protected readonly state = computed<TabsTriggerState>(() =>
    this.isActive() ? 'active' : 'inactive',
  );

  ngOnInit(): void {
    // Register this tab's value for keyboard navigation
    this.tabs.tabValues.update((values) => {
      if (!values.includes(this.value())) {
        return [...values, this.value()];
      }
      return values;
    });
  }
  ngOnDestroy(): void {
    // Unregister this tab's value
    this.tabs.tabValues.update((values) => values.filter((v) => v !== this.value()));
  }

  protected onClick(): void {
    if (!this.disabled()) {
      this.tabs.onValueChange(this.value());
    }
  }
  protected onSpace(event: Event): void {
    event.preventDefault();
    this.onClick();
  }
}
