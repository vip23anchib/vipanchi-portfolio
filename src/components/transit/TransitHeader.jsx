import React from 'react';
import { TRANSIT_LINES, TRANSIT_STATIONS } from '../../data/transitData';
import { Download, Search, Map, ListFilter, Send, Info, Train } from 'lucide-react';

export default function TransitHeader({
  activeView,
  setActiveView,
  selectedStationId,
  onSelectStation,
  onOpenAbout,
  onOpenContact,
  activeLineFilter,
  setActiveLineFilter
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur-md border-b-2 border-metro-yellow shadow-xl">
      {/* Top Vignelli Signage Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Branding & Metro Route Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-metro-yellow text-black flex items-center justify-center font-black text-sm shadow-md">
              <Train className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white uppercase font-sans">
                  Vipanchi Barman
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                  METRO TRANSIT
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono tracking-tight flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ALL SERVICES NORMAL • 9.04 CGPA TERMINUS
              </p>
            </div>
          </div>

          {/* Line Badges */}
          <div className="hidden lg:flex items-center gap-1.5 ml-4 pl-4 border-l border-zinc-800">
            {Object.values(TRANSIT_LINES).map((line) => {
              const isActive = activeLineFilter === null || activeLineFilter === line.id;
              return (
                <button
                  key={line.id}
                  onClick={() => setActiveLineFilter(activeLineFilter === line.id ? null : line.id)}
                  title={`${line.name} — Click to filter track`}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'opacity-100 ring-2 ring-white/20'
                      : 'opacity-40 hover:opacity-75'
                  }`}
                  style={{ backgroundColor: line.color, color: line.contrastText }}
                >
                  <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">
                    {line.code}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider">{line.code} LINE</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Station Quick Jump, View Toggle, Resume, Actions */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          
          {/* Station Quick Selector Dropdown */}
          <div className="relative hidden md:flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-zinc-400 pointer-events-none" />
            <select
              value={selectedStationId || ''}
              onChange={(e) => {
                if (e.target.value) {
                  onSelectStation(e.target.value);
                }
              }}
              className="pl-8 pr-6 py-1.5 rounded bg-zinc-900 text-xs font-medium text-zinc-200 border border-zinc-700 hover:border-zinc-500 focus:outline-none focus:border-metro-yellow transition cursor-pointer appearance-none"
            >
              <option value="">Jump to Station...</option>
              {TRANSIT_STATIONS.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.shortName} ({station.category})
                </option>
              ))}
            </select>
          </div>

          {/* Map vs List View Switcher */}
          <div className="flex items-center bg-zinc-900 p-0.5 rounded border border-zinc-800">
            <button
              onClick={() => setActiveView('map')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold transition ${
                activeView === 'map'
                  ? 'bg-metro-yellow text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Map</span>
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold transition ${
                activeView === 'list'
                  ? 'bg-metro-yellow text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Directory</span>
            </button>
          </div>

          {/* Info / About */}
          <button
            onClick={onOpenAbout}
            title="Stationmaster Profile & Academic Track"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold border border-zinc-700 transition"
          >
            <Info className="w-3.5 h-3.5 text-metro-yellow" />
            <span className="hidden sm:inline">Profile</span>
          </button>

          {/* Download Resume / Timetable */}
          <a
            href="/Barman_Vipanchi_Resume_10-09-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Download Timetable / Resume PDF"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-metro-backend hover:bg-blue-600 text-white text-xs font-bold shadow-md transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Timetable (PDF)</span>
            <span className="sm:hidden">PDF</span>
          </a>

          {/* Contact Dispatch Button */}
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-metro-yellow text-xs font-bold border border-metro-yellow/30 transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Dispatch</span>
          </button>

        </div>
      </div>

      {/* Mobile Line Filter Bar */}
      <div className="lg:hidden px-4 py-1.5 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between overflow-x-auto gap-2 no-scrollbar">
        <span className="text-[10px] text-zinc-400 font-mono uppercase font-bold shrink-0">Lines:</span>
        <div className="flex items-center gap-1.5">
          {Object.values(TRANSIT_LINES).map((line) => {
            const isActive = activeLineFilter === null || activeLineFilter === line.id;
            return (
              <button
                key={line.id}
                onClick={() => setActiveLineFilter(activeLineFilter === line.id ? null : line.id)}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold shrink-0 transition ${
                  isActive ? 'opacity-100 ring-1 ring-white/30' : 'opacity-40'
                }`}
                style={{ backgroundColor: line.color, color: line.contrastText }}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-black">
                  {line.code}
                </span>
                <span>{line.code}</span>
              </button>
            );
          })}
          {activeLineFilter && (
            <button
              onClick={() => setActiveLineFilter(null)}
              className="text-[10px] text-zinc-400 hover:text-white underline ml-1 shrink-0"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
