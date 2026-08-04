import fs from 'node:fs';

const root = 'packages/platform-core';
const required = [
  `${root}/package.json`,
  `${root}/README.md`,
  `${root}/consumers.json`,
  `${root}/src/index.ts`,
  `${root}/src/contract.ts`,
  `${root}/src/entities.ts`,
  `${root}/src/fingerprint.ts`,
  `${root}/src/promotion.ts`,
];
const errors = [];
for (const path of required) if (!fs.existsSync(path)) errors.push(`Missing shared-core file: ${path}`);
if (!errors.length) {
  const packageJson = JSON.parse(fs.readFileSync(`${root}/package.json`, 'utf8'));
  const consumers = JSON.parse(fs.readFileSync(`${root}/consumers.json`, 'utf8'));
  const contract = fs.readFileSync(`${root}/src/contract.ts`, 'utf8');
  const combined = required.filter((path) => path.endsWith('.ts')).map((path) => fs.readFileSync(path, 'utf8')).join('\n');

  for (const forbidden of ['react', '@tanstack', 'supabase', 'process.env', 'import.meta.env', 'texasdefined.com', 'keeptxred.com']) {
    if (combined.toLowerCase().includes(forbidden)) errors.push(`Shared core contains forbidden site/framework dependency: ${forbidden}`);
  }
  for (const symbol of [
    'PLATFORM_CORE_CONTRACT', 'PlatformCoreConsumerManifest', 'validateConsumerManifest',
    'TexasEntityRecord', 'canonicalizeEntity', 'fingerprintEntities',
    'diffEntitySets', 'quarantineEntity', 'createPromotionPreview',
  ]) {
    if (!combined.includes(symbol)) errors.push(`Shared core export missing: ${symbol}`);
  }
  if (packageJson.version !== consumers.contractVersion) errors.push('Package version and consumer contract version differ.');
  if (!contract.includes(`packageVersion: '${packageJson.version}'`)) errors.push('Contract packageVersion does not match package.json.');
  if (!contract.includes(`apiVersion: '${consumers.apiVersion}'`)) errors.push('Contract apiVersion does not match consumers.json.');
  const registered = new Set(consumers.consumers.map((consumer) => consumer.consumer));
  for (const expected of ['TexasDefined', 'KeepTXRed']) if (!registered.has(expected)) errors.push(`Missing registered consumer: ${expected}`);
  for (const consumer of consumers.consumers) {
    if (!consumer.repository?.startsWith('keeptxred/')) errors.push(`Invalid consumer repository: ${consumer.consumer}`);
    if (!consumer.capabilities?.length) errors.push(`Consumer has no capabilities: ${consumer.consumer}`);
    if (!consumer.excludedDomains?.length) errors.push(`Consumer has no excluded domains: ${consumer.consumer}`);
  }
}
if (errors.length) {
  console.error('Texas platform core validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Texas platform core contract, consumers, boundaries, and exports are valid.');
