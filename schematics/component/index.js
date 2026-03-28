"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.component = component;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
// Component registry - maps component names to their file structure
const COMPONENT_REGISTRY = {
    accordion: {
        files: [
            'accordion.component.ts',
            'accordion-content.component.ts',
            'accordion-context.ts',
            'accordion-item.component.ts',
            'accordion-trigger.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular'],
    },
    alert: {
        files: [
            'alert.component.ts',
            'alert-title.component.ts',
            'alert-description.component.ts',
            'alert-variants.ts',
            'index.ts',
        ],
        dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    },
    'alert-dialog': {
        files: [
            'alert-dialog.component.ts',
            'alert-dialog-action.component.ts',
            'alert-dialog-cancel.component.ts',
            'alert-dialog-content.component.ts',
            'alert-dialog-context.ts',
            'alert-dialog-description.component.ts',
            'alert-dialog-footer.component.ts',
            'alert-dialog-header.component.ts',
            'alert-dialog-title.component.ts',
            'alert-dialog-trigger.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    },
    'aspect-ratio': {
        files: ['aspect-ratio.component.ts', 'index.ts'],
        dependencies: ['clsx', 'tailwind-merge'],
    },
    avatar: {
        files: [
            'avatar.component.ts',
            'avatar-fallback.component.ts',
            'avatar-image.component.ts',
            'ui-avatar.component.ts',
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge'],
    },
    badge: {
        files: ['badge.component.ts', 'badge-variants.ts', 'index.ts'],
        dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    },
    breadcrumb: {
        files: [
            'breadcrumb.component.ts',
            'breadcrumb-ellipsis.component.ts',
            'breadcrumb-item.component.ts',
            'breadcrumb-link.component.ts',
            'breadcrumb-list.component.ts',
            'breadcrumb-page.component.ts',
            'breadcrumb-separator.component.ts',
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge', 'lucide-angular'],
    },
    button: {
        files: ['button.component.ts', 'button-variants.ts', 'index.ts'],
        dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge', '@angular/cdk'],
    },
    'button-group': {
        files: ['button-group.component.ts', 'button-group-variants.ts', 'index.ts'],
        dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    },
    calendar: {
        files: ['calendar.component.ts', 'index.ts'],
        dependencies: ['clsx', 'tailwind-merge', 'lucide-angular'],
    },
    card: {
        files: [
            'card.component.ts',
            'card-action.component.ts',
            'card-content.component.ts',
            'card-description.component.ts',
            'card-footer.component.ts',
            'card-header.component.ts',
            'card-title.component.ts',
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge'],
    },
    carousel: {
        files: [
            'carousel.component.ts',
            'carousel-content.component.ts',
            'carousel-context.ts',
            'carousel-item.component.ts',
            'carousel-next.component.ts',
            'carousel-previous.component.ts',
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge', 'lucide-angular'],
    },
    chart: {
        files: [
            'chart.component.ts',
            'chart-container.component.ts',
            'chart-context.ts',
            'chart-legend.component.ts',
            'chart-legend-content.component.ts',
            'chart-tooltip.component.ts',
            'chart-tooltip-content.component.ts',
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge'],
    },
    checkbox: {
        files: ['checkbox.component.ts', 'index.ts'],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular'],
    },
    collapsible: {
        files: [
            'collapsible.component.ts',
            'collapsible-content.component.ts',
            'collapsible-context.ts',
            'collapsible-trigger.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    },
    combobox: {
        files: [
            'combobox.component.ts',
            'combobox-content.component.ts',
            'combobox-context.ts',
            'combobox-empty.component.ts',
            'combobox-group.component.ts',
            'combobox-input.component.ts',
            'combobox-item.component.ts',
            'combobox-list.component.ts',
            'combobox-trigger.component.ts',
            'combobox-value.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular'],
    },
    command: {
        files: [
            'command.component.ts',
            'command-context.ts',
            'command-dialog.component.ts',
            'command-empty.component.ts',
            'command-group.component.ts',
            'command-input.component.ts',
            'command-item.component.ts',
            'command-list.component.ts',
            'command-separator.component.ts',
            'command-shortcut.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular'],
    },
    'context-menu': {
        files: [
            'context-menu.component.ts',
            'context-menu-checkbox-item.component.ts',
            'context-menu-content.component.ts',
            'context-menu-context.ts',
            'context-menu-item.component.ts',
            'context-menu-label.component.ts',
            'context-menu-radio-group.component.ts',
            'context-menu-radio-item.component.ts',
            'context-menu-separator.component.ts',
            'context-menu-shortcut.component.ts',
            'context-menu-sub.component.ts',
            'context-menu-sub-content.component.ts',
            'context-menu-sub-trigger.component.ts',
            'context-menu-trigger.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular'],
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
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge', 'lucide-angular'],
    },
    'date-picker': {
        files: ['date-picker.component.ts', 'index.ts'],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular'],
    },
    dialog: {
        files: [
            'dialog.component.ts',
            'dialog-close.component.ts',
            'dialog-content.component.ts',
            'dialog-context.ts',
            'dialog-description.component.ts',
            'dialog-footer.component.ts',
            'dialog-header.component.ts',
            'dialog-title.component.ts',
            'dialog-trigger.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    },
    drawer: {
        files: [
            'drawer.component.ts',
            'drawer-close.component.ts',
            'drawer-content.component.ts',
            'drawer-context.ts',
            'drawer-description.component.ts',
            'drawer-footer.component.ts',
            'drawer-header.component.ts',
            'drawer-title.component.ts',
            'drawer-trigger.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    },
    'dropdown-menu': {
        files: [
            'dropdown-menu.component.ts',
            'dropdown-menu-checkbox-item.component.ts',
            'dropdown-menu-content.component.ts',
            'dropdown-menu-context.ts',
            'dropdown-menu-group.component.ts',
            'dropdown-menu-item.component.ts',
            'dropdown-menu-label.component.ts',
            'dropdown-menu-radio-group.component.ts',
            'dropdown-menu-radio-item.component.ts',
            'dropdown-menu-separator.component.ts',
            'dropdown-menu-shortcut.component.ts',
            'dropdown-menu-sub.component.ts',
            'dropdown-menu-sub-content.component.ts',
            'dropdown-menu-sub-trigger.component.ts',
            'dropdown-menu-trigger.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular'],
    },
    empty: {
        files: [
            'empty.component.ts',
            'empty-action.component.ts',
            'empty-description.component.ts',
            'empty-icon.component.ts',
            'empty-title.component.ts',
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge'],
    },
    form: {
        files: [
            'form.component.ts',
            'form-context.ts',
            'form-control.component.ts',
            'form-description.component.ts',
            'form-field.component.ts',
            'form-item.component.ts',
            'form-label.component.ts',
            'form-message.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/forms', 'clsx', 'tailwind-merge'],
    },
    'hover-card': {
        files: [
            'hover-card.component.ts',
            'hover-card-content.component.ts',
            'hover-card-context.ts',
            'hover-card-trigger.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    },
    input: {
        files: ['input.component.ts', 'index.ts'],
        dependencies: ['clsx', 'tailwind-merge', '@angular/forms'],
    },
    'input-group': {
        files: [
            'input-group.component.ts',
            'input-group-addon.component.ts',
            'input-group-input.component.ts',
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge', '@angular/forms'],
    },
    'input-otp': {
        files: [
            'input-otp.component.ts',
            'input-otp-context.ts',
            'input-otp-group.component.ts',
            'input-otp-separator.component.ts',
            'input-otp-slot.component.ts',
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge', '@angular/forms'],
    },
    kbd: {
        files: ['kbd.component.ts', 'kbd-variants.ts', 'index.ts'],
        dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    },
    label: {
        files: ['label.component.ts', 'index.ts'],
        dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    },
    menubar: {
        files: [
            'menubar.component.ts',
            'menubar-checkbox-item.component.ts',
            'menubar-content.component.ts',
            'menubar-context.ts',
            'menubar-item.component.ts',
            'menubar-label.component.ts',
            'menubar-menu.component.ts',
            'menubar-radio-group.component.ts',
            'menubar-radio-item.component.ts',
            'menubar-separator.component.ts',
            'menubar-shortcut.component.ts',
            'menubar-sub.component.ts',
            'menubar-sub-content.component.ts',
            'menubar-sub-trigger.component.ts',
            'menubar-trigger.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular'],
    },
    'native-select': {
        files: ['native-select.component.ts', 'native-select-variants.ts', 'index.ts'],
        dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    },
    'navigation-menu': {
        files: [
            'navigation-menu.component.ts',
            'navigation-menu-content.component.ts',
            'navigation-menu-context.ts',
            'navigation-menu-indicator.component.ts',
            'navigation-menu-item.component.ts',
            'navigation-menu-link.component.ts',
            'navigation-menu-list.component.ts',
            'navigation-menu-trigger.component.ts',
            'navigation-menu-trigger-style.ts',
            'navigation-menu-viewport.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    },
    pagination: {
        files: [
            'pagination.component.ts',
            'pagination-content.component.ts',
            'pagination-ellipsis.component.ts',
            'pagination-item.component.ts',
            'pagination-link.component.ts',
            'pagination-next.component.ts',
            'pagination-previous.component.ts',
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge', 'lucide-angular'],
    },
    popover: {
        files: [
            'popover.component.ts',
            'popover-anchor.component.ts',
            'popover-content.component.ts',
            'popover-context.ts',
            'popover-trigger.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    },
    progress: {
        files: ['progress.component.ts', 'index.ts'],
        dependencies: ['clsx', 'tailwind-merge'],
    },
    'radio-group': {
        files: [
            'radio-group.component.ts',
            'radio-group-context.ts',
            'radio-group-item.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    },
    resizable: {
        files: [
            'resizable-panel-group.component.ts',
            'resizable-context.ts',
            'resizable-handle.component.ts',
            'resizable-panel.component.ts',
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge'],
    },
    'scroll-area': {
        files: ['scroll-area.component.ts', 'scroll-bar.component.ts', 'index.ts'],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    },
    segmented: {
        files: [
            'segmented.component.ts',
            'segmented-context.ts',
            'segmented-item.component.ts',
            'segmented-variants.ts',
            'index.ts',
        ],
        dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    },
    select: {
        files: [
            'select.component.ts',
            'select-content.component.ts',
            'select-context.ts',
            'select-group.component.ts',
            'select-item.component.ts',
            'select-label.component.ts',
            'select-separator.component.ts',
            'select-trigger.component.ts',
            'select-value.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular'],
    },
    separator: {
        files: ['separator.component.ts', 'index.ts'],
        dependencies: ['clsx', 'tailwind-merge'],
    },
    sheet: {
        files: [
            'sheet.component.ts',
            'sheet-close.component.ts',
            'sheet-content.component.ts',
            'sheet-context.ts',
            'sheet-description.component.ts',
            'sheet-footer.component.ts',
            'sheet-header.component.ts',
            'sheet-title.component.ts',
            'sheet-trigger.component.ts',
            'sheet-variants.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular'],
    },
    sidebar: {
        files: [
            'sidebar.component.ts',
            'sidebar-content.component.ts',
            'sidebar-context.ts',
            'sidebar-footer.component.ts',
            'sidebar-group.component.ts',
            'sidebar-group-action.component.ts',
            'sidebar-group-content.component.ts',
            'sidebar-group-label.component.ts',
            'sidebar-header.component.ts',
            'sidebar-input.component.ts',
            'sidebar-inset.component.ts',
            'sidebar-menu.component.ts',
            'sidebar-menu-action.component.ts',
            'sidebar-menu-badge.component.ts',
            'sidebar-menu-button.component.ts',
            'sidebar-menu-item.component.ts',
            'sidebar-menu-skeleton.component.ts',
            'sidebar-menu-sub.component.ts',
            'sidebar-menu-sub-button.component.ts',
            'sidebar-menu-sub-item.component.ts',
            'sidebar-provider.component.ts',
            'sidebar-rail.component.ts',
            'sidebar-route-active.service.ts',
            'sidebar-separator.component.ts',
            'sidebar-trigger.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge', 'lucide-angular'],
    },
    skeleton: {
        files: ['skeleton.component.ts', 'index.ts'],
        dependencies: ['clsx', 'tailwind-merge'],
    },
    slider: {
        files: ['slider.component.ts', 'index.ts'],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    },
    spinner: {
        files: ['spinner.component.ts', 'spinner-variants.ts', 'index.ts'],
        dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    },
    switch: {
        files: ['switch.component.ts', 'index.ts'],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    },
    table: {
        files: [
            'table.component.ts',
            'table-body.component.ts',
            'table-caption.component.ts',
            'table-cell.component.ts',
            'table-footer.component.ts',
            'table-head.component.ts',
            'table-header.component.ts',
            'table-row.component.ts',
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge'],
    },
    tabs: {
        files: [
            'tabs.component.ts',
            'tabs-content.component.ts',
            'tabs-context.ts',
            'tabs-list.component.ts',
            'tabs-trigger.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    },
    textarea: {
        files: ['textarea.component.ts', 'index.ts'],
        dependencies: ['clsx', 'tailwind-merge', '@angular/forms'],
    },
    toast: {
        files: [
            'toast.component.ts',
            'toast-action.component.ts',
            'toast-description.component.ts',
            'toast-title.component.ts',
            'toast-variants.ts',
            'toast.service.ts',
            'toaster.component.ts',
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge', 'lucide-angular'],
    },
    toggle: {
        files: ['toggle.component.ts', 'toggle-variants.ts', 'index.ts'],
        dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    },
    'toggle-group': {
        files: [
            'toggle-group.component.ts',
            'toggle-group-context.ts',
            'toggle-group-item.component.ts',
            'index.ts',
        ],
        dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    },
    tooltip: {
        files: [
            'tooltip.component.ts',
            'tooltip-content.component.ts',
            'tooltip-context.ts',
            'tooltip-provider.component.ts',
            'tooltip-trigger.component.ts',
            'index.ts',
        ],
        dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    },
    typography: {
        files: [
            'typography-blockquote.component.ts',
            'typography-h1.component.ts',
            'typography-h2.component.ts',
            'typography-h3.component.ts',
            'typography-h4.component.ts',
            'typography-inline-code.component.ts',
            'typography-large.component.ts',
            'typography-lead.component.ts',
            'typography-list.component.ts',
            'typography-muted.component.ts',
            'typography-p.component.ts',
            'typography-small.component.ts',
            'index.ts',
        ],
        dependencies: ['clsx', 'tailwind-merge'],
    },
};
function component(options) {
    return (tree, context) => {
        const componentName = options.name.toLowerCase();
        if (!COMPONENT_REGISTRY[componentName]) {
            const availableComponents = Object.keys(COMPONENT_REGISTRY).sort().join(', ');
            throw new schematics_1.SchematicsException(`\n❌ Component "${componentName}" not found.\n\n` +
                `Available components:\n${availableComponents}\n\n` +
                `Usage: ng g @ng-cn/core:c <component-name>\n`);
        }
        const componentInfo = COMPONENT_REGISTRY[componentName];
        const basePath = options.path || 'src/app/lib/components/ui';
        const componentPath = (0, core_1.normalize)((0, core_1.join)((0, core_1.normalize)(basePath), (0, core_1.normalize)(componentName)));
        context.logger.info('');
        context.logger.info(`📦 Installing ${componentName}...`);
        context.logger.info('');
        // Check if component directory already exists
        const firstFilePath = (0, core_1.join)(componentPath, (0, core_1.normalize)(componentInfo.files[0]));
        if (tree.exists(firstFilePath) && !options.overwrite) {
            context.logger.warn(`⚠️  Component already exists at ${componentPath}`);
            context.logger.info(`   Use --overwrite to replace existing files.`);
            context.logger.info('');
            return tree;
        }
        // Copy component files from the package source
        const sourceBasePath = `node_modules/@ng-cn/core/src/app/lib/components/ui/${componentName}`;
        const fallbackSourcePath = `src/app/lib/components/ui/${componentName}`;
        let filesCreated = 0;
        for (const file of componentInfo.files) {
            let sourcePath = (0, core_1.join)((0, core_1.normalize)(sourceBasePath), (0, core_1.normalize)(file));
            const targetPath = (0, core_1.join)(componentPath, (0, core_1.normalize)(file));
            // Try package path first, then fallback to local dev path
            let content = tree.read(sourcePath);
            if (!content) {
                sourcePath = (0, core_1.join)((0, core_1.normalize)(fallbackSourcePath), (0, core_1.normalize)(file));
                content = tree.read(sourcePath);
            }
            if (content) {
                if (tree.exists(targetPath)) {
                    tree.overwrite(targetPath, content);
                }
                else {
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
function toPascalCase(str) {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}
