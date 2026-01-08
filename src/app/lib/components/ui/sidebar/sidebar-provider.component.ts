import { cn } from '@/lib/utils';
import {
    afterNextRender,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    forwardRef,
    HostListener,
    input,
    model,
    output,
    signal,
} from '@angular/core';
import {
    SIDEBAR_CONTEXT,
    SIDEBAR_KEYBOARD_SHORTCUT,
    SIDEBAR_WIDTH,
    SIDEBAR_WIDTH_ICON,
    type SidebarContext,
    type SidebarState,
} from './sidebar-context';

/**
 * SidebarProvider component - provides sidebar context to children.
 *
 * @example
 * <SidebarProvider>
 *   <Sidebar>
 *     <SidebarHeader>...</SidebarHeader>
 *     <SidebarContent>...</SidebarContent>
 *     <SidebarFooter>...</SidebarFooter>
 *   </Sidebar>
 *   <SidebarInset>
 *     <!-- Main content -->
 *   </SidebarInset>
 * </SidebarProvider>
 */
@Component({
  selector: 'SidebarProvider',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    '[style.--sidebar-width]': 'sidebarWidth',
    '[style.--sidebar-width-icon]': 'SIDEBAR_WIDTH_ICON',
    '[attr.data-sidebar]': '"provider"',
  },
  providers: [
    {
      provide: SIDEBAR_CONTEXT,
      useFactory: (component: SidebarProvider) => component.context,
      deps: [forwardRef(() => SidebarProvider)],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarProvider {
  /** Default open state */
  readonly defaultOpen = input<boolean, unknown>(true, {
    transform: booleanAttribute,
  });

  /** Controlled open state */
  readonly open = model<boolean>(true);

  /** Open state change event */
  readonly openChange = output<boolean>();

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly SIDEBAR_WIDTH_ICON = SIDEBAR_WIDTH_ICON;
  protected readonly sidebarWidth = SIDEBAR_WIDTH;

  /** Context for child components */
  readonly context: SidebarContext = {
    state: signal<SidebarState>('expanded'),
    open: signal(this.defaultOpen()),
    setOpen: (value: boolean) => {
      this.context.open.set(value);
      this.context.state.set(value ? 'expanded' : 'collapsed');
      this.open.set(value);
      this.openChange.emit(value);
    },
    openMobile: signal(false),
    setOpenMobile: (value: boolean) => {
      this.context.openMobile.set(value);
    },
    isMobile: signal(false),
    toggleSidebar: () => {
      if (this.context.isMobile()) {
        this.context.setOpenMobile(!this.context.openMobile());
      } else {
        this.context.setOpen(!this.context.open());
      }
    },
  };

  constructor() {
    // Check for mobile on init (browser-only)
    afterNextRender(() => {
      this.checkMobile();
    });

    // Sync open state
    effect(() => {
      const openValue = this.open();
      this.context.open.set(openValue);
      this.context.state.set(openValue ? 'expanded' : 'collapsed');
    });
  }

  @HostListener('window:resize')
  protected onResize(): void {
    this.checkMobile();
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (
      event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
      (event.metaKey || event.ctrlKey)
    ) {
      event.preventDefault();
      this.context.toggleSidebar();
    }
  }

  private checkMobile(): void {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    this.context.isMobile.set(isMobile);
  }

  protected readonly computedClass = computed(() =>
    cn(
      'group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar',
      this.class()
    )
  );
}
