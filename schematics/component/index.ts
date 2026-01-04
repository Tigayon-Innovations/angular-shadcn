import { join, normalize, Path } from '@angular-devkit/core';
import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';

interface ComponentOptions {
  name: string;
  project?: string;
  path?: string;
}

// Component registry - maps component names to their file structure
const COMPONENT_REGISTRY: Record<string, ComponentInfo> = {
  button: {
    files: ['button.component.ts', 'index.ts'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge', '@angular/cdk']
  },
  card: {
    files: ['card.component.ts', 'card-header.component.ts', 'card-title.component.ts', 'card-description.component.ts', 'card-content.component.ts', 'card-footer.component.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge']
  },
  input: {
    files: ['input.component.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge', '@angular/forms']
  },
  label: {
    files: ['label.component.ts', 'index.ts'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge']
  },
  separator: {
    files: ['separator.component.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge']
  },
  badge: {
    files: ['badge.component.ts', 'index.ts'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge']
  },
  alert: {
    files: ['alert.component.ts', 'alert-title.component.ts', 'alert-description.component.ts', 'index.ts'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge']
  },
  dialog: {
    files: ['dialog.component.ts', 'dialog-content.component.ts', 'dialog-header.component.ts', 'dialog-footer.component.ts', 'dialog-title.component.ts', 'dialog-description.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge']
  },
  'data-table': {
    files: [
      'data-table.component.ts',
      'data-table-content.component.ts',
      'data-table-context.ts',
      'data-table-pagination.component.ts',
      'data-table-search.component.ts',
      'data-table-toolbar.component.ts',
      'data-table-view-options.component.ts',
      'index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge', 'lucide-angular']
  },
  // Add more components as needed
};

interface ComponentInfo {
  files: string[];
  dependencies: string[];
}

export function component(options: ComponentOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const componentName = options.name.toLowerCase();

    if (!COMPONENT_REGISTRY[componentName]) {
      const availableComponents = Object.keys(COMPONENT_REGISTRY).join(', ');
      throw new SchematicsException(
        `Component "${componentName}" not found. Available components: ${availableComponents}`
      );
    }

    const componentInfo = COMPONENT_REGISTRY[componentName];
    const basePath = options.path || 'src/app/lib/components/ui';
    const componentPath = normalize(join(normalize(basePath), normalize(componentName)) as Path);

    context.logger.info(`📦 Installing ${componentName} component...`);

    // Check if component directory already exists
    if (tree.exists(componentPath)) {
      context.logger.warn(`⚠️  Component directory ${componentPath} already exists. Skipping...`);
      return tree;
    }

    // Create component directory
    tree.create(join(componentPath, '.gitkeep'), '');

    // Copy component files from the source
    const sourceBasePath = `src/app/lib/components/ui/${componentName}`;

    for (const file of componentInfo.files) {
      const sourcePath = join(normalize(sourceBasePath), normalize(file)) as Path;
      const targetPath = join(componentPath, normalize(file)) as Path;

      if (tree.exists(sourcePath)) {
        const content = tree.read(sourcePath);
        if (content) {
          tree.create(targetPath, content);
          context.logger.info(`  ✅ Created ${file}`);
        }
      } else {
        context.logger.warn(`  ⚠️  Source file ${sourcePath} not found`);
      }
    }

    // Check dependencies
    context.logger.info('');
    context.logger.info('📚 Required dependencies:');
    for (const dep of componentInfo.dependencies) {
      context.logger.info(`  - ${dep}`);
    }

    context.logger.info('');
    context.logger.info(`✅ ${componentName} component installed successfully!`);
    context.logger.info('');
    context.logger.info('📖 Import the component:');
    context.logger.info(`   import { ${toPascalCase(componentName)} } from '@/ui/${componentName}';`);
    context.logger.info('');

    return tree;
  };
}

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}
