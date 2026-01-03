import { CodeBlock } from '@/components/code-block';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowLeft, ArrowRight, LucideAngularModule } from 'lucide-angular';

/**
 * Theming documentation page.
 */
@Component({
  selector: 'ThemingPage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, Separator, CodeBlock, LucideAngularModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">Theming</h1>
        <p class="text-lg text-muted-foreground mt-2">
          Using CSS variables for theming and customization.
        </p>
      </div>

      <Separator />

      <!-- Content -->
      <div class="space-y-8">
        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            CSS Variables
          </h2>
          <p class="leading-7">
            shadcn-angular uses CSS variables for theming. This makes it easy to customize
            the look and feel of the components by simply changing the variable values.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Default Theme
          </h2>
          <p class="leading-7">
            Here are the default CSS variables used for theming:
          </p>
          <CodeBlock
            [code]="defaultThemeCode"
            language="css"
          />
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Color Convention
          </h2>
          <p class="leading-7">
            We use a simple <code class="bg-muted px-1.5 py-0.5 rounded text-sm">background</code>
            and <code class="bg-muted px-1.5 py-0.5 rounded text-sm">foreground</code> convention
            for colors. The background variable is used for the background color of the
            component and the foreground variable is used for the text color.
          </p>
          <div class="grid gap-4 md:grid-cols-2 my-6">
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-background border"></div>
                <code class="text-sm">--background</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for the page background.</p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-foreground"></div>
                <code class="text-sm">--foreground</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for the main text color.</p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-primary"></div>
                <code class="text-sm">--primary</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for primary buttons and links.</p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-secondary"></div>
                <code class="text-sm">--secondary</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for secondary elements.</p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-muted"></div>
                <code class="text-sm">--muted</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for muted backgrounds.</p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-accent"></div>
                <code class="text-sm">--accent</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for accent highlights.</p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Adding New Colors
          </h2>
          <p class="leading-7">
            To add new colors, you need to add them to your CSS file and the Tailwind theme:
          </p>
          <CodeBlock
            [code]="addColorCode"
            language="css"
          />
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Other Color Formats
          </h2>
          <p class="leading-7">
            shadcn-angular uses OKLCH color format by default for better color manipulation
            and perceptual uniformity. You can also use other formats like HSL or RGB if
            preferred:
          </p>
          <CodeBlock
            [code]="otherFormatsCode"
            language="css"
          />
        </section>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between pt-8 border-t">
        <Button routerLink="/docs/installation" variant="outline" class="gap-2">
          <lucide-icon [img]="icons.ArrowLeft" class="h-4 w-4" />
          Installation
        </Button>
        <Button routerLink="/docs/dark-mode" variant="outline" class="gap-2">
          Dark Mode
          <lucide-icon [img]="icons.ArrowRight" class="h-4 w-4" />
        </Button>
      </div>
    </div>
  `,
})
export class ThemingPage {
  protected readonly icons = { ArrowRight, ArrowLeft };

  protected readonly defaultThemeCode = `:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;
}`;

  protected readonly addColorCode = `/* Add to your CSS */
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}

/* Add to @theme inline block */
@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}`;

  protected readonly otherFormatsCode = `/* HSL format */
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
}

/* RGB format */
:root {
  --background: 255 255 255;
  --foreground: 10 10 10;
}`;
}
