import React, { useState } from 'react';
import TransitHeader from './components/transit/TransitHeader';
import TransitMap from './components/transit/TransitMap';
import VerticalStripMap from './components/transit/VerticalStripMap';
import ListView from './components/transit/ListView';
import StationInspector from './components/transit/StationInspector';
import TransitLegend from './components/transit/TransitLegend';
import TransitAboutModal from './components/transit/TransitAboutModal';
import TransitContactModal from './components/transit/TransitContactModal';
import { TRANSIT_STATIONS } from './data/transitData';
import { portfolioData } from './data/portfolioData';
import { Mail, Download, Sparkles, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './components/Icons';

export default function App() {
  const [activeView, setActiveView] = useState('map'); // 'map' | 'list'
  const [selectedStationId, setSelectedStationId] = useState('ayusetu'); // Default focus on Central Project
  const [activeLineFilter, setActiveLineFilter] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const selectedStation = TRANSIT_STATIONS.find((s) => s.id === selectedStationId);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-ink-primary flex flex-col font-sans selection:bg-metro-backend selection:text-white">
      
      {/* 1. Header Navigation */}
      <TransitHeader
        activeView={activeView}
        setActiveView={setActiveView}
        selectedStationId={selectedStationId}
        onSelectStation={(id) => setSelectedStationId(id)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        activeLineFilter={activeLineFilter}
        setActiveLineFilter={setActiveLineFilter}
      />

      {/* 2. Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        
        {/* Intro Strip (Natural Human Introduction) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDD6C9] shadow-paper flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <h1 className="text-base sm:text-lg font-extrabold text-ink-primary tracking-tight font-sans">
                Backend Architecture, Relational Databases & AI Pipelines
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
              Welcome to my portfolio! Explore my projects, internships, and technical skills mapped as an interactive schematic below. Click on any stop to inspect architecture and code.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE4D9] text-ink-primary text-xs font-bold transition border border-[#DDD6C9]"
            >
              About Me
            </button>
            <a
              href="/Barman_Vipanchi_Resume_10-09-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-metro-backend hover:bg-[#154E8C] text-white text-xs font-bold transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Dynamic View (Map vs List) */}
        {activeView === 'map' ? (
          <div className="space-y-6">
            
            {/* Desktop / Tablet: 2D Interactive SVG Schematic */}
            <div className="hidden md:block relative">
              <TransitMap
                selectedStationId={selectedStationId}
                onSelectStation={(id) => setSelectedStationId(id)}
                activeLineFilter={activeLineFilter}
                setActiveLineFilter={setActiveLineFilter}
              />

              {/* Floating Skills Key / Legend */}
              <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
                <TransitLegend
                  activeLineFilter={activeLineFilter}
                  setActiveLineFilter={setActiveLineFilter}
                  onOpenStation={(id) => setSelectedStationId(id)}
                />
              </div>
            </div>

            {/* Mobile Viewport: Single-Line Vertical Schematic */}
            <div className="block md:hidden space-y-6">
              <VerticalStripMap
                selectedStationId={selectedStationId}
                onSelectStation={(id) => setSelectedStationId(id)}
                activeLineFilter={activeLineFilter}
                setActiveLineFilter={setActiveLineFilter}
              />
              <TransitLegend
                activeLineFilter={activeLineFilter}
                setActiveLineFilter={setActiveLineFilter}
                onOpenStation={(id) => setSelectedStationId(id)}
              />
            </div>

          </div>
        ) : (
          /* Recruiter List View */
          <ListView
            onSelectStation={(id) => setSelectedStationId(id)}
            activeLineFilter={activeLineFilter}
            setActiveLineFilter={setActiveLineFilter}
          />
        )}

      </main>

      {/* 3. Slide-In Station Detail Inspector Card */}
      {selectedStation && (
        <StationInspector
          station={selectedStation}
          onClose={() => setSelectedStationId(null)}
          onSelectStation={(id) => setSelectedStationId(id)}
        />
      )}

      {/* 4. Modals */}
      <TransitAboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <TransitContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* 5. Footer */}
      <footer className="w-full bg-white border-t border-[#DDD6C9] mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          
          <div className="flex items-center gap-2">
            <span className="font-bold text-ink-primary">Vipanchi Barman</span>
            <span>•</span>
            <span>B.Tech CSE (9.04 CGPA), VIT Bhopal</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-primary font-semibold transition flex items-center gap-1"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-primary font-semibold transition flex items-center gap-1"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={portfolioData.personal.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-primary font-semibold transition flex items-center gap-1"
            >
              <LeetcodeIcon className="w-3.5 h-3.5" />
              <span>LeetCode</span>
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="hover:text-metro-backend font-semibold transition flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{portfolioData.personal.email}</span>
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
