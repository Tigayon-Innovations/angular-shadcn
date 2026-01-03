import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MENUBAR_CONTEXT, type MenubarContextValue } from './menubar-context';

/**
 * Menubar component - horizontal menu bar.
 * Matches shadcn/ui React Menubar exactly.
 */
@Component({
  selector: 'Menubar',
  template: `<ng-content />`,
  providers: [
    {
      provide: MENUBAR_CONTEXT,
      useFactory: (): MenubarContextValue => ({
        activeMenu: signal(null),
      }),
    },
  ],
  host: {
    '[class]': 'computedClass()',
    'role': 'menubar',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menubar {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm',
      this.class()
    )
  );
}
