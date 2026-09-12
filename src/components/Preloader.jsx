import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Database, CheckCircle2 } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const bootLogs = [
    "INITIALIZING CORE SYSTEM...",
    "CONNECTING TO POSTGRESQL CLUSTER [OK]",
    "LOADING DJANGO REST FRAMEWORK ORM [OK]",
    "CONFIGURING ROW-LEVEL CONCURRENCY LOCKS [OK]",
    "ATTACHING FORENSIC AUDIT ANALYTICS ENGINE [OK]",
    "AUTHENTICATING VIPANCHI.BARMAN PROFILE [9.04 CGPA] [OK]",
    "SYSTEM READY. LAUNCHING PORTFOLIO HUD..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 350);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const idx = Math.min(
      Math.floor((progress / 100) * bootLogs.length),
      bootLogs.length - 1
    );
    setStepIndex(idx);
  }, [progress, bootLogs.length]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian text-slate-100 font-mono px-4">
      {/* Cyber Grid background */}
      <div className="absolute inset-0 cyber-bg opacity-30 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md p-6 rounded-xl glass-panel border border-cyan-glow/20 shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-2 font-medium text-slate-300">vipanchi.sys // boot_telemetry</span>
          </div>
          <button 
            onClick={onComplete}
            className="text-xs text-cyan-glow hover:underline cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
          >
            [Skip Boot]
          </button>
        </div>

        {/* System Emblem */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-lg bg-cyan-glow/10 border border-cyan-glow/30 text-cyan-glow animate-pulse">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-wide font-sans">
              VIPANCHI BARMAN
            </h1>
            <p className="text-xs text-cyan-glow/90 tracking-wider">
              BACKEND & DATA SYSTEMS ARCHITECT
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs text-slate-400">
            <span>BOOT_SEQUENCE_PROGRESS</span>
            <span className="text-cyan-glow font-bold">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-surface-900 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-cyan-glow via-teal-400 to-emerald-telemetry rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Boot Step Log */}
        <div className="min-h-[44px] bg-black/40 rounded-lg p-3 border border-white/5 text-xs text-slate-300 flex items-center space-x-2">
          <span className="text-cyan-glow animate-ping">›</span>
          <span className="truncate">{bootLogs[stepIndex]}</span>
        </div>

        {/* Telemetry Footnote */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
          <span>VIT BHOPAL • 9.04 CGPA</span>
          <span className="flex items-center text-emerald-telemetry">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-telemetry mr-1.5 animate-pulse" />
            LIVE NODE
          </span>
        </div>
      </div>
    </div>
  );
}
