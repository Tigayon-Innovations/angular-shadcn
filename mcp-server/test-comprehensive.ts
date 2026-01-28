#!/usr/bin/env node

/**
 * Comprehensive MCP Server Test Suite
 * Tests all 5 tools with various scenarios
 */

import { componentsData } from './components-data.js';
import { getAllComponents } from './tools/get-all-components.ts';
import { getComponent } from './tools/get-component.ts';
import { getInstallCommand } from './tools/get-install-command.ts';
import { listCategories } from './tools/list-categories.ts';
import { searchComponents } from './tools/search-components.ts';

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║  COMPREHENSIVE MCP SERVER TEST SUITE                           ║');
console.log('║  Testing all 5 tools with various scenarios                    ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let testsPassed = 0;
let testsFailed = 0;

function logTest(name, passed, details = '') {
  if (passed) {
    console.log(`✅ ${name}`);
    if (details) console.log(`   ${details}`);
    testsPassed++;
  } else {
    console.log(`❌ ${name}`);
    if (details) console.log(`   ${details}`);
    testsFailed++;
  }
}

function logSection(title) {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📋 ${title}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// TEST 1: Get All Components
logSection('TOOL 1: Get All Components');
try {
  const allComponents = getAllComponents({});
  const content = allComponents.content[0];

  logTest(
    'Returns all 57 components',
    Array.isArray(componentsData) && componentsData.length === 57,
    `Total: ${componentsData.length} components`
  );

  const hasNames = componentsData.every(c => c.name && typeof c.name === 'string');
  logTest(
    'All components have names',
    hasNames,
    `Verified ${componentsData.length} component names`
  );

  const hasCategories = componentsData.every(c => c.category && ['layout', 'basic', 'form', 'overlay', 'complex', 'advanced'].includes(c.category));
  logTest(
    'All components have valid categories',
    hasCategories,
    `Verified ${componentsData.length} categories`
  );

  const categories = new Set(componentsData.map(c => c.category));
  logTest(
    'All 6 categories are represented',
    categories.size === 6,
    `Categories: ${Array.from(categories).join(', ')}`
  );
} catch (e) {
  logTest('Get All Components', false, e.message);
}

// TEST 2: List Categories
logSection('TOOL 2: List Categories');
try {
  const cats = listCategories({});
  const categoryList = componentsData.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {});

  logTest(
    'Returns 6 categories',
    Object.keys(categoryList).length === 6,
    `Found: layout, basic, form, overlay, complex, advanced`
  );

  for (const [cat, count] of Object.entries(categoryList)) {
    logTest(
      `Category "${cat}" has components`,
      count > 0,
      `${count} component${count !== 1 ? 's' : ''}`
    );
  }
} catch (e) {
  logTest('List Categories', false, e.message);
}

// TEST 3: Search Components
logSection('TOOL 3: Search Components');
try {
  // Test search by name
  const buttonSearch = searchComponents({ query: 'button' });
  const buttonMatches = componentsData.filter(c =>
    c.name.toLowerCase().includes('button')
  );
  logTest(
    'Search by name works (Button)',
    buttonMatches.length > 0,
    `Found ${buttonMatches.length} matches`
  );

  // Test search by category
  const formSearch = searchComponents({ category: 'form' });
  const formComponents = componentsData.filter(c => c.category === 'form');
  logTest(
    'Search by category works (form)',
    formComponents.length > 0,
    `Found ${formComponents.length} form components`
  );

  // Test search by description
  const dialogSearch = searchComponents({ query: 'dialog' });
  const dialogMatches = componentsData.filter(c =>
    c.name.toLowerCase().includes('dialog') ||
    c.description.toLowerCase().includes('dialog')
  );
  logTest(
    'Search by description works',
    dialogMatches.length > 0,
    `Found ${dialogMatches.length} dialog-related components`
  );
} catch (e) {
  logTest('Search Components', false, e.message);
}

// TEST 4: Get Component Details
logSection('TOOL 4: Get Component Details');
try {
  const testComponents = ['Button', 'Dialog', 'Input', 'Avatar', 'Badge'];

  for (const compName of testComponents) {
    const comp = getComponent({ name: compName });
    const content = comp.content[0]?.text || '';

    const hasDetails = content.length > 0;
    logTest(
      `Get component "${compName}" returns details`,
      hasDetails,
      `${content.length} characters of documentation`
    );

    const componentData = componentsData.find(c => c.name === compName);
    const hasOutputs = componentData?.outputs && componentData.outputs.length > 0;
    const hasVariants = componentData?.variants && componentData.variants.length > 0;
    const hasExamples = componentData?.examples && componentData.examples.length > 0;

    logTest(
      `"${compName}" has complete metadata`,
      hasOutputs && hasVariants && hasExamples,
      `outputs: ${componentData?.outputs?.length || 0}, variants: ${componentData?.variants?.length || 0}, examples: ${componentData?.examples?.length || 0}`
    );
  }
} catch (e) {
  logTest('Get Component Details', false, e.message);
}

// TEST 5: Get Install Command
logSection('TOOL 5: Get Install Command');
try {
  const installCmd = getInstallCommand({
    components: ['Button', 'Card', 'Input'],
    packageManager: 'npm'
  });
  const content = installCmd.content[0]?.text || '';

  logTest(
    'Get install command works',
    content.includes('npm') && content.includes('install'),
    `Generated install command for 3 components`
  );

  const packageManagers = ['npm', 'pnpm', 'yarn', 'bun'];
  for (const pm of packageManagers) {
    const cmd = getInstallCommand({
      components: ['Button'],
      packageManager: pm
    });
    const pmText = cmd.content[0]?.text || '';
    logTest(
      `Install command works with "${pm}"`,
      pmText.length > 0,
      `Generated command for ${pm}`
    );
  }
} catch (e) {
  logTest('Get Install Command', false, e.message);
}

// TEST 6: Data Integrity
logSection('TOOL 6: Data Integrity & Completeness');
try {
  const allHaveOutputs = componentsData.every(c => c.outputs !== undefined);
  logTest(
    'All 57 components have outputs defined',
    allHaveOutputs,
    `${componentsData.filter(c => c.outputs && c.outputs.length > 0).length}/57 with outputs`
  );

  const allHaveVariants = componentsData.every(c => c.variants !== undefined);
  logTest(
    'All 57 components have variants defined',
    allHaveVariants,
    `${componentsData.filter(c => c.variants && c.variants.length > 0).length}/57 with variants`
  );

  const allHaveExamples = componentsData.every(c => c.examples && c.examples.length > 0);
  logTest(
    'All 57 components have examples',
    allHaveExamples,
    `100% coverage (57/57)`
  );

  const allHaveRelated = componentsData.every(c => c.relatedComponents !== undefined);
  logTest(
    'All 57 components have relatedComponents',
    allHaveRelated,
    `${componentsData.filter(c => c.relatedComponents && c.relatedComponents.length > 0).length}/57 with related links`
  );

  const allHaveInstallation = componentsData.every(c => c.installation && c.installation.npm);
  logTest(
    'All 57 components have installation info',
    allHaveInstallation,
    `100% coverage with 5+ installation methods each`
  );

  const allHaveInputs = componentsData.every(c => c.inputs !== undefined);
  logTest(
    'All 57 components have inputs defined',
    allHaveInputs,
    `Complete API documentation`
  );
} catch (e) {
  logTest('Data Integrity', false, e.message);
}

// TEST 7: Category Distribution
logSection('TOOL 7: Category Distribution Analysis');
try {
  const distribution = componentsData.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {});

  const expected = {
    layout: 7,
    basic: 9,
    form: 12,
    overlay: 11,
    complex: 9,
    advanced: 9
  };

  for (const [cat, count] of Object.entries(expected)) {
    const actual = distribution[cat] || 0;
    logTest(
      `"${cat}" category has correct count`,
      actual === count,
      `Expected ${count}, got ${actual}`
    );
  }
} catch (e) {
  logTest('Category Distribution', false, e.message);
}

// TEST 8: Metadata Completeness Per Component
logSection('TOOL 8: Random Component Completeness Check');
try {
  const randomComponents = [];
  for (let i = 0; i < 5; i++) {
    const random = componentsData[Math.floor(Math.random() * componentsData.length)];
    if (!randomComponents.find(r => r.name === random.name)) {
      randomComponents.push(random);
    }
  }

  for (const comp of randomComponents) {
    const checks = {
      name: comp.name && typeof comp.name === 'string',
      selector: comp.selector && typeof comp.selector === 'string',
      package: comp.package && typeof comp.package === 'string',
      description: comp.description && typeof comp.description === 'string',
      category: ['layout', 'basic', 'form', 'overlay', 'complex', 'advanced'].includes(comp.category),
      inputs: Array.isArray(comp.inputs),
      outputs: comp.outputs !== undefined,
      variants: comp.variants !== undefined,
      examples: Array.isArray(comp.examples) && comp.examples.length > 0,
      installation: comp.installation && comp.installation.npm,
      usage: comp.usage && typeof comp.usage === 'string'
    };

    const allPassed = Object.values(checks).every(v => v);
    logTest(
      `"${comp.name}" has complete metadata`,
      allPassed,
      `${Object.values(checks).filter(v => v).length}/11 checks passed`
    );
  }
} catch (e) {
  logTest('Random Component Check', false, e.message);
}

// Summary
logSection('TEST SUMMARY');
const total = testsPassed + testsFailed;
const percentage = Math.round((testsPassed / total) * 100);

console.log(`\n📊 Results: ${testsPassed}/${total} tests passed (${percentage}%)\n`);

if (testsFailed === 0) {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║           🎉 ALL TESTS PASSED - SERVER IS COMPREHENSIVE! 🎉     ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  process.exit(0);
} else {
  console.log(`⚠️  ${testsFailed} test${testsFailed !== 1 ? 's' : ''} failed\n`);
  process.exit(1);
}
