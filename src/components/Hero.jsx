import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Mail, ArrowDown, Sparkles, MapPin, Database, Server, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import HeroSideTrack from './HeroSideTrack';

// Smooth Count-Up Number Counter Component
function AnimatedStatCounter({ value, suffix }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });

  useEffect(() => {
    if (!isInView) return;

    const isDecimal = value.includes('.');
    const numericTarget = parseFloat(value.replace(/[^0-9.]/g, ''));
    const isK = value.includes('K');
    const isComma = value.includes(',');
    const hasPlus = value.includes('+');

    const duration = 1400; // ms
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = numericTarget * easeProgress;

      let formatted = '';
      if (isDecimal) {
        formatted = currentVal.toFixed(2);
      } else if (isComma) {
        formatted = Math.floor(currentVal).toLocaleString();
      } else {
        formatted = Math.floor(currentVal).toString();
      }

      if (isK) formatted += 'K';
      if (hasPlus) formatted += '+';

      setDisplayValue(formatted);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    const animId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animId);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue}
    </span>
  );
}

export default function Hero({ onOpenContact }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Hero Layout: Text on Left (lg:col-span-7), Train Track on Right (lg:col-span-5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clean, Uncluttered Typography & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DDD6C9] shadow-sm hover:shadow-md transition-shadow">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="text-xs font-black text-[#111827] font-sans">
                  Available for SDE & Backend Roles • 2027 Grad (9.04 CGPA)
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111827] font-sans leading-[1.1]">
                Hi, I’m <span className="text-metro-backend underline decoration-metro-backend/40 underline-offset-8">Vipanchi Barman</span>.
              </h1>
              <p className="text-xl sm:text-2xl font-black text-[#374151] tracking-tight">
                Backend & Data Systems Engineer
              </p>
            </motion.div>

            {/* Pitch */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#374151] leading-relaxed font-sans font-medium max-w-2xl"
            >
              {portfolioData.personal.tagline} Building robust, concurrency-safe services with Python, Django REST Framework, PostgreSQL row-level locks, and scalable ETL/AI workflows.
            </motion.p>

            {/* Action Buttons & Social Links Bar */}
            <motion.div variants={itemVariants} className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#network-map"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-metro-backend hover:bg-[#154E8C] text-white font-bold text-sm shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <ArrowDown className="w-4 h-4" />
                  <span>Explore Interactive Map</span>
                </a>

                <a
                  href="/Barman_Vipanchi_Resume_10-09-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#FAF8F4] text-[#111827] font-bold text-sm border-2 border-[#DDD6C9] hover:border-metro-backend shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <Download className="w-4 h-4 text-metro-backend" />
                  <span>Download Resume</span>
                </a>

                <button
                  onClick={onOpenContact}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F4EFE6] hover:bg-[#EAE4D9] text-[#111827] font-bold text-sm border border-[#DDD6C9] hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow transition-all"
                >
                  <Mail className="w-4 h-4 text-metro-backend" />
                  <span>Get in Touch</span>
                </button>
              </div>

              {/* Social Links Row (GitHub, LeetCode, LinkedIn) */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F4] text-[#111827] font-bold text-xs border border-[#DDD6C9] hover:border-[#111827] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <GithubIcon className="w-4 h-4 text-[#111827]" />
                  <span>GitHub</span>
                </a>

                <a
                  href={portfolioData.personal.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F4] text-[#111827] font-bold text-xs border border-[#DDD6C9] hover:border-[#FFA116] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <LeetcodeIcon className="w-4 h-4 text-[#FFA116]" />
                  <span>LeetCode</span>
                </a>

                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F4] text-[#111827] font-bold text-xs border border-[#DDD6C9] hover:border-[#0A66C2] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Dedicated Vertical Train Track & Connected Skill Bogeys */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <HeroSideTrack />
          </motion.div>

        </div>

        {/* Highlight Metrics Cards with Animated CountUp */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 pt-8 border-t border-[#DDD6C9]"
        >
          {portfolioData.personal.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper-card hover:shadow-paper-lg flex flex-col justify-center transition-all duration-300 hover:-translate-y-1.5 hover:border-metro-backend/40 cursor-default group"
            >
              <div className="text-2xl sm:text-3xl font-black text-ink-primary font-sans tracking-tight group-hover:text-metro-backend transition-colors">
                <AnimatedStatCounter value={stat.value} />
                <span className="text-metro-backend text-lg">{stat.suffix}</span>
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

