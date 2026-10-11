import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import EmailCopy from "@/components/email-copy";

const email = "rasaikarshreyas21@gmail.com";

export default function ContactForm() {
  return (
    <section id="contact" tabIndex={-1} className="scroll-mt-20 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="rounded-2xl bg-contact p-6 text-contact-ink sm:p-10">
          <p className="text-sm font-semibold">Let us build something useful</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Looking for a full-stack developer who can own the details?
          </h2>
          <p className="mt-5 max-w-2xl leading-7">
            I am always happy to talk about product engineering, challenging
            builds and teams that value thoughtful execution.
          </p>
          <EmailCopy email={email} />
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${email}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-contact-ink px-6 py-3.5 font-semibold text-contact transition hover:bg-contact-ink/90"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              Email me
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/shreyas-rasaikar-56451920a/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-contact-ink/30 px-6 py-3.5 font-semibold transition hover:bg-contact-ink/10"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href="https://github.com/Shreyas2121"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-contact-ink/30 px-6 py-3.5 font-semibold transition hover:bg-contact-ink/10"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
