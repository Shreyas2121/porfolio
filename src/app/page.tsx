import ContactForm from "@/components/contact-form";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Projects from "@/components/projects";
import TechStack from "@/components/tech-stack";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <TechStack />
      <ContactForm />
      <Footer />
    </main>
  );
}
