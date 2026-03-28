import { CodeBlock } from '@/components/code-block';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Separator } from '@/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Globe,
  LucideAngularModule,
  Moon,
  Palette,
  Sparkles,
  Sun,
} from 'lucide-angular';

interface ThemePalette {
  name: string;
  description: string;
  icon: string;
  light: ThemeColors;
  dark: ThemeColors;
}

interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

/**
 * Theming documentation page with comprehensive theming guide and popular palettes.
 */
@Component({
  selector: 'ThemingPage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    Button,
    Separator,
    CodeBlock,
    LucideAngularModule,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  ],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">Theming</h1>
        <p class="text-lg text-muted-foreground mt-2">
          Theme with CSS variables. Change a few values, and everything follows.
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
            Themes are just CSS variables. Update them once, and components stay in sync across your
            app. This system uses <strong>OKLCH color space</strong> for better perceptual
            uniformity and wider color gamut support.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Default Theme
          </h2>
          <p class="leading-7">Start here. These are the defaults that come with ng-cn:</p>
          <CodeBlock [code]="defaultThemeCode" language="css" />
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Color Convention
          </h2>
          <p class="leading-7">
            We use a simple
            <code class="bg-muted px-1.5 py-0.5 rounded text-sm">background</code> and
            <code class="bg-muted px-1.5 py-0.5 rounded text-sm">foreground</code> convention for
            colors. <code class="bg-muted px-1.5 py-0.5 rounded text-sm">background</code> sets the
            surface. <code class="bg-muted px-1.5 py-0.5 rounded text-sm">foreground</code>
            sets the text.
          </p>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-6">
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-background border"></div>
                <code class="text-sm">--background</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for page surfaces.</p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-foreground"></div>
                <code class="text-sm">--foreground</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for primary text.</p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-primary"></div>
                <code class="text-sm">--primary</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for key actions.</p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-secondary"></div>
                <code class="text-sm">--secondary</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for supporting UI.</p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-muted"></div>
                <code class="text-sm">--muted</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for subtle surfaces.</p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-accent"></div>
                <code class="text-sm">--accent</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for emphasis.</p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-destructive"></div>
                <code class="text-sm">--destructive</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for errors and deletions.</p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-border"></div>
                <code class="text-sm">--border</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for borders.</p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded bg-ring"></div>
                <code class="text-sm">--ring</code>
              </div>
              <p class="text-sm text-muted-foreground">Used for focus rings.</p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Custom Theme Configuration
          </h2>
          <p class="leading-7">
            To create a custom theme, you'll need to modify the CSS variables in your
            <code class="bg-muted px-1.5 py-0.5 rounded text-sm">ng-cn.scss</code> file. The file
            structure includes three main parts:
          </p>

          <div class="grid gap-4 my-6">
            <Card>
              <CardHeader>
                <CardTitle class="text-lg">1. CSS Variables (:root and .dark)</CardTitle>
                <CardDescription>Define your color palette</CardDescription>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground mb-4">
                  Set your colors using OKLCH format for perceptual uniformity:
                </p>
                <CodeBlock [code]="customThemeVariablesCode" language="css" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="text-lg">2. Tailwind Theme Mapping (&#64;theme inline)</CardTitle>
                <CardDescription>Map CSS variables to Tailwind classes</CardDescription>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground mb-4">
                  This block connects your CSS variables to Tailwind utility classes:
                </p>
                <CodeBlock [code]="tailwindThemeMappingCode" language="css" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="text-lg">3. Base Layer (&#64;layer base)</CardTitle>
                <CardDescription>Apply default styles</CardDescription>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground mb-4">
                  Set up base styles that apply theme colors globally:
                </p>
                <CodeBlock [code]="baseLayerCode" language="css" />
              </CardContent>
            </Card>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Adding New Colors
          </h2>
          <p class="leading-7">Add a variable in CSS, then map it into Tailwind's theme block:</p>
          <CodeBlock [code]="addColorCode" language="css" />
          <p class="leading-7 mt-4">
            Now you can use <code class="bg-muted px-1.5 py-0.5 rounded text-sm">bg-warning</code>,
            <code class="bg-muted px-1.5 py-0.5 rounded text-sm">text-warning-foreground</code>,
            etc.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Understanding OKLCH
          </h2>
          <p class="leading-7">
            OKLCH is a perceptually uniform color space that makes it easier to create harmonious
            color palettes. The format is:
          </p>
          <CodeBlock [code]="oklchExplanationCode" language="css" />
          <div class="grid gap-4 md:grid-cols-3 my-6">
            <div class="rounded-lg border p-4 space-y-2">
              <h4 class="font-semibold">Lightness (L)</h4>
              <p class="text-sm text-muted-foreground">
                0 = black, 1 = white. Controls how light or dark the color appears.
              </p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <h4 class="font-semibold">Chroma (C)</h4>
              <p class="text-sm text-muted-foreground">
                0 = gray, higher = more saturated. Controls color intensity.
              </p>
            </div>
            <div class="rounded-lg border p-4 space-y-2">
              <h4 class="font-semibold">Hue (H)</h4>
              <p class="text-sm text-muted-foreground">
                0-360 degrees. Red ≈ 30, Orange ≈ 70, Yellow ≈ 100, Green ≈ 140, Blue ≈ 260.
              </p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Other Color Formats
          </h2>
          <p class="leading-7">
            OKLCH is the default for consistent, modern color. Prefer HSL or RGB? That's fine too:
          </p>
          <CodeBlock [code]="otherFormatsCode" language="css" />
        </section>

        <!-- Popular Palettes Section -->
        <section class="space-y-4">
          <div class="flex items-center gap-2">
            <lucide-icon [img]="icons.Palette" class="h-6 w-6" />
            <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight flex-1">
              Popular Website Palettes
            </h2>
          </div>
          <p class="leading-7">
            Get started quickly with color palettes inspired by popular websites and apps. Click on
            a palette to copy the CSS variables to your clipboard.
          </p>

          <Tabs defaultValue="shadcn" class="w-full">
            <TabsList class="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-7 h-auto">
              @for (palette of palettes; track palette.name) {
                <TabsTrigger
                  [value]="palette.name.toLowerCase().replace(' ', '-')"
                  class="text-xs px-2 py-2"
                >
                  {{ palette.name }}
                </TabsTrigger>
              }
            </TabsList>

            @for (palette of palettes; track palette.name) {
              <TabsContent [value]="palette.name.toLowerCase().replace(' ', '-')" class="mt-6">
                <Card>
                  <CardHeader>
                    <div class="flex items-center justify-between">
                      <div>
                        <CardTitle>{{ palette.name }} Theme</CardTitle>
                        <CardDescription>{{ palette.description }}</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        (click)="copyPalette(palette)"
                        class="gap-2"
                      >
                        @if (copiedPalette() === palette.name) {
                          <lucide-icon [img]="icons.Check" class="h-4 w-4" />
                          Copied!
                        } @else {
                          <lucide-icon [img]="icons.Copy" class="h-4 w-4" />
                          Copy CSS
                        }
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent class="space-y-6">
                    <!-- Preview -->
                    <div class="grid gap-4 md:grid-cols-2">
                      <div class="space-y-2">
                        <div class="flex items-center gap-2 text-sm font-medium">
                          <lucide-icon [img]="icons.Sun" class="h-4 w-4" />
                          Light Mode
                        </div>
                        <div
                          class="rounded-lg p-4 space-y-3"
                          [style.background]="palette.light.background"
                          [style.color]="palette.light.foreground"
                        >
                          <div
                            class="rounded-md p-3"
                            [style.background]="palette.light.card"
                            [style.border]="'1px solid ' + palette.light.border"
                          >
                            <p
                              class="text-sm font-medium"
                              [style.color]="palette.light.cardForeground"
                            >
                              Card Title
                            </p>
                            <p class="text-xs" [style.color]="palette.light.mutedForeground">
                              Card description text
                            </p>
                          </div>
                          <div class="flex gap-2">
                            <div
                              class="px-3 py-1.5 rounded-md text-xs font-medium"
                              [style.background]="palette.light.primary"
                              [style.color]="palette.light.primaryForeground"
                            >
                              Primary
                            </div>
                            <div
                              class="px-3 py-1.5 rounded-md text-xs font-medium"
                              [style.background]="palette.light.secondary"
                              [style.color]="palette.light.secondaryForeground"
                            >
                              Secondary
                            </div>
                            <div
                              class="px-3 py-1.5 rounded-md text-xs font-medium"
                              [style.background]="palette.light.destructive"
                              [style.color]="palette.light.destructiveForeground"
                            >
                              Destructive
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="space-y-2">
                        <div class="flex items-center gap-2 text-sm font-medium">
                          <lucide-icon [img]="icons.Moon" class="h-4 w-4" />
                          Dark Mode
                        </div>
                        <div
                          class="rounded-lg p-4 space-y-3"
                          [style.background]="palette.dark.background"
                          [style.color]="palette.dark.foreground"
                        >
                          <div
                            class="rounded-md p-3"
                            [style.background]="palette.dark.card"
                            [style.border]="'1px solid ' + palette.dark.border"
                          >
                            <p
                              class="text-sm font-medium"
                              [style.color]="palette.dark.cardForeground"
                            >
                              Card Title
                            </p>
                            <p class="text-xs" [style.color]="palette.dark.mutedForeground">
                              Card description text
                            </p>
                          </div>
                          <div class="flex gap-2">
                            <div
                              class="px-3 py-1.5 rounded-md text-xs font-medium"
                              [style.background]="palette.dark.primary"
                              [style.color]="palette.dark.primaryForeground"
                            >
                              Primary
                            </div>
                            <div
                              class="px-3 py-1.5 rounded-md text-xs font-medium"
                              [style.background]="palette.dark.secondary"
                              [style.color]="palette.dark.secondaryForeground"
                            >
                              Secondary
                            </div>
                            <div
                              class="px-3 py-1.5 rounded-md text-xs font-medium"
                              [style.background]="palette.dark.destructive"
                              [style.color]="palette.dark.destructiveForeground"
                            >
                              Destructive
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Color Swatches -->
                    <div class="space-y-2">
                      <h4 class="text-sm font-medium">Color Swatches</h4>
                      <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
                        <div class="space-y-1">
                          <div
                            class="h-8 rounded"
                            [style.background]="palette.light.background"
                            [style.border]="'1px solid ' + palette.light.border"
                          ></div>
                          <p class="text-[10px] text-muted-foreground text-center">Background</p>
                        </div>
                        <div class="space-y-1">
                          <div
                            class="h-8 rounded"
                            [style.background]="palette.light.foreground"
                          ></div>
                          <p class="text-[10px] text-muted-foreground text-center">Foreground</p>
                        </div>
                        <div class="space-y-1">
                          <div class="h-8 rounded" [style.background]="palette.light.primary"></div>
                          <p class="text-[10px] text-muted-foreground text-center">Primary</p>
                        </div>
                        <div class="space-y-1">
                          <div
                            class="h-8 rounded"
                            [style.background]="palette.light.secondary"
                          ></div>
                          <p class="text-[10px] text-muted-foreground text-center">Secondary</p>
                        </div>
                        <div class="space-y-1">
                          <div class="h-8 rounded" [style.background]="palette.light.muted"></div>
                          <p class="text-[10px] text-muted-foreground text-center">Muted</p>
                        </div>
                        <div class="space-y-1">
                          <div class="h-8 rounded" [style.background]="palette.light.accent"></div>
                          <p class="text-[10px] text-muted-foreground text-center">Accent</p>
                        </div>
                        <div class="space-y-1">
                          <div
                            class="h-8 rounded"
                            [style.background]="palette.light.destructive"
                          ></div>
                          <p class="text-[10px] text-muted-foreground text-center">Destructive</p>
                        </div>
                        <div class="space-y-1">
                          <div class="h-8 rounded" [style.background]="palette.light.border"></div>
                          <p class="text-[10px] text-muted-foreground text-center">Border</p>
                        </div>
                        <div class="space-y-1">
                          <div class="h-8 rounded" [style.background]="palette.light.ring"></div>
                          <p class="text-[10px] text-muted-foreground text-center">Ring</p>
                        </div>
                      </div>
                    </div>

                    <!-- CSS Code -->
                    <div class="space-y-2">
                      <h4 class="text-sm font-medium">CSS Variables</h4>
                      <CodeBlock [code]="generatePaletteCSS(palette)" language="css" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            }
          </Tabs>
        </section>

        <section class="space-y-4">
          <h2 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Tips for Custom Themes
          </h2>
          <div class="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle class="text-base flex items-center gap-2">
                  <lucide-icon [img]="icons.Sparkles" class="h-4 w-4" />
                  Maintain Contrast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground">
                  Always ensure sufficient contrast between background and foreground colors. Use
                  tools like WebAIM's contrast checker to verify accessibility.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle class="text-base flex items-center gap-2">
                  <lucide-icon [img]="icons.Globe" class="h-4 w-4" />
                  Test Both Modes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground">
                  Always define colors for both light and dark modes. Test your theme thoroughly in
                  both modes to ensure consistency.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle class="text-base flex items-center gap-2">
                  <lucide-icon [img]="icons.Palette" class="h-4 w-4" />
                  Use OKLCH
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground">
                  OKLCH provides perceptually uniform colors. Adjusting lightness values will give
                  predictable results across all hues.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle class="text-base flex items-center gap-2">
                  <lucide-icon [img]="icons.Sun" class="h-4 w-4" />
                  Semantic Naming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground">
                  Use semantic names like "primary" and "destructive" instead of color names like
                  "blue" and "red" for better maintainability.
                </p>
              </CardContent>
            </Card>
          </div>
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
  protected readonly icons = {
    ArrowRight,
    ArrowLeft,
    Check,
    Copy,
    Palette,
    Sun,
    Moon,
    Globe,
    Sparkles,
  };

  protected copiedPalette = signal<string | null>(null);

  protected readonly palettes: ThemePalette[] = [
    {
      name: 'shadcn',
      description: 'The default shadcn/ui theme - clean, minimal, and professional',
      icon: 'default',
      light: {
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0.145 0 0)',
        card: 'oklch(1 0 0)',
        cardForeground: 'oklch(0.145 0 0)',
        popover: 'oklch(1 0 0)',
        popoverForeground: 'oklch(0.145 0 0)',
        primary: 'oklch(0.205 0 0)',
        primaryForeground: 'oklch(0.985 0 0)',
        secondary: 'oklch(0.97 0 0)',
        secondaryForeground: 'oklch(0.205 0 0)',
        muted: 'oklch(0.97 0 0)',
        mutedForeground: 'oklch(0.556 0 0)',
        accent: 'oklch(0.97 0 0)',
        accentForeground: 'oklch(0.205 0 0)',
        destructive: 'oklch(0.577 0.245 27.325)',
        destructiveForeground: 'oklch(0.985 0 0)',
        border: 'oklch(0.922 0 0)',
        input: 'oklch(0.922 0 0)',
        ring: 'oklch(0.708 0 0)',
      },
      dark: {
        background: 'oklch(0.145 0 0)',
        foreground: 'oklch(0.985 0 0)',
        card: 'oklch(0.205 0 0)',
        cardForeground: 'oklch(0.985 0 0)',
        popover: 'oklch(0.205 0 0)',
        popoverForeground: 'oklch(0.985 0 0)',
        primary: 'oklch(0.985 0 0)',
        primaryForeground: 'oklch(0.205 0 0)',
        secondary: 'oklch(0.269 0 0)',
        secondaryForeground: 'oklch(0.985 0 0)',
        muted: 'oklch(0.269 0 0)',
        mutedForeground: 'oklch(0.708 0 0)',
        accent: 'oklch(0.269 0 0)',
        accentForeground: 'oklch(0.985 0 0)',
        destructive: 'oklch(0.396 0.141 25.723)',
        destructiveForeground: 'oklch(0.985 0 0)',
        border: 'oklch(0.269 0 0)',
        input: 'oklch(0.269 0 0)',
        ring: 'oklch(0.439 0 0)',
      },
    },
    {
      name: 'GitHub',
      description: "Inspired by GitHub's clean developer-focused design",
      icon: 'github',
      light: {
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0.208 0.042 265.755)',
        card: 'oklch(1 0 0)',
        cardForeground: 'oklch(0.208 0.042 265.755)',
        popover: 'oklch(1 0 0)',
        popoverForeground: 'oklch(0.208 0.042 265.755)',
        primary: 'oklch(0.546 0.192 262.881)',
        primaryForeground: 'oklch(1 0 0)',
        secondary: 'oklch(0.968 0.007 247.896)',
        secondaryForeground: 'oklch(0.208 0.042 265.755)',
        muted: 'oklch(0.968 0.007 247.896)',
        mutedForeground: 'oklch(0.443 0.024 264.052)',
        accent: 'oklch(0.968 0.007 247.896)',
        accentForeground: 'oklch(0.208 0.042 265.755)',
        destructive: 'oklch(0.577 0.215 27.325)',
        destructiveForeground: 'oklch(1 0 0)',
        border: 'oklch(0.883 0.012 247.896)',
        input: 'oklch(0.883 0.012 247.896)',
        ring: 'oklch(0.546 0.192 262.881)',
      },
      dark: {
        background: 'oklch(0.177 0.015 265.755)',
        foreground: 'oklch(0.922 0.007 247.896)',
        card: 'oklch(0.208 0.018 265.755)',
        cardForeground: 'oklch(0.922 0.007 247.896)',
        popover: 'oklch(0.208 0.018 265.755)',
        popoverForeground: 'oklch(0.922 0.007 247.896)',
        primary: 'oklch(0.637 0.183 259.533)',
        primaryForeground: 'oklch(1 0 0)',
        secondary: 'oklch(0.272 0.022 265.755)',
        secondaryForeground: 'oklch(0.922 0.007 247.896)',
        muted: 'oklch(0.272 0.022 265.755)',
        mutedForeground: 'oklch(0.627 0.018 264.052)',
        accent: 'oklch(0.272 0.022 265.755)',
        accentForeground: 'oklch(0.922 0.007 247.896)',
        destructive: 'oklch(0.527 0.215 27.325)',
        destructiveForeground: 'oklch(1 0 0)',
        border: 'oklch(0.336 0.024 265.755)',
        input: 'oklch(0.336 0.024 265.755)',
        ring: 'oklch(0.637 0.183 259.533)',
      },
    },
    {
      name: 'Vercel',
      description: "Vercel's bold black and white design aesthetic",
      icon: 'vercel',
      light: {
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0 0 0)',
        card: 'oklch(1 0 0)',
        cardForeground: 'oklch(0 0 0)',
        popover: 'oklch(1 0 0)',
        popoverForeground: 'oklch(0 0 0)',
        primary: 'oklch(0 0 0)',
        primaryForeground: 'oklch(1 0 0)',
        secondary: 'oklch(0.968 0 0)',
        secondaryForeground: 'oklch(0 0 0)',
        muted: 'oklch(0.968 0 0)',
        mutedForeground: 'oklch(0.443 0 0)',
        accent: 'oklch(0.968 0 0)',
        accentForeground: 'oklch(0 0 0)',
        destructive: 'oklch(0.577 0.245 27.325)',
        destructiveForeground: 'oklch(1 0 0)',
        border: 'oklch(0.883 0 0)',
        input: 'oklch(0.883 0 0)',
        ring: 'oklch(0 0 0)',
      },
      dark: {
        background: 'oklch(0 0 0)',
        foreground: 'oklch(1 0 0)',
        card: 'oklch(0.117 0 0)',
        cardForeground: 'oklch(1 0 0)',
        popover: 'oklch(0.117 0 0)',
        popoverForeground: 'oklch(1 0 0)',
        primary: 'oklch(1 0 0)',
        primaryForeground: 'oklch(0 0 0)',
        secondary: 'oklch(0.177 0 0)',
        secondaryForeground: 'oklch(1 0 0)',
        muted: 'oklch(0.177 0 0)',
        mutedForeground: 'oklch(0.627 0 0)',
        accent: 'oklch(0.177 0 0)',
        accentForeground: 'oklch(1 0 0)',
        destructive: 'oklch(0.577 0.245 27.325)',
        destructiveForeground: 'oklch(1 0 0)',
        border: 'oklch(0.269 0 0)',
        input: 'oklch(0.269 0 0)',
        ring: 'oklch(1 0 0)',
      },
    },
    {
      name: 'Apple',
      description: "Apple's elegant, sophisticated design language",
      icon: 'apple',
      light: {
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0.208 0 0)',
        card: 'oklch(0.985 0.003 247.858)',
        cardForeground: 'oklch(0.208 0 0)',
        popover: 'oklch(0.985 0.003 247.858)',
        popoverForeground: 'oklch(0.208 0 0)',
        primary: 'oklch(0.586 0.228 259.815)',
        primaryForeground: 'oklch(1 0 0)',
        secondary: 'oklch(0.968 0.003 247.858)',
        secondaryForeground: 'oklch(0.208 0 0)',
        muted: 'oklch(0.968 0.003 247.858)',
        mutedForeground: 'oklch(0.506 0 0)',
        accent: 'oklch(0.968 0.003 247.858)',
        accentForeground: 'oklch(0.208 0 0)',
        destructive: 'oklch(0.577 0.245 27.325)',
        destructiveForeground: 'oklch(1 0 0)',
        border: 'oklch(0.922 0.003 247.858)',
        input: 'oklch(0.922 0.003 247.858)',
        ring: 'oklch(0.586 0.228 259.815)',
      },
      dark: {
        background: 'oklch(0 0 0)',
        foreground: 'oklch(0.985 0 0)',
        card: 'oklch(0.145 0.003 247.858)',
        cardForeground: 'oklch(0.985 0 0)',
        popover: 'oklch(0.145 0.003 247.858)',
        popoverForeground: 'oklch(0.985 0 0)',
        primary: 'oklch(0.637 0.237 259.815)',
        primaryForeground: 'oklch(1 0 0)',
        secondary: 'oklch(0.227 0.003 247.858)',
        secondaryForeground: 'oklch(0.985 0 0)',
        muted: 'oklch(0.227 0.003 247.858)',
        mutedForeground: 'oklch(0.627 0 0)',
        accent: 'oklch(0.227 0.003 247.858)',
        accentForeground: 'oklch(0.985 0 0)',
        destructive: 'oklch(0.527 0.215 27.325)',
        destructiveForeground: 'oklch(1 0 0)',
        border: 'oklch(0.295 0.003 247.858)',
        input: 'oklch(0.295 0.003 247.858)',
        ring: 'oklch(0.637 0.237 259.815)',
      },
    },
    {
      name: 'OpenAI',
      description: "OpenAI's modern, tech-forward aesthetic",
      icon: 'openai',
      light: {
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0.208 0.01 255.841)',
        card: 'oklch(1 0 0)',
        cardForeground: 'oklch(0.208 0.01 255.841)',
        popover: 'oklch(1 0 0)',
        popoverForeground: 'oklch(0.208 0.01 255.841)',
        primary: 'oklch(0.538 0.163 163.319)',
        primaryForeground: 'oklch(1 0 0)',
        secondary: 'oklch(0.968 0.005 255.841)',
        secondaryForeground: 'oklch(0.208 0.01 255.841)',
        muted: 'oklch(0.968 0.005 255.841)',
        mutedForeground: 'oklch(0.475 0.01 255.841)',
        accent: 'oklch(0.968 0.005 255.841)',
        accentForeground: 'oklch(0.208 0.01 255.841)',
        destructive: 'oklch(0.577 0.245 27.325)',
        destructiveForeground: 'oklch(1 0 0)',
        border: 'oklch(0.906 0.006 255.841)',
        input: 'oklch(0.906 0.006 255.841)',
        ring: 'oklch(0.538 0.163 163.319)',
      },
      dark: {
        background: 'oklch(0.168 0.015 255.841)',
        foreground: 'oklch(0.968 0.005 255.841)',
        card: 'oklch(0.208 0.015 255.841)',
        cardForeground: 'oklch(0.968 0.005 255.841)',
        popover: 'oklch(0.208 0.015 255.841)',
        popoverForeground: 'oklch(0.968 0.005 255.841)',
        primary: 'oklch(0.608 0.183 163.319)',
        primaryForeground: 'oklch(0.168 0.015 255.841)',
        secondary: 'oklch(0.268 0.015 255.841)',
        secondaryForeground: 'oklch(0.968 0.005 255.841)',
        muted: 'oklch(0.268 0.015 255.841)',
        mutedForeground: 'oklch(0.627 0.01 255.841)',
        accent: 'oklch(0.268 0.015 255.841)',
        accentForeground: 'oklch(0.968 0.005 255.841)',
        destructive: 'oklch(0.527 0.215 27.325)',
        destructiveForeground: 'oklch(1 0 0)',
        border: 'oklch(0.336 0.015 255.841)',
        input: 'oklch(0.336 0.015 255.841)',
        ring: 'oklch(0.608 0.183 163.319)',
      },
    },
    {
      name: 'ClickUp',
      description: "ClickUp's vibrant, colorful productivity aesthetic",
      icon: 'clickup',
      light: {
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0.229 0.034 277.508)',
        card: 'oklch(1 0 0)',
        cardForeground: 'oklch(0.229 0.034 277.508)',
        popover: 'oklch(1 0 0)',
        popoverForeground: 'oklch(0.229 0.034 277.508)',
        primary: 'oklch(0.638 0.238 288.545)',
        primaryForeground: 'oklch(1 0 0)',
        secondary: 'oklch(0.962 0.021 288.545)',
        secondaryForeground: 'oklch(0.229 0.034 277.508)',
        muted: 'oklch(0.962 0.021 288.545)',
        mutedForeground: 'oklch(0.475 0.028 277.508)',
        accent: 'oklch(0.807 0.181 85.391)',
        accentForeground: 'oklch(0.229 0.034 277.508)',
        destructive: 'oklch(0.577 0.245 27.325)',
        destructiveForeground: 'oklch(1 0 0)',
        border: 'oklch(0.906 0.018 277.508)',
        input: 'oklch(0.906 0.018 277.508)',
        ring: 'oklch(0.638 0.238 288.545)',
      },
      dark: {
        background: 'oklch(0.177 0.028 277.508)',
        foreground: 'oklch(0.968 0.008 277.508)',
        card: 'oklch(0.208 0.032 277.508)',
        cardForeground: 'oklch(0.968 0.008 277.508)',
        popover: 'oklch(0.208 0.032 277.508)',
        popoverForeground: 'oklch(0.968 0.008 277.508)',
        primary: 'oklch(0.688 0.238 288.545)',
        primaryForeground: 'oklch(1 0 0)',
        secondary: 'oklch(0.268 0.038 277.508)',
        secondaryForeground: 'oklch(0.968 0.008 277.508)',
        muted: 'oklch(0.268 0.038 277.508)',
        mutedForeground: 'oklch(0.627 0.018 277.508)',
        accent: 'oklch(0.757 0.181 85.391)',
        accentForeground: 'oklch(0.177 0.028 277.508)',
        destructive: 'oklch(0.527 0.215 27.325)',
        destructiveForeground: 'oklch(1 0 0)',
        border: 'oklch(0.336 0.038 277.508)',
        input: 'oklch(0.336 0.038 277.508)',
        ring: 'oklch(0.688 0.238 288.545)',
      },
    },
    {
      name: 'Linear',
      description: "Linear's sleek, issue tracking inspired design",
      icon: 'linear',
      light: {
        background: 'oklch(0.985 0.003 250)',
        foreground: 'oklch(0.229 0.024 265)',
        card: 'oklch(1 0 0)',
        cardForeground: 'oklch(0.229 0.024 265)',
        popover: 'oklch(1 0 0)',
        popoverForeground: 'oklch(0.229 0.024 265)',
        primary: 'oklch(0.538 0.207 262.881)',
        primaryForeground: 'oklch(1 0 0)',
        secondary: 'oklch(0.962 0.008 250)',
        secondaryForeground: 'oklch(0.229 0.024 265)',
        muted: 'oklch(0.962 0.008 250)',
        mutedForeground: 'oklch(0.506 0.018 265)',
        accent: 'oklch(0.962 0.008 250)',
        accentForeground: 'oklch(0.229 0.024 265)',
        destructive: 'oklch(0.577 0.245 27.325)',
        destructiveForeground: 'oklch(1 0 0)',
        border: 'oklch(0.906 0.012 250)',
        input: 'oklch(0.906 0.012 250)',
        ring: 'oklch(0.538 0.207 262.881)',
      },
      dark: {
        background: 'oklch(0.145 0.018 265)',
        foreground: 'oklch(0.962 0.008 250)',
        card: 'oklch(0.177 0.022 265)',
        cardForeground: 'oklch(0.962 0.008 250)',
        popover: 'oklch(0.177 0.022 265)',
        popoverForeground: 'oklch(0.962 0.008 250)',
        primary: 'oklch(0.608 0.217 262.881)',
        primaryForeground: 'oklch(1 0 0)',
        secondary: 'oklch(0.227 0.028 265)',
        secondaryForeground: 'oklch(0.962 0.008 250)',
        muted: 'oklch(0.227 0.028 265)',
        mutedForeground: 'oklch(0.577 0.015 265)',
        accent: 'oklch(0.227 0.028 265)',
        accentForeground: 'oklch(0.962 0.008 250)',
        destructive: 'oklch(0.527 0.215 27.325)',
        destructiveForeground: 'oklch(1 0 0)',
        border: 'oklch(0.295 0.028 265)',
        input: 'oklch(0.295 0.028 265)',
        ring: 'oklch(0.608 0.217 262.881)',
      },
    },
  ];

  protected readonly defaultThemeCode = `:root {
  --radius: 0.625rem;
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
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
}`;

  protected readonly customThemeVariablesCode = `:root {
  /* Use OKLCH for perceptually uniform colors */
  /* Format: oklch(lightness chroma hue) */

  /* Your brand primary color */
  --primary: oklch(0.6 0.2 250);        /* Blue primary */
  --primary-foreground: oklch(1 0 0);   /* White text on primary */

  /* Supporting colors derived from primary */
  --secondary: oklch(0.95 0.02 250);
  --secondary-foreground: oklch(0.2 0.02 250);
}`;

  protected readonly tailwindThemeMappingCode = `@theme inline {
  /* Map CSS variables to Tailwind colors */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  /* ... other color mappings */

  /* Border radius tokens */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}`;

  protected readonly baseLayerCode = `@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  html {
    scroll-behavior: smooth;
  }
  :focus-visible {
    @apply outline-2 outline-ring outline-offset-2;
  }
}`;

  protected readonly addColorCode = `/* Add to your CSS variables */
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);

  --success: oklch(0.72 0.19 145);
  --success-foreground: oklch(0.15 0.05 145);

  --info: oklch(0.68 0.16 245);
  --info-foreground: oklch(1 0 0);
}

/* Add to @theme inline block */
@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}`;

  protected readonly oklchExplanationCode = `/* OKLCH Color Format */
oklch(L C H)

/* L = Lightness (0-1) */
oklch(0 0 0)    /* Black */
oklch(0.5 0 0)  /* 50% gray */
oklch(1 0 0)    /* White */

/* C = Chroma (0-0.4+) - Color intensity */
oklch(0.6 0 250)     /* Gray - no chroma */
oklch(0.6 0.1 250)   /* Desaturated blue */
oklch(0.6 0.25 250)  /* Vivid blue */

/* H = Hue (0-360 degrees) */
oklch(0.6 0.2 0)     /* Red */
oklch(0.6 0.2 90)    /* Yellow-green */
oklch(0.6 0.2 180)   /* Cyan */
oklch(0.6 0.2 270)   /* Purple */`;

  protected readonly otherFormatsCode = `/* HSL format */
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 222.2 47.4% 11.2%;
}

/* RGB format */
:root {
  --background: 255 255 255;
  --foreground: 10 10 10;
  --primary: 15 23 42;
}

/* Hex format (not recommended for CSS variables with opacity) */
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --primary: #0f172a;
}`;

  protected generatePaletteCSS(palette: ThemePalette): string {
    return `:root {
  --radius: 0.625rem;
  --background: ${palette.light.background};
  --foreground: ${palette.light.foreground};
  --card: ${palette.light.card};
  --card-foreground: ${palette.light.cardForeground};
  --popover: ${palette.light.popover};
  --popover-foreground: ${palette.light.popoverForeground};
  --primary: ${palette.light.primary};
  --primary-foreground: ${palette.light.primaryForeground};
  --secondary: ${palette.light.secondary};
  --secondary-foreground: ${palette.light.secondaryForeground};
  --muted: ${palette.light.muted};
  --muted-foreground: ${palette.light.mutedForeground};
  --accent: ${palette.light.accent};
  --accent-foreground: ${palette.light.accentForeground};
  --destructive: ${palette.light.destructive};
  --destructive-foreground: ${palette.light.destructiveForeground};
  --border: ${palette.light.border};
  --input: ${palette.light.input};
  --ring: ${palette.light.ring};
}

.dark {
  --background: ${palette.dark.background};
  --foreground: ${palette.dark.foreground};
  --card: ${palette.dark.card};
  --card-foreground: ${palette.dark.cardForeground};
  --popover: ${palette.dark.popover};
  --popover-foreground: ${palette.dark.popoverForeground};
  --primary: ${palette.dark.primary};
  --primary-foreground: ${palette.dark.primaryForeground};
  --secondary: ${palette.dark.secondary};
  --secondary-foreground: ${palette.dark.secondaryForeground};
  --muted: ${palette.dark.muted};
  --muted-foreground: ${palette.dark.mutedForeground};
  --accent: ${palette.dark.accent};
  --accent-foreground: ${palette.dark.accentForeground};
  --destructive: ${palette.dark.destructive};
  --destructive-foreground: ${palette.dark.destructiveForeground};
  --border: ${palette.dark.border};
  --input: ${palette.dark.input};
  --ring: ${palette.dark.ring};
}`;
  }

  protected async copyPalette(palette: ThemePalette): Promise<void> {
    const css = this.generatePaletteCSS(palette);
    try {
      await navigator.clipboard.writeText(css);
      this.copiedPalette.set(palette.name);
      setTimeout(() => {
        this.copiedPalette.set(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
}
