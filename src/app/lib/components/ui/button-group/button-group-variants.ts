import { cva, type VariantProps } from 'class-variance-authority';

/**
 * ButtonGroup variants using class-variance-authority
 * Grouped buttons with shared styling
 */
export const buttonGroupVariants = cva(
  'inline-flex items-center justify-center rounded-md',
  {
    variants: {
      orientation: {
        horizontal:
          '[&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:first-child)]:-ml-px',
        vertical:
          'flex-col [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:first-child)]:-mt-px',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;
