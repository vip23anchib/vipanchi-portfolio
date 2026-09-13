import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Mail, ArrowDown, Terminal, Database, Cpu, Layers, Server, Zap } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

// ---------- Animated CountUp ----------
function AnimatedStatCounter({ value }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10px' });

  useEffect(() => {
    if (!isInView) return;
    const isDecimal = value.includes('.');
    const numericTarget = parseFloat(value.replace(/[^0-9.]/g, ''));
    const isK = value.includes('K');
    const isComma = value.includes(',');
    const hasPlus = value.includes('+');
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const cur = numericTarget * ease;
      let fmt = isDecimal ? cur.toFixed(2) : isComma ? Math.floor(cur).toLocaleString() : Math.floor(cur).toString();
      if (isK) fmt += 'K';
      if (hasPlus) fmt += '+';
      setDisplayValue(fmt);
      if (p < 1) requestAnimationFrame(tick);
      else setDisplayValue(value);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

// ---------- Skill chips that orbit around the photo ----------
const SKILL_CHIPS = [
  { id: 'python',   label: 'Python',      Icon: Terminal, color: '#1B5FA8', bg: '#EFF6FF', angle:  -20 },
  { id: 'django',   label: 'Django DRF',  Icon: Server,   color: '#047857', bg: '#ECFDF5', angle:   40 },
  { id: 'postgres', label: 'PostgreSQL',  Icon: Database, color: '#1D4ED8', bg: '#EFF6FF', angle:  110 },
  { id: 'etl',      label: 'ETL / AI',    Icon: Cpu,      color: '#C2410C', bg: '#FFF7ED', angle:  180 },
  { id: 'react',    label: 'React.js',    Icon: Layers,   color: '#7E347D', bg: '#FAF5FF', angle:  250 },
  { id: 'async',    label: 'AsyncIO',     Icon: Zap,      color: '#D97706', bg: '#FFFBEB', angle:  310 },
];

function OrbitChips() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let raf;
    const tick = () => {
      setAngle(prev => (prev + 0.18) % 360);   // very slow drift
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Responsive orbit radii — we'll use CSS values via inline style
  const rX = 185;  // horizontal radius (px) in SVG space
  const rY = 195;  // vertical radius (px)

  return (
    <div className="absolute inset-0 pointer-events-none">
      {SKILL_CHIPS.map((chip) => {
        const baseAngle = chip.angle + angle;
        const rad = (baseAngle * Math.PI) / 180;
        // Center of the photo frame is at 50% / 50% — position chips using %
        const cx = 50 + (rX / 4.2) * Math.cos(rad);   // % of container width
        const cy = 50 + (rY / 4.2) * Math.sin(rad);   // % of container height
        const Icon = chip.Icon;

        return (
          <div
            key={chip.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${cx}%`,
              top: `${cy}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl shadow-lg border text-[11px] font-black whitespace-nowrap backdrop-blur-sm"
              style={{
                backgroundColor: chip.bg,
                borderColor: chip.color + '40',
                color: chip.color,
                boxShadow: `0 4px 16px -4px ${chip.color}30, 0 2px 6px rgba(0,0,0,0.08)`,
              }}
            >
              <Icon className="w-3 h-3 shrink-0" />
              <span>{chip.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- Animated train dot looping an ellipse around the photo ----------
function OrbitTrain() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let raf;
    const tick = () => {
      setAngle(prev => (prev + 0.35) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const rad = (angle * Math.PI) / 180;
  const rX = 185;
  const rY = 195;
  const cx = 50 + (rX / 4.2) * Math.cos(rad);
  const cy = 50 + (rY / 4.2) * Math.sin(rad);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${cx}%`,
        top: `${cy}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative">
        <div className="w-3.5 h-3.5 rounded-full bg-[#D99B16] border-2 border-white shadow-md" />
        <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-[#D99B16] animate-ping opacity-50" />
      </div>
    </div>
  );
}

// ---------- The hero orbit ellipse path (SVG) ----------
function OrbitPath() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 420 420"
      preserveAspectRatio="xMidYMid meet"
    >
      <ellipse
        cx="210"
        cy="210"
        rx="175"
        ry="185"
        fill="none"
        stroke="#1B5FA8"
        strokeWidth="1.5"
        strokeDasharray="6 10"
        opacity="0.18"
      />
      <ellipse
        cx="210"
        cy="210"
        rx="175"
        ry="185"
        fill="none"
        stroke="#1B5FA8"
        strokeWidth="0.5"
        opacity="0.08"
      />
    </svg>
  );
}

// ---------- Main Hero ----------
export default function Hero({ onOpenContact }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden">

      {/* ─── Page-wide ambient glows ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left warm glow — behind the text column */}
        <div
          className="absolute -left-32 top-0 w-[650px] h-[520px] rounded-full opacity-[0.55] blur-[90px]"
          style={{ background: 'radial-gradient(ellipse at 40% 40%, #1B5FA822 0%, #1B5FA808 50%, transparent 80%)' }}
        />
        {/* Right cool glow — behind the photo */}
        <div
          className="absolute -right-24 top-4 w-[520px] h-[520px] rounded-full opacity-[0.60] blur-[80px]"
          style={{ background: 'radial-gradient(ellipse, #1B5FA820 0%, #7E347D12 50%, transparent 80%)' }}
        />
        {/* Subtle warm gold pinspot */}
        <div
          className="absolute right-1/3 bottom-0 w-64 h-64 rounded-full blur-[60px] opacity-[0.20]"
          style={{ background: '#D99B16' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ═══════════════════════════════════════
              LEFT COLUMN  — Text, Heading, CTAs
          ═══════════════════════════════════════ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-7 relative space-y-6"
          >
            {/* Soft glassmorphic glow panel behind the left text */}
            <div
              className="absolute -inset-6 -z-10 rounded-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 30% 40%, rgba(27,95,168,0.07) 0%, rgba(27,95,168,0.03) 50%, transparent 80%)',
              }}
            />

            {/* Status badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DDD6C9] shadow-sm hover:shadow-md transition-shadow">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black text-[#111827]">
                  Available for SDE & Backend Roles • 2027 Grad (9.04 CGPA)
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-6xl font-black tracking-tight text-[#111827] font-sans leading-[1.08]">
                Hi, I'm{' '}
                <span className="relative inline-block">
                  <span className="text-metro-backend">Vipanchi Barman</span>
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full opacity-40"
                    style={{ background: 'linear-gradient(90deg, #1B5FA8, #7E347D)' }}
                  />
                </span>
                .
              </h1>
              <p className="text-xl sm:text-2xl font-black text-[#374151] tracking-tight">
                Backend & Data Systems Engineer
              </p>
            </motion.div>

            {/* Pitch */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-[1.05rem] text-[#374151] leading-relaxed font-medium max-w-xl"
            >
              {portfolioData.personal.tagline} Building robust, concurrency-safe services with Python, Django REST Framework, PostgreSQL row-level locks, and scalable ETL/AI workflows.
            </motion.p>

            {/* CTA buttons */}
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

              {/* Social links */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F4] text-[#111827] font-bold text-xs border border-[#DDD6C9] hover:border-[#111827] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <GithubIcon className="w-4 h-4 text-[#111827]" />
                  <span>GitHub</span>
                </a>
                <a href={portfolioData.personal.leetcode} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F4] text-[#111827] font-bold text-xs border border-[#DDD6C9] hover:border-[#FFA116] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <LeetcodeIcon className="w-4 h-4 text-[#FFA116]" />
                  <span>LeetCode</span>
                </a>
                <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F4] text-[#111827] font-bold text-xs border border-[#DDD6C9] hover:border-[#0A66C2] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* ═══════════════════════════════════════
              RIGHT COLUMN — Photo + orbiting skills
          ═══════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-6 xl:col-span-5 flex items-center justify-center"
          >
            {/* Outer container — gives space for chips to orbit */}
            <div className="relative w-[380px] h-[420px] sm:w-[420px] sm:h-[460px] flex items-center justify-center">

              {/* 1. Dashed orbit ellipse path */}
              <OrbitPath />

              {/* 2. Soft radial glow blob behind the photo */}
              <div
                className="absolute inset-[50px] rounded-full blur-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse, rgba(27,95,168,0.20) 0%, rgba(126,52,125,0.12) 55%, transparent 80%)',
                  transform: 'scale(1.15)',
                }}
              />

              {/* 3. Photo frame */}
              <div className="relative z-10">
                {/* Outer decorative ring */}
                <div
                  className="absolute -inset-[6px] rounded-[2.5rem] pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(27,95,168,0.35) 0%, rgba(126,52,125,0.25) 50%, rgba(217,155,22,0.20) 100%)',
                    padding: '2px',
                    borderRadius: '2.5rem',
                  }}
                >
                  <div className="w-full h-full rounded-[2.3rem] bg-[#FAF8F4]" />
                </div>

                {/* Photo itself */}
                <div
                  className="relative w-[220px] h-[260px] sm:w-[245px] sm:h-[290px] rounded-[2.25rem] overflow-hidden border-[3px] border-white shadow-2xl"
                  style={{
                    boxShadow: '0 20px 60px -12px rgba(27,95,168,0.28), 0 8px 24px -6px rgba(0,0,0,0.15), 0 0 0 4px rgba(27,95,168,0.10)',
                  }}
                >
                  <img
                    src="/vipanchi-photo.png"
                    alt="Vipanchi Barman"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(27,30,41,0.28) 0%, transparent 100%)',
                    }}
                  />
                </div>

                {/* "VIT Bhopal CSE" label beneath the photo */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#DDD6C9] shadow-lg text-[11px] font-black text-[#111827]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    VIT Bhopal · CSE
                  </div>
                </div>
              </div>

              {/* 4. Orbiting skill chips */}
              <OrbitChips />

              {/* 5. Small train marker zipping along the orbit */}
              <OrbitTrain />

            </div>
          </motion.div>

        </div>

        {/* ─── Stat Cards ─── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-16 pt-8 border-t border-[#DDD6C9]"
        >
          {portfolioData.personal.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDD6C9] shadow-sm hover:shadow-md flex flex-col justify-center transition-all duration-300 hover:-translate-y-1.5 hover:border-metro-backend/40 cursor-default group"
            >
              <div className="text-2xl sm:text-3xl font-black text-[#111827] font-sans tracking-tight group-hover:text-metro-backend transition-colors">
                <AnimatedStatCounter value={stat.value} />
                <span className="text-metro-backend text-lg">{stat.suffix}</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#374151] mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#6B7280] mt-0.5">
                {stat.detail}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
