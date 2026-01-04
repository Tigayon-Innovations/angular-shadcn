import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TailwindColor } from '../data';
import { ColorPicker } from './color-picker.component';

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
        <!-- Color preview that opens native color picker -->
        <label
          class="relative h-9 w-12 flex-shrink-0 cursor-pointer rounded border border-input overflow-hidden"
          [style.background-color]="hexColor()"
        >
          <input
            type="color"
            [value]="hexColor()"
            (input)="onNativeColorChange($any($event.target).value)"
            class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </label>
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

  protected onNativeColorChange(hex: string): void {
    this.colorSelected.emit(hex);
  }
}
