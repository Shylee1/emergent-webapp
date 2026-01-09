import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarqueeRail from "@/components/MarqueeRail";
import articles from "@/data/articles.json";

const YT_MAIN = "https://www.youtube.com/embed/p6K4E1OlxrU";
const YT_ANNOUNCEMENTS = "https://www.youtube.com/embed/NdvjA5NLREE";

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
  const [selected, setSelected] = useState(() => (Array.isArray(articles) ? articles?.find((a) => !a.isPosted) : null) ?? null);
  const [activeTab, setActiveTab] = useState("neur");

  // Exclude articles that are marked as already posted.
  // The source file includes markers like "posted" / "LinkedIn" / "YouTube" near the title.
  const curated = useMemo(() => {
    const base = Array.isArray(articles) ? articles : [];
    return base
      .filter((a) => !a.isPosted)
      .filter((a) => !String(a.slug || "").includes("pending"));
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
  }, [query]);

  const topRail = filtered.filter((_, idx) => idx % 2 === 0);
  const bottomRail = filtered.filter((_, idx) => idx % 2 === 1);

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
              Featured drops, embedded media, and the dual-marquee selector. Search between rails, pick an
              article, and expand it instantly.
            </p>

            <div className="mt-5 space-y-3" data-testid="news-announcement-cards">
              {[
                {
                  title: "Announcement Feed",
                  body: "High-impact updates and milestones. Built for attention, not noise.",
                },
                {
                  title: "Media Embed",
                  body: "Video drops integrated directly into the news surface.",
                },
                {
                  title: "Article Intelligence",
                  body: "Dual marquee streams with interactive control and instant expansion.",
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
                  className="text-xs text-cyan-300/80 hover:text-cyan-200"
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
                  src={YT_ANNOUNCEMENTS}
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

      {/* Main video */}
      <section className="grid gap-6 lg:grid-cols-5" data-testid="news-main-video-section">
        <div className="lg:col-span-2" data-testid="news-main-video-copy">
          <h2 className="text-2xl font-semibold tracking-tight" data-testid="news-main-video-title">
            Featured Drop
          </h2>
          <p className="mt-2 text-sm text-white/70" data-testid="news-main-video-subtitle">
            Watch the clip, then scan the streams to select an article.
          </p>

          <div className="mt-4 grid gap-3" data-testid="news-main-video-stats">
            {["Compute", "Zero-shot", "Evolution"].map((k) => (
              <Card
                key={k}
                className="rounded-2xl border-white/10 bg-white/5 p-4"
                data-testid={`news-stat-card-${k.toLowerCase()}`}
              >
                <div className="text-xs text-white/60" data-testid="news-stat-card-label">
                  {k}
                </div>
                <div className="mt-1 text-sm font-semibold" data-testid="news-stat-card-value">
                  Report-backed visuals included
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3" data-testid="news-main-video-player">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="text-xs font-medium text-white/70" data-testid="news-main-video-label">
                NeurusAGi: When will AGI be here?
              </div>
              <a
                className="text-xs text-cyan-300/80 hover:text-cyan-200"
                href="https://www.youtube.com/watch?v=p6K4E1OlxrU"
                target="_blank"
                rel="noreferrer"
                data-testid="news-main-video-open"
              >
                Open on YouTube
              </a>
            </div>
            <div className="aspect-video" data-testid="news-main-video-wrapper">
              <iframe
                className="h-full w-full"
                src={YT_MAIN}
                title="NeurusAGi featured"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                data-testid="news-main-iframe"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dual marquee + search + expansion */}
      <section className="space-y-6" data-testid="news-marquee-section">
        <MarqueeRail
          railId="top"
          items={topRail}
          direction={1}
          initialSpeed={70}
          onSelect={(a) => setSelected(a)}
        />

        <div className="grid gap-4 lg:grid-cols-5" data-testid="news-search-row">
          <div className="lg:col-span-3" data-testid="news-search-bar">
            <div className="flex items-center gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search titles + content…"
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

          <div className="lg:col-span-2" data-testid="news-selected-meta">
            <Card className="rounded-2xl border-white/10 bg-black/30 p-4">
              <div className="text-xs text-white/60" data-testid="news-selected-label">
                Selected
              </div>
              <div className="mt-1 text-sm font-semibold" data-testid="news-selected-title">
                {selected?.title ?? "None"}
              </div>
              <div className="mt-1 text-xs text-white/60" data-testid="news-selected-sub">
                {selected?.dateLabel ? selected.dateLabel : "Pick an article from the streams"}
              </div>
            </Card>
          </div>
        </div>

        <MarqueeRail
          railId="bottom"
          items={bottomRail}
          direction={-1}
          initialSpeed={65}
          onSelect={(a) => setSelected(a)}
        />

        <Card
          className="relative overflow-hidden rounded-3xl border-white/10 bg-white/5 p-6"
          data-testid="news-article-expansion"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(34,211,238,0.12), transparent 45%), radial-gradient(circle at 80% 70%, rgba(234,88,12,0.10), transparent 50%)",
            }}
          />

          <div className="relative">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1">
                <div
                  className="text-xs font-medium tracking-wide text-white/60"
                  data-testid="news-expanded-kicker"
                >
                  Expanded Article
                </div>
                <h3 className="text-xl font-semibold" data-testid="news-expanded-title">
                  {selected?.title ?? "Select an article"}
                </h3>
                <div className="text-xs text-white/60" data-testid="news-expanded-meta">
                  {selected ? `Article #${selected.num}` : ""}
                </div>
              </div>

              <div className="flex flex-wrap gap-2" data-testid="news-expanded-actions">
                <Button
                  variant="secondary"
                  className="rounded-xl bg-white/10 text-white hover:bg-white/15"
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
                <Button
                  variant="secondary"
                  className="rounded-xl bg-white/10 text-white hover:bg-white/15"
                  onClick={() => setSelected(null)}
                  data-testid="news-deselect"
                  disabled={!selected}
                >
                  Deselect
                </Button>
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-5" data-testid="news-expanded-body">
              <div className="lg:col-span-3" data-testid="news-expanded-text">
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

                {selected?.slug?.includes("pending") ? (
                  <div
                    className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/70"
                    data-testid="news-expanded-missing-note"
                  >
                    The source file did not include this article’s full text. If you paste Article #{selected.num}
                    content, I’ll replace this placeholder immediately.
                  </div>
                ) : null}
              </div>

              <div className="lg:col-span-2" data-testid="news-expanded-visuals">
                <Tabs value={activeTab} onValueChange={setActiveTab} data-testid="news-visual-tabs">
                  <TabsList
                    className="grid w-full grid-cols-3 rounded-xl bg-white/10"
                    data-testid="news-visual-tabs-list"
                  >
                    <TabsTrigger value="neur" data-testid="news-visual-tab-compute">
                      Compute
                    </TabsTrigger>
                    <TabsTrigger value="evo" data-testid="news-visual-tab-evolution">
                      Evolution
                    </TabsTrigger>
                    <TabsTrigger value="zero" data-testid="news-visual-tab-zeroshot">
                      Zero-shot
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="neur" data-testid="news-visual-tabpanel-compute">
                    <Card className="mt-3 overflow-hidden rounded-2xl border-white/10 bg-black/30">
                      <img
                        src="/neurusagi_compute_graph_v3.png"
                        alt="AI Compute Graph"
                        className="w-full"
                        data-testid="news-visual-compute-image"
                      />
                    </Card>
                  </TabsContent>

                  <TabsContent value="evo" data-testid="news-visual-tabpanel-evolution">
                    <Card className="mt-3 overflow-hidden rounded-2xl border-white/10 bg-black/30">
                      <img
                        src="/neurusagi_evolution_dynamics.png"
                        alt="Intelligence evolution dynamics"
                        className="w-full"
                        data-testid="news-visual-evolution-image"
                      />
                    </Card>
                  </TabsContent>

                  <TabsContent value="zero" data-testid="news-visual-tabpanel-zeroshot">
                    <Card className="mt-3 overflow-hidden rounded-2xl border-white/10 bg-black/30">
                      <img
                        src="/neurusagi_zeroshot_discovery2.png"
                        alt="Zero-shot discovery"
                        className="w-full"
                        data-testid="news-visual-zeroshot-image"
                      />
                    </Card>
                  </TabsContent>
                </Tabs>

                <div
                  className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/70"
                  data-testid="news-visuals-note"
                >
                  Visuals pulled from NeurusAGi technical reporting. Color palette matches NeurusAGi branding.
                </div>
              </div>
            </div>
          </div>
        </Card>
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
