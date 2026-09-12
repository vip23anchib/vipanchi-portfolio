import React from 'react';
import { X, GraduationCap, MapPin, Mail, Phone, Award, Download, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons';
import { portfolioData } from '../../data/portfolioData';

export default function TransitAboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0F121A] text-zinc-100 rounded-xl border-2 border-metro-yellow shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-black border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-metro-yellow text-black flex items-center justify-center font-black text-sm">
              VB
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black uppercase text-white font-sans">
                Stationmaster Profile // Vipanchi Barman
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Backend & Data Systems Engineer • VIT Bhopal Terminus (9.04 CGPA)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* Bio Box */}
          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 leading-relaxed text-zinc-300">
            <p className="mb-2 font-semibold text-white">
              Architecting high-concurrency backends, normalized relational data stores, and AI-driven telemetry pipelines.
            </p>
            <p className="text-zinc-400">
              Proficient in Python, Django REST Framework, PostgreSQL concurrency locking (`select_for_update()`), distributed ETL pipelines, and audio/LLM integrations (Whisper, PyAnnote, Gemini API).
            </p>
          </div>

          {/* Academic Background */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-metro-yellow mb-2.5 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Track & Degree</span>
            </h3>
            <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-extrabold text-white text-sm">
                  {portfolioData.education.institution}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/30">
                  CGPA: {portfolioData.education.cgpa}
                </span>
              </div>
              <div className="text-zinc-400 text-xs font-mono">
                {portfolioData.education.degree} in {portfolioData.education.major} • {portfolioData.education.expectedGraduation}
              </div>

              <div className="pt-2">
                <div className="text-[11px] font-mono text-zinc-400 uppercase font-bold mb-1.5">
                  Core Computer Science Coursework:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {portfolioData.education.coursework.map((course, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-zinc-300 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-metro-yellow"></span>
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-metro-yellow mb-2.5">
              Network Operating Highlights
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {portfolioData.personal.stats.map((st, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
                  <div className="text-sm sm:text-base font-black text-white font-mono">
                    {st.value}{st.suffix}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Dispatch Links */}
          <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-mono transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{portfolioData.personal.email}</span>
              </a>
            </div>

            <a
              href="/Barman_Vipanchi_Resume_10-09-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded bg-metro-backend hover:bg-blue-600 text-white font-bold text-xs transition shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Timetable / Resume PDF</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
