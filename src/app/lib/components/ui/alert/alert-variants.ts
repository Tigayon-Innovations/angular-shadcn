import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Alert variants using class-variance-authority.
 * Selectors cover both native <svg> and lucide-angular's <lucide-icon> element.
 */
export const alertVariants = cva(
  [
    'relative w-full rounded-lg border px-4 py-3 text-sm',
    // Grid base — 1-col by default, switches to 2-col when icon is present
    'grid grid-cols-[0_1fr]',
    'has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr]',
    'has-[>lucide-icon]:grid-cols-[calc(var(--spacing)*4)_1fr]',
    // Column gap when icon present
    'has-[>svg]:gap-x-3',
    'has-[>lucide-icon]:gap-x-3',
    'gap-y-0.5 items-start',
    // Icon sizing and alignment — native SVG
    '[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
    // Icon sizing and alignment — lucide-angular
    '[&>lucide-icon]:size-4 [&>lucide-icon]:translate-y-0.5 [&>lucide-icon]:text-current',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground border-border',
        destructive:
          'bg-destructive/10 text-destructive border-destructive/30 [&>svg]:text-current [&>lucide-icon]:text-current *:data-[slot=alert-description]:text-destructive/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type AlertVariants = VariantProps<typeof alertVariants>;
