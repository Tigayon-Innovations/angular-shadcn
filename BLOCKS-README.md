# Blocks Feature

A comprehensive collection of pre-built UI blocks and templates for rapid application development. Inspired by [shadcn/ui blocks](https://ui.shadcn.com/blocks) and [blocks.so](https://blocks.so/).

## Overview

Blocks are complete, ready-to-use UI components and page layouts that can be copied and pasted into your Angular application. Each block is:

- ✨ **Fully functional** - Works out of the box
- 🎨 **Beautifully designed** - Modern, clean aesthetics
- 📱 **Responsive** - Mobile-first design
- 🌗 **Theme-aware** - Supports light and dark modes
- ♿ **Accessible** - Built with accessibility in mind
- 🔧 **Customizable** - Easy to modify and extend

## Available Categories

### 🏢 Dashboard (1 block)
Complete dashboard layouts with sidebars, charts, and data tables.

- **Dashboard 01** - A full-featured dashboard with sidebar navigation, stat cards, and chart visualization

### 🧭 Sidebar (4 blocks)
Navigation sidebar components with various layouts and features.

- **Sidebar 01** - Collapsible sidebar with navigation and user profile
- **Sidebar 02** - Icon-only collapsible sidebar
- **Sidebar 03** - Sidebar with nested submenus
- **Sidebar 07** - Advanced sidebar that collapses to icons

### 🔐 Login (4 blocks)
Authentication forms and login pages.

- **Login 01** - Simple email/password login form
- **Login 02** - Login with social authentication options
- **Login 03** - Login with muted background
- **Login 04** - Split-screen login with image

### ✍️ Signup (2 blocks)
User registration and signup forms.

- **Signup 01** - Basic signup form with terms
- **Signup 02** - Signup with additional fields

### 🔢 OTP (2 blocks)
One-time password verification forms.

- **OTP 01** - 6-digit OTP input form
- **OTP 02** - OTP with resend functionality

### 📅 Calendar (1 block)
Calendar and scheduling components.

- **Calendar 01** - Event management calendar (Coming soon)

## Usage

### Browsing Blocks

Visit `/blocks` to browse all available blocks by category. Each block includes:
- Live preview
- Full source code
- Installation instructions
- Usage examples

### Installing a Block

```bash
# Using the CLI (coming soon)
npx shadcn-angular add dashboard-01

# Manual installation
# 1. Navigate to /blocks/dashboard/dashboard-01
# 2. Copy the component code
# 3. Paste into your project
# 4. Import and use
```

### Using a Block

```typescript
import { Dashboard01Component } from '@/blocks/dashboard-01';

@Component({
  selector: 'app-admin',
  imports: [Dashboard01Component],
  template: `
    <app-dashboard-01 />
  `,
})
export class AdminPage {}
```

## Architecture

### Directory Structure

```
src/app/
├── blocks/                    # Block components
│   ├── dashboard-01/
│   │   ├── dashboard-01.component.ts
│   │   └── index.ts
│   ├── sidebar-01/
│   ├── login-01/
│   ├── signup-01/
│   ├── otp-01/
│   └── index.ts
├── pages/blocks/              # Blocks pages
│   ├── layout.ts             # Layout wrapper
│   ├── blocks-list.ts        # All blocks listing
│   ├── category.ts           # Category view
│   ├── block-detail.ts       # Individual block detail
│   └── index.ts
└── services/
    └── blocks.service.ts      # Blocks data service
```

### Services

#### BlocksService

Manages block metadata and categories.

```typescript
interface Block {
  name: string;
  slug: string;
  description: string;
  category: string;
  image?: string;
  code?: string;
  featured?: boolean;
  componentPath?: string;
}

interface BlockCategory {
  name: string;
  slug: string;
  description: string;
  count: number;
}
```

**Methods:**
- `getBlocks()` - Get all blocks
- `getFeaturedBlocks()` - Get featured blocks only
- `getBlocksByCategory(category)` - Get blocks by category
- `getBlockBySlug(slug)` - Get a specific block
- `getCategories()` - Get all categories
- `getCategoryBySlug(slug)` - Get a specific category

## Routes

```typescript
/blocks                     // All blocks and categories
/blocks/:category          // Blocks in a specific category
/blocks/:category/:slug    // Individual block detail
```

## Creating New Blocks

### 1. Create the Component

```typescript
// src/app/blocks/my-block/my-block.component.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-block',
  imports: [],
  template: `
    <div class="p-6">
      <!-- Your block template -->
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBlockComponent {}
```

### 2. Export the Component

```typescript
// src/app/blocks/my-block/index.ts
export { MyBlockComponent } from './my-block.component';
```

### 3. Register in BlocksService

```typescript
// src/app/services/blocks.service.ts
{
  name: 'My Block',
  slug: 'my-block',
  description: 'A description of what this block does',
  category: 'category-slug',
  featured: true,
  componentPath: '@/blocks/my-block',
}
```

### 4. Update Category Count

```typescript
{
  name: 'Category Name',
  slug: 'category-slug',
  description: 'Category description',
  count: 3, // Increment this
}
```

## Styling Guidelines

All blocks follow these styling conventions:

- Use Tailwind CSS v4 utility classes
- Support light and dark themes via `bg-background`, `text-foreground`, etc.
- Use consistent spacing with Tailwind's spacing scale
- Include hover states and transitions
- Ensure responsive design with mobile-first approach

### Color Tokens

- `bg-background` - Main background
- `bg-card` - Card backgrounds
- `bg-muted` - Muted backgrounds
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `border` - Border color
- `primary` / `text-primary` - Primary accent color

## Best Practices

1. **Keep blocks self-contained** - Each block should work independently
2. **Use signals for state** - Follow Angular's modern patterns
3. **Include loading states** - Show placeholders where appropriate
4. **Handle empty states** - Provide feedback when no data is available
5. **Add proper ARIA labels** - Ensure accessibility
6. **Test responsive behavior** - Verify on multiple screen sizes
7. **Document usage** - Include clear examples and props

## Contributing

To add a new block:

1. Create the component in `src/app/blocks/`
2. Add metadata to `BlocksService`
3. Test across light/dark themes
4. Verify responsive behavior
5. Ensure accessibility
6. Update this README

## Future Enhancements

- [ ] CLI command for installing blocks
- [ ] Block variants (different color schemes)
- [ ] Block combinations (templates)
- [ ] Interactive customization
- [ ] Export to CodeSandbox/StackBlitz
- [ ] More block categories:
  - [ ] Forms
  - [ ] Tables
  - [ ] Modals
  - [ ] Navigation
  - [ ] Cards
  - [ ] Charts
  - [ ] E-commerce
  - [ ] Pricing

## Resources

- [shadcn/ui Blocks](https://ui.shadcn.com/blocks)
- [Blocks.so](https://blocks.so/)
- [ZardUI Blocks](https://zardui.com/blocks)
- [Tailwind CSS](https://tailwindcss.com/)
- [Angular Documentation](https://angular.dev/)

---

**Built with ❤️ for the Angular community**
