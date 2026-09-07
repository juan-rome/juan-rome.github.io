"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Nav } from "@/components/layout/nav";
import { PulsingDot } from "@/components/ui/pulsing-dot";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Threshold (px) past which the nav is considered "scrolled", matching
 *  the mockup's condense-on-scroll behavior. */
const CONDENSE_AT = 40;

export function Header() {
  const [condensed, setCondensed] = useState(false);
  // Only matters on desktop: the hero card's own "Juan Romero" heading
  // is what's visible at the top of the page on load there, so the
  // nav's copy would be redundant until that heading scrolls away.
  // Mobile always shows it regardless, since there the nav sits right
  // next to the hamburger rather than floating over page content.
  const [showBrand, setShowBrand] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setCondensed(window.scrollY > CONDENSE_AT);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const heroName = document.getElementById("hero-name");
    if (!heroName) return;

    const observer = new IntersectionObserver(([entry]) => {
      setShowBrand(!entry.isIntersecting);
    });
    observer.observe(heroName);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(query.matches);
    function handleChange(e: MediaQueryListEvent) {
      setIsDesktop(e.matches);
    }
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  // Tailwind's translate and scale utilities each write the whole
  // `transform` property rather than composing through shared CSS
  // variables here, so combining -translate-y-1/2 (vertical centering,
  // since absolute positioning can't use the flex row's own
  // items-center) with the condensed scale-down resolved to nothing.
  // Building the one desktop transform value directly sidesteps that.
  const desktopTransform = !showBrand
    ? "translateY(calc(-50% + 10px))"
    : condensed
      ? "translateY(-50%) scale(0.94)"
      : "translateY(-50%)";

  return (
    <header className={cn("glass-nav-stage", condensed && "is-condensed")}>
      <Container className="relative flex h-auto items-center justify-between py-4 lg:justify-center">
        <a
          href="#top"
          aria-hidden={isDesktop && !showBrand}
          style={isDesktop ? { transform: desktopTransform } : undefined}
          className={cn(
            "glass-surface glass-brand text-foreground flex shrink-0 items-center gap-2 rounded-full py-2.5 pr-4 pl-3 text-[0.85rem] font-semibold opacity-100",
            "transition-[opacity,transform] duration-300 ease-out",
            "lg:absolute lg:top-1/2 lg:left-6",
            !showBrand && "lg:pointer-events-none lg:opacity-0"
          )}
        >
          <PulsingDot
            colorClassName="bg-accent-text"
            glowClassName="shadow-[0_0_8px_rgba(129,140,248,0.8)]"
            ringSizeClassName="h-[7px] w-[7px]"
            className="shrink-0"
          />
          {site.name}
        </a>
        <Nav condensed={condensed} />
      </Container>
    </header>
  );
}
