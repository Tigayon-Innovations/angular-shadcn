import { cn } from '@/lib/utils';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SIDEBAR_CONTEXT } from './sidebar-context';

/**
 * SidebarTrigger component - button to toggle the sidebar.
 */
@Component({
  selector: 'SidebarTrigger',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
    </svg>
    <span class="sr-only">Toggle Sidebar</span>
    <ng-content />
  `,
  host: {
    'attr.data-slot': '"sidebar-trigger"',
    '[class]': 'computedClass()',
    '(click)': 'onClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarTrigger {
  /** Additional CSS classes */
  readonly class = input<string>('');

  protected readonly context = inject(SIDEBAR_CONTEXT);

  protected readonly computedClass = computed(() =>
    cn(
      'inline-flex h-7 w-7 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      this.class(),
    ),
  );

  protected onClick(): void {
    this.context.toggleSidebar();
  }
}
