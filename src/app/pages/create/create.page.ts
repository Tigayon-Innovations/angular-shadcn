import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Check, Copy, LucideAngularModule, Terminal, Wand2 } from 'lucide-angular';

const COLORS = [
  { name: 'zinc', hex: '#71717a', label: 'Zinc' },
  { name: 'slate', hex: '#64748b', label: 'Slate' },
  { name: 'gray', hex: '#6b7280', label: 'Gray' },
  { name: 'neutral', hex: '#737373', label: 'Neutral' },
  { name: 'stone', hex: '#78716c', label: 'Stone' },
  { name: 'red', hex: '#ef4444', label: 'Red' },
  { name: 'rose', hex: '#f43f5e', label: 'Rose' },
  { name: 'orange', hex: '#f97316', label: 'Orange' },
  { name: 'amber', hex: '#f59e0b', label: 'Amber' },
  { name: 'yellow', hex: '#eab308', label: 'Yellow' },
  { name: 'lime', hex: '#84cc16', label: 'Lime' },
  { name: 'green', hex: '#22c55e', label: 'Green' },
  { name: 'emerald', hex: '#10b981', label: 'Emerald' },
  { name: 'teal', hex: '#14b8a6', label: 'Teal' },
  { name: 'cyan', hex: '#06b6d4', label: 'Cyan' },
  { name: 'sky', hex: '#0ea5e9', label: 'Sky' },
  { name: 'blue', hex: '#3b82f6', label: 'Blue' },
  { name: 'indigo', hex: '#6366f1', label: 'Indigo' },
  { name: 'violet', hex: '#8b5cf6', label: 'Violet' },
  { name: 'purple', hex: '#a855f7', label: 'Purple' },
];

const PRESETS = [
  {
    name: 'Vega',
    value: 'vega',
    description: 'Classic shadcn look',
    radius: 'rounded-md',
    spacing: 'p-3',
    compact: false,
  },
  {
    name: 'Nova',
    value: 'nova',
    description: 'Compact & tight',
    radius: 'rounded-sm',
    spacing: 'p-2',
    compact: true,
  },
  {
    name: 'Maia',
    value: 'maia',
    description: 'Soft & rounded',
    radius: 'rounded-xl',
    spacing: 'p-3',
    compact: false,
  },
  {
    name: 'Lyra',
    value: 'lyra',
    description: 'Sharp & boxy',
    radius: 'rounded-none',
    spacing: 'p-3',
    compact: false,
  },
  {
    name: 'Mira',
    value: 'mira',
    description: 'Dense & minimal',
    radius: 'rounded-sm',
    spacing: 'p-1.5',
    compact: true,
  },
];

const FONTS = [
  { name: 'Inter', value: 'inter', description: 'Clean & modern' },
  { name: 'Geist', value: 'geist', description: 'By Vercel' },
  { name: 'Manrope', value: 'manrope', description: 'Geometric sans' },
  { name: 'Plus Jakarta Sans', value: 'plus-jakarta-sans', description: 'Contemporary' },
  { name: 'DM Sans', value: 'dm-sans', description: 'Low-contrast' },
];

@Component({
  selector: 'CreatePage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Badge, Card, CardContent, CardHeader, CardTitle, LucideAngularModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Page Header -->
      <section class="container mx-auto px-4 py-12 text-center md:py-16">
        <div class="flex items-center justify-center gap-2 mb-4">
          <lucide-icon [img]="icons.Wand2" class="h-6 w-6 text-primary" />
          <Badge variant="secondary">New Project</Badge>
        </div>
        <h1 class="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          New Project
        </h1>
        <p class="mx-auto max-w-xl text-lg text-muted-foreground">
          Pick your style. Customize everything.
        </p>
      </section>

      <div class="container mx-auto px-4 pb-16 max-w-4xl">

        <!-- Step 1: Style Preset -->
        <section class="mb-12">
          <div class="mb-4 flex items-center gap-3">
            <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
            <h2 class="text-xl font-semibold">Choose a style preset</h2>
          </div>
          <div class="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            @for (preset of presets; track preset.value) {
              <button
                type="button"
                class="group relative flex flex-col overflow-hidden rounded-lg border-2 bg-card text-left transition-all hover:shadow-md focus:outline-none"
                [class.border-primary]="selectedPreset() === preset.value"
                [class.border-border]="selectedPreset() !== preset.value"
                [class.shadow-sm]="selectedPreset() === preset.value"
                (click)="selectedPreset.set(preset.value)"
              >
                <!-- Mini preview -->
                <div class="p-3 bg-muted/30 border-b border-border">
                  <div class="flex flex-col gap-1.5">
                    <!-- Mock input -->
                    <div
                      class="h-5 w-full border border-border bg-background text-xs px-1.5 flex items-center text-muted-foreground"
                      [class]="preset.radius"
                    >
                      <span class="truncate text-[10px]">Email</span>
                    </div>
                    <div class="flex gap-1">
                      <!-- Mock primary button -->
                      <div
                        class="flex-1 h-5 bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium"
                        [class]="preset.radius"
                      >
                        Submit
                      </div>
                      <!-- Mock badge -->
                      <div
                        class="px-1.5 h-5 bg-secondary text-secondary-foreground text-[10px] flex items-center font-medium border border-border"
                        [class]="preset.radius"
                      >
                        Tag
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Label -->
                <div class="p-2.5">
                  <p class="text-sm font-semibold">{{ preset.name }}</p>
                  <p class="text-xs text-muted-foreground mt-0.5">{{ preset.description }}</p>
                </div>
                <!-- Check indicator -->
                @if (selectedPreset() === preset.value) {
                  <div class="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <lucide-icon [img]="icons.Check" class="h-3 w-3 text-primary-foreground" />
                  </div>
                }
              </button>
            }
          </div>
        </section>

        <!-- Step 2: Base Color -->
        <section class="mb-12">
          <div class="mb-4 flex items-center gap-3">
            <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
            <h2 class="text-xl font-semibold">Pick a base color</h2>
          </div>
          <div class="rounded-lg border bg-card p-4">
            <div class="flex flex-wrap gap-2">
              @for (color of colors; track color.name) {
                <button
                  type="button"
                  class="group relative flex flex-col items-center gap-1.5 rounded-md p-1.5 transition-colors hover:bg-accent focus:outline-none"
                  [attr.title]="color.label"
                  (click)="selectedColor.set(color.name)"
                >
                  <span
                    class="flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all"
                    [style.background-color]="color.hex"
                    [class.border-foreground]="selectedColor() === color.name"
                    [class.scale-110]="selectedColor() === color.name"
                    [class.border-transparent]="selectedColor() !== color.name"
                  >
                    @if (selectedColor() === color.name) {
                      <lucide-icon [img]="icons.Check" class="h-3.5 w-3.5 text-white drop-shadow" />
                    }
                  </span>
                  <span class="text-[10px] text-muted-foreground max-w-[3rem] truncate text-center leading-tight">{{ color.label }}</span>
                </button>
              }
            </div>
          </div>
        </section>

        <!-- Step 3: Font -->
        <section class="mb-12">
          <div class="mb-4 flex items-center gap-3">
            <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
            <h2 class="text-xl font-semibold">Choose a font</h2>
          </div>
          <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            @for (font of fonts; track font.value) {
              <button
                type="button"
                class="relative flex flex-col items-start rounded-lg border-2 p-3 text-left transition-all hover:shadow-sm focus:outline-none"
                [class.border-primary]="selectedFont() === font.value"
                [class.bg-primary\/5]="selectedFont() === font.value"
                [class.border-border]="selectedFont() !== font.value"
                [class.bg-card]="selectedFont() !== font.value"
                (click)="selectedFont.set(font.value)"
              >
                <span class="text-base font-semibold">{{ font.name }}</span>
                <span class="mt-0.5 text-xs text-muted-foreground">{{ font.description }}</span>
                @if (selectedFont() === font.value) {
                  <div class="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                    <lucide-icon [img]="icons.Check" class="h-2.5 w-2.5 text-primary-foreground" />
                  </div>
                }
              </button>
            }
          </div>
        </section>

        <!-- Step 4: Icons -->
        <section class="mb-12">
          <div class="mb-4 flex items-center gap-3">
            <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">4</span>
            <h2 class="text-xl font-semibold">Icons</h2>
          </div>
          <div class="rounded-lg border-2 border-primary bg-primary/5 p-4 flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <lucide-icon [img]="icons.Check" class="h-5 w-5 text-primary" />
            </div>
            <div>
              <p class="font-semibold">Lucide Icons</p>
              <p class="text-sm text-muted-foreground">Already built-in — 1000+ beautiful icons</p>
            </div>
            <Badge variant="secondary" class="ml-auto">Included</Badge>
          </div>
        </section>

        <!-- Generated Command -->
        <section class="mb-10">
          <div class="mb-4 flex items-center gap-3">
            <lucide-icon [img]="icons.Terminal" class="h-5 w-5 text-muted-foreground" />
            <h2 class="text-xl font-semibold">Your setup command</h2>
          </div>
          <div class="relative rounded-lg overflow-hidden border border-zinc-800">
            <div class="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-700">
              <span class="text-xs text-zinc-400 font-mono">Terminal</span>
              <button
                type="button"
                class="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100 focus:outline-none"
                (click)="copyCommand()"
              >
                <lucide-icon [img]="copied() ? icons.Check : icons.Copy" class="h-3.5 w-3.5" />
                {{ copied() ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <pre class="overflow-x-auto bg-zinc-950 px-4 py-4 text-sm text-zinc-100 dark:bg-zinc-900"><code class="font-mono break-all whitespace-pre-wrap">{{ generatedCommand() }}</code></pre>
          </div>
          <p class="mt-3 text-sm text-muted-foreground">
            Run this command in your terminal to scaffold a new Angular app with shadcn-angular pre-configured.
          </p>
        </section>

        <!-- CTA -->
        <div class="flex flex-col items-center gap-4 text-center pt-4 border-t border-border">
          <p class="text-muted-foreground">Ready to build? Follow the full installation guide.</p>
          <a routerLink="/docs/installation">
            <Button size="lg" class="gap-2 px-8">
              <lucide-icon [img]="icons.Wand2" class="h-4 w-4" />
              Get Started
            </Button>
          </a>
        </div>

      </div>
    </div>
  `,
})
export class CreatePage {
  protected readonly icons = { Check, Copy, Terminal, Wand2 };
  protected readonly presets = PRESETS;
  protected readonly colors = COLORS;
  protected readonly fonts = FONTS;

  readonly selectedPreset = signal<string>('vega');
  readonly selectedColor = signal<string>('zinc');
  readonly selectedFont = signal<string>('inter');
  protected readonly copied = signal(false);

  readonly generatedCommand = computed(
    () =>
      `ng new my-app --style=css --ssr && cd my-app && ng add @ng-cn/core@latest --preset=${this.selectedPreset()} --color=${this.selectedColor()} --font=${this.selectedFont()}`,
  );

  protected copyCommand(): void {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(this.generatedCommand()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
