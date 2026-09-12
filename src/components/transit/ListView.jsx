import React, { useState } from 'react';
import { TRANSIT_LINES, TRANSIT_STATIONS, LANDMARK_ACHIEVEMENTS } from '../../data/transitData';
import { ExternalLink, ArrowUpRight, Search, Award } from 'lucide-react';
import { GithubIcon } from '../Icons';

export default function ListView({
  onSelectStation,
  activeLineFilter,
  setActiveLineFilter
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStations = TRANSIT_STATIONS.filter(st => {
    const matchesLine = !activeLineFilter || st.lines.includes(activeLineFilter);
    const matchesSearch =
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.techStack?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesLine && matchesSearch;
  });

  return (
    <div className="w-full space-y-6 select-none">
      
      {/* Controls Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects, skills, and tools (e.g. Django, Concurrency, SQL, Whisper)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF8F4] border border-[#DDD6C9] text-xs sm:text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-metro-backend/20 focus:border-metro-backend"
          />
        </div>

        {/* Line Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveLineFilter(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeLineFilter === null
                ? 'bg-ink-primary text-white shadow-sm'
                : 'bg-[#F4EFE6] text-ink-secondary hover:bg-[#EAE4D9]'
            }`}
          >
            All Lines
          </button>
          {Object.values(TRANSIT_LINES).map((line) => {
            const isSelected = activeLineFilter === line.id;
            return (
              <button
                key={line.id}
                onClick={() => setActiveLineFilter(isSelected ? null : line.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  isSelected ? 'ring-2 ring-black/20 shadow-sm' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: line.color, color: line.contrastText }}
              >
                <span>{line.code}</span>
                <span className="hidden sm:inline">{line.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Projects & Experience Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStations.map((station) => (
          <div
            key={station.id}
            className="p-5 rounded-2xl bg-white border border-[#DDD6C9] hover:border-[#B5ADA0] transition-all flex flex-col justify-between group shadow-paper-card"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  {station.lines.map((lKey) => {
                    const line = Object.values(TRANSIT_LINES).find(l => l.id === lKey);
                    return (
                      <span
                        key={lKey}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-sm"
                        style={{ backgroundColor: line?.color }}
                        title={line?.name}
                      >
                        {line?.code}
                      </span>
                    );
                  })}
                  <span className="text-xs font-semibold text-ink-muted">
                    {station.category}
                  </span>
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F4EFE6] text-ink-secondary border border-[#DDD6C9]">
                  {station.type === 'terminus_origin' ? 'Education' : station.type === 'terminus_destination' ? 'Status' : station.type === 'interchange' ? 'Internship' : 'Project'}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-extrabold text-ink-primary tracking-tight group-hover:text-metro-backend transition">
                {station.name}
              </h3>
              <p className="text-xs text-ink-muted mt-0.5 mb-3">
                {station.subtitle}
              </p>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans mb-4">
                {station.summary}
              </p>

              {/* Tech Stack Chips */}
              {station.techStack && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {station.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-[#FAF8F4] text-ink-secondary text-xs font-medium border border-[#DDD6C9]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="pt-3.5 border-t border-[#DDD6C9] flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                {station.live && (
                  <a
                    href={station.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-bold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
                {station.github && (
                  <a
                    href={station.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-ink-secondary hover:text-ink-primary font-bold"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => onSelectStation(station.id)}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-metro-backend hover:bg-[#154E8C] text-white text-xs font-bold transition shadow-sm"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Honors & Hackathon Achievements */}
      <div className="p-6 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper mt-8">
        <h3 className="text-sm font-extrabold text-ink-primary flex items-center gap-2 mb-4">
          <Award className="w-4 h-4 text-metro-gold" />
          <span>Honors & Hackathon Achievements</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LANDMARK_ACHIEVEMENTS.map((lm) => (
            <div
              key={lm.id}
              className="p-4 rounded-xl bg-[#FAF8F4] border border-[#DDD6C9] flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-[#F4EFE6] text-metro-gold border border-[#D99B16] font-bold text-xs flex items-center justify-center shrink-0">
                ★
              </div>
              <div>
                <div className="font-bold text-ink-primary text-sm">{lm.name}</div>
                <div className="text-xs text-ink-muted">{lm.badge} • {lm.organizer}</div>
                <p className="text-xs text-ink-secondary mt-1">{lm.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
