import fs from 'fs';

const content = fs.readFileSync('config/services.ts', 'utf-8');

const idMatches = content.match(/id: "([^"]+)"/g) || [];
const slugMatches = content.match(/slug: "([^"]+)"/g) || [];
const formConfigMatches = content.match(/formConfig: "([^"]+)"/g) || [];
const featuredMatches = content.match(/featured: true/g) || [];

console.log('--- VERIFICATION ---');
console.log('Total services (length):', idMatches.length, idMatches.length === 17 ? '✅' : '❌');
console.log('Featured services:', featuredMatches.length, featuredMatches.length === 8 ? '✅' : '❌');

const uniqueSlugs = new Set(slugMatches);
console.log('Unique slugs:', uniqueSlugs.size, uniqueSlugs.size === 17 ? '✅' : '❌');

const uniqueForms = new Set(formConfigMatches);
console.log('Unique formConfigs:', uniqueForms.size, uniqueForms.size === 17 ? '✅' : '❌');

if (idMatches.length === 17 && featuredMatches.length === 8 && uniqueSlugs.size === 17 && uniqueForms.size === 17) {
  console.log('SUCCESS: All data integrity checks passed!');
} else {
  console.log('FAILED: Data integrity mismatch.');
}
