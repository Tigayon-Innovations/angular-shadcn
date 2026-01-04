import { Button } from '@/lib/components/ui/button';
import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { LucideAngularModule, Sparkles } from 'lucide-angular';

/**
 * AI theme generation component
 */
@Component({
  selector: 'AIGenerate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, LucideAngularModule],
  template: `
    <div class="space-y-4">
      <div>
        <h3 class="text-sm font-semibold mb-2">Generate Theme with AI</h3>
        <p class="text-xs text-muted-foreground mb-4">
          Describe the theme you want, and AI will generate the perfect color palette for you.
        </p>
      </div>

      <div class="space-y-3">
        <textarea
          [value]="prompt()"
          (input)="prompt.set($any($event.target).value)"
          placeholder="E.g., 'A modern, professional theme with blue accents and high contrast' or 'A warm, earthy theme for a coffee shop website'"
          class="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
        ></textarea>

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
          <div class="text-xs text-destructive">
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
              class="w-full text-left text-xs text-muted-foreground hover:text-foreground p-2 rounded border hover:border-foreground/20 transition-colors"
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
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDb_dqTMFOquZTVEprMYsjerYtFu-uywo4`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Generate a CSS color theme based on this description: "${this.prompt()}".

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "primary": { "light": "oklch(0.5 0.2 220)", "dark": "oklch(0.6 0.2 220)" },
  "secondary": { "light": "oklch(0.9 0.05 220)", "dark": "oklch(0.3 0.05 220)" },
  "accent": { "light": "oklch(0.7 0.15 320)", "dark": "oklch(0.6 0.15 320)" },
  "background": { "light": "oklch(1 0 0)", "dark": "oklch(0.15 0 0)" },
  "foreground": { "light": "oklch(0.15 0 0)", "dark": "oklch(0.98 0 0)" },
  "card": { "light": "oklch(1 0 0)", "dark": "oklch(0.2 0 0)" },
  "card-foreground": { "light": "oklch(0.15 0 0)", "dark": "oklch(0.98 0 0)" },
  "border": { "light": "oklch(0.92 0 0)", "dark": "oklch(0.27 0 0)" },
  "input": { "light": "oklch(0.92 0 0)", "dark": "oklch(0.27 0 0)" },
  "ring": { "light": "oklch(0.5 0.2 220)", "dark": "oklch(0.6 0.2 220)" },
  "muted": { "light": "oklch(0.97 0 0)", "dark": "oklch(0.2 0 0)" },
  "muted-foreground": { "light": "oklch(0.55 0 0)", "dark": "oklch(0.65 0 0)" },
  "primary-foreground": { "light": "oklch(0.98 0 0)", "dark": "oklch(0.15 0 0)" },
  "secondary-foreground": { "light": "oklch(0.15 0 0)", "dark": "oklch(0.98 0 0)" },
  "accent-foreground": { "light": "oklch(0.15 0 0)", "dark": "oklch(0.98 0 0)" }
}

Use OKLCH color format. Ensure good contrast and accessibility.`
              }]
            }]
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate theme');
      }

      const data = await response.json();
      const generatedText = data.candidates[0]?.content?.parts[0]?.text;

      if (!generatedText) {
        throw new Error('No response from AI');
      }

      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }

      const colors = JSON.parse(jsonMatch[0]);
      this.themeGenerated.emit(colors);
      this.prompt.set('');
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Failed to generate theme');
    } finally {
      this.isGenerating.set(false);
    }
  }
}
