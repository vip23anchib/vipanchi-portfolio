import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';

const SECTIONS = [
  { id: 'about', label: 'About', code: 'AB', color: '#1B5FA8', num: '01' },
  { id: 'skills', label: 'Skills', code: 'SK', color: '#E05A2B', num: '02' },
  { id: 'network-map', label: 'Interactive Map', code: 'MAP', color: '#1B5FA8', num: '03' },
  { id: 'experience', label: 'Experience', code: 'EXP', color: '#7E347D', num: '04' },
  { id: 'projects', label: 'Projects', code: 'PRJ', color: '#1B824C', num: '05' },
  { id: 'achievements', label: 'Achievements', code: 'ACH', color: '#D99B16', num: '06' },
  { id: 'contact', label: 'Contact', code: 'CON', color: '#1B5FA8', num: '07' },
];

export default function TrainTrackNav() {
  const [activeSection, setActiveSection] = useState('about');
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    // Intersection Observer to detect active section
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const activeIndex = Math.max(0, SECTIONS.findIndex((s) => s.id === activeSection));
  const activeSectionData = SECTIONS[activeIndex] || SECTIONS[0];

  return (
    <aside
      aria-label="Train Track Section Navigation"
      className="fixed right-3 lg:right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center select-none"
    >
      <div className="relative bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border-2 border-[#DDD6C9] shadow-paper-lg flex flex-col items-center">
        
        {/* Track Top Cap / Header */}
        <div className="mb-3 flex flex-col items-center gap-0.5">
          <div className="w-5 h-5 rounded-md bg-[#121622] text-white flex items-center justify-center shadow-xs">
            <Compass className="w-3 h-3 text-blue-400 animate-spin-slow" />
          </div>
          <span className="text-[8px] font-black tracking-widest uppercase text-ink-muted">
            ROUTE
          </span>
        </div>

        {/* Vertical Railway Track Canvas */}
        <div className="relative flex flex-col items-center py-2 w-8">
          
          {/* Dual Parallel Steel Rails */}
          <div className="absolute top-1 bottom-1 left-2 w-[2.5px] bg-[#94A3B8] rounded-full pointer-events-none" />
          <div className="absolute top-1 bottom-1 right-2 w-[2.5px] bg-[#94A3B8] rounded-full pointer-events-none" />

          {/* Perpendicular Rail Ties / Sleepers along the whole track */}
          <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-6 flex flex-col justify-between pointer-events-none opacity-40">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="w-full h-[2px] bg-[#64748B] rounded-xs" />
            ))}
          </div>

          {/* Active Colored Transit Line overlay */}
          <motion.div
            className="absolute top-1 left-1/2 -translate-x-1/2 w-[3px] rounded-full pointer-events-none"
            style={{
              backgroundColor: activeSectionData.color,
              height: `${(activeIndex / (SECTIONS.length - 1)) * 100}%`,
              transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease'
            }}
          />

          {/* Smoothly Sliding Train Car (Locomotive Vehicle) */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center"
            animate={{
              top: `${activeIndex * 42 + 2}px`
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 26
            }}
          >
            {/* Train Car Body */}
            <div
              className="w-7 h-5 rounded-md shadow-md flex items-center justify-center relative border border-white/40"
              style={{ backgroundColor: activeSectionData.color }}
            >
              {/* Train Headlight Beam */}
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse absolute -top-1 shadow-sm" />
              
              {/* Window slits */}
              <div className="flex gap-0.5">
                <div className="w-1 h-2 bg-white/90 rounded-xs" />
                <div className="w-1 h-2 bg-white/90 rounded-xs" />
                <div className="w-1 h-2 bg-white/90 rounded-xs" />
              </div>

              {/* Side Flange Wheels */}
              <div className="absolute -left-1 top-0.5 w-1 h-1.5 bg-[#1E293B] rounded-xs" />
              <div className="absolute -left-1 bottom-0.5 w-1 h-1.5 bg-[#1E293B] rounded-xs" />
              <div className="absolute -right-1 top-0.5 w-1 h-1.5 bg-[#1E293B] rounded-xs" />
              <div className="absolute -right-1 bottom-0.5 w-1 h-1.5 bg-[#1E293B] rounded-xs" />
            </div>
          </motion.div>

          {/* Station Milestone Stops */}
          <div className="relative z-10 flex flex-col items-center space-y-7 py-1">
            {SECTIONS.map((sec, idx) => {
              const isActive = activeSection === sec.id;
              const isHovered = hoveredSection === sec.id;

              return (
                <div
                  key={sec.id}
                  className="relative flex items-center justify-center"
                  onMouseEnter={() => setHoveredSection(sec.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  {/* Station Node / Bogey Button */}
                  <button
                    onClick={() => scrollToSection(sec.id)}
                    aria-label={`Scroll to ${sec.label} section`}
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'opacity-0 scale-75' // Hidden because the train car is sitting on top of it!
                        : 'bg-white border-2 border-[#94A3B8] hover:border-metro-backend hover:scale-125 shadow-xs'
                    }`}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#64748B]" />
                  </button>

                  {/* Station Number Indicator beside track */}
                  <span className={`absolute -right-4 text-[7px] font-mono font-bold ${isActive ? 'text-metro-backend font-black' : 'text-slate-400'}`}>
                    {sec.num}
                  </span>

                  {/* Hover Tooltip - Station Destination Sign */}
                  <div
                    className={`absolute right-10 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#121622] text-white border border-[#2D3748] shadow-paper-lg whitespace-nowrap pointer-events-none transition-all duration-200 flex items-center gap-2 ${
                      isHovered
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-2 pointer-events-none'
                    }`}
                  >
                    {/* Line badge */}
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-black text-white shadow-xs"
                      style={{ backgroundColor: sec.color }}
                    >
                      {sec.code}
                    </span>
                    <span className="text-xs font-bold font-sans">
                      {sec.label}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Station {sec.num}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Track Bottom Terminus */}
        <div className="mt-3 text-[8px] font-black tracking-wider text-ink-muted uppercase">
          VIT ➔ ROLE
        </div>

      </div>
    </aside>
  );
}

