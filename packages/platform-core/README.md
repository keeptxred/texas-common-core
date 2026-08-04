# Texas Platform Core

Framework-agnostic shared services for TexasDefined and KeepTXRed.

## Boundaries

This package may contain entity contracts, deterministic fingerprints, validation, promotion planning, source-governance primitives, analytics event contracts, SEO data builders, and calculator engines.

It must not contain React components, TanStack routes, Supabase clients, environment-variable reads, site branding, canonical hostnames, navigation, page copy, or deployment configuration.

## Current exports

- Texas entity contracts and canonicalization
- Deterministic FNV-1a fingerprints
- Entity-set diffing
- Quarantine checks
- Safe promotion previews

Consumers should provide their own storage, routing, UI, brand, and approval workflow.
