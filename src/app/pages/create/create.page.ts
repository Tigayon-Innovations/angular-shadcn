import { Button } from '@/ui/button';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Check,
  Code,
  Copy,
  FolderOpen,
  LayoutTemplate,
  LucideAngularModule,
  Menu,
  Shuffle,
  Sparkles,
} from 'lucide-angular';

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
  imports: [Button, LucideAngularModule, RouterLink, CardsDemo],
  template: `
    <div
      class="section-soft relative flex flex-col overflow-hidden"
      style="min-height: calc(100vh - var(--site-header-height, 56px))"
    >
      <div
        class="flex min-h-0 flex-1 flex-col gap-4 p-4 md:flex-row md:gap-6 md:p-6"
      >
        <!-- ─── CUSTOMIZER (panel, left — matches shadcn /create) ─── -->
        <aside class="self-start md:sticky md:top-6 md:w-52 lg:w-56">
          <div
            class="flex max-h-[calc(100vh-var(--site-header-height,56px)-3rem)] flex-col overflow-hidden rounded-2xl border bg-card/90 text-card-foreground shadow-xl backdrop-blur-xl"
          >
            <!-- Header: Menu -->
            <div class="flex items-center justify-between border-b px-3 py-2.5">
              <span class="text-sm font-medium">Menu</span>
              <lucide-icon [img]="icons.Menu" class="size-5 text-foreground" />
            </div>

            <!-- Body: picker rows -->
            <div class="no-scrollbar flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto p-3">
              <!-- Style -->
              <button type="button" (click)="cycleStyle()" class="relative w-full rounded-lg px-2.5 py-2 text-left ring-1 ring-foreground/10 transition-colors hover:bg-muted">
                <span class="block text-xs text-muted-foreground">Style</span>
                <span class="block text-sm font-medium text-foreground">{{ styleLabel() }}</span>
                <lucide-icon [img]="icons.LayoutTemplate" class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-foreground" />
              </button>

              <div class="my-1 h-px bg-border"></div>

              <!-- Base Color -->
              <button type="button" (click)="cycleColor()" class="relative w-full rounded-lg px-2.5 py-2 text-left ring-1 ring-foreground/10 transition-colors hover:bg-muted">
                <span class="block text-xs text-muted-foreground">Base Color</span>
                <span class="block text-sm font-medium text-foreground">{{ colorLabel() }}</span>
                <span class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 rounded-full" [style.background-color]="colorHex()"></span>
              </button>

              <!-- Theme -->
              <div class="relative w-full rounded-lg px-2.5 py-2 text-left ring-1 ring-foreground/10">
                <span class="block text-xs text-muted-foreground">Theme</span>
                <span class="block text-sm font-medium text-foreground">Neutral</span>
                <span class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 rounded-full bg-muted-foreground"></span>
              </div>

              <!-- Chart Color -->
              <div class="relative w-full rounded-lg px-2.5 py-2 text-left ring-1 ring-foreground/10">
                <span class="block text-xs text-muted-foreground">Chart Color</span>
                <span class="block text-sm font-medium text-foreground">Neutral</span>
                <span class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 rounded-full bg-muted-foreground"></span>
              </div>

              <div class="my-1 h-px bg-border"></div>

              <!-- Heading -->
              <button type="button" (click)="cycleFont()" class="relative w-full rounded-lg px-2.5 py-2 text-left ring-1 ring-foreground/10 transition-colors hover:bg-muted">
                <span class="block text-xs text-muted-foreground">Heading</span>
                <span class="block text-sm font-medium text-foreground">{{ fontLabel() }}</span>
                <span class="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-base font-medium text-foreground">Aa</span>
              </button>

              <!-- Font -->
              <button type="button" (click)="cycleFont()" class="relative w-full rounded-lg px-2.5 py-2 text-left ring-1 ring-foreground/10 transition-colors hover:bg-muted">
                <span class="block text-xs text-muted-foreground">Font</span>
                <span class="block text-sm font-medium text-foreground">{{ fontLabel() }}</span>
                <span class="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-base font-medium text-foreground">Aa</span>
              </button>

              <div class="my-1 h-px bg-border"></div>

              <!-- Icon Library -->
              <div class="relative w-full rounded-lg px-2.5 py-2 text-left ring-1 ring-foreground/10">
                <span class="block text-xs text-muted-foreground">Icon Library</span>
                <span class="block text-sm font-medium text-foreground">Lucide</span>
                <lucide-icon [img]="icons.Sparkles" class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-foreground" />
              </div>

              <!-- Radius -->
              <button type="button" (click)="cycleRadius()" class="relative w-full rounded-lg px-2.5 py-2 text-left ring-1 ring-foreground/10 transition-colors hover:bg-muted">
                <span class="block text-xs text-muted-foreground">Radius</span>
                <span class="block text-sm font-medium text-foreground">{{ radiusLabel() }}</span>
                <span class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 rounded-tl-[6px] border-t-2 border-l-2 border-foreground"></span>
              </button>

              <div class="my-1 h-px bg-border"></div>

              <!-- Menu -->
              <div class="relative w-full rounded-lg px-2.5 py-2 text-left ring-1 ring-foreground/10">
                <span class="block text-xs text-muted-foreground">Menu</span>
                <span class="block text-sm font-medium text-foreground">Default / Solid</span>
                <lucide-icon [img]="icons.Menu" class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-foreground" />
              </div>

              <!-- Menu Accent -->
              <div class="relative w-full rounded-lg px-2.5 py-2 text-left ring-1 ring-foreground/10">
                <span class="block text-xs text-muted-foreground">Menu Accent</span>
                <span class="block text-sm font-medium text-foreground">Subtle</span>
                <span class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 rounded-full border-2 border-foreground"></span>
              </div>
            </div>

            <!-- Footer: actions -->
            <div class="flex flex-col gap-2 border-t p-3">
              <button
                type="button"
                (click)="copyCommand()"
                class="flex items-center justify-between rounded-lg bg-muted px-2.5 py-2 text-xs font-medium text-muted-foreground ring-1 ring-foreground/10 transition-colors hover:bg-muted/70"
              >
                <span>{{ copied() ? 'Copied!' : '--preset b0' }}</span>
                <lucide-icon [img]="copied() ? icons.Check : icons.Copy" class="size-3.5" />
              </button>
              <Button variant="outline" size="sm" class="w-full justify-center gap-1.5">
                <lucide-icon [img]="icons.FolderOpen" class="size-3.5" />
                Open Preset
              </Button>
              <Button variant="outline" size="sm" class="w-full justify-center gap-1.5" (click)="cycleStyle()">
                <lucide-icon [img]="icons.Shuffle" class="size-3.5" />
                Shuffle
              </Button>
              <a routerLink="/docs/installation" class="block w-full">
                <Button size="sm" class="w-full justify-center gap-1.5">
                  <lucide-icon [img]="icons.Code" class="size-3.5" />
                  Get Code
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
  protected readonly icons = { Check, Code, Copy, FolderOpen, LayoutTemplate, Menu, Shuffle, Sparkles };
  protected readonly presets = PRESETS;
  protected readonly colors = COLORS;
  protected readonly fonts = FONTS;
  protected readonly radiusOptions = RADIUS;

  readonly selectedPreset = signal<string>('nova');
  readonly selectedColor = signal<string>('neutral');
  readonly selectedFont = signal<string>('inter');
  readonly selectedRadius = signal<string>('0.5');
  protected readonly copied = signal(false);

  // Display values for the picker rows
  protected readonly styleLabel = computed(
    () => PRESETS.find((p) => p.value === this.selectedPreset())?.name ?? 'Nova',
  );
  protected readonly colorLabel = computed(
    () => COLORS.find((c) => c.name === this.selectedColor())?.label ?? 'Neutral',
  );
  protected readonly colorHex = computed(
    () => COLORS.find((c) => c.name === this.selectedColor())?.hex ?? '#737373',
  );
  protected readonly fontLabel = computed(
    () => FONTS.find((f) => f.value === this.selectedFont())?.name ?? 'Inter',
  );
  protected readonly radiusLabel = computed(() => {
    const v = this.selectedRadius();
    return v === '0' ? 'None' : v === '0.5' ? 'Default' : v;
  });

  // Cycle helpers (each picker advances to the next option)
  private cycle<T>(list: readonly T[], pick: (x: T) => string, sig: { (): string; set: (v: string) => void }): void {
    const i = list.findIndex((x) => pick(x) === sig());
    sig.set(pick(list[(i + 1) % list.length]));
  }
  protected cycleStyle(): void { this.cycle(PRESETS, (p) => p.value, this.selectedPreset); }
  protected cycleColor(): void { this.cycle(COLORS, (c) => c.name, this.selectedColor); }
  protected cycleFont(): void { this.cycle(FONTS, (f) => f.value, this.selectedFont); }
  protected cycleRadius(): void { this.cycle(RADIUS, (r) => r.value, this.selectedRadius); }

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
