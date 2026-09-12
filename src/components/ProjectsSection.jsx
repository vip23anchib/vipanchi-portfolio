import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Code2, ArrowUpRight, CheckCircle2, Copy, Check, Sparkles, X } from 'lucide-react';
import { GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function ProjectsSection() {
  const [selectedCodeProject, setSelectedCodeProject] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (snippet) => {
    if (snippet) {
      navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="projects" className="py-16 md:py-20 border-t border-[#DDD6C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-metro-backend font-bold text-xs uppercase tracking-wider mb-1">
            <FolderGit2 className="w-4 h-4" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-ink-primary tracking-tight font-sans">
            Featured Projects
          </h2>
          <p className="text-sm text-ink-secondary mt-1 max-w-2xl">
            Production-grade systems, concurrency-safe booking engines, forensic data analytics, and LLM shortlisting tools.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project) => (
            <div
              key={project.id}
              className={`p-6 sm:p-7 rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between shadow-paper-card hover:shadow-paper ${
                project.featured ? 'border-[#B5ADA0] ring-1 ring-black/5' : 'border-[#DDD6C9]'
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FAF8F4] text-metro-backend border border-[#DDD6C9]">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#FAF8F4] hover:bg-[#EAE4D9] text-emerald-800 transition"
                        title="Live Deployment"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#FAF8F4] hover:bg-[#EAE4D9] text-ink-secondary hover:text-ink-primary transition"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-black text-ink-primary font-sans tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs text-ink-muted font-medium mt-0.5 mb-3">
                  {project.subtitle}
                </p>

                {/* Overview */}
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans mb-4">
                  {project.overview}
                </p>

                {/* Architecture Highlights */}
                {project.architecture && (
                  <div className="space-y-2 mb-5">
                    {project.architecture.slice(0, 3).map((item, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-ink-secondary leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-metro-backend shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer: Tech Stack & Code Button */}
              <div className="pt-4 border-t border-[#DDD6C9] space-y-3">
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-[#FAF8F4] text-ink-secondary text-xs font-medium border border-[#DDD6C9]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Code Snippet Button if present */}
                {project.codeSnippet && (
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedCodeProject(project)}
                      className="flex items-center gap-1.5 text-xs font-bold text-metro-backend hover:underline"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>View Implementation Code Snippet →</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Code Snippet Modal */}
      {selectedCodeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#FAF8F4] rounded-2xl border border-[#DDD6C9] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            <div className="p-4 sm:p-5 bg-white border-b border-[#DDD6C9] flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-ink-primary text-base font-sans">
                  {selectedCodeProject.title} — Implementation Logic
                </h3>
                <p className="text-xs text-ink-muted">
                  Core backend locking / ranking service code
                </p>
              </div>
              <button
                onClick={() => setSelectedCodeProject(null)}
                className="p-1.5 rounded-lg bg-[#FAF8F4] hover:bg-[#EAE4D9] text-ink-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-end">
                <button
                  onClick={() => handleCopyCode(selectedCodeProject.codeSnippet)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DDD6C9] text-ink-primary text-xs font-bold shadow-sm hover:bg-[#FAF8F4]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-[#1E222B] text-emerald-300 font-mono text-xs overflow-x-auto border border-[#2D3340] leading-relaxed shadow-inner">
                <code>{selectedCodeProject.codeSnippet}</code>
              </pre>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
