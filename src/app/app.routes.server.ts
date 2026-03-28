import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
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
