import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/components/ui/tabs';
import { cn } from '@/lib/utils';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { Code, Download, LucideAngularModule, Moon, Redo, RotateCcw, Sun, Undo, Upload } from 'lucide-angular';
import { Cards01Component, Dashboard01Component, Login01Component, Pricing01Component, Settings01Component, Sidebar01Component } from 'src/app/blocks';
import { ThemeService } from 'src/app/services';
import { AIGenerate, ColorSection, ThemeCodeModal, ThemeTabs } from './components';
import { TAILWIND_COLORS } from './data';

interface ColorValue {
  light: string;
  dark: string;
}

interface ThemeColors extends Record<string, ColorValue> {
  primary: ColorValue;
  secondary: ColorValue;
  accent: ColorValue;
  background: ColorValue;
  foreground: ColorValue;
  card: ColorValue;
  'card-foreground': ColorValue;
  border: ColorValue;
  input: ColorValue;
  ring: ColorValue;
  muted: ColorValue;
  'muted-foreground': ColorValue;
  'primary-foreground': ColorValue;
  'secondary-foreground': ColorValue;
  'accent-foreground': ColorValue;
}

type TabType = 'colors' | 'typography' | 'other' | 'generate';

@Component({
  selector: 'app-theme-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Cards01Component,
    Dashboard01Component,
    Login01Component,
    Pricing01Component,
    Settings01Component,
    Sidebar01Component,
    ThemeTabs,
    ColorSection,
    AIGenerate,
    ThemeCodeModal,
    LucideAngularModule,
  ],
  template: `
    <div class="w-full">
      <!-- Top Toolbar -->
      <div class="border-b bg-muted/30 px-6 py-3 flex items-center justify-between gap-4">
        <!-- Left: Color Presets -->
        <div class="flex items-center gap-3">
          <span class="text-xs font-medium text-muted-foreground">Color Presets</span>
          <div class="flex items-center gap-2">
            @for (preset of presets; track preset) {
              <button
                type="button"
                [class]="cn(
                  'h-6 w-6 rounded-full border-2 transition-all',
                  selectedPreset() === preset
                    ? 'border-foreground ring-2 ring-offset-2 ring-offset-background ring-foreground/20'
                    : 'border-border hover:border-foreground/50'
                )"
                [style.background-color]="preset"
                (click)="selectedPreset.set(preset)"
              ></button>
            }
          </div>
        </div>

        <!-- Right: Action Buttons -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            (click)="undo()"
            [disabled]="!canUndo()"
            class="inline-flex items-center justify-center size-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
            title="Undo"
          >
            <lucide-icon [img]="icons.Undo" class="size-4" />
          </button>
          <button
            type="button"
            (click)="redo()"
            [disabled]="!canRedo()"
            class="inline-flex items-center justify-center size-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
            title="Redo"
          >
            <lucide-icon [img]="icons.Redo" class="size-4" />
          </button>
          <div class="w-px h-6 bg-border mx-1"></div>
          <button
            type="button"
            (click)="resetColors()"
            class="inline-flex items-center justify-center gap-2 h-9 px-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium"
          >
            <lucide-icon [img]="icons.RotateCcw" class="size-4" />
            Reset
          </button>
          <button
            type="button"
            (click)="importTheme()"
            class="inline-flex items-center justify-center gap-2 h-9 px-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium"
          >
            <lucide-icon [img]="icons.Upload" class="size-4" />
            Import
          </button>
          <button
            type="button"
            (click)="openCodeModal()"
            class="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
          >
            <lucide-icon [img]="icons.Code" class="size-4" />
            Code
          </button>
        </div>
      </div>

      <div class="grid lg:grid-cols-[380px_1fr]">
        <!-- Sidebar -->
        <aside class="h-[calc(100vh-9rem)] overflow-y-auto border-r bg-muted/20">
          <div class="p-6 flex flex-col gap-6">
            <!-- Tabs Navigation -->
            <ThemeTabs [activeTab]="activeTab()" (tabChange)="activeTab.set($event)" />

            <!-- Colors Panel -->
            @if (activeTab() === 'colors') {
              <div class="flex flex-col gap-5">
                @for (section of colorSections; track section.title) {
                  <ColorSection
                    [title]="section.title"
                    [colorKeys]="section.colors"
                    [initialExpanded]="expandedSections()[section.title]"
                    [colors]="colors()"
                    [isDark]="themeService.isDark()"
                    [tailwindColors]="tailwindColors"
                    (colorChange)="onColorChange($event)"
                    (colorSelected)="onColorSelected($event)"
                  />
                }
              </div>
            }

            @if (activeTab() === 'typography') {
              <div class="text-sm text-muted-foreground text-center py-8">
                Typography settings coming soon
              </div>
            }

            @if (activeTab() === 'other') {
              <div class="text-sm text-muted-foreground text-center py-8">
                Other settings coming soon
              </div>
            }

            @if (activeTab() === 'generate') {
              <AIGenerate (themeGenerated)="onThemeGenerated($event)" />
            }
          </div>
        </aside>

        <!-- Main Content -->
        <main class="h-[calc(100vh-9rem)] overflow-y-auto bg-background">
          <div class="p-8 space-y-8">
            <!-- Live Preview Section -->
            <section class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="space-y-1.5">
                  <h2 class="text-xl font-semibold tracking-tight">Live Preview</h2>
                  <p class="text-sm text-muted-foreground">
                    See your theme changes across different blocks in real-time
                  </p>
                </div>
              </div>

              <!-- Block Tabs -->
              <Tabs [value]="selectedBlock()" (valueChange)="onBlockChange($event)">
                <TabsList class="mb-6 bg-muted">
                  <TabsTrigger value="cards">Cards</TabsTrigger>
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
                </TabsList>

                <TabsContent value="cards">
                  <div class="overflow-hidden rounded-xl border bg-background shadow-sm">
                    <div class="h-[600px] overflow-auto p-6">
                      <app-cards-01 />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="dashboard">
                  <div class="overflow-hidden rounded-xl border bg-background shadow-sm">
                    <div class="h-[600px] overflow-auto">
                      <app-dashboard-01 />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="login">
                  <div class="flex items-center justify-center rounded-xl border bg-muted/30 shadow-sm min-h-[600px] p-8">
                    <app-login-01 />
                  </div>
                </TabsContent>

                <TabsContent value="pricing">
                  <div class="overflow-hidden rounded-xl border bg-background shadow-sm">
                    <div class="h-[600px] overflow-auto">
                      <app-pricing-01 />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  <div class="overflow-hidden rounded-xl border bg-background shadow-sm">
                    <div class="h-[600px] overflow-auto p-6">
                      <app-settings-01 />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sidebar">
                  <div class="overflow-hidden rounded-xl border bg-background shadow-sm">
                    <div class="h-[600px] overflow-auto">
                      <app-sidebar-01 />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </section>
          </div>
        </main>
      </div>

      <!-- Theme Code Modal -->
      <ThemeCodeModal [colors]="colors()" [open]="showCodeModal()" (openChange)="showCodeModal.set($event)" />
    </div>
  `,
})
export class ThemeEditorPage {
  private platformId = inject(PLATFORM_ID);
  protected readonly themeService = inject(ThemeService);

  protected readonly cn = cn;
  protected readonly icons = { Moon, Sun, Undo, Redo, RotateCcw, Upload, Code, Download };

  protected readonly activeTab = signal<TabType>('colors');
  protected readonly selectedBlock = signal('cards');
  protected readonly selectedPreset = signal('#000000');

  // Undo/Redo history
  private readonly history = signal<ThemeColors[]>([]);
  private readonly historyIndex = signal(-1);
  private readonly maxHistory = 50;

  protected readonly canUndo = computed(() => this.historyIndex() > 0);
  protected readonly canRedo = computed(() => this.historyIndex() < this.history().length - 1);

  // Code modal state
  protected readonly showCodeModal = signal(false);

  protected readonly presets = ['#000000', '#fee2e2', '#fecaca', '#fca5a5', '#f87171'];

  protected readonly expandedSections = signal<Record<string, boolean>>({
    'Primary Colors': true,
    'Secondary Colors': true,
    'Accent Colors': true,
    'Base Colors': true,
    'Card Colors': false,
    'Muted Colors': false,
    'Border & Input': false,
  });

  protected readonly colorSections = [
    { title: 'Primary Colors', colors: ['primary', 'primary-foreground'] },
    { title: 'Secondary Colors', colors: ['secondary', 'secondary-foreground'] },
    { title: 'Accent Colors', colors: ['accent', 'accent-foreground'] },
    { title: 'Base Colors', colors: ['background', 'foreground'] },
    { title: 'Card Colors', colors: ['card', 'card-foreground'] },
    { title: 'Muted Colors', colors: ['muted', 'muted-foreground'] },
    { title: 'Border & Input', colors: ['border', 'input', 'ring'] },
  ];

  // Use complete Tailwind v4 colors from data file
  protected readonly tailwindColors = TAILWIND_COLORS;

  protected readonly colors = signal<ThemeColors>({
    primary: { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    secondary: { light: 'oklch(0.97 0 0)', dark: 'oklch(0.269 0 0)' },
    accent: { light: 'oklch(0.97 0 0)', dark: 'oklch(0.371 0 0)' },
    background: { light: 'oklch(1 0 0)', dark: 'oklch(0.145 0 0)' },
    foreground: { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    card: { light: 'oklch(1 0 0)', dark: 'oklch(0.205 0 0)' },
    'card-foreground': { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    border: { light: 'oklch(0.92 0 0)', dark: 'oklch(0.27 0 0)' },
    input: { light: 'oklch(0.92 0 0)', dark: 'oklch(0.27 0 0)' },
    ring: { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    muted: { light: 'oklch(0.97 0 0)', dark: 'oklch(0.205 0 0)' },
    'muted-foreground': { light: 'oklch(0.55 0 0)', dark: 'oklch(0.65 0 0)' },
    'primary-foreground': { light: 'oklch(0.985 0 0)', dark: 'oklch(0.145 0 0)' },
    'secondary-foreground': { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    'accent-foreground': { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
  });

  private readonly defaultColors: ThemeColors = {
    primary: { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    secondary: { light: 'oklch(0.97 0 0)', dark: 'oklch(0.269 0 0)' },
    accent: { light: 'oklch(0.97 0 0)', dark: 'oklch(0.371 0 0)' },
    background: { light: 'oklch(1 0 0)', dark: 'oklch(0.145 0 0)' },
    foreground: { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    card: { light: 'oklch(1 0 0)', dark: 'oklch(0.205 0 0)' },
    'card-foreground': { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    border: { light: 'oklch(0.92 0 0)', dark: 'oklch(0.27 0 0)' },
    input: { light: 'oklch(0.92 0 0)', dark: 'oklch(0.27 0 0)' },
    ring: { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    muted: { light: 'oklch(0.97 0 0)', dark: 'oklch(0.205 0 0)' },
    'muted-foreground': { light: 'oklch(0.55 0 0)', dark: 'oklch(0.65 0 0)' },
    'primary-foreground': { light: 'oklch(0.985 0 0)', dark: 'oklch(0.145 0 0)' },
    'secondary-foreground': { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    'accent-foreground': { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
  };

  protected readonly generatedCSS = computed(() => {
    const colors = this.colors();
    const entries = Object.entries(colors) as [keyof ThemeColors, ColorValue][];

    return `@layer base {
  :root {
${entries.map(([key, value]) => `    --${key}: ${value.light};`).join('\n')}
  }

  .dark {
${entries.map(([key, value]) => `    --${key}: ${value.dark};`).join('\n')}
  }
}`;
  });

  constructor() {
    // Watch colors and theme changes
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.colors(); // Track colors changes
        this.themeService.isDark(); // Track theme changes
        this.applyTheme();
      }
    });
  }

  protected onColorChange(event: { key: string; value: string }): void {
    let value = event.value;

    // Convert hex to oklch if needed
    if (value.startsWith('#')) {
      value = this.hexToOklch(value);
    }

    const currentColor = this.colors()[event.key as keyof ThemeColors];
    const isDark = this.themeService.isDark();

    // Save current state before making changes
    this.saveToHistory();

    // Update both light and dark values based on current mode
    const updatedColors = {
      ...this.colors(),
      [event.key]: {
        light: isDark ? (currentColor?.light || value) : value,
        dark: isDark ? value : (currentColor?.dark || value),
      },
    };
    this.colors.set(updatedColors as ThemeColors);
  }

  protected onColorSelected(event: { key: string; hex: string }): void {
    const oklchValue = this.hexToOklch(event.hex);
    const currentColor = this.colors()[event.key as keyof ThemeColors];
    const isDark = this.themeService.isDark();

    // Save current state before making changes
    this.saveToHistory();

    // Update both light and dark values based on current mode
    const updatedColors = {
      ...this.colors(),
      [event.key]: {
        light: isDark ? (currentColor?.light || oklchValue) : oklchValue,
        dark: isDark ? oklchValue : (currentColor?.dark || oklchValue),
      },
    };
    this.colors.set(updatedColors as ThemeColors);
  }

  protected onThemeGenerated(generatedColors: Record<string, { light: string; dark: string }>): void {
    this.saveToHistory();
    this.colors.set(generatedColors as unknown as ThemeColors);
  }

  protected onBlockChange(value: string): void {
    this.selectedBlock.set(value);
  }

  protected openCodeModal(): void {
    this.showCodeModal.set(true);
  }

  private applyTheme(): void {
    const colors = this.colors();
    const root = document.documentElement;
    const isDark = this.themeService.isDark();

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, isDark ? value.dark : value.light);
    });
  }

  /**
   * Convert hex color to OKLCH format with proper chroma and hue preservation
   */
  private hexToOklch(hex: string): string {
    // Parse hex to RGB
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    // Convert RGB to linear RGB
    const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    const lr = toLinear(r);
    const lg = toLinear(g);
    const lb = toLinear(b);

    // Convert linear RGB to XYZ (D65)
    const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb;
    const y = 0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb;
    const z = 0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb;

    // Convert XYZ to LMS
    const l = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
    const m = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
    const s = 0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z;

    // Apply cube root
    const lp = Math.cbrt(l);
    const mp = Math.cbrt(m);
    const sp = Math.cbrt(s);

    // Convert to OKLab
    const L = 0.2104542553 * lp + 0.7936177850 * mp - 0.0040720468 * sp;
    const a = 1.9779984951 * lp - 2.4285922050 * mp + 0.4505937099 * sp;
    const bLab = 0.0259040371 * lp + 0.7827717662 * mp - 0.8086757660 * sp;

    // Convert OKLab to OKLCH
    const C = Math.sqrt(a * a + bLab * bLab);
    let H = Math.atan2(bLab, a) * (180 / Math.PI);
    if (H < 0) H += 360;

    // Format with proper precision
    const lightness = Math.max(0, Math.min(1, L)).toFixed(3);
    const chroma = Math.max(0, Math.min(0.4, C)).toFixed(3);
    const hue = C < 0.001 ? '0' : H.toFixed(1); // Use 0 hue for near-gray colors

    return `oklch(${lightness} ${chroma} ${hue})`;
  }

  // Save current state to history
  private saveToHistory(): void {
    const currentColors = this.colors();
    const currentIndex = this.historyIndex();
    const currentHistory = this.history();

    // Remove any future states if we're not at the end
    const newHistory = currentHistory.slice(0, currentIndex + 1);

    // Add current state
    newHistory.push(JSON.parse(JSON.stringify(currentColors)));

    // Limit history size
    if (newHistory.length > this.maxHistory) {
      newHistory.shift();
    }

    this.history.set(newHistory);
    this.historyIndex.set(newHistory.length - 1);
  }

  protected undo(): void {
    const currentIndex = this.historyIndex();
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      this.historyIndex.set(newIndex);
      this.colors.set(JSON.parse(JSON.stringify(this.history()[newIndex])));
    }
  }

  protected redo(): void {
    const currentIndex = this.historyIndex();
    const historyLength = this.history().length;
    if (currentIndex < historyLength - 1) {
      const newIndex = currentIndex + 1;
      this.historyIndex.set(newIndex);
      this.colors.set(JSON.parse(JSON.stringify(this.history()[newIndex])));
    }
  }

  protected resetColors(): void {
    this.saveToHistory();
    this.colors.set(JSON.parse(JSON.stringify(this.defaultColors)));
    this.saveToHistory();
  }

  protected importTheme(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.css';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const content = event.target?.result as string;
            if (file.name.endsWith('.json')) {
              const parsed = JSON.parse(content);
              this.saveToHistory();
              this.colors.set(parsed as ThemeColors);
              this.saveToHistory();
            } else if (file.name.endsWith('.css')) {
              // Parse CSS variables
              this.parseCSSAndApply(content);
            }
          } catch (error) {
            console.error('Failed to parse theme file:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  private parseCSSAndApply(css: string): void {
    const colorRegex = /--([a-z-]+):\s*([^;]+);/gi;
    const newColors: Partial<ThemeColors> = {};
    let match;

    while ((match = colorRegex.exec(css)) !== null) {
      const [, key, value] = match;
      if (key in this.colors()) {
        // Assume it's for light mode if not in .dark block
        if (!newColors[key as keyof ThemeColors]) {
          newColors[key as keyof ThemeColors] = {
            light: value.trim(),
            dark: value.trim(),
          };
        }
      }
    }

    if (Object.keys(newColors).length > 0) {
      this.saveToHistory();
      this.colors.set({
        ...this.colors(),
        ...newColors,
      } as ThemeColors);
      this.saveToHistory();
    }
  }
}
