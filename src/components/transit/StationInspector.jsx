import React, { useState } from 'react';
import { TRANSIT_LINES, TRANSIT_STATIONS } from '../../data/transitData';
import { X, ExternalLink, Code2, ArrowRight, ArrowLeft, Check, Copy, Sparkles, Building, GraduationCap, Award } from 'lucide-react';
import { GithubIcon } from '../Icons';

export default function StationInspector({
  station,
  onClose,
  onSelectStation
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  if (!station) return null;

  // Find adjacent stations
  const currentIndex = TRANSIT_STATIONS.findIndex(s => s.id === station.id);
  const prevStation = currentIndex > 0 ? TRANSIT_STATIONS[currentIndex - 1] : null;
  const nextStation = currentIndex < TRANSIT_STATIONS.length - 1 ? TRANSIT_STATIONS[currentIndex + 1] : null;

  const handleCopyCode = () => {
    if (station.codeSnippet) {
      navigator.clipboard.writeText(station.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#0F121A] text-zinc-100 shadow-2xl border-l border-zinc-700/80 flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Top Ticket Header Banner */}
      <div className="p-4 sm:p-5 bg-black border-b-2 border-metro-yellow flex items-start justify-between gap-3">
        <div>
          {/* Line Route Bullets */}
          <div className="flex items-center gap-1.5 mb-2">
            {station.lines?.map((lineKey) => {
              const line = Object.values(TRANSIT_LINES).find(l => l.id === lineKey);
              if (!line) return null;
              return (
                <span
                  key={line.id}
                  className="px-2 py-0.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider flex items-center gap-1"
                  style={{ backgroundColor: line.color }}
                >
                  <span>{line.code}</span>
                  <span className="hidden sm:inline font-sans text-[9px]">{line.name}</span>
                </span>
              );
            })}
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-300 font-bold">
              {station.category}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans uppercase">
            {station.name}
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            {station.subtitle}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Action Bar (Live Demo, GitHub, Code View) */}
      <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {station.live && (
            <a
              href={station.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Deployment</span>
            </a>
          )}
          {station.github && (
            <a
              href={station.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold border border-zinc-700 transition"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
          )}
        </div>

        {/* Tab switch */}
        {station.codeSnippet && (
          <div className="flex items-center bg-black/40 p-0.5 rounded border border-zinc-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                activeTab === 'overview' ? 'bg-zinc-800 text-white' : 'text-zinc-400'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
                activeTab === 'code' ? 'bg-zinc-800 text-metro-yellow' : 'text-zinc-400'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        
        {activeTab === 'overview' ? (
          <>
            {/* Summary Box */}
            <div className="p-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {station.summary}
            </div>

            {/* Performance & Architecture Metrics */}
            {station.stats && (
              <div>
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-metro-yellow" />
                  <span>Key Telemetry & Engineering Specs</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {station.stats.map((st, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-zinc-900 border border-zinc-800 flex flex-col justify-center"
                    >
                      <span className="text-[10px] text-zinc-400 uppercase font-mono">{st.label}</span>
                      <span className="text-xs sm:text-sm font-black text-white tracking-tight mt-0.5">
                        {st.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture Highlights */}
            {station.architecture && (
              <div>
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                  System Architecture & Implementation
                </h4>
                <div className="space-y-2">
                  {station.architecture.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2.5"
                    >
                      <span className="w-4 h-4 rounded bg-metro-backend/20 text-metro-backend border border-metro-backend/30 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Coursework (if origin terminus) */}
            {station.details?.coursework && (
              <div>
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-metro-yellow" />
                  <span>Core Academic Disciplines</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {station.details.coursework.map((course, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-metro-yellow"></span>
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            {station.techStack && (
              <div>
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Station Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {station.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-zinc-800/90 text-zinc-200 border border-zinc-700 text-xs font-mono font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Code Snippet Viewer */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">Core Architecture Logic</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-black text-emerald-400 font-mono text-xs overflow-x-auto border border-zinc-800 leading-relaxed shadow-inner">
              <code>{station.codeSnippet}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Bottom Route Navigation Bar */}
      <div className="p-3.5 bg-black border-t border-zinc-800 flex items-center justify-between gap-2">
        {prevStation ? (
          <button
            onClick={() => onSelectStation(prevStation.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 border border-zinc-700 transition truncate max-w-[48%]"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Prev: {prevStation.shortName}</span>
          </button>
        ) : <div />}

        {nextStation && (
          <button
            onClick={() => onSelectStation(nextStation.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 border border-zinc-700 transition truncate max-w-[48%]"
          >
            <span className="truncate">Next: {nextStation.shortName}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        )}
      </div>

    </div>
  );
}
