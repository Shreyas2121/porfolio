import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shreyas Rasaikar | Full-Stack Developer",
  description: "Full-stack developer with nearly four years of experience building real-time B2B platforms using TypeScript, React, NestJS, PostgreSQL, Redis and WebSockets.",
  keywords: ["Shreyas Rasaikar", "Full-Stack Developer", "NestJS", "React", "PostgreSQL", "Redis", "WebSockets", "TypeScript", "Goa"],
  authors: [{ name: "Shreyas Rasaikar" }],
  creator: "Shreyas Rasaikar",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shreyas Rasaikar",
    jobTitle: "Full-Stack Developer",
    address: { "@type": "PostalAddress", addressRegion: "Goa", addressCountry: "IN" },
    sameAs: ["https://github.com/Shreyas2121", "https://www.linkedin.com/in/shreyas-rasaikar-56451920a/"],
  };
  return <html lang="en"><body className="antialiased">{children}<Analytics /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} /></body></html>;
}
