"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";

import Container from "@/components/Container";
import Logo from "@/components/Logo";
import { ButtonLink } from "@/components/Button";
import { company, navigation, services } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Compact + solid once the page has moved off the hero. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
   * Any navigation closes every menu. Adjusted during render rather than in an
   * effect so the menus never paint open on the newly-routed page.
   */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setDesktopServicesOpen(false);
  }

  /* Lock background scroll behind the mobile panel. */
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  /* Escape closes whichever menu is open. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      setDesktopServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* Click outside closes the desktop dropdown. */
  useEffect(() => {
    if (!desktopServicesOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) {
        setDesktopServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [desktopServicesOpen]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDesktopServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDesktopServicesOpen(false), 120);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* Transparent over the dark hero band, solid white once scrolled. */
  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        solid
          ? "border-b border-peak-950/10 bg-white/95 shadow-[0_1px_24px_-8px_rgba(3,32,19,0.28)] backdrop-blur-md"
          : "border-b border-white/10 bg-transparent"
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between gap-4 transition-[height] duration-300 ${
            solid ? "h-16 lg:h-18" : "h-20 lg:h-24"
          }`}
        >
          <Logo
            priority
            tone={solid ? "dark" : "light"}
            height={solid ? 36 : 44}
            className="transition-all duration-300"
          />

          {/* ---------------------------- desktop nav ---------------------------- */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const active = isActive(item.href);

                if (!item.children) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`relative px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
                          solid
                            ? active
                              ? "text-peak-800"
                              : "text-peak-950/75 hover:text-peak-800"
                            : active
                              ? "text-gold-300"
                              : "text-white/85 hover:text-white"
                        }`}
                      >
                        {item.label}
                        <span
                          className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-300 ${
                            solid ? "bg-gold-500" : "bg-gold-400"
                          } ${active ? "scale-x-100" : "scale-x-0"}`}
                        />
                      </Link>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.href}
                    ref={servicesRef}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleCloseServices}
                    onFocus={openServices}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setDesktopServicesOpen(false);
                      }
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={desktopServicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setDesktopServicesOpen((v) => !v)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
                        solid
                          ? active
                            ? "text-peak-800"
                            : "text-peak-950/75 hover:text-peak-800"
                          : active
                            ? "text-gold-300"
                            : "text-white/85 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden
                        className={`size-4 transition-transform duration-200 ${
                          desktopServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      id="services-menu"
                      className={`absolute left-1/2 top-full w-[36rem] -translate-x-1/2 pt-4 transition-all duration-200 ${
                        desktopServicesOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden border border-peak-950/10 bg-white shadow-[0_28px_60px_-24px_rgba(3,32,19,0.4)]">
                        <div className="h-0.5 rule-gold" />
                        <ul className="grid grid-cols-2 gap-px bg-peak-950/8">
                          {item.children.map((child) => (
                            <li key={child.href} className="bg-white">
                              <Link
                                href={child.href}
                                className="group flex h-full flex-col gap-1 p-4 transition-colors hover:bg-peak-50"
                              >
                                <span className="text-sm font-semibold text-peak-900 transition-colors group-hover:text-peak-700">
                                  {child.label}
                                </span>
                                <span className="line-clamp-2 text-xs leading-relaxed text-peak-950/70">
                                  {child.summary}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/services"
                          className="flex items-center justify-between border-t border-peak-950/10 bg-peak-50/60 px-4 py-3 text-sm font-semibold text-peak-800 transition-colors hover:bg-peak-100"
                        >
                          View all services
                          <ChevronDown aria-hidden className="size-4 -rotate-90" />
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ---------------------------- desktop CTA ---------------------------- */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={company.phone.href}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                solid
                  ? "text-peak-950/70 hover:text-peak-800"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Phone aria-hidden className="size-4" />
              <span className="hidden xl:inline">{company.phone.display}</span>
            </a>
            <ButtonLink href="/quote" variant="gold">
              Request a Quote
            </ButtonLink>
          </div>

          {/* ---------------------------- mobile toggle -------------------------- */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={`-mr-2 inline-flex size-11 items-center justify-center transition-colors lg:hidden ${
              solid ? "text-peak-900" : "text-white"
            }`}
          >
            {mobileOpen ? (
              <X aria-hidden className="size-6" />
            ) : (
              <Menu aria-hidden className="size-6" />
            )}
          </button>
        </div>
      </Container>

      {/* ------------------------------ mobile panel ------------------------------ */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="lg:hidden"
      >
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-peak-950/10 bg-white">
          <Container className="py-4">
            <ul className="divide-y divide-peak-950/8">
              {navigation.map((item) => {
                if (!item.children) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`flex min-h-14 items-center text-lg font-semibold ${
                          isActive(item.href) ? "text-peak-700" : "text-peak-950"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      aria-expanded={mobileServicesOpen}
                      aria-controls="mobile-services"
                      className="flex min-h-14 w-full items-center justify-between text-lg font-semibold text-peak-950"
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden
                        className={`size-5 text-peak-700 transition-transform duration-200 ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <ul id="mobile-services" hidden={!mobileServicesOpen} className="pb-2">
                      <li>
                        <Link
                          href="/services"
                          className="flex min-h-12 items-center border-l-2 border-gold-400 pl-4 text-[0.9375rem] font-semibold text-peak-800"
                        >
                          All Services
                        </Link>
                      </li>
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="flex min-h-12 items-center border-l-2 border-peak-950/10 pl-4 text-[0.9375rem] text-peak-950/75"
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 flex flex-col gap-3 pb-4">
              <ButtonLink href="/quote" variant="gold" size="lg" className="w-full">
                Request a Quote
              </ButtonLink>
              <a
                href={company.phone.href}
                className="flex min-h-12 items-center justify-center gap-2 border border-peak-950/15 text-[0.9375rem] font-semibold text-peak-900"
              >
                <Phone aria-hidden className="size-4" />
                {company.phone.display}
              </a>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
