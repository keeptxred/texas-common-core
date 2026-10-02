import { createFileRoute } from "@tanstack/react-router";

import { activeBrand } from "@/brand/active";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "The privacy framework for PetsDefined, including analytics, forms, affiliate links, cookies, and third-party services.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: buildMeta(activeBrand, { title: "Privacy", description }),
    links: [canonicalLink(activeBrand, "/privacy")],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Container className="max-w-4xl py-16 sm:py-24">
      <p className="eyebrow text-primary">Privacy</p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">Privacy Framework</h1>
      <p className="mt-5 text-sm font-medium text-primary">
        Pre-launch policy framework — finalize service-specific details before PetsDefined begins collecting production user data.
      </p>

      <div className="mt-10 space-y-9 text-base leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-display text-3xl text-foreground">Information collected</h2>
          <p className="mt-3">
            PetsDefined should collect only information needed to operate the site and features a visitor chooses to use. Depending on the services enabled at launch, this may include basic server logs, analytics events, search activity, newsletter information submitted by the visitor, and technical data used for security and performance.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-foreground">Analytics and cookies</h2>
          <p className="mt-3">
            Production analytics configuration has not yet been activated. Before launch, this section must name the analytics and consent services actually in use and describe the cookies or similar technologies they set. Services should not be listed merely because they were considered during development.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-foreground">Affiliate and external links</h2>
          <p className="mt-3">
            Links to merchants, insurers, travel providers, retailers, or other third parties may take visitors to services with their own privacy practices. PetsDefined does not control those third-party policies. Affiliate relationships are separately disclosed on the Affiliate Disclosure page.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-foreground">Data minimization</h2>
          <p className="mt-3">
            The site should avoid collecting sensitive personal information when it is not necessary for a feature. Pet tools should prefer calculations that can run without creating an account or storing personal data whenever practical.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-foreground">Changes before launch</h2>
          <p className="mt-3">
            This framework must be updated with the production operator contact, effective date, newsletter provider, analytics configuration, consent behavior, hosting details, and any state- or country-specific disclosures that apply once the final service stack is known.
          </p>
        </section>
      </div>
    </Container>
  );
}
