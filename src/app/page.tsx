import ContactForm from "@/components/contact-form";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import TechStack from "@/components/tech-stack";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white ">
      <div className="flex flex-col">
        <Navbar />
        <Hero />
      </div>
      <TechStack />
      <Experience />
      <ContactForm />
      <Footer />
    </div>
  );
}
