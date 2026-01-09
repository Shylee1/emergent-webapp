import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MarqueeRail from "@/components/MarqueeRail";
import articles from "@/data/articles.json";

const YT_NEWS = "https://www.youtube.com/embed/NdvjA5NLREE";

function scoreMatch(haystack, needle) {
  if (!needle) return 1;
  const n = needle.toLowerCase().trim();
  if (!n) return 1;
  const h = haystack.toLowerCase();
  if (h.includes(n)) return 3;
  // weak match: all tokens present
  const tokens = n.split(/\s+/).filter(Boolean);
  const hits = tokens.filter((t) => h.includes(t)).length;
  return hits / Math.max(tokens.length, 1);
}

export default function NewsPage() {
  const [query, setQuery] = useState("");
  const defaultSelected = useMemo(() => {
    const base = Array.isArray(articles) ? articles : [];
    // Auto-expand the “Leading the race to AGI” article if present.
    const preferred = base.find((a) => String(a.title || "").toLowerCase().includes("leading the race"));
    return preferred ?? base[0] ?? null;
  }, []);

  const [selected, setSelected] = useState(() => defaultSelected);
  // (Graphs are moving to Home; no tabs needed here.)

  const curated = useMemo(() => {
    // For now: show all articles we have (skip #17/#21 because you explicitly marked them “skip”).
    return Array.isArray(articles) ? articles : [];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return curated;

    return [...curated]
      .map((a) => {
        const hay = `${a.title}\n${a.first_paragraph}\n${a.full_content}`;
        return { a, s: scoreMatch(hay, q) };
      })
      .filter((x) => x.s > 0)
      .sort((x, y) => y.s - x.s)
      .map((x) => x.a);
  }, [curated, query]);

  const topRail = filtered;
  const bottomRail = filtered;

  return (
    <div className="space-y-10" data-testid="news-page">
      {/* TOP: Big announcements */}
      <section
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
        data-testid="news-announcements-section"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 18% 22%, rgba(0,122,122,0.20), transparent 45%), radial-gradient(circle at 85% 30%, rgba(193,154,59,0.14), transparent 48%)",
          }}
        />

        <div className="relative grid gap-6 lg:grid-cols-5" data-testid="news-announcements-grid">
          <div className="lg:col-span-2" data-testid="news-announcements-copy">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/75"
              data-testid="news-announcements-badge"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: "#007A7A",
                  boxShadow: "0 0 18px rgba(0,122,122,0.95)",
                }}
                data-testid="news-announcements-badge-dot"
              />
              Big Announcements
            </div>
            <h1
              className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl"
              data-testid="news-title"
            >
              The NeurusAGi Signal Stream
            </h1>
            <p className="mt-3 text-sm text-white/70" data-testid="news-subtitle">
              Major announcements, one featured video, and the dual-marquee selector. Search between rails,
              pick an article, and expand it instantly.
            </p>

            <div className="mt-5 space-y-3" data-testid="news-announcement-cards">
              {[
                {
                  title: "Major announcement",
                  body: "Primary updates and milestone drops.",
                },
                {
                  title: "Featured video",
                  body: "Single embed only (per your spec).",
                },
                {
                  title: "Article selection",
                  body: "Choose from either marquee and read in the center panel.",
                },
              ].map((x) => (
                <Card
                  key={x.title}
                  className="rounded-2xl border-white/10 bg-black/30 p-4"
                  data-testid={`news-announcement-card-${x.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="text-sm font-semibold" data-testid="news-announcement-card-title">
                    {x.title}
                  </div>
                  <div className="mt-1 text-xs text-white/65" data-testid="news-announcement-card-body">
                    {x.body}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3" data-testid="news-announcements-media">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="text-xs font-medium text-white/70" data-testid="news-announcements-video-label">
                  Featured Announcement
                </div>
                <a
                  className="text-xs text-white/70 hover:text-white"
                  href="https://www.youtube.com/watch?v=NdvjA5NLREE"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="news-announcements-video-open"
                >
                  Open on YouTube
                </a>
              </div>
              <div className="aspect-video" data-testid="news-announcements-video-wrapper">
                <iframe
                  className="h-full w-full"
                  src={YT_NEWS}
                  title="NeurusAGi announcement"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  data-testid="news-announcements-iframe"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual marquee + search + expansion (article expands BETWEEN the marquees) */}
      <section className="space-y-6" data-testid="news-marquee-section">
        <MarqueeRail
          railId="top"
          items={topRail}
          direction={1}
          initialSpeed={70}
          selectedSlug={selected?.slug}
          onCardClickScrollTo={() => {
            document.querySelector('[data-testid="news-center-panel"]')?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          onSelect={(a) => setSelected(a)}
        />

        <Card
          className="relative overflow-hidden rounded-3xl border-white/10 bg-white/5 p-5"
          data-testid="news-center-panel"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(0,122,122,0.14), transparent 45%), radial-gradient(circle at 80% 70%, rgba(193,154,59,0.10), transparent 50%)",
            }}
          />

          <div className="relative space-y-4" data-testid="news-center-panel-inner">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1" data-testid="news-search-bar">
                <div className="flex items-center gap-2">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search titles + content..."
                    className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/40"
                    data-testid="news-search-input"
                  />
                  <Button
                    variant="secondary"
                    className="h-11 rounded-xl bg-white/10 text-white hover:bg-white/15"
                    onClick={() => setQuery("")}
                    data-testid="news-search-clear"
                  >
                    Clear
                  </Button>
                </div>
                <div className="mt-2 text-xs text-white/60" data-testid="news-search-meta">
                  Showing <span className="text-white/80">{filtered.length}</span> articles
                </div>
              </div>

              <div className="flex flex-wrap gap-2" data-testid="news-expanded-actions">
                <Button
                  variant="secondary"
                  className="h-11 rounded-xl bg-white/10 text-white hover:bg-white/15"
                  onClick={() => {
                    if (!selected) return;
                    const url = `${window.location.origin}/news?article=${selected.slug}`;
                    navigator.clipboard?.writeText(url);
                  }}
                  data-testid="news-copy-link"
                  disabled={!selected}
                >
                  Copy link
                </Button>
              </div>
            </div>

            <div className="space-y-2" data-testid="news-expanded-header">
              <div className="text-xs font-medium tracking-wide text-white/60" data-testid="news-expanded-kicker">
                Expanded Article
              </div>
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h3 className="text-xl font-semibold" data-testid="news-expanded-title">
                  {selected?.title ?? "Select an article"}
                </h3>
                <div className="text-xs text-white/60" data-testid="news-expanded-meta">
                  {selected?.dateLabel ? selected.dateLabel : ""}
                </div>
              </div>
            </div>

            <div
              className="max-h-[420px] overflow-auto rounded-2xl border border-white/10 bg-black/20 p-4"
              data-testid="news-expanded-scroll"
            >
              <div className="prose prose-invert max-w-none prose-p:text-white/80 prose-headings:text-white">
                {(selected?.full_content ?? "")
                  .split("\n\n")
                  .filter(Boolean)
                  .map((p, idx) => (
                    <p key={idx} data-testid={`news-expanded-paragraph-${idx}`}>
                      {p}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </Card>

        <MarqueeRail
          railId="bottom"
          items={bottomRail}
          direction={-1}
          initialSpeed={65}
          onSelect={(a) => setSelected(a)}
        />
      </section>

      {/* 3rd party section */}
      <section className="space-y-4" data-testid="news-third-party-section">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight" data-testid="news-third-party-title">
            Third-party media
          </h2>
          <div className="text-xs text-white/60" data-testid="news-third-party-subtitle">
            External coverage and related signals
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3" data-testid="news-third-party-grid">
          {["Research roundup", "Media mentions", "Industry benchmarks"].map((t) => (
            <Card
              key={t}
              className="rounded-2xl border-white/10 bg-white/5 p-5"
              data-testid={`news-third-party-card-${t.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="text-sm font-semibold" data-testid="news-third-party-card-title">
                {t}
              </div>
              <div className="mt-2 text-sm text-white/70" data-testid="news-third-party-card-body">
                Placeholder for curated external sources (next milestone: ingestion + publishing rules).
              </div>
              <Button
                variant="secondary"
                className="mt-4 w-full rounded-xl bg-white/10 text-white hover:bg-white/15"
                data-testid="news-third-party-card-action"
              >
                Coming soon
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
