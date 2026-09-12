import React from 'react';
import { TRANSIT_LINES, TRANSIT_STATIONS, LANDMARK_ACHIEVEMENTS } from '../../data/transitData';
import { Sparkles, ArrowRight, ExternalLink, Award, ChevronRight } from 'lucide-react';
import { GithubIcon } from '../Icons';

export default function VerticalStripMap({
  selectedStationId,
  onSelectStation,
  activeLineFilter,
  setActiveLineFilter
}) {
  return (
    <div className="w-full bg-[#0C0E14] rounded-xl border border-zinc-800 p-4 sm:p-6 select-none">
      
      {/* Header Info */}
      <div className="mb-6 pb-4 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-metro-yellow animate-ping"></span>
            <h3 className="font-black text-white text-base uppercase tracking-tight">
              In-Car Line Strip Schematic
            </h3>
          </div>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            Sequential route progression from VIT Terminus to SDE Deployment
          </p>
        </div>
        <span className="px-2 py-1 rounded bg-zinc-800 text-[10px] font-mono text-metro-yellow font-bold uppercase">
          MOBILE SCHEMATIC
        </span>
      </div>

      {/* Vertical Track Route Container */}
      <div className="relative pl-6 sm:pl-8 space-y-6">
        
        {/* Continuous Multi-Line Vertical Track Bar */}
        <div className="absolute top-4 bottom-4 left-3 sm:left-4 w-1.5 rounded-full flex flex-col overflow-hidden bg-zinc-800">
          <div className="w-full h-1/4 bg-metro-backend" />
          <div className="w-full h-1/4 bg-metro-data" />
          <div className="w-full h-1/4 bg-metro-ml" />
          <div className="w-full h-1/4 bg-metro-frontend" />
        </div>

        {/* Stations Sequence */}
        {TRANSIT_STATIONS.map((station, index) => {
          const isSelected = selectedStationId === station.id;
          const isOrigin = station.type === 'terminus_origin';
          const isDestination = station.type === 'terminus_destination';
          const isInterchange = station.type === 'interchange' || station.type === 'grand_junction';

          const isFiltered = !activeLineFilter || station.lines.includes(activeLineFilter);
          if (!isFiltered) return null;

          return (
            <div key={station.id} className="relative group">
              
              {/* Station Node Marker on the Track */}
              <div
                onClick={() => onSelectStation(station.id)}
                className={`absolute -left-6 sm:-left-8 top-3.5 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 group-hover:scale-125 z-10 ${
                  isOrigin || isDestination
                    ? 'bg-metro-yellow border-2 border-black text-black font-black text-[10px]'
                    : isInterchange
                    ? 'bg-white border-4 border-metro-backend shadow-md'
                    : isSelected
                    ? 'bg-metro-yellow border-2 border-white'
                    : 'bg-zinc-900 border-2 border-white'
                }`}
              >
                {isOrigin && '🏁'}
                {isDestination && '🎯'}
                {!isOrigin && !isDestination && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                )}
              </div>

              {/* Station Card */}
              <div
                onClick={() => onSelectStation(station.id)}
                className={`p-3.5 sm:p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'bg-zinc-900 border-metro-yellow ring-2 ring-metro-yellow/20 shadow-xl'
                    : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                {/* Station Line Bullets & Category */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {station.lines.map((lKey) => {
                      const line = Object.values(TRANSIT_LINES).find((l) => l.id === lKey);
                      return (
                        <span
                          key={lKey}
                          className="px-1.5 py-0.5 rounded text-[10px] font-black text-white"
                          style={{ backgroundColor: line?.color }}
                        >
                          {line?.code}
                        </span>
                      );
                    })}
                    <span className="text-[10px] font-mono text-zinc-400 font-semibold uppercase">
                      {station.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-metro-yellow font-mono font-bold">
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Station Name & Subtitle */}
                <h4 className="text-sm sm:text-base font-extrabold text-white uppercase font-sans">
                  {station.name}
                </h4>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  {station.subtitle}
                </p>

                {/* Quick Stats or Tech Chips */}
                {station.techStack && (
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {station.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 font-mono border border-zinc-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {station.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 font-mono">
                        +{station.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

            </div>
          );
        })}

      </div>

      {/* Landmark Achievements Horizontal Section on Mobile */}
      <div className="mt-8 pt-6 border-t border-zinc-800">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-metro-yellow mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4" />
          <span>Express Landmark Stations & Honors</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {LANDMARK_ACHIEVEMENTS.map((lm) => (
            <div
              key={lm.id}
              className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-start gap-2.5"
            >
              <div className="w-6 h-6 rounded bg-metro-yellow text-black flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                ★
              </div>
              <div>
                <div className="font-bold text-white text-xs">{lm.name}</div>
                <div className="text-[10px] text-zinc-400 font-mono">{lm.organizer}</div>
                <div className="text-[11px] text-zinc-300 mt-1">{lm.summary}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
