import React, { useState } from 'react';
import { TRANSIT_LINES, TRANSIT_STATIONS, LANDMARK_ACHIEVEMENTS } from '../../data/transitData';
import { ExternalLink, ArrowUpRight, Search, Award, Sparkles, Filter } from 'lucide-react';
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
      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search stations, projects, skills (e.g. Django, Concurrency, SQL)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-metro-yellow font-mono"
          />
        </div>

        {/* Line Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveLineFilter(null)}
            className={`px-3 py-1.5 rounded text-xs font-bold font-mono transition ${
              activeLineFilter === null
                ? 'bg-metro-yellow text-black'
                : 'bg-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            ALL LINES
          </button>
          {Object.values(TRANSIT_LINES).map((line) => {
            const isSelected = activeLineFilter === line.id;
            return (
              <button
                key={line.id}
                onClick={() => setActiveLineFilter(isSelected ? null : line.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition ${
                  isSelected ? 'ring-2 ring-white shadow' : 'opacity-70 hover:opacity-100'
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

      {/* Stations Directory Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStations.map((station) => (
          <div
            key={station.id}
            className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between group shadow-lg"
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
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                        style={{ backgroundColor: line?.color }}
                        title={line?.name}
                      >
                        {line?.code}
                      </span>
                    );
                  })}
                  <span className="text-[11px] font-mono font-semibold text-zinc-400 uppercase">
                    {station.category}
                  </span>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-metro-yellow border border-zinc-700 font-bold">
                  {station.type.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-extrabold text-white uppercase tracking-tight group-hover:text-metro-yellow transition">
                {station.name}
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5 mb-3">
                {station.subtitle}
              </p>

              {/* Summary */}
              <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-4">
                {station.summary}
              </p>

              {/* Tech Stack Chips */}
              {station.techStack && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {station.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-zinc-800/90 text-zinc-300 text-[11px] font-mono border border-zinc-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {station.live && (
                  <a
                    href={station.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live</span>
                  </a>
                )}
                {station.github && (
                  <a
                    href={station.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-zinc-300 hover:text-white font-semibold"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => onSelectStation(station.id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-metro-yellow hover:bg-amber-400 text-black text-xs font-bold transition shadow-sm"
              >
                <span>Inspect Specs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Honors & Awards Section */}
      <div className="p-6 rounded-xl bg-zinc-900/90 border border-zinc-800 mt-8">
        <h3 className="text-sm font-extrabold uppercase font-mono text-metro-yellow flex items-center gap-2 mb-4">
          <Award className="w-4 h-4" />
          <span>Express Landmarks, Honors & Hackathon Accolades</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LANDMARK_ACHIEVEMENTS.map((lm) => (
            <div
              key={lm.id}
              className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded bg-metro-yellow text-black font-black text-sm flex items-center justify-center shrink-0">
                ★
              </div>
              <div>
                <div className="font-extrabold text-white text-sm">{lm.name}</div>
                <div className="text-xs text-metro-yellow font-mono">{lm.badge} • {lm.organizer}</div>
                <p className="text-xs text-zinc-300 mt-1">{lm.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
