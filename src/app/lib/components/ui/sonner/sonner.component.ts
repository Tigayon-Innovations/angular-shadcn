import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgxSonnerToaster } from 'ngx-sonner';

export { toast } from 'ngx-sonner';

/**
 * Sonner component - toast notification toaster.
 * Wraps ngx-sonner's Toaster with shadcn/ui default styling.
 * Place once near the root of your app.
 *
 * @example
 * <!-- In app root template -->
 * <Sonner />
 *
 * <!-- With custom position -->
 * <Sonner position="top-right" />
 *
 * <!-- Then trigger toasts anywhere -->
 * import { toast } from '@/lib/components/ui/sonner';
 * toast('Hello world');
 * toast.success('Saved!');
 * toast.error('Something went wrong');
 */
@Component({
  selector: 'Sonner',
  imports: [NgxSonnerToaster],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-slot': '"sonner"',
    style: 'display: contents',
  },
  template: `
    <ngx-sonner-toaster
      [theme]="theme()"
      [position]="position()"
      [richColors]="richColors()"
      [expand]="expand()"
      [duration]="duration()"
      [visibleToasts]="visibleToasts()"
      [closeButton]="closeButton()"
      [offset]="offset()"
      [dir]="dir()"
      [class]="toasterClass()"
    />
  `,
})
export class Sonner {
  /** Visual theme */
  readonly theme = input<'light' | 'dark' | 'system'>('system');
  /** Position of the toaster */
  readonly position = input<
    'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  >('bottom-right');
  /** Use rich colors for success/error/warning/info */
  readonly richColors = input<boolean>(false);
  /** Expand toasts by default */
  readonly expand = input<boolean>(false);
  /** Default duration in ms */
  readonly duration = input<number>(4000);
  /** Max visible toasts */
  readonly visibleToasts = input<number>(3);
  /** Show close button on each toast */
  readonly closeButton = input<boolean>(false);
  /** Offset from edge */
  readonly offset = input<string | number | null>(null);
  /** Text direction */
  readonly dir = input<'ltr' | 'rtl' | 'auto'>('auto');
  /** Additional CSS classes passed to the toaster */
  readonly toasterClass = input<string>('toaster group');
}
