import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ColorPicker } from './color-picker.component';

interface TailwindColor {
  name: string;
  shades: { label: string; value: string; hex: string }[];
}

/**
 * Color input with hex preview and color picker
 */
@Component({
  selector: 'ColorInput',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ColorPicker],
  template: `
    <div class="space-y-1.5">
      <label class="block text-xs font-medium text-muted-foreground capitalize">
        {{ label() }}
      </label>
      <div class="flex items-center gap-2">
        <div
          class="h-9 w-12 flex-shrink-0 cursor-pointer rounded border border-input"
          [style.background-color]="hexColor()"
        ></div>
        <input
          type="text"
          [value]="value()"
          (input)="valueChange.emit($any($event.target).value)"
          class="flex-1 h-9 rounded-md border border-input bg-background px-2.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          [placeholder]="placeholder()"
        />
        <ColorPicker [colors]="tailwindColors()" (colorSelected)="onColorSelected($event)" />
      </div>
    </div>
  `,
})
export class ColorInput {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly hexColor = input.required<string>();
  readonly placeholder = input<string>('oklch(0.5 0 0)');
  readonly tailwindColors = input<TailwindColor[]>([]);
  readonly valueChange = output<string>();
  readonly colorSelected = output<string>();

  protected onColorSelected(hex: string): void {
    this.colorSelected.emit(hex);
  }
}
