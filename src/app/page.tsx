import ContactForm from "@/components/contact-form";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import TechStack from "@/components/tech-stack";

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-page text-foreground"
    >
      <Hero />
      <Projects />
      <Experience />
      <TechStack />
      <ContactForm />
    </main>
  );
}
