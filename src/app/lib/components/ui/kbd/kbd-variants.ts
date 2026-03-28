import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Kbd variants using class-variance-authority
 * Keyboard key indicator with multiple sizes
 */
export const kbdVariants = cva(
  'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100',
  {
    variants: {
      size: {
        sm: 'h-4 px-1 text-[9px]',
        default: 'h-5 px-1.5 text-[10px]',
        lg: 'h-6 px-2 text-xs',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type KbdVariants = VariantProps<typeof kbdVariants>;
