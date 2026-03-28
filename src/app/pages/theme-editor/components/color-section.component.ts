import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';
import { TailwindColor } from '../data';
import { ColorInput } from './color-input.component';

/**
 * Collapsible color section with multiple color inputs
 */
@Component({
  selector: 'ColorSection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ColorInput, LucideAngularModule],
  template: `
    <div class="rounded-lg border bg-card p-4 shadow-sm">
      <button
        type="button"
        class="flex w-full items-center justify-between text-sm font-semibold hover:text-foreground transition-colors"
        (click)="toggleExpanded()"
      >
        {{ title() }}
        <lucide-icon
          [img]="icons.ChevronDown"
          [class]="
            cn(
              'h-4 w-4 transition-transform text-muted-foreground',
              isExpanded() ? 'rotate-180' : ''
            )
          "
        />
      </button>
      @if (isExpanded()) {
        <div class="flex flex-col gap-3 mt-4 pt-4 border-t">
          @for (colorKey of colorKeys(); track colorKey) {
            <ColorInput
              [label]="formatLabel(colorKey)"
              [value]="getColorValue(colorKey)"
              [hexColor]="getHexColor(colorKey)"
              [tailwindColors]="tailwindColors()"
              (valueChange)="onValueChange(colorKey, $event)"
              (colorSelected)="onColorSelected(colorKey, $event)"
            />
          }
        </div>
      }
    </div>
  `,
})
export class ColorSection {
  readonly title = input.required<string>();
  readonly colorKeys = input.required<string[]>();
  readonly initialExpanded = input<boolean>(true);
  readonly colors = input.required<Record<string, { light: string; dark: string }>>();
  readonly isDark = input<boolean>(false);
  readonly tailwindColors = input<TailwindColor[]>([]);
  readonly colorChange = output<{ key: string; value: string }>();
  readonly colorSelected = output<{ key: string; hex: string }>();

  protected readonly cn = cn;
  protected readonly icons = { ChevronDown };
  protected readonly isExpanded = signal(true);

  constructor() {
    effect(() => {
      this.isExpanded.set(this.initialExpanded());
    });
  }

  protected toggleExpanded(): void {
    this.isExpanded.set(!this.isExpanded());
  }

  protected formatLabel(key: string): string {
    return key.replace(/-/g, ' ');
  }

  protected getColorValue(key: string): string {
    const color = this.colors()[key];
    return this.isDark() ? color?.dark || '' : color?.light || '';
  }

  protected getHexColor(key: string): string {
    const oklch = this.getColorValue(key);
    return this.oklchToHex(oklch);
  }

  /**
   * Convert OKLCH color string to hex
   */
  private oklchToHex(oklch: string): string {
    const match = oklch.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/);
    if (!match) return '#000000';

    const L = parseFloat(match[1]);
    const C = parseFloat(match[2]);
    const H = parseFloat(match[3]);

    // Convert OKLCH to OKLab
    const hRad = (H * Math.PI) / 180;
    const a = C * Math.cos(hRad);
    const b = C * Math.sin(hRad);

    // Convert OKLab to linear sRGB
    const lp = L + 0.3963377774 * a + 0.2158037573 * b;
    const mp = L - 0.1055613458 * a - 0.0638541728 * b;
    const sp = L - 0.0894841775 * a - 1.291485548 * b;

    const l = lp * lp * lp;
    const m = mp * mp * mp;
    const s = sp * sp * sp;

    const rLin = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

    // Convert linear to sRGB
    const toSrgb = (c: number) => {
      const clamped = Math.max(0, Math.min(1, c));
      return clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
    };

    const r = Math.round(toSrgb(rLin) * 255);
    const g = Math.round(toSrgb(gLin) * 255);
    const bVal = Math.round(toSrgb(bLin) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bVal.toString(16).padStart(2, '0')}`;
  }

  protected onValueChange(key: string, value: string): void {
    this.colorChange.emit({ key, value });
  }

  protected onColorSelected(key: string, hex: string): void {
    this.colorSelected.emit({ key, hex });
  }
}
