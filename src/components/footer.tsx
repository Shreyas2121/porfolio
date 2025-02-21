"use client";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
} from "react-icons/fa";
import { motion } from "motion/react";

const links = [
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/shreyas.rasaikar.1/",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/shreyas-rasaikar-56451920a/",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/_shreyas21_/",
  },
  {
    icon: FaGithub,
    href: "https://github.com/Shreyas2121",
  },
];

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="w-full bg-slate-900 text-slate-300 py-10 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left - Branding & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-emerald-400">
            Shreyas Rasaikar
          </h2>
          <p className="text-sm text-slate-400">Full Stack Developer</p>
          <p className="text-sm text-slate-500 mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Center - Social Links */}
        <div className="flex space-x-6">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                href={link.href}
                key={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition"
              >
                <Icon className="text-2xl" />
              </a>
            );
          })}
        </div>

        {/* Right - Contact Info */}
        <div className="text-center md:text-right">
          <p className="flex items-center justify-center md:justify-end gap-2">
            <FaEnvelope className="text-emerald-400" />{" "}
            rasaikarshreyas21@gmail.com
          </p>
          <p className="flex items-center justify-center md:justify-end gap-2 mt-2">
            <FaPhone className="text-emerald-400" /> +91 9370120157
          </p>
          <p className="flex items-center justify-center md:justify-end gap-2 mt-2">
            <FaMapMarkerAlt className="text-emerald-400" /> Goa, India
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
