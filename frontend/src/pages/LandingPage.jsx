import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="space-y-10" data-testid="landing-page">
      <section
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12"
        data-testid="landing-hero"
      >
        <div className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(circle_at_40%_10%,black,transparent_60%)]">
          <div
            className="absolute -top-24 left-10 h-56 w-56 rounded-full blur-3xl"
            style={{ background: "rgba(0,122,122,0.28)" }}
          />
          <div
            className="absolute -bottom-24 right-10 h-56 w-56 rounded-full blur-3xl"
            style={{ background: "rgba(193,154,59,0.18)" }}
          />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-5" data-testid="landing-hero-grid">
          <div className="lg:col-span-3" data-testid="landing-hero-left">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs text-white/80"
              data-testid="landing-badge"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "#007A7A", boxShadow: "0 0 18px rgba(0,122,122,0.95)" }}
                data-testid="landing-badge-dot"
              />
              NeurusAGi is artificial general intelligence.
            </div>

            <h1
              className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl"
              data-testid="landing-hero-title"
            >
              A quantum leap in intelligence.
            </h1>

            <p
              className="mt-4 max-w-2xl text-pretty text-base text-white/70 md:text-lg"
              data-testid="landing-hero-subtitle"
            >
              NeurusAGi is a quantum-powered AGI agent built to reason, discover, and execute with precision.
              Subscribe for access. This site is the public signal layer.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-testid="landing-hero-cta">
              <Button asChild className="rounded-xl" data-testid="landing-cta-news">
                <Link to="/news">Open News</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="rounded-xl bg-white/10 text-white hover:bg-white/15"
                data-testid="landing-cta-about"
              >
                <Link to="/about">Read the thesis</Link>
              </Button>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3" data-testid="landing-hero-metrics">
              {[
                { k: "Capability", v: "Reasoning + execution" },
                { k: "Scope", v: "Every industry" },
                { k: "Access", v: "Subscription" },
              ].map((x) => (
                <Card
                  key={x.k}
                  className="rounded-2xl border-white/10 bg-black/30 p-4"
                  data-testid={`landing-metric-${x.k.toLowerCase()}`}
                >
                  <div className="text-[11px] text-white/60" data-testid="landing-metric-key">
                    {x.k}
                  </div>
                  <div className="mt-1 text-sm font-semibold" data-testid="landing-metric-value">
                    {x.v}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2" data-testid="landing-hero-right">
            <div
              className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40"
              data-testid="landing-hero-orb-card"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(0,122,122,0.22), transparent 55%), radial-gradient(circle at 70% 60%, rgba(193,154,59,0.16), transparent 58%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), transparent 55%)",
                }}
              />
              <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="absolute inset-0 flex items-end p-5">
                <div className="space-y-1">
                  <div className="text-xs text-white/60" data-testid="landing-hero-orb-kicker">
                    NeurusAGi
                  </div>
                  <div className="text-sm font-semibold" data-testid="landing-hero-orb-title">
                    Signal layer
                  </div>
                  <div className="text-xs text-white/60" data-testid="landing-hero-orb-subtitle">
                    Reports, graphs, and verified drops
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4" data-testid="landing-reports-section">
        <div className="flex items-end justify-between gap-3" data-testid="landing-reports-header">
          <h2 className="text-2xl font-semibold tracking-tight" data-testid="landing-reports-title">
            Technical reporting
          </h2>
          <div className="text-xs text-white/60" data-testid="landing-reports-subtitle">
            Reports + graphs showcased for credibility and depth
          </div>
        </div>

        {/* High-effort report showcase */}
        <div data-testid="landing-reports-showcase-wrapper">
          {/* Lazy-loaded component to keep landing fast */}
          {(() => {
            // eslint-disable-next-line global-require
            const ReportShowcase = require("@/components/ReportShowcase").default;
            return <ReportShowcase />;
          })()}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3" data-testid="landing-feature-grid">
        {[
          {
            title: "True cognition",
            body: "Reasoning, memory, task execution, and discovery - not a chatbot.",
          },
          {
            title: "Portable + secure",
            body: "Designed to avoid the centralized scaling trap and fragile dependencies.",
          },
          {
            title: "Enterprise impact",
            body: "Penetrates every industry and every consumer use case - total market penetration.",
          },
        ].map((f) => (
          <Card
            key={f.title}
            className="rounded-2xl border-white/10 bg-white/5 p-5"
            data-testid={`landing-feature-${f.title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="text-sm font-semibold text-white" data-testid="landing-feature-title">
              {f.title}
            </div>
            <div className="mt-2 text-sm text-white/70" data-testid="landing-feature-body">
              {f.body}
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
