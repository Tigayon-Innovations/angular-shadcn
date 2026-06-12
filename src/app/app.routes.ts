import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';

const componentTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug') || '';
  const componentName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return `${componentName} - shadcn-angular`;
};

const blockTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const slug = route.paramMap.get('slug') || '';
  const blockName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return `${blockName} - shadcn-angular`;
};

const blockCategoryTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const category = route.paramMap.get('category') || '';
  const categoryName = category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return `${categoryName} Blocks - shadcn-angular`;
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/pages/home').then((m) => m.HomePage),
    title: 'shadcn-angular',
  },
  {
    path: 'docs',
    loadComponent: () => import('@/pages/docs/layout').then((m) => m.DocsLayout),
    title: 'Documentation - shadcn-angular',
    children: [
      {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full',
      },
      {
        path: 'introduction',
        loadComponent: () => import('@/pages/docs/introduction').then((m) => m.IntroductionPage),
        title: 'Introduction - shadcn-angular',
      },
      {
        path: 'installation',
        loadComponent: () => import('@/pages/docs/installation').then((m) => m.InstallationPage),
        title: 'Installation - shadcn-angular',
      },
      {
        path: 'theming',
        loadComponent: () => import('@/pages/docs/theming').then((m) => m.ThemingPage),
        title: 'Theming - shadcn-angular',
      },
      {
        path: 'dark-mode',
        loadComponent: () => import('@/pages/docs/dark-mode').then((m) => m.DarkModePage),
        title: 'Dark Mode - shadcn-angular',
      },
      {
        path: 'mcp-setup',
        loadComponent: () => import('@/pages/docs/mcp-setup').then((m) => m.McpSetupPage),
        title: 'MCP Setup - shadcn-angular',
      },
      {
        path: 'components',
        loadComponent: () =>
          import('@/pages/docs/components-list').then((m) => m.ComponentsListPage),
        title: 'Components - shadcn-angular',
      },
      {
        path: 'components/:slug',
        loadComponent: () =>
          import('@/pages/docs/component-detail').then((m) => m.ComponentDetailRouter),
        title: componentTitleResolver,
      },
    ],
  },
  {
    path: 'theme-editor',
    loadComponent: () => import('@/pages/theme-editor').then((m) => m.ThemeEditorPage),
    title: 'Theme Editor - shadcn-angular',
  },
  {
    path: 'playground',
    loadComponent: () => import('@/pages/playground').then((m) => m.PlaygroundPage),
    title: 'Playground - shadcn-angular',
  },
  {
    path: 'charts',
    loadComponent: () => import('@/pages/charts').then((m) => m.ChartsPage),
    title: 'Charts - shadcn-angular',
  },
  {
    path: 'colors',
    loadComponent: () => import('@/pages/colors').then((m) => m.ColorsPage),
    title: 'Colors - shadcn-angular',
  },
  {
    path: 'themes',
    loadComponent: () => import('@/pages/themes').then((m) => m.ThemesPage),
    title: 'Themes - shadcn-angular',
  },
  {
    path: 'create',
    loadComponent: () => import('@/pages/create').then((m) => m.CreatePage),
    title: 'New Project - shadcn-angular',
  },
  {
    path: 'blocks',
    loadComponent: () => import('@/pages/blocks').then((m) => m.BlocksLayout),
    title: 'Blocks - shadcn-angular',
    children: [
      {
        path: '',
        loadComponent: () => import('@/pages/blocks').then((m) => m.BlocksListPage),
        title: 'Blocks - shadcn-angular',
      },
      {
        path: ':category',
        loadComponent: () => import('@/pages/blocks').then((m) => m.BlocksCategoryPage),
        title: blockCategoryTitleResolver,
      },
      {
        path: ':category/:slug',
        loadComponent: () => import('@/pages/blocks').then((m) => m.BlockDetailPage),
        title: blockTitleResolver,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
