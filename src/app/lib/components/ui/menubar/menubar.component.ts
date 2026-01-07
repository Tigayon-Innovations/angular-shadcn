import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MENUBAR_CONTEXT, type MenubarContextValue } from './menubar-context';

/**
 * Menubar component - horizontal menu bar.
 * Matches shadcn/ui React Menubar exactly.
 * Implements full keyboard navigation with arrow keys.
 */
@Component({
  selector: 'Menubar',
  template: `<ng-content />`,
  providers: [
    {
      provide: MENUBAR_CONTEXT,
      useFactory: (): MenubarContextValue => {
        const menuIds = signal<string[]>([]);
        const focusedMenuIndex = signal(-1);
        return {
          activeMenu: signal(null),
          menuIds,
          focusedMenuIndex,
          registerMenu: (menuId: string) => {
            menuIds.update(ids => [...ids, menuId]);
          },
          unregisterMenu: (menuId: string) => {
            menuIds.update(ids => ids.filter(id => id !== menuId));
          },
          focusNextMenu: () => {
            const ids = menuIds();
            const currentIdx = focusedMenuIndex();
            const nextIdx = currentIdx < ids.length - 1 ? currentIdx + 1 : 0;
            focusedMenuIndex.set(nextIdx);
          },
          focusPreviousMenu: () => {
            const ids = menuIds();
            const currentIdx = focusedMenuIndex();
            const prevIdx = currentIdx > 0 ? currentIdx - 1 : ids.length - 1;
            focusedMenuIndex.set(prevIdx);
          },
        };
      },
    },
  ],
  host: {
    '[class]': 'computedClass()',
    'role': 'menubar',
    'aria-orientation': 'horizontal',
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
