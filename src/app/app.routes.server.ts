import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Interactive preview routes embed Dialog/Select overlays and a dynamic
  // template renderer that rely on browser APIs (DOMParser) and cannot be
  // serialized by Angular SSR (NG0502). Render them on the client.
  {
    path: 'themes',
    renderMode: RenderMode.Client,
  },
  {
    path: 'playground',
    renderMode: RenderMode.Client,
  },
  {
    path: 'docs/components/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: 'blocks/:category',
    renderMode: RenderMode.Server,
  },
  {
    path: 'blocks/:category/:slug',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
