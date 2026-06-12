import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Uses Dialog overlays that fail SSR serialization (NG0502)
    path: 'themes',
    renderMode: RenderMode.Client,
  },
  {
    path: 'docs/components/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'blocks/:category',
    renderMode: RenderMode.Server,
  },
  {
    path: 'blocks/:category/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
