import React, { useState } from 'react';
import { TRANSIT_LINES, TRANSIT_STATIONS } from '../../data/transitData';
import { X, ExternalLink, Code2, ArrowRight, ArrowLeft, Check, Copy, Sparkles, GraduationCap, CheckCircle2 } from 'lucide-react';
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
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#FAF8F4] text-ink-primary shadow-2xl border-l border-[#DDD6C9] flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Top Header */}
      <div className="p-5 bg-white border-b border-[#DDD6C9] flex items-start justify-between gap-3">
        <div>
          {/* Skill Line Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {station.lines?.map((lineKey) => {
              const line = Object.values(TRANSIT_LINES).find(l => l.id === lineKey);
              if (!line) return null;
              return (
                <span
                  key={line.id}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1 shadow-sm"
                  style={{ backgroundColor: line.color }}
                >
                  <span>{line.code}</span>
                  <span className="hidden sm:inline font-sans text-[9px]">{line.name.split(' ')[0]}</span>
                </span>
              );
            })}
            <span className="px-2 py-0.5 rounded-md bg-[#EAE4D9] text-[11px] font-semibold text-ink-secondary">
              {station.category}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-ink-primary font-sans">
            {station.name}
          </h2>
          <p className="text-xs text-ink-muted mt-0.5">
            {station.subtitle}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE4D9] text-ink-secondary hover:text-ink-primary transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Action Bar */}
      <div className="px-5 py-3 bg-[#F4EFE6] border-b border-[#DDD6C9] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {station.live && (
            <a
              href={station.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </a>
          )}
          {station.github && (
            <a
              href={station.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#FAF8F4] text-ink-primary text-xs font-bold border border-[#DDD6C9] shadow-sm transition"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
          )}
        </div>

        {/* Tab switch */}
        {station.codeSnippet && (
          <div className="flex items-center bg-[#EAE4D9] p-0.5 rounded-lg border border-[#DDD6C9]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                activeTab === 'overview' ? 'bg-white text-ink-primary shadow-sm' : 'text-ink-muted'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1 transition ${
                activeTab === 'code' ? 'bg-white text-metro-backend shadow-sm' : 'text-ink-muted'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
        
        {activeTab === 'overview' ? (
          <>
            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-white border border-[#DDD6C9] text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans shadow-paper-card">
              {station.summary}
            </div>

            {/* Key Technical Highlights */}
            {station.stats && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-primary mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-metro-backend" />
                  <span>Key Project Highlights</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {station.stats.map((st, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-[#DDD6C9] flex flex-col justify-center shadow-paper-card"
                    >
                      <span className="text-[10px] text-ink-muted font-semibold uppercase">{st.label}</span>
                      <span className="text-xs sm:text-sm font-extrabold text-ink-primary tracking-tight mt-0.5">
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-primary mb-2.5">
                  Architecture & What I Built
                </h4>
                <div className="space-y-2">
                  {station.architecture.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-[#DDD6C9] text-xs sm:text-sm text-ink-secondary flex items-start gap-2.5 shadow-paper-card leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-metro-backend shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Coursework */}
            {station.details?.coursework && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-primary mb-2.5 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-metro-backend" />
                  <span>Core Computer Science Disciplines</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {station.details.coursework.map((course, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white border border-[#DDD6C9] text-xs text-ink-secondary flex items-center gap-2 shadow-paper-card"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-metro-backend"></span>
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            {station.techStack && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-primary mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {station.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white text-ink-secondary border border-[#DDD6C9] text-xs font-medium shadow-paper-card"
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
              <span className="text-xs font-semibold text-ink-muted">Implementation Code Snippet</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white hover:bg-[#F4EFE6] text-ink-primary text-xs font-semibold border border-[#DDD6C9] shadow-sm transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#1E222B] text-emerald-300 font-mono text-xs overflow-x-auto border border-[#2D3340] leading-relaxed shadow-md">
              <code>{station.codeSnippet}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Bottom Route Navigation Bar */}
      <div className="p-4 bg-white border-t border-[#DDD6C9] flex items-center justify-between gap-2">
        {prevStation ? (
          <button
            onClick={() => onSelectStation(prevStation.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE4D9] text-xs font-semibold text-ink-primary border border-[#DDD6C9] transition truncate max-w-[48%]"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Prev: {prevStation.shortName}</span>
          </button>
        ) : <div />}

        {nextStation && (
          <button
            onClick={() => onSelectStation(nextStation.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE4D9] text-xs font-semibold text-ink-primary border border-[#DDD6C9] transition truncate max-w-[48%]"
          >
            <span className="truncate">Next: {nextStation.shortName}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        )}
      </div>

    </div>
  );
}
