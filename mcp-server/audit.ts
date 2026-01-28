import { componentsData } from './components-data.js';

console.log('=== COMPONENT AUDIT REPORT ===\n');
console.log('Total Components:', componentsData.length);
console.log('');

// Group by category
const byCategory = componentsData.reduce((acc: any, c: any) => {
  acc[c.category] = (acc[c.category] || 0) + 1;
  return acc;
}, {});

console.log('Components by Category:');
Object.entries(byCategory).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});
console.log('');

// Check completeness
const withExamples = componentsData.filter(c => c.examples && c.examples.length > 0);
const withVariants = componentsData.filter(c => c.variants && c.variants.length > 0);
const withInputs = componentsData.filter(c => c.inputs && c.inputs.length > 0);
const withOutputs = componentsData.filter(c => c.outputs && c.outputs.length > 0);
const withRelated = componentsData.filter(c => c.relatedComponents && c.relatedComponents.length > 0);

console.log('Data Completeness:');
console.log(`  Components with Examples: ${withExamples.length} / ${componentsData.length} (${Math.round(withExamples.length/componentsData.length*100)}%)`);
console.log(`  Components with Variants: ${withVariants.length} / ${componentsData.length} (${Math.round(withVariants.length/componentsData.length*100)}%)`);
console.log(`  Components with Inputs: ${withInputs.length} / ${componentsData.length} (${Math.round(withInputs.length/componentsData.length*100)}%)`);
console.log(`  Components with Outputs: ${withOutputs.length} / ${componentsData.length} (${Math.round(withOutputs.length/componentsData.length*100)}%)`);
console.log(`  Components with Related: ${withRelated.length} / ${componentsData.length} (${Math.round(withRelated.length/componentsData.length*100)}%)`);
console.log('');

// Missing examples
const missingExamples = componentsData.filter(c => !c.examples || c.examples.length === 0);
console.log(`\n❌ ${missingExamples.length} Components Missing Examples:`);
missingExamples.forEach(c => console.log(`  - ${c.name}`));

// Components with examples
console.log(`\n✅ ${withExamples.length} Components With Examples:`);
withExamples.forEach(c => console.log(`  - ${c.name} (${c.examples.length} examples)`));

// Check for missing inputs
const missingInputs = componentsData.filter(c => !c.inputs || c.inputs.length === 0);
console.log(`\n⚠️  ${missingInputs.length} Components Without Inputs:`);
missingInputs.forEach(c => console.log(`  - ${c.name}`));

// Installation validation
const missingNgAdd = componentsData.filter(c => !c.installation?.ngAdd);
console.log(`\n⚠️  ${missingNgAdd.length} Components Missing ng add command:`, missingNgAdd.map(c => c.name));

// All components have proper installation methods
const allHaveInstall = componentsData.every(c => c.installation && c.installation.npm && c.installation.pnpm && c.installation.yarn && c.installation.bun && c.installation.ngAdd);
console.log(`\n✅ All components have complete installation methods:`, allHaveInstall);

console.log('\n=== END AUDIT REPORT ===');
