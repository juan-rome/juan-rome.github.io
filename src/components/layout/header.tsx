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

  useEffect(() => {
    function handleScroll() {
      setCondensed(window.scrollY > CONDENSE_AT);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn("glass-nav-stage", condensed && "is-condensed")}>
      <Container className="relative flex h-auto items-center justify-between py-4 sm:justify-center">
        <a
          href="#top"
          className={cn(
            "glass-surface glass-brand text-foreground flex shrink-0 items-center gap-2 rounded-full py-2.5 pr-4 pl-3 text-[0.85rem] font-semibold",
            "sm:absolute sm:top-1/2 sm:left-6 sm:-translate-y-1/2",
            condensed && "is-condensed"
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
