import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { Check, Copy, LucideAngularModule } from 'lucide-angular';

/**
 * Code block component with syntax highlighting and copy button.
 */
@Component({
  selector: 'CodeBlock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, LucideAngularModule],
  template: `
    <div [class]="computedClass()">
      <div class="flex items-center justify-between border-b border-border px-4 py-2">
        <span class="text-xs text-muted-foreground">{{ language() }}</span>
        <Button
          variant="ghost"
          size="icon"
          class="h-7 w-7"
          (click)="copyCode()"
        >
          @if (copied()) {
            <lucide-icon [img]="icons.Check" class="h-3.5 w-3.5 text-green-500" />
          } @else {
            <lucide-icon [img]="icons.Copy" class="h-3.5 w-3.5" />
          }
          <span class="sr-only">Copy code</span>
        </Button>
      </div>
      <div class="overflow-x-auto">
        <pre class="p-4 text-sm"><code [class]="'language-' + language()">{{ code() }}</code></pre>
      </div>
    </div>
  `,
})
export class CodeBlock {
  readonly code = input<string>('');
  readonly language = input<string>('typescript');
  readonly class = input<string>('');

  protected readonly copied = signal(false);
  protected readonly icons = { Copy, Check };

  protected readonly computedClass = computed(() =>
    cn(
      'relative rounded-lg border bg-muted/50 font-mono',
      this.class()
    )
  );

  protected copyCode(): void {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }
}
