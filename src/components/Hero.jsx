import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Mail, ArrowDown, Sparkles, MapPin, Database, Server, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

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
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      
      {/* Subtle Animated Transit Network Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Ambient Warm Gradient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-metro-backend/[0.04] rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-metro-data/[0.04] rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-metro-frontend/[0.03] rounded-full blur-3xl" />

        {/* Faint Metro Track Circuit Lines */}
        <svg
          className="w-full h-full opacity-40"
          preserveAspectRatio="none"
          viewBox="0 0 1440 650"
          fill="none"
        >
          {/* Blue Backend Track */}
          <path
            d="M-50,140 C280,90 520,240 920,130 C1140,80 1320,190 1500,160"
            stroke="#1B5FA8"
            strokeWidth="1.8"
            strokeDasharray="6 12"
            className="animate-dash-flow opacity-30"
          />
          {/* Coral Data Track */}
          <path
            d="M-50,280 C320,210 650,380 1080,260 C1280,210 1390,340 1500,310"
            stroke="#E05A2B"
            strokeWidth="1.8"
            strokeDasharray="8 16"
            className="animate-dash-flow-reverse opacity-25"
          />
          {/* Violet ML Track */}
          <path
            d="M120,-30 C240,160 400,340 560,680"
            stroke="#7E347D"
            strokeWidth="1.4"
            strokeDasharray="5 10"
            className="animate-dash-flow opacity-20"
          />

          {/* Gentle pulsing transit station nodes */}
          <circle cx="280" cy="115" r="3.5" fill="#1B5FA8" className="animate-ping opacity-25" />
          <circle cx="280" cy="115" r="2.5" fill="#1B5FA8" className="opacity-40" />
          <circle cx="650" cy="340" r="3.5" fill="#E05A2B" className="animate-ping opacity-25" />
          <circle cx="650" cy="340" r="2.5" fill="#E05A2B" className="opacity-40" />
          <circle cx="1080" cy="260" r="3.5" fill="#1B824C" className="animate-ping opacity-25" />
          <circle cx="1080" cy="260" r="2.5" fill="#1B824C" className="opacity-40" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl space-y-6"
        >
          
          {/* Status Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DDD6C9] shadow-paper-card">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-xs font-bold text-ink-primary">
                Available for SDE & Backend Roles • 2027 Grad (9.04 CGPA)
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-ink-primary font-sans leading-[1.1]">
              Hi, I’m <span className="text-metro-backend underline decoration-metro-backend/30 underline-offset-8">Vipanchi Barman</span>.
            </h1>
            <p className="text-xl sm:text-2xl font-extrabold text-ink-secondary tracking-tight">
              Backend & Data Systems Engineer
            </p>
          </motion.div>

          {/* Pitch */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-ink-secondary leading-relaxed font-sans max-w-2xl"
          >
            {portfolioData.personal.tagline} Building robust, concurrency-safe services with Python, Django REST Framework, PostgreSQL row-level locks, and scalable ETL/AI workflows.
          </motion.p>

          {/* Action Buttons & Social Links Bar */}
          <motion.div variants={itemVariants} className="space-y-3 pt-1">
            <div className="flex flex-wrap items-center gap-3">
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
            </div>

            {/* Social Links Row (GitHub, LeetCode, LinkedIn) */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F4] text-ink-primary font-bold text-xs border border-[#DDD6C9] shadow-paper-card hover:border-metro-backend/40 transition"
              >
                <GithubIcon className="w-4 h-4 text-ink-primary" />
                <span>GitHub</span>
              </a>

              <a
                href={portfolioData.personal.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F4] text-ink-primary font-bold text-xs border border-[#DDD6C9] shadow-paper-card hover:border-[#FFA116]/60 transition"
              >
                <LeetcodeIcon className="w-4 h-4 text-[#FFA116]" />
                <span>LeetCode</span>
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F4] text-ink-primary font-bold text-xs border border-[#DDD6C9] shadow-paper-card hover:border-[#0A66C2]/60 transition"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

        </motion.div>

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
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper-card flex flex-col justify-center transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="text-2xl sm:text-3xl font-black text-ink-primary font-sans tracking-tight">
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

