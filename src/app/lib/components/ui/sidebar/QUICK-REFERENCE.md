# Sidebar Quick Reference

## Basic Menu Setup

```typescript
import { Component, signal } from '@angular/core';
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
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    [isActive]="isActive('dashboard')"
                    [ariaCurrent]="'page'"
                  >
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
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
  isActive(page: string): boolean {
    // Your logic to determine active page
    return true;
  }
}
```

## With Icons and Badges

```typescript
<SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton 
      [isActive]="activeTab() === 'notifications'"
      [ariaCurrent]="activeTab() === 'notifications' ? 'page' : 'false'"
    >
      <svg><!-- Your icon SVG --></svg>
      <span>Notifications</span>
      <SidebarMenuBadge>3</SidebarMenuBadge>
    </SidebarMenuButton>
  </SidebarMenuItem>
</SidebarMenu>
```

## With Action Buttons

```typescript
<SidebarMenuItem>
  <SidebarMenuButton 
    [isActive]="activeTab() === 'projects'"
    [ariaCurrent]="'page'"
  >
    <svg><!-- Icon --></svg>
    <span>Projects</span>
    <SidebarMenuAction [showOnHover]="true">
      <svg><!-- More icon --></svg>
    </SidebarMenuAction>
  </SidebarMenuButton>
</SidebarMenuItem>
```

## Submenu Example

```typescript
<SidebarMenuItem>
  <SidebarMenuButton 
    [isActive]="isGroupActive('docs')"
    [ariaCurrent]="isGroupActive('docs') ? 'page' : 'false'"
  >
    <span>Documentation</span>
  </SidebarMenuButton>
  
  @if (docsOpen()) {
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton 
          [isActive]="activeTab() === 'api'"
          [ariaCurrent]="activeTab() === 'api' ? 'page' : 'false'"
        >
          <span>API Reference</span>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
      
      <SidebarMenuSubItem>
        <SidebarMenuSubButton 
          [isActive]="activeTab() === 'guides'"
          [ariaCurrent]="activeTab() === 'guides' ? 'page' : 'false'"
        >
          <span>Guides</span>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  }
</SidebarMenuItem>
```

## Multiple Groups

```typescript
<SidebarContent>
  <!-- Main Navigation -->
  <SidebarGroup>
    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton 
            [isActive]="activeTab() === 'home'"
            [ariaCurrent]="'page'"
          >
            <span>Home</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>

  <!-- Settings -->
  <SidebarGroup>
    <SidebarGroupLabel>Settings</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton 
            [isActive]="activeTab() === 'settings'"
            [ariaCurrent]="'page'"
          >
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</SidebarContent>
```

## Size Variants

```typescript
<!-- Small -->
<SidebarMenuButton 
  size="sm"
  [isActive]="isActive('item')"
  [ariaCurrent]="'page'"
>
  Small Item
</SidebarMenuButton>

<!-- Default (most common) -->
<SidebarMenuButton 
  size="default"
  [isActive]="isActive('item')"
  [ariaCurrent]="'page'"
>
  Default Item
</SidebarMenuButton>

<!-- Large -->
<SidebarMenuButton 
  size="lg"
  [isActive]="isActive('item')"
  [ariaCurrent]="'page'"
>
  Large Item
</SidebarMenuButton>
```

## With Router Integration

```typescript
import { Router } from '@angular/router';
import { signal } from '@angular/core';

export class AppSidebarComponent {
  currentRoute = signal('/dashboard');
  
  constructor(private router: Router) {
    // Subscribe to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: any) => event.url)
    ).subscribe(url => {
      this.currentRoute.set(url);
    });
  }

  isActive(page: string): boolean {
    return this.currentRoute().includes(page);
  }

  navigateTo(page: string): void {
    this.router.navigate([page]);
  }
}
```

## Template with Router

```typescript
<SidebarMenu>
  @for (item of menuItems(); track item.id) {
    <SidebarMenuItem>
      <SidebarMenuButton
        [isActive]="currentRoute().includes(item.route)"
        [ariaCurrent]="currentRoute().includes(item.route) ? 'page' : 'false'"
        (click)="navigateTo(item.route)"
      >
        <span>{{ item.label }}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  }
</SidebarMenu>
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` / `Shift+Tab` | Navigate between items |
| `Enter` / `Space` | Activate menu item |
| `Cmd+B` (Mac) / `Ctrl+B` (Windows/Linux) | Toggle sidebar |
| `Escape` | Close mobile sidebar |

## ARIA Current Values

```typescript
// Current page (most common for navigation)
[ariaCurrent]="'page'"

// Current step in a process
[ariaCurrent]="'step'"

// Current location in a navigated environment
[ariaCurrent]="'location'"

// Current date in a calendar
[ariaCurrent]="'date'"

// Current time in a timetable
[ariaCurrent]="'time'"

// Generic - explicitly set as current
[ariaCurrent]="'true'"

// Not current
[ariaCurrent]="'false'"
```

## Accessibility Checklist

- [ ] Each menu item has `[isActive]` binding
- [ ] Active items have `[ariaCurrent]="'page'"`
- [ ] Menu structure is semantic (SidebarMenu, SidebarMenuItem)
- [ ] Icons are decorative with `aria-hidden="true"` if needed
- [ ] Focus ring is visible on keyboard navigation
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] All interactive items are keyboard accessible
- [ ] Screen reader announces active state

## Common Patterns

### Dynamic Menu from Array

```typescript
menuItems = signal([
  { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '/dashboard' },
  { id: 'analytics', label: 'Analytics', icon: '📈', route: '/analytics' },
  { id: 'settings', label: 'Settings', icon: '⚙️', route: '/settings' },
]);

// In template:
@for (item of menuItems(); track item.id) {
  <SidebarMenuItem>
    <SidebarMenuButton
      [isActive]="activeTab() === item.id"
      [ariaCurrent]="activeTab() === item.id ? 'page' : 'false'"
      (click)="navigateTo(item.id)"
    >
      <span>{{ item.label }}</span>
    </SidebarMenuButton>
  </SidebarMenuItem>
}
```

### Conditional Submenu Display

```typescript
@if (expandedGroup() === 'docs') {
  <SidebarMenuSub>
    @for (subItem of docSubItems(); track subItem.id) {
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          [isActive]="activeTab() === subItem.id"
          [ariaCurrent]="activeTab() === subItem.id ? 'page' : 'false'"
        >
          {{ subItem.label }}
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    }
  </SidebarMenuSub>
}
```

### With Icon Components

```typescript
import { SvgIconComponent } from '@angular/material/icon'; // or your icon library

<SidebarMenuButton
  [isActive]="isActive('dashboard')"
  [ariaCurrent]="'page'"
>
  <mat-icon>dashboard</mat-icon>
  <span>Dashboard</span>
</SidebarMenuButton>
```

## Styling Customization

### Change Active Color

```scss
// In your global styles or component
:root {
  --sidebar-accent: hsl(210, 100%, 50%); // Your color
  --sidebar-accent-foreground: hsl(0, 0%, 100%);
}
```

### Change Hover Transition Duration

```typescript
// In your component style
:host ::ng-deep {
  [data-sidebar="menu-button"] {
    transition-duration: 200ms; // Change from 150ms
  }
}
```

## TypeScript Imports

```typescript
// Main components
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuAction,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/lib/components/ui/sidebar';

// Types
import type { 
  AriaCurrentValue,
  SidebarState,
  SidebarVariant,
} from '@/lib/components/ui/sidebar';

// Context
import { SIDEBAR_CONTEXT } from '@/lib/components/ui/sidebar';
```

---

**For more detailed information, see [ACCESSIBILITY.md](./ACCESSIBILITY.md) and [ENHANCEMENTS.md](./ENHANCEMENTS.md)**
