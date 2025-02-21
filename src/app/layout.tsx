import type { Metadata } from "next";
import "./globals.css";
import Modal from "@/components/modal";

export const metadata: Metadata = {
  title: "Shreyas Rasaikar | Full-Stack Developer",
  description:
    "I’m Shreyas Rasaikar, a Full-Stack Developer specializing in the MERN stack and TypeScript. Explore my projects, experiences, and more!",
  keywords: [
    "Shreyas Rasaikar",
    "Full-Stack Developer",
    "MERN",
    "TypeScript",
    "Portfolio",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Modal />
        {children}
      </body>
    </html>
  );
}
