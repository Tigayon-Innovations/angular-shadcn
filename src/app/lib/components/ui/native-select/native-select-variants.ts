import { cva, type VariantProps } from 'class-variance-authority';

/**
 * NativeSelect variants using class-variance-authority
 * Styled HTML native select element
 */
export const nativeSelectVariants = cva(
  'flex h-9 w-full appearance-none items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 text-xs',
        default: 'h-9 text-sm',
        lg: 'h-10 text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type NativeSelectVariants = VariantProps<typeof nativeSelectVariants>;
