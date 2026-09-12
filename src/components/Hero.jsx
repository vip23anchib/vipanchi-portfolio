import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, ArrowDown, Sparkles, MapPin, Database, Server, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero({ onOpenContact }) {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl space-y-6">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DDD6C9] shadow-paper-card"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-xs font-bold text-ink-primary">
              Available for SDE & Backend Roles • 2027 Grad (9.04 CGPA)
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-ink-primary font-sans leading-[1.1]">
              Hi, I’m <span className="text-metro-backend underline decoration-metro-backend/30 underline-offset-8">Vipanchi Barman</span>.
            </h1>
            <p className="text-xl sm:text-2xl font-extrabold text-ink-secondary tracking-tight">
              Backend & Data Systems Engineer
            </p>
          </motion.div>

          {/* Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-ink-secondary leading-relaxed font-sans max-w-2xl"
          >
            {portfolioData.personal.tagline} Building robust, concurrency-safe services with Python, Django REST Framework, PostgreSQL row-level locks, and scalable ETL/AI workflows.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#network-map"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-metro-backend hover:bg-[#154E8C] text-white font-bold text-sm shadow-paper transition"
            >
              <ArrowDown className="w-4 h-4" />
              <span>Explore Interactive Map</span>
            </a>

            <a
              href="/Barman_Vipanchi_Resume_10-09-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#FAF8F4] text-ink-primary font-bold text-sm border border-[#DDD6C9] shadow-paper transition"
            >
              <Download className="w-4 h-4 text-metro-backend" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={onOpenContact}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F4EFE6] hover:bg-[#EAE4D9] text-ink-primary font-bold text-sm border border-[#DDD6C9] transition"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </button>
          </motion.div>

        </div>

        {/* Highlight Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 pt-8 border-t border-[#DDD6C9]"
        >
          {portfolioData.personal.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper-card flex flex-col justify-center"
            >
              <div className="text-2xl sm:text-3xl font-black text-ink-primary font-sans tracking-tight">
                {stat.value}<span className="text-metro-backend text-lg">{stat.suffix}</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-ink-secondary mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-ink-muted mt-0.5">
                {stat.detail}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
