"use client";

import { projects } from "@/lib/constants";
import { useModal } from "@/store/modal";
import { motion } from "motion/react";
import ProjectDetails from "./project-details";

export default function Projects() {
  const { openContent } = useModal();

  return (
    <section
      id="projects"
      className="py-16 px-6 md:px-12 lg:px-20 bg-slate-900 text-white"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        My Projects
      </motion.h2>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            className="bg-slate-800 rounded-lg p-6 shadow-lg flex flex-col justify-between"
          >
            {/* Project Info */}
            <div>
              <h3 className="text-xl font-semibold text-emerald-400">
                {project.title}
              </h3>
              <p className="text-sm text-slate-400 mt-2">{project.tagline}</p>
            </div>

            {/* View Details Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openContent(<ProjectDetails project={project} />)}
              className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md font-medium transition"
            >
              View Details
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
