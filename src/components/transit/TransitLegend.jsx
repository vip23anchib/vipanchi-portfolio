import React from 'react';
import { TRANSIT_LINES } from '../../data/transitData';
import { Layers } from 'lucide-react';

export default function TransitLegend({
  activeLineFilter,
  setActiveLineFilter,
  onOpenStation
}) {
  return (
    <div className="paper-panel rounded-2xl p-4 shadow-paper-lg text-xs max-w-xs sm:max-w-sm w-full select-none bg-white">
      {/* Legend Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#DDD6C9]">
        <div className="flex items-center gap-2 font-extrabold text-ink-primary text-xs tracking-tight">
          <Layers className="w-4 h-4 text-metro-backend" />
          <span>Skills & Lines</span>
        </div>
        <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[#EAE4D9] text-ink-secondary">
          Click line to filter
        </span>
      </div>

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
                  ? 'bg-[#F4EFE6] border-[#B5ADA0] shadow-sm ring-1 ring-black/5'
                  : isDimmed
                  ? 'opacity-35 border-transparent hover:opacity-75'
                  : 'bg-[#FAF8F4] border-[#DDD6C9] hover:bg-[#F4EFE6]'
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
                  <div className="font-bold text-ink-primary text-xs truncate">
                    {line.name}
                  </div>
                  <div className="text-[10.5px] text-ink-muted truncate">
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
      <div className="pt-2.5 border-t border-[#DDD6C9] space-y-2 text-xs">
        <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wide">
          Map Symbols
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-ink-secondary text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md border-2 border-ink-primary bg-white inline-block shrink-0 shadow-sm"></span>
            <span className="truncate">Education & Target</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-ink-primary bg-white inline-block shrink-0 shadow-sm"></span>
            <span className="truncate">Internship Hub</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white border-2 border-ink-primary inline-block shrink-0"></span>
            <span className="truncate">Core Project</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#F4EFE6] border-2 border-[#D99B16] inline-block shrink-0"></span>
            <span className="truncate">Award / Landmark</span>
          </div>
        </div>
      </div>
    </div>
  );
}
