import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Server, Cpu, ArrowUpRight, Shield } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ExperienceSection() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-white/10 gap-4">
          <div>
            <span className="font-mono text-xs text-cyan-glow uppercase tracking-[0.2em]">
              // 03. INDUSTRY TIMELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Engineering Work Experience
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-md">
            Production backend development, asynchronous audio processing pipelines, and automated ETL ingestion.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8 relative">
          
          {/* Vertical Line on large screens */}
          <div className="hidden lg:block absolute left-8 top-6 bottom-6 w-[2px] bg-gradient-to-b from-cyan-glow/60 via-teal-400/40 to-transparent" />

          {experience.map((exp, idx) => (
            <div 
              key={exp.id}
              className="relative lg:pl-20 transition-all group"
            >
              {/* Timeline Indicator Dot */}
              <div className="hidden lg:flex absolute left-6 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-obsidian border-2 border-cyan-glow items-center justify-center group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.6)] transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow" />
              </div>

              {/* Main Experience Box */}
              <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 hover:border-cyan-glow/30 transition-all shadow-xl space-y-5">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20 text-[11px] font-mono font-bold">
                        {exp.type}
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500" />
                        {exp.location}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-cyan-glow/90 font-mono">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 px-3 py-1.5 rounded-lg bg-surface-950 border border-white/5 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-cyan-glow" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* System Metrics Chip */}
                <div className="p-3 rounded-lg bg-surface-950/80 border border-cyan-glow/20 text-xs font-mono text-cyan-glow flex items-center space-x-2">
                  <Server className="w-4 h-4 text-emerald-telemetry shrink-0" />
                  <span className="font-semibold text-slate-300">TELEMETRY:</span>
                  <span className="text-slate-400">{exp.systemMetrics}</span>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-3 text-sm text-slate-300">
                  {exp.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start space-x-3 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-cyan-glow shrink-0 mt-1" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Pills */}
                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-1.5 font-mono text-xs">
                  <span className="text-[11px] text-slate-500 mr-2 uppercase tracking-wider">Technologies:</span>
                  {exp.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 rounded bg-surface-900 border border-white/5 text-slate-300 hover:border-cyan-glow/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
