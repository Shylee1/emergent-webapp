import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="space-y-4" data-testid="not-found-page">
      <h1 className="text-2xl font-semibold" data-testid="not-found-title">
        Page not found
      </h1>
      <p className="text-sm text-white/70" data-testid="not-found-subtitle">
        The route you requested doesn’t exist.
      </p>
      <Button asChild className="rounded-xl" data-testid="not-found-home-cta">
        <Link to="/">Go home</Link>
      </Button>
    </div>
  );
}
