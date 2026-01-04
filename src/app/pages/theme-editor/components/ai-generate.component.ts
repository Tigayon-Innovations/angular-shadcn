import { Button } from '@/lib/components/ui/button';
import { Label } from '@/lib/components/ui/label';
import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { LucideAngularModule, Sparkles } from 'lucide-angular';
import { GoogleAiService } from 'src/app/services';

/**
 * AI theme generation component
 */
@Component({
  selector: 'AIGenerate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Label, LucideAngularModule],
  template: `
    <div class="space-y-4">
      <div>
        <h3 class="text-sm font-semibold mb-2">Generate Theme with AI</h3>
        <p class="text-xs text-muted-foreground mb-4">
          Describe the theme you want, and AI will generate the perfect color palette for you.
        </p>
      </div>

      <div class="space-y-3">
        <div class="space-y-2">
          <Label class="text-xs">Theme Description</Label>
          <textarea
            [value]="prompt()"
            (input)="prompt.set($any($event.target).value)"
            placeholder="E.g., 'A modern, professional theme with blue accents and high contrast' or 'A warm, earthy theme for a coffee shop website'"
            class="flex field-sizing-content min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none"
          ></textarea>
        </div>

        <Button
          [disabled]="isGenerating() || !prompt().trim()"
          (click)="onGenerate()"
          class="w-full gap-2"
        >
          <lucide-icon [img]="icons.Sparkles" class="h-4 w-4" />
          @if (isGenerating()) {
            <span>Generating...</span>
          } @else {
            <span>Generate Theme</span>
          }
        </Button>

        @if (error()) {
          <div class="text-xs text-destructive bg-destructive/10 p-3 rounded-md">
            {{ error() }}
          </div>
        }
      </div>

      <div class="pt-4 border-t">
        <h4 class="text-xs font-semibold mb-2">Example Prompts</h4>
        <div class="space-y-2">
          @for (example of examples; track example) {
            <button
              type="button"
              class="w-full text-left text-xs text-muted-foreground hover:text-foreground p-2.5 rounded-md border bg-muted/30 hover:bg-muted hover:border-foreground/20 transition-colors"
              (click)="prompt.set(example)"
            >
              {{ example }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class AIGenerate {
  private readonly googleAi = inject(GoogleAiService);

  readonly themeGenerated = output<Record<string, { light: string; dark: string }>>();

  protected readonly icons = { Sparkles };
  protected readonly prompt = signal('');
  protected readonly isGenerating = signal(false);
  protected readonly error = signal('');

  protected readonly examples = [
    'A vibrant, energetic theme with orange and purple accents',
    'A minimalist, monochrome theme with subtle green highlights',
    'A dark, cyberpunk theme with neon blue and pink',
    'A warm, earthy theme for a bakery website',
  ];

  protected async onGenerate(): Promise<void> {
    if (!this.prompt().trim()) return;

    this.isGenerating.set(true);
    this.error.set('');

    try {
      const colors = await this.googleAi.generateTheme(this.prompt());
      this.themeGenerated.emit(colors);
      this.prompt.set('');
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Failed to generate theme');
    } finally {
      this.isGenerating.set(false);
    }
  }
}
