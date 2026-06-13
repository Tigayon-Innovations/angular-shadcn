import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Check, Copy, LucideAngularModule, Wand2 } from 'lucide-angular';

import { CardsDemo } from '@/components/cards/cards-demo.component';

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
  imports: [Button, Badge, Separator, LucideAngularModule, RouterLink, CardsDemo],
  template: `
    <div
      class="section-soft relative flex flex-col overflow-hidden"
      style="min-height: calc(100vh - var(--site-header-height, 56px))"
    >
      <div
        class="flex min-h-0 flex-1 flex-col gap-4 p-4 md:flex-row md:gap-6 md:p-6"
      >
        <!-- ─── CUSTOMIZER (panel, left — matches shadcn /create) ─── -->
        <aside class="self-start md:sticky md:top-6 md:w-64 lg:w-72">
          <div
            class="flex max-h-[calc(100vh-var(--site-header-height,56px)-3rem)] flex-col overflow-hidden rounded-2xl border bg-card/90 text-card-foreground shadow-xl backdrop-blur-xl"
          >
            <!-- Header -->
            <div class="flex items-center justify-between gap-2 border-b px-4 py-3">
              <div class="flex items-center gap-2">
                <div class="flex size-6 items-center justify-center rounded-md bg-primary">
                  <lucide-icon [img]="icons.Wand2" class="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <span class="text-sm font-semibold">New Project</span>
              </div>
              <button
                type="button"
                class="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                (click)="copyCommand()"
              >
                <lucide-icon [img]="copied() ? icons.Check : icons.Copy" class="h-3.5 w-3.5" />
                {{ copied() ? 'Copied' : 'Copy' }}
              </button>
            </div>

            <!-- Body -->
            <div class="no-scrollbar flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
              <!-- Style -->
              <div class="flex flex-col gap-2">
                <span class="text-xs font-medium text-muted-foreground">Style</span>
                <div class="grid grid-cols-2 gap-1.5">
                  @for (preset of presets; track preset.value) {
                    <button
                      type="button"
                      class="flex flex-col items-start rounded-lg border px-2.5 py-1.5 text-left transition-colors hover:bg-accent"
                      [class.border-primary]="selectedPreset() === preset.value"
                      [class.bg-accent]="selectedPreset() === preset.value"
                      (click)="selectedPreset.set(preset.value)"
                    >
                      <span class="text-xs font-semibold leading-none">{{ preset.name }}</span>
                      <span class="mt-1 text-[10px] leading-tight text-muted-foreground">{{ preset.description }}</span>
                    </button>
                  }
                </div>
              </div>

              <Separator />

              <!-- Color -->
              <div class="flex flex-col gap-2">
                <span class="text-xs font-medium text-muted-foreground">Base Color</span>
                <div class="grid grid-cols-8 gap-1.5">
                  @for (color of colors; track color.name) {
                    <button
                      type="button"
                      class="flex size-6 items-center justify-center rounded-full border transition-transform hover:scale-110"
                      [attr.title]="color.label"
                      [style.background-color]="color.hex"
                      [class.ring-2]="selectedColor() === color.name"
                      [class.ring-ring]="selectedColor() === color.name"
                      [class.ring-offset-2]="selectedColor() === color.name"
                      [class.ring-offset-card]="selectedColor() === color.name"
                      [class.border-transparent]="true"
                      (click)="selectedColor.set(color.name)"
                    >
                      @if (selectedColor() === color.name) {
                        <lucide-icon [img]="icons.Check" class="h-3 w-3 text-white drop-shadow" />
                      }
                    </button>
                  }
                </div>
              </div>

              <Separator />

              <!-- Radius -->
              <div class="flex flex-col gap-2">
                <span class="text-xs font-medium text-muted-foreground">Radius</span>
                <div class="grid grid-cols-5 gap-1.5">
                  @for (r of radiusOptions; track r.value) {
                    <button
                      type="button"
                      class="rounded-md border py-1.5 text-xs font-medium transition-colors hover:bg-accent"
                      [class.border-primary]="selectedRadius() === r.value"
                      [class.bg-accent]="selectedRadius() === r.value"
                      (click)="selectedRadius.set(r.value)"
                    >
                      {{ r.label }}
                    </button>
                  }
                </div>
              </div>

              <Separator />

              <!-- Font -->
              <div class="flex flex-col gap-2">
                <span class="text-xs font-medium text-muted-foreground">Font</span>
                <div class="flex flex-col gap-0.5">
                  @for (font of fonts; track font.value) {
                    <button
                      type="button"
                      class="flex items-center justify-between rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent"
                      [class.bg-accent]="selectedFont() === font.value"
                      (click)="selectedFont.set(font.value)"
                    >
                      <span class="text-sm font-medium leading-none">{{ font.name }}</span>
                      @if (selectedFont() === font.value) {
                        <lucide-icon [img]="icons.Check" class="ml-2 h-3.5 w-3.5 shrink-0" />
                      }
                    </button>
                  }
                </div>
              </div>

              <Separator />

              <!-- Icons -->
              <div class="flex flex-col gap-2">
                <span class="text-xs font-medium text-muted-foreground">Icon Library</span>
                <div class="flex items-center justify-between rounded-md border px-3 py-2">
                  <span class="text-sm font-medium">Lucide</span>
                  <Badge variant="secondary" class="text-[10px]">Included</Badge>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex flex-col gap-2 border-t p-4">
              <pre
                class="no-scrollbar overflow-x-auto rounded-md border bg-muted px-3 py-2 font-mono text-[10px] leading-relaxed text-muted-foreground"
              >{{ generatedCommand() }}</pre>
              <a routerLink="/docs/installation" class="block w-full">
                <Button size="sm" class="w-full gap-1.5">
                  <lucide-icon [img]="icons.Wand2" class="h-3.5 w-3.5" />
                  Get Started
                </Button>
              </a>
            </div>
          </div>
        </aside>

        <!-- ─── PREVIEW (main, right) — the shadcn card masonry ───── -->
        <main
          class="min-h-0 flex-1 overflow-hidden rounded-2xl border bg-background/70 shadow-sm backdrop-blur"
        >
          <div class="h-full overflow-y-auto">
            <cards-demo />
          </div>
        </main>
      </div>
    </div>
  `,
})
export class CreatePage {
  protected readonly icons = { Check, Copy, Wand2 };
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
