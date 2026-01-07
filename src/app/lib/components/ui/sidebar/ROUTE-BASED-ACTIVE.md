# Sidebar Route-Based Active State Guide

## Overview

The sidebar now integrates seamlessly with Angular routing to automatically highlight the current page in the navigation menu. Use the `SidebarRouteActiveService` to determine which menu items should be marked as active based on the current route.

## Quick Start

### Basic Usage with Service

```typescript
import { Component, inject, computed } from '@angular/core';
import { SidebarRouteActiveService } from '@/lib/components/ui/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/lib/components/ui/sidebar';

@Component({
  selector: 'app-sidebar',
  template: `
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    [isActive]="routeService.isRouteActive('dashboard')"
                    [ariaCurrent]="routeService.isRouteActive('dashboard') ? 'page' : 'false'"
                  >
                    <svg><!-- icon --></svg>
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    [isActive]="routeService.isRouteActive('analytics')"
                    [ariaCurrent]="routeService.isRouteActive('analytics') ? 'page' : 'false'"
                  >
                    <svg><!-- icon --></svg>
                    <span>Analytics</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    [isActive]="routeService.isRouteActive('settings')"
                    [ariaCurrent]="routeService.isRouteActive('settings') ? 'page' : 'false'"
                  >
                    <svg><!-- icon --></svg>
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <main class="flex-1">
        <router-outlet />
      </main>
    </SidebarProvider>
  `,
  standalone: true,
  imports: [
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
  ],
})
export class AppSidebarComponent {
  protected readonly routeService = inject(SidebarRouteActiveService);
}
```

## Visual States

### Hover State (Lighter - Subtle)
```
┌──────────────────┐
│ Dashboard        │  ← Light background (50% opacity)
└──────────────────┘  ← Smooth transition (150ms)
```

### Active State (Prominent - Rounded Pill)
```
┌──────────────────┐
│ Dashboard        │  ← Full color background
└──────────────────┘  ← Rounded pill appearance (rounded-lg)
                      ← Medium shadow
                      ← Medium font weight
```

## Service Methods

### `isRouteActive(route: string, exact?: boolean): boolean`

Check if a route is currently active.

```typescript
// Partial match (default) - activates for route and all subroutes
routeService.isRouteActive('dashboard') // true for '/dashboard' or '/dashboard/details'

// Exact match - only activates for exact route
routeService.isRouteActive('dashboard', true) // true only for '/dashboard'
```

### `isAnyRouteActive(routes: string[], exact?: boolean): boolean`

Check if any of multiple routes is active.

```typescript
// Active if on dashboard OR analytics
routeService.isAnyRouteActive(['dashboard', 'analytics'])

// Active only if exactly on one of these routes
routeService.isAnyRouteActive(['dashboard', 'analytics'], true)
```

### `getMainRoute(): string`

Get the primary route segment.

```typescript
// If current route is '/dashboard/details/overview'
routeService.getMainRoute() // returns '/dashboard'
```

### `getRouteLevel(): number`

Get the nesting depth of the current route.

```typescript
// If current route is '/dashboard/details/overview'
routeService.getRouteLevel() // returns 3
```

### `currentRoute: Signal<string>`

Observable signal of the current route.

```typescript
// React to route changes
computed(() => {
  const route = routeService.currentRoute();
  // Do something with route
})
```

## Real-World Examples

### 1. Dynamic Menu from Configuration

```typescript
import { Component, inject, signal } from '@angular/core';
import { SidebarRouteActiveService } from '@/lib/components/ui/sidebar';
import { SidebarMenuButton, SidebarMenuItem } from '@/lib/components/ui/sidebar';

interface MenuItem {
  id: string;
  label: string;
  route: string;
  icon: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-menu',
  template: `
    @for (item of menuItems(); track item.id) {
      <SidebarMenuItem>
        <SidebarMenuButton
          [isActive]="routeService.isRouteActive(item.route)"
          [ariaCurrent]="routeService.isRouteActive(item.route) ? 'page' : 'false'"
          (click)="navigateTo(item.route)"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </SidebarMenuButton>

        @if (item.children && isExpanded(item.id)) {
          <SidebarMenuSub>
            @for (child of item.children; track child.id) {
              <SidebarMenuSubItem>
                <SidebarMenuSubButton
                  [isActive]="routeService.isRouteActive(child.route)"
                  [ariaCurrent]="routeService.isRouteActive(child.route) ? 'page' : 'false'"
                >
                  {{ child.label }}
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            }
          </SidebarMenuSub>
        }
      </SidebarMenuItem>
    }
  `,
  standalone: true,
})
export class MenuComponent {
  protected readonly routeService = inject(SidebarRouteActiveService);
  private readonly router = inject(Router);

  menuItems = signal<MenuItem[]>([
    {
      id: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
      icon: '📊',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      route: 'analytics',
      icon: '📈',
      children: [
        { id: 'overview', label: 'Overview', route: 'analytics/overview', icon: '👁️' },
        { id: 'reports', label: 'Reports', route: 'analytics/reports', icon: '📄' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      route: 'settings',
      icon: '⚙️',
    },
  ]);

  isExpanded(itemId: string): boolean {
    // Expand if any child is active
    const item = this.menuItems().find(m => m.id === itemId);
    if (!item?.children) return false;
    return item.children.some(child =>
      this.routeService.isRouteActive(child.route)
    );
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
```

### 2. Submenu with Route Matching

```typescript
<SidebarMenuItem>
  <SidebarMenuButton
    [isActive]="routeService.isAnyRouteActive(['analytics', 'reports'])"
    [ariaCurrent]="routeService.isAnyRouteActive(['analytics', 'reports']) ? 'page' : 'false'"
  >
    <AnalyticsIcon />
    <span>Analytics</span>
  </SidebarMenuButton>

  @if (isAnalyticsOpen()) {
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          [isActive]="routeService.isRouteActive('analytics/overview')"
          [ariaCurrent]="routeService.isRouteActive('analytics/overview') ? 'page' : 'false'"
        >
          Overview
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>

      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          [isActive]="routeService.isRouteActive('analytics/reports')"
          [ariaCurrent]="routeService.isRouteActive('analytics/reports') ? 'page' : 'false'"
        >
          Reports
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  }
</SidebarMenuItem>

<!-- In component class: -->
isAnalyticsOpen = computed(() =>
  this.routeService.isAnyRouteActive(['analytics', 'reports'])
);
```

### 3. With Badges and Actions

```typescript
<SidebarMenuItem>
  <SidebarMenuButton
    [isActive]="routeService.isRouteActive('notifications')"
    [ariaCurrent]="routeService.isRouteActive('notifications') ? 'page' : 'false'"
  >
    <BellIcon />
    <span>Notifications</span>
    <SidebarMenuBadge>{{ unreadCount() }}</SidebarMenuBadge>
  </SidebarMenuButton>

  <SidebarMenuAction [showOnHover]="true">
    <MoreIcon />
  </SidebarMenuAction>
</SidebarMenuItem>
```

### 4. Route-Based Icons

```typescript
<SidebarMenuButton
  [isActive]="routeService.isRouteActive('dashboard')"
  [ariaCurrent]="routeService.isRouteActive('dashboard') ? 'page' : 'false'"
>
  @if (routeService.isRouteActive('dashboard')) {
    <DashboardFilledIcon />
  } @else {
    <DashboardOutlineIcon />
  }
  <span>Dashboard</span>
</SidebarMenuButton>
```

## CSS Classes Reference

### Hover State (Lighter)
```css
hover:bg-sidebar-accent/50  /* 50% opacity - subtle */
duration-150                 /* Smooth transition */
ease-linear                  /* Linear easing */
```

### Active State (Prominent)
```css
data-[active]:bg-sidebar-accent              /* Full color */
data-[active]:text-sidebar-accent-foreground /* Contrasting text */
data-[active]:font-medium                    /* Medium weight */
data-[active]:shadow-md                      /* Medium shadow */
data-[active]:rounded-lg                     /* Rounded pill */
```

## Testing Your Routes

```typescript
// In your test file
describe('SidebarRouteActiveService', () => {
  let service: SidebarRouteActiveService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarRouteActiveService],
    });
    service = TestBed.inject(SidebarRouteActiveService);
    router = TestBed.inject(Router);
  });

  it('should detect active route', () => {
    router.navigateByUrl('/dashboard');
    expect(service.isRouteActive('dashboard')).toBe(true);
  });

  it('should support partial matching', () => {
    router.navigateByUrl('/dashboard/details');
    expect(service.isRouteActive('dashboard')).toBe(true);
  });

  it('should support exact matching', () => {
    router.navigateByUrl('/dashboard/details');
    expect(service.isRouteActive('dashboard', true)).toBe(false);
    expect(service.isRouteActive('dashboard/details', true)).toBe(true);
  });
});
```

## Common Patterns

### Lazy-Loaded Modules

```typescript
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.routes').then(m => m.ANALYTICS_ROUTES),
  },
];

// Service works automatically with lazy-loaded routes!
// Just use: routeService.isRouteActive('analytics')
```

### Protected Routes

```typescript
// If you have route guards, the active detection still works
const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.routes'),
  },
];

// Active state updates even with guards
routeService.isRouteActive('admin')
```

### Feature Module Routes

```typescript
// In feature module routes
export const FEATURE_ROUTES: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
  },
];

// Parent route
const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.routes').then(r => r.FEATURE_ROUTES),
  },
];

// Detect active feature routes
routeService.isRouteActive('user/profile')     // true for both /user/profile and /user/profile/edit
routeService.isRouteActive('user/profile', true) // true only for /user/profile
```

## Accessibility Considerations

✅ **Screen Reader Announcements**
```typescript
// Always set aria-current based on active state
[ariaCurrent]="routeService.isRouteActive(route) ? 'page' : 'false'"
```

✅ **Keyboard Navigation**
```typescript
// Tab through menu items
// Focus ring shows which item is focused
// Current page is announced as "aria-current page"
```

✅ **Skip to Content**
```html
<a href="#main-content" class="sr-only">Skip to main content</a>

<SidebarProvider>
  <Sidebar><!-- menu --></Sidebar>
  <main id="main-content"><!-- content --></main>
</SidebarProvider>
```

## Troubleshooting

### Routes Not Updating

**Problem:** Active state doesn't change when navigating.

**Solution:** Ensure you're using the service from a component:
```typescript
// ✅ Correct
protected readonly routeService = inject(SidebarRouteActiveService);

// ❌ Wrong - won't update
const service = new SidebarRouteActiveService();
```

### Submenu Not Opening

**Problem:** Submenu doesn't expand when child route is active.

**Solution:** Use `isAnyRouteActive()` for parent items:
```typescript
// ✅ Correct - expands if any child is active
[isActive]="routeService.isAnyRouteActive(['analytics/overview', 'analytics/reports'])"

// ❌ Wrong - won't expand for children
[isActive]="routeService.isRouteActive('analytics')"
```

### Case Sensitivity

**Problem:** Routes don't match due to case differences.

**Solution:** Service normalizes routes to lowercase:
```typescript
routeService.isRouteActive('Dashboard') // Works - normalized to lowercase
routeService.isRouteActive('DASHBOARD') // Works - normalized to lowercase
```

## Performance Tips

1. **Use `computed()`** for derived active states:
   ```typescript
   isDashboardActive = computed(() =>
     this.routeService.isRouteActive('dashboard')
   );
   ```

2. **Cache service reference**:
   ```typescript
   protected readonly routeService = inject(SidebarRouteActiveService);
   // Reuse throughout template
   ```

3. **Avoid repeated lookups**:
   ```typescript
   // ❌ Bad - recalculates every change detection
   [isActive]="routeService.isRouteActive(item.route)"
   
   // ✅ Better - computed once
   isActive = computed(() =>
     this.routeService.isRouteActive(this.item.route)
   );
   ```

## API Reference

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for full accessibility documentation and [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) for component API reference.
