import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const YT_INVESTOR = "https://www.youtube.com/embed/rA8F70eRwRg";

export default function InvestorPage() {
  return (
    <div className="space-y-8" data-testid="investor-page">
      <header className="space-y-2" data-testid="investor-header">
        <h1 className="text-3xl font-semibold tracking-tight" data-testid="investor-title">
          Investor
        </h1>
        <p className="max-w-2xl text-white/70" data-testid="investor-subtitle">
          This page will include the investor outreach form + email workflow in the next milestone.
        </p>
      </header>

      <Card className="overflow-hidden rounded-2xl border-white/10 bg-black/40" data-testid="investor-video-card">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="text-xs font-medium text-white/70" data-testid="investor-video-label">
            NeurusAGi — Investor context
          </div>
          <a
            className="text-xs text-white/70 hover:text-white"
            href="https://www.youtube.com/watch?v=rA8F70eRwRg"
            target="_blank"
            rel="noreferrer"
            data-testid="investor-video-open"
          >
            Open on YouTube
          </a>
        </div>
        <div className="aspect-video" data-testid="investor-video-wrapper">
          <iframe
            className="h-full w-full"
            src={YT_INVESTOR}
            title="NeurusAGi investor video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            data-testid="investor-iframe"
          />
        </div>
      </Card>

      <Card className="rounded-2xl border-white/10 bg-white/5 p-6" data-testid="investor-form-placeholder">
        <div className="text-sm font-semibold" data-testid="investor-form-title">
          Investor outreach (next milestone)
        </div>
        <div className="mt-2 text-sm text-white/70" data-testid="investor-form-body">
          Form submission will generate an email to <span className="text-white">jt@neurusagi.com</span>
          with subject <span className="text-white">INVESTOR ALERT</span> marked urgent.
        </div>
        <Button
          variant="secondary"
          className="mt-4 rounded-xl bg-white/10 text-white hover:bg-white/15"
          data-testid="investor-form-disabled-button"
          disabled
        >
          Email workflow coming next
        </Button>
      </Card>
    </div>
  );
}
