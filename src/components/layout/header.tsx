import { Container } from "@/components/ui/container";
import { Nav } from "@/components/layout/nav";
import { PulsingDot } from "@/components/ui/pulsing-dot";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#top"
          className="text-foreground flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <PulsingDot
            colorClassName="bg-accent-text"
            glowClassName="shadow-[0_0_8px_rgba(129,140,248,0.8)]"
            ringSizeClassName="h-[7px] w-[7px]"
            className="shrink-0"
          />
          {site.name}
        </a>
        <Nav />
      </Container>
    </header>
  );
}
