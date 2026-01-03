import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Spinner variants using class-variance-authority
 * Loading indicator animations with multiple sizes and variants
 */
export const spinnerVariants = cva(
  'animate-spin',
  {
    variants: {
      variant: {
        default: 'text-primary',
        secondary: 'text-secondary',
        muted: 'text-muted-foreground',
        destructive: 'text-destructive',
      },
      size: {
        xs: 'size-3',
        sm: 'size-4',
        default: 'size-6',
        lg: 'size-8',
        xl: 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
