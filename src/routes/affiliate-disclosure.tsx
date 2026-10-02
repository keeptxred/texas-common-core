import { createFileRoute } from "@tanstack/react-router";

import { activeBrand } from "@/brand/active";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "How PetsDefined uses affiliate links and keeps commerce relationships separate from editorial judgment.";

export const Route = createFileRoute("/affiliate-disclosure")({
  head: () => ({
    meta: buildMeta(activeBrand, { title: "Affiliate Disclosure", description }),
    links: [canonicalLink(activeBrand, "/affiliate-disclosure")],
  }),
  component: AffiliateDisclosurePage,
});

function AffiliateDisclosurePage() {
  return (
    <Container className="max-w-4xl py-16 sm:py-24">
      <p className="eyebrow text-primary">Transparency</p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">Affiliate Disclosure</h1>
      <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>
          PetsDefined may earn a commission when a reader follows certain product or service links and completes a qualifying purchase or action. When a link is an affiliate relationship, the site should disclose that relationship clearly and mark the link appropriately.
        </p>
        <p>
          Affiliate compensation does not change the price a reader pays unless a merchant explicitly offers a promotion. Merchants, prices, availability, and program terms can change, so product pages should avoid implying that a price or offer is permanent.
        </p>
        <p>
          Editorial coverage is not conditional on an affiliate program existing. A product, service, breed, species, or care topic can be covered whether or not it can be monetized. Commerce modules are optional and should be removed when they do not improve the page.
        </p>
        <p>
          A recommendation should be based on the product's fit for the stated use case and the evidence available to support the recommendation. Sponsorship or affiliate status is not evidence that a product is better than alternatives.
        </p>
      </div>
    </Container>
  );
}
