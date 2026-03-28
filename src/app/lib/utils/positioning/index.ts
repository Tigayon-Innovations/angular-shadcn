/**
 * Positioning utilities for overlay components (popover, dropdown, tooltip, etc.)
 * Provides collision detection and automatic repositioning.
 */

export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Align = 'start' | 'center' | 'end';

export interface PositionConfig {
  /** Preferred side to place the overlay */
  side: Side;
  /** Alignment along the side */
  align: Align;
  /** Offset from the trigger along the side axis */
  sideOffset: number;
  /** Offset along the alignment axis */
  alignOffset: number;
  /** Whether to flip to the opposite side if there's not enough space */
  avoidCollisions: boolean;
  /** Padding from viewport edges */
  collisionPadding: number;
  /** Boundary element or viewport */
  boundary?: HTMLElement | 'viewport';
}

export interface ComputedPosition {
  /** Final side after collision detection */
  side: Side;
  /** Final alignment after collision detection */
  align: Align;
  /** CSS styles for positioning */
  styles: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    transform?: string;
  };
}

const oppositeSide: Record<Side, Side> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

/**
 * Compute the position of an overlay relative to a trigger element.
 * Includes basic collision detection to keep the overlay in viewport.
 */
export function computePosition(
  triggerRect: DOMRect,
  overlayRect: { width: number; height: number },
  config: PositionConfig,
): ComputedPosition {
  const { side, align, sideOffset, alignOffset, avoidCollisions, collisionPadding } = config;

  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Calculate initial position
  let finalSide = side;
  let finalAlign = align;
  let position = calculatePosition(triggerRect, overlayRect, side, align, sideOffset, alignOffset);

  // Check for collisions if enabled
  if (avoidCollisions) {
    const collisions = detectCollisions(position, overlayRect, viewport, collisionPadding);

    // Try flipping side if there's a collision
    if (collisions[side]) {
      const flippedSide = oppositeSide[side];
      const flippedPosition = calculatePosition(
        triggerRect,
        overlayRect,
        flippedSide,
        align,
        sideOffset,
        alignOffset,
      );
      const flippedCollisions = detectCollisions(
        flippedPosition,
        overlayRect,
        viewport,
        collisionPadding,
      );

      // Use flipped position if it has fewer collisions
      if (!flippedCollisions[flippedSide]) {
        finalSide = flippedSide;
        position = flippedPosition;
      }
    }

    // Adjust alignment if there's overflow on the alignment axis
    const isHorizontalSide = side === 'top' || side === 'bottom';
    if (isHorizontalSide) {
      if (position.left < collisionPadding) {
        position.left = collisionPadding;
        finalAlign = 'start';
      } else if (position.left + overlayRect.width > viewport.width - collisionPadding) {
        position.left = viewport.width - overlayRect.width - collisionPadding;
        finalAlign = 'end';
      }
    } else {
      if (position.top < collisionPadding) {
        position.top = collisionPadding;
        finalAlign = 'start';
      } else if (position.top + overlayRect.height > viewport.height - collisionPadding) {
        position.top = viewport.height - overlayRect.height - collisionPadding;
        finalAlign = 'end';
      }
    }
  }

  return {
    side: finalSide,
    align: finalAlign,
    styles: {
      top: `${position.top}px`,
      left: `${position.left}px`,
    },
  };
}

function calculatePosition(
  triggerRect: DOMRect,
  overlayRect: { width: number; height: number },
  side: Side,
  align: Align,
  sideOffset: number,
  alignOffset: number,
): { top: number; left: number } {
  let top = 0;
  let left = 0;

  // Position based on side
  switch (side) {
    case 'top':
      top = triggerRect.top - overlayRect.height - sideOffset;
      left = calculateAlignPosition(
        triggerRect.left,
        triggerRect.width,
        overlayRect.width,
        align,
        alignOffset,
      );
      break;
    case 'bottom':
      top = triggerRect.bottom + sideOffset;
      left = calculateAlignPosition(
        triggerRect.left,
        triggerRect.width,
        overlayRect.width,
        align,
        alignOffset,
      );
      break;
    case 'left':
      left = triggerRect.left - overlayRect.width - sideOffset;
      top = calculateAlignPosition(
        triggerRect.top,
        triggerRect.height,
        overlayRect.height,
        align,
        alignOffset,
      );
      break;
    case 'right':
      left = triggerRect.right + sideOffset;
      top = calculateAlignPosition(
        triggerRect.top,
        triggerRect.height,
        overlayRect.height,
        align,
        alignOffset,
      );
      break;
  }

  return { top, left };
}

function calculateAlignPosition(
  triggerStart: number,
  triggerSize: number,
  overlaySize: number,
  align: Align,
  alignOffset: number,
): number {
  switch (align) {
    case 'start':
      return triggerStart + alignOffset;
    case 'center':
      return triggerStart + (triggerSize - overlaySize) / 2 + alignOffset;
    case 'end':
      return triggerStart + triggerSize - overlaySize + alignOffset;
  }
}

function detectCollisions(
  position: { top: number; left: number },
  overlayRect: { width: number; height: number },
  viewport: { width: number; height: number },
  padding: number,
): Record<Side, boolean> {
  return {
    top: position.top < padding,
    bottom: position.top + overlayRect.height > viewport.height - padding,
    left: position.left < padding,
    right: position.left + overlayRect.width > viewport.width - padding,
  };
}

/**
 * Get the CSS transform origin based on side and alignment.
 * Used for animations like zoom-in from anchor point.
 */
export function getTransformOrigin(side: Side, align: Align): string {
  const sideOrigin: Record<Side, string> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };

  const alignOrigin: Record<Align, string> = {
    start: 'left',
    center: 'center',
    end: 'right',
  };

  if (side === 'top' || side === 'bottom') {
    return `${alignOrigin[align]} ${sideOrigin[side]}`;
  }
  return `${sideOrigin[side]} ${align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center'}`;
}
