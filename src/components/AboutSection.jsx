import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, CheckCircle2, Award, User, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#F4EFE6]/60 border-t border-[#DDD6C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-metro-backend font-bold text-xs uppercase tracking-wider mb-1">
            <User className="w-4 h-4" />
            <span>Background & Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-ink-primary tracking-tight font-sans">
            About Me
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Bio Narrative */}
          <div className="lg:col-span-7 space-y-4 text-ink-secondary text-sm sm:text-base leading-relaxed">
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper hover:shadow-paper-lg transition-all duration-300 space-y-4">
              <p className="font-extrabold text-ink-primary text-base sm:text-lg leading-snug">
                I am a backend developer and data systems engineer who enjoys architecting high-concurrency systems, writing resilient database transactions, and building intelligent data pipelines.
              </p>
              
              <p>
                Currently pursuing my B.Tech in Computer Science and Engineering at <strong>Vellore Institute of Technology (VIT), Bhopal</strong> with a <strong>9.04 / 10.0 CGPA</strong>, I bridge core theoretical computer science with production-grade engineering.
              </p>

              <p>
                During my software internships at <strong>Meslova Systems</strong> and <strong>Saurabhi Media</strong>, I built B2B SaaS backend infrastructures, designed 15+ secure RESTful endpoints with role-based access control (RBAC), engineered watch-folder ETL daemons, and integrated speech-to-text diarization pipelines using Whisper & PyAnnote.
              </p>

              <div className="pt-3 border-t border-[#EAE4D9] flex flex-wrap gap-2.5 text-xs font-semibold text-ink-secondary">
                <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F4] border border-[#DDD6C9] flex items-center gap-1.5 shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-metro-backend" />
                  <span className="font-bold text-ink-primary">Bhopal / Hyderabad / Delhi, India</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F4] border border-[#DDD6C9] flex items-center gap-1.5 shadow-xs">
                  <Award className="w-3.5 h-3.5 text-metro-gold" />
                  <span className="font-bold text-ink-primary">Smart India Hackathon Finalist</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Credential Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper hover:shadow-paper-lg transition-all duration-300 space-y-5">
              
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#EAE4D9]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-metro-backend/10 text-metro-backend flex items-center justify-center font-bold">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-ink-primary text-base sm:text-lg">
                      {portfolioData.education.institution}
                    </h3>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {portfolioData.education.degree} in {portfolioData.education.major}
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs border border-emerald-300 shrink-0">
                  {portfolioData.education.cgpa}
                </span>
              </div>

              <div className="text-xs text-ink-muted font-medium flex items-center justify-between border-b border-[#EAE4D9] pb-3">
                <span>Timeline: 2023 – May 2027</span>
                <span className="font-bold text-ink-primary">Expected Graduation: May 2027</span>
              </div>

              {/* Coursework Badges */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-ink-primary mb-3 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-metro-backend" />
                  <span>Core Computer Science Disciplines</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {portfolioData.education.coursework.map((course, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#FAF8F4] border border-[#DDD6C9] text-xs font-semibold text-ink-secondary flex items-center gap-2 hover:bg-white hover:border-metro-backend/50 hover:shadow-xs transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-metro-backend shrink-0" />
                      <span className="truncate">{course}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
