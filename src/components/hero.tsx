"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Download, Briefcase } from "lucide-react";
import image from "../assests/image.avif";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full md:w-1/2 text-center md:text-left max-w-2xl"
          >
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              Full-Stack Developer
              <span className="text-primary-400">
                {" "}
                Scalable APIs &amp; Web Apps
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-300">
              I’m Shreyas Rasaikar, a Full-Stack Developer with 2.5+ years of
              experience specializing in the MERN stack and TypeScript. I build
              efficient, scalable, and high-performance web applications that
              deliver exceptional user experiences.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="#experience"
                className="flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all"
              >
                <Briefcase className="w-5 h-5" />
                View Experience
              </Link>

              <Link
                href="/Shreyas_Resume.pdf"
                target="_blank"
                download
                className="flex items-center gap-2 px-6 py-3 bg-tertiary-500 hover:bg-tertiary-600 text-white rounded-lg transition-all"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            // 4. Let the image also take half width on desktop, full on mobile
            className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end"
          >
            <Image
              src={image}
              alt="Specs Guy"
              className="drop-shadow-lg max-w-full h-auto"
              width={400}
              height={400}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
