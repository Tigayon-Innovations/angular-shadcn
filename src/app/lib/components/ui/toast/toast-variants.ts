import { cva, type VariantProps } from 'class-variance-authority';

export const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        success:
          'border-green-500/50 bg-green-50 text-green-900 dark:border-green-500/30 dark:bg-green-950 dark:text-green-100',
        error:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
        warning:
          'border-yellow-500/50 bg-yellow-50 text-yellow-900 dark:border-yellow-500/30 dark:bg-yellow-950 dark:text-yellow-100',
        info: 'border-blue-500/50 bg-blue-50 text-blue-900 dark:border-blue-500/30 dark:bg-blue-950 dark:text-blue-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type ToastVariants = VariantProps<typeof toastVariants>;
