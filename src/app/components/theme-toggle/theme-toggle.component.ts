import { ThemeService, type Theme } from '@/services/theme.service';
import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideAngularModule, Monitor, Moon, Sun } from 'lucide-angular';

/**
 * Theme toggle dropdown component for switching between light/dark/system themes.
 */
@Component({
  selector: 'ThemeToggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    LucideAngularModule,
  ],
  template: `
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" class="h-9 w-9">
          @if (isDark()) {
            <lucide-icon [img]="icons.Moon" class="h-4 w-4" />
          } @else {
            <lucide-icon [img]="icons.Sun" class="h-4 w-4" />
          }
          <span class="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem (click)="setTheme('light')">
          <lucide-icon [img]="icons.Sun" class="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem (click)="setTheme('dark')">
          <lucide-icon [img]="icons.Moon" class="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem (click)="setTheme('system')">
          <lucide-icon [img]="icons.Monitor" class="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  `,
})
export class ThemeToggle {
  private readonly themeService = inject(ThemeService);

  protected readonly isDark = this.themeService.isDark;
  protected readonly icons = { Sun, Moon, Monitor };

  protected setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}
