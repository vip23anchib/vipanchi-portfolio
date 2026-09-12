import React, { useState } from 'react';
import { 
  ExternalLink, 
  Code2, 
  Layers, 
  Database, 
  Activity, 
  CheckCircle2, 
  Cpu, 
  Terminal,
  Copy,
  Check
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function ProjectsSection() {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState("All");
  const [activeTabs, setActiveTabs] = useState({});
  const [copiedCodeId, setCopiedCodeId] = useState(null);

  const categories = ["All", "Backend & Systems", "Backend & AI", "Data & Analytics", "Full Stack"];

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(p => p.category === filter);

  const getActiveTab = (projectId) => {
    return activeTabs[projectId] || "overview";
  };

  const setActiveTab = (projectId, tab) => {
    setActiveTabs(prev => ({
      ...prev,
      [projectId]: tab
    }));
  };

  const handleCopyCode = (projectId, code) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(projectId);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
          <div>
            <span className="font-mono text-xs text-cyan-glow uppercase tracking-[0.2em]">
              // 04. ENGINEERING SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Production & System Projects
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-md">
            Architected with normalized database schemas, concurrency locking, and verifiable code metrics.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-cyan-glow text-obsidian font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'bg-surface-900 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const currentTab = getActiveTab(project.id);
            return (
              <div 
                key={project.id}
                className="rounded-2xl glass-panel border border-white/10 hover:border-cyan-glow/30 flex flex-col justify-between overflow-hidden shadow-2xl transition-all group"
              >
                {/* Project Header Bar */}
                <div className="p-6 pb-4 border-b border-white/10 bg-surface-950/60">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20 text-[11px] font-mono font-bold">
                      {project.category}
                    </span>

                    <div className="flex items-center space-x-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-surface-900 hover:bg-surface-800 text-slate-300 hover:text-cyan-glow border border-white/10 transition-colors"
                          title="View Source on GitHub"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-cyan-glow/20 hover:bg-cyan-glow text-cyan-glow hover:text-obsidian font-bold text-xs flex items-center space-x-1.5 transition-all"
                          title="Open Live Application"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-glow/90 mt-0.5">
                    {project.subtitle}
                  </p>
                </div>

                {/* Interactive Project Tab Selector */}
                <div className="flex border-b border-white/10 bg-surface-900/90 px-6 py-2 text-xs font-mono gap-4 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab(project.id, "overview")}
                    className={`pb-1 transition-colors cursor-pointer whitespace-nowrap ${
                      currentTab === "overview"
                        ? 'text-cyan-glow border-b-2 border-cyan-glow font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Overview & Scope
                  </button>

                  <button
                    onClick={() => setActiveTab(project.id, "architecture")}
                    className={`pb-1 transition-colors cursor-pointer whitespace-nowrap ${
                      currentTab === "architecture"
                        ? 'text-cyan-glow border-b-2 border-cyan-glow font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Architecture & Code
                  </button>

                  <button
                    onClick={() => setActiveTab(project.id, "metrics")}
                    className={`pb-1 transition-colors cursor-pointer whitespace-nowrap ${
                      currentTab === "metrics"
                        ? 'text-cyan-glow border-b-2 border-cyan-glow font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Metrics & Tests
                  </button>
                </div>

                {/* Tab Content Display */}
                <div className="p-6 flex-1 text-sm text-slate-300">
                  
                  {/* TAB 1: OVERVIEW */}
                  {currentTab === "overview" && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <p className="text-slate-300 leading-relaxed text-sm">
                        {project.overview}
                      </p>

                      <div className="space-y-2 pt-2">
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Key Engineering Highlights:</span>
                        <ul className="space-y-2">
                          {project.architecture.slice(0, 3).map((arch, aIdx) => (
                            <li key={aIdx} className="flex items-start space-x-2 text-xs text-slate-300 leading-normal">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-glow shrink-0 mt-0.5" />
                              <span>{arch}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: ARCHITECTURE & CODE */}
                  {currentTab === "architecture" && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div className="space-y-2">
                        {project.architecture.map((arch, aIdx) => (
                          <div key={aIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                            <Layers className="w-3.5 h-3.5 text-cyan-glow shrink-0 mt-0.5" />
                            <span>{arch}</span>
                          </div>
                        ))}
                      </div>

                      {project.codeSnippet && (
                        <div className="relative rounded-lg bg-black/80 border border-white/10 p-3 font-mono text-xs overflow-x-auto">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 mb-2 border-b border-white/5">
                            <span>SYSTEM_SNIPPET</span>
                            <button
                              onClick={() => handleCopyCode(project.id, project.codeSnippet)}
                              className="text-cyan-glow hover:text-white flex items-center space-x-1 cursor-pointer"
                            >
                              {copiedCodeId === project.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-telemetry" />
                                  <span className="text-emerald-telemetry">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="text-cyan-glow/90 leading-snug">
                            <code>{project.codeSnippet}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: METRICS & TESTS */}
                  {currentTab === "metrics" && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(project.metrics).map(([k, v]) => (
                          <div key={k} className="p-3 rounded-lg bg-surface-950/80 border border-white/5 space-y-1">
                            <span className="text-[10px] font-mono uppercase text-slate-500 block truncate">
                              {k.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <span className="text-xs font-bold font-mono text-cyan-glow">
                              {v}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 rounded-lg bg-surface-950 border border-emerald-telemetry/20 text-xs font-mono text-slate-300 flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-emerald-telemetry shrink-0" />
                        <span>VERIFICATION: Validated against edge race conditions & schema constraints.</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Project Footer Tech Badges */}
                <div className="p-6 pt-3 border-t border-white/5 bg-surface-950/40 flex flex-wrap gap-1.5 font-mono text-xs">
                  {project.tech.map((t) => (
                    <span 
                      key={t}
                      className="px-2 py-0.5 rounded bg-surface-900 text-[11px] text-slate-400 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
