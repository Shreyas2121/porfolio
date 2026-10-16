import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shreyas Rasaikar | Full-Stack Developer",
  description:
    "Full-stack developer with 4+ years of experience owning real-time B2B features from data modelling and API design to React interfaces, delivery and reliability improvements.",
  keywords: [
    "Shreyas Rasaikar",
    "Full-Stack Developer",
    "NestJS",
    "React",
    "PostgreSQL",
    "Redis",
    "WebSockets",
    "TypeScript",
    "Goa",
  ],
  authors: [{ name: "Shreyas Rasaikar" }],
  creator: "Shreyas Rasaikar",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `
    (function () {
      try {
        var saved;
        try { saved = localStorage.getItem("theme"); } catch (_) {}
        var theme = ["light", "dark", "dopamine", "sand"].indexOf(saved) !== -1
          ? saved
          : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        var dark = theme === "dark";
        document.documentElement.dataset.theme = theme;
        document.documentElement.classList.toggle("dark", dark);
        document.documentElement.style.colorScheme = dark ? "dark" : "light";
      } catch (_) {}
    })();
  `;
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shreyas Rasaikar",
    jobTitle: "Full-Stack Developer",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Goa",
      addressCountry: "IN",
    },
    sameAs: [
      "https://github.com/Shreyas2121",
      "https://www.linkedin.com/in/shreyas-rasaikar-56451920a/",
    ],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top" className="antialiased">
        <a
          href="#main-content"
          className="fixed left-5 top-4 z-[100] -translate-y-24 rounded-lg bg-action px-5 py-3 font-semibold text-on-action focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
      </body>
    </html>
  );
}
