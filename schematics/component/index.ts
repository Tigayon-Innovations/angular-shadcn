import { join, normalize, Path } from '@angular-devkit/core';
import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';

interface ComponentOptions {
  name: string;
  project?: string;
  path?: string;
  overwrite?: boolean;
}

// Component registry - maps component names to their file structure
const COMPONENT_REGISTRY: Record<string, ComponentInfo> = {
  accordion: {
    files: ['accordion.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular']
  },
  alert: {
    files: ['alert.component.ts', 'alert-title.component.ts', 'alert-description.component.ts', 'index.ts'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge']
  },
  'alert-dialog': {
    files: ['alert-dialog.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge']
  },
  avatar: {
    files: ['avatar.component.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge']
  },
  badge: {
    files: ['badge.component.ts', 'index.ts'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge']
  },
  breadcrumb: {
    files: ['breadcrumb.component.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge', 'lucide-angular']
  },
  button: {
    files: ['button.component.ts', 'index.ts'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge', '@angular/cdk']
  },
  calendar: {
    files: ['calendar.component.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge', 'lucide-angular']
  },
  card: {
    files: ['card.component.ts', 'card-header.component.ts', 'card-title.component.ts', 'card-description.component.ts', 'card-content.component.ts', 'card-footer.component.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge']
  },
  checkbox: {
    files: ['checkbox.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular']
  },
  collapsible: {
    files: ['collapsible.component.ts', 'index.ts'],
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
  dialog: {
    files: ['dialog.component.ts', 'dialog-content.component.ts', 'dialog-header.component.ts', 'dialog-footer.component.ts', 'dialog-title.component.ts', 'dialog-description.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge']
  },
  drawer: {
    files: ['drawer.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge']
  },
  'dropdown-menu': {
    files: ['dropdown-menu.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge']
  },
  input: {
    files: ['input.component.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge', '@angular/forms']
  },
  label: {
    files: ['label.component.ts', 'index.ts'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge']
  },
  popover: {
    files: ['popover.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge']
  },
  progress: {
    files: ['progress.component.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge']
  },
  'radio-group': {
    files: ['radio-group.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge']
  },
  select: {
    files: ['select.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular']
  },
  separator: {
    files: ['separator.component.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge']
  },
  sheet: {
    files: ['sheet.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular']
  },
  skeleton: {
    files: ['skeleton.component.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge']
  },
  slider: {
    files: ['slider.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge']
  },
  switch: {
    files: ['switch.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge']
  },
  table: {
    files: ['table.component.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge']
  },
  tabs: {
    files: ['tabs.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge']
  },
  textarea: {
    files: ['textarea.component.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge', '@angular/forms']
  },
  toast: {
    files: ['toast.component.ts', 'toaster.component.ts', 'toast.service.ts', 'index.ts'],
    dependencies: ['clsx', 'tailwind-merge', 'lucide-angular']
  },
  toggle: {
    files: ['toggle.component.ts', 'index.ts'],
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge']
  },
  tooltip: {
    files: ['tooltip.component.ts', 'index.ts'],
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge']
  },
};

interface ComponentInfo {
  files: string[];
  dependencies: string[];
}

export function component(options: ComponentOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const componentName = options.name.toLowerCase();

    if (!COMPONENT_REGISTRY[componentName]) {
      const availableComponents = Object.keys(COMPONENT_REGISTRY).sort().join(', ');
      throw new SchematicsException(
        `\n❌ Component "${componentName}" not found.\n\n` +
        `Available components:\n${availableComponents}\n\n` +
        `Usage: ng g @ng-cn/core:c <component-name>\n`
      );
    }

    const componentInfo = COMPONENT_REGISTRY[componentName];
    const basePath = options.path || 'src/app/lib/components/ui';
    const componentPath = normalize(join(normalize(basePath), normalize(componentName)) as Path);

    context.logger.info('');
    context.logger.info(`📦 Installing ${componentName}...`);
    context.logger.info('');

    // Check if component directory already exists
    const firstFilePath = join(componentPath, normalize(componentInfo.files[0])) as Path;
    if (tree.exists(firstFilePath) && !options.overwrite) {
      context.logger.warn(`⚠️  Component already exists at ${componentPath}`);
      context.logger.info(`   Use --overwrite to replace existing files.`);
      context.logger.info('');
      return tree;
    }

    // Copy component files from the package source
    const sourceBasePath = `node_modules/@ng-cn/core/lib/components/ui/${componentName}`;
    const fallbackSourcePath = `src/app/lib/components/ui/${componentName}`;

    let filesCreated = 0;
    for (const file of componentInfo.files) {
      let sourcePath = join(normalize(sourceBasePath), normalize(file)) as Path;
      const targetPath = join(componentPath, normalize(file)) as Path;

      // Try package path first, then fallback to local dev path
      let content = tree.read(sourcePath);
      if (!content) {
        sourcePath = join(normalize(fallbackSourcePath), normalize(file)) as Path;
        content = tree.read(sourcePath);
      }

      if (content) {
        if (tree.exists(targetPath)) {
          tree.overwrite(targetPath, content);
        } else {
          tree.create(targetPath, content);
        }
        context.logger.info(`   ✓ ${componentName}/${file}`);
        filesCreated++;
      }
    }

    if (filesCreated === 0) {
      context.logger.warn(`⚠️  No source files found for ${componentName}`);
      context.logger.info(`   Make sure @ng-cn/core is properly installed.`);
      context.logger.info('');
      return tree;
    }

    // Success message
    context.logger.info('');
    context.logger.info(`✅ ${componentName} installed successfully!`);
    context.logger.info('');
    context.logger.info('   Import:');
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
