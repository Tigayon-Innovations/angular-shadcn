import { CodeBlock } from '@/components/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/components/ui/tabs';
import { cn } from '@/lib/utils';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { Dashboard01Component, Login01Component, Pricing01Component, Settings01Component } from 'src/app/blocks';
import { ThemeService } from 'src/app/services';
import { AIGenerate, ColorSection, ThemeTabs } from './components';

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

interface TailwindColor {
  name: string;
  shades: { label: string; value: string; hex: string }[];
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
    Dashboard01Component,
    Login01Component,
    Pricing01Component,
    Settings01Component,
    CodeBlock,
    ThemeTabs,
    ColorSection,
    AIGenerate,
    LucideAngularModule,
  ],
  template: `
    <div class="w-full">


      <!-- Preset Selector -->
      <div class="border-b bg-muted/30 px-6 py-4">
        <label class="text-xs font-medium text-muted-foreground mb-2 block">Color Presets</label>
        <div class="flex items-center gap-3">
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
              <div class="space-y-1.5">
                <h2 class="text-xl font-semibold tracking-tight">Live Preview</h2>
                <p class="text-sm text-muted-foreground">
                  See your theme changes across different blocks in real-time
                </p>
              </div>

              <!-- Block Tabs -->
              <Tabs [value]="selectedBlock()" (valueChange)="onBlockChange($event)">
                <TabsList class="mb-6 bg-muted">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard">
                  <div class="overflow-hidden rounded-lg border bg-background">
                    <div class="h-[600px] overflow-auto">
                      <app-dashboard-01 />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="login">
                  <div class="flex items-center justify-center rounded-lg border bg-muted/30 p-8 min-h-[600px]">
                    <div class="w-full max-w-md">
                      <app-login-01 />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pricing">
                  <div class="overflow-hidden rounded-lg border bg-background">
                    <div class="h-[600px] overflow-auto">
                      <app-pricing-01 />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  <div class="overflow-hidden rounded-lg border bg-background">
                    <div class="h-[600px] overflow-auto">
                      <app-settings-01 />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            <!-- Export CSS Section -->
            <section class="space-y-4 pt-6 border-t">
              <div class="space-y-1.5">
                <h2 class="text-xl font-semibold tracking-tight">Export CSS</h2>
                <p class="text-sm text-muted-foreground">
                  Copy this CSS to your global styles file to apply your custom theme
                </p>
              </div>
              <CodeBlock
                [code]="generatedCSS()"
                [language]="'css'"
                [filename]="'styles.css'"
                [showLineNumbers]="false"
              />
            </section>
          </div>
        </main>
      </div>
    </div>
  `,
})
export class ThemeEditorPage {
  private platformId = inject(PLATFORM_ID);
  protected readonly themeService = inject(ThemeService);

  protected readonly cn = cn;
  protected readonly icons = { Moon, Sun };

  protected readonly activeTab = signal<TabType>('colors');
  protected readonly selectedBlock = signal('dashboard');
  protected readonly selectedPreset = signal('#000000');

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

  protected readonly tailwindColors: TailwindColor[] = [
    {
      name: 'Red',
      shades: [
        { label: 'red-50', value: '50', hex: '#fef2f2' },
        { label: 'red-100', value: '100', hex: '#fee2e2' },
        { label: 'red-200', value: '200', hex: '#fecaca' },
        { label: 'red-300', value: '300', hex: '#fca5a5' },
        { label: 'red-400', value: '400', hex: '#f87171' },
        { label: 'red-500', value: '500', hex: '#ef4444' },
        { label: 'red-600', value: '600', hex: '#dc2626' },
        { label: 'red-700', value: '700', hex: '#b91c1c' },
        { label: 'red-800', value: '800', hex: '#991b1b' },
        { label: 'red-900', value: '900', hex: '#7f1d1d' },
      ],
    },
    {
      name: 'Blue',
      shades: [
        { label: 'blue-50', value: '50', hex: '#eff6ff' },
        { label: 'blue-100', value: '100', hex: '#dbeafe' },
        { label: 'blue-200', value: '200', hex: '#bfdbfe' },
        { label: 'blue-300', value: '300', hex: '#93c5fd' },
        { label: 'blue-400', value: '400', hex: '#60a5fa' },
        { label: 'blue-500', value: '500', hex: '#3b82f6' },
        { label: 'blue-600', value: '600', hex: '#2563eb' },
        { label: 'blue-700', value: '700', hex: '#1d4ed8' },
        { label: 'blue-800', value: '800', hex: '#1e40af' },
        { label: 'blue-900', value: '900', hex: '#1e3a8a' },
      ],
    },
    {
      name: 'Green',
      shades: [
        { label: 'green-50', value: '50', hex: '#f0fdf4' },
        { label: 'green-100', value: '100', hex: '#dcfce7' },
        { label: 'green-200', value: '200', hex: '#bbf7d0' },
        { label: 'green-300', value: '300', hex: '#86efac' },
        { label: 'green-400', value: '400', hex: '#4ade80' },
        { label: 'green-500', value: '500', hex: '#22c55e' },
        { label: 'green-600', value: '600', hex: '#16a34a' },
        { label: 'green-700', value: '700', hex: '#15803d' },
        { label: 'green-800', value: '800', hex: '#166534' },
        { label: 'green-900', value: '900', hex: '#14532d' },
      ],
    },
    {
      name: 'Purple',
      shades: [
        { label: 'purple-50', value: '50', hex: '#faf5ff' },
        { label: 'purple-100', value: '100', hex: '#f3e8ff' },
        { label: 'purple-200', value: '200', hex: '#e9d5ff' },
        { label: 'purple-300', value: '300', hex: '#d8b4fe' },
        { label: 'purple-400', value: '400', hex: '#c084fc' },
        { label: 'purple-500', value: '500', hex: '#a855f7' },
        { label: 'purple-600', value: '600', hex: '#9333ea' },
        { label: 'purple-700', value: '700', hex: '#7e22ce' },
        { label: 'purple-800', value: '800', hex: '#6b21a8' },
        { label: 'purple-900', value: '900', hex: '#581c87' },
      ],
    },
    {
      name: 'Zinc',
      shades: [
        { label: 'zinc-50', value: '50', hex: '#fafafa' },
        { label: 'zinc-100', value: '100', hex: '#f4f4f5' },
        { label: 'zinc-200', value: '200', hex: '#e4e4e7' },
        { label: 'zinc-300', value: '300', hex: '#d4d4d8' },
        { label: 'zinc-400', value: '400', hex: '#a1a1aa' },
        { label: 'zinc-500', value: '500', hex: '#71717a' },
        { label: 'zinc-600', value: '600', hex: '#52525b' },
        { label: 'zinc-700', value: '700', hex: '#3f3f46' },
        { label: 'zinc-800', value: '800', hex: '#27272a' },
        { label: 'zinc-900', value: '900', hex: '#18181b' },
      ],
    },
  ];

  protected readonly colors = signal<ThemeColors>({
    primary: { light: 'oklch(0.985 0 0)', dark: 'oklch(0.985 0 0)' },
    secondary: { light: 'oklch(0.97 0 0)', dark: 'oklch(0.269 0 0)' },
    accent: { light: 'oklch(0.97 0 0)', dark: 'oklch(0.371 0 0)' },
    background: { light: 'oklch(1 0 0)', dark: 'oklch(0.145 0 0)' },
    foreground: { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    card: { light: 'oklch(1 0 0)', dark: 'oklch(0.205 0 0)' },
    'card-foreground': { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    border: { light: 'oklch(0.92 0 0)', dark: 'oklch(0.27 0 0)' },
    input: { light: 'oklch(0.92 0 0)', dark: 'oklch(0.27 0 0)' },
    ring: { light: 'oklch(0.985 0 0)', dark: 'oklch(0.985 0 0)' },
    muted: { light: 'oklch(0.97 0 0)', dark: 'oklch(0.205 0 0)' },
    'muted-foreground': { light: 'oklch(0.55 0 0)', dark: 'oklch(0.65 0 0)' },
    'primary-foreground': { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    'secondary-foreground': { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
    'accent-foreground': { light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)' },
  });

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
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
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

    const updatedColors = {
      ...this.colors(),
      [event.key]: {
        ...this.colors()[event.key as keyof ThemeColors],
        light: value,
      },
    };
    this.colors.set(updatedColors as ThemeColors);
  }

  protected onColorSelected(event: { key: string; hex: string }): void {
    const oklchValue = this.hexToOklch(event.hex);
    const updatedColors = {
      ...this.colors(),
      [event.key]: {
        ...this.colors()[event.key as keyof ThemeColors],
        light: oklchValue,
      },
    };
    this.colors.set(updatedColors as ThemeColors);
  }

  protected onThemeGenerated(generatedColors: Record<string, { light: string; dark: string }>): void {
    this.colors.set(generatedColors as unknown as ThemeColors);
  }

  protected onBlockChange(value: string | Event): void {
    const blockValue = typeof value === 'string' ? value : (value as any).detail || 'dashboard';
    this.selectedBlock.set(blockValue);
  }

  private applyTheme(): void {
    const colors = this.colors();
    const root = document.documentElement;
    const isDark = this.themeService.isDark();

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, isDark ? value.dark : value.light);
    });
  }

  private hexToOklch(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return `oklch(${l.toFixed(3)} 0 0)`;
  }
}
