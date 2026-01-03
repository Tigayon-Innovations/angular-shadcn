import { cn } from '@/lib/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Check, Clipboard, LucideAngularModule } from 'lucide-angular';
import { codeToHtml } from 'shiki';

/**
 * Code block component with VS Code-like syntax highlighting powered by Shiki.
 * Styled like Vercel/Next.js documentation.
 */
@Component({
  selector: 'CodeBlock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  styles: `
    :host {
      display: block;
    }

    /* Shiki code block styles - Vercel/Next.js style */
    :host ::ng-deep {
      pre {
        margin: 0;
        padding: 0;
        overflow-x: auto;
        font-family: 'Fira Code', 'Geist Mono', 'JetBrains Mono', Consolas, Monaco, monospace;
        font-size: 13px;
        line-height: 1;
        tab-size: 2;
        background: transparent !important;
        font-feature-settings: 'calt' 1, 'liga' 1;
      }

      code {
        font-family: inherit;
        background: transparent;
        display: block;
        padding: 0.5rem 0;
      }

      .line {
        display: block;
        padding: 0 1rem 0 0;
        min-height: 1.2em;
      }

      /* Line numbers styling */
      .line-number {
        display: inline-block;
        width: 3rem;
        padding-right: 1rem;
        text-align: right;
        color: #4b5563;
        user-select: none;
        font-size: 12px;
      }

      /* Remove all italics from code block */
      pre,
      code,
      span {
        font-style: normal !important;
      }
    }
  `,
  template: `
    <div [class]="computedClass()" class="py-6">
      <!-- Code content with copy button -->
      <div class="relative group">
        <!-- Copy button - absolute positioned -->
        <button
          type="button"
          (click)="copyCode()"
          [class]="copyButtonClass()"
          [attr.aria-label]="copied() ? 'Copied!' : 'Copy code'"
        >
          @if (copied()) {
            <lucide-icon [img]="icons.Check" class="size-4" />
          } @else {
            <lucide-icon [img]="icons.Clipboard" class="size-4" />
          }
        </button>

        <!-- Code block -->
        <div class="overflow-x-auto">
          @if (isLoading()) {
            <div class="p-4 text-sm text-zinc-500 font-mono">
              <pre><code>{{ code() }}</code></pre>
            </div>
          } @else {
            <div [innerHTML]="highlightedHtml()"></div>
          }
        </div>
      </div>
    </div>
  `,
})
export class CodeBlock {
  readonly code = input<string>('');
  readonly language = input<string>('typescript');
  readonly filename = input<string>('');
  readonly showLineNumbers = input<boolean>(true);
  readonly class = input<string>('');

  protected readonly copied = signal(false);
  protected readonly isLoading = signal(true);
  protected readonly highlightedHtml = signal<SafeHtml>('');
  protected readonly icons = { Clipboard, Check };

  constructor(private sanitizer: DomSanitizer) {
    // Effect to highlight code when inputs change
    effect(() => {
      const code = this.code();
      const lang = this.language();
      const showLines = this.showLineNumbers();

      if (code) {
        this.highlightCode(code, lang, showLines);
      } else {
        this.isLoading.set(false);
      }
    });
  }

  protected readonly computedClass = computed(() =>
    cn(
      'relative rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden font-mono',
      this.class()
    )
  );

  protected readonly copyButtonClass = computed(() =>
    cn(
      'absolute right-3 top-3 z-10',
      'flex items-center justify-center',
      'size-8 rounded-md',
      'bg-zinc-800/80 hover:bg-zinc-700',
      'text-zinc-400 hover:text-zinc-100',
      'border border-zinc-700/50',
      'opacity-0 group-hover:opacity-100',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950',
      this.copied() && 'text-green-400 hover:text-green-400'
    )
  );

  private async highlightCode(code: string, lang: string, showLineNumbers: boolean): Promise<void> {
    this.isLoading.set(true);

    try {
      // Map language aliases
      const langMap: Record<string, string> = {
        ts: 'typescript',
        js: 'javascript',
        angular: 'angular-html',
        shell: 'bash',
        sh: 'bash',
      };
      const mappedLang = langMap[lang.toLowerCase()] || lang.toLowerCase();

      // Use GitHub Dark theme for Vercel/Next.js style
      const html = await codeToHtml(code, {
        lang: mappedLang,
        theme: 'github-dark',
        transformers: showLineNumbers ? [{
          line(node, line) {
            // Add line numbers
            const lineNumber = {
              type: 'element' as const,
              tagName: 'span',
              properties: { class: 'line-number' },
              children: [{ type: 'text' as const, value: String(line) }],
            };
            node.children.unshift(lineNumber as any);
          },
        }] : [],
      });

      this.highlightedHtml.set(this.sanitizer.bypassSecurityTrustHtml(html));
    } catch (error) {
      // Fallback to plain text if highlighting fails
      console.warn('Shiki highlighting failed, using fallback:', error);
      const escaped = this.escapeHtml(code);
      const fallbackHtml = `<pre class="p-4"><code>${escaped}</code></pre>`;
      this.highlightedHtml.set(this.sanitizer.bypassSecurityTrustHtml(fallbackHtml));
    } finally {
      this.isLoading.set(false);
    }
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  protected copyCode(): void {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }
}
