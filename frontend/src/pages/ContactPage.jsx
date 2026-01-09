import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="space-y-8" data-testid="contact-page">
      <header className="space-y-2" data-testid="contact-header">
        <h1 className="text-3xl font-semibold tracking-tight" data-testid="contact-title">
          Contact
        </h1>
        <p className="max-w-2xl text-white/70" data-testid="contact-subtitle">
          Contact form + dropdown (General Info / Media Inquiry / Support) + email workflow will be
          implemented in the next milestone.
        </p>
      </header>

      <Card className="rounded-2xl border-white/10 bg-white/5 p-6" data-testid="contact-form-placeholder">
        <div className="text-sm font-semibold" data-testid="contact-form-title">
          Contact workflow (next milestone)
        </div>
        <div className="mt-2 text-sm text-white/70" data-testid="contact-form-body">
          Submissions will email <span className="text-white">Neurusagi@gmail.com</span> with subject set to
          the selected reason.
        </div>
        <Button
          variant="secondary"
          className="mt-4 rounded-xl bg-white/10 text-white hover:bg-white/15"
          data-testid="contact-form-disabled-button"
          disabled
        >
          Email workflow coming next
        </Button>
      </Card>
    </div>
  );
}
