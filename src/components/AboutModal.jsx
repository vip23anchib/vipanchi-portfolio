import React from 'react';
import { 
  X, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Cpu, 
  Database, 
  GitFork, 
  CheckCircle2, 
  Download,
  Mail,
  ExternalLink
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { personal, education } = portfolioData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel border border-cyan-glow/30 p-6 sm:p-8 text-slate-200 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                About & Academic Profile
              </h2>
              <p className="text-xs font-mono text-cyan-glow">
                SYSTEM SPECIFICATIONS // VIPANCHI BARMAN
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-surface-900 hover:bg-surface-800 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Narrative */}
        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
          <p>
            I am a <strong className="text-white">Computer Science & Engineering undergraduate</strong> at <strong className="text-cyan-glow">Vellore Institute of Technology (VIT), Bhopal</strong>, holding an academic score of <strong className="text-white font-mono">9.04 / 10.0 CGPA</strong> (Expected Graduation: May 2027).
          </p>
          <p>
            My engineering focus centers on <strong className="text-slate-100">backend infrastructure</strong>, <strong className="text-slate-100">distributed ETL pipelines</strong>, and <strong className="text-slate-100">relational database schema architecture</strong>. I enjoy tackling challenging distributed problems: race-free concurrency control using pessimistic locks (<code className="text-cyan-glow bg-surface-950 px-1.5 py-0.5 rounded text-xs">select_for_update()</code>), optimizing complex SQL analytical queries with CTEs and window functions, and integrating LLM/speech pipelines (Whisper, PyAnnote, Gemini, OpenAI).
          </p>
        </div>

        {/* Education Highlight Card */}
        <div className="p-5 rounded-xl bg-surface-950/80 border border-white/10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white">{education.institution}</h3>
              <p className="text-xs font-mono text-cyan-glow">{education.degree} in {education.major}</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 rounded-full bg-emerald-telemetry/15 text-emerald-telemetry border border-emerald-telemetry/30 text-xs font-bold font-mono">
                CGPA: {education.cgpa}
              </span>
              <p className="text-[11px] font-mono text-slate-500 mt-1">{education.expectedGraduation}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <p className="text-xs font-mono text-slate-400 mb-2">RELEVANT COURSEWORK & FOCUS AREAS:</p>
            <div className="flex flex-wrap gap-1.5">
              {education.coursework.map((course, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-surface-900 text-xs text-slate-300 border border-white/5 font-mono">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Engineering Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface-900/60 border border-white/5 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-glow text-sm font-semibold">
              <Database className="w-4 h-4" />
              <span>Data Integrity & Concurrency</span>
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              Designing normalized schemas, partial indexes, and atomic database transactions to guarantee zero double-bookings or race conditions under high concurrent traffic.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-900/60 border border-white/5 space-y-2">
            <div className="flex items-center space-x-2 text-teal-400 text-sm font-semibold">
              <Cpu className="w-4 h-4" />
              <span>Idempotent & Resilient Pipelines</span>
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              Building modular ETL stages, automated watch-folder data validation, and background worker queues with fault isolation and audit logging.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
            <span>📍 {personal.location}</span>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-4 py-2 rounded-lg bg-cyan-glow hover:bg-cyan-400 text-obsidian font-bold text-xs flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-900 hover:bg-surface-800 text-slate-300 text-xs border border-white/10 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
