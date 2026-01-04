import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

interface NgAddOptions {
  project?: string;
  skipInstall?: boolean;
}

export function ngAdd(options: NgAddOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('✨ Adding @ascn components to your project...');

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
      for (const [pkg, version] of Object.entries(requiredDependencies)) {
        if (!packageJson.dependencies?.[pkg]) {
          packageJson.dependencies = packageJson.dependencies || {};
          packageJson.dependencies[pkg] = version;
          needsInstall = true;
          context.logger.info(`  📦 Adding ${pkg}@${version}`);
        }
      }

      if (needsInstall) {
        tree.overwrite(packageJsonPath, JSON.stringify(packageJson, null, 2));

        if (!options.skipInstall) {
          context.addTask(new NodePackageInstallTask());
        }
      } else {
        context.logger.info('  ✅ All dependencies already installed');
      }
    }

    context.logger.info('');
    context.logger.info('✅ @ascn setup complete!');
    context.logger.info('');
    context.logger.info('📚 Next steps:');
    context.logger.info('  1. Ensure Tailwind CSS is configured in your project');
    context.logger.info('  2. Add CSS variables to your styles.scss (see docs)');
    context.logger.info('  3. Install components: ng add @ascn/button');
    context.logger.info('');

    return tree;
  };
}
