import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/pages/home').then((m) => m.HomePage),
  },
  {
    path: 'docs',
    loadComponent: () => import('@/pages/docs/layout').then((m) => m.DocsLayout),
    children: [
      {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full',
      },
      {
        path: 'introduction',
        loadComponent: () =>
          import('@/pages/docs/introduction').then((m) => m.IntroductionPage),
      },
      {
        path: 'installation',
        loadComponent: () =>
          import('@/pages/docs/installation').then((m) => m.InstallationPage),
      },
      {
        path: 'theming',
        loadComponent: () =>
          import('@/pages/docs/theming').then((m) => m.ThemingPage),
      },
      {
        path: 'dark-mode',
        loadComponent: () =>
          import('@/pages/docs/dark-mode').then((m) => m.DarkModePage),
      },
      {
        path: 'mcp-setup',
        loadComponent: () =>
          import('@/pages/docs/mcp-setup').then((m) => m.McpSetupPage),
      },
      {
        path: 'components',
        loadComponent: () =>
          import('@/pages/docs/components-list').then((m) => m.ComponentsListPage),
      },
      {
        path: 'components/:slug',
        loadComponent: () =>
          import('@/pages/docs/component-detail').then((m) => m.ComponentDetailPage),
      },
    ],
  },
  {
    path: 'theme-editor',
    loadComponent: () =>
      import('@/pages/theme-editor').then((m) => m.ThemeEditorPage),
  },
  {
    path: 'playground',
    loadComponent: () =>
      import('@/pages/playground').then((m) => m.PlaygroundPage),
  },
  {
    path: 'blocks',
    loadComponent: () => import('@/pages/blocks').then((m) => m.BlocksLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@/pages/blocks').then((m) => m.BlocksListPage),
      },
      {
        path: ':category',
        loadComponent: () =>
          import('@/pages/blocks').then((m) => m.BlocksCategoryPage),
      },
      {
        path: ':category/:slug',
        loadComponent: () =>
          import('@/pages/blocks').then((m) => m.BlockDetailPage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
