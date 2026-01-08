import { InjectionToken, WritableSignal } from '@angular/core';

// ============================================================================
// Types
// ============================================================================

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export type TooltipAlign = 'start' | 'center' | 'end';

export interface TooltipContextValue {
  /** Signal for open state */
  open: WritableSignal<boolean>;
  /** Set open state */
  setOpen: (open: boolean) => void;
  /** Delay before showing tooltip (ms) */
  delayDuration: number;
  /** Skip delay duration when quickly hovering between tooltips (ms) */
  skipDelayDuration: number;
  /** Unique ID for aria-describedby relationship */
  tooltipId: string;
  /** Whether hoverable content is disabled */
  disableHoverableContent: () => boolean;
}

// ============================================================================
// Injection Tokens
// ============================================================================

export const TOOLTIP_CONTEXT = new InjectionToken<TooltipContextValue>('TOOLTIP_CONTEXT');
