import type { Type } from '@angular/core';

/**
 * Static loader map for block preview components.
 * Dynamic import() with a runtime-variable path cannot be resolved by the
 * bundler, so every block registers an explicit lazy loader here.
 */
export const BLOCK_LOADERS: Record<string, () => Promise<Type<unknown>>> = {
  'dashboard-01': () => import('./dashboard-01').then((m) => m.Dashboard01Component),
  'cards-01': () => import('./cards-01').then((m) => m.Cards01Component),
  'sidebar-01': () => import('./sidebar-01').then((m) => m.Sidebar01Component),
  'login-01': () => import('./login-01').then((m) => m.Login01Component),
  'signup-01': () => import('./signup-01').then((m) => m.Signup01Component),
  'otp-01': () => import('./otp-01').then((m) => m.Otp01Component),
  'pricing-01': () => import('./pricing-01').then((m) => m.Pricing01Component),
  'settings-01': () => import('./settings-01').then((m) => m.Settings01Component),
  'payment-01': () => import('./payment-01').then((m) => m.Payment01Component),
  'signup-02': () => import('./signup-02').then((m) => m.Signup02Component),
  'otp-02': () => import('./otp-02').then((m) => m.Otp02Component),
  'calendar-01': () => import('./calendar-01').then((m) => m.Calendar01Component),
  'dashboard-02': () => import('./dashboard-02').then((m) => m.Dashboard02Component),
  'products-01': () => import('./products-01').then((m) => m.Products01Component),
  'chat-01': () => import('./chat-01').then((m) => m.Chat01Component),
  'sidebar-02': () => import('./sidebar-02').then((m) => m.Sidebar02Component),
  'sidebar-03': () => import('./sidebar-03').then((m) => m.Sidebar03Component),
  'sidebar-07': () => import('./sidebar-07').then((m) => m.Sidebar07Component),
  'login-02': () => import('./login-02').then((m) => m.Login02Component),
  'login-03': () => import('./login-03').then((m) => m.Login03Component),
  'login-04': () => import('./login-04').then((m) => m.Login04Component),
  'login-05': () => import('./login-05').then((m) => m.Login05Component),
};
