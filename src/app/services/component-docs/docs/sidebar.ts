/**
 * Sidebar Component Documentation
 * Comprehensive navigation sidebar with Provider, Header, Content, Footer, Groups, Menus, and sub-components.
 */

import type { ComponentDocumentation } from '../types';

export const SIDEBAR_DOCUMENTATION: ComponentDocumentation = {
  name: 'Sidebar',
  slug: 'sidebar',
  description:
    'A composable, accessible navigation sidebar component. Supports collapsible behavior, icon-only mode, mobile drawer, keyboard shortcut toggling, and a full set of layout sub-components for building complex navigation trees.',

  features: [
    { text: 'Full keyboard navigation with Tab, Arrow keys, and Ctrl+B shortcut.', highlight: true },
    { text: 'Collapsible via offcanvas, icon, or none modes.', highlight: true },
    { text: 'Mobile-responsive — collapses to a drawer on small screens.' },
    { text: 'Supports left and right placement.' },
    { text: 'Three visual variants: sidebar, floating, and inset.' },
    { text: 'Context-driven state shared across all sub-components.' },
    { text: 'Accessible: uses aside + nav landmarks with proper aria-label attributes.' },
    { text: 'SidebarRouteActiveService for declarative active-route detection.' },
  ],

  installation: {
    packageManager: {
      npm: 'npm install @ng-cn/sidebar',
      pnpm: 'pnpm add @ng-cn/sidebar',
      yarn: 'yarn add @ng-cn/sidebar',
      bun: 'bun add @ng-cn/sidebar',
    },
    ngAdd: 'ng g @ng-cn/core:c sidebar',
  },

  anatomy: {
    importStatement: `import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInset,
  SidebarRail,
  SidebarSeparator,
  SidebarInput,
  SidebarRouteActiveService,
} from '@/ui/sidebar';`,
    structure: `<SidebarProvider>
  <Sidebar>
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel />
        <SidebarGroupAction />
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton />
              <SidebarMenuAction />
              <SidebarMenuBadge />
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton />
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter />
    <SidebarRail />
  </Sidebar>
  <SidebarInset>
    <!-- Main page content -->
  </SidebarInset>
</SidebarProvider>`,
  },

  apiReference: [
    {
      name: 'Provider',
      description:
        'Root context provider. Wraps the entire sidebar layout and manages open/collapsed state, mobile detection, and keyboard shortcut handling (Ctrl+B). Must wrap both the Sidebar and the main content area.',
      props: [
        {
          name: 'open',
          type: 'boolean',
          default: 'true',
          description:
            'Controlled open state of the sidebar. Use with (openChange) for two-way binding.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'true',
          description:
            'Initial open state when uncontrolled. Accepts boolean attribute transforms.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the provider wrapper element.',
        },
      ],
      events: [
        {
          name: 'openChange',
          type: 'boolean',
          description: 'Emitted when the sidebar open state changes.',
        },
      ],
      dataAttributes: [
        {
          name: '[data-sidebar]',
          values: '"provider"',
        },
      ],
      cssVariables: [
        {
          name: '--sidebar-width',
          description: 'Width of the expanded sidebar (default: 16rem).',
        },
        {
          name: '--sidebar-width-icon',
          description: 'Width of the sidebar in icon-only collapsed mode (default: 3rem).',
        },
      ],
    },
    {
      name: 'Sidebar',
      description:
        'The main sidebar container element. Renders as an <aside> landmark with a nested <nav>. Automatically adapts between desktop (fixed panel) and mobile (drawer) layouts.',
      props: [
        {
          name: 'side',
          type: "'left' | 'right'",
          default: "'left'",
          description: 'Which side of the viewport the sidebar is anchored to.',
        },
        {
          name: 'variant',
          type: "'sidebar' | 'floating' | 'inset'",
          default: "'sidebar'",
          description:
            'Visual style of the sidebar. "floating" adds rounded corners and a shadow. "inset" offsets the main content area.',
        },
        {
          name: 'collapsible',
          type: "'offcanvas' | 'icon' | 'none'",
          default: "'offcanvas'",
          description:
            '"offcanvas" slides the sidebar fully off-screen. "icon" collapses it to show icons only. "none" disables collapsing.',
        },
        {
          name: 'ariaLabel',
          type: 'string',
          default: "'Sidebar'",
          description: 'Accessible label applied to the <aside> landmark element.',
        },
        {
          name: 'navLabel',
          type: 'string',
          default: "'Main navigation'",
          description: 'Accessible label applied to the inner <nav> element.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the sidebar.',
        },
      ],
      dataAttributes: [
        { name: '[data-state]', values: '"expanded" | "collapsed"' },
        { name: '[data-collapsible]', values: '"offcanvas" | "icon" | ""' },
        { name: '[data-variant]', values: '"sidebar" | "floating" | "inset"' },
        { name: '[data-side]', values: '"left" | "right"' },
      ],
    },
    {
      name: 'SidebarTrigger',
      description:
        'A button that toggles the sidebar open/collapsed state. Uses the sidebar context to call toggleSidebar(). Renders a panel icon with a screen-reader-only label.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the trigger button.',
        },
      ],
    },
    {
      name: 'SidebarHeader',
      description: 'Header section at the top of the sidebar. Typically contains a logo or app name.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the header.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"header"' }],
    },
    {
      name: 'SidebarContent',
      description:
        'Scrollable main content area of the sidebar. Grows to fill available vertical space. Overflow is hidden in icon-only collapsed mode.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the content wrapper.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"content"' }],
    },
    {
      name: 'SidebarFooter',
      description:
        'Footer section at the bottom of the sidebar. Useful for user profiles, settings, or logout actions.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the footer.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"footer"' }],
    },
    {
      name: 'SidebarGroup',
      description:
        'A logical grouping container for sidebar menu items. Use multiple groups to organize navigation sections.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the group.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"group"' }],
    },
    {
      name: 'SidebarGroupLabel',
      description:
        'Label displayed above a sidebar group. Fades out and collapses in icon-only mode.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the label.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"group-label"' }],
    },
    {
      name: 'SidebarGroupAction',
      description:
        'An optional action button rendered to the right of a group label. Hidden when sidebar is in icon-only collapsed mode.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the group action.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"group-action"' }],
    },
    {
      name: 'SidebarGroupContent',
      description: 'Content wrapper inside a SidebarGroup. Applies full-width text sizing.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the group content.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"group-content"' }],
    },
    {
      name: 'SidebarMenu',
      description:
        'Semantic menu container with role="menu". Wraps a vertical list of SidebarMenuItem elements.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the menu.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"menu"' }],
    },
    {
      name: 'SidebarMenuItem',
      description:
        'An individual menu item wrapper with role="presentation". Provides the relative positioning context for SidebarMenuAction and SidebarMenuBadge.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the menu item.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"menu-item"' }],
    },
    {
      name: 'SidebarMenuButton',
      description:
        'The interactive button inside a SidebarMenuItem. Supports active state, size variants, and aria-current for accessible route indication. In icon-only mode it shrinks to a square.',
      props: [
        {
          name: 'isActive',
          type: 'boolean',
          default: 'false',
          description:
            'Marks this button as the currently active item. Applies accent background and aria-current.',
        },
        {
          name: 'size',
          type: "'default' | 'sm' | 'lg'",
          default: "'default'",
          description: 'Size variant of the button.',
        },
        {
          name: 'ariaCurrent',
          type: "'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'",
          default: "'page'",
          description: 'The value of aria-current to set when isActive is true.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the button.',
        },
      ],
      dataAttributes: [
        { name: '[data-size]', values: '"default" | "sm" | "lg"' },
        { name: '[data-active]', values: 'Present when isActive is true' },
      ],
    },
    {
      name: 'SidebarMenuAction',
      description:
        'An action button rendered at the trailing edge of a menu item (e.g., a "..." more options button). Can optionally be hidden until hover.',
      props: [
        {
          name: 'showOnHover',
          type: 'boolean',
          default: 'false',
          description:
            'When true, the action is only visible when the parent menu item is hovered or focused.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the action.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"menu-action"' }],
    },
    {
      name: 'SidebarMenuBadge',
      description:
        'A numeric or text badge overlaid on the trailing side of a menu item. Inherits color from the parent button active state. Hidden in icon-only mode.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the badge.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"menu-badge"' }],
    },
    {
      name: 'SidebarMenuSkeleton',
      description:
        'A loading skeleton placeholder for menu items. Renders a shimmer bar with a randomized width.',
      props: [
        {
          name: 'showIcon',
          type: 'boolean',
          default: 'false',
          description: 'When true, also renders an icon-sized skeleton on the left.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the skeleton row.',
        },
      ],
    },
    {
      name: 'SidebarMenuSub',
      description:
        'A nested sub-menu list indented beneath a parent menu item with a vertical left border. Hidden entirely in icon-only collapsed mode.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the sub-menu container.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"menu-sub"' }],
    },
    {
      name: 'SidebarMenuSubItem',
      description: 'An item within a SidebarMenuSub.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the sub-item.',
        },
      ],
    },
    {
      name: 'SidebarMenuSubButton',
      description:
        'The interactive button inside a SidebarMenuSubItem. Mirrors SidebarMenuButton API but uses a smaller height and sm/md size variants.',
      props: [
        {
          name: 'isActive',
          type: 'boolean',
          default: 'false',
          description: 'Marks this sub-button as the currently active route.',
        },
        {
          name: 'size',
          type: "'sm' | 'md'",
          default: "'md'",
          description: 'Size variant of the sub-button.',
        },
        {
          name: 'ariaCurrent',
          type: "'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'",
          default: "'page'",
          description: 'The value of aria-current to set when isActive is true.',
        },
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the sub-button.',
        },
      ],
      dataAttributes: [
        { name: '[data-size]', values: '"sm" | "md"' },
        { name: '[data-active]', values: 'Present when isActive is true' },
      ],
    },
    {
      name: 'SidebarInset',
      description:
        'The main content area that sits alongside the sidebar. Adapts its margin and border radius when the sidebar variant is "inset".',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the inset container.',
        },
      ],
    },
    {
      name: 'SidebarRail',
      description:
        'A thin clickable strip along the sidebar edge that acts as an alternate collapse/expand trigger. Shows a hover indicator and changes the cursor based on sidebar state.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the rail.',
        },
      ],
    },
    {
      name: 'SidebarSeparator',
      description: 'A horizontal divider line styled to match the sidebar color scheme.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the separator.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"separator"' }],
    },
    {
      name: 'SidebarInput',
      description:
        'A search/filter input styled for the sidebar. Removes the default shadow and applies a sidebar ring focus style.',
      props: [
        {
          name: 'class',
          type: 'string',
          description: 'Additional CSS classes to apply to the input.',
        },
      ],
      dataAttributes: [{ name: '[data-sidebar]', values: '"input"' }],
    },
    {
      name: 'SidebarRouteActiveService',
      description:
        'Injectable service that tracks the current Angular router URL and exposes helper methods to determine active menu items.',
      props: [
        {
          name: 'currentRoute',
          type: 'Signal<string>',
          description: 'Reactive signal containing the current router URL.',
        },
      ],
      notes: [
        'isRouteActive(route, exact?) — returns true if the current route starts with (or exactly matches) the given path.',
        'isAnyRouteActive(routes[], exact?) — returns true if any of the given routes is active.',
        'getMainRoute() — returns the first path segment (e.g. "/dashboard").',
        'getRouteLevel() — returns the number of path segments.',
      ],
    },
  ],

  examples: [
    {
      title: 'Basic Sidebar',
      description: 'A minimal sidebar layout with header, content, and footer sections.',
      hasDemo: true,
      code: `<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <span class="font-semibold text-sm px-2">My App</span>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton [isActive]="true">
                <svg ...></svg>
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <svg ...></svg>
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <span class="text-xs text-muted-foreground px-2">v1.0.0</span>
    </SidebarFooter>
  </Sidebar>

  <SidebarInset>
    <header class="flex items-center gap-2 p-4 border-b">
      <SidebarTrigger />
      <h1 class="font-semibold">Dashboard</h1>
    </header>
    <main class="p-4">Page content goes here</main>
  </SidebarInset>
</SidebarProvider>`,
    },
    {
      title: 'With Navigation Links',
      description:
        'A sidebar with router-aware navigation links using SidebarRouteActiveService to highlight the active route.',
      code: `// In your component:
readonly routeActive = inject(SidebarRouteActiveService);

readonly navItems = [
  { title: 'Home',      href: '/home',      icon: HomeIcon },
  { title: 'Analytics', href: '/analytics', icon: BarChartIcon },
  { title: 'Users',     href: '/users',     icon: UsersIcon },
  { title: 'Settings',  href: '/settings',  icon: SettingsIcon },
];

// In your template:
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <div class="flex items-center gap-2 px-2 py-1">
        <img src="/logo.svg" class="size-6" alt="Logo" />
        <span class="font-semibold">Acme Inc</span>
      </div>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            @for (item of navItems; track item.href) {
              <SidebarMenuItem>
                <SidebarMenuButton
                  [routerLink]="item.href"
                  [isActive]="routeActive.isRouteActive(item.href)"
                >
                  <lucide-icon [img]="item.icon" class="size-4" />
                  <span>{{ item.title }}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            }
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>

  <SidebarInset>
    <header class="flex items-center gap-2 p-4 border-b">
      <SidebarTrigger />
      <Breadcrumb>...</Breadcrumb>
    </header>
    <router-outlet />
  </SidebarInset>
</SidebarProvider>`,
    },
    {
      title: 'Collapsible to Icon Mode',
      description:
        'Use collapsible="icon" to collapse the sidebar to icon-only width. Menu labels and group labels fade out; buttons shrink to squares.',
      code: `<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <!-- Icon is always visible; span hides in icon mode -->
              <SidebarMenuButton>
                <lucide-icon [img]="HomeIcon" />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <lucide-icon [img]="SettingsIcon" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <!-- Rail provides a hover-to-expand toggle strip -->
    <SidebarRail />
  </Sidebar>

  <SidebarInset>
    <header class="flex items-center gap-2 p-4">
      <SidebarTrigger />
    </header>
    <main class="p-4">Content area</main>
  </SidebarInset>
</SidebarProvider>`,
    },
    {
      title: 'With Sub-menus',
      description:
        'Nest SidebarMenuSub inside a SidebarMenuItem to create collapsible sub-navigation trees.',
      code: `<SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton>
      <lucide-icon [img]="FolderIcon" />
      <span>Projects</span>
    </SidebarMenuButton>
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton [isActive]="true">
          Alpha
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton>
          Beta
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  </SidebarMenuItem>
</SidebarMenu>`,
    },
    {
      title: 'With Action Buttons and Badges',
      description:
        'Add a SidebarMenuAction for contextual actions and a SidebarMenuBadge for notification counts.',
      code: `<SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton>
      <lucide-icon [img]="InboxIcon" />
      <span>Inbox</span>
    </SidebarMenuButton>

    <!-- Badge shows unread count; hidden in icon mode -->
    <SidebarMenuBadge>12</SidebarMenuBadge>

    <!-- Action visible only on hover -->
    <SidebarMenuAction [showOnHover]="true">
      <lucide-icon [img]="MoreHorizontalIcon" class="size-4" />
      <span class="sr-only">More options</span>
    </SidebarMenuAction>
  </SidebarMenuItem>
</SidebarMenu>`,
    },
    {
      title: 'Controlled Open State',
      description:
        'Control the sidebar open/closed state externally using the open input and openChange output.',
      code: `// In your component:
readonly sidebarOpen = signal(true);

// In your template:
<SidebarProvider
  [open]="sidebarOpen()"
  (openChange)="sidebarOpen.set($event)"
>
  <Sidebar>...</Sidebar>
  <SidebarInset>
    <Button (click)="sidebarOpen.set(!sidebarOpen())">
      Toggle Sidebar
    </Button>
  </SidebarInset>
</SidebarProvider>`,
    },
    {
      title: 'Loading Skeleton',
      description:
        'Display skeleton placeholders while navigation data is loading using SidebarMenuSkeleton.',
      code: `<SidebarMenu>
  @if (isLoading()) {
    @for (i of [1, 2, 3, 4, 5]; track i) {
      <SidebarMenuItem>
        <SidebarMenuSkeleton [showIcon]="true" />
      </SidebarMenuItem>
    }
  } @else {
    @for (item of navItems(); track item.href) {
      <SidebarMenuItem>
        <SidebarMenuButton>
          <span>{{ item.title }}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    }
  }
</SidebarMenu>`,
    },
  ],

  accessibility: {
    ariaPattern: 'Navigation Landmark (WAI-ARIA)',
    ariaPatternUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html',
    keyboardInteractions: [
      {
        key: 'Ctrl + B',
        description:
          'Toggles the sidebar open or collapsed from anywhere on the page (handled by SidebarProvider).',
      },
      {
        key: 'Tab',
        description: 'Moves focus through SidebarTrigger, SidebarMenuButton, and SidebarMenuAction elements in document order.',
      },
      {
        key: 'Shift + Tab',
        description: 'Moves focus backwards through focusable sidebar elements.',
      },
      {
        key: 'Enter / Space',
        description: 'Activates the focused SidebarMenuButton, SidebarMenuAction, SidebarTrigger, or SidebarRail.',
      },
      {
        key: 'ArrowDown',
        description: 'Moves focus to the next menu item within a SidebarMenu.',
      },
      {
        key: 'ArrowUp',
        description: 'Moves focus to the previous menu item within a SidebarMenu.',
      },
      {
        key: 'Home',
        description: 'Moves focus to the first menu item within a SidebarMenu.',
      },
      {
        key: 'End',
        description: 'Moves focus to the last menu item within a SidebarMenu.',
      },
      {
        key: 'Escape',
        description:
          'On mobile, closes the sidebar drawer and returns focus to the trigger.',
      },
    ],
    ariaAttributes: [
      {
        name: 'role="complementary"',
        description: 'Applied to the <aside> element to identify it as a complementary landmark.',
      },
      {
        name: 'aria-label',
        description: 'Identifies the <aside> and <nav> landmarks for screen readers. Configurable via ariaLabel and navLabel inputs.',
      },
      {
        name: 'aria-hidden',
        description: 'Set to true on the sidebar when it is fully offcanvas-collapsed so screen readers skip its content.',
      },
      {
        name: 'aria-current',
        description: 'Set on SidebarMenuButton and SidebarMenuSubButton when isActive is true. Defaults to "page" to indicate the current page link.',
      },
      {
        name: 'role="menu"',
        description: 'Applied to SidebarMenu to semantically identify the navigation list.',
      },
      {
        name: 'role="presentation"',
        description: 'Applied to SidebarMenuItem to mark it as a layout wrapper rather than an interactive element.',
      },
    ],
  },

  links: [
    {
      text: 'View source',
      url: 'https://github.com/example/shadcn-angular/tree/main/src/app/lib/components/ui/sidebar',
      icon: 'source',
    },
    {
      text: 'Report an issue',
      url: 'https://github.com/example/shadcn-angular/issues/new',
      icon: 'issue',
    },
    {
      text: 'Navigation Landmark ARIA pattern',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html',
      icon: 'docs',
    },
  ],
};
