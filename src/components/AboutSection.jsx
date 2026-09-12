import React from 'react';
import { GraduationCap, ShieldCheck, Database, Cpu, Workflow, Terminal, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function AboutSection({ onOpenAboutModal }) {
  const { education, personal } = portfolioData;

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-white/10 gap-4">
          <div>
            <span className="font-mono text-xs text-cyan-glow uppercase tracking-[0.2em]">
              // 01. ARCHITECTURAL PROFILE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Engineering Mindset & Education
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-md">
            Dedicated to scalable backends, reliable data ingestion, and disciplined database design.
          </p>
        </div>

        {/* Bento Layout Grid for About */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Story Card (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 space-y-6">
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Hi, I'm <strong className="text-white">Vipanchi Barman</strong>. I specialize in designing and implementing backend services that prioritize 
                <span className="text-cyan-glow font-medium"> data integrity, low query latency,</span> and <span className="text-emerald-telemetry font-medium">operational resilience</span>.
              </p>
              <p>
                Whether it's orchestrating a 15+ REST endpoint B2B SaaS platform at <strong className="text-slate-100">Meslova Systems</strong>, designing concurrency-safe booking engines with pessimistic locks at <strong className="text-slate-100">AyuSetu</strong>, or profiling 100K+ transactional ledgers for forensic audit anomalies at <strong className="text-slate-100">AuditLens</strong>, my priority is writing clean, tested, and maintainable software.
              </p>
            </div>

            {/* Core Competencies Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: "Concurrency Safety", desc: "select_for_update() row locking & partial indexes" },
                { title: "Normalized Schemas", desc: "8+ entity schemas with indexed queries" },
                { title: "Idempotent ETL", desc: "Automated ingestion with validation checks" },
                { title: "AI & Speech Pipelines", desc: "OpenAI, Gemini, Whisper & PyAnnote" },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-surface-950/60 border border-white/5 space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-mono text-cyan-glow">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-telemetry" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pl-5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & University Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center space-x-2 text-cyan-glow">
                  <GraduationCap className="w-5 h-5" />
                  <span className="font-mono text-xs uppercase font-bold tracking-wider">ACADEMIC FOUNDATION</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-telemetry/15 text-emerald-telemetry border border-emerald-telemetry/30 text-xs font-mono font-bold">
                  {education.cgpa} CGPA
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                {education.institution}
              </h3>
              <p className="text-xs font-mono text-cyan-glow/90 mb-4">
                {education.degree} — {education.major}
              </p>
              <p className="text-xs text-slate-400 font-mono mb-4">
                Graduation Timeline: <span className="text-slate-200">{education.expectedGraduation}</span>
              </p>

              {/* Coursework Tags */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Key Coursework:</span>
                <div className="flex flex-wrap gap-1.5">
                  {education.coursework.slice(0, 5).map((course, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-surface-950 text-[11px] text-slate-300 font-mono border border-white/5">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={onOpenAboutModal}
              className="w-full py-2.5 rounded-lg bg-surface-900 hover:bg-surface-850 border border-white/10 hover:border-cyan-glow/40 text-xs font-mono text-slate-300 hover:text-cyan-glow transition-all cursor-pointer text-center"
            >
              Inspect Complete Academic Spec & Modules →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
