import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const reports = [
  {
    id: "mega-1",
    title: "NeurusAGi Technical Mega-Report - Part 1",
    path: "/reports/mega-report-part-1.md",
  },
  {
    id: "mega-2",
    title: "NeurusAGi Technical Mega-Report - Part 2",
    path: "/reports/mega-report-part-2.md",
  },
  {
    id: "mega-3",
    title: "NeurusAGi Technical Mega-Report - Part 3",
    path: "/reports/mega-report-part-3.md",
  },
  {
    id: "mega-4",
    title: "NeurusAGi Technical Mega-Report - Part 4",
    path: "/reports/mega-report-part-4.md",
  },
  {
    id: "mega-5",
    title: "NeurusAGi Technical Mega-Report - Part 5",
    path: "/reports/mega-report-part-5.md",
  },
  {
    id: "mmlu",
    title: "MMLU Benchmarking and Architectural Paradigm",
    path: "/reports/mmlu-benchmarking.md",
  },
];

export default function ReportShowcase() {
  const [activeId, setActiveId] = useState(reports[0].id);
  const [md, setMd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const active = useMemo(() => reports.find((r) => r.id === activeId) ?? reports[0], [activeId]);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(active.path);
        const text = await res.text();
        if (!isMounted) return;
        setMd(text);
      } catch (e) {
        if (!isMounted) return;
        setError("Failed to load report");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [active]);

  return (
    <Card className="rounded-3xl border-white/10 bg-white/5 p-5" data-testid="report-showcase">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1" data-testid="report-showcase-header">
          <div className="text-xs font-medium tracking-wide text-white/60" data-testid="report-showcase-kicker">
            Technical reporting
          </div>
          <div className="text-lg font-semibold" data-testid="report-showcase-title">
            {active.title}
          </div>
        </div>

        <div className="flex flex-wrap gap-2" data-testid="report-showcase-tabs">
          {reports.map((r) => (
            <Button
              key={r.id}
              variant="secondary"
              onClick={() => setActiveId(r.id)}
              className={cn(
                "h-9 rounded-xl border border-white/10 bg-white/5 text-xs text-white hover:bg-white/10",
                r.id === activeId ? "shadow-[0_0_0_1px_rgba(0,122,122,0.35)]" : "opacity-80",
              )}
              style={r.id === activeId ? { background: "rgba(0,122,122,0.12)" } : undefined}
              data-testid={`report-tab-${r.id}`}
            >
              {r.id === "mmlu" ? "MMLU" : `Part ${r.id.split("-")[1]}` }
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-5" data-testid="report-showcase-body">
        <div className="lg:col-span-2" data-testid="report-showcase-graphs">
          <div className="grid gap-3">
            {["/neurusagi_compute_graph_v3.png", "/neurusagi_evolution_dynamics.png", "/neurusagi_zeroshot_discovery2.png"].map(
              (src, idx) => (
                <Card
                  key={src}
                  className="overflow-hidden rounded-2xl border-white/10 bg-black/30"
                  data-testid={`report-graph-card-${idx}`}
                >
                  <img
                    src={src}
                    alt={`NeurusAGi graph ${idx + 1}`}
                    className="w-full"
                    data-testid={`report-graph-image-${idx}`}
                  />
                </Card>
              ),
            )}
          </div>
          <div className="mt-3 text-xs text-white/60" data-testid="report-graph-note">
            Graphs are surfaced here. Full reports are scrollable on the right.
          </div>
        </div>

        <div className="lg:col-span-3" data-testid="report-showcase-markdown">
          <div
            className="max-h-[520px] overflow-auto rounded-2xl border border-white/10 bg-black/20 p-4"
            data-testid="report-markdown-scroll"
          >
            {loading ? (
              <div className="text-sm text-white/70" data-testid="report-loading">
                Loading...
              </div>
            ) : null}
            {error ? (
              <div className="text-sm text-red-200" data-testid="report-error">
                {error}
              </div>
            ) : null}

            {!loading && !error ? (
              <div className="prose prose-invert max-w-none prose-p:text-white/80" data-testid="report-markdown">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
