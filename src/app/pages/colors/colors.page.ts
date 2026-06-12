import { Segmented, SegmentedItem } from '@/ui/segmented';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  COLOR_FORMATS,
  COLOR_SCALES,
  type ColorFormat,
  type ColorShade,
} from './colors-data';

/**
 * Colors page - replicates ui.shadcn.com/colors.
 *
 * Displays the full Tailwind CSS v4 color palette. Each swatch can be clicked
 * to copy its value in the selected format (className, hex, rgb, hsl, oklch).
 */
@Component({
  selector: 'ColorsPage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Segmented, SegmentedItem],
  template: `
    <div class="min-h-screen bg-background">
      <div class="container mx-auto max-w-6xl px-4 py-8">
        <!-- Header -->
        <div class="flex flex-col gap-2">
          <h1 class="scroll-m-20 text-3xl font-bold tracking-tight md:text-4xl">Colors</h1>
          <p class="text-lg text-muted-foreground">
            Tailwind CSS colors in HSL, RGB, HEX and OKLCH formats.
          </p>
        </div>

        <!-- Format selector -->
        <div class="sticky top-0 z-10 -mx-4 mt-6 border-b border-border bg-background px-4 py-3">
          <div class="flex items-center justify-between gap-4">
            <span class="text-sm text-muted-foreground">Format</span>
            <Segmented [value]="format()" (valueChange)="setFormat($event)">
              @for (f of formats; track f) {
                <SegmentedItem [value]="f" class="font-mono text-xs">{{ f }}</SegmentedItem>
              }
            </Segmented>
          </div>
        </div>

        <!-- Color scales -->
        <div class="mt-8 flex flex-col gap-8">
          @for (scale of scales; track scale.name) {
            <div class="flex flex-col gap-2">
              <h2 class="text-sm font-semibold capitalize tracking-tight">{{ scale.name }}</h2>
              <div class="grid grid-cols-11 gap-1.5 sm:gap-2">
                @for (shade of scale.shades; track shade.shade) {
                  <button
                    type="button"
                    class="group flex flex-col items-center gap-1.5 text-left"
                    (click)="copy(shade)"
                    [attr.aria-label]="'Copy ' + valueFor(shade)"
                    [title]="valueFor(shade)"
                  >
                    <span
                      class="relative flex aspect-[4/3] w-full items-center justify-center rounded-md border border-border/50 ring-offset-background transition-transform group-hover:scale-105 group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 sm:rounded-lg"
                      [style.background-color]="shade.oklch"
                    >
                      @if (copiedKey() === keyFor(shade)) {
                        <span
                          class="absolute inset-0 flex items-center justify-center rounded-md bg-black/50 text-[10px] font-medium text-white sm:rounded-lg"
                        >
                          Copied!
                        </span>
                      }
                    </span>
                    <span class="font-mono text-[10px] text-muted-foreground sm:text-xs">
                      {{ shade.shade }}
                    </span>
                  </button>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ColorsPage {
  protected readonly scales = COLOR_SCALES;
  protected readonly formats = COLOR_FORMATS;

  /** Currently selected output format */
  protected readonly format = signal<ColorFormat>('oklch');
  /** Key of the most recently copied swatch, for "Copied!" feedback */
  protected readonly copiedKey = signal<string | null>(null);

  private copiedTimeout: ReturnType<typeof setTimeout> | undefined;

  protected setFormat(value: string): void {
    if ((COLOR_FORMATS as readonly string[]).includes(value)) {
      this.format.set(value as ColorFormat);
    }
  }

  protected keyFor(shade: ColorShade): string {
    return `${shade.scale}-${shade.shade}`;
  }

  protected valueFor(shade: ColorShade): string {
    return shade[this.format()];
  }

  protected copy(shade: ColorShade): void {
    const value = this.valueFor(shade);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(value);
    }
    this.copiedKey.set(this.keyFor(shade));
    clearTimeout(this.copiedTimeout);
    this.copiedTimeout = setTimeout(() => this.copiedKey.set(null), 1500);
  }
}
