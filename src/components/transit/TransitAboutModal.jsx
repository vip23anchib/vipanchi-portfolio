import React from 'react';
import { X, GraduationCap, MapPin, Mail, Phone, Award, Download, User } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '../Icons';
import { portfolioData } from '../../data/portfolioData';

export default function TransitAboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF8F4] text-ink-primary rounded-2xl border border-[#DDD6C9] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 bg-white border-b border-[#DDD6C9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-ink-primary text-white flex items-center justify-center font-bold text-sm shadow-sm">
              VB
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-ink-primary font-sans">
                About Vipanchi Barman
              </h2>
              <p className="text-xs text-ink-muted">
                Backend & Data Systems Engineer • VIT Bhopal (9.04 CGPA)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE4D9] text-ink-secondary hover:text-ink-primary transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* Bio Box */}
          <div className="p-4 rounded-xl bg-white border border-[#DDD6C9] leading-relaxed text-ink-secondary shadow-paper-card">
            <p className="mb-2 font-bold text-ink-primary">
              Specializing in high-concurrency backends, relational schema architecture, and AI-driven data pipelines.
            </p>
            <p>
              I am a Computer Science undergraduate at VIT Bhopal with an academic CGPA of 9.04 / 10.0. I focus heavily on writing clean, concurrency-safe Python/Django systems, relational database locking with <code className="px-1.5 py-0.5 rounded bg-[#F4EFE6] font-mono text-xs font-semibold">select_for_update()</code>, ETL data processing in SQL & Pandas, and integrating speech-to-text / LLM pipelines (Whisper, PyAnnote, Gemini API).
            </p>
          </div>

          {/* Academic Background */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-primary mb-2.5 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-metro-backend" />
              <span>Education & Academics</span>
            </h3>
            <div className="p-4 rounded-xl bg-white border border-[#DDD6C9] space-y-3 shadow-paper-card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-extrabold text-ink-primary text-sm">
                  {portfolioData.education.institution}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300">
                  CGPA: {portfolioData.education.cgpa}
                </span>
              </div>
              <div className="text-ink-muted text-xs">
                {portfolioData.education.degree} in {portfolioData.education.major} • {portfolioData.education.expectedGraduation}
              </div>

              <div className="pt-2 border-t border-[#DDD6C9]">
                <div className="text-[11px] font-semibold text-ink-muted uppercase mb-2">
                  Key Computer Science Coursework:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {portfolioData.education.coursework.map((course, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-ink-secondary text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-metro-backend"></span>
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-primary mb-2.5">
              Engineering Experience Highlights
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {portfolioData.personal.stats.map((st, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-[#DDD6C9] text-center shadow-paper-card">
                  <div className="text-base font-extrabold text-ink-primary">
                    {st.value}{st.suffix}
                  </div>
                  <div className="text-[11px] text-ink-muted mt-0.5">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links & Download */}
          <div className="pt-4 border-t border-[#DDD6C9] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white hover:bg-[#F4EFE6] text-ink-secondary hover:text-ink-primary border border-[#DDD6C9] shadow-sm transition"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white hover:bg-[#F4EFE6] text-ink-secondary hover:text-ink-primary border border-[#DDD6C9] shadow-sm transition"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.personal.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white hover:bg-[#F4EFE6] text-ink-secondary hover:text-ink-primary border border-[#DDD6C9] shadow-sm transition"
                title="LeetCode"
              >
                <LeetcodeIcon className="w-4 h-4" />
              </a>
            </div>

            <a
              href="/Barman_Vipanchi_Resume_10-09-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-metro-backend hover:bg-[#154E8C] text-white font-bold text-xs shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume PDF</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
