import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-28 bg-[#FAF8F4] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-metro-backend font-bold text-xs uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Professional Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-ink-primary tracking-tight font-sans">
            Work Experience
          </h2>
          <p className="text-sm text-ink-secondary mt-1 max-w-2xl font-medium">
            Software engineering internships building production backend APIs, data pipelines, and AI-driven screening workflows.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="space-y-6">
          {portfolioData.experience.map((exp, idx) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper hover:shadow-paper-lg space-y-5 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EAE4D9]">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="px-3 py-0.5 rounded-full text-xs font-black bg-metro-backend/10 text-metro-backend border border-metro-backend/20">
                      {exp.type}
                    </span>
                    <span className="text-xs text-ink-muted font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-metro-backend" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-ink-primary font-sans group-hover:text-metro-backend transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-extrabold text-ink-secondary mt-0.5">
                    {exp.company}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FAF8F4] text-ink-primary text-xs font-black border border-[#DDD6C9] shadow-xs self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-metro-backend" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                {exp.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-ink-secondary leading-relaxed font-medium">
                    <CheckCircle2 className="w-4 h-4 text-metro-backend shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Metrics Pill & Tech Stack */}
              <div className="pt-4 border-t border-[#EAE4D9] flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-[#FAF8F4] text-ink-secondary text-xs font-semibold border border-[#DDD6C9] hover:bg-white hover:border-metro-backend/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* System Metrics */}
                {exp.systemMetrics && (
                  <div className="px-3.5 py-1.5 rounded-xl bg-[#FAF8F4] text-ink-primary text-xs font-bold border border-[#DDD6C9] shrink-0 shadow-xs">
                    {exp.systemMetrics}
                  </div>
                )}

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
