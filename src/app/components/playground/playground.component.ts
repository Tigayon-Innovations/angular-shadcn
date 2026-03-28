import { CodeBlock } from '@/components/code-block';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { Code, Copy, Eye, LucideAngularModule, Play, RotateCcw, Sparkles } from 'lucide-angular';
import { DynamicPreview } from './dynamic-preview.component';

/**
 * Playground component for testing and previewing shadcn-angular code snippets.
 * Features:
 * - Code input with syntax highlighting
 * - Live HTML rendering preview
 * - Copy to clipboard functionality
 * - Reset functionality
 */
@Component({
  selector: 'Playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock, Button, LucideAngularModule, DynamicPreview],
  template: `
    <div [class]="computedClass()">
      <!-- Header -->
      <div class="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
        <div class="flex items-center gap-2">
          <lucide-icon [img]="icons.Sparkles" class="size-5 text-primary" />
          <h3 class="font-semibold">{{ title() }}</h3>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="ghost" size="sm" class="h-8 gap-2" (click)="resetCode()">
            <lucide-icon [img]="icons.RotateCcw" class="size-3.5" />
            Reset
          </Button>
          <Button variant="ghost" size="sm" class="h-8 gap-2" (click)="copyCode()">
            <lucide-icon [img]="icons.Copy" class="size-3.5" />
            {{ copied() ? 'Copied!' : 'Copy' }}
          </Button>
        </div>
      </div>

      <div class="grid lg:grid-cols-2">
        <!-- Code Editor Panel -->
        <div class="border-r border-border">
          <div class="flex items-center gap-2 border-b bg-muted/20 px-4 py-2">
            <lucide-icon [img]="icons.Code" class="size-4 text-muted-foreground" />
            <span class="text-sm font-medium text-muted-foreground">Code</span>
          </div>
          <div class="relative">
            <textarea
              #codeInput
              [value]="currentCode()"
              (input)="onCodeChange($event)"
              class="w-full min-h-[400px] resize-none bg-zinc-950 p-4 font-mono text-sm text-zinc-100 focus:outline-none placeholder:text-zinc-500"
              [placeholder]="placeholder()"
              spellcheck="false"
            ></textarea>
          </div>
        </div>

        <!-- Preview Panel -->
        <div class="flex flex-col">
          <div class="flex items-center gap-2 border-b bg-muted/20 px-4 py-2">
            <lucide-icon [img]="icons.Eye" class="size-4 text-muted-foreground" />
            <span class="text-sm font-medium text-muted-foreground">Preview</span>
          </div>
          <div class="flex-1 overflow-auto bg-background p-6">
            @if (currentCode().trim()) {
              <div class="preview-container">
                <DynamicPreview [template]="currentCode()" />
              </div>
            } @else {
              <div
                class="flex items-center justify-center h-full min-h-[350px] text-muted-foreground"
              >
                <div class="text-center space-y-2">
                  <lucide-icon [img]="icons.Play" class="size-12 mx-auto opacity-20" />
                  <p class="text-sm">Paste your code to see the preview</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Code Block Preview (collapsible) -->
      @if (showHighlightedCode() && currentCode().trim()) {
        <div class="border-t">
          <CodeBlock [code]="currentCode()" [language]="language()" [title]="'Highlighted Code'" />
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    /* Ensure preview styles don't leak */
    .preview-container {
      all: initial;
      display: block;
      font-family: inherit;
    }

    .preview-container * {
      font-family: inherit;
    }

    /* Code editor styling */
    textarea {
      tab-size: 2;
      line-height: 1.6;
    }
  `,
})
export class Playground {
  private platformId = inject(PLATFORM_ID);

  /** Title displayed in the header */
  readonly title = input<string>('Playground');

  /** Initial code to display */
  readonly initialCode = input<string>('');

  /** Placeholder text for the code input */
  readonly placeholder = input<string>(
    'Paste your shadcn-angular code here...\n\nExample:\n<div class="flex flex-wrap items-center gap-4">\n  <Button size="default">Default</Button>\n  <Button size="sm">Small</Button>\n</div>',
  );

  /** Language for syntax highlighting */
  readonly language = input<string>('html');

  /** Whether to show the highlighted code block */
  readonly showHighlightedCode = input<boolean>(false);

  /** Additional CSS classes */
  readonly class = input<string>('');

  /** Emits when code changes */
  readonly codeChange = output<string>();

  protected readonly icons = { Code, Copy, Eye, Play, RotateCcw, Sparkles };
  protected readonly copied = signal(false);
  protected readonly currentCode = signal('');

  private readonly codeInput = viewChild<ElementRef<HTMLTextAreaElement>>('codeInput');

  protected readonly computedClass = computed(() =>
    cn('rounded-lg border bg-card overflow-hidden', this.class()),
  );

  constructor() {
    // Set initial code when input changes
    effect(() => {
      const initial = this.initialCode();
      if (initial) {
        this.currentCode.set(initial);
      }
    });
  }

  protected onCodeChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.currentCode.set(target.value);
    this.codeChange.emit(target.value);
  }

  protected copyCode(): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(this.currentCode());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }

  protected resetCode(): void {
    this.currentCode.set(this.initialCode() || '');
    const input = this.codeInput();
    if (input) {
      input.nativeElement.value = this.currentCode();
    }
    this.codeChange.emit(this.currentCode());
  }
}
