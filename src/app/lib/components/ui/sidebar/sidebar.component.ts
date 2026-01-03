import { cn } from '@/lib/utils';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  HostListener,
  inject,
  input,
  model,
  output,
  signal
} from '@angular/core';
import {
  SIDEBAR_CONTEXT,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  type SidebarCollapsible,
  type SidebarContext,
  type SidebarSide,
  type SidebarState,
  type SidebarVariant,
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
    // Check for mobile on init and resize
    this.checkMobile();

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

/**
 * Sidebar component - the main sidebar container.
 */
@Component({
  selector: 'Sidebar',
  template: `
    @if (context.isMobile()) {
      <!-- Mobile: Sheet-style sidebar -->
      @if (context.openMobile()) {
        <div
          class="fixed inset-0 z-50 bg-black/80"
          (click)="context.setOpenMobile(false)"
        ></div>
        <aside [class]="computedMobileClass()">
          <ng-content />
        </aside>
      }
    } @else {
      <!-- Desktop sidebar -->
      <div [class]="computedGapClass()" [attr.data-side]="side()"></div>
      <aside [class]="computedClass()">
        <div [attr.data-sidebar]="'sidebar'" [class]="computedInnerClass()">
          <ng-content />
        </div>
      </aside>
    }
  `,
  host: {
    '[attr.data-state]': 'context.state()',
    '[attr.data-collapsible]':
      'context.state() === "collapsed" ? collapsible() : ""',
    '[attr.data-variant]': 'variant()',
    '[attr.data-side]': 'side()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  protected readonly context = inject(SIDEBAR_CONTEXT);

  /** Side of the screen */
  readonly side = input<SidebarSide>('left');

  /** Variant style */
  readonly variant = input<SidebarVariant>('sidebar');

  /** Collapsible behavior */
  readonly collapsible = input<SidebarCollapsible>('offcanvas');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedGapClass = computed(() =>
    cn(
      'duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear',
      'group-data-[collapsible=offcanvas]/sidebar-wrapper:w-0',
      'group-data-[side=right]/sidebar-wrapper:rotate-180',
      this.variant() === 'floating' || this.variant() === 'inset'
        ? 'group-data-[collapsible=icon]/sidebar-wrapper:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
        : 'group-data-[collapsible=icon]/sidebar-wrapper:w-[--sidebar-width-icon]'
    )
  );

  protected readonly computedClass = computed(() =>
    cn(
      'duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex',
      this.side() === 'left'
        ? 'left-0 group-data-[collapsible=offcanvas]/sidebar-wrapper:left-[calc(var(--sidebar-width)*-1)]'
        : 'right-0 group-data-[collapsible=offcanvas]/sidebar-wrapper:right-[calc(var(--sidebar-width)*-1)]',
      this.variant() === 'floating' || this.variant() === 'inset'
        ? 'p-2 group-data-[collapsible=icon]/sidebar-wrapper:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
        : 'group-data-[collapsible=icon]/sidebar-wrapper:w-[--sidebar-width-icon] group-data-[side=left]/sidebar-wrapper:border-r group-data-[side=right]/sidebar-wrapper:border-l',
      this.class()
    )
  );

  protected readonly computedInnerClass = computed(() =>
    cn(
      'flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]/sidebar-wrapper:rounded-lg group-data-[variant=floating]/sidebar-wrapper:border group-data-[variant=floating]/sidebar-wrapper:border-sidebar-border group-data-[variant=floating]/sidebar-wrapper:shadow'
    )
  );

  protected readonly computedMobileClass = computed(() =>
    cn(
      'fixed inset-y-0 z-50 flex h-full w-[--sidebar-width] flex-col bg-sidebar p-0 text-sidebar-foreground',
      this.side() === 'left'
        ? 'left-0 animate-in slide-in-from-left'
        : 'right-0 animate-in slide-in-from-right',
      this.class()
    )
  );
}

/**
 * SidebarTrigger component - button to toggle the sidebar.
 */
@Component({
  selector: 'SidebarTrigger',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
    </svg>
    <span class="sr-only">Toggle Sidebar</span>
    <ng-content />
  `,
  host: {
    '[class]': 'computedClass()',
    '(click)': 'onClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarTrigger {
  protected readonly context = inject(SIDEBAR_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'inline-flex h-7 w-7 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      this.class()
    )
  );

  protected onClick(): void {
    this.context.toggleSidebar();
  }
}

/**
 * SidebarRail component - visual indicator for collapsible sidebar.
 */
@Component({
  selector: 'SidebarRail',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-label]': '"Toggle Sidebar"',
    '[attr.tabindex]': '-1',
    '[title]': '"Toggle Sidebar"',
    '(click)': 'onClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarRail {
  protected readonly context = inject(SIDEBAR_CONTEXT);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]/sidebar-wrapper:right-0 group-data-[side=right]/sidebar-wrapper:left-0 sm:flex',
      '[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize',
      '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
      'group-data-[collapsible=offcanvas]/sidebar-wrapper:translate-x-0 group-data-[collapsible=offcanvas]/sidebar-wrapper:after:left-full group-data-[collapsible=offcanvas]/sidebar-wrapper:hover:bg-sidebar',
      '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
      '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
      this.class()
    )
  );

  protected onClick(): void {
    this.context.toggleSidebar();
  }
}

/**
 * SidebarInset component - main content area next to sidebar.
 */
@Component({
  selector: 'SidebarInset',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarInset {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'relative flex min-h-svh flex-1 flex-col bg-background',
      'peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow',
      this.class()
    )
  );
}

/**
 * SidebarInput component - input field for sidebar.
 */
@Component({
  selector: 'SidebarInput',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'input',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarInput {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
      this.class()
    )
  );
}

/**
 * SidebarHeader component - header section of sidebar.
 */
@Component({
  selector: 'SidebarHeader',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'header',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarHeader {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex flex-col gap-2 p-2', this.class())
  );
}

/**
 * SidebarFooter component - footer section of sidebar.
 */
@Component({
  selector: 'SidebarFooter',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'footer',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFooter {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex flex-col gap-2 p-2', this.class())
  );
}

/**
 * SidebarSeparator component - separator line in sidebar.
 */
@Component({
  selector: 'SidebarSeparator',
  template: ``,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'separator',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarSeparator {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('mx-2 w-auto bg-sidebar-border', this.class())
  );
}

/**
 * SidebarContent component - main content area of sidebar.
 */
@Component({
  selector: 'SidebarContent',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'content',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarContent {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]/sidebar-wrapper:overflow-hidden',
      this.class()
    )
  );
}

/**
 * SidebarGroup component - groups sidebar items.
 */
@Component({
  selector: 'SidebarGroup',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'group',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarGroup {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('relative flex w-full min-w-0 flex-col p-2', this.class())
  );
}

/**
 * SidebarGroupLabel component - label for a sidebar group.
 */
@Component({
  selector: 'SidebarGroupLabel',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'group-label',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarGroupLabel {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      'group-data-[collapsible=icon]/sidebar-wrapper:-mt-8 group-data-[collapsible=icon]/sidebar-wrapper:opacity-0',
      this.class()
    )
  );
}

/**
 * SidebarGroupAction component - action button for a sidebar group.
 */
@Component({
  selector: 'SidebarGroupAction',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'group-action',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarGroupAction {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      'after:absolute after:-inset-2 after:md:hidden',
      'group-data-[collapsible=icon]/sidebar-wrapper:hidden',
      this.class()
    )
  );
}

/**
 * SidebarGroupContent component - content wrapper for sidebar group.
 */
@Component({
  selector: 'SidebarGroupContent',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'group-content',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarGroupContent {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('w-full text-sm', this.class())
  );
}

/**
 * SidebarMenu component - menu container in sidebar.
 */
@Component({
  selector: 'SidebarMenu',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenu {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex w-full min-w-0 flex-col gap-1', this.class())
  );
}

/**
 * SidebarMenuItem component - individual menu item.
 */
@Component({
  selector: 'SidebarMenuItem',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuItem {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('group/menu-item relative', this.class())
  );
}

/**
 * SidebarMenuButton component - button in menu item.
 */
@Component({
  selector: 'SidebarMenuButton',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-button',
    '[attr.data-size]': 'size()',
    '[attr.data-active]': 'isActive() ? "" : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuButton {
  /** Whether this button is active */
  readonly isActive = input<boolean>(false);

  /** Size variant */
  readonly size = input<'default' | 'sm' | 'lg'>('default');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active]:bg-sidebar-accent data-[active]:font-medium data-[active]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]/sidebar-wrapper:!size-8 group-data-[collapsible=icon]/sidebar-wrapper:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
      this.size() === 'sm' && 'text-xs',
      this.size() === 'lg' && 'text-sm group-data-[collapsible=icon]/sidebar-wrapper:!p-0',
      this.class()
    )
  );
}

/**
 * SidebarMenuAction component - action button in menu item.
 */
@Component({
  selector: 'SidebarMenuAction',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-action',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuAction {
  /** Whether to show on hover only */
  readonly showOnHover = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
      'after:absolute after:-inset-2 after:md:hidden',
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]/sidebar-wrapper:hidden',
      this.showOnHover() &&
        'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0',
      this.class()
    )
  );
}

/**
 * SidebarMenuBadge component - badge in menu item.
 */
@Component({
  selector: 'SidebarMenuBadge',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-badge',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuBadge {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none',
      'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]/sidebar-wrapper:hidden',
      this.class()
    )
  );
}

/**
 * SidebarMenuSkeleton component - loading skeleton for menu items.
 */
@Component({
  selector: 'SidebarMenuSkeleton',
  template: `
    <div
      [style.width.%]="width"
      class="h-4 max-w-[--skeleton-width] flex-1 rounded-md bg-sidebar-accent"
    ></div>
  `,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-skeleton',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuSkeleton {
  /** Width of the skeleton */
  readonly width = Math.floor(Math.random() * 40) + 50;

  /** Whether to show icon skeleton */
  readonly showIcon = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'rounded-md h-8 flex gap-2 px-2 items-center',
      this.class()
    )
  );
}

/**
 * SidebarMenuSub component - submenu container.
 */
@Component({
  selector: 'SidebarMenuSub',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-sub',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuSub {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5',
      'group-data-[collapsible=icon]/sidebar-wrapper:hidden',
      this.class()
    )
  );
}

/**
 * SidebarMenuSubItem component - item in submenu.
 */
@Component({
  selector: 'SidebarMenuSubItem',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuSubItem {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => cn(this.class()));
}

/**
 * SidebarMenuSubButton component - button in submenu item.
 */
@Component({
  selector: 'SidebarMenuSubButton',
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClass()',
    'data-sidebar': 'menu-sub-button',
    '[attr.data-size]': 'size()',
    '[attr.data-active]': 'isActive() ? "" : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuSubButton {
  /** Whether this button is active */
  readonly isActive = input<boolean>(false);

  /** Size variant */
  readonly size = input<'sm' | 'md'>('md');

  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
      this.size() === 'sm' && 'text-xs',
      this.size() === 'md' && 'text-sm',
      this.isActive() && 'bg-sidebar-accent text-sidebar-accent-foreground',
      this.class()
    )
  );
}
