import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { LavaTiltCard } from "@/components/ui/lava-tilt-card";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      <Container className="flex justify-center">
        <FadeIn>
          <LavaTiltCard
            background={[0.09, 0.03, 0.16]}
            lava={[1.5, 0.35, 2.1]}
            className="aspect-square w-full max-w-[420px]"
          >
            <div className="flex flex-col items-center px-8 text-center">
              <span className="mb-5 inline-flex rounded-full border border-white/25 bg-black/40 px-3.5 py-1.5 text-xs text-white backdrop-blur-sm">
                {site.location}
              </span>
              <p className="text-sm font-medium text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
                {site.role}
              </p>
              <h1
                id="hero-name"
                className="mt-3 text-3xl font-semibold tracking-tight text-balance text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] sm:text-4xl"
              >
                {site.name}
              </h1>
              <p className="mt-4 max-w-[26ch] text-pretty text-white/90 [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
                {site.tagline}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="#work">View engineering work</Button>
                <Button
                  href="#resume"
                  variant="secondary"
                  className="border-white/30 bg-black/30 text-white backdrop-blur-sm hover:border-white/50"
                >
                  Resume
                </Button>
              </div>
            </div>
          </LavaTiltCard>
        </FadeIn>
      </Container>
    </section>
  );
}
