export type TexasPlatformSite = 'TexasDefined' | 'KeepTXRed';

export type PlatformDomain =
  | 'explore'
  | 'travel'
  | 'food'
  | 'events'
  | 'history'
  | 'moving'
  | 'home-garden'
  | 'real-estate'
  | 'property-tax'
  | 'county-city-directories'
  | 'shopping'
  | 'texas-culture'
  | 'politics'
  | 'elections'
  | 'legislation'
  | 'breaking-news'
  | 'government-accountability';

export const SITE_DOMAIN_OWNERSHIP: Record<PlatformDomain, TexasPlatformSite> = {
  explore: 'TexasDefined',
  travel: 'TexasDefined',
  food: 'TexasDefined',
  events: 'TexasDefined',
  history: 'TexasDefined',
  moving: 'TexasDefined',
  'home-garden': 'TexasDefined',
  'real-estate': 'TexasDefined',
  'property-tax': 'TexasDefined',
  'county-city-directories': 'TexasDefined',
  shopping: 'TexasDefined',
  'texas-culture': 'TexasDefined',
  politics: 'KeepTXRed',
  elections: 'KeepTXRed',
  legislation: 'KeepTXRed',
  'breaking-news': 'KeepTXRed',
  'government-accountability': 'KeepTXRed',
};

export const BACKEND_SEPARATION_POLICY = {
  mode: 'independent-backends',
  sharedDatabaseRequired: false,
  sharedCodeAllowed: true,
  crossSiteDatabaseWritesAllowed: false,
  crossSiteDatabaseReadsAllowed: false,
  productionDataDeletionBeforeCutoverAllowed: false,
} as const;

export function ownerForDomain(domain: PlatformDomain) {
  return SITE_DOMAIN_OWNERSHIP[domain];
}

export function validateSiteOwnership() {
  const errors: string[] = [];
  const domains = Object.keys(SITE_DOMAIN_OWNERSHIP) as PlatformDomain[];
  for (const domain of domains) {
    const owner = SITE_DOMAIN_OWNERSHIP[domain];
    if (owner !== 'TexasDefined' && owner !== 'KeepTXRed') errors.push(`Invalid owner for ${domain}.`);
  }
  if (BACKEND_SEPARATION_POLICY.sharedDatabaseRequired) errors.push('Shared production database must remain disabled.');
  if (BACKEND_SEPARATION_POLICY.crossSiteDatabaseWritesAllowed) errors.push('Cross-site database writes must remain disabled.');
  if (BACKEND_SEPARATION_POLICY.crossSiteDatabaseReadsAllowed) errors.push('Cross-site database reads must remain disabled.');
  return { valid: errors.length === 0, errors };
}
