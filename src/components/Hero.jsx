import React from 'react';
import { 
  Database, 
  Cpu, 
  GitBranch, 
  Terminal as TerminalIcon, 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero({ onOpenTerminal, onOpenAbout }) {
  const { personal, education } = portfolioData;

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Cyber Grid & Ambient Glows */}
      <div className="absolute inset-0 cyber-bg opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-glow/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-telemetry/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Telemetry Capsule */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-surface-900/90 border border-cyan-glow/30 text-xs font-mono text-slate-300 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-telemetry animate-pulse" />
            <span className="text-cyan-glow font-semibold">SYSTEM STATUS:</span>
            <span>{personal.status}</span>
          </div>

          <button
            onClick={onOpenAbout}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-surface-900/70 hover:bg-surface-850 border border-white/10 text-xs font-mono text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-telemetry" />
            <span>VIT Bhopal CSE • 9.04 CGPA</span>
          </button>
        </div>

        {/* Monolithic Heading & Lead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Authoritative Technical Pitch */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-glow">
                // DISTRIBUTED ARCHITECTURE & RELATIONAL DATA PIPELINES
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                {personal.name.split(' ')[0]} <span className="text-gradient-cyan">{personal.name.split(' ')[1]}</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-300 tracking-wide font-mono pt-1">
                {personal.title}
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              B.Tech Computer Science student at <span className="text-slate-200 font-medium">VIT Bhopal</span> with a <span className="text-cyan-glow font-bold font-mono">9.04 CGPA</span>. 
              Engineering production-ready backends, concurrency-safe transactional workflows with <span className="text-slate-200 font-mono text-sm">select_for_update()</span>, 
              scalable <span className="text-slate-200 font-medium">Django REST Framework</span> APIs, and forensic data audit analytics.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-glow to-teal-400 text-obsidian font-bold text-sm flex items-center space-x-2 hover:opacity-95 hover:shadow-[0_0_20px_rgba(0,242,254,0.35)] transition-all cursor-pointer"
              >
                <span>Explore Architecture & Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-5 py-3 rounded-lg bg-surface-900 hover:bg-surface-850 border border-white/15 hover:border-cyan-glow/40 text-slate-200 font-semibold text-sm flex items-center space-x-2 transition-all shadow-sm"
              >
                <Download className="w-4 h-4 text-cyan-glow" />
                <span>Resume PDF</span>
              </a>

              <button
                onClick={onOpenTerminal}
                className="px-4 py-3 rounded-lg bg-surface-950 border border-cyan-glow/20 text-xs font-mono text-slate-300 hover:text-cyan-glow hover:border-cyan-glow flex items-center space-x-2 transition-all cursor-pointer"
              >
                <TerminalIcon className="w-4 h-4 text-cyan-glow" />
                <span>$ query_system</span>
              </button>
            </div>

            {/* Core Tech Stack Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-slate-400">
              <span className="text-slate-500 uppercase tracking-wider text-[11px] mr-1">Stack:</span>
              {["Python", "Django / DRF", "PostgreSQL", "SQL (CTEs/Window)", "PyAnnote / Whisper", "React", "Tailwind"].map((tech) => (
                <span 
                  key={tech}
                  className="px-2.5 py-1 rounded bg-surface-900 border border-white/5 text-slate-300 hover:border-cyan-glow/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Telemetry HUD Card */}
          <div className="lg:col-span-4 w-full">
            <div className="rounded-xl glass-panel p-5 border border-white/10 shadow-2xl relative group">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-emerald-telemetry animate-pulse" />
                  <span className="font-semibold text-slate-200">ENGINEERING_TELEMETRY</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-cyan-glow/10 text-cyan-glow text-[10px] font-bold">
                  v2026.09
                </span>
              </div>

              {/* Live Metric Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {personal.stats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-lg bg-surface-950/70 border border-white/5 hover:border-cyan-glow/20 transition-all"
                  >
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                      {stat.value}
                      <span className="text-xs font-normal text-slate-400">{stat.suffix}</span>
                    </div>
                    <div className="text-[11px] font-medium text-cyan-glow/90 truncate mt-0.5">
                      {stat.label}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {stat.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick CLI Query Prompt */}
              <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-xs space-y-1.5">
                <div className="text-slate-500 flex items-center justify-between text-[11px]">
                  <span>// LIVE REPL RUNNER</span>
                  <span className="text-emerald-telemetry flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-telemetry mr-1" />
                    ONLINE
                  </span>
                </div>
                <div className="text-cyan-glow font-medium">
                  $ curl https://api.vipanchi.dev/v1/profile
                </div>
                <div className="text-slate-400 text-[11px] space-y-0.5 pl-2 border-l border-cyan-glow/30">
                  <p>{"{"} "degree": "B.Tech CSE", "cgpa": 9.04 {"}"}</p>
                  <p>{"{"} "internships": ["Meslova Systems", "Saurabhi Media"] {"}"}</p>
                </div>
              </div>

              {/* View Deep Bio Action */}
              <button
                onClick={onOpenAbout}
                className="w-full mt-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-glow/30 text-xs font-mono text-slate-300 hover:text-cyan-glow flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>View Full Academic & Systems Bio</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
