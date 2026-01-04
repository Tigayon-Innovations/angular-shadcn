import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { ColorInput } from './color-input.component';

interface TailwindColor {
  name: string;
  shades: { label: string; value: string; hex: string }[];
}

/**
 * Collapsible color section with multiple color inputs
 */
@Component({
  selector: 'ColorSection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ColorInput],
  template: `
    <div class="rounded-lg border bg-card p-4 shadow-sm">
      <button
        type="button"
        class="flex w-full items-center justify-between text-sm font-semibold hover:text-foreground transition-colors"
        (click)="toggleExpanded()"
      >
        {{ title() }}
        <span [class]="cn('transition-transform text-xs text-muted-foreground', isExpanded() ? 'rotate-180' : '')">▼</span>
      </button>
      @if (isExpanded()) {
        <div class="space-y-3 mt-4 pt-4 border-t">
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
  readonly tailwindColors = input<TailwindColor[]>([]);
  readonly colorChange = output<{ key: string; value: string }>();
  readonly colorSelected = output<{ key: string; hex: string }>();

  protected readonly cn = cn;
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
    return this.colors()[key]?.light || '';
  }

  protected getHexColor(key: string): string {
    const oklch = this.getColorValue(key);
    const match = oklch.match(/oklch\(([0-9.]+)/);
    if (match) {
      const lightness = parseFloat(match[1]);
      const gray = Math.round(lightness * 255);
      return `#${gray.toString(16).padStart(2, '0')}${gray.toString(16).padStart(2, '0')}${gray.toString(16).padStart(2, '0')}`;
    }
    return '#000000';
  }

  protected onValueChange(key: string, value: string): void {
    this.colorChange.emit({ key, value });
  }

  protected onColorSelected(key: string, hex: string): void {
    this.colorSelected.emit({ key, hex });
  }
}
