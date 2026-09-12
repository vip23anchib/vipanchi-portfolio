import React from 'react';
import { TRANSIT_LINES, TRANSIT_STATIONS, LANDMARK_ACHIEVEMENTS } from '../../data/transitData';
import { Award, ChevronRight, MapPin } from 'lucide-react';

export default function VerticalStripMap({
  selectedStationId,
  onSelectStation,
  activeLineFilter,
  setActiveLineFilter
}) {
  return (
    <div className="w-full bg-[#F8F5EE] rounded-2xl border border-[#DDD6C9] p-4 sm:p-6 shadow-paper select-none">
      
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-[#DDD6C9] flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-ink-primary text-base tracking-tight">
            Sequential Project Roadmap
          </h3>
          <p className="text-xs text-ink-muted mt-0.5">
            Tap any project to view architecture and code
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#EAE4D9] text-[11px] font-bold text-ink-secondary">
          Mobile Route
        </span>
      </div>

      {/* Vertical Track Route Container */}
      <div className="relative pl-6 sm:pl-8 space-y-5">
        
        {/* Continuous Multi-Line Vertical Track Bar */}
        <div className="absolute top-4 bottom-4 left-3 sm:left-4 w-1.5 rounded-full flex flex-col overflow-hidden bg-[#DDD6C9]">
          <div className="w-full h-1/4 bg-metro-backend" />
          <div className="w-full h-1/4 bg-metro-data" />
          <div className="w-full h-1/4 bg-metro-ml" />
          <div className="w-full h-1/4 bg-metro-frontend" />
        </div>

        {/* Stations Sequence */}
        {TRANSIT_STATIONS.map((station) => {
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
                className={`absolute -left-6 sm:-left-8 top-3.5 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 group-hover:scale-110 z-10 ${
                  isOrigin || isDestination
                    ? 'bg-white border-2 border-ink-primary text-ink-primary font-bold text-[10px] shadow-sm'
                    : isInterchange
                    ? 'bg-white border-4 border-metro-backend shadow-sm'
                    : isSelected
                    ? 'bg-white border-3 border-metro-backend ring-2 ring-metro-backend/20 shadow-sm'
                    : 'bg-white border-2 border-ink-primary shadow-sm'
                }`}
              >
                {isOrigin && '🎓'}
                {isDestination && '📍'}
                {!isOrigin && !isDestination && (
                  <span className="w-1.5 h-1.5 rounded-full bg-ink-primary"></span>
                )}
              </div>

              {/* Station Card */}
              <div
                onClick={() => onSelectStation(station.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'bg-white border-metro-backend ring-2 ring-metro-backend/15 shadow-paper'
                    : 'bg-white/90 border-[#DDD6C9] hover:bg-white hover:border-[#B5ADA0] shadow-paper-card'
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
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
                          style={{ backgroundColor: line?.color }}
                        >
                          {line?.code}
                        </span>
                      );
                    })}
                    <span className="text-[11px] font-semibold text-ink-muted">
                      {station.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-metro-backend font-bold">
                    <span>Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Station Name & Subtitle */}
                <h4 className="text-base font-extrabold text-ink-primary">
                  {station.name}
                </h4>
                <p className="text-xs text-ink-secondary mt-0.5">
                  {station.subtitle}
                </p>

                {/* Tech Chips */}
                {station.techStack && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {station.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#F4EFE6] text-[11px] text-ink-secondary font-medium border border-[#DDD6C9]"
                      >
                        {tech}
                      </span>
                    ))}
                    {station.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-[#F4EFE6] text-[10px] text-ink-muted">
                        +{station.techStack.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>

            </div>
          );
        })}

      </div>

      {/* Landmark Achievements at the bottom */}
      <div className="mt-8 pt-6 border-t border-[#DDD6C9]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-ink-primary mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-metro-gold" />
          <span>Honors & Hackathon Achievements</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {LANDMARK_ACHIEVEMENTS.map((lm) => (
            <div
              key={lm.id}
              className="p-3.5 rounded-xl bg-white border border-[#DDD6C9] flex items-start gap-3 shadow-paper-card"
            >
              <div className="w-6 h-6 rounded-full bg-[#F4EFE6] text-metro-gold border border-[#D99B16] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ★
              </div>
              <div>
                <div className="font-bold text-ink-primary text-xs">{lm.name}</div>
                <div className="text-[11px] text-ink-muted">{lm.organizer}</div>
                <div className="text-xs text-ink-secondary mt-1">{lm.summary}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
