import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Observer",
    price: "$0",
    tagline: "Read-only access to the public signal stream.",
    highlight: false,
  },
  {
    name: "Initiate",
    price: "$9",
    tagline: "Premium news feed + saved articles.",
    highlight: false,
  },
  {
    name: "Catalyst",
    price: "$29",
    tagline: "Expanded research panels + media collections.",
    highlight: true,
  },
  {
    name: "Architect",
    price: "$79",
    tagline: "Compliance onboarding + personalized experience layers.",
    highlight: false,
  },
  {
    name: "Operator",
    price: "$199",
    tagline: "Advanced features for teams and organizations.",
    highlight: false,
  },
  {
    name: "Executive",
    price: "$499",
    tagline: "Admin dashboards + privileged controls (invite-only).",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-8" data-testid="pricing-page">
      <header className="space-y-2" data-testid="pricing-header">
        <h1 className="text-3xl font-semibold tracking-tight" data-testid="pricing-title">
          Pricing
        </h1>
        <p className="max-w-2xl text-white/70" data-testid="pricing-subtitle">
          Six subscription tiers. Checkout + billing integration will be implemented in a later milestone.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid="pricing-grid">
        {tiers.map((t) => (
          <Card
            key={t.name}
            className={
              t.highlight
                ? "relative overflow-hidden rounded-3xl border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(0,122,122,0.25)]"
                : "rounded-3xl border-white/10 bg-white/5 p-6"
            }
            data-testid={`pricing-tier-${t.name.toLowerCase()}`}
          >
            {t.highlight ? (
              <div
                className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl"
                style={{ background: "rgba(0,122,122,0.18)" }}
                data-testid="pricing-tier-highlight-glow"
              />
            ) : null}

            <div className="relative">
              <div className="text-sm font-semibold" data-testid="pricing-tier-name">
                {t.name}
              </div>
              <div className="mt-2 flex items-baseline gap-2" data-testid="pricing-tier-price">
                <div className="text-3xl font-semibold">{t.price}</div>
                <div className="text-xs text-white/60">/ month</div>
              </div>
              <div className="mt-3 text-sm text-white/70" data-testid="pricing-tier-tagline">
                {t.tagline}
              </div>
              <Button
                variant={t.highlight ? "default" : "secondary"}
                className={
                  t.highlight
                    ? "mt-5 w-full rounded-xl"
                    : "mt-5 w-full rounded-xl bg-white/10 text-white hover:bg-white/15"
                }
                data-testid={`pricing-tier-cta-${t.name.toLowerCase()}`}
              >
                Choose {t.name}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border-white/10 bg-black/30 p-5" data-testid="pricing-note">
        <div className="text-xs text-white/70" data-testid="pricing-note-text">
          Note: This is a UI/UX build step. Payments will be connected once the full onboarding + compliance
          system is complete.
        </div>
      </Card>
    </div>
  );
}
