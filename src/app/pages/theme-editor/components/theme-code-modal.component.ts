import { CodeBlock } from '@/app/components/code-block';
import { Button } from '@/lib/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/lib/components/ui/tabs';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { Heart, LucideAngularModule, X } from 'lucide-angular';

type ColorFormat = 'hex' | 'oklch' | 'hsl' | 'rgb';
type CSSFormat = 'tailwind-v4' | 'tailwind-v3' | 'css';

interface ColorValue {
  light: string;
  dark: string;
}

/**
 * Theme code export modal component - Simple inline implementation
 */
@Component({
  selector: 'ThemeCodeModal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tabs, TabsList, TabsTrigger, Button, LucideAngularModule, CodeBlock],
  template: `
    @if (open()) {
      <!-- Backdrop -->
      <div
        class="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0"
        (click)="close()"
      ></div>

      <!-- Modal Content -->
      <div
        class="fixed left-[50%] top-[50%] z-50 w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] border bg-background p-6 shadow-lg sm:rounded-lg animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] max-h-[85vh] overflow-hidden flex flex-col"
      >
        <!-- Header -->
        <div class="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
          <h2 class="text-lg font-semibold leading-none tracking-tight">Theme Code</h2>
          <p class="text-sm text-muted-foreground">
            Export your theme configuration in different formats
          </p>
        </div>

        <!-- Close button -->
        <button
          type="button"
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          (click)="close()"
        >
          <lucide-icon [img]="icons.X" class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </button>

        <div class="flex-1 overflow-hidden flex flex-col gap-4">
          <!-- Package manager tabs -->
          <Tabs [value]="selectedPackageManager()" (valueChange)="selectedPackageManager.set($event)">
            <div class="flex items-center justify-between">
              <TabsList class="bg-muted">
                <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                <TabsTrigger value="npm">npm</TabsTrigger>
                <TabsTrigger value="yarn">yarn</TabsTrigger>
                <TabsTrigger value="bun">bun</TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="sm" class="gap-2 text-muted-foreground">
                <lucide-icon [img]="icons.Heart" class="size-4" />
                Save
              </Button>
            </div>
          </Tabs>

          <p class="text-sm text-muted-foreground">
            Save your theme to get the registry command
          </p>

          <!-- Format selectors -->
          <div class="flex items-center gap-2">
            <select
              [value]="cssFormat()"
              (change)="cssFormat.set($any($event.target).value)"
              class="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="tailwind-v4">Tailwind v4</option>
              <option value="tailwind-v3">Tailwind v3</option>
              <option value="css">Plain CSS</option>
            </select>
            <select
              [value]="colorFormat()"
              (change)="colorFormat.set($any($event.target).value)"
              class="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="oklch">oklch</option>
              <option value="hex">hex</option>
              <option value="hsl">hsl</option>
              <option value="rgb">rgb</option>
            </select>
          </div>

          <!-- Code preview -->
          <div class="flex-1 overflow-hidden">
            <CodeBlock
              [code]="generatedCode()"
              language="css"
              filename="index.css"
              [showLineNumbers]="false"
              class="h-full"
            />
          </div>
        </div>
      </div>
    }
  `,
  host: {
    class: 'contents',
  },
})
export class ThemeCodeModal {
  readonly colors = input.required<Record<string, ColorValue>>();
  readonly open = input<boolean>(false);
  readonly openChange = output<boolean>();

  protected readonly icons = { Heart, X };
  protected readonly selectedPackageManager = signal('pnpm');
  protected readonly cssFormat = signal<CSSFormat>('tailwind-v4');
  protected readonly colorFormat = signal<ColorFormat>('hex');

  protected close(): void {
    this.openChange.emit(false);
  }

  protected readonly generatedCode = computed(() => {
    const colors = this.colors();
    const format = this.cssFormat();
    const colorFmt = this.colorFormat();

    const entries = Object.entries(colors);

    const formatColor = (value: string): string => {
      if (colorFmt === 'oklch') return value;
      if (colorFmt === 'hex') return this.oklchToHex(value);
      if (colorFmt === 'hsl') return this.oklchToHsl(value);
      if (colorFmt === 'rgb') return this.oklchToRgb(value);
      return value;
    };

    if (format === 'tailwind-v4') {
      return `:root {
${entries.map(([key, value]) => `  --${key}: ${formatColor(value.light)};`).join('\n')}
}

.dark {
${entries.map(([key, value]) => `  --${key}: ${formatColor(value.dark)};`).join('\n')}
}`;
    }

    if (format === 'tailwind-v3') {
      return `@layer base {
  :root {
${entries.map(([key, value]) => `    --${key}: ${formatColor(value.light)};`).join('\n')}
  }

  .dark {
${entries.map(([key, value]) => `    --${key}: ${formatColor(value.dark)};`).join('\n')}
  }
}`;
    }

    return `:root {
${entries.map(([key, value]) => `  --${key}: ${formatColor(value.light)};`).join('\n')}
}

@media (prefers-color-scheme: dark) {
  :root {
${entries.map(([key, value]) => `    --${key}: ${formatColor(value.dark)};`).join('\n')}
  }
}`;
  });

  private oklchToHex(oklch: string): string {
    const match = oklch.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/);
    if (!match) return oklch;

    const L = parseFloat(match[1]);
    const C = parseFloat(match[2]);
    const H = parseFloat(match[3]);

    const hRad = (H * Math.PI) / 180;
    const a = C * Math.cos(hRad);
    const b = C * Math.sin(hRad);

    const lp = L + 0.3963377774 * a + 0.2158037573 * b;
    const mp = L - 0.1055613458 * a - 0.0638541728 * b;
    const sp = L - 0.0894841775 * a - 1.291485548 * b;

    const l = lp * lp * lp;
    const m = mp * mp * mp;
    const s = sp * sp * sp;

    const lr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

    const toSrgb = (c: number) => {
      const clamped = Math.max(0, Math.min(1, c));
      return clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
    };

    const r = Math.round(toSrgb(lr) * 255);
    const g = Math.round(toSrgb(lg) * 255);
    const bVal = Math.round(toSrgb(lb) * 255);

    const toHex = (n: number) =>
      Math.max(0, Math.min(255, n))
        .toString(16)
        .padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(bVal)}`;
  }

  private oklchToHsl(oklch: string): string {
    const hex = this.oklchToHex(oklch);
    if (hex === oklch) return oklch;

    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0;
    let s = 0;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  }

  private oklchToRgb(oklch: string): string {
    const hex = this.oklchToHex(oklch);
    if (hex === oklch) return oklch;

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`;
  }
}
