import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Segmented variants using class-variance-authority
 * iOS-style segmented control buttons
 */
export const segmentedVariants = cva(
  'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
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
  },
);

export const segmentedItemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
  {
    variants: {
      size: {
        sm: 'text-xs px-2 py-0.5',
        default: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-1.5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type SegmentedVariants = VariantProps<typeof segmentedVariants>;
export type SegmentedItemVariants = VariantProps<typeof segmentedItemVariants>;
