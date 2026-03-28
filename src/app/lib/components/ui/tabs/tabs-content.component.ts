import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TABS_CONTEXT } from './tabs-context';

export type TabsContentState = 'active' | 'inactive';

/**
 * Props for the TabsContent component
 */
export interface TabsContentProps {
  /** A unique value that associates the content with a trigger */
  value: string;
  /** Used to force mounting when more control is needed.
   * Useful when controlling animation with CSS animation libraries.
   * @default false */
  forceMount?: boolean;
  /** Additional CSS classes */
  class?: string;
}

/**
 * @component TabsContent
 *
 * Contains the content associated with each trigger.
 *
 * @description
 * TabsContent holds the content for each tab panel. It is shown when its
 * associated TabsTrigger is activated.
 *
 * ## Features
 * - Conditional rendering (unmounts when inactive by default)
 * - Force mount option for animation control
 * - Proper ARIA tabpanel role
 * - Focusable when active
 *
 * ## Accessibility
 * - `role="tabpanel"` on the element
 * - `aria-labelledby` points to associated trigger
 * - `hidden` attribute when inactive
 * - `tabindex="0"` when active for keyboard access
 *
 * @example Basic usage
 * ```html
 * <TabsContent value="account">
 *   <p>Account settings content here</p>
 * </TabsContent>
 * ```
 *
 * @example Force mounted (for animations)
 * ```html
 * <TabsContent value="account" [forceMount]="true">
 *   <p>Content stays in DOM even when inactive</p>
 * </TabsContent>
 * ```
 *
 * @data-attributes
 * - `data-state` - 'active' | 'inactive'
 * - `data-orientation` - Inherited from parent Tabs
 */
@Component({
  selector: 'TabsContent',
  template: `
    @if (shouldRender()) {
      <ng-content />
    }
  `,
  host: {
    '[class]': 'computedClass()',
    '[attr.id]': 'panelId()',
    '[attr.data-state]': 'state()',
    '[attr.data-orientation]': 'tabs.orientation()',
    '[attr.aria-labelledby]': 'tabId()',
    '[attr.hidden]': '!isActive() ? true : null',
    '[attr.tabindex]': 'isActive() ? 0 : -1',
    role: 'tabpanel',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsContent {
  /** A unique value that associates the content with a trigger */
  readonly value = input.required<string>();

  /** Used to force mounting when more control is needed */
  readonly forceMount = input<boolean>(false);
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly tabs = inject(TABS_CONTEXT);

  /** Check if this content should be visible */
  protected readonly isActive = computed(() => this.tabs.value() === this.value());
  /** Current state: active or inactive */
  protected readonly state = computed<TabsContentState>(() =>
    this.isActive() ? 'active' : 'inactive',
  );
  /** Whether content should be rendered (force mount or active) */
  protected readonly shouldRender = computed(() => this.forceMount() || this.isActive());
  /** Generate panel ID */
  protected readonly panelId = computed(() => this.tabs.getPanelId(this.value()));
  /** Generate tab ID for aria-labelledby */
  protected readonly tabId = computed(() => this.tabs.getTabId(this.value()));
  protected readonly computedClass = computed(() =>
    cn(
      'flex-1 outline-none',
      'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'mt-2',
      this.class(),
    ),
  );
}
