import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    // NOTE: Full DOM hydration is intentionally disabled. Radix-style overlay
    // components (dropdown/select/popover/dialog…) project content through a
    // `Presence` `@if` slot; hydrating projected content inside a conditional
    // view drops it, leaving menus empty and controls unresponsive. Rendering
    // fresh on the client (SSR still serves the initial HTML for SEO/first
    // paint) keeps every interaction working. See Presence for the root cause.
  ],
};
