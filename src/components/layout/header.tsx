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
  // Starts hidden: the hero card's own "Juan Romero" heading is what's
  // visible at the top of the page on load, so the nav's copy of the
  // name would be redundant until that heading scrolls out of view.
  const [showBrand, setShowBrand] = useState(false);

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

  return (
    <header className={cn("glass-nav-stage", condensed && "is-condensed")}>
      <Container className="relative flex h-auto items-center justify-between py-4 lg:justify-center">
        <a
          href="#top"
          aria-hidden={!showBrand}
          className={cn(
            "glass-surface glass-brand text-foreground flex shrink-0 items-center gap-2 rounded-full py-2.5 pr-4 pl-3 text-[0.85rem] font-semibold",
            "transition-[opacity,transform] duration-300 ease-out",
            "lg:absolute lg:top-1/2 lg:left-6 lg:-translate-y-1/2",
            condensed && "is-condensed",
            showBrand ? "opacity-100" : "pointer-events-none scale-90 opacity-0"
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
