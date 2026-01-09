import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function wrapOffset(next, el, repeatCount) {
  const track = el?.querySelector?.("[data-marquee-track]");
  const trackWidth = track?.scrollWidth ?? 0;
  const safeRepeats = Number.isFinite(repeatCount) && repeatCount > 0 ? repeatCount : 1;
  const cycleWidth = trackWidth / safeRepeats;
  if (!cycleWidth || !Number.isFinite(cycleWidth)) return 0;
  return ((next % cycleWidth) + cycleWidth) % cycleWidth;
}

/**
 * A controllable marquee that supports:
 * - auto-scroll (requestAnimationFrame)
 * - pause/play
 * - reverse direction
 * - speed control
 * - drag-to-scrub (both directions)
 */
export default function MarqueeRail({
  railId,
  items,
  direction = 1,
  initialSpeed = 55,
  onSelect,
  selectedSlug,
  onCardClickScrollTo,
}) {
  const viewportRef = useRef(null);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [dir, setDir] = useState(direction);
  const [speed, setSpeed] = useState(initialSpeed);
  const [offset, setOffset] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startOffset: 0 });

  const { duplicated, repeatCount } = useMemo(() => {
    // Duplicate to create a seamless loop.
    const base = items || [];
    // Keep enough repeats so the loop always fills and wraps smoothly.
    const times = base.length < 10 ? 8 : base.length < 18 ? 6 : 4;
    const out = [];
    for (let i = 0; i < times; i += 1) out.push(...base);
    return { duplicated: out, repeatCount: times };
  }, [items]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const step = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (isPlaying && !isDragging) {
        setOffset((prev) => {
          const next = prev + dir * speed * dt;
          return wrapOffset(next, el, repeatCount);
        });
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [dir, isDragging, isPlaying, speed]);

  // Keep the offset bounded by the first track width.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const track = el.querySelector("[data-marquee-track]");
    if (!track) return;

    const ro = new ResizeObserver(() => {
      // bring offset closer to 0 when resizing
      setOffset((prev) => (Math.abs(prev) > 50000 ? 0 : prev));
    });
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  const onPointerDown = (e) => {
    const el = viewportRef.current;
    if (!el) return;

    // If the user is clicking a card, do NOT start drag capture - allow normal click.
    const isOnCard = !!e.target?.closest?.("[data-marquee-card]");
    if (isOnCard) return;

    el.setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    setIsPlaying(false);
    dragRef.current = { startX: e.clientX, startOffset: offset };
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const el = viewportRef.current;
    const dx = e.clientX - dragRef.current.startX;
    // natural drag: move content with pointer
    const next = dragRef.current.startOffset + -dx;
    setOffset(wrapOffset(next, el, repeatCount));
  };

  const onPointerUp = (e) => {
    const el = viewportRef.current;
    el?.releasePointerCapture?.(e.pointerId);
    // normalize offset on release so we stay inside the loop range
    setOffset((prev) => wrapOffset(prev, el, repeatCount));
    setIsDragging(false);
  };

  const onPointerCancel = (e) => {
    const el = viewportRef.current;
    el?.releasePointerCapture?.(e.pointerId);
    setIsDragging(false);
  };

  return (
    <div className="space-y-3" data-testid={`${railId}-rail`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="hidden" data-testid={`${railId}-label`} />
        <div className="flex items-center gap-2" data-testid={`${railId}-controls`}>
          <Button
            variant="secondary"
            className="h-9 rounded-xl bg-white/10 text-white hover:bg-white/15"
            onClick={() => setIsPlaying((v) => !v)}
            data-testid={`${railId}-play-toggle`}
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            variant="secondary"
            className="h-9 rounded-xl bg-white/10 text-white hover:bg-white/15"
            onClick={() => setDir((d) => (d === 1 ? -1 : 1))}
            data-testid={`${railId}-reverse-button`}
          >
            Reverse
          </Button>
          <div className="flex items-center gap-2" data-testid={`${railId}-speed-control`}>
            <div className="text-[11px] text-white/60" data-testid={`${railId}-speed-label`}>
              Speed
            </div>
            <div className="w-28" data-testid={`${railId}-speed-slider-wrapper`}>
              <Slider
                value={[speed]}
                min={10}
                max={140}
                step={5}
                onValueChange={(v) => setSpeed(clamp(v?.[0] ?? speed, 10, 140))}
                data-testid={`${railId}-speed-slider`}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_70px_rgba(0,0,0,0.45)]",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        data-testid={`${railId}-marquee-viewport`}
        role="region"
        aria-label="Article marquee"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(0,122,122,0.18), transparent 40%), radial-gradient(circle at 80% 50%, rgba(193,154,59,0.14), transparent 45%)",
          }}
          data-testid={`${railId}-marquee-glow`}
        />

        <div
          className="flex w-max items-stretch gap-4 px-4 py-4 will-change-transform"
          data-marquee-track
          style={{ transform: `translate3d(${-offset}px, 0, 0)` }}
          data-testid={`${railId}-marquee-track`}
        >
          {duplicated.map((item, idx) => (
            <button
              key={`${item.slug}-${idx}`}
              type="button"
              data-marquee-card
              onClick={() => {
                // clone so state always updates reliably
                onSelect?.({ ...item, slug: item?.slug ?? "" });
                onCardClickScrollTo?.();
              }}
              className={cn(
                "relative h-24 w-[220px] flex-none overflow-hidden rounded-2xl border border-white/10",
                "bg-gradient-to-br from-white/10 to-white/5",
                "text-left transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.01]",
                "shadow-[0_10px_35px_rgba(0,0,0,0.55)]",
                selectedSlug && item.slug === selectedSlug
                  ? "ring-2 ring-[rgba(0,122,122,0.65)] shadow-[0_0_0_1px_rgba(0,122,122,0.35),0_18px_70px_rgba(0,0,0,0.45)]"
                  : "",
              )}
              data-testid={`${railId}-marquee-item-${idx}`}
              aria-label={`Select article ${item.title}`}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    idx % 3 === 0
                      ? "radial-gradient(circle at 30% 30%, rgba(0,122,122,0.26), transparent 55%), linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
                      : idx % 3 === 1
                        ? "radial-gradient(circle at 70% 30%, rgba(0,155,150,0.22), transparent 55%), linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
                        : "radial-gradient(circle at 50% 30%, rgba(193,154,59,0.18), transparent 55%), linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                }}
                data-testid={`${railId}-marquee-item-bg-${idx}`}
              />
              <div className="relative flex h-full flex-col justify-end p-3">
                <div
                  className="line-clamp-2 text-xs font-semibold leading-snug text-white"
                  data-testid={`${railId}-marquee-item-title-${idx}`}
                >
                  {item.title}
                </div>
                <div
                  className="mt-1 text-[11px] text-white/60"
                  data-testid={`${railId}-marquee-item-meta-${idx}`}
                >
                  {item.dateLabel ? item.dateLabel : ""}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div
          className="absolute inset-x-0 bottom-2 flex items-center justify-center"
          data-testid={`${railId}-drag-hint-wrapper`}
        >
          <div
            className={cn(
              "rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] text-white/70",
              isDragging ? "opacity-100" : "opacity-70",
            )}
            data-testid={`${railId}-drag-hint`}
          >
            {isDragging ? "Dragging (release to stop)" : "Drag to scrub left/right"}
          </div>
        </div>
      </div>
    </div>
  );
}
