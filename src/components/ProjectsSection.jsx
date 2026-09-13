import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Code2, CheckCircle2, Copy, Check, X } from 'lucide-react';
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
    <section id="projects" className="py-16 md:py-20 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-10 h-[3px] bg-metro-backend rounded-full mb-5" />
          <div className="flex items-center gap-2 text-metro-backend font-bold text-xs uppercase tracking-wider mb-2">
            <FolderGit2 className="w-4 h-4" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight font-sans">
            Featured Projects
          </h2>
          <p className="text-sm text-[#374151] mt-2 max-w-2xl font-medium">
            Production-grade systems, concurrency-safe booking engines, forensic data analytics, and LLM shortlisting tools.
          </p>
        </motion.div>

        {/* Content Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="rounded-3xl border border-[#E4DDD3] bg-white/50 shadow-[0_2px_24px_rgba(27,95,168,0.06)] p-6 sm:p-10"
        >
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project) => (
            <div
              key={project.id}
              className={`p-6 sm:p-7 rounded-2xl bg-white flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group ${
                project.featured
                  ? 'border-2 border-metro-backend/30 shadow-md hover:shadow-lg ring-2 ring-metro-backend/8'
                  : 'border border-[#DDD6C9] shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#EAE4D9]">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full text-xs font-black bg-[#FAF8F4] text-metro-backend border border-[#DDD6C9] shadow-xs">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs hover:shadow-sm transition-all flex items-center gap-1">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-[11px]">Live</span>
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-xl bg-[#FAF8F4] hover:bg-[#F4EFE6] text-[#111827] font-bold text-xs border border-[#DDD6C9] shadow-xs hover:shadow-sm transition-all flex items-center gap-1">
                        <GithubIcon className="w-3.5 h-3.5 text-[#111827]" />
                        <span className="hidden sm:inline text-[11px]">GitHub</span>
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#111827] font-sans tracking-tight group-hover:text-metro-backend transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[#6B7280] font-bold mt-0.5 mb-3">{project.subtitle}</p>
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed font-medium mb-4">{project.overview}</p>

                {project.architecture && (
                  <div className="space-y-2 mb-5">
                    {project.architecture.slice(0, 3).map((item, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-[#374151] leading-relaxed font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-metro-backend shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-[#EAE4D9] space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#FAF8F4] text-[#374151] text-xs font-semibold border border-[#DDD6C9] hover:bg-white hover:border-metro-backend/40 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
                {project.codeSnippet && (
                  <div className="pt-1">
                    <button onClick={() => setSelectedCodeProject(project)}
                      className="flex items-center gap-1.5 text-xs font-black text-metro-backend hover:text-[#154E8C] hover:underline">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>View Implementation Code Snippet →</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        </motion.div>
      </div>

      {/* Code Snippet Modal */}
      {selectedCodeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#FAF8F4] rounded-2xl border border-[#DDD6C9] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 sm:p-5 bg-white border-b border-[#DDD6C9] flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-[#111827] text-base font-sans">
                  {selectedCodeProject.title} — Implementation Logic
                </h3>
                <p className="text-xs text-[#6B7280]">Core backend locking / ranking service code</p>
              </div>
              <button onClick={() => setSelectedCodeProject(null)}
                className="p-1.5 rounded-lg bg-[#FAF8F4] hover:bg-[#EAE4D9] text-[#374151]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-end">
                <button onClick={() => handleCopyCode(selectedCodeProject.codeSnippet)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DDD6C9] text-[#111827] text-xs font-bold shadow-sm hover:bg-[#FAF8F4]">
                  {copied ? (
                    <><Check className="w-3.5 h-3.5 text-emerald-600" /><span className="text-emerald-600">Copied</span></>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /><span>Copy Snippet</span></>
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
