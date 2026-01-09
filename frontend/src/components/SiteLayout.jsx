import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", testId: "nav-home-link" },
  { to: "/about", label: "About", testId: "nav-about-link" },
  { to: "/news", label: "News", testId: "nav-news-link" },
  { to: "/pricing", label: "Pricing", testId: "nav-pricing-link" },
  { to: "/investor", label: "Investor", testId: "nav-investor-link" },
  { to: "/contact", label: "Contact", testId: "nav-contact-link" },
];

function TopNav() {
  const location = useLocation();

  return (
    <div
      className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl"
      data-testid="top-nav"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo1.png"
            alt="NeurusAGi"
            className="h-9 w-9 rounded-xl border border-white/10 bg-black/40"
            data-testid="brand-logo"
          />
          <div className="leading-tight">
            <div
              className="text-sm font-semibold tracking-wide text-white"
              data-testid="brand-name"
            >
              NeurusAGi
            </div>
            <div
              className="text-[11px] text-white/60"
              data-testid="brand-tagline"
            >
              A quantum leap in intelligence
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex" data-testid="top-nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={item.testId}
              className={({ isActive }) =>
                [
                  "rounded-xl px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-cyan-500/15 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.25)]"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
              aria-current={location.pathname === item.to ? "page" : undefined}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="md:hidden" data-testid="top-nav-mobile-hint">
          <a
            href="#main"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80"
            data-testid="skip-to-content-link"
          >
            Skip
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-black text-white" data-testid="site-layout">
      {/* Background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        data-testid="bg-fx"
      >
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/25 blur-[120px]" />
        <div className="absolute -bottom-40 right-[-120px] h-[560px] w-[560px] rounded-full bg-orange-600/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_35%),radial-gradient(circle_at_80%_50%,rgba(234,88,12,0.08),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <TopNav />

      <main id="main" className="mx-auto w-full max-w-6xl px-4 py-10" data-testid="main-content">
        <Outlet />
      </main>

      <footer
        className="border-t border-white/10 bg-black/40 py-6"
        data-testid="site-footer"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <div data-testid="footer-left">© {new Date().getFullYear()} NeurusAGi</div>
          <div data-testid="footer-right">Black / Cyan / Rust. Built for global scale.</div>
        </div>
      </footer>
    </div>
  );
}
