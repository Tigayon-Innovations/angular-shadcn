import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Check, Copy, LucideAngularModule, Terminal, Wand2 } from 'lucide-angular';

import { CreateShowcase } from './create-showcase.component';

const COLORS = [
  { name: 'zinc',    hex: '#71717a', label: 'Zinc'    },
  { name: 'slate',   hex: '#64748b', label: 'Slate'   },
  { name: 'gray',    hex: '#6b7280', label: 'Gray'    },
  { name: 'neutral', hex: '#737373', label: 'Neutral' },
  { name: 'stone',   hex: '#78716c', label: 'Stone'   },
  { name: 'red',     hex: '#ef4444', label: 'Red'     },
  { name: 'rose',    hex: '#f43f5e', label: 'Rose'    },
  { name: 'orange',  hex: '#f97316', label: 'Orange'  },
  { name: 'amber',   hex: '#f59e0b', label: 'Amber'   },
  { name: 'yellow',  hex: '#eab308', label: 'Yellow'  },
  { name: 'lime',    hex: '#84cc16', label: 'Lime'    },
  { name: 'green',   hex: '#22c55e', label: 'Green'   },
  { name: 'emerald', hex: '#10b981', label: 'Emerald' },
  { name: 'teal',    hex: '#14b8a6', label: 'Teal'    },
  { name: 'cyan',    hex: '#06b6d4', label: 'Cyan'    },
  { name: 'sky',     hex: '#0ea5e9', label: 'Sky'     },
  { name: 'blue',    hex: '#3b82f6', label: 'Blue'    },
  { name: 'indigo',  hex: '#6366f1', label: 'Indigo'  },
  { name: 'violet',  hex: '#8b5cf6', label: 'Violet'  },
  { name: 'purple',  hex: '#a855f7', label: 'Purple'  },
];

const PRESETS = [
  { name: 'Vega', value: 'vega', description: 'Classic shadcn', radius: 'rounded-md', spacing: 'p-3', compact: false },
  { name: 'Nova', value: 'nova', description: 'Compact & tight', radius: 'rounded-sm', spacing: 'p-2', compact: true  },
  { name: 'Maia', value: 'maia', description: 'Soft & rounded', radius: 'rounded-xl', spacing: 'p-3', compact: false },
  { name: 'Lyra', value: 'lyra', description: 'Sharp & boxy',   radius: 'rounded-none', spacing: 'p-3', compact: false },
  { name: 'Mira', value: 'mira', description: 'Dense & minimal', radius: 'rounded-sm', spacing: 'p-1.5', compact: true },
];

const FONTS = [
  { name: 'Inter',             value: 'inter',             description: 'Clean & modern'   },
  { name: 'Geist',             value: 'geist',             description: 'By Vercel'         },
  { name: 'Manrope',           value: 'manrope',           description: 'Geometric sans'    },
  { name: 'Plus Jakarta Sans', value: 'plus-jakarta-sans', description: 'Contemporary'      },
  { name: 'DM Sans',           value: 'dm-sans',           description: 'Low-contrast'      },
];

const RADIUS = [
  { label: '0',    value: '0',    radiusClass: 'rounded-none' },
  { label: '0.3',  value: '0.3',  radiusClass: 'rounded-sm'   },
  { label: '0.5',  value: '0.5',  radiusClass: 'rounded-md'   },
  { label: '0.75', value: '0.75', radiusClass: 'rounded-lg'   },
  { label: '1.0',  value: '1.0',  radiusClass: 'rounded-xl'   },
];

@Component({
  selector: 'CreatePage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Badge, Separator, LucideAngularModule, RouterLink, CreateShowcase],
  template: `
    <div class="flex" style="min-height: calc(100vh - var(--site-header-height, 56px))">

      <!-- ─── LEFT SIDEBAR ─────────────────────────────────────── -->
      <aside class="w-72 shrink-0 border-r bg-background flex flex-col overflow-y-auto"
             style="position: sticky; top: var(--site-header-height, 56px); height: calc(100vh - var(--site-header-height, 56px))">

        <!-- Header -->
        <div class="px-5 py-4">
          <p class="font-semibold text-sm">Customize</p>
          <p class="text-xs text-muted-foreground mt-0.5">Pick a style and build your design system.</p>
        </div>

        <Separator />

        <!-- Style Presets -->
        <div class="px-5 py-4">
          <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Style</p>
          <div class="grid grid-cols-2 gap-2">
            @for (preset of presets; track preset.value) {
              <button
                type="button"
                class="relative flex flex-col overflow-hidden rounded-lg border-2 bg-card text-left transition-all hover:shadow-sm focus:outline-none"
                [class.border-primary]="selectedPreset() === preset.value"
                [class.border-border]="selectedPreset() !== preset.value"
                (click)="selectedPreset.set(preset.value)"
              >
                <!-- Mini preview -->
                <div class="p-2 bg-muted/30 border-b border-border">
                  <div class="flex flex-col gap-1">
                    <div class="h-3.5 w-full border border-border bg-background text-[8px] px-1 flex items-center text-muted-foreground"
                         [class]="preset.radius">
                      <span class="truncate">Email</span>
                    </div>
                    <div class="flex gap-0.5">
                      <div class="flex-1 h-3.5 bg-primary text-primary-foreground text-[7px] flex items-center justify-center font-medium"
                           [class]="preset.radius">Submit</div>
                      <div class="px-1 h-3.5 bg-secondary text-secondary-foreground text-[7px] flex items-center font-medium border border-border"
                           [class]="preset.radius">Tag</div>
                    </div>
                  </div>
                </div>
                <div class="px-2 py-1.5">
                  <p class="text-xs font-semibold leading-none">{{ preset.name }}</p>
                  <p class="text-[9px] text-muted-foreground mt-0.5 leading-tight">{{ preset.description }}</p>
                </div>
                @if (selectedPreset() === preset.value) {
                  <div class="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                    <lucide-icon [img]="icons.Check" class="h-2.5 w-2.5 text-primary-foreground" />
                  </div>
                }
              </button>
            }
          </div>
        </div>

        <Separator />

        <!-- Color -->
        <div class="px-5 py-4">
          <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Color</p>
          <div class="grid grid-cols-5 gap-1.5">
            @for (color of colors; track color.name) {
              <button
                type="button"
                class="flex flex-col items-center gap-0.5 rounded p-1 transition-colors hover:bg-accent focus:outline-none"
                [attr.title]="color.label"
                (click)="selectedColor.set(color.name)"
              >
                <span
                  class="flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all"
                  [style.background-color]="color.hex"
                  [class.border-foreground]="selectedColor() === color.name"
                  [class.scale-110]="selectedColor() === color.name"
                  [class.border-transparent]="selectedColor() !== color.name"
                >
                  @if (selectedColor() === color.name) {
                    <lucide-icon [img]="icons.Check" class="h-3 w-3 text-white drop-shadow" />
                  }
                </span>
                <span class="text-[8px] text-muted-foreground leading-tight text-center max-w-full truncate">{{ color.label }}</span>
              </button>
            }
          </div>
        </div>

        <Separator />

        <!-- Radius -->
        <div class="px-5 py-4">
          <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Radius</p>
          <div class="flex gap-2">
            @for (r of radiusOptions; track r.value) {
              <button
                type="button"
                class="flex flex-1 flex-col items-center gap-1 rounded-md border-2 p-2 transition-all hover:bg-accent focus:outline-none"
                [class.border-primary]="selectedRadius() === r.value"
                [class.border-border]="selectedRadius() !== r.value"
                (click)="selectedRadius.set(r.value)"
              >
                <div
                  class="h-5 w-5 border-2 border-foreground/60"
                  [class]="r.radiusClass"
                  [class.border-primary]="selectedRadius() === r.value"
                ></div>
                <span class="text-[8px] font-medium text-muted-foreground">{{ r.label }}</span>
              </button>
            }
          </div>
        </div>

        <Separator />

        <!-- Font -->
        <div class="px-5 py-4">
          <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Font</p>
          <div class="flex flex-col gap-0.5">
            @for (font of fonts; track font.value) {
              <button
                type="button"
                class="flex items-center justify-between rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent focus:outline-none"
                [class.bg-accent]="selectedFont() === font.value"
                (click)="selectedFont.set(font.value)"
              >
                <div>
                  <p class="text-sm font-medium leading-none">{{ font.name }}</p>
                  <p class="text-xs text-muted-foreground mt-0.5">{{ font.description }}</p>
                </div>
                @if (selectedFont() === font.value) {
                  <lucide-icon [img]="icons.Check" class="h-3.5 w-3.5 text-primary shrink-0 ml-2" />
                }
              </button>
            }
          </div>
        </div>

        <Separator />

        <!-- Icons -->
        <div class="px-5 py-4">
          <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Icons</p>
          <div class="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2">
            <div class="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <lucide-icon [img]="icons.Check" class="h-4 w-4 text-primary" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold">Lucide Icons</p>
              <p class="text-[10px] text-muted-foreground">1000+ icons built-in</p>
            </div>
            <Badge variant="secondary" class="text-[9px] shrink-0">Included</Badge>
          </div>
        </div>

        <Separator />

        <!-- Command -->
        <div class="px-5 py-4">
          <div class="flex items-center gap-1.5 mb-2">
            <lucide-icon [img]="icons.Terminal" class="h-3.5 w-3.5 text-muted-foreground" />
            <p class="text-xs font-medium">Setup command</p>
          </div>
          <div class="rounded-lg overflow-hidden border border-zinc-800">
            <div class="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-700">
              <span class="text-[9px] text-zinc-400 font-mono">Terminal</span>
              <button
                type="button"
                class="flex items-center gap-1 rounded px-2 py-0.5 text-[9px] font-medium text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors focus:outline-none"
                (click)="copyCommand()"
              >
                <lucide-icon [img]="copied() ? icons.Check : icons.Copy" class="h-3 w-3" />
                {{ copied() ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <pre class="overflow-x-auto bg-zinc-950 px-3 py-3 text-[9px] text-zinc-100 font-mono whitespace-pre-wrap break-all leading-relaxed">{{ generatedCommand() }}</pre>
          </div>
        </div>

        <Separator />

        <!-- CTA -->
        <div class="px-5 py-4 mt-auto">
          <a routerLink="/docs/installation" class="block w-full">
            <Button size="sm" class="w-full gap-1.5">
              <lucide-icon [img]="icons.Wand2" class="h-3.5 w-3.5" />
              Get Started
            </Button>
          </a>
        </div>

      </aside>

      <!-- ─── RIGHT SHOWCASE ────────────────────────────────────── -->
      <create-showcase class="flex-1 overflow-y-auto" />

    </div>
  `,
})
export class CreatePage {
  protected readonly icons = { Check, Copy, Terminal, Wand2 };
  protected readonly presets = PRESETS;
  protected readonly colors = COLORS;
  protected readonly fonts = FONTS;
  protected readonly radiusOptions = RADIUS;

  readonly selectedPreset = signal<string>('vega');
  readonly selectedColor  = signal<string>('zinc');
  readonly selectedFont   = signal<string>('inter');
  readonly selectedRadius = signal<string>('0.5');
  protected readonly copied = signal(false);

  readonly generatedCommand = computed(
    () =>
      `ng new my-app --style=css --ssr && cd my-app && ` +
      `ng add @ng-cn/core@latest --preset=${this.selectedPreset()} --color=${this.selectedColor()} --font=${this.selectedFont()} --radius=${this.selectedRadius()}`,
  );

  protected copyCommand(): void {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(this.generatedCommand()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
