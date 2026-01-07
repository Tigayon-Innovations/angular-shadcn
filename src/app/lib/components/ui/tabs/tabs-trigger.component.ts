import { cn } from '@/lib/utils';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { TABS_CONTEXT } from './tabs-context';

/**
 * TabsTrigger component - clickable tab button.
 * Provides proper ARIA tab role and keyboard support.
 *
 * @example
 * <TabsTrigger value="account">Account</TabsTrigger>
 */
@Component({
  selector: 'TabsTrigger',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[attr.id]': 'tabId()',
    '[attr.data-state]': 'isActive() ? "active" : "inactive"',
    '[attr.aria-selected]': 'isActive()',
    '[attr.aria-controls]': 'panelId()',
    '[attr.tabindex]': 'isActive() ? 0 : -1',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onClick()',
    '(keydown.space)': 'onSpace($event)',
    'role': 'tab',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsTrigger implements OnInit, OnDestroy {
  protected readonly tabs = inject(TABS_CONTEXT);

  /** The value that identifies this tab */
  readonly value = input.required<string>();

  /** Whether this trigger is disabled */
  readonly disabled = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Check if this tab is currently active */
  protected readonly isActive = computed(() => this.tabs.value() === this.value());

  /** Generate tab ID */
  protected readonly tabId = computed(() => this.tabs.getTabId(this.value()));

  /** Generate panel ID for aria-controls */
  protected readonly panelId = computed(() => this.tabs.getPanelId(this.value()));

  protected readonly computedClass = computed(() =>
    cn(
      'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ring-offset-background transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      'data-[state=inactive]:hover:text-foreground/80',
      'cursor-pointer',
      this.class()
    )
  );

  ngOnInit(): void {
    // Register this tab's value for keyboard navigation
    this.tabs.tabValues.update(values => {
      if (!values.includes(this.value())) {
        return [...values, this.value()];
      }
      return values;
    });
  }

  ngOnDestroy(): void {
    // Unregister this tab's value
    this.tabs.tabValues.update(values =>
      values.filter(v => v !== this.value())
    );
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
