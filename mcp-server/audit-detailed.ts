import { componentsData } from './components-data.js';

// Components missing variants
const withVariants = componentsData.filter((c) => c.variants && c.variants.length > 0);
const missingVariants = componentsData.filter((c) => !c.variants || c.variants.length === 0);

console.log('=== COMPONENTS WITH VARIANTS (' + withVariants.length + ') ===');
withVariants.forEach((c) => console.log('  ✅', c.name));

console.log('\n=== COMPONENTS MISSING VARIANTS (' + missingVariants.length + ') ===');
missingVariants.forEach((c) => console.log('  -', c.name, '(' + c.category + ')'));

// Components missing outputs
const withOutputs = componentsData.filter((c) => c.outputs && c.outputs.length > 0);
const missingOutputs = componentsData.filter((c) => !c.outputs || c.outputs.length === 0);

console.log('\n=== COMPONENTS WITH OUTPUTS (' + withOutputs.length + ') ===');
withOutputs.forEach((c) => console.log('  ✅', c.name));

console.log('\n=== COMPONENTS MISSING OUTPUTS (' + missingOutputs.length + ') ===');
missingOutputs.forEach((c) => console.log('  -', c.name, '(' + c.category + ')'));

// Missing related
const missingRelated = componentsData.filter(
  (c) => !c.relatedComponents || c.relatedComponents.length === 0,
);
console.log('\n=== COMPONENTS MISSING RELATED (' + missingRelated.length + ') ===');
missingRelated.forEach((c) => console.log('  -', c.name));
