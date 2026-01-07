# Sidebar Accessibility Guide

## Overview

The shadcn-angular sidebar components have been enhanced to provide highly accessible navigation with full support for active states, hover feedback, and keyboard navigation following Radix UI and shadcn/ui patterns.

## Features

### 1. Active State Indication

The sidebar supports accessible active state indication using `aria-current` attribute, which is the semantic way to indicate the current page/location in navigation.

#### Using `aria-current`

```typescript
<SidebarMenuButton 
  [isActive]="currentPage() === 'dashboard'"
  [ariaCurrent]="'page'"
>
  <svg><!-- icon --></svg>
  <span>Dashboard</span>
</SidebarMenuButton>
```

**Available `aria-current` values:**
- `'page'` - Current page in a website or application (default)
- `'step'` - Current step in a multi-step process
- `'location'` - Current location in a browsed environment
- `'date'` - Current date in a calendar
- `'time'` - Current time in a timetable
- `'true'` - Generic current item
- `'false'` - Item is not current

### 2. Hover States

All interactive sidebar components provide visual feedback on hover:

- **Color change**: Text and background colors transition smoothly
- **Duration**: 150ms for smooth, non-jarring transitions
- **Focus-visible**: Enhanced ring styling for keyboard navigation
- **Smooth transitions**: Using `ease-linear` for consistent behavior

### 3. Visual Indicators

#### Active Menu Item
```typescript
<SidebarMenuItem>
  <SidebarMenuButton 
    [isActive]="isActive()"
  >
    <!-- Content -->
  </SidebarMenuButton>
</SidebarMenuItem>
```

The active state provides:
- Background color change (`bg-sidebar-accent`)
- Text color change (`text-sidebar-accent-foreground`)
- Medium font weight
- Subtle shadow for depth

#### Badge Updates
```typescript
<SidebarMenuButton [isActive]="isActive()">
  <svg><!-- icon --></svg>
  <span>Notifications</span>
  <SidebarMenuBadge>5</SidebarMenuBadge>
</SidebarMenuButton>
```

Badges automatically inherit the active/hover color from the parent button.

### 4. Keyboard Navigation

The sidebar provides full keyboard support:

- **Tab/Shift+Tab**: Navigate between items
- **Enter/Space**: Activate menu items
- **Focus visible**: Clear ring indicator on focus (offset by 2px)
- **Cmd/Ctrl+B**: Toggle sidebar (default keyboard shortcut)

### 5. Screen Reader Support

#### Menu Structure
```typescript
<SidebarMenu>
  <!-- role="menu" is applied automatically -->
  <SidebarMenuItem>
    <!-- role="presentation" is applied automatically -->
    <SidebarMenuButton 
      [isActive]="currentPage === 'home'"
      [ariaCurrent]="'page'"
    >
      Home
    </SidebarMenuButton>
  </SidebarMenuItem>
</SidebarMenu>
```

**ARIA Roles Applied:**
- `role="menu"` on `SidebarMenu`
- `role="presentation"` on `SidebarMenuItem`
- `role="button"` on `SidebarMenuAction`

**ARIA Attributes:**
- `aria-current` on active `SidebarMenuButton`
- `aria-disabled` on disabled buttons

### 6. Size Variants

All button components support size variants for different contexts:

```typescript
// Default size
<SidebarMenuButton size="default">Text</SidebarMenuButton>

// Small size (text-xs)
<SidebarMenuButton size="sm">Text</SidebarMenuButton>

// Large size (text-sm)
<SidebarMenuButton size="lg">Text</SidebarMenuButton>
```

### 7. Submenu Support

Sub-items follow the same accessibility patterns:

```typescript
<SidebarMenuSub>
  <SidebarMenuSubItem>
    <SidebarMenuSubButton 
      [isActive]="isCurrentSubPage()"
      [ariaCurrent]="'page'"
    >
      Sub Item
    </SidebarMenuSubButton>
  </SidebarMenuSubItem>
</SidebarMenuSub>
```

## Complete Example

```typescript
import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/lib/components/ui/sidebar';

@Component({
  selector: 'app-sidebar-example',
  template: `
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div class="font-bold text-lg">MyApp</div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                @for (item of menuItems(); track item.id) {
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      [isActive]="currentPage() === item.id"
                      [ariaCurrent]="currentPage() === item.id ? 'page' : 'false'"
                      (click)="navigateTo(item.id)"
                    >
                      <span>{{ item.icon }}</span>
                      <span>{{ item.label }}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <main class="flex-1">
        <!-- Content -->
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
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
  ],
})
export class SidebarExampleComponent {
  currentPage = signal<string>('dashboard');

  menuItems = signal([
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'reports', label: 'Reports', icon: '📄' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]);

  constructor(private router: Router) {}

  navigateTo(page: string): void {
    this.currentPage.set(page);
    this.router.navigate([`/${page}`]);
  }
}
```

## CSS Classes Reference

### Hover State Classes
- `hover:bg-sidebar-accent` - Background color on hover
- `hover:text-sidebar-accent-foreground` - Text color on hover
- `duration-150` - Animation duration
- `ease-linear` - Linear transition easing

### Active State Classes
- `data-[active]:bg-sidebar-accent` - Active background
- `data-[active]:text-sidebar-accent-foreground` - Active text color
- `data-[active]:font-medium` - Medium weight on active
- `data-[active]:shadow-sm` - Subtle shadow on active

### Focus State Classes
- `focus-visible:ring-2` - Focus ring
- `focus-visible:ring-sidebar-ring` - Ring color
- `focus-visible:ring-offset-2` - Ring offset

## Testing Accessibility

### Keyboard Navigation Test
1. Tab through sidebar items
2. Verify focus ring is visible
3. Press Enter to activate items
4. Use arrow keys to navigate (if supported)

### Screen Reader Test
1. Enable screen reader (macOS: VoiceOver, Windows: NVDA, JAWS)
2. Navigate to sidebar
3. Verify:
   - Menu structure is announced correctly
   - Active state is announced as "aria-current page"
   - All buttons are announced with their labels
   - Icons are properly hidden (`aria-hidden` if decorative)

### Color Contrast
- Verify WCAG AA contrast ratio (4.5:1 for text)
- Test with different color schemes
- Verify hover/active states maintain contrast

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Patterns

- [Radix UI Navigation Menu](https://www.radix-ui.com/primitives/docs/components/navigation-menu)
- [shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/sidebar)
- [WAI-ARIA Navigation Landmark](https://www.w3.org/WAI/ARIA/apg/patterns/navigation/)
