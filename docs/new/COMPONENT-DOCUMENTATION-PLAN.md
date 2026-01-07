# 🎯 Component Documentation Plan: Phased Implementation

> **Goal:** Build production-ready documentation that enables Angular developers to confidently implement shadcn-angular components with proper animations, accessibility, and best practices.

---

## 📊 Overview

| Metric | Target |
|--------|--------|
| **Total Components** | 57 |
| **Phases** | 5 |
| **Timeline** | 12 weeks |
| **Animation-Ready Components** | All overlay/interactive |

### Success Metrics
- ✅ 100% component coverage with complete API documentation
- ✅ Animation-ready examples for all overlay/interactive components
- ✅ Accessibility compliance verified for all components
- ✅ Developer satisfaction via comprehensive usage patterns
- ✅ Zero ambiguity in implementation guidance

---

## 🗓️ Phase Summary

| Phase | Focus | Components | Weeks | Status |
|-------|-------|------------|-------|--------|
| **1** | Foundation & Critical | 12 | 1-3 | ✅ Complete |
| **2** | Form & Interactive | 15 | 4-6 | ⏳ Pending |
| **3** | Layout & Navigation | 12 | 7-8 | ⏳ Pending |
| **4** | Complex & Specialty | 10 | 9-10 | ⏳ Pending |
| **5** | Advanced & Utility | 8 | 11-12 | ⏳ Pending |

---

# 🚀 Phase 1: Foundation & Critical Components

**Timeline:** Weeks 1-3  
**Priority:** HIGH  
**Components:** 12  
**Animation Focus:** Core System Implementation

## 1.1 Animation System Foundation

### Core Architecture

The animation system follows Radix philosophy with state-driven, headless, composable design.

#### Animation Lifecycle States

Every animated primitive exposes **4 explicit phases**:

| Phase | Description | Data Attribute |
|-------|-------------|----------------|
| `closed` | Fully hidden, not interactive | `data-state="closed"` |
| `entering` | Mounting + animation in progress | `data-state="entering"` |
| `open` | Fully visible & interactive | `data-state="open"` |
| `exiting` | Animation running before unmount | `data-state="exiting"` |

#### Required Host Attributes

```typescript
// Every animated primitive must expose:
host: {
  '[attr.data-state]': 'state()',
  '[attr.data-side]': 'side()',      // if positional
  '[attr.data-align]': 'align()',    // if applicable
}
```

#### Animation Tokens

| Token | Value | CSS Variable |
|-------|-------|--------------|
| Duration (fast) | 150ms | `--animation-duration-fast` |
| Duration (base) | 200ms | `--animation-duration-base` |
| Duration (slow) | 300ms | `--animation-duration-slow` |
| Easing (in) | ease-out | `--animation-easing-in` |
| Easing (out) | ease-in | `--animation-easing-out` |

#### Standard Animation Classes

```css
/* Tailwind animation utilities - shadcn compatible */
.animate-in { animation-name: enter; }
.animate-out { animation-name: exit; }
.fade-in { --tw-enter-opacity: 0; }
.fade-out { --tw-exit-opacity: 0; }
.zoom-in-95 { --tw-enter-scale: 0.95; }
.zoom-out-95 { --tw-exit-scale: 0.95; }
.slide-in-from-top { --tw-enter-translate-y: -100%; }
.slide-in-from-bottom { --tw-enter-translate-y: 100%; }
.slide-in-from-left { --tw-enter-translate-x: -100%; }
.slide-in-from-right { --tw-enter-translate-x: 100%; }
.slide-out-to-top { --tw-exit-translate-y: -100%; }
.slide-out-to-bottom { --tw-exit-translate-y: 100%; }
.slide-out-to-left { --tw-exit-translate-x: -100%; }
.slide-out-to-right { --tw-exit-translate-x: 100%; }
```

---

## 1.2 Phase 1 Components

### Category A: Animation-Critical (Overlay Components)

These components require full animation lifecycle implementation.

#### 1. Dialog
**Animation Type:** Fade + Scale  
**Priority:** Critical

```typescript
// Required state exposure
interface DialogAnimationState {
  state: 'closed' | 'entering' | 'open' | 'exiting';
}

// Animation classes
const dialogAnimations = {
  overlay: 'animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
  content: 'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
};
```

**Documentation Requirements:**
- [ ] Basic usage example
- [ ] Controlled dialog example
- [ ] With form content example
- [ ] Custom animation example
- [ ] Nested dialogs example
- [ ] Accessibility documentation
- [ ] Animation states documentation

---

#### 2. Alert Dialog
**Animation Type:** Fade + Scale  
**Priority:** Critical

```typescript
// Animation classes - same as Dialog
const alertDialogAnimations = {
  overlay: 'animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
  content: 'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
};
```

**Documentation Requirements:**
- [ ] Basic confirmation example
- [ ] Destructive action example
- [ ] Async action example
- [ ] Custom styling example
- [ ] Accessibility documentation
- [ ] Animation states documentation

---

#### 3. Popover
**Animation Type:** Fade + Scale (with direction awareness)  
**Priority:** Critical

```typescript
// Required state exposure
interface PopoverAnimationState {
  state: 'closed' | 'entering' | 'open' | 'exiting';
  side: 'top' | 'bottom' | 'left' | 'right';
  align: 'start' | 'center' | 'end';
}

// Animation classes
const popoverAnimations = {
  content: cn(
    'animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=top]:slide-in-from-bottom-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2'
  )
};
```

**Documentation Requirements:**
- [ ] Basic usage example
- [ ] With form example
- [ ] Positioning examples (all sides)
- [ ] Controlled popover example
- [ ] Nested popover example
- [ ] Accessibility documentation
- [ ] Animation states documentation

---

#### 4. Tooltip
**Animation Type:** Fade  
**Priority:** Critical

```typescript
// Required state exposure
interface TooltipAnimationState {
  state: 'closed' | 'entering' | 'open' | 'exiting';
  side: 'top' | 'bottom' | 'left' | 'right';
}

// Animation classes
const tooltipAnimations = {
  content: cn(
    'animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=top]:slide-in-from-bottom-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2'
  )
};
```

**Documentation Requirements:**
- [ ] Basic usage example
- [ ] Positioning examples
- [ ] With icons example
- [ ] Delay configuration example
- [ ] Accessibility documentation
- [ ] Animation states documentation

---

#### 5. Sheet
**Animation Type:** Directional Slide  
**Priority:** Critical

```typescript
// Required state exposure
interface SheetAnimationState {
  state: 'closed' | 'entering' | 'open' | 'exiting';
  side: 'top' | 'bottom' | 'left' | 'right';
}

// Animation classes by side
const sheetAnimations = {
  overlay: 'animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
  content: {
    top: 'inset-x-0 top-0 border-b animate-in slide-in-from-top data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top',
    bottom: 'inset-x-0 bottom-0 border-t animate-in slide-in-from-bottom data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom',
    left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm animate-in slide-in-from-left data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left',
    right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm animate-in slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right'
  }
};
```

**Documentation Requirements:**
- [ ] Basic usage (right side)
- [ ] All sides examples
- [ ] With form content example
- [ ] Navigation sheet example
- [ ] Custom width example
- [ ] Accessibility documentation
- [ ] Animation states documentation

---

#### 6. Toast
**Animation Type:** Slide + Fade  
**Priority:** Critical

```typescript
// Required state exposure
interface ToastAnimationState {
  state: 'closed' | 'entering' | 'open' | 'exiting';
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}

// Animation classes
const toastAnimations = {
  viewport: {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2'
  },
  toast: 'animate-in slide-in-from-top-full data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full'
};
```

**Documentation Requirements:**
- [ ] Basic toast example
- [ ] Toast variants (success, error, warning, info)
- [ ] With action button example
- [ ] Custom duration example
- [ ] Position examples
- [ ] Stacked toasts example
- [ ] Accessibility documentation
- [ ] Animation states documentation

---

### Category B: Core UI Components (No Animation Required)

These components need comprehensive documentation but don't require animation states.

#### 7. Button
**Priority:** Critical

**Documentation Requirements:**
- [ ] All variants example (default, destructive, outline, secondary, ghost, link)
- [ ] All sizes example (default, sm, lg, icon)
- [ ] With icon example
- [ ] Loading state example
- [ ] Disabled state example
- [ ] As child pattern example
- [ ] Button group composition example
- [ ] Accessibility documentation

**Example: All Variants**
```html
<div class="flex flex-wrap gap-4">
  <Button variant="default">Default</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>
```

**Example: With Loading State**
```typescript
export class ButtonDemo {
  isLoading = signal(false);
  
  async handleClick() {
    this.isLoading.set(true);
    await someAsyncOperation();
    this.isLoading.set(false);
  }
}
```

```html
<Button [disabled]="isLoading()" (click)="handleClick()">
  @if (isLoading()) {
    <Spinner class="mr-2 h-4 w-4" />
  }
  {{ isLoading() ? 'Loading...' : 'Submit' }}
</Button>
```

---

#### 8. Input
**Priority:** Critical

**Documentation Requirements:**
- [ ] Basic input example
- [ ] With label example
- [ ] With placeholder example
- [ ] Disabled state example
- [ ] With error state example
- [ ] Input types (text, email, password, number)
- [ ] With icon example
- [ ] Form integration example
- [ ] Accessibility documentation

**Example: With Label and Error**
```html
<div class="grid w-full max-w-sm gap-1.5">
  <Label for="email">Email</Label>
  <Input 
    type="email" 
    id="email" 
    placeholder="Enter your email"
    [class]="hasError() ? 'border-destructive' : ''"
  />
  @if (hasError()) {
    <p class="text-sm text-destructive">Please enter a valid email address.</p>
  }
</div>
```

---

#### 9. Label
**Priority:** Critical

**Documentation Requirements:**
- [ ] Basic usage example
- [ ] With form control example
- [ ] Required field indicator example
- [ ] Disabled state example
- [ ] Accessibility documentation

---

#### 10. Form
**Priority:** Critical

**Documentation Requirements:**
- [ ] Basic form example
- [ ] With validation example
- [ ] Multiple fields example
- [ ] Custom validation example
- [ ] Form submission example
- [ ] Error handling example
- [ ] Accessibility documentation

---

#### 11. Card
**Priority:** High

**Documentation Requirements:**
- [ ] Basic card example
- [ ] With header and footer example
- [ ] Interactive card example
- [ ] Card with image example
- [ ] Card grid layout example
- [ ] Accessibility documentation

**Example: Complete Card**
```html
<Card class="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <div class="grid w-full items-center gap-4">
        <div class="flex flex-col space-y-1.5">
          <Label for="name">Name</Label>
          <Input id="name" placeholder="Name of your project" />
        </div>
      </div>
    </form>
  </CardContent>
  <CardFooter class="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
```

---

#### 12. Separator
**Priority:** High

**Documentation Requirements:**
- [ ] Horizontal separator example
- [ ] Vertical separator example
- [ ] With text example
- [ ] In layout example
- [ ] Accessibility documentation

---

## 1.3 Documentation Template

### Standard Component Page Structure

Each component documentation page MUST include:

```markdown
# [Component Name]

[Brief description - 1-2 sentences]

## Preview

[Interactive demo component]

## Installation

### CLI (Recommended)
\`\`\`bash
npx ng-cn add [component-name]
\`\`\`

### Manual Installation
\`\`\`bash
npm install @ng-cn/[component-name]
\`\`\`

## Usage

### Import
\`\`\`typescript
import { [Components] } from '@ng-cn/[component-name]';
\`\`\`

### Basic Example
[Code example]

## Examples

### [Example 1 Title]
[Description]
[Code]

### [Example 2 Title]
[Description]
[Code]

[... more examples]

## API Reference

### [Component Name]

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ... | ... | ... | ... |

### Events

| Event | Type | Description |
|-------|------|-------------|
| ... | ... | ... |

## Accessibility

### Keyboard Navigation
- [Key]: [Action]

### ARIA Attributes
- [Attribute]: [Purpose]

### Screen Reader Support
[Description]

## Animation States (if applicable)

| State | Description | Data Attribute |
|-------|-------------|----------------|
| ... | ... | ... |

### Customizing Animations
[Code example for customization]

### Disabling Animations
[Code example]

## Related Components

- [Related Component 1]
- [Related Component 2]
```

---

## 1.4 Quality Assurance Checklist

### Per-Component Review

- [ ] **Header**: Name, category badge, description present
- [ ] **Preview**: Working interactive demo
- [ ] **Installation**: CLI and manual instructions
- [ ] **Usage**: Import statement and basic example
- [ ] **Examples**: Minimum 4 different use cases
- [ ] **API Reference**: All inputs/outputs documented
- [ ] **Accessibility**: ARIA, keyboard, screen reader docs
- [ ] **Animation** (if applicable): States and customization
- [ ] **Code Quality**: All examples tested and functional
- [ ] **Visual**: Dark mode and responsive verified
- [ ] **Links**: Related components linked

### Animation-Specific Review

- [ ] State exposure via `data-state` attribute
- [ ] Side/align exposure for positional components
- [ ] Presence handling for exit animations
- [ ] Reduced motion support documented
- [ ] CSS variable customization documented
- [ ] Performance verified (no jank)

---

## 1.5 Implementation Tracker

### Week 1: Animation Foundation + Dialog/Alert Dialog

| Task | Status | Owner | Notes |
|------|--------|-------|-------|
| Animation system architecture | ✅ | - | CSS utilities in styles.scss |
| Animation CSS utilities | ✅ | - | Complete animation system |
| Dialog documentation | ✅ | - | 7 examples complete |
| Alert Dialog documentation | ✅ | - | 6 examples complete |

### Week 2: Popover/Tooltip/Sheet/Toast

| Task | Status | Owner | Notes |
|------|--------|-------|-------|
| Popover documentation | ✅ | - | 7 examples complete |
| Tooltip documentation | ✅ | - | 6 examples complete |
| Sheet documentation | ✅ | - | 7 examples complete |
| Toast documentation | ✅ | - | 8 examples complete |

### Week 3: Core UI + QA

| Task | Status | Owner | Notes |
|------|--------|-------|-------|
| Button documentation | ✅ | - | 8 examples complete |
| Input documentation | ✅ | - | 9 examples complete |
| Label documentation | ✅ | - | 5 examples complete |
| Form documentation | ✅ | - | 7 examples complete |
| Card documentation | ✅ | - | 6 examples complete |
| Separator documentation | ✅ | - | 5 examples complete |
| Phase 1 QA review | ✅ | - | Build verified |

---

## 1.6 Deliverables

### Animation System
- [x] Animation state signals
- [x] CSS animation utilities (animate-in, animate-out, fade, zoom, slide)
- [x] Animation tokens CSS variables
- [x] Reduced motion support

### Documentation
- [x] 12 component documentation pages
- [x] 75+ code examples
- [x] API reference for all components
- [x] Accessibility documentation
- [x] Animation states documentation

### Quality Assurance
- [x] All examples tested (build verified)
- [x] Dark mode verified
- [x] Animation performance verified

---

# 📋 Phase 2-5 Overview

## Phase 2: Form & Interactive Components (Weeks 4-6)

**Components (15):**
- Checkbox, Radio Group, Select, Switch, Toggle, Slider
- Combobox, Date Picker, Input OTP, Textarea
- Command, Toggle Group, Native Select, Segmented, Calendar

**Focus:**
- Form integration patterns
- Validation and error states
- Controlled component patterns

---

## Phase 3: Layout & Navigation Components (Weeks 7-8)

**Components (12):**
- Accordion, Collapsible, Tabs, Resizable
- Navigation Menu, Menubar, Pagination
- Aspect Ratio, Scroll Area, Breadcrumb
- Context Menu, Dropdown Menu

**Focus:**
- Layout composition patterns
- Navigation state management
- Responsive behavior

---

## Phase 4: Complex & Specialty Components (Weeks 9-10)

**Components (10):**
- Avatar, Badge, Progress, Skeleton
- Carousel, Chart, Data Table, Table
- Alert, Hover Card

**Focus:**
- Data visualization
- Loading states
- Performance optimization

---

## Phase 5: Advanced & Utility Components (Weeks 11-12)

**Components (8):**
- Button Group, Empty, Input Group, Kbd
- Spinner, Typography, Sidebar, Drawer

**Focus:**
- Edge cases
- Theming customization
- Micro-interactions

---

# 📚 Resources

## Internal Documentation
- [COMPONENT-DOCS-STANDARDS.md](./COMPONENT-DOCS-STANDARDS.md)
- [VISUAL-DESIGN-GUIDE.md](./VISUAL-DESIGN-GUIDE.md)
- [CONTENT-GUIDELINES.md](./CONTENT-GUIDELINES.md)
- [Animation-System-For-Shadcn-angular.md](./Animation-System-For-Shadcn-angular.md)

## External References
- [shadcn/ui](https://ui.shadcn.com) - React reference implementation
- [Radix UI](https://www.radix-ui.com) - Primitive behavior reference
- [Angular CDK](https://material.angular.io/cdk/categories) - Angular primitives
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards

---

**Last Updated:** January 7, 2026  
**Status:** Phase 1 In Progress
