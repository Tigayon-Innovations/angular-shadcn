import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

interface NgAddOptions {
  project?: string;
  skipInstall?: boolean;
  skipStyles?: boolean;
}

// CSS Variables template for shadcn theming
const CSS_VARIABLES_TEMPLATE = `/* ng-cn/core - shadcn-angular styles */
@use "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; font-feature-settings: "rlig" 1, "calt" 1; }
  html { scroll-behavior: smooth; }
  :focus-visible { @apply outline-2 outline-ring outline-offset-2; }
}

@layer utilities {
  .animate-accordion-down { animation: accordion-down 0.2s ease-out; }
  .animate-accordion-up { animation: accordion-up 0.2s ease-out; }
  @keyframes accordion-down { from { height: 0; } to { height: var(--accordion-content-height); } }
  @keyframes accordion-up { from { height: var(--accordion-content-height); } to { height: 0; } }
  .animate-collapsible-down { animation: collapsible-down 0.2s ease-out; }
  .animate-collapsible-up { animation: collapsible-up 0.2s ease-out; }
  @keyframes collapsible-down { from { height: 0; } to { height: var(--collapsible-content-height); } }
  @keyframes collapsible-up { from { height: var(--collapsible-content-height); } to { height: 0; } }
}
`;

// cn utility template
const CN_UTILITY_TEMPLATE = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution.
 * Combines clsx for conditional classes with tailwind-merge for deduplication.
 *
 * @example
 * cn('px-4 py-2', 'px-6') // => 'py-2 px-6'
 * cn('bg-red-500', condition && 'bg-blue-500') // conditional classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
`;

const UTILS_INDEX_TEMPLATE = `export { cn } from './cn';
`;

export function ngAdd(options: NgAddOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('');
    context.logger.info('╭──────────────────────────────────────────────────╮');
    context.logger.info('│                                                  │');
    context.logger.info('│   🎨  @ng-cn/core - shadcn for Angular          │');
    context.logger.info('│                                                  │');
    context.logger.info('╰──────────────────────────────────────────────────╯');
    context.logger.info('');

    // Add dependencies to package.json
    const packageJsonPath = '/package.json';
    if (tree.exists(packageJsonPath)) {
      const packageJson = JSON.parse(tree.read(packageJsonPath)!.toString('utf-8'));

      const requiredDependencies = {
        'lucide-angular': '^0.562.0',
        'class-variance-authority': '^0.7.1',
        'clsx': '^2.1.1',
        'tailwind-merge': '^3.4.0',
        '@angular/cdk': '^21.0.5',
        'tailwindcss': '^4.1.18',
        '@tailwindcss/postcss': '^4.1.18'
      };

      // Check and add missing dependencies
      let needsInstall = false;
      context.logger.info('📦 Dependencies');
      for (const [pkg, version] of Object.entries(requiredDependencies)) {
        if (!packageJson.dependencies?.[pkg]) {
          packageJson.dependencies = packageJson.dependencies || {};
          packageJson.dependencies[pkg] = version;
          needsInstall = true;
          context.logger.info(`   + ${pkg}@${version}`);
        }
      }

      if (needsInstall) {
        tree.overwrite(packageJsonPath, JSON.stringify(packageJson, null, 2));
        if (!options.skipInstall) {
          context.addTask(new NodePackageInstallTask());
        }
      } else {
        context.logger.info('   ✓ All dependencies already installed');
      }
    }

    // Create lib/utils folder structure
    context.logger.info('');
    context.logger.info('📁 Project Structure');

    const utilsPath = '/src/app/lib/utils';
    const uiPath = '/src/app/lib/components/ui';

    // Create cn utility
    if (!tree.exists(`${utilsPath}/cn.ts`)) {
      tree.create(`${utilsPath}/cn.ts`, CN_UTILITY_TEMPLATE);
      context.logger.info(`   + src/app/lib/utils/cn.ts`);
    } else {
      context.logger.info(`   ✓ utils/cn.ts exists`);
    }

    // Create utils index
    if (!tree.exists(`${utilsPath}/index.ts`)) {
      tree.create(`${utilsPath}/index.ts`, UTILS_INDEX_TEMPLATE);
      context.logger.info(`   + src/app/lib/utils/index.ts`);
    }

    // Create ui components directory
    if (!tree.exists(`${uiPath}/.gitkeep`)) {
      tree.create(`${uiPath}/.gitkeep`, '');
      context.logger.info(`   + src/app/lib/components/ui/`);
    }

    // Setup styles
    if (!options.skipStyles) {
      context.logger.info('');
      context.logger.info('🎨 Styles');

      const ngCnStylesPath = '/src/ng-cn.scss';
      const stylesPath = '/src/styles.scss';
      const stylesCssPath = '/src/styles.css';

      // Create ng-cn.scss with all CSS variables
      tree.create(ngCnStylesPath, CSS_VARIABLES_TEMPLATE);
      context.logger.info(`   + src/ng-cn.scss (theme variables)`);

      // Import in styles.scss or styles.css
      if (tree.exists(stylesPath)) {
        const stylesContent = tree.read(stylesPath)!.toString('utf-8');
        if (!stylesContent.includes('ng-cn.scss')) {
          const newContent = `@import './ng-cn.scss';\n\n${stylesContent}`;
          tree.overwrite(stylesPath, newContent);
          context.logger.info(`   ✓ Imported in styles.scss`);
        }
      } else if (tree.exists(stylesCssPath)) {
        const stylesContent = tree.read(stylesCssPath)!.toString('utf-8');
        if (!stylesContent.includes('ng-cn.scss')) {
          const newContent = `@import './ng-cn.scss';\n\n${stylesContent}`;
          tree.overwrite(stylesCssPath, newContent);
          context.logger.info(`   ✓ Imported in styles.css`);
        }
      }
    }

    // Update tsconfig paths
    context.logger.info('');
    context.logger.info('⚙️  TypeScript Config');

    const tsconfigPath = '/tsconfig.json';
    if (tree.exists(tsconfigPath)) {
      const tsconfig = JSON.parse(tree.read(tsconfigPath)!.toString('utf-8'));
      tsconfig.compilerOptions = tsconfig.compilerOptions || {};
      tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || {};

      const pathAliases: Record<string, string[]> = {
        '@/*': ['src/*'],
        '@/lib/*': ['src/app/lib/*'],
        '@/ui/*': ['src/app/lib/components/ui/*'],
        '@/utils/*': ['src/app/lib/utils/*']
      };

      let pathsUpdated = false;
      for (const [alias, paths] of Object.entries(pathAliases)) {
        if (!tsconfig.compilerOptions.paths[alias]) {
          tsconfig.compilerOptions.paths[alias] = paths;
          pathsUpdated = true;
        }
      }

      if (pathsUpdated) {
        tree.overwrite(tsconfigPath, JSON.stringify(tsconfig, null, 2));
        context.logger.info('   ✓ Path aliases configured');
      } else {
        context.logger.info('   ✓ Path aliases already set');
      }
    }

    // Success message with ASCII art banner
    context.logger.info('');
    context.logger.info('');
    context.logger.info('  ███╗   ██╗ ██████╗        ██████╗███╗   ██╗');
    context.logger.info('  ████╗  ██║██╔════╝       ██╔════╝████╗  ██║');
    context.logger.info('  ██╔██╗ ██║██║  ███╗█████╗██║     ██╔██╗ ██║');
    context.logger.info('  ██║╚██╗██║██║   ██║╚════╝██║     ██║╚██╗██║');
    context.logger.info('  ██║ ╚████║╚██████╔╝      ╚██████╗██║ ╚████║');
    context.logger.info('  ╚═╝  ╚═══╝ ╚═════╝        ╚═════╝╚═╝  ╚═══╝');
    context.logger.info('');
    context.logger.info('  ✅ Setup complete! shadcn for Angular');
    context.logger.info('');
    context.logger.info('╭──────────────────────────────────────────────────╮');
    context.logger.info('│  🚀 Next steps:                                  │');
    context.logger.info('│                                                  │');
    context.logger.info('│  1. Add components:                              │');
    context.logger.info('│     ng g @ng-cn/core:c button                    │');
    context.logger.info('│     ng g @ng-cn/core:c card                      │');
    context.logger.info('│                                                  │');
    context.logger.info('│  2. Or install individual packages:              │');
    context.logger.info('│     npm i @ng-cn/button @ng-cn/card              │');
    context.logger.info('│                                                  │');
    context.logger.info('│  3. Import and use:                              │');
    context.logger.info("│     import { Button } from '@/ui/button';        │");
    context.logger.info('│                                                  │');
    context.logger.info('│  📚 Docs: https://shadcn-angular.tigayon.com     │');
    context.logger.info('╰──────────────────────────────────────────────────╯');
    context.logger.info('');

    return tree;
  };
}
