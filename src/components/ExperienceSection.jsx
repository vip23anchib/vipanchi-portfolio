import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <div className="w-10 h-[3px] bg-metro-backend rounded-full mb-5" />
          <div className="flex items-center gap-2 text-metro-backend font-bold text-xs uppercase tracking-wider mb-2">
            <Briefcase className="w-4 h-4" />
            <span>Professional Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight font-sans">
            Work Experience
          </h2>
          <p className="text-sm text-[#374151] mt-2 max-w-2xl font-medium">
            Software engineering internships building production backend APIs, data pipelines, and AI-driven screening workflows.
          </p>
        </motion.div>

        {/* Content Panel — Timeline layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="rounded-3xl border border-[#E4DDD3] bg-white/50 shadow-[0_2px_24px_rgba(27,95,168,0.06)] p-6 sm:p-10"
        >
          {/* Timeline spine */}
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-5 top-2 bottom-2 w-[2px] bg-gradient-to-b from-metro-backend/40 via-metro-backend/20 to-transparent rounded-full" />

            <div className="space-y-8">
              {portfolioData.experience.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                  className="md:pl-16 relative"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 rounded-full bg-metro-backend/10 border-2 border-metro-backend items-center justify-center">
                    <Briefcase className="w-4 h-4 text-metro-backend" />
                  </div>

                  <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DDD6C9] shadow-sm hover:shadow-md space-y-5 transition-all duration-300 hover:-translate-y-0.5 group">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EAE4D9]">
                      <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className="px-3 py-0.5 rounded-full text-xs font-black bg-metro-backend/10 text-metro-backend border border-metro-backend/20">
                            {exp.type}
                          </span>
                          <span className="text-xs text-[#6B7280] font-bold flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-metro-backend" />
                            {exp.location}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-[#111827] font-sans group-hover:text-metro-backend transition-colors">
                          {exp.role}
                        </h3>
                        <div className="text-sm font-extrabold text-[#374151] mt-0.5">{exp.company}</div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FAF8F4] text-[#111827] text-xs font-black border border-[#DDD6C9] shadow-xs self-start sm:self-auto">
                        <Calendar className="w-3.5 h-3.5 text-metro-backend" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-3">
                      {exp.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#374151] leading-relaxed font-medium">
                          <CheckCircle2 className="w-4 h-4 text-metro-backend shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech & Metrics */}
                    <div className="pt-4 border-t border-[#EAE4D9] flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {exp.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-[#FAF8F4] text-[#374151] text-xs font-semibold border border-[#DDD6C9] hover:bg-white hover:border-metro-backend/40 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {exp.systemMetrics && (
                        <div className="px-3.5 py-1.5 rounded-xl bg-[#FAF8F4] text-[#111827] text-xs font-bold border border-[#DDD6C9] shrink-0 shadow-xs">
                          {exp.systemMetrics}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
