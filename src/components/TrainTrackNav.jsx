import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Navigation } from 'lucide-react';

const SECTIONS = [
  { id: 'about', label: 'About', code: 'AB', color: '#1B5FA8' },
  { id: 'skills', label: 'Skills', code: 'SK', color: '#E05A2B' },
  { id: 'network-map', label: 'Interactive Map', code: 'MAP', color: '#1B5FA8' },
  { id: 'experience', label: 'Experience', code: 'EXP', color: '#7E347D' },
  { id: 'projects', label: 'Projects', code: 'PRJ', color: '#1B824C' },
  { id: 'achievements', label: 'Achievements', code: 'ACH', color: '#D99B16' },
  { id: 'contact', label: 'Contact', code: 'CON', color: '#1B5FA8' },
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

  return (
    <aside
      aria-label="Train Track Section Navigation"
      className="fixed right-3 lg:right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center select-none"
    >
      <div className="relative bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-[#DDD6C9] shadow-paper flex flex-col items-center">
        
        {/* Track Top Cap / Route Header */}
        <div className="mb-3 flex flex-col items-center gap-0.5">
          <div className="w-5 h-5 rounded-md bg-[#FAF8F4] border border-[#DDD6C9] flex items-center justify-center">
            <Compass className="w-3 h-3 text-metro-backend animate-spin-slow" />
          </div>
          <span className="text-[8px] font-black tracking-widest uppercase text-ink-muted">
            ROUTE
          </span>
        </div>

        {/* Vertical Railway Track Container */}
        <div className="relative flex flex-col items-center py-1">
          
          {/* Dual Rail Tracks Background */}
          <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-4 flex justify-between pointer-events-none opacity-30">
            {/* Left Rail */}
            <div className="w-[2px] h-full bg-ink-primary rounded-full" />
            {/* Right Rail */}
            <div className="w-[2px] h-full bg-ink-primary rounded-full" />
          </div>

          {/* Rail Ties / Sleepers along the track */}
          <div className="absolute top-3 bottom-3 left-1/2 -translate-x-1/2 w-5 flex flex-col justify-between pointer-events-none opacity-20">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="w-full h-[2px] bg-ink-primary rounded-xs" />
            ))}
          </div>

          {/* Active Colored Transit Line overlay */}
          <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[3px] bg-[#DDD6C9] rounded-full pointer-events-none" />
          
          {/* Animated active track line progress */}
          <motion.div
            className="absolute top-2 left-1/2 -translate-x-1/2 w-[3px] bg-metro-backend rounded-full pointer-events-none"
            style={{
              height: `${(activeIndex / (SECTIONS.length - 1)) * 100}%`,
              transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />

          {/* Station / Bogey Stops */}
          <div className="relative z-10 flex flex-col items-center space-y-5 py-1">
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
                    className={`relative z-10 flex items-center justify-center transition-all duration-300 rounded-full cursor-pointer group ${
                      isActive
                        ? 'w-7 h-7 bg-white border-2 border-metro-backend shadow-md scale-110'
                        : 'w-5 h-5 bg-[#FAF8F4] border-2 border-[#DDD6C9] hover:border-metro-backend hover:scale-110'
                    }`}
                  >
                    {/* Inner active indicator */}
                    {isActive ? (
                      <span
                        className="w-2.5 h-2.5 rounded-full animate-pulse"
                        style={{ backgroundColor: sec.color }}
                      />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A0A9B8] group-hover:bg-metro-backend transition-colors" />
                    )}

                    {/* Active Ping Pulse Ring */}
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-30 pointer-events-none"
                        style={{ backgroundColor: sec.color }}
                      />
                    )}
                  </button>

                  {/* Bogey Marker Flag on Active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBogeyCar"
                      className="absolute -left-2.5 w-1 h-3 rounded-full bg-metro-backend shadow-xs"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Hover Tooltip - Station Destination Sign */}
                  <div
                    className={`absolute right-9 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white border border-[#DDD6C9] shadow-paper-lg whitespace-nowrap pointer-events-none transition-all duration-200 flex items-center gap-2 ${
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
                    <span className="text-xs font-bold text-ink-primary font-sans">
                      {sec.label}
                    </span>
                    <span className="text-[10px] text-ink-muted">
                      0{idx + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Track Bottom Terminus */}
        <div className="mt-3 text-[8px] font-black tracking-wider text-ink-muted uppercase">
          07
        </div>

      </div>
    </aside>
  );
}
