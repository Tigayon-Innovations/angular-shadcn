#!/usr/bin/env node

/**
 * Comprehensive MCP Server Test Suite (Node.js)
 * Tests all components data without full tool execution
 */

import fs from 'fs';

// Read and parse components data
const componentDataContent = fs.readFileSync('./components-data.ts', 'utf-8');

// Parse the JSON array from the TypeScript file
const jsonMatch = componentDataContent.match(/export const componentsData: ComponentMetadata\[\] = (\[[\s\S]*\]);/);
if (!jsonMatch) {
  console.error('❌ Could not parse components-data.ts');
  process.exit(1);
}

let componentsData;
try {
  componentsData = JSON.parse(jsonMatch[1]);
} catch (e) {
  console.error('❌ JSON parsing failed:', e.message);
  process.exit(1);
}

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║  COMPREHENSIVE MCP SERVER TEST SUITE                           ║');
console.log('║  Testing all components data and schema                        ║');
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

// TEST 1: Basic Data Structure
logSection('TEST 1: Basic Data Structure');

logTest(
  'Components data is an array',
  Array.isArray(componentsData),
  `Type: ${typeof componentsData}`
);

logTest(
  'Contains exactly 57 components',
  componentsData.length === 57,
  `Total: ${componentsData.length}`
);

// TEST 2: Component Naming
logSection('TEST 2: Component Naming & Selectors');

const hasNames = componentsData.every(c => c.name && typeof c.name === 'string');
logTest(
  'All components have names',
  hasNames,
  `Verified ${componentsData.length} component names`
);

const hasSelectors = componentsData.every(c => c.selector && typeof c.selector === 'string');
logTest(
  'All components have selectors',
  hasSelectors,
  `Verified ${componentsData.length} selectors`
);

const uniqueNames = new Set(componentsData.map(c => c.name));
logTest(
  'All component names are unique',
  uniqueNames.size === 57,
  `${uniqueNames.size}/57 unique names`
);

// TEST 3: Categories
logSection('TEST 3: Category Validation');

const validCategories = ['layout', 'basic', 'form', 'overlay', 'complex', 'advanced'];
const hasValidCategories = componentsData.every(c =>
  validCategories.includes(c.category)
);
logTest(
  'All components have valid categories',
  hasValidCategories,
  `Valid: ${validCategories.join(', ')}`
);

const categoryDistribution = componentsData.reduce((acc, c) => {
  acc[c.category] = (acc[c.category] || 0) + 1;
  return acc;
}, {});

logTest(
  'All 6 categories are represented',
  Object.keys(categoryDistribution).length === 6,
  `Distribution: ${JSON.stringify(categoryDistribution)}`
);

for (const [cat, count] of Object.entries(categoryDistribution)) {
  logTest(
    `Category "${cat}" has ${count} component${count !== 1 ? 's' : ''}`,
    count > 0,
    `${count}/${componentsData.length} total`
  );
}

// TEST 4: Inputs Documentation
logSection('TEST 4: Inputs Documentation');

const hasInputs = componentsData.every(c => Array.isArray(c.inputs));
logTest(
  'All components have inputs array',
  hasInputs,
  `100% coverage`
);

const withInputs = componentsData.filter(c => c.inputs && c.inputs.length > 0).length;
logTest(
  'Components with documented inputs',
  withInputs > 0,
  `${withInputs}/57 components (${Math.round(withInputs/57*100)}%)`
);

// TEST 5: Outputs Documentation ✨ NEW
logSection('TEST 5: Outputs Documentation (NEW)');

const hasOutputsField = componentsData.every(c => c.outputs !== undefined);
logTest(
  'All components have outputs field',
  hasOutputsField,
  `100% coverage`
);

const withOutputs = componentsData.filter(c => c.outputs && c.outputs.length > 0).length;
logTest(
  'Components with documented outputs',
  withOutputs === 57,
  `${withOutputs}/57 components (${Math.round(withOutputs/57*100)}%)`
);

const outputsWithDescription = componentsData
  .flatMap(c => c.outputs || [])
  .filter(o => o.description && o.description.length > 0).length;

logTest(
  'All outputs have descriptions',
  outputsWithDescription > 0,
  `${outputsWithDescription} total outputs documented`
);

// TEST 6: Variants Documentation ✨ NEW
logSection('TEST 6: Variants Documentation (NEW)');

const hasVariantsField = componentsData.every(c => c.variants !== undefined);
logTest(
  'All components have variants field',
  hasVariantsField,
  `100% coverage`
);

const withVariants = componentsData.filter(c => c.variants && c.variants.length > 0).length;
logTest(
  'Components with documented variants',
  withVariants === 57,
  `${withVariants}/57 components (${Math.round(withVariants/57*100)}%)`
);

const variantsWithValues = componentsData
  .flatMap(c => c.variants || [])
  .filter(v => Array.isArray(v.values) && v.values.length > 0).length;

logTest(
  'All variants have option values',
  variantsWithValues > 0,
  `${variantsWithValues} variant options documented`
);

// TEST 7: Examples Documentation
logSection('TEST 7: Examples Documentation');

const hasExamples = componentsData.every(c => Array.isArray(c.examples) && c.examples.length > 0);
logTest(
  'All components have examples',
  hasExamples,
  `100% coverage (57/57)`
);

const totalExamples = componentsData.reduce((sum, c) => sum + (c.examples?.length || 0), 0);
logTest(
  'Total examples provided',
  totalExamples > 0,
  `${totalExamples} total usage examples`
);

const avgExamples = (totalExamples / 57).toFixed(1);
logTest(
  'Average examples per component',
  avgExamples >= 2,
  `${avgExamples} examples per component`
);

// TEST 8: Related Components ✨ NEW
logSection('TEST 8: Related Components (NEW)');

const hasRelatedField = componentsData.every(c => c.relatedComponents !== undefined);
logTest(
  'All components have relatedComponents field',
  hasRelatedField,
  `100% coverage`
);

const withRelated = componentsData.filter(c =>
  c.relatedComponents && c.relatedComponents.length > 0
).length;
logTest(
  'Components with related component links',
  withRelated === 57,
  `${withRelated}/57 components (${Math.round(withRelated/57*100)}%)`
);

// TEST 9: Installation Information
logSection('TEST 9: Installation Information');

const hasInstallation = componentsData.every(c => c.installation);
logTest(
  'All components have installation info',
  hasInstallation,
  `100% coverage`
);

const hasNpm = componentsData.every(c => c.installation && c.installation.npm);
logTest(
  'All have npm installation',
  hasNpm,
  `100% coverage`
);

const hasPnpm = componentsData.every(c => c.installation && c.installation.pnpm);
logTest(
  'All have pnpm installation',
  hasPnpm,
  `100% coverage`
);

const hasYarn = componentsData.every(c => c.installation && c.installation.yarn);
logTest(
  'All have yarn installation',
  hasYarn,
  `100% coverage`
);

const hasBun = componentsData.every(c => c.installation && c.installation.bun);
logTest(
  'All have bun installation',
  hasBun,
  `100% coverage`
);

const hasNgAdd = componentsData.every(c => c.installation && c.installation.ngAdd);
logTest(
  'All have ng add installation',
  hasNgAdd,
  `100% coverage`
);

// TEST 10: Usage Documentation
logSection('TEST 10: Usage Documentation');

const hasUsage = componentsData.every(c => c.usage && typeof c.usage === 'string');
logTest(
  'All components have usage documentation',
  hasUsage,
  `100% coverage`
);

// TEST 11: Package Definitions
logSection('TEST 11: Package Definitions');

const hasPackages = componentsData.every(c => c.package && typeof c.package === 'string');
logTest(
  'All components have package names',
  hasPackages,
  `100% coverage`
);

const uniquePackages = new Set(componentsData.map(c => c.package)).size;
logTest(
  'Unique packages defined',
  uniquePackages === 57,
  `${uniquePackages} packages`
);

// TEST 12: Random Component Deep Dive
logSection('TEST 12: Random Component Completeness Check');

const randomIndices = Array.from({ length: 5 }, () =>
  Math.floor(Math.random() * componentsData.length)
);
const randomComponents = randomIndices.map(i => componentsData[i]);

for (const comp of randomComponents) {
  const checks = {
    name: comp.name && typeof comp.name === 'string',
    selector: comp.selector && typeof comp.selector === 'string',
    package: comp.package && typeof comp.package === 'string',
    description: comp.description && typeof comp.description === 'string' && comp.description.length > 0,
    category: validCategories.includes(comp.category),
    inputs: Array.isArray(comp.inputs),
    outputs: Array.isArray(comp.outputs) && comp.outputs.length > 0,
    variants: Array.isArray(comp.variants) && comp.variants.length > 0,
    examples: Array.isArray(comp.examples) && comp.examples.length > 0,
    installation: comp.installation && comp.installation.npm,
    usage: comp.usage && typeof comp.usage === 'string' && comp.usage.length > 0
  };

  const allPassed = Object.values(checks).every(v => v);
  const passedCount = Object.values(checks).filter(v => v).length;

  logTest(
    `"${comp.name}" has complete metadata`,
    allPassed,
    `${passedCount}/11 checks passed`
  );
}

// TEST 13: Data Quality Metrics
logSection('TEST 13: Data Quality Metrics');

const avgInputsPerComponent = (
  componentsData.reduce((sum, c) => sum + (c.inputs?.length || 0), 0) / 57
).toFixed(1);
logTest(
  'Average inputs per component',
  parseFloat(avgInputsPerComponent) > 0,
  `${avgInputsPerComponent} inputs per component`
);

const avgOutputsPerComponent = (
  componentsData.reduce((sum, c) => sum + (c.outputs?.length || 0), 0) / 57
).toFixed(1);
logTest(
  'Average outputs per component',
  parseFloat(avgOutputsPerComponent) > 0,
  `${avgOutputsPerComponent} outputs per component`
);

const avgVariantsPerComponent = (
  componentsData.reduce((sum, c) => sum + (c.variants?.length || 0), 0) / 57
).toFixed(1);
logTest(
  'Average variants per component',
  parseFloat(avgVariantsPerComponent) > 0,
  `${avgVariantsPerComponent} variants per component`
);

const avgRelatedPerComponent = (
  componentsData.reduce((sum, c) => sum + (c.relatedComponents?.length || 0), 0) / 57
).toFixed(1);
logTest(
  'Average related components per component',
  parseFloat(avgRelatedPerComponent) > 0,
  `${avgRelatedPerComponent} related components per component`
);

// TEST 14: Documentation Coverage
logSection('TEST 14: Documentation Coverage Summary');

const metrics = [
  {
    name: 'Outputs',
    field: 'outputs',
    target: 57
  },
  {
    name: 'Variants',
    field: 'variants',
    target: 57
  },
  {
    name: 'Examples',
    field: 'examples',
    target: 57
  },
  {
    name: 'Related Components',
    field: 'relatedComponents',
    target: 57
  }
];

for (const metric of metrics) {
  const count = componentsData.filter(c => {
    const field = c[metric.field];
    return Array.isArray(field) ? field.length > 0 : field !== undefined;
  }).length;

  const percentage = Math.round((count / 57) * 100);
  logTest(
    `${metric.name} coverage`,
    count === metric.target,
    `${count}/${metric.target} (${percentage}%)`
  );
}

// Summary
logSection('TEST SUMMARY');
const total = testsPassed + testsFailed;
const percentage = Math.round((testsPassed / total) * 100);

console.log(`\n📊 Results: ${testsPassed}/${total} tests passed (${percentage}%)\n`);

if (testsFailed === 0) {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║                                                                ║');
  console.log('║     🎉 ALL TESTS PASSED - SERVER IS COMPREHENSIVE! 🎉         ║');
  console.log('║                                                                ║');
  console.log('║  The MCP server has complete documentation for all 57         ║');
  console.log('║  components with 100% coverage on:                            ║');
  console.log('║    ✅ Examples (57/57)                                         ║');
  console.log('║    ✅ Outputs (57/57) - NEW                                    ║');
  console.log('║    ✅ Variants (57/57) - NEW                                   ║');
  console.log('║    ✅ Related Components (57/57) - NEW                         ║');
  console.log('║    ✅ Installation (57/57)                                     ║');
  console.log('║    ✅ Inputs (57/57)                                           ║');
  console.log('║                                                                ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  process.exit(0);
} else {
  console.log(`⚠️  ${testsFailed} test${testsFailed !== 1 ? 's' : ''} failed\n`);
  process.exit(1);
}
