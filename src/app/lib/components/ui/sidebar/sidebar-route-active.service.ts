import { Injectable, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

/**
 * Service to track the current active route and provide helper methods
 * for determining which sidebar items should be marked as active.
 *
 * Usage:
 * ```typescript
 * const routeService = inject(SidebarRouteActiveService);
 * const isActive = computed(() => routeService.isRouteActive('dashboard'));
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class SidebarRouteActiveService {
  private readonly router = inject(Router);

  /** Current active route */
  readonly currentRoute = signal<string>('');

  constructor() {
    // Initialize with current route
    this.updateCurrentRoute();

    // Subscribe to route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects || event.url)
      )
      .subscribe(url => {
        this.currentRoute.set(url);
      });
  }

  /**
   * Check if a route is currently active.
   * Supports both exact and partial matching.
   *
   * @param route - The route path to check (e.g., '/dashboard', 'dashboard')
   * @param exact - If true, requires exact match. If false, checks if current route starts with the route.
   * @returns true if the route is active
   *
   * @example
   * // Exact match
   * isRouteActive('dashboard', true) // true only if current route is exactly '/dashboard'
   *
   * // Partial match (default)
   * isRouteActive('dashboard') // true if current route is '/dashboard' or '/dashboard/details'
   */
  isRouteActive(route: string, exact: boolean = false): boolean {
    const normalizedCurrent = this.normalize(this.currentRoute());
    const normalizedRoute = this.normalize(route);

    if (exact) {
      return normalizedCurrent === normalizedRoute;
    }

    return normalizedCurrent.startsWith(normalizedRoute);
  }

  /**
   * Check if any of the provided routes is active.
   *
   * @param routes - Array of routes to check
   * @param exact - If true, requires exact match for one of the routes
   * @returns true if any route is active
   *
   * @example
   * isAnyRouteActive(['dashboard', 'analytics'])
   */
  isAnyRouteActive(routes: string[], exact: boolean = false): boolean {
    return routes.some(route => this.isRouteActive(route, exact));
  }

  /**
   * Get the current route segment (the main route without parameters).
   *
   * @returns The main route segment (e.g., 'dashboard' from '/dashboard/details')
   *
   * @example
   * // If current route is '/dashboard/details'
   * getMainRoute() // returns '/dashboard'
   */
  getMainRoute(): string {
    const parts = this.currentRoute().split('/').filter(p => p);
    return parts.length > 0 ? `/${parts[0]}` : '';
  }

  /**
   * Get the current route level.
   *
   * @returns The number of route segments (e.g., 2 for '/dashboard/details')
   *
   * @example
   * // If current route is '/dashboard/details'
   * getRouteLevel() // returns 2
   */
  getRouteLevel(): number {
    return this.currentRoute().split('/').filter(p => p).length;
  }

  /**
   * Normalize a route string for comparison.
   * Removes leading/trailing slashes and converts to lowercase.
   *
   * @private
   */
  private normalize(route: string): string {
    return `/${route}`.replace(/\/$/, '').toLowerCase();
  }

  /**
   * Update the current route based on the router's current URL.
   *
   * @private
   */
  private updateCurrentRoute(): void {
    this.currentRoute.set(this.router.url);
  }
}
