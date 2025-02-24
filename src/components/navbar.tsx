"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Home,
  Code2,
  Briefcase,
  LayoutGrid,
  Mail,
  Menu,
  X,
} from "lucide-react";

const links = [
  {
    label: "Home",
    href: "#",
    icon: Home,
  },
  {
    label: "Tech Stack",
    href: "#tech-stack",
    icon: Code2,
  },
  {
    label: "Experiences",
    href: "#experience",
    icon: Briefcase,
  },
  {
    label: "Projects",
    href: "#projects",
    icon: LayoutGrid,
  },
  {
    label: "Contact",
    href: "#contact",
    icon: Mail,
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 1️⃣ Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-slate-900/80 backdrop-blur-md border-b border-slate-800"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar Content */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="#"
            className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="font-bold text-slate-900">S</span>
            </div>
            <span className="font-semibold">Portfolio</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition-colors group"
              >
                <link.icon className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
                <span className="group-hover:-translate-y-1 transition-transform">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-50 bg-slate-900/90 pb-4">
            {/* Optionally, add a click-to-close overlay:
    <div
      className="absolute inset-0"
      onClick={() => setIsOpen(false)}
    />
    */}

            <div className="px-2 pt-2 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
