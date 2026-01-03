import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Check, Copy, LucideAngularModule } from 'lucide-angular';

// Token types for syntax highlighting
type TokenType =
  | 'keyword'
  | 'string'
  | 'number'
  | 'comment'
  | 'operator'
  | 'punctuation'
  | 'tag'
  | 'attribute'
  | 'value'
  | 'decorator'
  | 'type'
  | 'function'
  | 'variable'
  | 'property';

interface Token {
  type: TokenType | 'plain';
  content: string;
}

/**
 * Code block component with syntax highlighting and copy button.
 */
@Component({
  selector: 'CodeBlock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, LucideAngularModule],
  styles: `
    /* Syntax highlighting token styles */
    :host ::ng-deep {
      .token-keyword { color: oklch(0.7 0.15 280); font-weight: 500; }
      .token-string { color: oklch(0.7 0.15 140); }
      .token-number { color: oklch(0.75 0.15 60); }
      .token-comment { color: oklch(0.55 0 0); font-style: italic; }
      .token-operator { color: oklch(0.8 0.1 200); }
      .token-punctuation { color: oklch(0.6 0 0); }
      .token-tag { color: oklch(0.7 0.18 20); }
      .token-attribute { color: oklch(0.75 0.12 80); }
      .token-value { color: oklch(0.7 0.15 140); }
      .token-decorator { color: oklch(0.75 0.15 320); }
      .token-type { color: oklch(0.75 0.12 200); }
      .token-function { color: oklch(0.75 0.15 250); }
      .token-variable { color: oklch(0.85 0.08 220); }
      .token-property { color: oklch(0.8 0.1 180); }
    }

    :host-context(.dark) ::ng-deep {
      .token-keyword { color: oklch(0.75 0.18 280); }
      .token-string { color: oklch(0.78 0.16 140); }
      .token-number { color: oklch(0.8 0.16 60); }
      .token-comment { color: oklch(0.5 0 0); }
      .token-operator { color: oklch(0.85 0.1 200); }
      .token-punctuation { color: oklch(0.65 0 0); }
      .token-tag { color: oklch(0.75 0.2 20); }
      .token-attribute { color: oklch(0.8 0.14 80); }
      .token-value { color: oklch(0.78 0.16 140); }
      .token-decorator { color: oklch(0.8 0.16 320); }
      .token-type { color: oklch(0.8 0.14 200); }
      .token-function { color: oklch(0.8 0.16 250); }
      .token-variable { color: oklch(0.9 0.1 220); }
      .token-property { color: oklch(0.85 0.12 180); }
    }

    .line-number {
      user-select: none;
      color: oklch(0.5 0 0);
      text-align: right;
      padding-right: 1rem;
      min-width: 2.5rem;
    }

    :host-context(.dark) .line-number {
      color: oklch(0.45 0 0);
    }

    /* Code overflow handling */
    pre {
      overflow-wrap: anywhere;
      word-break: break-word;
    }
  `,
  template: `
    <div [class]="computedClass()">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-border/50 bg-muted/30 px-4 py-2.5">
        <div class="flex items-center gap-3">
          <!-- Language indicator with dot -->
          <div class="flex items-center gap-2">
            <span [class]="languageDotClass()"></span>
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {{ languageLabel() }}
            </span>
          </div>
          @if (filename()) {
            <span class="text-xs text-muted-foreground/70">{{ filename() }}</span>
          }
        </div>
        <Button
          variant="ghost"
          size="icon"
          class="h-7 w-7 hover:bg-muted"
          (click)="copyCode()"
        >
          @if (copied()) {
            <lucide-icon [img]="icons.Check" class="h-3.5 w-3.5 text-green-500" />
          } @else {
            <lucide-icon [img]="icons.Copy" class="h-3.5 w-3.5 text-muted-foreground" />
          }
          <span class="sr-only">Copy code</span>
        </Button>
      </div>

      <!-- Code content -->
      <div class="overflow-x-auto max-w-full">
        <pre class="p-4 text-[13px] leading-6 whitespace-pre-wrap break-all"><code [innerHTML]="highlightedCode()"></code></pre>
      </div>
    </div>
  `,
})
export class CodeBlock {
  readonly code = input<string>('');
  readonly language = input<string>('typescript');
  readonly filename = input<string>('');
  readonly showLineNumbers = input<boolean>(false);
  readonly class = input<string>('');

  protected readonly copied = signal(false);
  protected readonly icons = { Copy, Check };

  constructor(private sanitizer: DomSanitizer) {}

  protected readonly computedClass = computed(() =>
    cn(
      'relative rounded-xl border border-border/50 bg-[oklch(0.16_0_0)] dark:bg-[oklch(0.12_0_0)] font-mono overflow-hidden shadow-sm',
      this.class()
    )
  );

  protected readonly languageLabel = computed(() => {
    const lang = this.language().toLowerCase();
    const labels: Record<string, string> = {
      typescript: 'TypeScript',
      ts: 'TypeScript',
      javascript: 'JavaScript',
      js: 'JavaScript',
      html: 'HTML',
      css: 'CSS',
      scss: 'SCSS',
      json: 'JSON',
      bash: 'Bash',
      shell: 'Shell',
      angular: 'Angular',
    };
    return labels[lang] || lang;
  });

  protected readonly languageDotClass = computed(() => {
    const lang = this.language().toLowerCase();
    const colors: Record<string, string> = {
      typescript: 'bg-blue-500',
      ts: 'bg-blue-500',
      javascript: 'bg-yellow-500',
      js: 'bg-yellow-500',
      html: 'bg-orange-500',
      css: 'bg-purple-500',
      scss: 'bg-pink-500',
      json: 'bg-green-500',
      bash: 'bg-gray-500',
      shell: 'bg-gray-500',
      angular: 'bg-red-500',
    };
    return cn('w-2.5 h-2.5 rounded-full', colors[lang] || 'bg-gray-500');
  });

  protected readonly highlightedCode = computed((): SafeHtml => {
    const code = this.code();
    const lang = this.language().toLowerCase();

    let highlighted: string;
    if (lang === 'typescript' || lang === 'ts' || lang === 'javascript' || lang === 'js') {
      highlighted = this.highlightTypeScript(code);
    } else if (lang === 'html' || lang === 'angular') {
      highlighted = this.highlightHTML(code);
    } else if (lang === 'css' || lang === 'scss') {
      highlighted = this.highlightCSS(code);
    } else if (lang === 'json') {
      highlighted = this.highlightJSON(code);
    } else {
      highlighted = this.escapeHtml(code);
    }

    if (this.showLineNumbers()) {
      highlighted = this.addLineNumbers(highlighted);
    }

    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  });

  private highlightTypeScript(code: string): string {
    let result = this.escapeHtml(code);

    // Comments (must be first to avoid conflicts)
    result = result.replace(/(\/\/.*$)/gm, '<span class="token-comment">$1</span>');
    result = result.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token-comment">$1</span>');

    // Decorators
    result = result.replace(/(@\w+)/g, '<span class="token-decorator">$1</span>');

    // Strings (single and double quotes, template literals)
    result = result.replace(/(`[^`]*`)/g, '<span class="token-string">$1</span>');
    result = result.replace(/(&#39;[^&#39;]*&#39;)/g, '<span class="token-string">$1</span>');
    result = result.replace(/(&quot;[^&quot;]*&quot;)/g, '<span class="token-string">$1</span>');
    result = result.replace(/('[^']*')/g, '<span class="token-string">$1</span>');
    result = result.replace(/("[^"]*")/g, '<span class="token-string">$1</span>');

    // Keywords
    const keywords = [
      'import', 'export', 'from', 'const', 'let', 'var', 'function', 'class',
      'extends', 'implements', 'interface', 'type', 'enum', 'return', 'if',
      'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
      'default', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super',
      'true', 'false', 'null', 'undefined', 'void', 'typeof', 'instanceof',
      'async', 'await', 'static', 'public', 'private', 'protected', 'readonly',
      'abstract', 'as', 'in', 'of', 'get', 'set', 'constructor', 'declare',
      'module', 'namespace', 'require', 'yield', 'delete',
    ];
    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    result = result.replace(keywordRegex, '<span class="token-keyword">$1</span>');

    // Types (capitalized words that are common types)
    const types = [
      'string', 'number', 'boolean', 'any', 'unknown', 'never', 'object',
      'Array', 'Object', 'String', 'Number', 'Boolean', 'Promise', 'Observable',
      'Signal', 'Component', 'Directive', 'Injectable', 'Pipe', 'NgModule',
      'Input', 'Output', 'EventEmitter', 'TemplateRef', 'ViewChild', 'ContentChild',
    ];
    const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
    result = result.replace(typeRegex, '<span class="token-type">$1</span>');

    // Numbers
    result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="token-number">$1</span>');

    // Operators
    result = result.replace(/([=+\-*/%<>!&|^~?:]+)/g, '<span class="token-operator">$1</span>');

    // Fix over-highlighting in already highlighted sections
    result = this.cleanupHighlighting(result);

    return result;
  }

  private highlightHTML(code: string): string {
    let result = this.escapeHtml(code);

    // Comments
    result = result.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="token-comment">$1</span>');

    // Angular template syntax
    result = result.replace(/(@(?:if|for|switch|case|default|else|empty|defer|placeholder|loading|error)\b)/g, '<span class="token-keyword">$1</span>');

    // Angular bindings
    result = result.replace(/(\[[\w.]+\])/g, '<span class="token-attribute">$1</span>');
    result = result.replace(/(\([\w.]+\))/g, '<span class="token-attribute">$1</span>');
    result = result.replace(/(\[\([\w.]+\)\])/g, '<span class="token-attribute">$1</span>');

    // Tag names (including Angular components with capital letters)
    result = result.replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="token-tag">$2</span>');

    // Attributes
    result = result.replace(/\s([\w-]+)(=)/g, ' <span class="token-attribute">$1</span>$2');

    // Attribute values (strings)
    result = result.replace(/(&quot;[^&quot;]*&quot;)/g, '<span class="token-string">$1</span>');
    result = result.replace(/('[^']*')/g, '<span class="token-string">$1</span>');

    return result;
  }

  private highlightCSS(code: string): string {
    let result = this.escapeHtml(code);

    // Comments
    result = result.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token-comment">$1</span>');

    // Strings
    result = result.replace(/('[^']*')/g, '<span class="token-string">$1</span>');
    result = result.replace(/("[^"]*")/g, '<span class="token-string">$1</span>');

    // At-rules
    result = result.replace(/(@[\w-]+)/g, '<span class="token-keyword">$1</span>');

    // Properties
    result = result.replace(/([\w-]+)(\s*:)/g, '<span class="token-property">$1</span>$2');

    // Values (colors, sizes, etc.)
    result = result.replace(/(#[a-fA-F0-9]{3,8})\b/g, '<span class="token-value">$1</span>');
    result = result.replace(/\b(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|deg|s|ms)?)\b/g, '<span class="token-number">$1</span>');

    // Selectors (class, id)
    result = result.replace(/(\.[\w-]+)/g, '<span class="token-tag">$1</span>');
    result = result.replace(/(#[\w-]+)(?!\d)/g, '<span class="token-tag">$1</span>');

    return result;
  }

  private highlightJSON(code: string): string {
    let result = this.escapeHtml(code);

    // Strings (keys and values)
    result = result.replace(/(&quot;[^&quot;]*&quot;)(\s*:)/g, '<span class="token-property">$1</span>$2');
    result = result.replace(/:\s*(&quot;[^&quot;]*&quot;)/g, ': <span class="token-string">$1</span>');

    // Numbers
    result = result.replace(/:\s*(\d+\.?\d*)/g, ': <span class="token-number">$1</span>');

    // Booleans and null
    result = result.replace(/:\s*(true|false|null)\b/g, ': <span class="token-keyword">$1</span>');

    return result;
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private cleanupHighlighting(html: string): string {
    // Remove nested spans that might occur from multiple passes
    return html.replace(/<span class="[^"]*"><span class="([^"]*)">/g, '<span class="$1">');
  }

  private addLineNumbers(html: string): string {
    const lines = html.split('\n');
    return lines
      .map((line, i) => `<span class="line-number">${i + 1}</span>${line}`)
      .join('\n');
  }

  protected copyCode(): void {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }
}
