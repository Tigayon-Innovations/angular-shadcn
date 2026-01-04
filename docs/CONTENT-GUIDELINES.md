# Documentation Content Guidelines

## Purpose

This guide establishes the content standards for shadcn-angular documentation. It covers writing style, content structure, and best practices to ensure documentation is clear, consistent, and helpful.

## Content Principles

### 1. Developer-First
- Assume readers are experienced developers
- Skip basic explanations of web concepts
- Focus on Angular-specific implementation details
- Provide context for architectural decisions

### 2. Action-Oriented
- Start with "how-to" before "what-is"
- Lead with code examples
- Include working implementations
- Show before explaining

### 3. Concise and Scannable
- Use short paragraphs (2-4 sentences)
- Break up long sections with subheadings
- Use bullet points for lists
- Highlight key information

### 4. Contextual
- Explain when and why to use components
- Show real-world use cases
- Document edge cases and gotchas
- Link to related concepts

## Writing Style

### Voice and Tone
- **Professional but approachable**
  - ✓ "Import the button component into your module"
  - ✗ "Now you're gonna want to import the super cool button"

- **Direct and clear**
  - ✓ "Set the `variant` prop to control the button style"
  - ✗ "You can optionally configure various different visual variants"

- **Confident, not prescriptive**
  - ✓ "We recommend using signals for reactive state"
  - ✗ "You must always use signals or your code will break"

### Grammar and Style

#### Active Voice
```
✓ "Angular renders the component"
✗ "The component is rendered by Angular"
```

#### Present Tense
```
✓ "The dialog opens when you click the button"
✗ "The dialog will open when you click the button"
```

#### Second Person
```
✓ "You can customize the theme"
✗ "One can customize the theme" or "We can customize the theme"
```

#### Imperative for Instructions
```
✓ "Install the dependencies"
✗ "You should install the dependencies"
```

## Content Structure

### Page Structure
```
1. Title + Brief Description (1-2 sentences)
2. Quick Example (minimal working code)
3. Installation Instructions
4. Detailed Usage
5. Examples (multiple variations)
6. API Reference
7. Advanced Topics
8. Related Resources
```

### Section Length
- **Short pages**: < 500 words for simple concepts
- **Medium pages**: 500-1500 words for components
- **Long pages**: 1500+ words for complex guides

Break long pages into subsections with clear headings.

## Code Examples

### Principles
1. **Complete**: Include all necessary imports
2. **Minimal**: Show only relevant code
3. **Realistic**: Use real-world scenarios
4. **Tested**: Verify all examples work

### Example Structure
```typescript
// 1. Imports (complete)
import { Component, signal } from '@angular/core';
import { Button } from '@/ui/button';

// 2. Component (minimal but complete)
@Component({
  selector: 'app-example',
  imports: [Button],
  template: `
    <Button (click)="handleClick()">
      Click count: {{ count() }}
    </Button>
  `
})
export class ExampleComponent {
  count = signal(0);
  
  handleClick() {
    this.count.update(n => n + 1);
  }
}
```

### Code Comments
```typescript
// Use comments to explain "why", not "what"
✓ // Debounce to prevent excessive API calls
  const debounced = debounce(searchFn, 300);

✗ // Create a debounced function
  const debounced = debounce(searchFn, 300);

// Don't over-comment obvious code
✗ // Set the count to 0
  count.set(0);
```

## Technical Accuracy

### Version Specificity
```
✓ "Available in Angular 21+"
✓ "Requires Tailwind CSS v4"
✗ "Works with recent Angular versions"
```

### Deprecation Warnings
```markdown
> **Deprecated**: This API is deprecated as of v2.0. Use `newApi()` instead.
> 
> Migration guide: [link]
```

### Browser Support
```markdown
## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Note: Internet Explorer is not supported.
```

## Formatting Guidelines

### Inline Code
Use backticks for:
- Variable names: `count`
- Function names: `handleClick()`
- Property names: `variant`
- File names: `app.component.ts`
- Shell commands: `npm install`
- HTML elements: `<button>`
- CSS classes: `.btn-primary`

### Code Blocks
Use fenced code blocks with language:

\```typescript
const example = 'code';
\```

\```html
<div>template</div>
\```

\```bash
npm install package
\```

### Bold and Italic
- **Bold** for emphasis: **Important note**
- *Italic* for terms: The *component tree*
- Use sparingly to maintain readability

### Lists

#### Unordered Lists
```markdown
- First item
- Second item
  - Nested item
- Third item
```

#### Ordered Lists
```markdown
1. First step
2. Second step
3. Third step
```

#### Definition Lists
```markdown
**Term**
: Definition of the term

**Another Term**
: Another definition
```

### Links
```markdown
<!-- Internal links (relative) -->
[Button component](./button)
[Installation guide](../installation)

<!-- External links (absolute) -->
[Angular docs](https://angular.dev)

<!-- Link with title -->
[shadcn/ui](https://ui.shadcn.com "shadcn/ui website")
```

### Tables
```markdown
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| variant | string | 'default' | Button style variant |
| size | string | 'md' | Button size |
```

Keep tables concise. For complex data, use description lists instead.

## Content Types

### Tutorial Content
```markdown
## Building a Login Form

In this tutorial, you'll build a login form using shadcn-angular components.

### Prerequisites
- Node.js 18.19 or later
- Angular CLI installed
- Basic TypeScript knowledge

### Step 1: Set up the project
[Instructions...]

### Step 2: Create the form
[Instructions...]

### What you learned
- How to create forms with shadcn-angular
- Form validation patterns
- Accessibility best practices
```

### Reference Content
```markdown
## Button API

### Props

#### variant
- **Type**: `'default' | 'outline' | 'ghost' | 'link'`
- **Default**: `'default'`
- **Description**: The visual style variant

#### size
- **Type**: `'sm' | 'md' | 'lg'`
- **Default**: `'md'`
- **Description**: The button size
```

### Conceptual Content
```markdown
## Understanding Signals

Signals are a reactive primitive that Angular uses for fine-grained reactivity.

### Why Signals?

Traditional change detection has limitations:
- Checks entire component tree
- Can trigger unnecessary renders
- Hard to optimize

Signals solve this by:
- Tracking dependencies automatically
- Updating only what changed
- Enabling better performance
```

## Special Content Blocks

### Notes
```markdown
> **Note**: This feature requires Angular 21+
```

### Tips
```markdown
> **Tip**: Use keyboard shortcuts to navigate faster
```

### Warnings
```markdown
> **Warning**: This will delete all data. This action cannot be undone.
```

### Info Callouts
```markdown
> **Info**: You can also install components individually using `ng add`
```

## SEO and Discoverability

### Page Titles
- Use descriptive titles: "Button Component - shadcn-angular"
- Include key terms: "Install shadcn-angular"
- Keep under 60 characters

### Descriptions
- Write clear meta descriptions (150-160 chars)
- Include primary keywords
- Make them compelling

### Headings
- Use H1 for page title only
- Use H2 for major sections
- Use H3 for subsections
- Don't skip levels (H1 → H3)

### Keywords
Include naturally in content:
- Angular components
- Tailwind CSS
- TypeScript
- Standalone components
- Signals
- shadcn/ui

## Accessibility in Documentation

### Alt Text for Images
```markdown
![Button component showing different variants](./button-variants.png)
```

### Descriptive Links
```
✓ [Read the installation guide](./installation)
✗ [Click here](./installation)
```

### Color and Contrast
- Don't rely on color alone to convey meaning
- Ensure code examples are readable
- Test in both light and dark modes

### Language
- Use clear, simple language
- Avoid idioms and colloquialisms
- Define technical terms

## Maintenance and Updates

### Versioning
- Document version requirements clearly
- Mark deprecated features
- Provide migration guides
- Keep examples current

### Review Process
Before publishing:
- [ ] All code examples tested
- [ ] Links verified
- [ ] Spelling and grammar checked
- [ ] Formatting consistent
- [ ] Images optimized
- [ ] Accessibility verified

### Update Frequency
- **Components**: Update with each release
- **Guides**: Review quarterly
- **Examples**: Test with Angular updates
- **Links**: Audit monthly

## Content Checklist

### Every Page Must Have
- [ ] Clear, descriptive title
- [ ] Brief introduction (1-2 sentences)
- [ ] At least one code example
- [ ] Table of contents (for long pages)
- [ ] Related links

### Optional but Recommended
- [ ] Video or animated demo
- [ ] Interactive examples
- [ ] FAQ section
- [ ] Troubleshooting guide
- [ ] Community contributions

## Style Reference

### Capitalization
- **Product names**: shadcn-angular (lowercase), Angular (uppercase)
- **File names**: Lowercase with hyphens: `app.component.ts`
- **Headings**: Title case: "Getting Started with shadcn-angular"

### Abbreviations
- First use: Full term followed by abbreviation in parentheses
  - "Application Programming Interface (API)"
- Subsequent uses: Abbreviation only

### Numbers
- Spell out one through nine
- Use numerals for 10 and above
- Always use numerals in code and technical contexts

### Punctuation
- Use Oxford comma: "red, white, and blue"
- One space after periods
- Use em dashes (—) without spaces
- Use en dashes (–) for ranges: "pages 10–20"

## Voice and Perspective

### Refer to the Product
```
✓ "shadcn-angular provides..."
✓ "The library includes..."
✗ "We provide..." (unless referring to docs team)
```

### Refer to the User
```
✓ "You can customize..."
✓ "Your application will..."
✗ "The developer can..."
```

### Refer to the Docs Team
```
✓ "We recommend..."
✓ "In this guide, we'll show..."
✓ "We're working on..."
```

## Examples of Good Documentation

### Good Button Documentation
```markdown
# Button

A clickable button component with multiple visual variants and sizes.

\```html
<Button>Click me</Button>
\```

## Installation

\```bash
ng generate shadcn-angular:component button
\```

## Usage

Import the button component:

\```typescript
import { Button } from '@/ui/button';

@Component({
  imports: [Button],
  template: `<Button>Click me</Button>`
})
export class MyComponent {}
\```

## Variants

\```html
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
\```

## API

### Props

| Property | Type | Default |
|----------|------|---------|
| variant | 'default' \| 'outline' \| 'ghost' | 'default' |
| size | 'sm' \| 'md' \| 'lg' | 'md' |
\```
