import React from "react";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="space-y-6" data-testid="about-page">
      <header className="space-y-2" data-testid="about-header">
        <h1 className="text-3xl font-semibold tracking-tight" data-testid="about-title">
          About NeurusAGi
        </h1>
        <p className="max-w-2xl text-white/70" data-testid="about-subtitle">
          NeurusAGi is a platform built to communicate the scale of AGI and unify news, media, and
          structured updates into one immersive experience.
        </p>
      </header>

      <Card className="rounded-2xl border-white/10 bg-white/5 p-6" data-testid="about-card">
        <div className="space-y-4 text-sm leading-relaxed text-white/75" data-testid="about-body">
          <p>
            This experience is designed around a simple idea: when AGI is real, the interface should feel
            real. Depth, motion, and precision.
          </p>
          <p>
            The roadmap includes worldwide onboarding with regional compliance adjustments, input
            sanitization for standard users, and an executive interface that stays unrestricted.
          </p>
          <p>
            For now, the News page is the primary surface. It showcases major announcements, embedded
            media, and a dual-marquee article selector engineered to feel alive.
          </p>
        </div>
      </Card>
    </div>
  );
}
