// e.g. src/components/ProjectDetails.tsx
"use client";
import { Project } from "@/lib/constants";
import React from "react";

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <div className="p-6 bg-slate-800 rounded-lg text-slate-200 max-w-2xl">
      <h2 className="text-2xl font-bold text-white">{project.title}</h2>
      <p className="text-emerald-400 text-lg font-medium">{project.tagline}</p>

      <div className="mt-4">
        <p className="leading-relaxed text-slate-300">{project.description}</p>
      </div>

      {/* Features */}
      <h3 className="mt-6 text-xl font-semibold text-emerald-300">Features</h3>
      <ul className="list-disc list-inside space-y-1 text-slate-300">
        {project.features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>

      {/* Technology Stack */}
      <h3 className="mt-6 text-xl font-semibold text-emerald-300">
        Technology Stack
      </h3>
      {Object.entries(project.technologyStack).map(([category, items], i) => (
        <div key={i} className="mt-2">
          <p className="font-semibold text-slate-200">{category}</p>
          <ul className="list-disc list-inside pl-4 space-y-1 text-slate-300">
            {items.map((tech, j) => (
              <li key={j}>{tech}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Challenges */}
      <h3 className="mt-6 text-xl font-semibold text-emerald-300">
        Challenges
      </h3>
      <ul className="list-disc list-inside space-y-1 text-slate-300">
        {project.challenges.map((challenge, i) => (
          <li key={i}>{challenge}</li>
        ))}
      </ul>

      {/* Demo & Repo Links */}
      <div className="flex items-center gap-4 mt-6">
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
          >
            Live Demo
          </a>
        )}
        <a
          href={project.repository}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-md"
        >
          Repository
        </a>
      </div>

      {/* Video (YouTube) */}
      {project.videoLink && (
        <div className="mt-6 aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full"
            src={project.videoLink}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Future Improvements */}
      <h3 className="mt-6 text-xl font-semibold text-emerald-300">
        Future Improvements
      </h3>
      <ul className="list-disc list-inside space-y-1 text-slate-300">
        {project.futureImprovements.map((improvement, i) => (
          <li key={i}>{improvement}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;
