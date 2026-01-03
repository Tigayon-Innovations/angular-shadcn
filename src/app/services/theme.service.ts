import { computed, effect, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

const THEME_KEY = 'shadcn-angular-theme';

/**
 * Theme service for managing light/dark/system theme preferences.
 * Stores preference in localStorage and applies the appropriate class to the document.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  /** The current theme preference (light, dark, or system) */
  readonly theme = signal<Theme>(this.getStoredTheme());

  /** Whether dark mode is currently active (resolved from theme + system preference) */
  readonly isDark = computed(() => {
    const theme = this.theme();
    if (theme === 'system') {
      return this.systemPrefersDark();
    }
    return theme === 'dark';
  });

  /** System preference for dark mode */
  private readonly systemPrefersDark = signal(this.getSystemPreference());

  constructor() {
    // Apply theme on initialization
    effect(() => {
      this.applyTheme(this.isDark());
    });

    // Listen for system preference changes
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        this.systemPrefersDark.set(e.matches);
      });
    }
  }

  /** Set the theme preference */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
    this.storeTheme(theme);
  }

  /** Toggle between light and dark themes */
  toggle(): void {
    const newTheme = this.isDark() ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  private getStoredTheme(): Theme {
    if (typeof window === 'undefined') return 'system';
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    return 'system';
  }

  private storeTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(THEME_KEY, theme);
  }

  private getSystemPreference(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private applyTheme(isDark: boolean): void {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', isDark);
  }
}
