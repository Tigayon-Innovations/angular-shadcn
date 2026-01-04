# shadcn-angular Documentation Guide

Welcome to the shadcn-angular documentation system. This directory contains comprehensive guides for creating, maintaining, and improving the project's documentation.

## 📚 Documentation Files

### [VISUAL-DESIGN-GUIDE.md](./VISUAL-DESIGN-GUIDE.md)
Complete visual design system for documentation pages including:
- Typography hierarchy and spacing
- Component patterns (cards, callouts, steps)
- Color semantics and theming
- Interactive states and animations
- Grid systems and layouts
- Best practices for visual consistency

**Use this when**: Designing new doc pages or updating existing layouts

### [COMPONENT-DOCS-STANDARDS.md](./COMPONENT-DOCS-STANDARDS.md)
Standards for documenting individual components:
- Component page structure
- Writing style guidelines
- Code example formats
- API reference documentation
- Accessibility documentation
- Review checklist

**Use this when**: Creating or updating component documentation

### [CODE-BLOCK-DESIGN.md](./CODE-BLOCK-DESIGN.md)
Complete design system for code blocks:
- Visual specifications
- Syntax highlighting
- Interactive features (copy, highlight, etc.)
- Accessibility considerations
- Performance optimization
- Future enhancements

**Use this when**: Implementing or improving code display features

### [CONTENT-GUIDELINES.md](./CONTENT-GUIDELINES.md)
Writing and content standards:
- Writing style and tone
- Content structure and organization
- Formatting guidelines
- Technical accuracy requirements
- SEO best practices
- Maintenance procedures

**Use this when**: Writing or editing any documentation content

### [PRD.md](./PRD.md)
Product Requirements Document defining:
- Project goals and scope
- Component specifications
- Technical requirements
- Packaging strategy
- Integration guidelines

**Use this when**: Understanding project requirements and architecture decisions

### [TASKS.md](./TASKS.md)
Project task tracking and roadmap:
- Current sprint tasks
- Backlog items
- Known issues
- Future enhancements

**Use this when**: Planning work or tracking progress

## 🎨 Visual Design System

### Key Design Principles

1. **Visual Hierarchy**
   - Clear distinction between page levels (H1 → H2 → H3)
   - Consistent spacing between sections (space-y-16 for major, space-y-6 for minor)
   - Visual weight through typography and color

2. **Section Spacing**
   ```
   Page Header:     pb-8 pt-6 md:pb-10
   Major Sections:  space-y-16 (64px)
   Subsections:     space-y-6 (24px)
   Related Items:   space-y-4 (16px)
   ```

3. **Interactive Blocks**
   - Feature cards with hover states
   - Numbered step indicators
   - Callout blocks (info, warning, success)
   - Empty states with icons
   - Component cards with animations

### Typography Scale

```scss
H1: text-4xl lg:text-5xl font-bold      // Page titles
H2: text-3xl font-semibold border-b     // Section headers
H3: text-xl font-semibold               // Subsections
H4: text-lg font-semibold               // Minor headings
Body: text-base leading-7               // Paragraph text
Small: text-sm leading-relaxed          // Captions, notes
```

## 📝 Content Structure

### Documentation Pages

#### 1. Introduction Page
- What is shadcn-angular?
- Philosophy (4 core principles in cards)
- Key features (4 feature cards with icons)
- Credits and acknowledgments

#### 2. Installation Page
- Prerequisites (checklist format)
- 5 numbered steps with clear visual indicators
- Success message in highlighted block
- Installing components section

#### 3. Component Detail Pages
- Header with category badge
- Preview section with demo
- Installation (tabs: CLI / Manual)
- Usage examples
- Examples with variations
- API reference
- Navigation footer

#### 4. Components List Page
- Search bar (prominent, max-w-2xl)
- Category tabs with counts
- Component cards (grid, hover effects)
- Empty state for no results

## 🎯 Implementation Checklist

### For New Documentation Pages

- [ ] Use `<article class="relative">` wrapper
- [ ] Include proper header spacing (`pb-8 pt-6 md:pb-10`)
- [ ] Add separator after header (`<Separator class="mb-10" />`)
- [ ] Use `space-y-16` for major sections
- [ ] Apply `scroll-mt-20` to sections with IDs
- [ ] Include navigation footer with border-t
- [ ] Test in both light and dark modes
- [ ] Verify responsive behavior
- [ ] Check accessibility (keyboard nav, screen readers)

### For Component Cards

```html
<Card class="h-full transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/50">
  <CardHeader class="space-y-3">
    <CardTitle class="flex items-center justify-between text-xl">
      <span>Title</span>
      <lucide-icon class="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
    </CardTitle>
    <CardDescription class="leading-relaxed">Description</CardDescription>
  </CardHeader>
</Card>
```

### For Callout Blocks

```html
<!-- Info Block -->
<div class="rounded-lg border bg-blue-500/10 border-blue-500/20 p-4 flex items-start gap-3">
  <svg class="text-blue-600 dark:text-blue-500 shrink-0 mt-0.5">
    <!-- Icon -->
  </svg>
  <div class="text-sm">
    <p class="font-medium text-blue-900 dark:text-blue-200">Title</p>
    <p class="text-blue-800 dark:text-blue-300 mt-1">Content</p>
  </div>
</div>

<!-- Warning Block -->
<div class="rounded-lg border bg-amber-500/10 border-amber-500/20 p-4 flex items-start gap-3">
  <!-- Same structure with amber colors -->
</div>
```

### For Numbered Steps

```html
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
  <!-- Step content -->
</div>
```

## 🔧 Maintenance Guidelines

### Regular Updates
- **Weekly**: Review and fix broken links
- **Monthly**: Update component examples with latest patterns
- **Quarterly**: Full content audit and refresh
- **Per Release**: Update version-specific information

### Quality Checks
1. **Visual**: Test in light/dark modes on all breakpoints
2. **Content**: Verify all code examples work
3. **Accessibility**: Keyboard navigation and screen reader testing
4. **Performance**: Check page load times and bundle sizes
5. **SEO**: Verify meta tags and structured data

### Version Updates
When Angular or dependencies update:
1. Test all code examples
2. Update version requirements
3. Add migration guides if needed
4. Mark deprecated patterns
5. Update screenshots/demos

## 📱 Responsive Design

### Breakpoints
```scss
sm:  640px   // Small tablets
md:  768px   // Tablets
lg:  1024px  // Laptops
xl:  1280px  // Desktops
2xl: 1536px  // Large desktops
```

### Mobile-First Approach
```html
<!-- Default (mobile) -->
<div class="text-4xl">

<!-- Tablet and up -->
<div class="text-4xl lg:text-5xl">

<!-- Navigation text -->
<span class="hidden sm:inline">Text</span>
```

## 🎨 Color System

### Semantic Colors
```scss
--primary          // Primary actions, links
--secondary        // Secondary actions
--muted            // Subtle backgrounds
--muted-foreground // Secondary text
--accent           // Highlights
--destructive      // Errors, warnings
--border           // Borders
--card             // Card backgrounds
--popover          // Overlays
```

### Usage
- Use semantic colors, not hardcoded values
- Test in both themes
- Ensure sufficient contrast ratios (WCAG AA)

## 🚀 Quick Start

### Adding a New Documentation Page

1. **Create the component file**
   ```typescript
   // src/app/pages/docs/my-topic/my-topic.component.ts
   import { Component } from '@angular/core';
   import { Button } from '@/ui/button';
   import { Separator } from '@/ui/separator';
   
   @Component({
     selector: 'MyTopicPage',
     changeDetection: ChangeDetectionStrategy.OnPush,
     imports: [Button, Separator],
     template: `
       <article class="relative">
         <!-- Use patterns from VISUAL-DESIGN-GUIDE.md -->
       </article>
     `
   })
   export class MyTopicPage {}
   ```

2. **Add route**
   ```typescript
   // app.routes.ts
   {
     path: 'my-topic',
     loadComponent: () => import('./my-topic/my-topic.component')
       .then(m => m.MyTopicPage)
   }
   ```

3. **Update sidebar**
   Add link to docs sidebar navigation

4. **Follow checklists**
   - Visual Design Guide for layout
   - Content Guidelines for writing
   - Component Docs Standards if applicable

## 📖 Resources

### Internal
- [PRD](./PRD.md) - Project requirements
- [TASKS](./TASKS.md) - Task tracking
- [AI-INSTRUCTIONS](./AI-INSTRUCTIONS.md) - AI assistant guidelines

### External
- [Angular Documentation](https://angular.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) - Original React library
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility

## 🤝 Contributing

### Documentation Contributions
1. Follow the style guides in this directory
2. Test all code examples
3. Check spelling and grammar
4. Verify links work
5. Test in multiple browsers
6. Submit PR with clear description

### Reporting Issues
- Use GitHub issues for bugs and suggestions
- Include screenshots for visual issues
- Provide reproduction steps
- Specify browser and version

## 📋 Templates

### New Component Documentation
```markdown
# Component Name

Brief description (1-2 sentences).

## Preview
[Component demo]

## Installation
\```bash
ng generate shadcn-angular:component name
\```

## Usage
[Code examples]

## Examples
[Variations]

## API Reference
[Props table]

## Accessibility
[Keyboard and ARIA info]
```

### New Guide
```markdown
# Guide Title

Introduction paragraph explaining what readers will learn.

## Prerequisites
- Requirement 1
- Requirement 2

## Step 1: First Action
[Instructions and code]

## Step 2: Second Action
[Instructions and code]

## Conclusion
Summary and next steps.
```

## 🎯 Goals

### Current Focus
- ✅ Visual hierarchy and spacing
- ✅ Component documentation
- ✅ Installation guides
- ✅ Content standards

### Next Phase
- [ ] Interactive playground
- [ ] Video tutorials
- [ ] API search
- [ ] Community examples

---

**Last Updated**: January 2026

**Maintainers**: shadcn-angular team

**Questions?** Open an issue on GitHub
