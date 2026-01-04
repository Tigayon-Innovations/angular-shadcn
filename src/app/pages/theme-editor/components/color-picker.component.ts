import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/lib/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { Grid, List, LucideAngularModule, Palette } from 'lucide-angular';

interface TailwindColor {
  name: string;
  shades: { label: string; value: string; hex: string }[];
}

/**
 * Color picker component with Tailwind color palette
 */
@Component({
  selector: 'ColorPicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, LucideAngularModule],
  template: `
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          class="h-9 w-9 flex-shrink-0 rounded-md border border-input hover:bg-accent hover:text-accent-foreground flex items-center justify-center"
        >
          <lucide-icon [img]="icons.Palette" class="h-3.5 w-3.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-64" [align]="'end'">
        <div class="p-2">
          <div class="mb-2 flex items-center justify-between">
            <span class="text-xs font-semibold">Tailwind v4</span>
            <div class="flex gap-1">
              <button
                type="button"
                [class]="cn('p-1 rounded hover:bg-accent', view() === 'list' && 'bg-accent')"
                (click)="view.set('list')"
              >
                <lucide-icon [img]="icons.List" class="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                [class]="cn('p-1 rounded hover:bg-accent', view() === 'grid' && 'bg-accent')"
                (click)="view.set('grid')"
              >
                <lucide-icon [img]="icons.Grid" class="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder="Search Tailwind colors..."
            [value]="searchTerm()"
            (input)="searchTerm.set($any($event.target).value)"
            class="w-full mb-2 px-2 py-1.5 text-xs rounded-md border bg-background"
          />
        </div>
        <div class="max-h-80 overflow-y-auto">
          @if (view() === 'list') {
            @for (color of filteredColors(); track color.name) {
              <div class="border-t first:border-t-0">
                <div class="px-3 py-1.5 text-xs font-semibold text-muted-foreground sticky top-0 bg-popover">
                  {{ color.name }}
                </div>
                @for (shade of color.shades; track shade.label) {
                  <DropdownMenuItem
                    (click)="colorSelected.emit(shade.hex)"
                    class="flex items-center justify-between gap-2 px-3 py-1.5 cursor-pointer"
                  >
                    <div class="flex items-center gap-2">
                      <div
                        class="h-4 w-4 rounded border"
                        [style.background-color]="shade.hex"
                      ></div>
                      <span class="text-xs">{{ shade.label }}</span>
                    </div>
                    <span class="text-xs text-muted-foreground font-mono">{{ shade.hex }}</span>
                  </DropdownMenuItem>
                }
              </div>
            }
          } @else {
            <div class="p-2 space-y-2">
              @for (color of filteredColors(); track color.name) {
                <div>
                  <div class="text-xs font-semibold text-muted-foreground mb-1 px-1">
                    {{ color.name }}
                  </div>
                  <div class="grid grid-cols-9 gap-1">
                    @for (shade of color.shades; track shade.label) {
                      <button
                        type="button"
                        class="h-7 w-7 rounded border hover:ring-2 hover:ring-ring hover:ring-offset-1"
                        [style.background-color]="shade.hex"
                        [title]="shade.label + ' - ' + shade.hex"
                        (click)="colorSelected.emit(shade.hex)"
                      ></button>
                    }
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  `,
})
export class ColorPicker {
  readonly colors = input<TailwindColor[]>([]);
  readonly colorSelected = output<string>();

  protected readonly icons = { Palette, List, Grid };
  protected readonly cn = cn;
  protected readonly view = signal<'list' | 'grid'>('list');
  protected readonly searchTerm = signal('');

  protected readonly filteredColors = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const allColors = this.colors();

    if (!search) return allColors;

    return allColors
      .map(color => ({
        ...color,
        shades: color.shades.filter(shade =>
          shade.label.toLowerCase().includes(search) ||
          shade.hex.toLowerCase().includes(search)
        ),
      }))
      .filter(color => color.shades.length > 0);
  });
}
