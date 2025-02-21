"use client";

import { skills, tools } from "@/lib/constants";
import { motion } from "motion/react";

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="py-16 px-6 md:px-12 lg:px-20 bg-gray-900 text-white"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        Technical Skills & Tools
      </motion.h2>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        <h3 className="text-xl font-semibold mb-4 text-center text-emerald-400">
          Technical Skills
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center items-center">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-800 hover:bg-emerald-600 transition-colors cursor-pointer shadow-lg"
              whileHover={{ scale: 1.1 }}
            >
              <skill.icon className="text-4xl md:text-5xl text-white" />
              <span className="text-sm md:text-base font-medium">
                {skill.name}
              </span>
              <motion.div className="relative w-full bg-gray-700 h-2 rounded-md overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${skill.value}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute h-full bg-emerald-500"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tools Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className="max-w-5xl mx-auto mt-12"
      >
        <h3 className="text-xl font-semibold mb-4 text-center text-indigo-400">
          Tools
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center items-center">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-800 hover:bg-indigo-600 transition-colors cursor-pointer shadow-lg"
              whileHover={{ scale: 1.1 }}
            >
              <tool.icon className="text-4xl md:text-5xl text-white" />
              <span className="text-sm md:text-base font-medium">
                {tool.name}
              </span>
              <motion.div className="relative w-full bg-gray-700 h-2 rounded-md overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${tool.value}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute h-full bg-emerald-500"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
