import { Container } from "@/components/ui/container";
import { Nav } from "@/components/layout/nav";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="text-foreground text-sm font-semibold tracking-tight">
          {site.name}
        </a>
        <Nav />
      </Container>
    </header>
  );
}
