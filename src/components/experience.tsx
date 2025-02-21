"use client";
import { motion } from "motion/react";
import { useModal } from "@/store/modal";
import React from "react";
import { experiences } from "@/lib/constants";
import { Calendar, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

const ExperienceDetails = ({
  title,
  company,
  description,
  technologies,
}: {
  title: string;
  company: string;
  description: string[];
  technologies: string[];
}) => {
  return (
    <div className="p-6 bg-slate-800/80 rounded-lg shadow-lg">
      {/* Title & Company */}
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="text-emerald-400 text-lg font-medium">{company}</p>

      {/* Description */}
      <div className="mt-4 space-y-3 text-slate-300">
        {description.map((point, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-emerald-400">•</span>
            <p className="leading-relaxed">{point}</p>
          </div>
        ))}
      </div>

      {/* Technologies */}
      <h3 className="mt-6 text-lg font-semibold text-emerald-300">
        Technologies Used:
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {technologies.map((tech, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-md text-sm font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  const { openContent } = useModal();

  return (
    <section id="experience" className="mt-16 px-6 md:px-12 lg:px-24 relative">
      <h2 className="text-3xl font-bold text-tertiary-600 text-center mb-8">
        Experience
      </h2>

      <div className="relative max-w-7xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-1/2 w-1 h-full bg-emerald-500/30 transform -translate-x-1/2" />

        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative mb-16"
            >
              <div
                className={`flex ${
                  isEven ? "flex-row" : "flex-row-reverse"
                } items-center w-full`}
              >
                {/* Content */}
                <div
                  className={`w-full md:w-1/2 ${
                    isEven ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-slate-800 p-6 rounded-lg shadow-xl relative group"
                  >
                    <div
                      className={`absolute top-8 -translate-y-1/2 md:block ${
                        isEven
                          ? "right-0 translate-x-1/2"
                          : "left-0 -translate-x-1/2"
                      }`}
                    >
                      <div className="h-4 w-4 bg-emerald-500 rounded-full" />
                    </div>

                    <h3 className="text-xl font-semibold text-slate-200">
                      {exp.title}
                    </h3>
                    <p className="text-emerald-400">{exp.company}</p>

                    <div className="flex flex-wrap items-center text-slate-400 text-sm mt-2 space-x-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-emerald-300" />
                        {exp.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-emerald-300" />
                        {formatDate(exp.dates.start)} -{" "}
                        {exp.dates.end ? formatDate(exp.dates.end) : "Present"}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors"
                      onClick={() =>
                        openContent(
                          <ExperienceDetails
                            title={exp.title}
                            company={exp.company}
                            description={exp.description}
                            technologies={exp.technologies}
                          />
                        )
                      }
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                </div>

                {/* Timeline dot for mobile */}
                <div className="w-1/12 md:hidden">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full mx-auto" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
