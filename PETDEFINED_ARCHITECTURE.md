# PetsDefined foundation

PetsDefined is the first non-Texas content brand built on the shared Defined platform.

## Editorial boundary

TexasDefined keeps pet content whose answer fundamentally depends on Texas: Texas parks, beaches, trails, heat, laws, adoption processes, destinations, events, and travel.

PetsDefined owns general pet authority content: breeds, species, care, training, behavior, nutrition, grooming, ownership, adoption guidance, comparisons, tools, products, and pet names.

The two properties should cross-link when useful. They should not duplicate articles or compete on the same primary search intent.

## Primary information architecture

- `/dogs`
- `/dogs/breeds`
- `/dogs/breeds/:slug`
- `/dogs/training`
- `/dogs/care`
- `/dogs/nutrition`
- `/cats`
- `/cats/breeds`
- `/cats/breeds/:slug`
- `/cats/behavior`
- `/cats/care`
- `/cats/nutrition`
- `/birds`
- `/birds/species/:slug`
- `/fish`
- `/fish/species/:slug`
- `/reptiles`
- `/reptiles/species/:slug`
- `/small-pets`
- `/horses`
- `/compare/:slug`
- `/guides/:slug`
- `/tools/:slug`
- `/pet-names/:slug`
- `/products/:slug`

## Quality rules

PetsDefined does not publish directory stubs. Breed and species pages must contain enough original, sourced information to answer a prospective owner's practical questions.

Publication checks live in `src/domain/pets/publicationGate.ts` and currently enforce:

- non-thin summaries
- descriptive hero alt text
- verified hero-image rights
- at least two sources
- core breed/species care fields
- meaningful fit/reconsider guidance
- meaningful health and habitat guidance
- minimum body depth for guides
- blocked awkward/generated title patterns

Supporting imagery is encouraged rather than treated as decoration. Breed/species records support a hero plus galleries with source, license, creator/credit, dimensions, captions, alt text, focal points, and rights-verification state.

## Monetization model

Affiliate recommendations are modular and optional. Editorial templates must not require commerce blocks.

Affiliate links carry explicit merchant, disclosure, and `sponsored nofollow` metadata. Initial monetizable areas include pet supplies, crates, beds, carriers, grooming, training gear, aquarium/habitat equipment, pet travel gear, and insurance/service explainers where appropriate.

## Backend strategy

Do not create a second paid Supabase project solely for PetsDefined at this stage.

All future shared-backend work should remain brand-scoped. PetsDefined data must never be confused with TexasDefined or KeepTXRed data. Any migration into the existing external Supabase project must be additive, reversible, reviewed, and RLS-aware.

## Domain-dependent work deferred

The following waits until `petsdefined.com` is registered and Cloudflare is available:

- DNS and SSL
- production canonical host activation
- Search Console/Bing verification
- branded email
- production analytics IDs
- production deployment mapping

The content architecture, components, validation, routes, fixtures, and SEO framework can be built before then.
