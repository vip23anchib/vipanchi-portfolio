import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Cpu, Layers, Sparkles, Server, Zap, CheckCircle2 } from 'lucide-react';

const SKILL_BOGEYS = [
  {
    id: 'engine',
    isLocomotive: true,
    title: 'Lead Locomotive',
    badge: 'CORE ENGINE',
    detail: 'Async & Concurrency Master',
    icon: Zap,
    color: '#1B5FA8',
    borderColor: '#93C5FD',
    bg: '#EFF6FF',
    accentDot: '#2563EB',
  },
  {
    id: 'python',
    isLocomotive: false,
    title: 'Python 3.12',
    badge: 'LANG',
    detail: 'AsyncIO • CPython • OOP Architecture',
    icon: Terminal,
    color: '#1B5FA8',
    borderColor: '#93C5FD',
    bg: '#EFF6FF',
    accentDot: '#1D4ED8',
  },
  {
    id: 'django',
    isLocomotive: false,
    title: 'Django REST',
    badge: 'FRAMEWORK',
    detail: 'DRF • JWT Auth • Query Optimization',
    icon: Server,
    color: '#047857',
    borderColor: '#A7F3D0',
    bg: '#ECFDF5',
    accentDot: '#059669',
  },
  {
    id: 'postgres',
    isLocomotive: false,
    title: 'PostgreSQL',
    badge: 'DATABASE',
    detail: 'Row-Level Locks • ACID • Indexing',
    icon: Database,
    color: '#1D4ED8',
    borderColor: '#BFDBFE',
    bg: '#EFF6FF',
    accentDot: '#2563EB',
  },
  {
    id: 'etl',
    isLocomotive: false,
    title: 'ETL Pipelines',
    badge: 'DATA SYSTEMS',
    detail: 'Audio Diarization • Celery / Redis',
    icon: Cpu,
    color: '#C2410C',
    borderColor: '#FED7AA',
    bg: '#FFF7ED',
    accentDot: '#EA580C',
  },
  {
    id: 'react',
    isLocomotive: false,
    title: 'React.js UI',
    badge: 'FRONTEND',
    detail: 'Interactive WebApps • State Engines',
    icon: Layers,
    color: '#7E347D',
    borderColor: '#F3E8FF',
    bg: '#FAF5FF',
    accentDot: '#9333EA',
  },
];

export default function HeroSideTrack() {
  const [activeBogeyIndex, setActiveBogeyIndex] = useState(0);
  const [hoveredBogey, setHoveredBogey] = useState(null);

  // Smooth ambient patrol cycle lighting up each bogey in sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBogeyIndex((prev) => (prev + 1) % SKILL_BOGEYS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-none flex flex-col items-center select-none py-2">
      
      {/* Side Track Header Badge */}
      <div className="flex items-center justify-between w-full mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DDD6C9] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-metro-backend animate-ping"></span>
            <span className="text-[11px] font-black text-[#111827] uppercase tracking-wider">
              Transit Line S-1
            </span>
          </div>
          <span className="text-xs font-bold text-[#4B5563]">
            Engineered Skill Train
          </span>
        </div>
        <div className="text-[10.5px] font-mono text-metro-backend font-bold bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
          Patrol ACTIVE
        </div>
      </div>

      {/* Main Track & Bogey Column */}
      <div className="relative w-full pl-6 pr-2 py-2">
        
        {/* Continuous Dual Steel Rails running down the left of the bogeys */}
        <div className="absolute left-[26px] top-0 bottom-0 w-6 pointer-events-none flex justify-between">
          {/* Left Rail */}
          <div className="w-[3px] h-full bg-gradient-to-b from-[#1B5FA8] via-[#047857] to-[#7E347D] opacity-70 rounded-full shadow-sm"></div>
          
          {/* Center Power Third-Rail (Dotted) */}
          <div className="w-[1px] h-full border-r border-dashed border-[#9CA3AF] opacity-50"></div>

          {/* Right Rail */}
          <div className="w-[3px] h-full bg-gradient-to-b from-[#1B5FA8] via-[#047857] to-[#7E347D] opacity-70 rounded-full shadow-sm"></div>

          {/* Perpendicular Rail Ties (Sleepers) */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-[3px] bg-[#4B5563] rounded-xs shadow-xs"
              />
            ))}
          </div>
        </div>

        {/* Train Bogeys Stack */}
        <div className="space-y-3 relative z-10">
          {SKILL_BOGEYS.map((bogey, idx) => {
            const isPatrolActive = activeBogeyIndex === idx;
            const isHovered = hoveredBogey === bogey.id;
            const isCurrent = isHovered || isPatrolActive;
            const Icon = bogey.icon;

            return (
              <div key={bogey.id} className="relative group">
                
                {/* Coupler link between bogeys */}
                {idx > 0 && (
                  <div className="absolute -top-3 left-[15px] w-3 h-3 flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-1.5 h-3 bg-[#4B5563] rounded-xs"></div>
                  </div>
                )}

                {/* Bogey Wheel Set on Rails */}
                <div className="absolute left-[3px] top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-none">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-all duration-300 ${
                      isCurrent ? 'bg-metro-backend scale-110 ring-2 ring-metro-backend/40' : 'bg-[#374151]'
                    }`}
                  />
                </div>

                {/* Bogey Chassis Card */}
                <motion.div
                  onMouseEnter={() => setHoveredBogey(bogey.id)}
                  onMouseLeave={() => setHoveredBogey(null)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18 }}
                  className={`ml-9 p-3 sm:p-3.5 rounded-xl border-2 transition-all duration-300 cursor-default relative overflow-hidden bg-white ${
                    isCurrent
                      ? 'border-metro-backend shadow-lg ring-2 ring-metro-backend/15'
                      : 'border-[#DDD6C9] shadow-sm hover:border-[#9CA3AF]'
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                    style={{ backgroundColor: isCurrent ? bogey.accentDot : '#E5E7EB' }}
                  />

                  {/* Bogey Internal Header */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-colors"
                        style={{
                          backgroundColor: bogey.bg,
                          borderColor: bogey.borderColor,
                          color: bogey.color
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-black text-sm text-[#111827] tracking-tight font-sans truncate">
                          {bogey.title}
                        </div>
                      </div>
                    </div>

                    <span
                      className="text-[9.5px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0"
                      style={{
                        backgroundColor: bogey.bg,
                        color: bogey.color,
                        border: `1px solid ${bogey.borderColor}`
                      }}
                    >
                      {bogey.badge}
                    </span>
                  </div>

                  {/* Bogey Tech Details */}
                  <div className="text-xs font-semibold text-[#4B5563] font-sans pl-9 leading-snug">
                    {bogey.detail}
                  </div>

                  {/* Active Bogey Steam / Glow Effect */}
                  {isCurrent && (
                    <div
                      className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full opacity-10 pointer-events-none blur-lg"
                      style={{ backgroundColor: bogey.color }}
                    />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Track Terminus Buffer Stop */}
      <div className="flex items-center gap-2 mt-2 self-start ml-2 text-[11px] font-bold text-[#6B7280]">
        <div className="w-8 h-2 bg-[#4B5563] rounded-xs border border-[#111827] flex items-center justify-center">
          <div className="w-4 h-1 bg-[#F59E0B] rounded-xs"></div>
        </div>
        <span>Buffer Stop • High-Throughput Track Ready</span>
      </div>

    </div>
  );
}
