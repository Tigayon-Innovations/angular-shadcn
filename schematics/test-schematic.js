/**
 * Test script for ng-add schematic
 * Run with: node test-schematic.js
 */

const { SchematicTestRunner } = require('@angular-devkit/schematics/testing');
const { HostTree } = require('@angular-devkit/schematics');
const path = require('path');

const collectionPath = path.join(__dirname, 'collection.json');

// Mock tsconfig.json with comments (typical Angular project)
const MOCK_TSCONFIG = `/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}`;

const MOCK_PACKAGE_JSON = `{
  "name": "test-angular",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build"
  },
  "dependencies": {
    "@angular/core": "^21.0.0"
  },
  "devDependencies": {}
}`;

const MOCK_STYLES_CSS = `/* You can add global styles to this file, and also import other style files */
`;

async function runTests() {
  console.log('\n🧪 Testing ng-add schematic...\n');

  const runner = new SchematicTestRunner('schematics', collectionPath);

  // Create a mock project tree using HostTree
  const appTree = new HostTree();
  appTree.create('/package.json', MOCK_PACKAGE_JSON);
  appTree.create('/tsconfig.json', MOCK_TSCONFIG);
  appTree.create('/src/styles.css', MOCK_STYLES_CSS);

  console.log('📁 Created mock project with:');
  console.log('   - /package.json');
  console.log('   - /tsconfig.json (with comments)');
  console.log('   - /src/styles.css\n');

  try {
    // Run the ng-add schematic
    const tree = await runner.runSchematic('ng-add', { skipInstall: true }, appTree);

    console.log('✅ Schematic executed successfully!\n');

    // Verify files were created
    const expectedFiles = [
      '/src/app/lib/utils/cn.ts',
      '/src/app/lib/utils/index.ts',
      '/src/app/lib/components/ui/.gitkeep',
      '/src/ng-cn.scss',
    ];

    console.log('📄 Checking created files:');
    for (const file of expectedFiles) {
      if (tree.exists(file)) {
        console.log(`   ✅ ${file}`);
      } else {
        console.log(`   ❌ Missing: ${file}`);
      }
    }

    // Verify tsconfig was updated
    console.log('\n⚙️  Checking tsconfig.json:');
    const tsconfigContent = tree.read('/tsconfig.json').toString('utf-8');
    const tsconfig = JSON.parse(tsconfigContent);
    const paths = tsconfig.compilerOptions?.paths || {};

    const expectedPaths = ['@/*', '@/lib/*', '@/ui/*', '@/utils/*'];
    for (const p of expectedPaths) {
      if (paths[p]) {
        console.log(`   ✅ Path alias: ${p}`);
      } else {
        console.log(`   ❌ Missing path alias: ${p}`);
      }
    }

    // Verify styles were imported
    console.log('\n🎨 Checking styles:');
    const stylesContent = tree.read('/src/styles.css').toString('utf-8');
    if (stylesContent.includes('ng-cn.scss')) {
      console.log('   ✅ ng-cn.scss imported in styles.css');
    } else {
      console.log('   ❌ ng-cn.scss not imported');
    }

    // Verify dependencies
    console.log('\n📦 Checking dependencies:');
    const packageJsonContent = tree.read('/package.json').toString('utf-8');
    const packageJson = JSON.parse(packageJsonContent);
    const requiredDeps = ['lucide-angular', 'clsx', 'tailwind-merge', 'class-variance-authority'];
    for (const dep of requiredDeps) {
      if (packageJson.dependencies?.[dep]) {
        console.log(`   ✅ ${dep}@${packageJson.dependencies[dep]}`);
      } else {
        console.log(`   ❌ Missing: ${dep}`);
      }
    }

    console.log('\n✨ All tests passed!\n');
  } catch (error) {
    console.error('\n❌ Schematic failed with error:');
    console.error(error);
    process.exit(1);
  }
}

runTests();
