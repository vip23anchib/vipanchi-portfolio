import React from 'react';
import { TRANSIT_LINES } from '../../data/transitData';
import { Layers, ShieldCheck, Activity, Award } from 'lucide-react';

export default function TransitLegend({
  activeLineFilter,
  setActiveLineFilter,
  onOpenStation
}) {
  return (
    <div className="transit-panel rounded-lg p-3.5 border border-zinc-700/80 shadow-2xl text-xs max-w-xs sm:max-w-sm w-full select-none">
      {/* Legend Header */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-zinc-700/60">
        <div className="flex items-center gap-1.5 font-extrabold uppercase tracking-wider text-white text-xs">
          <Layers className="w-3.5 h-3.5 text-metro-yellow" />
          <span>System Map Legend</span>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold">
          METRO KEY
        </span>
      </div>

      {/* 1. Skill Lines / Filter */}
      <div className="space-y-1.5 mb-3">
        <div className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-wider">
          Transit Lines (Skill Domains)
        </div>
        {Object.values(TRANSIT_LINES).map((line) => {
          const isSelected = activeLineFilter === line.id;
          const isDimmed = activeLineFilter !== null && !isSelected;

          return (
            <button
              key={line.id}
              onClick={() => setActiveLineFilter(isSelected ? null : line.id)}
              className={`w-full text-left p-1.5 rounded transition flex items-center justify-between gap-2 border ${
                isSelected
                  ? 'bg-zinc-800 border-white/40 ring-1 ring-white/20'
                  : isDimmed
                  ? 'opacity-40 border-transparent hover:opacity-75'
                  : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-800/80'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] text-white shrink-0 shadow-sm"
                  style={{ backgroundColor: line.color }}
                >
                  {line.code}
                </span>
                <div className="truncate">
                  <div className="font-bold text-white text-[11px] truncate flex items-center gap-1">
                    {line.name}
                  </div>
                  <div className="text-[9.5px] text-zinc-400 truncate">
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
      <div className="pt-2 border-t border-zinc-700/60 space-y-1.5 text-[11px]">
        <div className="text-[10px] uppercase font-bold text-zinc-400 font-mono tracking-wider">
          Station Markers
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-zinc-300 text-[10.5px]">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-white bg-metro-yellow inline-block shrink-0 shadow-sm"></span>
            <span className="truncate">Terminus Depot</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-metro-backend bg-white inline-block shrink-0"></span>
            <span className="truncate">Interchange Hub</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white border border-zinc-900 inline-block shrink-0"></span>
            <span className="truncate">Project Junction</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rotate-45 bg-metro-yellow border border-black inline-block shrink-0"></span>
            <span className="truncate">Express Landmark</span>
          </div>
        </div>
      </div>

      {/* 3. Live System Telemetry Status */}
      <div className="mt-3 pt-2 border-t border-zinc-700/60 flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <span className="flex items-center gap-1 text-emerald-400 font-bold">
          <Activity className="w-3 h-3 animate-pulse" />
          SYSTEM 100% OPERATIONAL
        </span>
        <span>4 LINES • 11 STOPS</span>
      </div>
    </div>
  );
}
