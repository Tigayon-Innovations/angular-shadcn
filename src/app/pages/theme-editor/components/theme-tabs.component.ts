import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideAngularModule, Palette, Shuffle } from 'lucide-angular';

type TabType = 'colors' | 'typography' | 'other' | 'generate';

/**
 * Segmented control for theme editor tabs
 */
@Component({
  selector: 'ThemeTabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <div class="flex items-center gap-1 rounded-lg border bg-muted/50 p-1">
      <button type="button" [class]="getTabClass('colors')" (click)="tabChange.emit('colors')">
        <div class="flex items-center justify-center gap-2">
          <lucide-icon [img]="icons.Palette" class="h-4 w-4" />
          <span>Colors</span>
        </div>
      </button>
      <button
        type="button"
        [class]="getTabClass('typography')"
        (click)="tabChange.emit('typography')"
      >
        Typography
      </button>
      <button type="button" [class]="getTabClass('other')" (click)="tabChange.emit('other')">
        Other
      </button>
      <button
        type="button"
        [class]="
          cn(
            'rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
            activeTab() === 'generate'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )
        "
        (click)="tabChange.emit('generate')"
      >
        <lucide-icon [img]="icons.Shuffle" class="h-4 w-4" />
      </button>
    </div>
  `,
})
export class ThemeTabs {
  readonly activeTab = input.required<TabType>();
  readonly tabChange = output<TabType>();

  protected readonly icons = { Palette, Shuffle };
  protected readonly cn = cn;

  protected getTabClass(tab: TabType): string {
    return cn(
      'flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
      this.activeTab() === tab
        ? 'bg-background text-foreground shadow-sm'
        : 'text-muted-foreground hover:text-foreground',
    );
  }
}
