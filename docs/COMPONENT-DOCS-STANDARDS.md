# Component Documentation Standards

## Overview

This guide defines the standard structure and content for documenting shadcn-angular components. Following these standards ensures consistency and helps developers quickly understand how to use each component.

## Standard Component Page Structure

### 1. Header Section
```
- Component Name (H1)
- Category Badge
- Brief description (1-2 sentences)
```

### 2. Preview Section
```
- Interactive demo (if available)
- Visual representation
- Viewport controls for responsive testing
```

### 3. Installation Section
```
- CLI command (recommended)
- Manual installation with code snippet
- Dependencies list (if applicable)
```

### 4. Usage Section
```
- Import statement
- Basic component setup
- Template usage example
- Common patterns
```

### 5. Examples Section
```
- Multiple variations
- Real-world use cases
- Best practices
- Edge cases and gotchas
```

### 6. API Reference
```
- Props/Inputs table
- Events/Outputs table
- Methods (if applicable)
- Slots/Content projection
```

### 7. Accessibility
```
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management
```

### 8. Related Components
```
- Links to similar components
- Composition patterns
```

## Writing Style Guidelines

### Tone
- **Direct and Clear**: Get to the point quickly
- **Actionable**: Focus on "how to" rather than "what is"
- **Developer-First**: Assume technical knowledge

### Language
- Use active voice: "Import the component" not "The component can be imported"
- Use imperative mood for instructions: "Add the following code"
- Avoid jargon unless it's standard Angular terminology

### Code Examples
- **Complete**: Show full, working examples
- **Realistic**: Use real-world scenarios
- **Annotated**: Add comments for complex logic
- **Formatted**: Consistent indentation and style

## Component Description Template

```typescript
/**
 * [Component Name] - [One line description]
 * 
 * [2-3 sentence detailed description explaining what the component does,
 * when to use it, and any key features or limitations.]
 * 
 * @example
 * ```html
 * <ComponentName prop="value">
 *   Content
 * </ComponentName>
 * ```
 */
```

## Props Documentation Format

Each prop should document:

```typescript
{
  name: 'propName',
  type: 'string | number',
  default: 'default value',
  description: 'What this prop does and when to use it',
  required: false
}
```

### Type Documentation
- Be specific: `'sm' | 'md' | 'lg'` not just `string`
- Show examples: `variant: 'default' | 'outline' | 'ghost'`
- Document complex types: Link to type definitions

### Default Values
- Always document defaults
- Use `undefined` for optional props without defaults
- Show `null` explicitly when that's the default

## Example Categories

### Basic Example
```html
<!-- Simplest possible usage -->
<Button>Click me</Button>
```

### Variants Example
```html
<!-- All available variants -->
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Composition Example
```html
<!-- How it works with other components -->
<Dialog>
  <DialogTrigger>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### Interactive Example
```typescript
// With state management
export class MyComponent {
  isOpen = signal(false);
  
  toggle() {
    this.isOpen.update(v => !v);
  }
}
```

```html
<Button (click)="toggle()">
  {{ isOpen() ? 'Close' : 'Open' }}
</Button>
```

### Edge Cases Example
```html
<!-- Handling loading states, errors, etc. -->
<Button [disabled]="isLoading()">
  @if (isLoading()) {
    <Spinner class="mr-2" />
  }
  Submit
</Button>
```

## Accessibility Documentation

### Required Information
1. **Keyboard Support**
   - List all keyboard interactions
   - Document focus behavior
   - Explain tab order

2. **ARIA Attributes**
   - Show which ARIA attributes are used
   - Explain their purpose
   - Document when they're applied

3. **Screen Reader Support**
   - What screen readers announce
   - Any special considerations
   - Alternative text requirements

### Example Format
```markdown
## Accessibility

### Keyboard Interactions

| Key | Action |
|-----|--------|
| `Space` | Opens/closes the dialog |
| `Enter` | Opens/closes the dialog |
| `Escape` | Closes the dialog |

### ARIA Attributes

- `aria-expanded`: Indicates whether the dialog is open
- `aria-labelledby`: Links to the dialog title
- `aria-describedby`: Links to the dialog description

### Focus Management

When the dialog opens, focus automatically moves to the first focusable element. When closed, focus returns to the trigger button.
```

## Common Patterns

### Form Components
```markdown
## Usage with Forms

Import the component in your form component:

\```typescript
import { FormControl } from '@angular/forms';

export class MyForm {
  control = new FormControl('');
}
\```

Use in template:

\```html
<form>
  <Label for="input">Label</Label>
  <Input id="input" [formControl]="control" />
</form>
\```
```

### Controlled Components
```markdown
## Controlled Component

This component can be controlled via the `value` input:

\```typescript
export class Parent {
  value = signal('initial');
  
  onChange(newValue: string) {
    this.value.set(newValue);
  }
}
\```

\```html
<Component 
  [value]="value()"
  (valueChange)="onChange($event)"
/>
\```
```

### Composition Patterns
```markdown
## Composition

Build complex UIs by composing multiple components:

\```html
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
\```
```

## Do's and Don'ts

### Do ✓
- Provide working code examples
- Show multiple use cases
- Document all props and events
- Include accessibility information
- Link to related components
- Use consistent formatting
- Test all examples before publishing

### Don't ✗
- Use incomplete code snippets
- Assume prior knowledge of patterns
- Skip edge cases
- Forget mobile considerations
- Omit TypeScript types
- Use outdated syntax
- Include broken examples

## Review Checklist

Before publishing component documentation:

- [ ] Header with name, badge, and description
- [ ] Working preview or demo
- [ ] CLI and manual installation instructions
- [ ] Basic usage example
- [ ] At least 3 different use case examples
- [ ] Complete API reference
- [ ] Accessibility documentation
- [ ] All code examples tested
- [ ] TypeScript types documented
- [ ] Links to related components
- [ ] Dark mode tested
- [ ] Mobile responsive verified
- [ ] No spelling or grammar errors

## File Naming Conventions

```
component-name/
├── component-name.component.ts     # Main component
├── index.ts                        # Barrel export
└── demos/
    ├── basic-demo.ts              # Simple usage
    ├── variants-demo.ts           # All variants
    ├── composition-demo.ts        # With other components
    └── advanced-demo.ts           # Complex scenarios
```

## Maintenance

### Versioning
- Document breaking changes
- Update examples for new Angular versions
- Archive deprecated patterns
- Keep dependencies current

### Testing
- Test all code examples regularly
- Verify accessibility with tools
- Check browser compatibility
- Test with screen readers

### Feedback Loop
- Monitor user questions
- Update docs based on common issues
- Add examples for frequent use cases
- Improve clarity based on feedback
