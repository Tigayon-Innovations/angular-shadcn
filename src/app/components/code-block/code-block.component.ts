import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/lib/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Check, Clipboard, FileCode, LucideAngularModule, MoreVertical } from 'lucide-angular';
import { codeToHtml } from 'shiki';

/**
 * Code block component with VS Code-like syntax highlighting powered by Shiki.
 * Styled like Vercel/Next.js documentation with title bar.
 */
@Component({
  selector: 'CodeBlock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucideAngularModule,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  ],
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
        line-height: 0.5;
        tab-size: 2;
        background: transparent !important;
        font-feature-settings:
          'calt' 1,
          'liga' 1;
      }

      code {
        font-family: inherit;
        background: transparent;
        display: block;
        padding: 1rem 0;
      }

      .line {
        display: block;
        padding: 0 1rem;
        min-height: 1.5em;
      }

      /* Line numbers styling */
      .line-number {
        display: inline-block;
        width: 2.5rem;
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

      /* Transparency for special characters like brackets, punctuation */
      .punctuation,
      [style*='color:#9ECBFF'] + span[style*='color:#E1E4E8'],
      span[style*='color:#E1E4E8']:has(+ span) {
        opacity: 0.6;
      }
    }

    /* Wrap long lines when enabled */
    :host.wrap-lines ::ng-deep {
      pre {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  `,
  template: `
    <div [class]="computedClass()">
      <!-- Header bar with title and actions -->
      <div
        class="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50"
      >
        <div class="flex items-center gap-2 text-zinc-400">
          <lucide-icon [img]="icons.FileCode" class="size-4" />
          <span class="text-sm font-medium">{{ displayTitle() }}</span>
        </div>
        <div class="flex items-center gap-1">
          <!-- Copy button -->
          <button
            type="button"
            (click)="copyCode()"
            class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            @if (copied()) {
              <lucide-icon [img]="icons.Check" class="size-3.5 text-green-400" />
              <span>Copied!</span>
            } @else {
              <lucide-icon [img]="icons.Clipboard" class="size-3.5" />
              <span>Copy</span>
            }
          </button>
          <!-- Options dropdown -->
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button
                type="button"
                class="flex items-center justify-center size-8 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
              >
                <lucide-icon [img]="icons.MoreVertical" class="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent [align]="'end'" class="w-48">
              <DropdownMenuItem (click)="toggleDarkTheme()">
                <div class="flex items-center justify-between w-full">
                  <span>Use dark theme</span>
                  <input
                    type="checkbox"
                    [checked]="useDarkTheme()"
                    class="h-4 w-4 rounded border-input"
                  />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem (click)="toggleWrapLines()">
                <div class="flex items-center justify-between w-full">
                  <span>Wrap long lines</span>
                  <input
                    type="checkbox"
                    [checked]="wrapLines()"
                    class="h-4 w-4 rounded border-input"
                  />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <!-- Code content -->
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
  `,
  host: {
    '[class.wrap-lines]': 'wrapLines()',
  },
})
export class CodeBlock {
  readonly code = input<string>('');
  readonly language = input<string>('typescript');
  readonly filename = input<string>('');
  readonly title = input<string>('');
  readonly showLineNumbers = input<boolean>(true);
  readonly class = input<string>('');

  protected readonly copied = signal(false);
  protected readonly isLoading = signal(true);
  protected readonly highlightedHtml = signal<SafeHtml>('');
  protected readonly useDarkTheme = signal(true);
  protected readonly wrapLines = signal(false);
  protected readonly icons = { Clipboard, Check, MoreVertical, FileCode };

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

  protected readonly displayTitle = computed(() => {
    if (this.title()) return this.title();
    if (this.filename()) return this.filename();
    // Capitalize language name
    const lang = this.language();
    return lang.charAt(0).toUpperCase() + lang.slice(1);
  });

  protected readonly computedClass = computed(() =>
    cn(
      'relative rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden font-mono',
      this.class(),
    ),
  );

  protected toggleDarkTheme(): void {
    this.useDarkTheme.update((v) => !v);
  }

  protected toggleWrapLines(): void {
    this.wrapLines.update((v) => !v);
  }

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
        transformers: showLineNumbers
          ? [
              {
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
              },
            ]
          : [],
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
