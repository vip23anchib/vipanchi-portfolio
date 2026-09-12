import React from 'react';
import { ArrowUp, Terminal, Shield, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer({ onOpenTerminal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-surface-950/80 backdrop-blur-md py-12 relative font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          {/* Brand & Status */}
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded bg-surface-900 border border-cyan-glow/30 flex items-center justify-center text-cyan-glow font-bold text-xs">
              VB
            </div>
            <div>
              <span className="font-bold text-white tracking-wide font-sans text-sm">
                VIPANCHI BARMAN
              </span>
              <p className="text-[11px] text-slate-500">
                Backend & Data Systems Engineer • VIT Bhopal '27
              </p>
            </div>
          </div>

          {/* Quick System Telemetry */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="flex items-center text-emerald-telemetry">
              <span className="w-2 h-2 rounded-full bg-emerald-telemetry mr-1.5 animate-pulse" />
              SYSTEM STATUS: 100% OPERATIONAL
            </span>
            <span className="text-slate-600">|</span>
            <span>BUILD: v2026.09-REACT</span>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenTerminal}
              className="text-cyan-glow hover:underline cursor-pointer flex items-center space-x-1"
            >
              <Terminal className="w-3 h-3" />
              <span>LAUNCH_CLI</span>
            </button>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-surface-900 hover:bg-surface-850 text-slate-400 hover:text-cyan-glow border border-white/10 hover:border-cyan-glow/40 transition-all cursor-pointer flex items-center space-x-1.5"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Copyright & Stack note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Vipanchi Barman. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Engineered with React, Tailwind CSS & JetBrains Mono</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
