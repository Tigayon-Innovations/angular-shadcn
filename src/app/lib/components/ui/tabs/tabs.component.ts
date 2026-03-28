import { cn } from '@/lib/utils';
import { AriaIdService } from '@/lib/utils/accessibility';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { TABS_CONTEXT, TabsActivationMode, TabsContext, TabsOrientation } from './tabs-context';

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the Tabs component
 */
export interface TabsProps {
  /** The value of the tab that should be active when initially rendered.
   * Use when you do not need to control the state of the tabs. */
  defaultValue?: string;
  /** The controlled value of the tab to activate.
   * Should be used in conjunction with onValueChange. */
  value?: string;
  /** The orientation of the component.
   * @default 'horizontal' */
  orientation?: TabsOrientation;
  /** When automatic, tabs are activated upon focus.
   * When manual, tabs are activated upon click/Enter.
   * @default 'automatic' */
  activationMode?: TabsActivationMode;
  /** Additional CSS classes */
  class?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * @component Tabs
 *
 * A set of layered sections of content—known as tab panels—that are displayed
 * one at a time. Root container that manages tab state and provides context.
 *
 * @description
 * Tabs organize content into multiple sections and allow users to navigate
 * between them. The content under the set of tabs should be related and
 * form a coherent unit.
 *
 * ## Features
 * - Full keyboard navigation support
 * - Supports horizontal and vertical orientations
 * - Automatic (focus) or manual (click) activation modes
 * - Controlled and uncontrolled usage
 * - ARIA compliant tablist pattern
 * - Animated indicator support
 *
 * ## Accessibility
 * Implements the WAI-ARIA Tabs Pattern:
 * - `role="tablist"` on TabsList
 * - `role="tab"` on TabsTrigger
 * - `role="tabpanel"` on TabsContent
 * - Proper aria-selected, aria-controls, aria-labelledby relationships
 * - Roving tabindex for keyboard navigation
 *
 * ## Keyboard Navigation
 * When focus is on a TabsTrigger:
 * - `ArrowRight` - Move focus to next tab (horizontal) / activate in automatic mode
 * - `ArrowLeft` - Move focus to previous tab (horizontal) / activate in automatic mode
 * - `ArrowDown` - Move focus to next tab (vertical) / activate in automatic mode
 * - `ArrowUp` - Move focus to previous tab (vertical) / activate in automatic mode
 * - `Home` - Move focus to first tab
 * - `End` - Move focus to last tab
 * - `Enter` / `Space` - Activate focused tab (manual mode)
 *
 * @example Basic usage
 * ```html
 * <Tabs defaultValue="account" class="w-[400px]">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="password">Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">Account content</TabsContent>
 *   <TabsContent value="password">Password content</TabsContent>
 * </Tabs>
 * ```
 *
 * @example Vertical orientation
 * ```html
 * <Tabs defaultValue="tab1" orientation="vertical" class="flex">
 *   <TabsList class="flex-col h-auto">
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <div class="flex-1">
 *     <TabsContent value="tab1">Content 1</TabsContent>
 *     <TabsContent value="tab2">Content 2</TabsContent>
 *   </div>
 * </Tabs>
 * ```
 *
 * @example Manual activation
 * ```html
 * <Tabs defaultValue="tab1" activationMode="manual">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 *
 * @data-attributes
 * - `data-orientation` - 'horizontal' | 'vertical'
 */
@Component({
  selector: 'Tabs',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-orientation]': 'orientation()',
  },
  providers: [
    {
      provide: TABS_CONTEXT,
      useExisting: forwardRef(() => Tabs),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tabs implements TabsContext {
  private readonly ariaIdService = inject(AriaIdService);
  private readonly ariaIds = this.ariaIdService.generateTabIds('tabs');

  /** The value of the tab that should be active when initially rendered */
  readonly defaultValue = input<string>('');

  /** The controlled value of the tab to activate */
  readonly controlledValue = input<string | undefined>(undefined, { alias: 'value' });

  /** The orientation of the component */
  readonly orientation = input<TabsOrientation>('horizontal');

  /** When automatic, tabs are activated upon focus. When manual, upon click. */
  readonly activationMode = input<TabsActivationMode>('automatic');

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Event called when the value changes */
  readonly valueChange = output<string>();

  /** Internal state for the active tab value */
  private readonly _value = signal<string>('');

  /** ARIA IDs */
  readonly tablistId = this.ariaIds.tablistId;

  /** Registry of tab values for keyboard navigation */
  readonly tabValues = signal<string[]>([]);

  /** Generate tab ID for a specific value */
  getTabId = (value: string): string => `${this.tablistId}-tab-${value}`;

  /** Generate panel ID for a specific value */
  getPanelId = (value: string): string => `${this.tablistId}-panel-${value}`;

  constructor() {
    // Initialize with defaultValue, controlled value takes precedence
    effect(() => {
      const defaultVal = this.defaultValue();
      const controlled = this.controlledValue();

      if (controlled !== undefined) {
        this._value.set(controlled);
      } else if (defaultVal && !this._value()) {
        this._value.set(defaultVal);
      }
    });
  }

  /** Get the current active tab value */
  value = () => this.controlledValue() ?? this._value();

  /** Handle tab change */
  onValueChange = (newValue: string) => {
    if (this.controlledValue() === undefined) {
      this._value.set(newValue);
    }
    this.valueChange.emit(newValue);
  };

  protected readonly computedClass = computed(() => cn('flex flex-col gap-2', this.class()));
}
