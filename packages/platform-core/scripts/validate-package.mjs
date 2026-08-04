import fs from 'node:fs';

const root = 'packages/platform-core';
const required = [
  `${root}/package.json`,
  `${root}/README.md`,
  `${root}/src/index.ts`,
  `${root}/src/entities.ts`,
  `${root}/src/fingerprint.ts`,
  `${root}/src/promotion.ts`,
];
const errors = [];
for (const path of required) if (!fs.existsSync(path)) errors.push(`Missing shared-core file: ${path}`);
if (!errors.length) {
  const combined = required.filter((path) => path.endsWith('.ts')).map((path) => fs.readFileSync(path, 'utf8')).join('\n');
  for (const forbidden of ['react', '@tanstack', 'supabase', 'import.meta.env', 'texasdefined.com', 'keeptxred.com']) {
    if (combined.toLowerCase().includes(forbidden)) errors.push(`Shared core contains forbidden site/framework dependency: ${forbidden}`);
  }
  for (const symbol of ['TexasEntityRecord', 'canonicalizeEntity', 'fingerprintEntities', 'diffEntitySets', 'quarantineEntity', 'createPromotionPreview']) {
    if (!combined.includes(symbol)) errors.push(`Shared core export missing: ${symbol}`);
  }
}
if (errors.length) {
  console.error('Texas platform core validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Texas platform core package boundaries and exports are valid.');
