import React, { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createWaitlistEntry } from "@/lib/api";

function sanitizeText(v) {
  if (typeof v !== "string") return "";
  return v
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, 160);
}

export default function WaitlistDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ kind: "idle", message: "" });

  const canSubmit = useMemo(() => {
    return sanitizeText(email).includes("@") && sanitizeText(country).length >= 2;
  }, [country, email]);

  const submit = async () => {
    setStatus({ kind: "loading", message: "Submitting..." });
    try {
      await createWaitlistEntry({
        name: sanitizeText(name),
        email: sanitizeText(email),
        city: sanitizeText(city),
        region: sanitizeText(region),
        country: sanitizeText(country),
      });
      setStatus({ kind: "success", message: "Added. You are on the waitlist." });
      setTimeout(() => setOpen(false), 900);
    } catch (e) {
      setStatus({ kind: "error", message: "Failed to submit. Try again." });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl" data-testid="waitlist-open-button">
          Join waitlist
        </Button>
      </DialogTrigger>

      <DialogContent className="border-white/10 bg-black/90 text-white" data-testid="waitlist-dialog">
        <DialogHeader>
          <DialogTitle data-testid="waitlist-title">Join the NeurusAGi waitlist</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3" data-testid="waitlist-form">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="h-11 rounded-xl border-white/10 bg-white/5 text-white"
            data-testid="waitlist-name-input"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-11 rounded-xl border-white/10 bg-white/5 text-white"
            data-testid="waitlist-email-input"
          />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="h-11 rounded-xl border-white/10 bg-white/5 text-white"
              data-testid="waitlist-city-input"
            />
            <Input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="State / Region"
              className="h-11 rounded-xl border-white/10 bg-white/5 text-white"
              data-testid="waitlist-region-input"
            />
          </div>
          <Input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            className="h-11 rounded-xl border-white/10 bg-white/5 text-white"
            data-testid="waitlist-country-input"
          />

          <div className="flex items-center justify-between gap-3" data-testid="waitlist-actions">
            <div className="text-xs text-white/60" data-testid="waitlist-status">
              {status.kind === "idle" ? "" : status.message}
            </div>
            <Button
              onClick={submit}
              disabled={!canSubmit || status.kind === "loading"}
              className="rounded-xl"
              data-testid="waitlist-submit-button"
            >
              {status.kind === "loading" ? "Submitting" : "Submit"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
