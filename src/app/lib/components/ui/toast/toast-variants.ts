import { cva, type VariantProps } from 'class-variance-authority';

export const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border-border bg-background text-foreground',
        success:
          'border-success/50 bg-success/10 text-success dark:border-success/30 dark:bg-success/20 dark:text-success',
        error:
          'destructive group border-destructive/50 bg-destructive/10 text-destructive dark:border-destructive/30 dark:bg-destructive/20',
        warning:
          'border-warning/50 bg-warning/10 text-warning-foreground dark:border-warning/30 dark:bg-warning/20',
        info: 'border-info/50 bg-info/10 text-info dark:border-info/30 dark:bg-info/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ToastVariants = VariantProps<typeof toastVariants>;
