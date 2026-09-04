import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="pt-24 pb-20 text-center sm:pt-32 sm:pb-28">
      <Container className="flex flex-col items-center">
        <FadeIn>
          <span className="border-border-strong text-muted mb-5 inline-flex rounded-full border px-3.5 py-1.5 text-xs">
            {site.location}
          </span>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p className="text-accent-text text-sm font-medium">{site.role}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {site.name}
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-muted mt-6 max-w-xl text-lg text-pretty">{site.tagline}</p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="#work">View engineering work</Button>
            <Button href="#resume" variant="secondary">
              Resume
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
