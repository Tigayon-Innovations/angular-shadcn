/**
 * Animation Tokens Service
 * Manages animation configuration tokens (durations, easing, etc.)
 * Can be customized via CSS variables or service configuration
 */

import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimationTokensService {
  private readonly document = inject(DOCUMENT);

  /**
   * Animation duration presets (in milliseconds)
   * Customizable via CSS variables
   */
  readonly durations = {
    fast: this.getCSSVariable('--animation-duration-fast', 150),
    base: this.getCSSVariable('--animation-duration-base', 200),
    slow: this.getCSSVariable('--animation-duration-slow', 300),
  };

  /**
   * Animation easing presets
   * Customizable via CSS variables
   */
  readonly easing = {
    in: this.getCSSVariable('--animation-easing-in', 'ease-out'),
    out: this.getCSSVariable('--animation-easing-out', 'ease-in'),
    inOut: this.getCSSVariable('--animation-easing-in-out', 'ease-in-out'),
  };

  /**
   * Transform origins for positional animations
   */
  readonly origins = {
    center: 'center',
    top: 'top center',
    bottom: 'bottom center',
    left: 'center left',
    right: 'center right',
  };

  /**
   * Get CSS variable value from document
   * @param variableName - CSS variable name (e.g., '--animation-duration-fast')
   * @param defaultValue - Fallback value if not found
   */
  private getCSSVariable(variableName: string, defaultValue: string | number): string | number {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    const root = this.document.documentElement;
    const value = getComputedStyle(root).getPropertyValue(variableName).trim();

    if (!value) {
      return defaultValue;
    }

    // Try to convert to number for durations
    if (typeof defaultValue === 'number') {
      const numValue = parseInt(value, 10);
      return isNaN(numValue) ? defaultValue : numValue;
    }

    return value;
  }

  /**
   * Get animation duration by preset name
   */
  getDuration(preset: keyof typeof this.durations): number {
    const value = this.durations[preset];
    return typeof value === 'number' ? value : parseInt(String(value), 10);
  }

  /**
   * Get easing by preset name
   */
  getEasing(preset: keyof typeof this.easing): string {
    const value = this.easing[preset];
    return String(value);
  }
}
