import React from 'react';
import { TRANSIT_LINES, TRANSIT_STATIONS } from '../../data/transitData';
import { Download, Search, Map, ListFilter, Mail, User, Compass } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F4]/95 backdrop-blur-md border-b border-[#DDD6C9] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Engineer Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-ink-primary text-paper-bg flex items-center justify-center font-bold text-sm shadow-sm">
            VB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-ink-primary font-sans">
                Vipanchi Barman
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAE4D9] text-ink-secondary border border-[#DDD6C9]">
                Backend & Data Systems
              </span>
            </div>
            <p className="text-xs text-ink-muted flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Available for SDE & Backend Roles • VIT Bhopal (9.04 CGPA)</span>
            </p>
          </div>
        </div>

        {/* Middle: Interactive Line Filters */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EFE6] border border-[#DDD6C9]">
          <span className="text-[11px] font-semibold text-ink-muted uppercase mr-1 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Lines:</span>
          </span>
          {Object.values(TRANSIT_LINES).map((line) => {
            const isActive = activeLineFilter === null || activeLineFilter === line.id;
            return (
              <button
                key={line.id}
                onClick={() => setActiveLineFilter(activeLineFilter === line.id ? null : line.id)}
                title={`Filter by ${line.name}`}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'opacity-100 shadow-sm ring-1 ring-black/10'
                    : 'opacity-35 hover:opacity-75'
                }`}
                style={{ backgroundColor: line.color, color: line.contrastText }}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-white/25 flex items-center justify-center text-[9px] font-black">
                  {line.code}
                </span>
                <span className="text-[11px]">{line.name.split(' ')[0]}</span>
              </button>
            );
          })}
          {activeLineFilter && (
            <button
              onClick={() => setActiveLineFilter(null)}
              className="text-[11px] text-ink-secondary hover:text-ink-primary font-semibold underline ml-1"
            >
              Reset
            </button>
          )}
        </div>

        {/* Right: View Toggle, About, Resume, Contact */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
          
          {/* Quick Jump Search */}
          <div className="relative hidden xl:flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-ink-muted pointer-events-none" />
            <select
              value={selectedStationId || ''}
              onChange={(e) => {
                if (e.target.value) {
                  onSelectStation(e.target.value);
                }
              }}
              className="pl-8 pr-6 py-1.5 rounded-lg bg-white text-xs font-medium text-ink-secondary border border-[#DDD6C9] hover:border-[#B5ADA0] focus:outline-none focus:ring-1 focus:ring-metro-backend transition cursor-pointer appearance-none shadow-sm"
            >
              <option value="">Jump to Project / Station...</option>
              {TRANSIT_STATIONS.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.shortName} ({station.category})
                </option>
              ))}
            </select>
          </div>

          {/* Map vs List View Switcher */}
          <div className="flex items-center bg-[#EAE4D9] p-0.5 rounded-lg border border-[#DDD6C9]">
            <button
              onClick={() => setActiveView('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${
                activeView === 'map'
                  ? 'bg-white text-ink-primary shadow-sm'
                  : 'text-ink-muted hover:text-ink-primary'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${
                activeView === 'list'
                  ? 'bg-white text-ink-primary shadow-sm'
                  : 'text-ink-muted hover:text-ink-primary'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>

          {/* About Profile */}
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F4EFE6] text-ink-primary text-xs font-semibold border border-[#DDD6C9] shadow-sm transition"
          >
            <User className="w-3.5 h-3.5 text-metro-backend" />
            <span className="hidden sm:inline">About</span>
          </button>

          {/* Download Resume */}
          <a
            href="/Barman_Vipanchi_Resume_10-09-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-metro-backend hover:bg-[#154E8C] text-white text-xs font-bold shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download Resume</span>
            <span className="sm:hidden">Resume</span>
          </a>

          {/* Contact */}
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-ink-primary hover:bg-[#2C3345] text-white text-xs font-bold shadow-sm transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>

        </div>
      </div>

      {/* Mobile Line Filter Bar */}
      <div className="lg:hidden px-4 py-2 bg-[#F4EFE6] border-t border-[#DDD6C9] flex items-center justify-between overflow-x-auto gap-2 no-scrollbar">
        <span className="text-[11px] text-ink-muted font-semibold uppercase shrink-0">Filter:</span>
        <div className="flex items-center gap-1.5">
          {Object.values(TRANSIT_LINES).map((line) => {
            const isActive = activeLineFilter === null || activeLineFilter === line.id;
            return (
              <button
                key={line.id}
                onClick={() => setActiveLineFilter(activeLineFilter === line.id ? null : line.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shrink-0 transition ${
                  isActive ? 'opacity-100 shadow-sm ring-1 ring-black/10' : 'opacity-40'
                }`}
                style={{ backgroundColor: line.color, color: line.contrastText }}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-white/25 flex items-center justify-center text-[9px] font-black">
                  {line.code}
                </span>
                <span>{line.name.split(' ')[0]}</span>
              </button>
            );
          })}
          {activeLineFilter && (
            <button
              onClick={() => setActiveLineFilter(null)}
              className="text-xs text-ink-secondary hover:text-ink-primary font-semibold underline ml-1 shrink-0"
            >
              All
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
