import React, { useState } from 'react';
import { TRANSIT_LINES } from '../../data/transitData';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransitLegend({
  activeLineFilter,
  setActiveLineFilter,
  onOpenStation
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="rounded-2xl border-2 border-[#DDD6C9] shadow-2xl text-xs max-w-xs sm:max-w-sm w-full select-none bg-white overflow-hidden transition-all duration-300">
      {/* Legend Header & Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between p-3.5 hover:bg-[#F9FAFB] transition-colors border-b border-[#E5E7EB]"
      >
        <div className="flex items-center gap-2 font-black text-[#111827] text-xs tracking-tight">
          <Layers className="w-4 h-4 text-metro-backend" />
          <span>Skills & Lines Legend</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]">
            {isCollapsed ? 'Show' : 'Hide'}
          </span>
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-[#4B5563]" />
          ) : (
            <ChevronUp className="w-4 h-4 text-[#4B5563]" />
          )}
        </div>
      </button>

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="p-4 pt-3 overflow-hidden"
          >
            {/* 1. Skill Lines */}
            <div className="space-y-1.5 mb-3.5">
              {Object.values(TRANSIT_LINES).map((line) => {
                const isSelected = activeLineFilter === line.id;
                const isDimmed = activeLineFilter !== null && !isSelected;

                return (
                  <button
                    key={line.id}
                    onClick={() => setActiveLineFilter(isSelected ? null : line.id)}
                    className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between gap-2.5 border ${
                      isSelected
                        ? 'bg-[#EFF6FF] border-metro-backend shadow-sm ring-1 ring-metro-backend/20'
                        : isDimmed
                        ? 'opacity-35 border-transparent hover:opacity-75'
                        : 'bg-[#F9FAFB] border-[#E5E7EB] hover:bg-[#F3F4F6]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] text-white shrink-0 shadow-sm"
                        style={{ backgroundColor: line.color }}
                      >
                        {line.code}
                      </span>
                      <div className="truncate">
                        <div className="font-extrabold text-[#111827] text-xs truncate">
                          {line.name}
                        </div>
                        <div className="text-[10.5px] text-[#4B5563] font-medium truncate">
                          {line.skills.slice(0, 3).join(', ')}...
                        </div>
                      </div>
                    </div>
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: line.color }}
                    />
                  </button>
                );
              })}
            </div>

            {/* 2. Station Type Symbols */}
            <div className="pt-2.5 border-t border-[#E5E7EB] space-y-2 text-xs">
              <div className="text-[11px] font-bold text-[#4B5563] uppercase tracking-wide">
                Map Symbols
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[#1F2937] text-[11px] font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-md border-2 border-[#111827] bg-white inline-block shrink-0 shadow-sm"></span>
                  <span className="truncate">Education / Target</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-[#111827] bg-white inline-block shrink-0 shadow-sm"></span>
                  <span className="truncate">Internship Hub</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-white border-2 border-[#111827] inline-block shrink-0"></span>
                  <span className="truncate">Core Project</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FEF3C7] border-2 border-[#D99B16] inline-block shrink-0"></span>
                  <span className="truncate">Award / Landmark</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

