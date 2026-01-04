"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.component = component;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
// Component registry - maps component names to their file structure
const COMPONENT_REGISTRY = {
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
function component(options) {
    return (tree, context) => {
        const componentName = options.name.toLowerCase();
        if (!COMPONENT_REGISTRY[componentName]) {
            const availableComponents = Object.keys(COMPONENT_REGISTRY).join(', ');
            throw new schematics_1.SchematicsException(`Component "${componentName}" not found. Available components: ${availableComponents}`);
        }
        const componentInfo = COMPONENT_REGISTRY[componentName];
        const basePath = options.path || 'src/app/lib/components/ui';
        const componentPath = (0, core_1.normalize)((0, core_1.join)((0, core_1.normalize)(basePath), (0, core_1.normalize)(componentName)));
        context.logger.info(`📦 Installing ${componentName} component...`);
        // Check if component directory already exists
        if (tree.exists(componentPath)) {
            context.logger.warn(`⚠️  Component directory ${componentPath} already exists. Skipping...`);
            return tree;
        }
        // Create component directory
        tree.create((0, core_1.join)(componentPath, '.gitkeep'), '');
        // Copy component files from the source
        const sourceBasePath = `src/app/lib/components/ui/${componentName}`;
        for (const file of componentInfo.files) {
            const sourcePath = (0, core_1.join)((0, core_1.normalize)(sourceBasePath), (0, core_1.normalize)(file));
            const targetPath = (0, core_1.join)(componentPath, (0, core_1.normalize)(file));
            if (tree.exists(sourcePath)) {
                const content = tree.read(sourcePath);
                if (content) {
                    tree.create(targetPath, content);
                    context.logger.info(`  ✅ Created ${file}`);
                }
            }
            else {
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
function toPascalCase(str) {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}
