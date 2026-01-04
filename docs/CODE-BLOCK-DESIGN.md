# Code Block Design System

## Overview

The code block component is a critical part of the documentation experience. It needs to be readable, copyable, and visually integrated with the rest of the UI.

## Features

### Core Features
1. **Syntax Highlighting** - Language-specific color coding
2. **Copy to Clipboard** - One-click code copying
3. **Line Numbers** (optional) - For reference in explanations
4. **File Names** (optional) - Show which file the code belongs to
5. **Language Badge** - Display the code language
6. **Theme Support** - Light and dark mode variants
7. **Overflow Handling** - Horizontal scroll for long lines

### Advanced Features
1. **Diff Highlighting** - Show additions/deletions
2. **Line Highlighting** - Emphasize specific lines
3. **Collapsible Sections** - For large code blocks
4. **Multiple Files** - Tab between related files
5. **Live Preview** - Interactive code execution
6. **Annotations** - Inline comments and callouts

## Design Specifications

### Container
```scss
.code-block {
  border-radius: var(--radius);
  border: 1px solid var(--border);
  overflow: hidden;
  background: var(--muted);
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
}
```

### Header
```html
<div class="code-block-header">
  <span class="code-block-language">TypeScript</span>
  <span class="code-block-filename">app.component.ts</span>
  <button class="code-block-copy">
    <CopyIcon /> Copy code
  </button>
</div>
```

### Code Area
```html
<div class="code-block-content">
  <pre><code class="language-typescript">
    {/* Highlighted code */}
  </code></pre>
</div>
```

## Styling Guidelines

### Colors (Light Mode)
```scss
--code-background: oklch(0.98 0 0);
--code-text: oklch(0.2 0 0);
--code-comment: oklch(0.5 0 0);
--code-keyword: oklch(0.4 0.15 280);
--code-string: oklch(0.45 0.15 150);
--code-function: oklch(0.35 0.15 240);
--code-number: oklch(0.4 0.15 40);
--code-operator: oklch(0.3 0 0);
```

### Colors (Dark Mode)
```scss
--code-background: oklch(0.18 0 0);
--code-text: oklch(0.85 0 0);
--code-comment: oklch(0.55 0 0);
--code-keyword: oklch(0.7 0.12 280);
--code-string: oklch(0.75 0.12 150);
--code-function: oklch(0.75 0.12 240);
--code-number: oklch(0.75 0.12 40);
--code-operator: oklch(0.8 0 0);
```

### Typography
```scss
.code-block pre {
  font-size: 14px;
  line-height: 1.7;
  font-family: 'JetBrains Mono', monospace;
  font-variant-ligatures: common-ligatures;
  font-feature-settings: 'liga' 1, 'calt' 1;
}
```

### Spacing
```scss
.code-block-header {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.code-block-content {
  padding: 16px;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  padding: 0;
}
```

## Language Support

### Supported Languages
```typescript
const SUPPORTED_LANGUAGES = [
  'typescript',
  'javascript',
  'html',
  'css',
  'scss',
  'json',
  'bash',
  'shell',
  'markdown',
  'yaml',
  'xml',
  'sql'
] as const;
```

### Language Aliases
```typescript
const LANGUAGE_ALIASES = {
  'ts': 'typescript',
  'js': 'javascript',
  'sh': 'bash',
  'md': 'markdown',
  'yml': 'yaml'
};
```

## Interactive States

### Copy Button States
```scss
// Default
.code-block-copy {
  color: var(--muted-foreground);
  opacity: 0.7;
  transition: opacity 0.2s;
}

// Hover
.code-block-copy:hover {
  opacity: 1;
  color: var(--foreground);
}

// Success (after copy)
.code-block-copy.success {
  color: var(--success);
}

// Error
.code-block-copy.error {
  color: var(--destructive);
}
```

### Line Highlighting
```scss
.code-block-line.highlighted {
  background: var(--primary) / 10%;
  border-left: 3px solid var(--primary);
  padding-left: 13px;
  margin-left: -16px;
  margin-right: -16px;
  padding-right: 16px;
}
```

### Selection
```scss
.code-block ::selection {
  background: var(--primary) / 30%;
}
```

## Accessibility

### Keyboard Navigation
```html
<div class="code-block" role="region" aria-label="Code example">
  <button 
    class="code-block-copy"
    aria-label="Copy code to clipboard"
    (click)="copyCode()"
  >
    Copy
  </button>
  <pre tabindex="0"><code>...</code></pre>
</div>
```

### Screen Reader Support
```html
<!-- Announce copy success -->
<div role="status" aria-live="polite" class="sr-only">
  {{ copySuccess ? 'Code copied to clipboard' : '' }}
</div>

<!-- Language information -->
<pre aria-label="TypeScript code example"><code>...</code></pre>
```

## Component API

### Basic Usage
```html
<CodeBlock
  [code]="sourceCode"
  language="typescript"
/>
```

### With Options
```html
<CodeBlock
  [code]="sourceCode"
  language="typescript"
  [showLineNumbers]="true"
  [highlightLines]="[3, 5, 6]"
  [filename]="'app.component.ts'"
  [collapsible]="true"
  [maxHeight]="400"
/>
```

### Props
```typescript
interface CodeBlockProps {
  code: string;
  language: SupportedLanguage;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  filename?: string;
  collapsible?: boolean;
  maxHeight?: number;
  showCopyButton?: boolean;
  theme?: 'auto' | 'light' | 'dark';
}
```

## Usage Patterns

### Simple Code Block
```html
<CodeBlock
  [code]="'console.log(\"Hello World\");'"
  language="typescript"
/>
```

### Installation Command
```html
<CodeBlock
  [code]="'npm install @shadcn-angular/button'"
  language="bash"
  [showCopyButton]="true"
/>
```

### Multi-File Example
```html
<Tabs>
  <TabsList>
    <TabsTrigger value="ts">TypeScript</TabsTrigger>
    <TabsTrigger value="html">Template</TabsTrigger>
    <TabsTrigger value="css">Styles</TabsTrigger>
  </TabsList>
  
  <TabsContent value="ts">
    <CodeBlock [code]="tsCode" language="typescript" />
  </TabsContent>
  
  <TabsContent value="html">
    <CodeBlock [code]="htmlCode" language="html" />
  </TabsContent>
  
  <TabsContent value="css">
    <CodeBlock [code]="cssCode" language="scss" />
  </TabsContent>
</Tabs>
```

### Diff View
```html
<CodeBlock
  [code]="diffCode"
  language="diff"
  [highlightLines]="{ added: [3, 4], removed: [1, 2] }"
/>
```

## Best Practices

### Do ✓
- Use appropriate language for syntax highlighting
- Include copy button for commands and code snippets
- Show file names when context is important
- Keep code blocks concise (< 50 lines)
- Use line highlighting for important sections
- Ensure code is properly formatted
- Test in both light and dark modes

### Don't ✗
- Don't use screenshots of code
- Don't omit language specification
- Don't use excessive line numbers for short snippets
- Don't make code blocks too wide (causes horizontal scroll)
- Don't use tiny font sizes
- Don't forget to escape HTML in examples

## Performance

### Code Splitting
```typescript
// Lazy load syntax highlighter
const highlighter = await import('shiki');
```

### Caching
```typescript
// Cache highlighted code
const highlightCache = new Map<string, string>();

function getHighlighted(code: string, lang: string) {
  const key = `${lang}:${code}`;
  if (highlightCache.has(key)) {
    return highlightCache.get(key);
  }
  const highlighted = highlight(code, lang);
  highlightCache.set(key, highlighted);
  return highlighted;
}
```

### Virtual Scrolling
For very large code blocks:
```typescript
// Only render visible lines
@Component({
  selector: 'CodeBlock',
  template: `
    <cdk-virtual-scroll-viewport [itemSize]="lineHeight">
      <div *cdkVirtualFor="let line of lines">
        {{ line }}
      </div>
    </cdk-virtual-scroll-viewport>
  `
})
```

## Maintenance

### Syntax Highlighting Library
- Use Shiki or Prism.js
- Keep themes updated
- Add new language support as needed
- Monitor bundle size

### Testing
- Test all supported languages
- Verify copy functionality
- Check mobile responsiveness
- Test with keyboard navigation
- Verify screen reader compatibility

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

### Planned Features
1. **Code Playground** - Live editing and preview
2. **Export Options** - Download code snippets
3. **Share Links** - Shareable URLs with code
4. **Annotations** - Inline explanatory comments
5. **Minimap** - For long code blocks
6. **Search** - Find within code blocks
7. **Breakpoints** - Visual debugging aids

### Under Consideration
- AI-powered explanations
- Version comparison
- Code formatting on paste
- Custom themes
- Integration with IDEs
