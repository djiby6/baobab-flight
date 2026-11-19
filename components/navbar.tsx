"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import type { DestinationNavItem } from "@/data/destinations";
import { cn } from "@/lib/cn";
import { navigation, whatsappLink } from "@/lib/site";

export function Navbar({ destinations }: { destinations: DestinationNavItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) setDestinationsOpen(false);

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-white/10 bg-night/85 py-3 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center"
          onClick={() => setOpen(false)}
          aria-label="Baobab Flight — retour à l'accueil"
        >
          <Logo
            priority
            className="transition-transform duration-500 group-hover:-rotate-1"
          />
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navigation principale"
        >
          {navigation.map((item) =>
            item.href === "/destinations" ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="relative inline-flex items-center gap-1.5 text-[13px] font-medium text-white/65 transition-colors hover:text-white"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-cyan transition-all duration-300 group-hover:w-full group-focus-within:w-full" />
                </Link>

                <div className="invisible absolute left-0 top-full z-50 w-[32rem] pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <nav
                    aria-label="Destinations"
                    className="rounded-[24px] border border-white/10 bg-night/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {destinations.map((continent) => (
                        <Link
                          key={continent.slug}
                          href={`/destinations/${continent.slug}`}
                          className="group/item flex items-start justify-between gap-3 rounded-2xl px-3.5 py-3 transition hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none"
                        >
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">
                              {continent.index}
                            </p>
                            <p className="mt-1 font-display text-sm font-semibold text-white">
                              {continent.name}
                            </p>
                            <p className="mt-0.5 text-[11px] text-white/45">
                              {continent.countries.length} pays
                            </p>
                          </div>
                          <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-white/25 transition group-hover/item:text-cyan" />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-2 border-t border-white/10 pt-2">
                      <Link
                        href="/destinations"
                        className="flex items-center justify-between rounded-2xl px-3.5 py-3 text-sm font-semibold text-white transition hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none"
                      >
                        Toutes les destinations
                        <ArrowRight className="h-4 w-4 text-cyan" />
                      </Link>
                    </div>
                  </nav>
                </div>
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-[13px] font-medium text-white/65 transition-colors hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-cyan transition-all duration-300 group-hover:w-full" />
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-violet/30 transition hover:brightness-110 sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Réserver sur WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden",
          open
            ? "max-h-[calc(100vh-5rem)] overflow-y-auto opacity-100"
            : "max-h-0 opacity-0",
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl flex-col gap-1 px-5 pb-6 pt-4 sm:px-6"
          aria-label="Navigation mobile"
        >
          {navigation.map((item) =>
            item.href === "/destinations" ? (
              <div key={item.href}>
                <button
                  type="button"
                  onClick={() => setDestinationsOpen((value) => !value)}
                  aria-expanded={destinationsOpen}
                  aria-controls="mobile-destinations"
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-white/75 transition hover:bg-white/5 hover:text-white"
                >
                  <span className="inline-flex items-center gap-2">
                    {item.label}
                    <span className="rounded-full bg-cyan/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan">
                      {destinations.length} continents
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-white/30 transition-transform duration-300",
                      destinationsOpen && "rotate-180",
                    )}
                  />
                </button>

                <div
                  id="mobile-destinations"
                  className={cn(
                    "overflow-hidden transition-[max-height,opacity] duration-300",
                    destinationsOpen
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <div className="ml-4 mt-1 grid gap-1 border-l border-white/10 pl-3">
                    {destinations.map((continent) => (
                      <Link
                        key={continent.slug}
                        href={`/destinations/${continent.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/5 hover:text-white"
                      >
                        <span>{continent.name}</span>
                        <span className="text-[10px] text-white/30">
                          {continent.countries.length} pays
                        </span>
                      </Link>
                    ))}
                    <Link
                      href="/destinations"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-cyan transition hover:bg-white/5"
                    >
                      Toutes les destinations
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-white/75 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
                <ArrowUpRight className="h-4 w-4 text-white/30" />
              </a>
            ),
          )}

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet/30"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Réserver sur WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
