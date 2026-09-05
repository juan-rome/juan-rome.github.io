import { Hero } from "@/components/sections/hero";
import { EngineeringWorkHighlights } from "@/components/sections/engineering-work-highlights";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SideProjectsSection } from "@/components/sections/side-projects-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { ResumeSection } from "@/components/sections/resume-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <EngineeringWorkHighlights />
      <ExperienceSection />
      <ExpertiseSection />
      <ProjectsSection />
      <SideProjectsSection />
      <PhilosophySection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
