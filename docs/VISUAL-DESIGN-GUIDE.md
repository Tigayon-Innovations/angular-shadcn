# Visual Design Guide for shadcn-angular Documentation

## Overview

This guide outlines the visual hierarchy, spacing system, and design patterns used throughout the shadcn-angular documentation site to create a polished, professional developer experience.

## Typography Hierarchy

### Page Titles
- **Class**: `text-4xl font-bold tracking-tight lg:text-5xl`
- **Usage**: Main page headings (H1)
- **Spacing**: `pb-8 pt-6 md:pb-10` below header

### Section Headings
- **Class**: `text-3xl font-semibold tracking-tight border-b pb-2`
- **Usage**: Major section dividers (H2)
- **Spacing**: `space-y-16` between sections

### Subsection Headings
- **Class**: `text-xl font-semibold`
- **Usage**: Component examples, step titles (H3)
- **Spacing**: `space-y-6` within sections

### Body Text
- **Class**: `text-base leading-7` or `text-muted-foreground`
- **Usage**: Descriptions and explanatory text
- **Line Height**: Generous (`leading-7` or `leading-relaxed`)

## Spacing System

### Section Spacing
```
space-y-16  →  Major sections
space-y-10  →  Medium sections  
space-y-6   →  Subsections
space-y-4   →  Related content
space-y-3   →  Tight groupings
```

### Container Padding
```
p-8   →  Large blocks (success messages, callouts)
p-6   →  Cards and bordered containers
p-4   →  Alert boxes and info blocks
p-3   →  Tight content areas
```

### Navigation Margins
```
pt-12 mt-12  →  Navigation footer
pb-8 pt-6    →  Page header
```

## Component Patterns

### 1. Feature Cards (Introduction Page)
```tsx
<div class="group relative rounded-lg border bg-card p-6 hover:bg-accent transition-colors">
  <div class="space-y-3">
    <div class="flex items-center gap-3">
      <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
        {/* Icon */}
      </div>
      <h3 class="text-xl font-semibold">Title</h3>
    </div>
    <p class="text-sm text-muted-foreground leading-relaxed">
      Description
    </p>
  </div>
</div>
```

### 2. Numbered Steps (Installation Page)
```tsx
<div class="flex items-start gap-4">
  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-primary">
    1
  </div>
  <div class="space-y-2 flex-1">
    <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">
      Step Title
    </h2>
    <p class="text-muted-foreground">
      Description
    </p>
  </div>
</div>
<div class="pl-14">
  {/* Step content */}
</div>
```

### 3. Callout Blocks

#### Info Block (Blue)
```tsx
<div class="rounded-lg border bg-blue-500/10 border-blue-500/20 p-4 flex items-start gap-3">
  <svg class="text-blue-600 dark:text-blue-500 shrink-0 mt-0.5">
    {/* Info icon */}
  </svg>
  <div class="text-sm">
    <p class="font-medium text-blue-900 dark:text-blue-200">Title</p>
    <p class="text-blue-800 dark:text-blue-300 mt-1">Content</p>
  </div>
</div>
```

#### Warning Block (Amber)
```tsx
<div class="rounded-lg border bg-amber-500/10 border-amber-500/20 p-4 flex items-start gap-3">
  <svg class="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5">
    {/* Warning icon */}
  </svg>
  <div class="text-sm">
    <p class="font-medium text-amber-900 dark:text-amber-200">Important</p>
    <p class="text-amber-800 dark:text-amber-300 mt-1">Content</p>
  </div>
</div>
```

#### Success Block (Primary Gradient)
```tsx
<div class="rounded-lg border bg-gradient-to-br from-primary/10 to-primary/5 p-8">
  <div class="space-y-4 text-center">
    <div class="flex justify-center">
      <div class="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
        {/* Success icon */}
      </div>
    </div>
    <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">
      Success Message
    </h2>
    <p class="text-muted-foreground max-w-2xl mx-auto">
      Description
    </p>
  </div>
</div>
```

### 4. Component Cards (Components List)
```tsx
<Card class="h-full transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/50">
  <CardHeader class="space-y-3">
    <CardTitle class="flex items-center justify-between text-xl">
      <span>Component Name</span>
      <lucide-icon class="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
    </CardTitle>
    <CardDescription class="leading-relaxed">Description</CardDescription>
  </CardHeader>
</Card>
```

### 5. Empty States
```tsx
<div class="rounded-lg border bg-muted/50 p-12 text-center">
  <div class="flex justify-center mb-4">
    <div class="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
      {/* Icon */}
    </div>
  </div>
  <h3 class="text-lg font-semibold mb-2">Title</h3>
  <p class="text-muted-foreground">
    Description
  </p>
</div>
```

## Interactive Elements

### Hover States
- **Cards**: `hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/50`
- **Feature Blocks**: `hover:bg-accent transition-colors`
- **Icons**: `opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1`

### Tab Lists
- **Wrapper**: `inline-flex flex-wrap h-auto gap-2`
- **Triggers**: Include badges with counts
- **Content**: Use `mt-0` for immediate display

### Search Input
- **Height**: `h-12`
- **Icon Position**: `left-4 top-1/2 -translate-y-1/2`
- **Padding**: `pl-12`
- **Container**: `max-w-2xl`

## Navigation Footer

### Pattern
```tsx
<div class="flex items-center justify-between pt-12 mt-12 border-t">
  <Button variant="outline" class="gap-2">
    <lucide-icon class="h-4 w-4" />
    <span class="hidden sm:inline">Previous</span>
  </Button>
  <Button variant="outline" class="gap-2">
    <span class="hidden sm:inline">Next</span>
    <lucide-icon class="h-4 w-4" />
  </Button>
</div>
```

### Responsive Text
- Hide text on mobile: `hidden sm:inline`
- Keep icons visible at all sizes

## Color Semantics

### Backgrounds
- **Primary Content**: `bg-card`
- **Secondary Content**: `bg-muted/50`
- **Accent Areas**: `bg-primary/10`
- **Gradients**: `bg-gradient-to-br from-primary/10 to-primary/5`

### Borders
- **Default**: `border` (uses theme color)
- **Hover**: `hover:border-primary/50`
- **Semantic**: 
  - Info: `border-blue-500/20`
  - Warning: `border-amber-500/20`

### Text
- **Primary**: Default text color
- **Muted**: `text-muted-foreground`
- **Semantic**:
  - Info (Light): `text-blue-900`, Info (Dark): `text-blue-200`
  - Warning (Light): `text-amber-900`, Warning (Dark): `text-amber-200`

## Accessibility

### Semantic HTML
- Use `<article>` for main content
- Use `<section>` with `scroll-mt-20` for anchor links
- Include `id` attributes on major sections

### Focus States
- Rely on Tailwind's default focus rings
- Ensure sufficient contrast ratios
- Test keyboard navigation

### ARIA Labels
- Search inputs should have descriptive placeholders
- Icon buttons need aria-labels
- Cards should be keyboard accessible via native link elements

## Grid Systems

### Components List
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

### Feature Cards
```
grid gap-6 md:grid-cols-2
```

### Code Display
```
grid grid-cols-2 md:grid-cols-3 gap-2
```

## Best Practices

1. **Consistency**: Use the same patterns across all documentation pages
2. **Progressive Enhancement**: Start mobile-first, enhance for larger screens
3. **Visual Rhythm**: Maintain consistent spacing between elements
4. **Scanability**: Use clear headings and visual breaks
5. **Whitespace**: Don't overcrowd—let content breathe
6. **Performance**: Use CSS transitions, not JavaScript animations
7. **Dark Mode**: Test all colors and contrasts in both themes
8. **Typography Scale**: Follow the hierarchy strictly for predictable layouts

## Theme Integration

All components automatically support light/dark themes through CSS variables:
- Design once, theme-aware by default
- Use semantic color names (`primary`, `muted`, etc.)
- Avoid hardcoded colors
- Test extensively in dark mode
