import fs from 'node:fs';

const root = 'packages/platform-core';
const required = [
  `${root}/package.json`, `${root}/README.md`, `${root}/consumers.json`, `${root}/release.json`,
  `${root}/src/index.ts`, `${root}/src/contract.ts`, `${root}/src/content-intelligence.ts`,
  `${root}/src/publication-gate.ts`, `${root}/src/entities.ts`, `${root}/src/fingerprint.ts`, `${root}/src/promotion.ts`,
];
const errors = [];
for (const path of required) if (!fs.existsSync(path)) errors.push(`Missing shared-core file: ${path}`);
if (!errors.length) {
  const packageJson = JSON.parse(fs.readFileSync(`${root}/package.json`, 'utf8'));
  const consumers = JSON.parse(fs.readFileSync(`${root}/consumers.json`, 'utf8'));
  const release = JSON.parse(fs.readFileSync(`${root}/release.json`, 'utf8'));
  const contract = fs.readFileSync(`${root}/src/contract.ts`, 'utf8');
  const contentIntelligence = fs.readFileSync(`${root}/src/content-intelligence.ts`, 'utf8');
  const publicationGate = fs.readFileSync(`${root}/src/publication-gate.ts`, 'utf8');
  const allTypeScript = required.filter((path) => path.endsWith('.ts')).map((path) => fs.readFileSync(path, 'utf8')).join('\n');
  const implementation = [
    `${root}/src/content-intelligence.ts`, `${root}/src/publication-gate.ts`, `${root}/src/entities.ts`,
    `${root}/src/fingerprint.ts`, `${root}/src/promotion.ts`,
  ].map((path) => fs.readFileSync(path, 'utf8')).join('\n');

  for (const forbidden of ['react', '@tanstack', '@supabase', 'process.env', 'import.meta.env', 'texasdefined.com', 'keeptxred.com']) {
    if (implementation.toLowerCase().includes(forbidden)) errors.push(`Shared core implementation contains forbidden site/framework dependency: ${forbidden}`);
    if (!contract.toLowerCase().includes(`'${forbidden}'`)) errors.push(`Contract prohibition list is missing: ${forbidden}`);
  }
  for (const symbol of [
    'PLATFORM_CORE_CONTRACT', 'PlatformCoreConsumerManifest', 'validateConsumerManifest',
    'CONTENT_OWNERSHIP_RULES', 'ownershipRuleFor', 'decideCrossSiteContent', 'validateContentOwnershipRules',
    'PublicationOverride', 'fingerprintContentDecision', 'createPublicationOverride',
    'validatePublicationOverride', 'enforcePublicationDecision',
    'TexasEntityRecord', 'canonicalizeEntity', 'fingerprintEntities',
    'diffEntitySets', 'quarantineEntity', 'createPromotionPreview',
  ]) if (!allTypeScript.includes(symbol)) errors.push(`Shared core export missing: ${symbol}`);

  for (const domain of [
    'travel', 'food', 'events', 'history', 'moving', 'home-garden', 'real-estate', 'property-tax',
    'shopping', 'texas-culture', 'politics', 'elections', 'legislation', 'breaking-news', 'government-accountability',
  ]) if (!contentIntelligence.includes(`rule('${domain}'`)) errors.push(`Missing canonical content owner for ${domain}.`);

  for (const behavior of [
    'reject-duplicate', 'cross-link-only', 'publish-derivative-with-canonical-reference',
    'contentFingerprint === candidate.sourceFingerprint', 'fullRepublicationAllowed: false',
  ]) if (!contentIntelligence.includes(behavior)) errors.push(`Phase 5 content safeguard missing: ${behavior}`);

  for (const safeguard of [
    "decision.disposition === 'reject-duplicate'", "decision.disposition === 'cross-link-only'",
    "status: 'blocked'", "status: 'override-required'", 'decisionFingerprint',
    'Override reason must contain at least 20 characters.', 'Override is expired.', 'Override token is invalid.',
  ]) if (!publicationGate.includes(safeguard)) errors.push(`Publication gate safeguard missing: ${safeguard}`);

  if (packageJson.version !== consumers.contractVersion) errors.push('Package version and consumer contract version differ.');
  if (packageJson.version !== release.version) errors.push('Package version and release version differ.');
  if (consumers.apiVersion !== release.apiVersion) errors.push('Consumer and release API versions differ.');
  if (!/^[0-9a-f]{40}$/.test(release.commit)) errors.push('Release commit must be a full SHA.');
  if (!contract.includes(`packageVersion: '${packageJson.version}'`)) errors.push('Contract packageVersion does not match package.json.');
  if (!contract.includes(`apiVersion: '${consumers.apiVersion}'`)) errors.push('Contract apiVersion does not match consumers.json.');
  const registered = new Set(consumers.consumers.map((consumer) => consumer.consumer));
  for (const expected of ['TexasDefined', 'KeepTXRed']) {
    if (!registered.has(expected)) errors.push(`Missing registered consumer: ${expected}`);
    if (!release.consumers.includes(expected)) errors.push(`Release manifest missing consumer: ${expected}`);
  }
  for (const capability of release.capabilities) if (!contract.includes(`'${capability}'`)) errors.push(`Release capability missing from contract: ${capability}`);
  for (const consumer of consumers.consumers) {
    if (!consumer.repository?.startsWith('keeptxred/')) errors.push(`Invalid consumer repository: ${consumer.consumer}`);
    if (!consumer.capabilities?.length) errors.push(`Consumer has no capabilities: ${consumer.consumer}`);
    if (!consumer.excludedDomains?.length) errors.push(`Consumer has no excluded domains: ${consumer.consumer}`);
    for (const capability of consumer.capabilities) if (!release.capabilities.includes(capability)) errors.push(`Consumer ${consumer.consumer} uses unreleased capability: ${capability}`);
    for (const capability of consumer.plannedCapabilities ?? []) if (!release.capabilities.includes(capability)) errors.push(`Consumer ${consumer.consumer} plans an unreleased capability: ${capability}`);
  }
}
if (errors.length) {
  console.error('Texas platform core validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Texas platform core publication gates, ownership, duplicate prevention, release, consumers, boundaries, and exports are valid.');
