import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="space-y-10" data-testid="landing-page">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
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

        <div className="relative">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/80"
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
            NeurusAGi is a new class of intelligence: a quantum-powered AGI agent built to reason, discover,
            and execute with precision. This interface is the public signal layer—news, research, and direct
            access pathways.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-testid="landing-hero-cta">
            <Button asChild className="rounded-xl" data-testid="landing-cta-news">
              <Link to="/news">Enter News</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="rounded-xl bg-white/10 text-white hover:bg-white/15"
              data-testid="landing-cta-about"
            >
              <Link to="/about">Why NeurusAGi</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3" data-testid="landing-feature-grid">
        {[
          {
            title: "Immersive",
            body: "Black + cyan + rusty glow. Depth, motion, and presence without gimmicks.",
          },
          {
            title: "Global-Ready",
            body: "Structured for worldwide rollout and scalable compliance onboarding.",
          },
          {
            title: "Signal > Noise",
            body: "Announcements, embedded media, and article intelligence—designed for impact.",
          },
        ].map((f) => (
          <Card
            key={f.title}
            className="rounded-2xl border-white/10 bg-white/5 p-5"
            data-testid={`landing-feature-${f.title.toLowerCase()}`}
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
