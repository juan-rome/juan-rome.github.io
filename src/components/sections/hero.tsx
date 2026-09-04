import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 pb-20 text-center sm:pt-32 sm:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 [animation:hero-glow-loop_7s_1_both] rounded-full opacity-0 blur-3xl [background:radial-gradient(circle,rgba(129,140,248,0.55),rgba(217,70,239,0.35)_45%,rgba(56,189,248,0.25)_70%,transparent_78%)]"
      />
      <Container className="relative flex flex-col items-center">
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
